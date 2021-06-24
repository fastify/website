#!/usr/bin/env node

const path = require('path')
const Metalsmith = require('metalsmith')
const debug = require('metalsmith-debug')
const collections = require('metalsmith-collections')
const layouts = require('metalsmith-layouts')
const nunjucks = require('nunjucks')
const markdown = require('metalsmith-markdown')
const permalinks = require('metalsmith-permalinks')
const writemetadata = require('metalsmith-writemetadata')
const htmlMinifier = require('metalsmith-html-minifier')
const cleanCSS = require('metalsmith-clean-css')
const { hashContent } = require('./utils')
const markdownFilter = require('nunjucks-markdown-filter')
const sass = require('metalsmith-sass')
const marked = require('marked')
const { shuffle } = require('lodash')
const metadataDir = require('../plugins/metalsmith-metadata-dir')
const svgOptimizer = require('../plugins/metalsmith-svg-optimizer')
const nunjucksRenderer = require('../plugins/metalsmith-nunjucks-renderer')

const markdownRenderer = new marked.Renderer()
markdownRenderer.image = function (href, title, text) {
  if (href.charAt(0) === '/') {
    href = href.substring(1)
  }
  return `<img src="/{{ hashes['${href}'] }}" alt="${title}" title="${title}" />`
}

const source = path.resolve(
  process.argv[2] || path.join(__dirname, '..', 'website')
)
const dest = path.resolve(
  process.argv[3] || path.join(__dirname, '..', '..', 'build')
)

console.log(`Building website from ${source} into ${dest}`)

const env = nunjucks.configure(path.join(source, 'layouts'), {
  watch: false,
  noCache: true
})
let first = true
env.addGlobal('getContext', function () {
  if (first) {
    console.log(Object.keys(this.env.globals))
    first = false
  }
})
env.addGlobal('currentYear', new Date().getFullYear())
env.addFilter('md', markdownFilter)
env.addFilter('shuffle', arr => shuffle(arr))
env.addFilter('shuffleWithPinned', arr => {
  const pinned = []
  const remaining = []
  for (const e of arr) {
    if (e.pinned === true) {
      pinned.push(e)
    } else {
      remaining.push(e)
    }
  }

  return [...pinned, ...shuffle(remaining)]
})

Metalsmith(source)
  .source(path.join(source, 'content'))
  .destination(dest)
  .clean(true)
  .metadata(require(path.join(source, 'metadata.json')))
  .use(debug())
  .use(sass({
    outputDir: 'css/'
  }))
  .use(
    writemetadata({
      childIgnorekeys: ['next', 'previous', 'content']
    })
  )
  .use(
    metadataDir({
      directory: path.join(source, 'data')
    })
  )
  .use(
    collections({
      docs: 'docs/**/*.md'
    })
  )
  .use(
    hashContent({
      pattern: ['**/*.{js,css,png,jpg,svg}']
    })
  )
  .use(markdown({ renderer: markdownRenderer }))
  .use(nunjucksRenderer({
    pattern: 'docs/**/*.html'
  }))
  .use(
    permalinks({
      relative: false
    })
  )
  .use(
    layouts({
      engine: 'nunjucks',
      pattern: '**/*.html',
      directory: 'layouts',
      rename: true
    })
  )
  .use(
    svgOptimizer({
      plugins: [{ removeScriptElement: true }],
      pattern: ['!**/resources/*.*']
    })
  )
  .use(htmlMinifier())
  .use(cleanCSS())
  .build(err => {
    if (err) throw err
  })
