const { access } = require('fs')
const { resolve, join, basename: getBaseName, dirname: getDirName } = require('path')
const { mkdir, copyFile, readdir } = require('fs').promises
const crypto = require('crypto')
const multimatch = require('multimatch')
const path = require('path')

function fileExists (path) {
  return new Promise((resolve, reject) => {
    access(path, function (err) {
      if (err) {
        if (err.code === 'ENOENT') {
          return resolve(false)
        }
        return reject(err)
      }
      return resolve(true)
    })
  })
}

async function copyDir (src, dest) {
  const hasDir = await fileExists(src)
  if (hasDir) {
    await mkdir(dest, { recursive: true })
    const entries = await readdir(src, { withFileTypes: true })
    return Promise.all(entries.map((entry) => {
      const srcPath = join(src, entry.name)
      const destPath = join(dest, entry.name)
      if (entry.isDirectory()) {
        return copyDir(srcPath, destPath)
      }
      return copyFile(srcPath, destPath)
    }))
  }
}

async function * getFiles (dir, nestLevel = -1) {
  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield * getFiles(res, nestLevel - 1)
    } else {
      const pathArr = res.split(path.sep).slice(nestLevel)
      yield {
        fileName: pathArr.slice(-1)[0],
        nestedPath: join(...pathArr.slice(0, -1)) // get nesting without file
      }
    }
  }
}

function hashContent (options) {
  // default options
  options = options || {}
  if (typeof options.keep !== 'boolean') options.keep = false
  options.algorithm = options.algorithm || 'sha256'
  options.pattern = options.pattern || ['**/*.{js,scss,css,map,png,jpg}']
  options.rename = options.rename || function (filepath, digest) {
    const basename = getBaseName(filepath)
    const dirname = getDirName(filepath)

    // we split at the first period, instead of extname
    //  this is to handle .css.map
    const ext = basename.indexOf('.')

    return sanitizePath(join(dirname,
      [
        basename.substring(0, ext),
        '.',
        digest.substr(0, 16),
        basename.substring(ext)
      ].join('')))
  }

  return function (files, ms, done) {
    const metadata = ms.metadata()
    metadata.hashes = metadata.hashes || {}

    const relevantFiles = multimatch(Object.keys(files), options.pattern)
    relevantFiles.forEach(function (filepath) {
      // this might error, that's Ok.
      const hash = crypto.createHash(options.algorithm)

      hash.update(files[filepath].contents)
      const digest = hash.digest('hex')

      const destination = options.rename(filepath, digest)

      files[destination] = files[filepath]
      if (!options.keep) delete files[filepath]

      filepath = sanitizePath(filepath) // for windows compatibility
      metadata.hashes[filepath] = destination
    })

    return process.nextTick(done)
  }
}

function sanitizePath (path) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path)
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path) // eslint-disable-line no-control-regex

  if (isExtendedLengthPath || hasNonAscii) {
    return path
  }

  return path.replace(/\\/g, '/')
}

module.exports = {
  copyDir,
  fileExists,
  hashContent,
  sanitizePath,
  getFiles
}