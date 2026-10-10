// Data layer of the reference: runs tsgeni once per build and indexes the result.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import config from 'virtual:fastify-api-reference/config';
import { installedPackages } from './install.js';
import { isGitHubUrl, repoUrl, sourceLocation } from './sources.js';
import { createExtractionPipeline, serializeDoc } from './extract/index.js';

/**
 * @typedef {import('./types').Api} Api
 * @typedef {import('./types').ApiDoc} ApiDoc
 * @typedef {import('./types').ApiEntry} ApiEntry
 * @typedef {import('./types').ApiPackage} ApiPackage
 * @typedef {import('./types').DocTag} DocTag
 * @typedef {import('./types').Link} Link
 * @typedef {import('./types').DecorationRow} DecorationRow
 * @typedef {import('./types').Variants} Variants
 * @typedef {keyof typeof KINDS} Kind
 */

export const CORE = 'fastify';

export const KINDS = {
  function: { letter: 'F', label: 'Function', plural: 'Functions' },
  class: { letter: 'C', label: 'Class', plural: 'Classes' },
  interface: { letter: 'I', label: 'Interface', plural: 'Interfaces' },
  type: { letter: 'T', label: 'Type alias', plural: 'Type aliases' },
  const: { letter: 'K', label: 'Constant', plural: 'Constants' },
  enum: { letter: 'E', label: 'Enum', plural: 'Enums' },
  namespace: { letter: 'N', label: 'Namespace', plural: 'Namespaces' },
  augmentation: { letter: 'A', label: 'Augmentation', plural: 'Augmentations' }
};

/**
 * tsgeni kinds, plus augmentations (members a plugin adds to a fastify type).
 * @param {ApiDoc} doc
 * @returns {Kind}
 */
export const kindOf = (doc) => (doc.augments ? 'augmentation' : doc.kind);

/**
 * @param {ApiDoc} doc
 * @returns {'deprecated' | 'experimental' | 'stable'}
 */
export function statusOf(doc) {
  const tags = doc.tags.map((t) => t.name);
  if (tags.includes('deprecated')) return 'deprecated';
  if (tags.includes('experimental') || tags.includes('beta'))
    return 'experimental';
  return 'stable';
}

/** Core declaration files, in reading order. */
const CORE_MODULES = {
  fastify: { label: 'Factory & options', icon: 'zap' },
  instance: { label: 'Instance', icon: 'server' },
  request: { label: 'Request', icon: 'request' },
  reply: { label: 'Reply', icon: 'reply' },
  route: { label: 'Routes', icon: 'route' },
  hooks: { label: 'Hooks', icon: 'hook' },
  plugin: { label: 'Plugins', icon: 'plug' },
  register: { label: 'Register', icon: 'package' },
  schema: { label: 'Schema', icon: 'braces' },
  'content-type-parser': { label: 'Content-type parser', icon: 'file' },
  'type-provider': { label: 'Type providers', icon: 'type' },
  logger: { label: 'Logger', icon: 'log' },
  errors: { label: 'Errors', icon: 'alert' },
  context: { label: 'Context', icon: 'settings' },
  'server-factory': { label: 'Server factory', icon: 'factory' },
  utils: { label: 'Utilities', icon: 'wrench' }
};

export const CATEGORIES = {
  core: { label: 'Core', description: 'The framework itself.' },
  plugin: {
    label: 'Official plugins',
    description:
      'Plugins maintained by the Fastify team, published under @fastify/.'
  },
  library: {
    label: 'Libraries',
    description:
      'Building blocks of core and standalone utilities from the Fastify team.'
  }
};
const CATEGORY_ORDER = Object.keys(CATEGORIES);

