// Shapes of the data the pages render: the docs produced by the extraction and
// the index built on top of them in data.js.

export interface DocTag {
  name: string;
  param?: string;
  text: string;
}

export interface DocSignature {
  code: string;
  description: string;
  tags: DocTag[];
}

export interface DocMember {
  name: string;
  kind: string;
  optional: boolean;
  /** a method, or a property whose type can be called */
  callable?: boolean;
  description: string;
  tags: DocTag[];
  signatures: DocSignature[];
}

export interface ApiDoc {
  id: string;
  name: string;
  aliases: string[];
  kind:
    | 'function'
    | 'class'
    | 'interface'
    | 'type'
    | 'const'
    | 'enum'
    | 'namespace';
  package: string;
  version: string | null;
  /** module an augmentation extends (`fastify`), otherwise null */
  augments: string | null;
  file: string;
  line: number;
  external: boolean;
  description: string;
  tags: DocTag[];
  signatures: DocSignature[];
  members: DocMember[];
  outputPath?: string;
  uses: string[];
  usedBy: string[];
  missingRefs: string[];
}

export interface ApiEntry {
  id: string;
  data: ApiDoc;
}

export interface PackageGroup {
  id: string;
  label: string;
  icon: string;
  entries: ApiEntry[];
}

export interface Link {
  url: string;
  label: string;
}

export interface ApiPackage {
  name: string;
  category: 'core' | 'plugin' | 'library';
  tagged: boolean;
  slug: string;
  scope: string;
  short: string;
  icon: string;
  description: string;
  repo: string | null;
  docs: Link | null;
  version: string | null;
  local: boolean;
  root: string;
  entries: ApiEntry[];
  groups: PackageGroup[];
}

export interface ApiConfig {
  base: string;
  dir: string;
  title: string;
  versions?: { archive: string | null; root: string; docs: string };
  [key: string]: unknown;
}

export interface Api {
  entries: ApiEntry[];
  packages: ApiPackage[];
  packageOf: Map<string, ApiPackage>;
  segment: Map<string, string>;
  byId: Map<string, ApiEntry>;
  coreByName: Map<string, ApiEntry>;
  config: ApiConfig;
  version: { label: string | null; archive: string | null; root: string };
}

export interface Decoration {
  label: string;
  href: string;
  type: string;
}

export interface DecorationRow {
  pkg: ApiPackage;
  columns: Record<string, Decoration[]>;
  count: number;
}

/** The three modes of the language switch. */
export interface Variants {
  ts: string;
  esm: string;
  cjs: string;
}