/** Icons for the libraries. */
const LIBRARY_ICONS = {
  avvio: 'blocks',
  'env-schema': 'settings',
  'fast-content-type-parse': 'file',
  'fast-json-stringify': 'braces',
  'fast-uri': 'proxy',
  'fastify-plugin': 'plug',
  'find-my-way': 'route',
  'fluent-json-schema': 'braces',
  'json-schema-ref-resolver': 'braces',
  'light-my-request': 'request',
  'process-warning': 'alert',
  'safe-regex2': 'shield',
  'secure-json-parse': 'shield',
  'accept-negotiator': 'proxy',
  'ajv-compiler': 'braces',
  busboy: 'upload',
  csrf: 'key',
  deepmerge: 'blocks',
  error: 'alert',
  'fast-json-stringify-compiler': 'braces',
  forwarded: 'proxy',
  'merge-json-schemas': 'braces',
  'proxy-addr': 'proxy',
  send: 'upload'
};

function iconFor(name, category, short) {
  if (name === CORE) return 'zap';
  if (category === 'library') return LIBRARY_ICONS[short] ?? 'package';
  return PLUGIN_ICONS.find(([re]) => re.test(short))?.[1] ?? 'plug';
}

/** Icon for a plugin, from keywords in its name. */
const PLUGIN_ICONS = [
  [/jwt|oauth|passport|auth|session|csrf/, 'key'],
  [/cookie/, 'cookie'],
  [/cors|helmet|secure/, 'shield'],
  [/mongo|mysql|postgres|redis|elastic|kafka|opensearch|valkey/, 'database'],
  [/websocket|sse/, 'radio'],
  [/proxy|reply-from|express|middie/, 'proxy'],
  [/rate-limit|throttle|under-pressure|circuit|caching|etag|compress/, 'gauge'],
  [/swagger/, 'book'],
  [/^routes$/, 'book'],
  [/multipart|formbody|static/, 'upload'],
  [/view|vite|nextjs|hotwire|react|vue|htmx/, 'layout'],
  [/type-provider/, 'type'],
  [/otel|zipkin|stats|logger/, 'activity'],
  [/schedule/, 'clock'],
  [/env|sensible|autoload|awilix|request-context|restartable/, 'blocks'],
  [/lambda/, 'cloud']
];

function readManifest(root) {
  try {
    return JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  } catch {
    return {};
  }
}

async function packageSources() {
  const installed = await installedPackages(config.dir);
  if (!installed.length && !config.fastifySource) {
    console.warn(
      `[fastify-api-reference] no packages in ${config.dir}: run fastify-api-install first`
    );
  }
  const list =
    installed.some((p) => p.name === CORE) || !config.fastifySource
      ? installed
      : [{ name: CORE, category: 'core' }, ...installed];
  return list
    .map(({ name, category }) => {
      const root =
        name === CORE && config.fastifySource
          ? config.fastifySource
          : path.join(config.dir, 'node_modules', name);
      const filter =
        category === 'core'
          ? config.core
          : category === 'library'
            ? config.libraries
            : config.plugins;
      return { name, category, root, filter };
    })
    .filter((p) => existsSync(p.root));
}

const byName = (a, b) =>
  a.data.name.localeCompare(b.data.name, 'en', { sensitivity: 'base' });

let cache;

/** Everything the pages need, computed once per build (and per dev server). */
/** @returns {Promise<Api>} */
export function getApi() {
  cache ??= buildIndex();
  return cache;
}

async function buildIndex() {
  const sources = await packageSources();
  const log = {
    debug() {},
    info: (m) => console.log(`[fastify-api-reference] ${m}`),
    warn: (m) => console.warn(`[fastify-api-reference] ${m}`),
    error: (m) => console.error(`[fastify-api-reference] ${m}`)
  };
  const ctx = { log };
  const docs = await createExtractionPipeline({
    packages: sources.map((s) => ({
      name: s.name,
      basePath: s.root,
      tag: s.filter.tag,
      tagMode: s.filter.mode,
      fallbackTag: s.filter.fallbackTag
    })),
    reportMissing: 'summary',
    failOnMissing: config.failOnMissing
  }).run(ctx);

  for (const source of sources) {
    if (
      source.filter.mode === 'auto' &&
      !ctx.taggedPackages?.has(source.name) &&
      source.category === 'core'
    ) {
      log.info(
        `${source.name} has no @${source.filter.tag} tags yet: documenting every export except @${source.filter.fallbackTag} ones`
      );
    }
  }

  /** @type {ApiEntry[]} */
  const entries = docs
    .map((d) => ({ id: d.id, data: serializeDoc(d) }))
    .sort(byName);
  const byId = new Map(entries.map((e) => [e.id, e]));

  const grouped = new Map();
  for (const e of entries) {
    if (!grouped.has(e.data.package)) grouped.set(e.data.package, []);
    grouped.get(e.data.package).push(e);
  }

  const packages = [];
  const packageOf = new Map();
  const segment = new Map();
  const slugs = new Set();

  for (const source of sources) {
    const list = grouped.get(source.name);
    if (!list) continue;
    const manifest = readManifest(source.root);
    const short = source.name.replace(/^@fastify\//, '');
    // URL segment: the short name, or the full one if two packages share it
    let slug = short;
    if (slugs.has(slug))
      slug = source.name.replace(/^@/, '').replace(/\//g, '-');
    slugs.add(slug);
    const pkg = {
      name: source.name,
      category: source.category,
      /** filtered by @publicAPI (true) or showing every export but @internal (false) */
      tagged: ctx.taggedPackages?.has(source.name) ?? false,
      slug,
      scope: source.name.startsWith('@fastify/') ? '@fastify/' : '',
      short,
      icon: iconFor(source.name, source.category, short),
      description:
        source.name === CORE
          ? 'The framework: factory function, server instance, request, reply, routes and hooks.'
          : (manifest.description ?? ''),
      repo:
        repoUrl(manifest) ??
        (source.name === CORE ? 'https://github.com/fastify/fastify' : null),
      docs: docsHome(source.name, manifest),
      version: manifest.version ?? null,
      local: source.name === CORE && Boolean(config.fastifySource),
      root: source.root,
      entries: list,
      groups: []
    };

    // URL segments: the export name, with a suffix when it clashes with another
    // one. Compared case-insensitively (`httpErrors` vs `HttpErrors`) so the
    // build also works on case-insensitive file systems.
    const taken = new Set();
    const ordered = [
      ...list.filter((e) => !e.data.augments),
      ...list.filter((e) => e.data.augments)
    ];
    for (const e of ordered) {
      const suffix = e.data.augments
        ? e.data.augments.replace(/[^\w]+/g, '-')
        : e.data.kind;
      let seg = e.data.name;
      if (taken.has(seg.toLowerCase())) seg = `${seg}-${suffix}`;
      for (let n = 2; taken.has(seg.toLowerCase()); n++)
        seg = `${e.data.name}-${suffix}-${n}`;
      taken.add(seg.toLowerCase());
      segment.set(e.id, seg);
      packageOf.set(e.id, pkg);
    }

    if (source.name === CORE) {
      const groups = new Map();
      for (const e of list) {
        const m = coreModuleOf(e.data);
        if (!groups.has(m.id)) groups.set(m.id, { ...m, entries: [] });
        groups.get(m.id).entries.push(e);
      }
      const order = Object.keys(CORE_MODULES);
      pkg.groups = [...groups.values()].sort(
        (a, b) =>
          (order.indexOf(a.id) + 1 || 99) - (order.indexOf(b.id) + 1 || 99)
      );
    }
    packages.push(pkg);
  }

  // core, then plugins, then libraries; alphabetical inside each
  packages.sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
      a.short.localeCompare(b.short)
  );

  const coreByName = new Map();
  for (const e of grouped.get(CORE) ?? []) {
    if (e.data.augments) continue;
    coreByName.set(e.data.name, e);
    for (const alias of e.data.aliases)
      if (!coreByName.has(alias)) coreByName.set(alias, e);
  }

  // label of this build in the version switch: `v5` for fastify 5.x
  const coreVersion = packages.find((p) => p.name === CORE)?.version;
  const version = {
    label:
      config.versions?.archive ??
      (coreVersion ? `v${coreVersion.split('.')[0]}` : null),
    archive: config.versions?.archive ?? null,
    root: config.versions?.root ?? '/'
  };

  return {
    entries,
    packages,
    packageOf,
    segment,
    byId,
    coreByName,
    config,
    version
  };
}

function coreModuleOf(doc) {
  if (doc.external) {
    const pkg =
      doc.file.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/)?.[1] ?? 'external';
    return { id: pkg, label: pkg, icon: 'package' };
  }
  const base = doc.file.includes('/')
    ? (doc.file
        .replace(/\.d\.ts$/, '')
        .split('/')
        .pop() ?? doc.file)
    : CORE;
  return {
    id: base,
    ...(CORE_MODULES[base] ?? { label: base, icon: 'package' })
  };
}

/** fastify.dev Reference page for each core declaration file. */
const FASTIFY_DOCS = `https://fastify.dev/docs/${config.versions?.docs ?? 'latest'}/Reference/`;
const CORE_DOCS = {
  fastify: ['Server', 'Factory'],
  instance: ['Server', 'Server'],
  request: ['Request', 'Request'],
  reply: ['Reply', 'Reply'],
  route: ['Routes', 'Routes'],
  context: ['Routes', 'Routes'],
  hooks: ['Hooks', 'Hooks'],
  plugin: ['Plugins', 'Plugins'],
  register: ['Plugins', 'Plugins'],
  schema: ['Validation-and-Serialization', 'Validation and Serialization'],
  'content-type-parser': ['ContentTypeParser', 'Content-Type Parser'],
  'type-provider': ['Type-Providers', 'Type Providers'],
  logger: ['Logging', 'Logging'],
  errors: ['Errors', 'Errors'],
  'server-factory': ['Server', 'Factory']
};

/** fastify.dev or one of its subdomains (vite.fastify.dev). */
function isFastifyDocs(url) {
  try {
    const { hostname } = new URL(url);
    return hostname === 'fastify.dev' || hostname.endsWith('.fastify.dev');
  } catch {
    return false;
  }
}

/** Where a package is documented: fastify.dev for core, the docs site or the README otherwise. */
function docsHome(name, manifest) {
  if (name === CORE) return { url: FASTIFY_DOCS, label: 'fastify.dev' };
  const repo = repoUrl(manifest);
  const home = manifest.homepage ?? '';
  // a homepage on the project's own docs site (vite.fastify.dev) beats the README;
  // unrelated homepages (passportjs.org for @fastify/passport) do not
  if (isFastifyDocs(home)) return { url: home, label: new URL(home).host };
  if (isGitHubUrl(repo)) return { url: `${repo}#readme`, label: 'README' };
  return home ? { url: home, label: 'Docs' } : null;
}

/** Documentation page for an export: the matching fastify.dev Reference page, or the package's docs. */
/**
 * @param {ApiPackage | undefined} pkg
 * @param {ApiDoc} doc
 * @returns {Link | null}
 */
export function docsOf(pkg, doc) {
  if (!pkg?.docs) return null;
  if (pkg.name !== CORE) return pkg.docs;
  const module = coreModuleOf(doc).id;
  const [page, label] = CORE_DOCS[module] ?? ['TypeScript', 'TypeScript'];
  return { url: `${FASTIFY_DOCS}${page}/`, label: `fastify.dev · ${label}` };
}

/**
 * What the plugins add to fastify: one row per package with the members it
 * declares on FastifyInstance, FastifyRequest, FastifyReply, the route options
 * and other fastify types (`declare module 'fastify'`).
 */
export const DECORATION_COLUMNS = [
  { id: 'instance', label: 'fastify', hint: 'FastifyInstance' },
  { id: 'request', label: 'request', hint: 'FastifyRequest' },
  { id: 'reply', label: 'reply', hint: 'FastifyReply' },
  {
    id: 'route',
    label: 'Route options',
    hint: 'config, schema and route options'
  },
  { id: 'other', label: 'Other types', hint: 'other fastify types' }
];
const DECORATION_TARGETS = {
  FastifyInstance: { column: 'instance', prefix: 'fastify.' },
  FastifyRequest: { column: 'request', prefix: 'request.' },
  FastifyReply: { column: 'reply', prefix: 'reply.' },
  FastifyContextConfig: { column: 'route', prefix: 'config.' },
  FastifySchema: { column: 'route', prefix: 'schema.' },
  RouteShorthandOptions: { column: 'route', prefix: '' },
  RouteOptions: { column: 'route', prefix: '' }
};

/**
 * @param {Api} api
 * @returns {DecorationRow[]}
 */
export function decorationsOf(api) {
  const rows = new Map();
  for (const e of api.entries) {
    if (e.data.augments !== CORE || e.data.package === CORE) continue;
    const pkg = api.packageOf.get(e.id);
    if (!pkg) continue;
    if (!rows.has(pkg.name))
      rows.set(pkg.name, {
        pkg,
        columns: Object.fromEntries(DECORATION_COLUMNS.map((c) => [c.id, []])),
        count: 0
      });
    const row = rows.get(pkg.name);
    const target = DECORATION_TARGETS[e.data.name] ?? {
      column: 'other',
      prefix: `${e.data.name}.`
    };
    for (const m of e.data.members) {
      // methods, and properties typed as a function (`jwtVerify: (…) => …`)
      const call = m.callable ?? (m.kind === 'method' || m.kind === 'call');
      const label =
        m.name === '(call)'
          ? `${e.data.name}()`
          : m.name === '[index]'
            ? `${e.data.name}[…]`
            : `${target.prefix}${m.name}${call ? '()' : ''}`;
      // the same option can be declared on RouteOptions and RouteShorthandOptions: list it once
      if (row.columns[target.column].some((x) => x.label === label)) continue;
      row.columns[target.column].push({
        label,
        href: entryHref(api, e, memberSlug(m.name)),
        type: e.data.name
      });
      row.count++;
    }
  }
  return [...rows.values()].sort((a, b) =>
    a.pkg.short.localeCompare(b.pkg.short)
  );
}

/** Prefix a root-absolute path with Astro's `base`. */
/**
 * @param {string} p
 * @returns {string}
 */
export function withBase(p) {
  const base = import.meta.env.BASE_URL ?? '/';
  return `${base}${p}`.replaceAll('//', '/');
}

/**
 * @param {Api} api
 * @param {string} [hash]
 * @returns {string}
 */
export const indexHref = (api, hash) =>
  withBase(`${api.config.base}/${hash ? `#${hash}` : ''}`);

/**
 * @param {Api} api
 * @param {ApiEntry} entry
 * @param {string} [hash]
 * @returns {string}
 */
export function entryHref(api, entry, hash) {
  const pkg = api.packageOf.get(entry.id);
  const seg = api.segment.get(entry.id) ?? entry.data.name;
  return withBase(
    `${api.config.base}/${pkg?.slug ?? 'unknown'}/${encodeURIComponent(seg)}/${hash ? `#${hash}` : ''}`
  );
}

/** Names that become links on a page of `pkg`: fastify's types everywhere, overridden by the package's own. */
/**
 * @param {Api} api
 * @param {ApiPackage | undefined} pkg
 * @returns {Map<string, string>}
 */
export function linkTargets(api, pkg) {
  const links = new Map();
  for (const [name, e] of api.coreByName) links.set(name, entryHref(api, e));
  for (const e of pkg?.entries ?? []) {
    if (e.data.augments) continue;
    links.set(e.data.name, entryHref(api, e));
    for (const alias of e.data.aliases) links.set(alias, entryHref(api, e));
  }
  return links;
}

/** Plugin augmentations of a core type: who adds members to FastifyInstance, etc. */
/**
 * @param {Api} api
 * @param {ApiEntry} entry
 * @returns {ApiEntry[]}
 */
export function extensionsOf(api, entry) {
  if (entry.data.package !== CORE || entry.data.augments) return [];
  return api.entries.filter(
    (e) =>
      e.data.augments === CORE &&
      e.data.name === entry.data.name &&
      e.data.package !== CORE
  );
}

/**
 * How to import an export, in the three modes of the language switch:
 * TypeScript, JavaScript with ES modules, JavaScript with CommonJS.
 * Types only exist for TypeScript, so JavaScript gets the JSDoc `@typedef`
 * that editors understand. Augmentations are not imported: null.
 */
/**
 * @param {ApiDoc} doc
 * @returns {Variants | null}
 */
export function importLines(doc) {
  if (doc.augments) return null;
  const pkg = doc.package;
  const from = `'${pkg}'`;
  if (doc.aliases.includes('default') || (pkg === CORE && doc.name === CORE)) {
    const local = pkg === CORE ? 'Fastify' : doc.name;
    return {
      ts: `import ${local} from ${from}`,
      esm: `import ${local} from ${from}`,
      cjs: `const ${local} = require(${from})`
    };
  }
  if (doc.kind === 'interface' || doc.kind === 'type') {
    const typedef = `/** @typedef {import(${from}).${doc.name}} ${doc.name} */`;
    return {
      ts: `import type { ${doc.name} } from ${from}`,
      esm: typedef,
      cjs: typedef
    };
  }
  return {
    ts: `import { ${doc.name} } from ${from}`,
    esm: `import { ${doc.name} } from ${from}`,
    cjs: `const { ${doc.name} } = require(${from})`
  };
}

/**
 * Collapses equal variants so each distinct text renders once:
 * { ts: a, esm: a, cjs: b } -> [{ modes: 'ts esm', value: a }, { modes: 'cjs', value: b }]
 */
/**
 * @param {Variants} variants
 * @returns {{ modes: string, value: string }[]}
 */
export function variantGroups(variants) {
  const groups = [];
  for (const mode of ['ts', 'esm', 'cjs']) {
    const value = variants[mode];
    const same = groups.find((g) => g.value === value);
    if (same) same.modes += ` ${mode}`;
    else groups.push({ modes: mode, value });
  }
  return groups;
}

/**
 * Link to the declaration in the package's repository, at the released tag, and
 * the `file:line` label shown for it. Generated types (`dist/…`) point to the
 * TypeScript source they come from; null when that source cannot be found.
 */
/**
 * @param {ApiPackage | undefined} pkg
 * @param {ApiDoc} doc
 * @returns {Link | null}
 */
export function sourceOf(pkg, doc) {
  if (!pkg?.repo || doc.external || !isGitHubUrl(pkg.repo)) return null;
  const loc = pkg.local
    ? { file: doc.file, line: doc.line, ref: 'main', dir: '' }
    : sourceLocation({ dir: config.dir, name: pkg.name, root: pkg.root }, doc);
  if (!loc) return null;
  // a local checkout links to main; published packages to their release tag
  const ref = loc.ref ?? (pkg.version ? `v${pkg.version}` : 'HEAD');
  const file = loc.dir ? `${loc.dir}/${loc.file}` : loc.file;
  return {
    url: `${pkg.repo}/blob/${ref}/${file}${loc.line ? `#L${loc.line}` : ''}`,
    label: loc.line ? `${loc.file}:${loc.line}` : loc.file
  };
}

/** Stable anchor for a member name: `(call)` and `[index]` included. */
/**
 * @param {string} name
 * @returns {string}
 */
export const memberSlug = (name) =>
  `member-${name.replace(/[^\w$-]+/g, '-').replace(/^-|-$/g, '') || 'call'}`;

/**
 * @param {string} text
 * @returns {string}
 */
export function summaryOf(text) {
  const para = text.split(/\n\s*\n/)[0]?.replace(/\n/g, ' ') ?? '';
  return (para.match(/^.*?[.!?](\s|$)/)?.[0] ?? para).trim();
}

/**
 * @param {DocTag[]} tags
 * @param {string} name
 * @returns {DocTag[]}
 */
export const tagsNamed = (tags, name) => tags.filter((t) => t.name === name);
