

# Directory Structure
```
docs/
  Guides/
    Benchmarking.md
    Contributing.md
    Database.md
    Delay-Accepting-Requests.md
    Detecting-When-Clients-Abort.md
    Ecosystem.md
    Fluent-Schema.md
    Getting-Started.md
    Index.md
    Migration-Guide-V3.md
    Migration-Guide-V4.md
    Migration-Guide-V5.md
    Plugins-Guide.md
    Prototype-Poisoning.md
    Recommendations.md
    Serverless.md
    Style-Guide.md
    Testing.md
    Write-Plugin.md
    Write-Type-Provider.md
  Reference/
    ContentTypeParser.md
    Decorators.md
    Encapsulation.md
    Errors.md
    Hooks.md
    HTTP2.md
    Index.md
    Lifecycle.md
    Logging.md
    LTS.md
    Middleware.md
    Plugins.md
    Principles.md
    Reply.md
    Request.md
    Routes.md
    Server.md
    Type-Providers.md
    TypeScript.md
    Validation-and-Serialization.md
    Warnings.md
  resources/
    encapsulation_context.drawio
    encapsulation_context.svg
  index.md
```

# Files

## Source: https://fastify.dev/docs/latest/Guides/Benchmarking
````markdown
<h1 align="center">Fastify</h1>

## Benchmarking
Benchmarking is important if you want to measure how a change can affect your
application's performance. We provide a simple way to benchmark your
application from the point of view of a user and contributor. The setup allows
you to automate benchmarks in different branches and on different Node.js
versions.

The modules we will use:
- [Autocannon](https://github.com/mcollina/autocannon): An HTTP/1.1 benchmarking
  tool written in node.
- [Branch-comparer](https://github.com/StarpTech/branch-comparer): Checkout
  multiple git branches, execute scripts, and log the results.
- [Concurrently](https://github.com/open-cli-tools/concurrently): Run commands
  concurrently.
- [Npx](https://github.com/npm/npx): NPM package runner used to run scripts
  against different Node.js Versions and execute local binaries. Shipped with
  npm@5.2.0.

## Simple

### Run the test in the current branch
```sh
npm run benchmark
```

### Run the test against different Node.js versions ✨
```sh
npx -p node@10 -- npm run benchmark
```

## Advanced

### Run the test in different branches
```sh
branchcmp --rounds 2 --script "npm run benchmark"
```

### Run the test in different branches against different Node.js versions ✨
```sh
branchcmp --rounds 2 --script "npm run benchmark"
```

### Compare current branch with main (Gitflow)
```sh
branchcmp --rounds 2 --gitflow --script "npm run benchmark"
```
or
```sh
npm run bench
```

### Run different examples

<!-- markdownlint-disable -->
```sh
branchcmp --rounds 2 -s "node ./node_modules/concurrently -k -s first \"node ./examples/asyncawait.js\" \"node ./node_modules/autocannon -c 100 -d 5 -p 10 localhost:3000/\""
```
<!-- markdownlint-enable -->
````

## Source: https://fastify.dev/docs/latest/Guides/Contributing
````markdown
# Contributing To Fastify
<a id="contributing"></a>

Thank you for taking an interest in contributing to Fastify. We are excited to
receive your support and knowledge. This guide is our attempt to help you help
us.

> ## Note
> This is an informal guide. For full details, please review the formal
> [CONTRIBUTING 
> document](https://github.com/fastify/fastify/blob/main/CONTRIBUTING.md)
> our [Developer Certificate of
> Origin](https://en.wikipedia.org/wiki/Developer_Certificate_of_Origin).

## Table Of Contents
<a id="contributing-toc"></a>

- [Table Of Contents](#table-of-contents)
- [Types Of Contributions We're Looking
  For](#types-of-contributions-were-looking-for)
- [Ground Rules & Expectations](#ground-rules--expectations)
- [How To Contribute](#how-to-contribute)
- [Setting Up Your Environment](#setting-up-your-environment)
  - [Using Visual Studio Code](#using-visual-studio-code)

## Types Of Contributions We're Looking For
<a id="contribution-types"></a>

In short, we welcome any type of contribution you are willing to provide. No
contribution is too small. We gladly accept contributions such as:

* Documentation improvements: from small typo corrections to major document
  reworks
* Helping others by answering questions in pull requests and
  [discussions](https://github.com/fastify/fastify/discussions)
* Fixing [known
  bugs](https://github.com/fastify/fastify/issues?q=is%3Aissue+is%3Aopen+label%3Abug)
* Reporting previously unknown bugs by opening an issue with a minimal
  reproduction

## Ground Rules & Expectations
<a id="contributing-rules"></a>

Before we get started, here are a few things we expect from you (and that you
should expect from others):

* Be respectful and thoughtful in your conversations around this project. This
  project is maintained by a diverse set of people from all across the globe.
  Each person has their own views and opinions about the project. Try to listen
  to each other and reach an agreement or compromise.
* We have a [Code of
  Conduct](https://github.com/fastify/fastify/blob/main/CODE_OF_CONDUCT.md). You
  must adhere to it to participate in this project.
* If you open a pull request, please ensure your contribution passes all
  tests. If there are test failures, you will need to address them before we can
  merge your contribution.

## How To Contribute
<a id="contributing-how-to"></a>

If you'd like to contribute, start by searching through the
[issues](https://github.com/fastify/fastify/issues) and [pull
requests](https://github.com/fastify/fastify/pulls) to see whether someone else
has raised a similar idea or question.

If you don't see your idea listed, and you think it fits into the goals of this
guide, do one of the following:
* **If your contribution is minor,** such as a typo fix, open a pull request.
* **If your contribution is major,** such as a new feature, start by opening an
  issue first. That way, other people can weigh in on the discussion before you
  do any work.

<!--
TODO: add link to a style guide, when we have one, here as in
https://github.com/github/opensource.guide/blob/2868efbf0c14aec821909c19e210c3603a4a7805/CONTRIBUTING.md#style-guide
-->

## Setting Up Your Environment
<a id="contributing-environment"></a>

Please adhere to the project's code and documentation style. Some popular tools
that automatically "correct" code and documentation do not follow a style that
conforms to this project's styles. Notably, this project uses
[StandardJS](https://standardjs.com) for code formatting.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/fastify/fastify)

### Using Visual Studio Code
<a id="contributing-vscode"></a>

What follows is how to use [Visual Studio Code (VSCode)
portable](https://code.visualstudio.com/docs/editor/portable) to create a
Fastify specific environment. This guide is written as if you are setting up the
environment on macOS, but the principles are the same across all platforms. See
the previously linked VSCode portable guide for help with other platforms.

First, [download VSCode](https://code.visualstudio.com/download) and unpackage
it to `/Applications/VSCodeFastify/`. Upon doing so, the following should output
"found" when run in a terminal:

```sh
[ -d /Applications/VSCodeFastify/Visual\ Studio\ Code.app ] && echo "found"
```

As mentioned in the VSCode portable guide, we need to unsandbox the application
for the portable mode to work correctly. So issue the following in a terminal:

```sh
xattr -dr com.apple.quarantine /Applications/VSCodeFastify/Visual\ Studio\ Code.app
```

Next, create the required data directories for VSCode:

```sh
mkdir -p /Applications/VSCodeFastify/code-portable-data/{user-data,extensions}
```

Before continuing, we need to add the `code` command to your terminal's `PATH`.
To do so, we will [manually add VSCode to the
`PATH`](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line).
As outlined in that document, the instructions vary depending on your default
shell, so you should follow the instructions in that guide as relates to your
preferred shell. However, we will tweak them slightly by defining an alias
instead of a direct reference to the `code` tool. This is so we do not conflict
with any other installation of VSCode you may have, and to keep this guide
specific to Fastify. So, ultimately, we want the following:

```sh
alias code-fastify="/Applications/VSCodeFastify/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
```

The result should be that `code-fastify --version` results in something like:

```sh
❯ code-fastify --version
1.50.0
93c2f0fbf16c5a4b10e4d5f89737d9c2c25488a3
x64
```

Now that VSCode is installed, and we can work with it via the command line, we
need to install an extension that will aid in keeping any JavaScript you write
for the project formatted according to the project's style:

```sh
code-fastify --install-extension dbaeumer.vscode-eslint
```

Upon successful execution of the previous command, the following command should
result in "found" being output:

```sh
[ -d /Applications/VSCodeFastify/code-portable-data/extensions/dbaeumer.vscode-eslint-* ] && echo "found"
```

Now, from within the directory of your local clone of the Fastify project, we
can open VSCode:

```sh
code-fastify .
```

A new VSCode window should open and you should see the Fastify project files in
the left sidebar. But wait! We are not quite done yet. There are a few more
baseline settings that should be set before VSCode is ready.

Press `cmd+shift+p` to bring up the VSCode command input prompt. Type `open
settings (json)`. Three [VSCode Setting](https://code.visualstudio.com/docs/getstarted/settings)
options will appear in the dropdown: Workspace, Default,
and User settings. We recommend selecting Default. This will open a document
that is the settings for the editor. Paste the following JSON into this
document, overwriting any text already present, and save it:

```json
{
    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint",
        "editor.codeActionsOnSave": {
            "source.fixAll": true
        }
    },

    "workbench.colorCustomizations": {
        "statusBar.background": "#178bb9"
    }
}
```

Finally, from the menu bar, select "Terminal > New Terminal" to open a new terminal
in the editor. Run `npm i` to install the Fastify dependencies.

At this point, you are all setup with a custom VSCode instance that can be used
to work on Fastify contributions. As you edit and save JavaScript files, the
editor will autocorrect any style issues.
````

## Source: https://fastify.dev/docs/latest/Guides/Database
````markdown
<h1 align="center">Fastify</h1>

## Database

Fastify's ecosystem provides a handful of
plugins for connecting to various database engines.
This guide covers engines that have Fastify
plugins maintained within the Fastify organization.

> If a plugin for your database of choice does not exist
> you can still use the database as Fastify is database agnostic.
> By following the examples of the database plugins listed in this guide,
> a plugin can be written for the missing database engine.

> If you would like to write your own Fastify plugin
> please take a look at the [plugins guide](./Plugins-Guide.md)

### [MySQL](https://github.com/fastify/fastify-mysql)

Install the plugin by running `npm i @fastify/mysql`.

*Usage:*

```javascript
const fastify = require('fastify')()

fastify.register(require('@fastify/mysql'), {
  connectionString: 'mysql://root@localhost/mysql'
})

fastify.get('/user/:id', function(req, reply) {
  fastify.mysql.query(
    'SELECT id, username, hash, salt FROM users WHERE id=?', [req.params.id],
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

### [Postgres](https://github.com/fastify/fastify-postgres)
Install the plugin by running `npm i pg @fastify/postgres`.

*Example*:

```javascript
const fastify = require('fastify')()

fastify.register(require('@fastify/postgres'), {
  connectionString: 'postgres://postgres@localhost/postgres'
})

fastify.get('/user/:id', function (req, reply) {
  fastify.pg.query(
    'SELECT id, username, hash, salt FROM users WHERE id=$1', [req.params.id],
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

### [Redis](https://github.com/fastify/fastify-redis)
Install the plugin by running `npm i @fastify/redis`

*Usage:*

```javascript
'use strict'

const fastify = require('fastify')()

fastify.register(require('@fastify/redis'), { host: '127.0.0.1' })
// or
fastify.register(require('@fastify/redis'), { url: 'redis://127.0.0.1', /* other redis options */ })

fastify.get('/foo', function (req, reply) {
  const { redis } = fastify
  redis.get(req.query.key, (err, val) => {
    reply.send(err || val)
  })
})

fastify.post('/foo', function (req, reply) {
  const { redis } = fastify
  redis.set(req.body.key, req.body.value, (err) => {
    reply.send(err || { status: 'ok' })
  })
})

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

By default `@fastify/redis` doesn't close
the client connection when Fastify server shuts down.
To opt-in to this behavior, register the client like so:

```javascript
fastify.register(require('@fastify/redis'), {
  client: redis,
  closeClient: true
})
```

### [Mongo](https://github.com/fastify/fastify-mongodb)
Install the plugin by running `npm i @fastify/mongodb`

*Usage:*
```javascript
const fastify = require('fastify')()

fastify.register(require('@fastify/mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,

  url: 'mongodb://mongo/mydb'
})

fastify.get('/user/:id', async function (req, reply) {
  // Or this.mongo.client.db('mydb').collection('users')
  const users = this.mongo.db.collection('users')

  // if the id is an ObjectId format, you need to create a new ObjectId
  const id = this.mongo.ObjectId(req.params.id)
  try {
    const user = await users.findOne({ id })
    return user
  } catch (err) {
    return err
  }
})

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
})
```

### [LevelDB](https://github.com/fastify/fastify-leveldb)
Install the plugin by running `npm i @fastify/leveldb`

*Usage:*
```javascript
const fastify = require('fastify')()

fastify.register(
  require('@fastify/leveldb'),
  { name: 'db' }
)

fastify.get('/foo', async function (req, reply) {
  const val = await this.level.db.get(req.query.key)
  return val
})

fastify.post('/foo', async function (req, reply) {
  await this.level.db.put(req.body.key, req.body.value)
  return { status: 'ok' }
})

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

### Writing plugin for a database library
We could write a plugin for a database
library too (e.g. Knex, Prisma, or TypeORM).
We will use [Knex](https://knexjs.org/) in our example.

```javascript
'use strict'

const fp = require('fastify-plugin')
const knex = require('knex')

function knexPlugin(fastify, options, done) {
  if(!fastify.knex) {
    const knex = knex(options)
    fastify.decorate('knex', knex)

    fastify.addHook('onClose', (fastify, done) => {
      if (fastify.knex === knex) {
        fastify.knex.destroy(done)
      }
    })
  }

  done()
}

export default fp(knexPlugin, { name: 'fastify-knex-example' })
```

### Writing a plugin for a database engine

In this example, we will create a basic Fastify MySQL plugin from scratch (it is
a stripped-down example, please use the official plugin in production).

```javascript
const fp = require('fastify-plugin')
const mysql = require('mysql2/promise')

function fastifyMysql(fastify, options, done) {
  const connection = mysql.createConnection(options)

  if (!fastify.mysql) {
    fastify.decorate('mysql', connection)
  }

  fastify.addHook('onClose', (fastify, done) => connection.end().then(done).catch(done))

  done()
}

export default fp(fastifyMysql, { name: 'fastify-mysql-example' })
```

### Migrations

Database schema migrations are an integral part of database management and
development. Migrations provide a repeatable and testable way to modify a
database's schema and prevent data loss.

As stated at the beginning of the guide, Fastify is database agnostic and any
Node.js database migration tool can be used with it. We will give an example of
using [Postgrator](https://www.npmjs.com/package/postgrator) which has support
for Postgres, MySQL, SQL Server and SQLite. For MongoDB migrations, please check
[migrate-mongo](https://www.npmjs.com/package/migrate-mongo).

#### [Postgrator](https://www.npmjs.com/package/postgrator)

Postgrator is Node.js SQL migration tool that uses a directory of SQL scripts to
alter the database schema. Each file in a migrations folder needs to follow the
pattern: ` [version].[action].[optional-description].sql`.

**version:** must be an incrementing number (e.g. `001` or a timestamp).

**action:** should be `do` or `undo`. `do` implements the version, `undo`
reverts it. Think about it like `up` and `down` in other migration tools.

**optional-description** describes which changes migration makes. Although
optional, it should be used for all migrations as it makes it easier for
everyone to know which changes are made in a migration.

In our example, we are going to have a single migration that creates a `users`
table and we are going to use `Postgrator` to run the migration.

> Run `npm i pg postgrator` to install dependencies needed for the
> example.

```sql
// 001.do.create-users-table.sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL
);
```
```javascript
const pg = require('pg')
const Postgrator = require('postgrator')
const path = require('node:path')

async function migrate() {
  const client = new pg.Client({
    host: 'localhost',
    port: 5432,
    database: 'example',
    user: 'example',
    password: 'example',
  });

  try {
    await client.connect();

    const postgrator = new Postgrator({
      migrationPattern: path.join(__dirname, '/migrations/*'),
      driver: 'pg',
      database: 'example',
      schemaTable: 'migrations',
      currentSchema: 'public', // Postgres and MS SQL Server only
      execQuery: (query) => client.query(query),
    });

    const result = await postgrator.migrate()

    if (result.length === 0) {
      console.log(
        'No migrations run for schema "public". Already at the latest one.'
      )
    }

    console.log('Migration done.')

    process.exitCode = 0
  } catch(err) {
    console.error(err)
    process.exitCode = 1
  }

  await client.end()
}

migrate()
```
````

## Source: https://fastify.dev/docs/latest/Guides/Delay-Accepting-Requests
````markdown
<h1 align="center">Fastify</h1>

# Delay Accepting Requests

## Introduction

Fastify provides several [hooks](../Reference/Hooks.md) useful for a variety of
situations. One of them is the [`onReady`](../Reference/Hooks.md#onready) hook,
which is useful for executing tasks *right before* the server starts accepting
new requests. There isn't, though, a direct mechanism to handle scenarios in
which you'd like the server to start accepting **specific** requests and denying
all others, at least up to some point.

Say, for instance, your server needs to authenticate with an OAuth provider to
start serving requests. To do that it'd need to engage in the [OAuth
Authorization Code
Flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow),
which would require it to listen to two requests from the authentication
provider:

1. the Authorization Code webhook
2. the tokens webhook

Until the authorization flow is done you wouldn't be able to serve customer
requests. What to do then?

There are several solutions for achieving that kind of behavior. Here we'll
introduce one of such techniques and, hopefully, you'll be able to get things
rolling asap!

## Solution

### Overview

The proposed solution is one of many possible ways of dealing with this scenario
and many similar to it. It relies solely on Fastify, so no fancy infrastructure
tricks or third-party libraries will be necessary.

To simplify things we won't be dealing with a precise OAuth flow but, instead,
simulate a scenario in which some key is needed to serve a request and that key
can only be retrieved in runtime by authenticating with an external provider.

The main goal here is to deny requests that would otherwise fail **as early as
possible** and with some **meaningful context**. That's both useful for the
server (fewer resources allocated to a bound-to-fail task) and for the client
(they get some meaningful information and don't need to wait long for it).

That will be achieved by wrapping into a custom plugin two main features:

1. the mechanism for authenticating with the provider
[decorating](../Reference/Decorators.md) the `fastify` object with the
authentication key (`magicKey` from here onward)
1. the mechanism for denying requests that would, otherwise, fail

### Hands-on

For this sample solution we'll be using the following:

- `node.js v16.14.2`
- `npm 8.5.0`
- `fastify 4.0.0-rc.1`
- `fastify-plugin 3.0.1`
- `undici 5.0.0`

Say we have the following base server set up at first:

```js
const Fastify = require('fastify')

const provider = require('./provider')

const server = Fastify({ logger: true })
const USUAL_WAIT_TIME_MS = 5000

server.get('/ping', function (request, reply) {
  reply.send({ error: false, ready: request.server.magicKey !== null })
})

server.post('/webhook', function (request, reply) {
  // It's good practice to validate webhook requests come from
  // who you expect. This is skipped in this sample for the sake
  // of simplicity

  const { magicKey } = request.body
  request.server.magicKey = magicKey
  request.log.info('Ready for customer requests!')

  reply.send({ error: false })
})

server.get('/v1*', async function (request, reply) {
  try {
    const data = await provider.fetchSensitiveData(request.server.magicKey)
    return { customer: true, error: false }
  } catch (error) {
    request.log.error({
      error,
      message: 'Failed at fetching sensitive data from provider',
    })

    reply.statusCode = 500
    return { customer: null, error: true }
  }
})

server.decorate('magicKey')

server.listen({ port: '1234' }, () => {
  provider.thirdPartyMagicKeyGenerator(USUAL_WAIT_TIME_MS)
    .catch((error) => {
      server.log.error({
        error,
        message: 'Got an error while trying to get the magic key!'
      })

      // Since we won't be able to serve requests, might as well wrap
      // things up
      server.close(() => process.exit(1))
    })
})
```

Our code is simply setting up a Fastify server with a few routes:

- a `/ping` route that specifies whether the service is ready or not to serve
requests by checking if the `magicKey` has been set up
- a `/webhook` endpoint for our provider to reach back to us when they're ready
to share the `magicKey`. The `magicKey` is, then, saved into the previously set
decorator on the `fastify` object
- a catchall `/v1*` route to simulate what would have been customer-initiated
requests. These requests rely on us having a valid `magicKey`

The `provider.js` file, simulating actions of an external provider, is as
follows:

```js
const { fetch } = require('undici')
const { setTimeout } = require('node:timers/promises')

const MAGIC_KEY = '12345'

const delay = setTimeout

exports.thirdPartyMagicKeyGenerator = async (ms) => {
  // Simulate processing delay
  await delay(ms)

  // Simulate webhook request to our server
  const { status } = await fetch(
    'http://localhost:1234/webhook',
    {
      body: JSON.stringify({ magicKey: MAGIC_KEY }),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    },
  )

  if (status !== 200) {
    throw new Error('Failed to fetch magic key')
  }
}

exports.fetchSensitiveData = async (key) => {
  // Simulate processing delay
  await delay(700)
  const data = { sensitive: true }

  if (key === MAGIC_KEY) {
    return data
  }

  throw new Error('Invalid key')
}
```

The most important snippet here is the `thirdPartyMagicKeyGenerator` function,
which will wait for 5 seconds and, then, make the POST request to our `/webhook`
endpoint.

When our server spins up we start listening to new connections without having
our `magicKey` set up. Until we receive the webhook request from our external
provider (in this example we're simulating a 5 second delay) all our requests
under the `/v1*` path (customer requests) will fail. Worse than that: they'll
fail after we've reached out to our provider with an invalid key and got an
error from them. That wasted time and resources for us and our customers.
Depending on the kind of application we're running and on the request rate we're
expecting this delay is not acceptable or, at least, very annoying.

Of course, that could be simply mitigated by checking whether or not the
`magicKey` has been set up before hitting the provider in the `/v1*` handler.
Sure, but that would lead to bloat in the code. And imagine we have dozens of
different routes, with different controllers, that require that key. Should we
repeatedly add that check to all of them? That's error-prone and there are more
elegant solutions.

What we'll do to improve this setup overall is create a
[`Plugin`](../Reference/Plugins.md) that'll be solely responsible for making
sure we both:

- do not accept requests that would otherwise fail until we're ready for them
- make sure we reach out to our provider as soon as possible

This way we'll make sure all our setup regarding this specific _business rule_
is placed on a single entity, instead of scattered all across our code base.

With the changes to improve this behavior, the code will look like this:

##### index.js

```js
const Fastify = require('fastify')

const customerRoutes = require('./customer-routes')
const { setup, delay } = require('./delay-incoming-requests')

const server = new Fastify({ logger: true })

server.register(setup)

// Non-blocked URL
server.get('/ping', function (request, reply) {
  reply.send({ error: false, ready: request.server.magicKey !== null })
})

// Webhook to handle the provider's response - also non-blocked
server.post('/webhook', function (request, reply) {
  // It's good practice to validate webhook requests really come from
  // whoever you expect. This is skipped in this sample for the sake
  // of simplicity

  const { magicKey } = request.body
  request.server.magicKey = magicKey
  request.log.info('Ready for customer requests!')

  reply.send({ error: false })
})

// Blocked URLs
// Mind we're building a new plugin by calling the `delay` factory with our
// customerRoutes plugin
server.register(delay(customerRoutes), { prefix: '/v1' })

server.listen({ port: '1234' })
```

##### provider.js

```js
const { fetch } = require('undici')
const { setTimeout } = require('node:timers/promises')

const MAGIC_KEY = '12345'

const delay = setTimeout

exports.thirdPartyMagicKeyGenerator = async (ms) => {
  // Simulate processing delay
  await delay(ms)

  // Simulate webhook request to our server
  const { status } = await fetch(
    'http://localhost:1234/webhook',
    {
      body: JSON.stringify({ magicKey: MAGIC_KEY }),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    },
  )

  if (status !== 200) {
    throw new Error('Failed to fetch magic key')
  }
}

exports.fetchSensitiveData = async (key) => {
  // Simulate processing delay
  await delay(700)
  const data = { sensitive: true }

  if (key === MAGIC_KEY) {
    return data
  }

  throw new Error('Invalid key')
}
```

##### delay-incoming-requests.js

```js
const fp = require('fastify-plugin')

const provider = require('./provider')

const USUAL_WAIT_TIME_MS = 5000

async function setup(fastify) {
  // As soon as we're listening for requests, let's work our magic
  fastify.server.on('listening', doMagic)

  // Set up the placeholder for the magicKey
  fastify.decorate('magicKey')

  // Our magic -- important to make sure errors are handled. Beware of async
  // functions outside `try/catch` blocks
  // If an error is thrown at this point and not captured it'll crash the
  // application
  function doMagic() {
    fastify.log.info('Doing magic!')

    provider.thirdPartyMagicKeyGenerator(USUAL_WAIT_TIME_MS)
      .catch((error) => {
        fastify.log.error({
          error,
          message: 'Got an error while trying to get the magic key!'
        })

        // Since we won't be able to serve requests, might as well wrap
        // things up
        fastify.close(() => process.exit(1))
      })
  }
}

const delay = (routes) =>
  function (fastify, opts, done) {
    // Make sure customer requests won't be accepted if the magicKey is not
    // available
    fastify.addHook('onRequest', function (request, reply, next) {
      if (!request.server.magicKey) {
        reply.statusCode = 503
        reply.header('Retry-After', USUAL_WAIT_TIME_MS)
        reply.send({ error: true, retryInMs: USUAL_WAIT_TIME_MS })
      }

      next()
    })

    // Register to-be-delayed routes
    fastify.register(routes, opts)

    done()
  }

module.exports = {
  setup: fp(setup),
  delay,
}
```

##### customer-routes.js

```js
const fp = require('fastify-plugin')

const provider = require('./provider')

module.exports = fp(async function (fastify) {
  fastify.get('*', async function (request ,reply) {
    try {
      const data = await provider.fetchSensitiveData(request.server.magicKey)
      return { customer: true, error: false }
    } catch (error) {
      request.log.error({
        error,
        message: 'Failed at fetching sensitive data from provider',
      })

      reply.statusCode = 500
      return { customer: null, error: true }
    }
  })
})
```

There is a very specific change on the previously existing files that is worth
mentioning: Beforehand we were using the `server.listen` callback to start the
authentication process with the external provider and we were decorating the
`server` object right before initializing the server. That was bloating our
server initialization setup with unnecessary code and didn't have much to do
with starting the Fastify server. It was a business logic that didn't have its
specific place in the code base.

Now we've implemented the `delayIncomingRequests` plugin in the
`delay-incoming-requests.js` file. That's, in truth, a module split into two
different plugins that will build up to a single use-case. That's the brains of
our operation. Let's walk through what the plugins do:

##### setup

The `setup` plugin is responsible for making sure we reach out to our provider
asap and store the `magicKey` somewhere available to all our handlers.

```js
  fastify.server.on('listening', doMagic)
```

As soon as the server starts listening (very similar behavior to adding a piece
of code to the `server.listen`'s callback function) a `listening` event is
emitted (for more info refer to
https://nodejs.org/api/net.html#event-listening). We use that to reach out to
our provider as soon as possible, with the `doMagic` function.

```js
  fastify.decorate('magicKey')
```

The `magicKey` decoration is also part of the plugin now. We initialize it with
a placeholder, waiting for the valid value to be retrieved.

##### delay

`delay` is not a plugin itself. It's actually a plugin *factory*. It expects a
Fastify plugin with `routes` and exports the actual plugin that'll handle
enveloping those routes with an `onRequest` hook that will make sure no requests
are handled until we're ready for them.

```js
const delay = (routes) =>
  function (fastify, opts, done) {
    // Make sure customer requests won't be accepted if the magicKey is not
    // available
    fastify.addHook('onRequest', function (request, reply, next) {
      if (!request.server.magicKey) {
        reply.statusCode = 503
        reply.header('Retry-After', USUAL_WAIT_TIME_MS)
        reply.send({ error: true, retryInMs: USUAL_WAIT_TIME_MS })
      }

      next()
    })

    // Register to-be-delayed routes
    fastify.register(routes, opts)

    done()
  }
```

Instead of updating every single controller that might use the `magicKey`, we
simply make sure that no route that's related to customer requests will be
served until we have everything ready. And there's more: we fail **FAST** and
have the possibility of giving the customer meaningful information, like how
long they should wait before retrying the request. Going even further, by
issuing a [`503` status
code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503) we're
signaling to our infrastructure components (namely load balancers) that we're
still not ready to take incoming requests and they should redirect traffic to
other instances, if available. Additionally, we are providing a `Retry-After`
header with the time in milliseconds the client should wait before retrying.

It's noteworthy that we didn't use the `fastify-plugin` wrapper in the `delay`
factory. That's because we wanted the `onRequest` hook to only be set within
that specific scope and not to the scope that called it (in our case, the main
`server` object defined in `index.js`). `fastify-plugin` sets the
`skip-override` hidden property, which has a practical effect of making whatever
changes we make to our `fastify` object available to the upper scope. That's
also why we used it with the `customerRoutes` plugin: we wanted those routes to
be available to its calling scope, the `delay` plugin. For more info on that
subject refer to [Plugins](../Reference/Plugins.md#handle-the-scope).

Let's see how that behaves in action. If we fired our server up with `node
index.js` and made a few requests to test things out. These were the logs we'd
see (some bloat was removed to ease things up):

<!-- markdownlint-disable -->
```sh
{"time":1650063793316,"msg":"Doing magic!"}
{"time":1650063793316,"msg":"Server listening at http://127.0.0.1:1234"}
{"time":1650063795030,"reqId":"req-1","req":{"method":"GET","url":"/v1","hostname":"localhost:1234","remoteAddress":"127.0.0.1","remotePort":51928},"msg":"incoming request"}
{"time":1650063795033,"reqId":"req-1","res":{"statusCode":503},"responseTime":2.5721680000424385,"msg":"request completed"}
{"time":1650063796248,"reqId":"req-2","req":{"method":"GET","url":"/ping","hostname":"localhost:1234","remoteAddress":"127.0.0.1","remotePort":51930},"msg":"incoming request"}
{"time":1650063796248,"reqId":"req-2","res":{"statusCode":200},"responseTime":0.4802369996905327,"msg":"request completed"}
{"time":1650063798377,"reqId":"req-3","req":{"method":"POST","url":"/webhook","hostname":"localhost:1234","remoteAddress":"127.0.0.1","remotePort":51932},"msg":"incoming request"}
{"time":1650063798379,"reqId":"req-3","msg":"Ready for customer requests!"}
{"time":1650063798379,"reqId":"req-3","res":{"statusCode":200},"responseTime":1.3567829988896847,"msg":"request completed"}
{"time":1650063799858,"reqId":"req-4","req":{"method":"GET","url":"/v1","hostname":"localhost:1234","remoteAddress":"127.0.0.1","remotePort":51934},"msg":"incoming request"}
{"time":1650063800561,"reqId":"req-4","res":{"statusCode":200},"responseTime":702.4662979990244,"msg":"request completed"}
```
<!-- markdownlint-enable -->

Let's focus on a few parts:

```sh
{"time":1650063793316,"msg":"Doing magic!"}
{"time":1650063793316,"msg":"Server listening at http://127.0.0.1:1234"}
```

These are the initial logs we'd see as soon as the server started. We reach out
to the external provider as early as possible within a valid time window (we
couldn't do that before the server was ready to receive connections).

While the server is still not ready, a few requests are attempted:

<!-- markdownlint-disable -->
```sh
{"time":1650063795030,"reqId":"req-1","req":{"method":"GET","url":"/v1","hostname":"localhost:1234","remoteAddress":"127.0.0.1","remotePort":51928},"msg":"incoming request"}
{"time":1650063795033,"reqId":"req-1","res":{"statusCode":503},"responseTime":2.5721680000424385,"msg":"request completed"}
{"time":1650063796248,"reqId":"req-2","req":{"method":"GET","url":"/ping","hostname":"localhost:1234","remoteAddress":"127.0.0.1","remotePort":51930},"msg":"incoming request"}
{"time":1650063796248,"reqId":"req-2","res":{"statusCode":200},"responseTime":0.4802369996905327,"msg":"request completed"}
```
<!-- markdownlint-enable -->

The first one (`req-1`) was a `GET /v1`, that failed (**FAST** - `responseTime`
is in `ms`) with our `503` status code and the meaningful information in the
response. Below is the response for that request:

```sh
HTTP/1.1 503 Service Unavailable
Connection: keep-alive
Content-Length: 31
Content-Type: application/json; charset=utf-8
Date: Fri, 15 Apr 2022 23:03:15 GMT
Keep-Alive: timeout=5
Retry-After: 5000

{
    "error": true,
    "retryInMs": 5000
}
```

Then we attempted a new request (`req-2`), which was a `GET /ping`. As expected,
since that was not one of the requests we asked our plugin to filter, it
succeeded. That could also be used as a means of informing an interested party
whether or not we were ready to serve requests with the `ready` field. Although
`/ping` is more commonly associated with *liveness* checks and that would be
the responsibility of a *readiness* check. The curious reader can get more info
on these terms in the article
["Kubernetes best practices: Setting up health checks with readiness and liveness probes"](
https://cloud.google.com/blog/products/containers-kubernetes/kubernetes-best-practices-setting-up-health-checks-with-readiness-and-liveness-probes).

Below is the response to that request:

```sh
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 29
Content-Type: application/json; charset=utf-8
Date: Fri, 15 Apr 2022 23:03:16 GMT
Keep-Alive: timeout=5

{
    "error": false,
    "ready": false
}
```

After that, there were more interesting log messages:

<!-- markdownlint-disable -->
```sh
{"time":1650063798377,"reqId":"req-3","req":{"method":"POST","url":"/webhook","hostname":"localhost:1234","remoteAddress":"127.0.0.1","remotePort":51932},"msg":"incoming request"}
{"time":1650063798379,"reqId":"req-3","msg":"Ready for customer requests!"}
{"time":1650063798379,"reqId":"req-3","res":{"statusCode":200},"responseTime":1.3567829988896847,"msg":"request completed"}
```
<!-- markdownlint-enable -->

This time it was our simulated external provider hitting us to let us know
authentication had gone well and telling us what our `magicKey` was. We saved
that into our `magicKey` decorator and celebrated with a log message saying we
were now ready for customers to hit us!

<!-- markdownlint-disable -->
```sh
{"time":1650063799858,"reqId":"req-4","req":{"method":"GET","url":"/v1","hostname":"localhost:1234","remoteAddress":"127.0.0.1","remotePort":51934},"msg":"incoming request"}
{"time":1650063800561,"reqId":"req-4","res":{"statusCode":200},"responseTime":702.4662979990244,"msg":"request completed"}
```
<!-- markdownlint-enable -->

Finally, a final `GET /v1` request was made and, this time, it succeeded. Its
response was the following:

```sh
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 31
Content-Type: application/json; charset=utf-8
Date: Fri, 15 Apr 2022 23:03:20 GMT
Keep-Alive: timeout=5

{
    "customer": true,
    "error": false
}
```

## Conclusion

Specifics of the implementation will vary from one problem to another, but the
main goal of this guide was to show a very specific use case of an issue that
could be solved within Fastify's ecosystem.

This guide is a tutorial on the use of plugins, decorators, and hooks to solve
the problem of delaying serving specific requests on our application. It's not
production-ready, as it keeps local state (the `magicKey`) and it's not
horizontally scalable (we don't want to flood our provider, right?). One way of
improving it would be storing the `magicKey` somewhere else (perhaps a cache
database?).

The keywords here were [Decorators](../Reference/Decorators.md),
[Hooks](../Reference/Hooks.md), and [Plugins](../Reference/Plugins.md).
Combining what Fastify has to offer can lead to very ingenious and creative
solutions to a wide variety of problems. Let's be creative! :)
````

## Source: https://fastify.dev/docs/latest/Guides/Detecting-When-Clients-Abort
````markdown
<h1 align="center">Fastify</h1>

# Detecting When Clients Abort

## Introduction

Fastify provides request events to trigger at certain points in a request's
lifecycle. However, there isn't a built-in mechanism to
detect unintentional client disconnection scenarios such as when the client's
internet connection is interrupted. This guide covers methods to detect if
and when a client intentionally aborts a request.

Keep in mind, Fastify's `clientErrorHandler` is not designed to detect when a
client aborts a request. This works in the same way as the standard Node HTTP
module, which triggers the `clientError` event when there is a bad request or
exceedingly large header data. When a client aborts a request, there is no
error on the socket and the `clientErrorHandler` will not be triggered.

## Solution

### Overview

The proposed solution is a possible way of detecting when a client
intentionally aborts a request, such as when a browser is closed or the HTTP
request is aborted from your client application. If there is an error in your
application code that results in the server crashing, you may require
additional logic to avoid a false abort detection.

The goal here is to detect when a client intentionally aborts a connection
so your application logic can proceed accordingly. This can be useful for
logging purposes or halting business logic.

### Hands-on

Say we have the following base server set up:

```js
import Fastify from 'fastify';

const sleep = async (time) => {
  return await new Promise(resolve => setTimeout(resolve, time || 1000));
}

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
})

app.addHook('onRequest', async (request, reply) => {
  request.raw.on('close', () => {
    if (request.raw.aborted) {
      app.log.info('request closed')
    }
  })
})

app.get('/', async (request, reply) => {
  await sleep(3000)
  reply.code(200).send({ ok: true })
})

const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
```

Our code is setting up a Fastify server which includes the following
functionality:

- Accepting requests at http://localhost:3000, with a 3 second delayed response
of `{ ok: true }`.
- An onRequest hook that triggers when every request is received.
- Logic that triggers in the hook when the request is closed.
- Logging that occurs when the closed request property `aborted` is true.

Whilst the `aborted` property has been deprecated, `destroyed` is not a
suitable replacement as the
[Node.js documentation suggests](https://nodejs.org/api/http.html#requestaborted).
A request can be `destroyed` for various reasons, such as when the server closes
the connection. The `aborted` property is still the most reliable way to detect
when a client intentionally aborts a request.

You can also perform this logic outside of a hook, directly in a specific route.

```js
app.get('/', async (request, reply) => {
  request.raw.on('close', () => {
    if (request.raw.aborted) {
      app.log.info('request closed')
    }
  })
  await sleep(3000)
  reply.code(200).send({ ok: true })
})
```

At any point in your business logic, you can check if the request has been
aborted and perform alternative actions.

```js
app.get('/', async (request, reply) => {
  await sleep(3000)
  if (request.raw.aborted) {
    // do something here
  }
  await sleep(3000)
  reply.code(200).send({ ok: true })
})
```

A benefit to adding this in your application code is that you can log Fastify
details such as the reqId, which may be unavailable in lower-level code that
only has access to the raw request information.

### Testing

To test this functionality you can use an app like Postman and cancel your
request within 3 seconds. Alternatively, you can use Node to send an HTTP
request with logic to abort the request before 3 seconds. Example:

```js
const controller = new AbortController();
const signal = controller.signal;

(async () => {
   try {
      const response = await fetch('http://localhost:3000', { signal });
      const body = await response.text();
      console.log(body);
   } catch (error) {
      console.error(error);
   }
})();

setTimeout(() => {
   controller.abort()
}, 1000);
```

With either approach, you should see the Fastify log appear at the moment the
request is aborted.

## Conclusion

Specifics of the implementation will vary from one problem to another, but the
main goal of this guide was to show a very specific use case of an issue that
could be solved within Fastify's ecosystem.

You can listen to the request close event and determine if the request was
aborted or if it was successfully delivered. You can implement this solution
in an onRequest hook or directly in an individual route.

This approach will not trigger in the event of internet disruption, and such
detection would require additional business logic. If you have flawed backend
application logic that results in a server crash, then you could trigger a
false detection. The `clientErrorHandler`, either by default or with custom
logic, is not intended to handle this scenario and will not trigger when the
client aborts a request.
````

## Source: https://fastify.dev/docs/latest/Guides/Ecosystem
````markdown
<h1 align="center">Fastify</h1>

## Ecosystem

Plugins maintained by the Fastify team are listed under [Core](#core) while
plugins maintained by the community are listed in the [Community](#community)
section.

#### [Core](#core)

- [`@fastify/accepts`](https://github.com/fastify/fastify-accepts) to have
  [accepts](https://www.npmjs.com/package/accepts) in your request object.
- [`@fastify/accepts-serializer`](https://github.com/fastify/fastify-accepts-serializer)
  to serialize to output according to the `Accept` header.
- [`@fastify/auth`](https://github.com/fastify/fastify-auth) Run multiple auth
  functions in Fastify.
- [`@fastify/autoload`](https://github.com/fastify/fastify-autoload) Require all
  plugins in a directory.
- [`@fastify/awilix`](https://github.com/fastify/fastify-awilix) Dependency
  injection support for Fastify, based on
  [awilix](https://github.com/jeffijoe/awilix).
- [`@fastify/aws-lambda`](https://github.com/fastify/aws-lambda-fastify) allows
  you to easily build serverless web applications/services and RESTful APIs
  using Fastify on top of AWS Lambda and Amazon API Gateway.
- [`@fastify/basic-auth`](https://github.com/fastify/fastify-basic-auth) Basic
  auth plugin for Fastify.
- [`@fastify/bearer-auth`](https://github.com/fastify/fastify-bearer-auth)
  Bearer auth plugin for Fastify.
- [`@fastify/caching`](https://github.com/fastify/fastify-caching) General
  server-side cache and ETag support.
- [`@fastify/circuit-breaker`](https://github.com/fastify/fastify-circuit-breaker)
  A low overhead circuit breaker for your routes.
- [`@fastify/compress`](https://github.com/fastify/fastify-compress) Fastify
  compression utils.
- [`@fastify/cookie`](https://github.com/fastify/fastify-cookie) Parse and set
  cookie headers.
- [`@fastify/cors`](https://github.com/fastify/fastify-cors) Enables the use of
  CORS in a Fastify application.
- [`@fastify/csrf-protection`](https://github.com/fastify/csrf-protection) A
  plugin for adding
  [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) protection to
  Fastify.
- [`@fastify/elasticsearch`](https://github.com/fastify/fastify-elasticsearch)
  Plugin to share the same ES client.
- [`@fastify/env`](https://github.com/fastify/fastify-env) Load and check
  configuration.
- [`@fastify/etag`](https://github.com/fastify/fastify-etag) Automatically
  generate ETags for HTTP responses.
- [`@fastify/express`](https://github.com/fastify/fastify-express) Express
  compatibility layer for Fastify.
- [`@fastify/flash`](https://github.com/fastify/fastify-flash) Set and get flash
  messages using the session.
- [`@fastify/formbody`](https://github.com/fastify/fastify-formbody) Plugin to
  parse x-www-form-urlencoded bodies.
- [`@fastify/funky`](https://github.com/fastify/fastify-funky) Makes functional
  programming in Fastify more convenient. Adds support for Fastify routes
  returning functional structures, such as Either, Task or plain parameterless
  function.
- [`@fastify/helmet`](https://github.com/fastify/fastify-helmet) Important
  security headers for Fastify.
- [`@fastify/hotwire`](https://github.com/fastify/fastify-hotwire) Use the
  Hotwire pattern with Fastify.
- [`@fastify/http-proxy`](https://github.com/fastify/fastify-http-proxy) Proxy
  your HTTP requests to another server, with hooks.
- [`@fastify/jwt`](https://github.com/fastify/fastify-jwt) JWT utils for
  Fastify, internally uses [fast-jwt](https://github.com/nearform/fast-jwt).
- [`@fastify/kafka`](https://github.com/fastify/fastify-kafka) Plugin to interact
  with Apache Kafka.
- [`@fastify/leveldb`](https://github.com/fastify/fastify-leveldb) Plugin to
  share a common LevelDB connection across Fastify.
- [`@fastify/middie`](https://github.com/fastify/middie) Middleware engine for
  Fastify.
- [`@fastify/mongodb`](https://github.com/fastify/fastify-mongodb) Fastify
  MongoDB connection plugin, with which you can share the same MongoDB
  connection pool across every part of your server.
- [`@fastify/multipart`](https://github.com/fastify/fastify-multipart) Multipart
  support for Fastify.
- [`@fastify/mysql`](https://github.com/fastify/fastify-mysql) Fastify MySQL
  connection plugin.
- [`@fastify/nextjs`](https://github.com/fastify/fastify-nextjs) React
  server-side rendering support for Fastify with
  [Next](https://github.com/zeit/next.js/).
- [`@fastify/oauth2`](https://github.com/fastify/fastify-oauth2) Wrap around
  [`simple-oauth2`](https://github.com/lelylan/simple-oauth2).
- [`@fastify/one-line-logger`](https://github.com/fastify/one-line-logger) Formats
  Fastify's logs into a nice one-line message.
- [`@fastify/otel`](https://github.com/fastify/otel) OpenTelemetry
  instrumentation library.
- [`@fastify/passport`](https://github.com/fastify/fastify-passport) Use Passport
  strategies to authenticate requests and protect route.
- [`@fastify/postgres`](https://github.com/fastify/fastify-postgres) Fastify
  PostgreSQL connection plugin, with this you can share the same PostgreSQL
  connection pool in every part of your server.
- [`@fastify/rate-limit`](https://github.com/fastify/fastify-rate-limit) A low
  overhead rate limiter for your routes.
- [`@fastify/redis`](https://github.com/fastify/fastify-redis) Fastify Redis
  connection plugin, with which you can share the same Redis connection across
  every part of your server.
- [`@fastify/reply-from`](https://github.com/fastify/fastify-reply-from) Plugin
  to forward the current HTTP request to another server.
- [`@fastify/request-context`](https://github.com/fastify/fastify-request-context)
  Request-scoped storage, based on
  [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage)
  (with fallback to [cls-hooked](https://github.com/Jeff-Lewis/cls-hooked)),
  providing functionality similar to thread-local storages.
- [`@fastify/response-validation`](https://github.com/fastify/fastify-response-validation)
  A simple plugin that enables response validation for Fastify.
- [`@fastify/routes`](https://github.com/fastify/fastify-routes) Plugin that
  provides a `Map` of routes.
- [`@fastify/routes-stats`](https://github.com/fastify/fastify-routes-stats)
  Provide stats for routes using `node:perf_hooks`.
- [`@fastify/schedule`](https://github.com/fastify/fastify-schedule) Plugin for
  scheduling periodic jobs, based on
  [toad-scheduler](https://github.com/kibertoad/toad-scheduler).
- [`@fastify/secure-session`](https://github.com/fastify/fastify-secure-session)
  Create a secure stateless cookie session for Fastify.
- [`@fastify/sensible`](https://github.com/fastify/fastify-sensible) Defaults
  for Fastify that everyone can agree on. It adds some useful decorators such as
  HTTP errors and assertions, but also more request and reply methods.
- [`@fastify/session`](https://github.com/fastify/session) a session plugin for
  Fastify.
- [`@fastify/static`](https://github.com/fastify/fastify-static) Plugin for
  serving static files as fast as possible.
- [`@fastify/swagger`](https://github.com/fastify/fastify-swagger) Plugin for
  serving Swagger/OpenAPI documentation for Fastify, supporting dynamic
  generation.
- [`@fastify/swagger-ui`](https://github.com/fastify/fastify-swagger-ui) Plugin
  for serving Swagger UI.
- [`@fastify/throttle`](https://github.com/fastify/fastify-throttle) Plugin for
  throttling the download speed of a request.
- [`@fastify/type-provider-json-schema-to-ts`](https://github.com/fastify/fastify-type-provider-json-schema-to-ts)
  Fastify
  [type provider](https://fastify.dev/docs/latest/Reference/Type-Providers/)
  for [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts).
- [`@fastify/type-provider-typebox`](https://github.com/fastify/fastify-type-provider-typebox)
  Fastify
  [type provider](https://fastify.dev/docs/latest/Reference/Type-Providers/)
  for [Typebox](https://github.com/sinclairzx81/typebox).
- [`@fastify/under-pressure`](https://github.com/fastify/under-pressure) Measure
  process load with automatic handling of _"Service Unavailable"_ plugin for
  Fastify.
- [`@fastify/url-data`](https://github.com/fastify/fastify-url-data) Decorate
  the `Request` object with a method to access raw URL components.
- [`@fastify/view`](https://github.com/fastify/point-of-view) Templates
  rendering (_ejs, pug, handlebars, marko_) plugin support for Fastify.
- [`@fastify/vite`](https://github.com/fastify/fastify-vite) Integration with
  [Vite](https://vitejs.dev/), allows for serving SPA/MPA/SSR Vite applications.
- [`@fastify/websocket`](https://github.com/fastify/fastify-websocket) WebSocket
  support for Fastify. Built upon [ws](https://github.com/websockets/ws).
- [`@fastify/zipkin`](https://github.com/fastify/fastify-zipkin) Plugin
  for Zipkin distributed tracing system.

#### [Community](#community)

> ℹ️ Note:
> Fastify community plugins are part of the broader community efforts,
> and we are thankful for these contributions. However, they are not
> maintained by the Fastify team.
> Use them at your own discretion.
> If you find malicious code, please
> [open an issue](https://github.com/fastify/fastify/issues/new/choose) or
> submit a PR to remove the plugin from the list.

- [`@aaroncadillac/crudify-mongo`](https://github.com/aaroncadillac/crudify-mongo)
  A simple way to add a crud in your fastify project.
- [`@applicazza/fastify-nextjs`](https://github.com/applicazza/fastify-nextjs)
  Alternate Fastify and Next.js integration.
- [`@blastorg/fastify-aws-dynamodb-cache`](https://github.com/blastorg/fastify-aws-dynamodb-cache)
  A plugin to help with caching API responses using AWS DynamoDB.
- [`@clerk/fastify`](https://github.com/clerkinc/javascript/tree/main/packages/fastify)
  Add authentication and user management to your Fastify application with Clerk.
- [`@coobaha/typed-fastify`](https://github.com/Coobaha/typed-fastify) Strongly
  typed routes with a runtime validation using JSON schema generated from types.
- [`@dnlup/fastify-doc`](https://github.com/dnlup/fastify-doc) A plugin for
  sampling process metrics.
- [`@dnlup/fastify-traps`](https://github.com/dnlup/fastify-traps) A plugin to
  close the server gracefully on `SIGINT` and `SIGTERM` signals.
- [`@eropple/fastify-openapi3`](https://github.com/eropple/fastify-openapi3) Provides
  easy, developer-friendly OpenAPI 3.1 specs + doc explorer based on your routes.
- [`@ethicdevs/fastify-custom-session`](https://github.com/EthicDevs/fastify-custom-session)
  A plugin lets you use session and decide only where to load/save from/to. Has
  great TypeScript support + built-in adapters for common ORMs/databases (Firebase,
  Prisma Client, Postgres (wip), InMemory) and you can easily make your own adapter!
- [`@ethicdevs/fastify-git-server`](https://github.com/EthicDevs/fastify-git-server)
  A plugin to easily create git server and make one/many Git repositories available
  for clone/fetch/push through the standard `git` (over http) commands.
- [`@exortek/fastify-mongo-sanitize`](https://github.com/ExorTek/fastify-mongo-sanitize)
  A Fastify plugin that protects against No(n)SQL injection by sanitizing data.
- [`@exortek/remix-fastify`](https://github.com/ExorTek/remix-fastify)
  Fastify plugin for Remix.
- [`@fastify-userland/request-id`](https://github.com/fastify-userland/request-id)
  Fastify Request ID Plugin
- [`@fastify-userland/typeorm-query-runner`](https://github.com/fastify-userland/typeorm-query-runner)
  Fastify typeorm QueryRunner plugin
- [`@gquittet/graceful-server`](https://github.com/gquittet/graceful-server)
  Tiny (~5k), Fast, KISS, and dependency-free Node.js library to make your
  Fastify API graceful.
- [`@h4ad/serverless-adapter`](https://github.com/H4ad/serverless-adapter)
  Run REST APIs and other web applications using your existing Node.js
  application framework (Express, Koa, Hapi and Fastify), on top of AWS Lambda,
  Huawei and many other clouds.
- [`@immobiliarelabs/fastify-metrics`](https://github.com/immobiliare/fastify-metrics)
  Minimalistic and opinionated plugin that collects usage/process metrics and
  dispatches to [statsd](https://github.com/statsd/statsd).
- [`@inaiat/fastify-papr`](https://github.com/inaiat/fastify-papr)
  A plugin to integrate [Papr](https://github.com/plexinc/papr), 
  the MongoDB ORM for TypeScript & MongoDB, with Fastify.
- [`@jerome1337/fastify-enforce-routes-pattern`](https://github.com/Jerome1337/fastify-enforce-routes-pattern)
  A Fastify plugin that enforces naming pattern for routes path.
- [`@joggr/fastify-prisma`](https://github.com/joggrdocs/fastify-prisma)
  A plugin for accessing an instantiated PrismaClient on your server.
- [`@mgcrea/fastify-graceful-exit`](https://github.com/mgcrea/fastify-graceful-exit)
  A plugin to close the server gracefully
- [`@mgcrea/fastify-request-logger`](https://github.com/mgcrea/fastify-request-logger)
  A plugin to enable compact request logging for Fastify
- [`@mgcrea/fastify-session`](https://github.com/mgcrea/fastify-session) Session
  plugin for Fastify that supports both stateless and stateful sessions
- [`@mgcrea/fastify-session-redis-store`](https://github.com/mgcrea/fastify-session-redis-store)
  Redis store for @mgcrea/fastify-session using ioredis
- [`@mgcrea/fastify-session-sodium-crypto`](https://github.com/mgcrea/fastify-session-sodium-crypto)
  Fast sodium-based crypto for @mgcrea/fastify-session
- [`@mgcrea/pino-pretty-compact`](https://github.com/mgcrea/pino-pretty-compact)
  A custom compact pino-base prettifier
- [`@pybot/fastify-autoload`](https://github.com/kunal097/fastify-autoload)
  Plugin to generate routes automatically with valid json content
- [`@scalar/fastify-api-reference`](https://github.com/scalar/scalar/tree/main/integrations/fastify)
  Beautiful OpenAPI/Swagger API references for Fastify
- [`@trubavuong/fastify-seaweedfs`](https://github.com/trubavuong/fastify-seaweedfs)
  SeaweedFS for Fastify
- [`apitally`](https://github.com/apitally/apitally-js) Fastify plugin to
  integrate with [Apitally](https://apitally.io/fastify), an API analytics,
  logging and monitoring tool.
- [`arecibo`](https://github.com/nucleode/arecibo) Fastify ping responder for
  Kubernetes Liveness and Readiness Probes.
- [`aws-xray-sdk-fastify`](https://github.com/aws/aws-xray-sdk-node/tree/master/sdk_contrib/fastify)
  A Fastify plugin to log requests and subsegments through AWSXray.
- [`cls-rtracer`](https://github.com/puzpuzpuz/cls-rtracer) Fastify middleware
  for CLS-based request ID generation. An out-of-the-box solution for adding
  request IDs into your logs.
- [`electron-server`](https://github.com/anonrig/electron-server) A plugin for
  using Fastify without the need of consuming a port on Electron apps.
- [`fast-water`](https://github.com/tswayne/fast-water) A Fastify plugin for
  waterline. Decorates Fastify with waterline models.
- [`fastify-204`](https://github.com/Shiva127/fastify-204) Fastify plugin that
  return 204 status on empty response.
- [`fastify-405`](https://github.com/Eomm/fastify-405) Fastify plugin that adds
  405 HTTP status to your routes
- [`fastify-allow`](https://github.com/mattbishop/fastify-allow) Fastify plugin
  that automatically adds an Allow header to responses with routes. Also sends
  405 responses for routes that have a handler but not for the request's method.
- [`fastify-amqp`](https://github.com/RafaelGSS/fastify-amqp) Fastify AMQP
  connection plugin, to use with RabbitMQ or another connector. Just a wrapper
  to [`amqplib`](https://github.com/squaremo/amqp.node).
- [`fastify-amqp-async`](https://github.com/kffl/fastify-amqp-async) Fastify
  AMQP plugin with a Promise-based API provided by
  [`amqplib-as-promised`](https://github.com/twawszczak/amqplib-as-promised).
- [`fastify-angular-universal`](https://github.com/exequiel09/fastify-angular-universal)
  Angular server-side rendering support using
  [`@angular/platform-server`](https://github.com/angular/angular/tree/master/packages/platform-server)
  for Fastify
- [`fastify-api-key`](https://github.com/arkerone/fastify-api-key) Fastify
  plugin to authenticate HTTP requests based on API key and signature
- [`fastify-appwrite`](https://github.com/Dev-Manny/fastify-appwrite) Fastify
  Plugin for interacting with Appwrite server.
- [`fastify-asyncforge`](https://github.com/mcollina/fastify-asyncforge) Plugin
  to access Fastify instance, logger, request and reply from Node.js [Async
  Local Storage](https://nodejs.org/api/async_context.html#class-asynclocalstorage).
- [`fastify-at-mysql`](https://github.com/mateonunez/fastify-at-mysql) Fastify
  MySQL plugin with auto SQL injection attack prevention.
- [`fastify-at-postgres`](https://github.com/mateonunez/fastify-at-postgres) Fastify
  Postgres plugin with auto SQL injection attack prevention.
- [`fastify-auth0-verify`](https://github.com/nearform/fastify-auth0-verify):
  Auth0 verification plugin for Fastify, internally uses
  [fastify-jwt](https://npm.im/fastify-jwt) and
  [jsonwebtoken](https://npm.im/jsonwebtoken).
- [`fastify-autocrud`](https://github.com/paranoiasystem/fastify-autocrud)
  Plugin to auto-generate CRUD routes as fast as possible.
- [`fastify-autoroutes`](https://github.com/GiovanniCardamone/fastify-autoroutes)
  Plugin to scan and load routes based on filesystem path from a custom
  directory.
- [`fastify-aws-sns`](https://github.com/gzileni/fastify-aws-sns) Fastify plugin
  for AWS Simple Notification Service (AWS SNS) that coordinates and manages
  the delivery or sending of messages to subscribing endpoints or clients.
- [`fastify-aws-timestream`](https://github.com/gzileni/fastify-aws-timestream)
  Fastify plugin for managing databases, tables, and querying and creating
  scheduled queries with AWS Timestream.
- [`fastify-axios`](https://github.com/davidedantonio/fastify-axios) Plugin to
  send HTTP requests via [axios](https://github.com/axios/axios).
- [`fastify-babel`](https://github.com/cfware/fastify-babel) Fastify plugin for
  development servers that require Babel transformations of JavaScript sources.
- [`fastify-bcrypt`](https://github.com/beliven-it/fastify-bcrypt) A Bcrypt hash
  generator & checker.
- [`fastify-better-sqlite3`](https://github.com/punkish/fastify-better-sqlite3)
  Plugin for better-sqlite3.
- [`fastify-blipp`](https://github.com/PavelPolyakov/fastify-blipp) Prints your
  routes to the console, so you definitely know which endpoints are available.
- [`fastify-bookshelf`](https://github.com/butlerx/fastify-bookshelfjs) Fastify
  plugin to add [bookshelf.js](https://bookshelfjs.org/) ORM support.
- [`fastify-boom`](https://github.com/jeromemacias/fastify-boom) Fastify plugin
  to add [boom](https://github.com/hapijs/boom) support.
- [`fastify-bree`](https://github.com/climba03003/fastify-bree) Fastify plugin
  to add [bree](https://github.com/breejs/bree) support.
- [`fastify-bugsnag`](https://github.com/ZigaStrgar/fastify-bugsnag) Fastify plugin
  to add support for [Bugsnag](https://www.bugsnag.com/) error reporting.
- [`fastify-cacheman`](https://gitlab.com/aalfiann/fastify-cacheman)
  Small and efficient cache provider for Node.js with In-memory, File, Redis
   and MongoDB engines for Fastify
- [`fastify-casbin`](https://github.com/nearform/fastify-casbin) Casbin support
  for Fastify.
- [`fastify-casbin-rest`](https://github.com/nearform/fastify-casbin-rest)
  Casbin support for Fastify based on a RESTful model.
- [`fastify-casl`](https://github.com/Inlecom/fastify-casl) Fastify
  [CASL](https://github.com/stalniy/casl) plugin that supports ACL-like
  protection of endpoints via either a preSerialization & preHandler hook,
  sanitizing the inputs and outputs of your application based on user rights.
- [`fastify-cloudevents`](https://github.com/smartiniOnGitHub/fastify-cloudevents)
  Fastify plugin to generate and forward Fastify events in the Cloudevents
  format.
- [`fastify-cloudflare-turnstile`](https://github.com/112RG/fastify-cloudflare-turnstile)
  Fastify plugin for CloudFlare Turnstile.
- [`fastify-cloudinary`](https://github.com/Vanilla-IceCream/fastify-cloudinary)
  Plugin to share a common Cloudinary connection across Fastify.
- [`fastify-cockroachdb`](https://github.com/alex-ppg/fastify-cockroachdb)
  Fastify plugin to connect to a CockroachDB PostgreSQL instance via the
  Sequelize ORM.
- [`fastify-constraints`](https://github.com/nearform/fastify-constraints)
  Fastify plugin to add constraints to multiple routes
- [`fastify-couchdb`](https://github.com/nigelhanlon/fastify-couchdb) Fastify
  plugin to add CouchDB support via [nano](https://github.com/apache/nano).
- [`fastify-crud-generator`](https://github.com/beliven-it/fastify-crud-generator)
  A plugin to rapidly generate CRUD routes for any entity.
- [`fastify-custom-healthcheck`](https://github.com/gkampitakis/fastify-custom-healthcheck)
  Fastify plugin to add health route in your server that asserts custom
  functions.
- [`fastify-decorators`](https://github.com/L2jLiga/fastify-decorators) Fastify
  plugin that provides the set of TypeScript decorators.
- [`fastify-delay-request`](https://github.com/climba03003/fastify-delay-request)
  Fastify plugin that allows requests to be delayed whilst a task the response is
  dependent on is run, such as a resource intensive process.
- [`fastify-disablecache`](https://github.com/Fdawgs/fastify-disablecache)
  Fastify plugin to disable client-side caching, inspired by
  [nocache](https://github.com/helmetjs/nocache).
- [`fastify-dynamodb`](https://github.com/matrus2/fastify-dynamodb) AWS DynamoDB
  plugin for Fastify. It exposes
  [AWS.DynamoDB.DocumentClient()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)
  object.
- [`fastify-dynareg`](https://github.com/greguz/fastify-dynareg) Dynamic plugin
  register for Fastify.
- [`fastify-envalid`](https://github.com/alemagio/fastify-envalid) Fastify
  plugin to integrate [envalid](https://github.com/af/envalid) in your Fastify
  project.
- [`fastify-error-page`](https://github.com/hemerajs/fastify-error-page) Fastify
  plugin to print errors in structured HTML to the browser.
- [`fastify-esso`](https://github.com/patrickpissurno/fastify-esso) The easiest
  authentication plugin for Fastify, with built-in support for Single sign-on
  (and great documentation).
- [`fastify-event-bus`](https://github.com/Shiva127/fastify-event-bus) Event bus
  support for Fastify. Built upon [js-event-bus](https://github.com/bcerati/js-event-bus).
- [`fastify-evervault`](https://github.com/Briscoooe/fastify-evervault/) Fastify
  plugin for instantiating and encapsulating the
  [Evervault](https://evervault.com/) client.
- [`fastify-explorer`](https://github.com/Eomm/fastify-explorer) Get control of
  your decorators across all the encapsulated contexts.
- [`fastify-favicon`](https://github.com/smartiniOnGitHub/fastify-favicon)
  Fastify plugin to serve default favicon.
- [`fastify-feature-flags`](https://gitlab.com/m03geek/fastify-feature-flags)
  Fastify feature flags plugin with multiple providers support (e.g. env,
  [config](https://lorenwest.github.io/node-config/),
  [unleash](https://unleash.github.io/)).
- [`fastify-file-routes`](https://github.com/spa5k/fastify-file-routes) Get
  Next.js based file system routing into fastify.
- [`fastify-file-upload`](https://github.com/huangang/fastify-file-upload)
  Fastify plugin for uploading files.
- [`fastify-firebase`](https://github.com/now-ims/fastify-firebase) Fastify
  plugin for [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
  to Fastify so you can easily use Firebase Auth, Firestore, Cloud Storage,
  Cloud Messaging, and more.
- [`fastify-firebase-auth`](https://github.com/oxsav/fastify-firebase-auth)
  Firebase Authentication for Fastify supporting all of the methods relating to
  the authentication API.
- [`fastify-formidable`](https://github.com/climba03003/fastify-formidable)
  Handy plugin to provide multipart support and fastify-swagger integration.
- [`fastify-gcloud-trace`](https://github.com/mkinoshi/fastify-gcloud-trace)
  [Google Cloud Trace API](https://cloud.google.com/trace/docs/reference)
  Connector for Fastify.
- [`fastify-get-head`](https://github.com/MetCoder95/fastify-get-head) Small
  plugin to set a new HEAD route handler for each GET route previously
  registered in Fastify.
- [`fastify-get-only`](https://github.com/DanieleFedeli/fastify-get-only) Small
  plugin used to make fastify accept only GET requests
- [`fastify-good-sessions`](https://github.com/Phara0h/fastify-good-sessions) A
  good Fastify sessions plugin focused on speed.
- [`fastify-google-cloud-storage`](https://github.com/carlozamagni/fastify-google-cloud-storage)
  Fastify plugin that exposes a GCP Cloud Storage client instance.
- [`fastify-graceful-shutdown`](https://github.com/hemerajs/fastify-graceful-shutdown)
  Shutdown Fastify gracefully and asynchronously.
- [`fastify-grant`](https://github.com/simov/fastify-grant)
  Authentication/Authorization plugin for Fastify that supports 200+ OAuth
  Providers.
- [`fastify-guard`](https://github.com/hsynlms/fastify-guard) A Fastify plugin
  that protects endpoints by checking authenticated user roles and/or scopes.
- [`fastify-hana`](https://github.com/yoav0gal/fastify-hana) connects your
  application to [`SAP-HANA`](https://help.sap.com/docs/SAP_HANA_CLIENT).
- [`fastify-hashids`](https://github.com/andersonjoseph/fastify-hashids) A Fastify
  plugin to encode/decode IDs using [hashids](https://github.com/niieani/hashids.js).
- [`fastify-hasura`](https://github.com/ManUtopiK/fastify-hasura) A Fastify
  plugin to have fun with [Hasura](https://github.com/hasura/graphql-engine).
- [`fastify-healthcheck`](https://github.com/smartiniOnGitHub/fastify-healthcheck)
  Fastify plugin to serve a health check route and a probe script.
- [`fastify-hemera`](https://github.com/hemerajs/fastify-hemera) Fastify Hemera
  plugin, for writing reliable & fault-tolerant microservices with
  [nats.io](https://nats.io/).
- [`fastify-hl7`](https://github.com/Bugs5382/fastify-hl7) A Fastify Plugin to
  create a server, build, and send HL7 formatted Hl7 messages. Using
  [node-hl7-client](https://github.com/Bugs5382/node-hl7-client) and
  [node-hl7-server](https://github.com/Bugs5382/node-hl7-server) as the
  underlining technology to do this.
- [`fastify-http-client`](https://github.com/kenuyx/fastify-http-client) Plugin
  to send HTTP(s) requests. Built upon [urllib](https://github.com/node-modules/urllib).
- [`fastify-http-context`](https://github.com/thorough-developer/fastify-http-context)
  Fastify plugin for "simulating" a thread of execution to allow for true HTTP
  context to take place per API call within the Fastify lifecycle of calls.
- [`fastify-http-errors-enhanced`](https://github.com/ShogunPanda/fastify-http-errors-enhanced)
  An error handling plugin for Fastify that uses enhanced HTTP errors.
- [`fastify-http2https`](https://github.com/lolo32/fastify-http2https) Redirect
  HTTP requests to HTTPS, both using the same port number, or different response
  on HTTP and HTTPS.
- [`fastify-https-always`](https://github.com/mattbishop/fastify-https-always)
  Lightweight, proxy-aware redirect plugin from HTTP to HTTPS.
- [`fastify-https-redirect`](https://github.com/tomsvogel/fastify-https-redirect)
  Fastify plugin for auto-redirect from HTTP to HTTPS.
- [`fastify-i18n`](https://github.com/Vanilla-IceCream/fastify-i18n)
  Internationalization plugin for Fastify. Built upon node-polyglot.
- [`fastify-impressions`](https://github.com/manju4ever/fastify-impressions)
  Fastify plugin to track impressions of all the routes.
- [`fastify-influxdb`](https://github.com/alex-ppg/fastify-influxdb) Fastify
  InfluxDB plugin connecting to an InfluxDB instance via the Influx default
  package.
- [`fastify-ip`](https://github.com/metcoder95/fastify-ip) A plugin
  for Fastify that allows you to infer a request ID by a
  given set of custom Request headers.
- [`fastify-json-to-xml`](https://github.com/Fdawgs/fastify-json-to-xml) Fastify
  plugin to serialize JSON responses into XML.
- [`fastify-jwt-authz`](https://github.com/Ethan-Arrowood/fastify-jwt-authz) JWT
  user scope verifier.
- [`fastify-jwt-webapp`](https://github.com/charlesread/fastify-jwt-webapp) JWT
  authentication for Fastify-based web apps.
- [`fastify-kafkajs`](https://github.com/kffl/fastify-kafkajs) Fastify plugin
  that adds support for KafkaJS - a modern Apache Kafka client library.
- [`fastify-keycloak-adapter`](https://github.com/yubinTW/fastify-keycloak-adapter)
  A keycloak adapter for a Fastify app.
- [`fastify-knexjs`](https://github.com/chapuletta/fastify-knexjs) Fastify
  plugin for supporting KnexJS Query Builder.
- [`fastify-knexjs-mock`](https://github.com/chapuletta/fastify-knexjs-mock)
  Fastify Mock KnexJS for testing support.
- [`fastify-koa`](https://github.com/rozzilla/fastify-koa) Convert Koa
middlewares into Fastify plugins
- [`fastify-kubernetes`](https://github.com/greguz/fastify-kubernetes) Fastify
  Kubernetes client plugin.
- [`fastify-kysely`](https://github.com/alenap93/fastify-kysely) Fastify
  plugin for supporting Kysely type-safe query builder.
- [`fastify-language-parser`](https://github.com/lependu/fastify-language-parser)
  Fastify plugin to parse request language.
- [`fastify-lcache`](https://github.com/denbon05/fastify-lcache)
  Lightweight cache plugin
- [`fastify-list-routes`](https://github.com/chuongtrh/fastify-list-routes)
  A simple plugin for Fastify to list all available routes.
- [`fastify-lm`](https://github.com/galiprandi/fastify-lm#readme)
  Use OpenAI, Claude, Google, Deepseek, and others LMs with one Fastify plugin.
- [`fastify-loader`](https://github.com/TheNoim/fastify-loader) Load routes from
  a directory and inject the Fastify instance in each file.
- [`fastify-log-controller`](https://github.com/Eomm/fastify-log-controller/)
  changes the log level of your Fastify server at runtime.
- [`fastify-lured`](https://github.com/lependu/fastify-lured) Plugin to load lua
  scripts with [fastify-redis](https://github.com/fastify/fastify-redis) and
  [lured](https://github.com/enobufs/lured).
  A plugin to implement [Lyra](https://github.com/LyraSearch/lyra) search engine
  on Fastify.
- [`fastify-mailer`](https://github.com/coopflow/fastify-mailer) Plugin to
  initialize and encapsulate [Nodemailer](https://nodemailer.com)'s transporters
  instances in Fastify.
- [`fastify-markdown`](https://github.com/freezestudio/fastify-markdown) Plugin
  to markdown support.
- [`fastify-method-override`](https://github.com/corsicanec82/fastify-method-override)
  Plugin for Fastify, which allows the use of HTTP verbs, such as DELETE, PATCH,
  HEAD, PUT, OPTIONS in case the client doesn't support them.
- [`fastify-metrics`](https://gitlab.com/m03geek/fastify-metrics) Plugin for
  exporting [Prometheus](https://prometheus.io) metrics.
- [`fastify-minify`](https://github.com/Jelenkee/fastify-minify) Plugin for
  minification and transformation of responses.
- [`fastify-mongo-memory`](https://github.com/chapuletta/fastify-mongo-memory)
  Fastify MongoDB in Memory Plugin for testing support.
- [`fastify-mongodb-sanitizer`](https://github.com/KlemenKozelj/fastify-mongodb-sanitizer)
  Fastify plugin that sanitizes client input to prevent
  potential MongoDB query injection attacks.
- [`fastify-mongoose-api`](https://github.com/jeka-kiselyov/fastify-mongoose-api)
  Fastify plugin to create REST API methods based on Mongoose MongoDB models.
- [`fastify-mongoose-driver`](https://github.com/alex-ppg/fastify-mongoose)
  Fastify Mongoose plugin that connects to a MongoDB via the Mongoose plugin
  with support for Models.
- [`fastify-mqtt`](https://github.com/love-lena/fastify-mqtt) Plugin to share
  [mqtt](https://www.npmjs.com/package/mqtt) client across Fastify.
- [`fastify-msgpack`](https://github.com/kenriortega/fastify-msgpack) Fastify
  and MessagePack, together at last. Uses @msgpack/msgpack by default.
- [`fastify-msgraph-webhook`](https://github.com/flower-of-the-bridges/fastify-msgraph-change-notifications-webhook)
  to manage
  [MS Graph Change Notifications webhooks](https://learn.microsoft.com/it-it/graph/change-notifications-delivery-webhooks?tabs=http).
- [`fastify-multer`](https://github.com/fox1t/fastify-multer) Multer is a plugin
  for handling multipart/form-data, which is primarily used for uploading files.
- [`fastify-nats`](https://github.com/mahmed8003/fastify-nats) Plugin to share
  [NATS](https://nats.io) client across Fastify.
- [`fastify-next-auth`](https://github.com/wobsoriano/fastify-next-auth)
  NextAuth.js plugin for Fastify.
- [`fastify-no-additional-properties`](https://github.com/greguz/fastify-no-additional-properties)
  Add `additionalProperties: false` by default to your JSON Schemas.
- [`fastify-no-icon`](https://github.com/jsumners/fastify-no-icon) Plugin to
  eliminate thrown errors for `/favicon.ico` requests.
- [`fastify-normalize-request-reply`](https://github.com/ericrglass/fastify-normalize-request-reply)
  Plugin to normalize the request and reply to the Express version 4.x request
  and response, which allows use of middleware, like swagger-stats, that was
  originally written for Express.
- [`fastify-now`](https://github.com/yonathan06/fastify-now) Structure your
  endpoints in a folder and load them dynamically with Fastify.
- [`fastify-nuxtjs`](https://github.com/gomah/fastify-nuxtjs) Vue server-side
  rendering support for Fastify with Nuxt.js Framework.
- [`fastify-oas`](https://gitlab.com/m03geek/fastify-oas) Generates OpenAPI 3.0+
  documentation from routes schemas for Fastify.
- [`fastify-objectionjs`](https://github.com/jarcodallo/fastify-objectionjs)
  Plugin for the Fastify framework that provides integration with objectionjs
  ORM.
- [`fastify-objectionjs-classes`](https://github.com/kamikazechaser/fastify-objectionjs-classes)
  Plugin to cherry-pick classes from objectionjs ORM.
- [`fastify-opaque-apake`](https://github.com/squirrelchat/fastify-opaque-apake)
  A Fastify plugin to implement the OPAQUE aPAKE protocol. Uses
  [@squirrelchat/opaque-wasm-server](https://github.com/squirrelchat/opaque-wasm).
- [`fastify-openapi-docs`](https://github.com/ShogunPanda/fastify-openapi-docs)
  A Fastify plugin that generates OpenAPI spec automatically.
- [`fastify-openapi-glue`](https://github.com/seriousme/fastify-openapi-glue)
  Glue for OpenAPI specifications in Fastify, autogenerates routes based on an
  OpenAPI Specification.
- [`fastify-opentelemetry`](https://github.com/autotelic/fastify-opentelemetry)
  A Fastify plugin that uses the [OpenTelemetry
  API](https://github.com/open-telemetry/opentelemetry-js-api) to provide
  request tracing.
- [`fastify-oracle`](https://github.com/cemremengu/fastify-oracle) Attaches an
  [`oracledb`](https://github.com/oracle/node-oracledb) connection pool to a
  Fastify server instance.
- [`fastify-orama`](https://github.com/mateonunez/fastify-orama)
- [`fastify-orientdb`](https://github.com/mahmed8003/fastify-orientdb) Fastify
  OrientDB connection plugin, with which you can share the OrientDB connection
  across every part of your server.
- [`fastify-osm`](https://github.com/gzileni/fastify-osm) Fastify
  OSM plugin to run overpass queries by OpenStreetMap.
- [`fastify-override`](https://github.com/matthyk/fastify-override)
  Fastify plugin to override decorators, plugins and hooks for testing purposes
- [`fastify-passkit-webservice`](https://github.com/alexandercerutti/fastify-passkit-webservice)
  A set of Fastify plugins to integrate Apple Wallet Web Service specification
- [`fastify-peekaboo`](https://github.com/simone-sanfratello/fastify-peekaboo)
  Fastify plugin for memoize responses by expressive settings.
- [`fastify-piscina`](https://github.com/piscinajs/fastify-piscina) A worker
  thread pool plugin using [Piscina](https://github.com/piscinajs/piscina).
- [`fastify-polyglot`](https://github.com/beliven-it/fastify-polyglot) A plugin to
  handle i18n using
  [node-polyglot](https://www.npmjs.com/package/node-polyglot).
- [`fastify-postgraphile`](https://github.com/alemagio/fastify-postgraphile)
  Plugin to integrate [PostGraphile](https://www.graphile.org/postgraphile/) in
  a Fastify project.
- [`fastify-postgres-dot-js`](https://github.com/kylerush/fastify-postgresjs) Fastify
  PostgreSQL connection plugin that uses [Postgres.js](https://github.com/porsager/postgres).
- [`fastify-prettier`](https://github.com/hsynlms/fastify-prettier) A Fastify
  plugin that uses [prettier](https://github.com/prettier/prettier) under the
  hood to beautify outgoing responses and/or other things in the Fastify server.
- [`fastify-print-routes`](https://github.com/ShogunPanda/fastify-print-routes)
  A Fastify plugin that prints all available routes.
- [`fastify-protobufjs`](https://github.com/kenriortega/fastify-protobufjs)
  Fastify and protobufjs, together at last. Uses protobufjs by default.
- [`fastify-qrcode`](https://github.com/chonla/fastify-qrcode) This plugin
  utilizes [qrcode](https://github.com/soldair/node-qrcode) to generate QR Code.
- [`fastify-qs`](https://github.com/vanodevium/fastify-qs) A plugin for Fastify
  that adds support for parsing URL query parameters with
  [qs](https://github.com/ljharb/qs).
- [`fastify-rabbitmq`](https://github.com/Bugs5382/fastify-rabbitmq) Fastify
  RabbitMQ plugin that uses
  [node-rabbitmq-client](https://github.com/cody-greene/node-rabbitmq-client)
  plugin as a wrapper.
- [`fastify-racing`](https://github.com/metcoder95/fastify-racing) Fastify's
  plugin that adds support to handle an aborted request asynchronous.
- [`fastify-ravendb`](https://github.com/nearform/fastify-ravendb) RavenDB
  connection plugin. It exposes the same `DocumentStore` (or multiple ones)
  across the whole Fastify application.
- [`fastify-raw-body`](https://github.com/Eomm/fastify-raw-body) Add the
  `request.rawBody` field.
- [`fastify-rbac`](https://gitlab.com/m03geek/fastify-rbac) Fastify role-based
  access control plugin.
- [`fastify-recaptcha`](https://github.com/qwertyforce/fastify-recaptcha)
  Fastify plugin for reCAPTCHA verification.
- [`fastify-redis-channels`](https://github.com/hearit-io/fastify-redis-channels)
  A plugin for fast, reliable, and scalable channels implementation based on
  Redis streams.
- [`fastify-redis-session`](https://github.com/mohammadraufzahed/fastify-redis-session)
  Redis Session plugin for fastify.
- [`fastify-register-routes`](https://github.com/israeleriston/fastify-register-routes)
  Plugin to automatically load routes from a specified path and optionally limit
  loaded file names by a regular expression.
- [`fastify-response-caching`](https://github.com/codeaholicguy/fastify-response-caching)
  A Fastify plugin for caching the response.
- [`fastify-response-time`](https://github.com/lolo32/fastify-response-time) Add
  `X-Response-Time` header at each request for Fastify, in milliseconds.
- [`fastify-resty`](https://github.com/FastifyResty/fastify-resty) Fastify-based
  web framework with REST API routes auto-generation for TypeORM entities using
  DI and decorators.
- [`fastify-reverse-routes`](https://github.com/dimonnwc3/fastify-reverse-routes)
  Fastify reverse routes plugin, allows to defined named routes and build path
  using name and parameters.
- [`fastify-rob-config`](https://github.com/jeromemacias/fastify-rob-config)
  Fastify Rob-Config integration.
- [`fastify-route-group`](https://github.com/TakNePoidet/fastify-route-group)
  Convenient grouping and inheritance of routes.
- [`fastify-s3-buckets`](https://github.com/kibertoad/fastify-s3-buckets)
  Ensure the existence of defined S3 buckets on the application startup.
- [`fastify-schema-constraint`](https://github.com/Eomm/fastify-schema-constraint)
  Choose the JSON schema to use based on request parameters.
- [`fastify-schema-to-typescript`](https://github.com/thomasthiebaud/fastify-schema-to-typescript)
  Generate typescript types based on your JSON/YAML validation schemas so they
  are always in sync.
- [`fastify-sentry`](https://github.com/alex-ppg/fastify-sentry) Fastify plugin
  to add the Sentry SDK error handler to requests.
- [`fastify-sequelize`](https://github.com/lyquocnam/fastify-sequelize) Fastify
  plugin work with Sequelize (adapter for Node.js -> Sqlite, Mysql, Mssql,
  Postgres).
- [`fastify-server-session`](https://github.com/jsumners/fastify-server-session)
  A session plugin with support for arbitrary backing caches via
  `fastify-caching`.
- [`fastify-shared-schema`](https://github.com/Adibla/fastify-shared-schema) Plugin
  for sharing schemas between different routes.
- [`fastify-slonik`](https://github.com/Unbuttun/fastify-slonik) Fastify Slonik
  plugin, with this you can use slonik in every part of your server.
- [`fastify-slow-down`](https://github.com/nearform/fastify-slow-down) A plugin
  to delay the response from the server.
- [`fastify-socket.io`](https://github.com/alemagio/fastify-socket.io) a
  Socket.io plugin for Fastify.
- [`fastify-split-validator`](https://github.com/MetCoder95/fastify-split-validator)
  Small plugin to allow you use multiple validators in one route based on each
  HTTP part of the request.
- [`fastify-sqlite`](https://github.com/Eomm/fastify-sqlite) connects your
  application to a sqlite3 database.
- [`fastify-sqlite-typed`](https://github.com/yoav0gal/fastify-sqlite-typed) connects
  your application to a SQLite database with full Typescript support.
- [`fastify-sse`](https://github.com/lolo32/fastify-sse) to provide Server-Sent
  Events with `reply.sse( … )` to Fastify.
- [`fastify-sse-v2`](https://github.com/nodefactoryio/fastify-sse-v2) to provide
  Server-Sent Events using Async Iterators (supports newer versions of Fastify).
- [`fastify-ssr-vite`](https://github.com/nineohnine/fastify-ssr-vite) A simple
  plugin for setting up server side rendering with vite.
- [`fastify-stripe`](https://github.com/coopflow/fastify-stripe) Plugin to
  initialize and encapsulate [Stripe
  Node.js](https://github.com/stripe/stripe-node) instances in Fastify.
- [`fastify-supabase`](https://github.com/coopflow/fastify-supabase) Plugin to
  initialize and encapsulate [Supabase](https://github.com/supabase/supabase-js)
  instances in Fastify.
- [`fastify-tls-keygen`](https://gitlab.com/sebdeckers/fastify-tls-keygen)
  Automatically generate a browser-compatible, trusted, self-signed,
  localhost-only, TLS certificate.
- [`fastify-tokenize`](https://github.com/Bowser65/fastify-tokenize)
  [Tokenize](https://github.com/Bowser65/Tokenize) plugin for Fastify that
  removes the pain of managing authentication tokens, with built-in integration
  for `fastify-auth`.
- [`fastify-totp`](https://github.com/beliven-it/fastify-totp) A plugin to handle
  TOTP (e.g. for 2FA).
- [`fastify-twitch-ebs-tools`](https://github.com/lukemnet/fastify-twitch-ebs-tools)
  Useful functions for Twitch Extension Backend Services (EBS).
- [`fastify-type-provider-effect-schema`](https://github.com/daotl/fastify-type-provider-effect-schema)
  Fastify
  [type provider](https://fastify.dev/docs/latest/Reference/Type-Providers/)
  for [@effect/schema](https://github.com/effect-ts/schema).
- [`fastify-type-provider-zod`](https://github.com/turkerdev/fastify-type-provider-zod)
  Fastify
  [type provider](https://fastify.dev/docs/latest/Reference/Type-Providers/)
  for [zod](https://github.com/colinhacks/zod).
- [`fastify-typeorm-plugin`](https://github.com/inthepocket/fastify-typeorm-plugin)
  Fastify plugin to work with TypeORM.
- [`fastify-user-agent`](https://github.com/Eomm/fastify-user-agent) parses your
  request's `user-agent` header.
- [`fastify-uws`](https://github.com/geut/fastify-uws) A Fastify plugin to
  use the web server [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js).
- [`fastify-vhost`](https://github.com/patrickpissurno/fastify-vhost) Proxy
  subdomain HTTP requests to another server (useful if you want to point
  multiple subdomains to the same IP address, while running different servers on
  the same machine).
- [`fastify-vite`](https://github.com/galvez/fastify-vite)
  [Vite](https://vitejs.dev/) plugin for Fastify with SSR data support.
- [`fastify-vue-plugin`](https://github.com/TheNoim/fastify-vue)
  [Nuxt.js](https://nuxtjs.org) plugin for Fastify. Control the routes nuxt
  should use.
- [`fastify-wamp-router`](https://github.com/lependu/fastify-wamp-router) Web
  Application Messaging Protocol router for Fastify.
- [`fastify-web-response`](https://github.com/erfanium/fastify-web-response)
  Enables returning web streams objects `Response` and `ReadableStream` in routes.
- [`fastify-webpack-hmr`](https://github.com/lependu/fastify-webpack-hmr)
  Webpack hot module reloading plugin for Fastify.
- [`fastify-webpack-hot`](https://github.com/gajus/fastify-webpack-hot) Webpack
  Hot Module Replacement for Fastify.
- [`fastify-ws`](https://github.com/gj/fastify-ws) WebSocket integration for
  Fastify — with support for WebSocket lifecycle hooks instead of a single
  handler function. Built upon [ws](https://github.com/websockets/ws) and
  [uws](https://github.com/uNetworking/uWebSockets).
- [`fastify-xml-body-parser`](https://github.com/NaturalIntelligence/fastify-xml-body-parser)
  Parse XML payload / request body into JS / JSON object.
- [`http-wizard`](https://github.com/flodlc/http-wizard)
  Exports a typescript API client for your Fastify API and ensures fullstack type
  safety for your project.
- [`i18next-http-middleware`](https://github.com/i18next/i18next-http-middleware#fastify-usage)
  An [i18next](https://www.i18next.com) based i18n (internationalization)
  middleware to be used with Node.js web frameworks like Express or Fastify and
  also for Deno.
- [`k-fastify-gateway`](https://github.com/jkyberneees/fastify-gateway) API
  Gateway plugin for Fastify, a low footprint implementation that uses the
  `fastify-reply-from` HTTP proxy library.
- [`mercurius`](https://mercurius.dev/) A fully-featured and performant GraphQL
  server implementation for Fastify.
- [`nstats`](https://github.com/Phara0h/nstats) A fast and compact way to get
  all your network and process stats for your node application. Websocket,
  HTTP/S, and prometheus compatible!
- [`oas-fastify`](https://github.com/ahmadnassri/node-oas-fastify) OAS 3.x to
  Fastify routes automation. Automatically generates route handlers with fastify
  configuration and validation.
- [`openapi-validator-middleware`](https://github.com/PayU/openapi-validator-middleware#fastify)
  Swagger and OpenAPI 3.0 spec-based request validation middleware that supports
  Fastify.
- [`pubsub-http-handler`](https://github.com/simenandre/pubsub-http-handler) A Fastify
  plugin to easily create Google Cloud PubSub endpoints.
- [`sequelize-fastify`](https://github.com/hsynlms/sequelize-fastify) A simple
  and lightweight Sequelize plugin for Fastify.
- [`typeorm-fastify-plugin`](https://github.com/jclemens24/fastify-typeorm) A simple
  and updated Typeorm plugin for use with Fastify.

#### [Community Tools](#community-tools)

- [`@fastify-userland/workflows`](https://github.com/fastify-userland/workflows)
  Reusable workflows for use in the Fastify plugin
- [`fast-maker`](https://github.com/imjuni/fast-maker) route configuration
  generator by directory structure.
- [`fastify-flux`](https://github.com/Jnig/fastify-flux) Tool for building
  Fastify APIs using decorators and convert Typescript interface to JSON Schema.
- [`jeasx`](https://www.jeasx.dev)
  A flexible server-rendering framework built on Fastify
  that leverages asynchronous JSX to simplify web development.
- [`simple-tjscli`](https://github.com/imjuni/simple-tjscli) CLI tool to
  generate JSON Schema from TypeScript interfaces.
- [`vite-plugin-fastify`](https://github.com/Vanilla-IceCream/vite-plugin-fastify)
  Fastify plugin for Vite with Hot-module Replacement.
- [`vite-plugin-fastify-routes`](https://github.com/Vanilla-IceCream/vite-plugin-fastify-routes)
  File-based routing for Fastify applications using Vite.
````

## Source: https://fastify.dev/docs/latest/Guides/Fluent-Schema
````markdown
<h1 align="center">Fastify</h1>

## Fluent Schema

The [Validation and
Serialization](../Reference/Validation-and-Serialization.md) documentation
outlines all parameters accepted by Fastify to set up JSON Schema Validation to
validate the input, and JSON Schema Serialization to optimize the output.

[`fluent-json-schema`](https://github.com/fastify/fluent-json-schema) can be
used to simplify this task while allowing the reuse of constants.

### Basic settings

```js
const S = require('fluent-json-schema')

// You can have an object like this, or query a DB to get the values
const MY_KEYS = {
  KEY1: 'ONE',
  KEY2: 'TWO'
}

const bodyJsonSchema = S.object()
  .prop('someKey', S.string())
  .prop('someOtherKey', S.number())
  .prop('requiredKey', S.array().maxItems(3).items(S.integer()).required())
  .prop('nullableKey', S.mixed([S.TYPES.NUMBER, S.TYPES.NULL]))
  .prop('multipleTypesKey', S.mixed([S.TYPES.BOOLEAN, S.TYPES.NUMBER]))
  .prop('multipleRestrictedTypesKey', S.oneOf([S.string().maxLength(5), S.number().minimum(10)]))
  .prop('enumKey', S.enum(Object.values(MY_KEYS)))
  .prop('notTypeKey', S.not(S.array()))

const queryStringJsonSchema = S.object()
  .prop('name', S.string())
  .prop('excitement', S.integer())

const paramsJsonSchema = S.object()
  .prop('par1', S.string())
  .prop('par2', S.integer())

const headersJsonSchema = S.object()
  .prop('x-foo', S.string().required())

// Note that there is no need to call `.valueOf()`!
const schema = {
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema, // (or) query: queryStringJsonSchema
  params: paramsJsonSchema,
  headers: headersJsonSchema
}

fastify.post('/the/url', { schema }, handler)
```

### Reuse

With `fluent-json-schema`, you can manipulate your schemas more easily and
programmatically and then reuse them thanks to the `addSchema()` method. You can
refer to the schema in two different manners that are detailed in the
[Validation and
Serialization](../Reference/Validation-and-Serialization.md#adding-a-shared-schema)
documentation.

Here are some usage examples:

**`$ref-way`**: refer to an external schema.

```js
const addressSchema = S.object()
  .id('#address')
  .prop('line1').required()
  .prop('line2')
  .prop('country').required()
  .prop('city').required()
  .prop('zipcode').required()

const commonSchemas = S.object()
  .id('https://fastify/demo')
  .definition('addressSchema', addressSchema)
  .definition('otherSchema', otherSchema) // You can add any schemas you need

fastify.addSchema(commonSchemas)

const bodyJsonSchema = S.object()
  .prop('residence', S.ref('https://fastify/demo#address')).required()
  .prop('office', S.ref('https://fastify/demo#/definitions/addressSchema')).required()

const schema = { body: bodyJsonSchema }

fastify.post('/the/url', { schema }, handler)
```


**`replace-way`**: refer to a shared schema to replace before the validation
process.

```js
const sharedAddressSchema = {
  $id: 'sharedAddress',
  type: 'object',
  required: ['line1', 'country', 'city', 'zipcode'],
  properties: {
    line1: { type: 'string' },
    line2: { type: 'string' },
    country: { type: 'string' },
    city: { type: 'string' },
    zipcode: { type: 'string' }
  }
}
fastify.addSchema(sharedAddressSchema)

const bodyJsonSchema = {
  type: 'object',
  properties: {
    vacation: 'sharedAddress#'
  }
}

const schema = { body: bodyJsonSchema }

fastify.post('/the/url', { schema }, handler)
```

NB You can mix up the `$ref-way` and the `replace-way` when using
`fastify.addSchema`.
````

## Source: https://fastify.dev/docs/latest/Guides/Getting-Started
````markdown
<h1 align="center">Fastify</h1>

## Getting Started

Hello! Thank you for checking out Fastify!

This document aims to be a gentle introduction to the framework and its
features. It is an elementary preface with examples and links to other parts of
the documentation.

Let's start!

### Install
<a id="install"></a>

Install with npm:
```sh
npm i fastify
```

Install with yarn:
```sh
yarn add fastify
```

### Your first server
<a id="first-server"></a>

Let's write our first server:
```js
// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})
// CommonJs
const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```

> If you are using ECMAScript Modules (ESM) in your project, be sure to
> include "type": "module" in your package.json.
>```js
>{
>  "type": "module"
>}
>```

Do you prefer to use `async/await`? Fastify supports it out-of-the-box.

```js
// ESM
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})
// CommonJs
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
```

Awesome, that was easy.

Unfortunately, writing a complex application requires significantly more code
than this example. A classic problem when you are building a new application is
how to handle multiple files, asynchronous bootstrapping, and the architecture
of your code.

Fastify offers an easy platform that helps to solve all of the problems outlined
above, and more!

> **Note**
> The above examples, and subsequent examples in this document, default to
> listening *only* on the localhost `127.0.0.1` interface. To listen on all
> available IPv4 interfaces the example should be modified to listen on
> `0.0.0.0` like so:
>
> ```js
> fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
>   if (err) {
>     fastify.log.error(err)
>     process.exit(1)
>   }
>   fastify.log.info(`server listening on ${address}`)
> })
> ```
>
> Similarly, specify `::1` to accept only local connections via IPv6. Or specify
> `::` to accept connections on all IPv6 addresses, and, if the operating system
> supports it, also on all IPv4 addresses.
>
> When deploying to a Docker (or another type of) container using `0.0.0.0` or
> `::` would be the easiest method for exposing the application.
>
> Note that when using `0.0.0.0`, the address provided in the callback argument
> above will be the first address the wildcard refers to.

### Your first plugin
<a id="first-plugin"></a>

As with JavaScript, where everything is an object, with Fastify everything is a
plugin.

Before digging into it, let's see how it works!

Let's declare our basic server, but instead of declaring the route inside the
entry point, we'll declare it in an external file (check out the [route
declaration](../Reference/Routes.md) docs).
```js
// ESM
import Fastify from 'fastify'
import firstRoute from './our-first-route.js'
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})

fastify.register(firstRoute)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```

```js
// CommonJs
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('./our-first-route'))

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```


```js
// our-first-route.js

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}

//ESM
export default routes;

// CommonJs
module.exports = routes
```
In this example, we used the `register` API, which is the core of the Fastify
framework. It is the only way to add routes, plugins, et cetera.

At the beginning of this guide, we noted that Fastify provides a foundation that
assists with asynchronous bootstrapping of your application. Why is this
important?

Consider the scenario where a database connection is needed to handle data
storage. The database connection needs to be available before the server is
accepting connections. How do we address this problem?

A typical solution is to use a complex callback, or promises - a system that
will mix the framework API with other libraries and the application code.

Fastify handles this internally, with minimum effort!

Let's rewrite the above example with a database connection.


First, install `fastify-plugin` and `@fastify/mongodb`:

```sh
npm i fastify-plugin @fastify/mongodb
```

**server.js**
```js
// ESM
import Fastify from 'fastify'
import dbConnector from './our-db-connector.js'
import firstRoute from './our-first-route.js'

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})
fastify.register(dbConnector)
fastify.register(firstRoute)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```

```js
// CommonJs
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('./our-db-connector'))
fastify.register(require('./our-first-route'))

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})

```

**our-db-connector.js**
```js
// ESM
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector (fastify, options) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017/test_database'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector)

```

```js
// CommonJs
/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require('fastify-plugin')


/**
 * Connects to a MongoDB database
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function dbConnector (fastify, options) {
  fastify.register(require('@fastify/mongodb'), {
    url: 'mongodb://localhost:27017/test_database'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)

```

**our-first-route.js**
```js
/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
  const collection = fastify.mongo.db.collection('test_collection')

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/animals', async (request, reply) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      throw new Error('No documents found')
    }
    return result
  })

  fastify.get('/animals/:animal', async (request, reply) => {
    const result = await collection.findOne({ animal: request.params.animal })
    if (!result) {
      throw new Error('Invalid value')
    }
    return result
  })

  const animalBodyJsonSchema = {
    type: 'object',
    required: ['animal'],
    properties: {
      animal: { type: 'string' },
    },
  }

  const schema = {
    body: animalBodyJsonSchema,
  }

  fastify.post('/animals', { schema }, async (request, reply) => {
    // we can use the `request.body` object to get the data sent by the client
    const result = await collection.insertOne({ animal: request.body.animal })
    return result
  })
}

module.exports = routes
```

Wow, that was fast!

Let's recap what we have done here since we've introduced some new concepts.

As you can see, we used `register` for both the database connector and the
registration of the routes.

This is one of the best features of Fastify, it will load your plugins in the
same order you declare them, and it will load the next plugin only once the
current one has been loaded. In this way, we can register the database connector
in the first plugin and use it in the second *(read
[here](../Reference/Plugins.md#handle-the-scope) to understand how to handle the
scope of a plugin)*.

Plugin loading starts when you call `fastify.listen()`, `fastify.inject()` or
`fastify.ready()`

The MongoDB plugin uses the `decorate` API to add custom objects to the Fastify
instance, making them available for use everywhere. Use of this API is
encouraged to facilitate easy code reuse and to decrease code or logic
duplication.

To dig deeper into how Fastify plugins work, how to develop new plugins, and for
details on how to use the whole Fastify API to deal with the complexity of
asynchronously bootstrapping an application, read [the hitchhiker's guide to
plugins](./Plugins-Guide.md).

### Loading order of your plugins
<a id="plugin-loading-order"></a>

To guarantee consistent and predictable behavior of your application, we highly
recommend to always load your code as shown below:
```
└── plugins (from the Fastify ecosystem)
└── your plugins (your custom plugins)
└── decorators
└── hooks
└── your services
```
In this way, you will always have access to all of the properties declared in
the current scope.

As discussed previously, Fastify offers a solid encapsulation model, to help you
build your application as independent services. If you want to
register a plugin only for a subset of routes, you just have to replicate the
above structure.
```
└── plugins (from the Fastify ecosystem)
└── your plugins (your custom plugins)
└── decorators
└── hooks
└── your services
    │
    └──  service A
    │     └── plugins (from the Fastify ecosystem)
    │     └── your plugins (your custom plugins)
    │     └── decorators
    │     └── hooks
    │     └── your services
    │
    └──  service B
          └── plugins (from the Fastify ecosystem)
          └── your plugins (your custom plugins)
          └── decorators
          └── hooks
          └── your services
```

### Validate your data
<a id="validate-data"></a>

Data validation is extremely important and a core concept of the framework.

To validate incoming requests, Fastify uses [JSON
Schema](https://json-schema.org/).

Let's look at an example demonstrating validation for routes:
```js
/**
 * @type {import('fastify').RouteShorthandOptions}
 * @const
 */
const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        someKey: { type: 'string' },
        someOtherKey: { type: 'number' }
      }
    }
  }
}

fastify.post('/', opts, async (request, reply) => {
  return { hello: 'world' }
})
```
This example shows how to pass an options object to the route, which accepts a
`schema` key that contains all of the schemas for route, `body`, `querystring`,
`params`, and `headers`.

Read [Validation and
Serialization](../Reference/Validation-and-Serialization.md) to learn more.

### Serialize your data
<a id="serialize-data"></a>

Fastify has first-class support for JSON. It is extremely optimized to parse
JSON bodies and serialize JSON output.

To speed up JSON serialization (yes, it is slow!) use the `response` key of the
schema option as shown in the following example:
```js
/**
 * @type {import('fastify').RouteShorthandOptions}
 * @const
 */
const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}

fastify.get('/', opts, async (request, reply) => {
  return { hello: 'world' }
})
```
By specifying a schema as shown, you can speed up serialization by a factor of
2-3. This also helps to protect against leakage of potentially sensitive data,
since Fastify will serialize only the data present in the response schema. Read
[Validation and Serialization](../Reference/Validation-and-Serialization.md) to
learn more.

### Parsing request payloads
<a id="request-payload"></a>

Fastify parses `'application/json'` and `'text/plain'` request payloads
natively, with the result accessible from the [Fastify
request](../Reference/Request.md) object at `request.body`.

The following example returns the parsed body of a request back to the client:

```js
/**
 * @type {import('fastify').RouteShorthandOptions}
 */
const opts = {}
fastify.post('/', opts, async (request, reply) => {
  return request.body
})
```

Read [Content-Type Parser](../Reference/ContentTypeParser.md) to learn more
about Fastify's default parsing functionality and how to support other content
types.

### Extend your server
<a id="extend-server"></a>

Fastify is built to be extremely extensible and minimal, we believe that a
bare-bones framework is all that is necessary to make great applications
possible.

In other words, Fastify is not a "batteries included" framework, and relies on
an amazing [ecosystem](./Ecosystem.md)!

### Test your server
<a id="test-server"></a>

Fastify does not offer a testing framework, but we do recommend a way to write
your tests that uses the features and architecture of Fastify.

Read the [testing](./Testing.md) documentation to learn more!

### Run your server from CLI
<a id="cli"></a>

Fastify also has CLI integration via
[fastify-cli](https://github.com/fastify/fastify-cli),
a separate tool for scaffolding and managing Fastify projects.

First, install `fastify-cli`:

```sh
npm i fastify-cli
```

You can also install it globally with `-g`.

Then, add the following lines to `package.json`:
```json
{
  "scripts": {
    "start": "fastify start server.js"
  }
}
```

And create your server file(s):
```js
// server.js
'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}
```

Then run your server with:
```bash
npm start
```

### Slides and Videos
<a id="slides"></a>

- Slides
  - [Take your HTTP server to ludicrous
    speed](https://mcollina.github.io/take-your-http-server-to-ludicrous-speed)
    by [@mcollina](https://github.com/mcollina)
  - [What if I told you that HTTP can be
    fast](https://delvedor.github.io/What-if-I-told-you-that-HTTP-can-be-fast)
    by [@delvedor](https://github.com/delvedor)

- Videos
  - [Take your HTTP server to ludicrous
    speed](https://www.youtube.com/watch?v=5z46jJZNe8k) by
    [@mcollina](https://github.com/mcollina)
  - [What if I told you that HTTP can be
    fast](https://www.webexpo.net/prague2017/talk/what-if-i-told-you-that-http-can-be-fast/)
    by [@delvedor](https://github.com/delvedor)
````

## Source: https://fastify.dev/docs/latest/Guides/Index
````markdown
<h1 align="center">Fastify</h1>

## Guides Table Of Contents
<a id="guides-toc"></a>

This table of contents is in alphabetical order.

+ [Benchmarking](./Benchmarking.md): This guide introduces how to benchmark
  applications based on Fastify.
+ [Contributing](./Contributing.md): Details how to participate in the
  development of Fastify, and shows how to setup an environment compatible with
  the project's code style.
+ [Delay Accepting Requests](./Delay-Accepting-Requests.md): A practical guide
  on how to delay serving requests to specific routes until some condition is
  met in your application. This guide focuses on solving the problem using
  [`Hooks`](../Reference/Hooks.md), [`Decorators`](../Reference/Decorators.md),
  and [`Plugins`](../Reference/Plugins.md).
+ [Detecting When Clients Abort](./Detecting-When-Clients-Abort.md): A
  practical guide on detecting if and when a client aborts a request.
+ [Ecosystem](./Ecosystem.md): Lists all core plugins and many known community
  plugins.
+ [Fluent Schema](./Fluent-Schema.md): Shows how JSON Schema can be
  written with a fluent API and used in Fastify.
+ [Getting Started](./Getting-Started.md): Introduction tutorial for Fastify.
  This is where beginners should start.
+ [Migration Guide (v4)](./Migration-Guide-V4.md): Details how to migrate to
  Fastify v4 from earlier versions.
+ [Migration Guide (v3)](./Migration-Guide-V3.md): Details how to migrate to
  Fastify v3 from earlier versions.
+ [Plugins Guide](./Plugins-Guide.md): An informal introduction to writing
  Fastify plugins.
+ [Prototype Poisoning](./Prototype-Poisoning.md): A description of how the
  prototype poisoning attack works and is mitigated.
+ [Recommendations](./Recommendations.md): Recommendations for how to deploy
  Fastify into production environments.
+ [Serverless](./Serverless.md): Details on how to deploy Fastify applications
  in various Function as a Service (FaaS) environments.
+ [Style Guide](./Style-Guide.md): Explains the writing style we use for the
  Fastify documentation for those who want to contribute documentation.
+ [Testing](./Testing.md): Explains how to write unit tests for Fastify
  applications.
+ [Write Plugin](./Write-Plugin.md): A set of guidelines for what the Fastify
  team considers good practices for writing a Fastify plugin.
````

## Source: https://fastify.dev/docs/latest/Guides/Migration-Guide-V3
````markdown
# V3 Migration Guide

This guide is intended to help with migration from Fastify v2 to v3.

Before beginning please ensure that any deprecation warnings from v2 are fixed.
All v2 deprecations have been removed and they will no longer work after
upgrading. ([#1750](https://github.com/fastify/fastify/pull/1750))

## Breaking changes

### Changed middleware support ([#2014](https://github.com/fastify/fastify/pull/2014))

From Fastify v3, middleware support does not come out-of-the-box with the
framework itself.

If you use Express middleware in your application, please install and register
the [`@fastify/express`](https://github.com/fastify/fastify-express) or
[`@fastify/middie`](https://github.com/fastify/middie) plugin before doing so.

**v2:**

```js
// Using the Express `cors` middleware in Fastify v2.
fastify.use(require('cors')());
```

**v3:**

```js
// Using the Express `cors` middleware in Fastify v3.
await fastify.register(require('@fastify/express'));
fastify.use(require('cors')());
```

### Changed logging serialization ([#2017](https://github.com/fastify/fastify/pull/2017))

The logging [Serializers](../Reference/Logging.md) have been updated to now
Fastify [`Request`](../Reference/Request.md) and
[`Reply`](../Reference/Reply.md) objects instead of native ones.

Any custom serializers must be updated if they rely upon `request` or `reply`
properties that are present on the native objects but not the Fastify objects.

**v2:**

```js
const fastify = require('fastify')({
  logger: {
    serializers: {
      res(res) {
        return {
          statusCode: res.statusCode,
          customProp: res.customProp
        };
      }
    }
  }
});
```

**v3:**

```js
const fastify = require('fastify')({
  logger: {
    serializers: {
      res(reply) {
        return {
          statusCode: reply.statusCode, // No change required
          customProp: reply.raw.customProp // Log custom property from res object
        };
      }
    }
  }
});
```

### Changed schema substitution ([#2023](https://github.com/fastify/fastify/pull/2023))

The non-standard `replace-way` shared schema support has been removed. This
feature has been replaced with JSON Schema specification compliant `$ref` based
substitution. To help understand this change read [Validation and Serialization
in Fastify
v3](https://dev.to/eomm/validation-and-serialization-in-fastify-v3-2e8l).

**v2:**

```js
const schema = {
  body: 'schemaId#'
};
fastify.route({ method, url, schema, handler });
```

**v3:**

```js
const schema = {
  body: {
    $ref: 'schemaId#'
  }
};
fastify.route({ method, url, schema, handler });
```

### Changed schema validation options ([#2023](https://github.com/fastify/fastify/pull/2023))

The `setSchemaCompiler` and `setSchemaResolver` options have been replaced with
the `setValidatorCompiler` to enable future tooling improvements. To help
understand this change read [Validation and Serialization in Fastify
v3](https://dev.to/eomm/validation-and-serialization-in-fastify-v3-2e8l).

**v2:**

```js
const fastify = Fastify();
const ajv = new AJV();
ajv.addSchema(schemaA);
ajv.addSchema(schemaB);

fastify.setSchemaCompiler(schema => ajv.compile(schema));
fastify.setSchemaResolver(ref => ajv.getSchema(ref).schema);
```

**v3:**

```js
const fastify = Fastify();
const ajv = new AJV();
ajv.addSchema(schemaA);
ajv.addSchema(schemaB);

fastify.setValidatorCompiler(({ schema, method, url, httpPart }) =>
  ajv.compile(schema)
);
```

### Changed preParsing hook behavior ([#2286](https://github.com/fastify/fastify/pull/2286))

From Fastify v3, the behavior of the `preParsing` hook will change slightly
to support request payload manipulation.

The hook now takes an additional argument, `payload`, and therefore the new hook
signature is `fn(request, reply, payload, done)` or `async fn(request, reply,
payload)`.

The hook can optionally return a new stream via `done(null, stream)` or
returning the stream in case of async functions.

If the hook returns a new stream, it will be used instead of the original one in
subsequent hooks. A sample use case for this is handling compressed requests.

The new stream should add the `receivedEncodedLength` property to the stream
that should reflect the actual data size received from the client. For instance,
in a compressed request it should be the size of the compressed payload. This
property can (and should) be dynamically updated during `data` events.

The old syntax of Fastify v2 without payload is supported but it is deprecated.

### Changed hooks behavior ([#2004](https://github.com/fastify/fastify/pull/2004))

From Fastify v3, the behavior of `onRoute` and `onRegister` hooks will change
slightly to support hook encapsulation.

- `onRoute` - The hook will be called asynchronously. The hook is now inherited
  when registering a new plugin within the same encapsulation scope. Thus, this
  hook should be registered _before_ registering any plugins.
- `onRegister` - Same as the onRoute hook. The only difference is that now the
  very first call will no longer be the framework itself, but the first
  registered plugin.

### Changed Content Type Parser syntax ([#2286](https://github.com/fastify/fastify/pull/2286))

In Fastify v3 the content type parsers now have a single signature for parsers.

The new signatures are `fn(request, payload, done)` or `async fn(request,
payload)`. Note that `request` is now a Fastify request, not an
`IncomingMessage`. The payload is, by default, a stream. If the `parseAs` option
is used in `addContentTypeParser`, then `payload` reflects the option value
(string or buffer).

The old signatures `fn(req, [done])` or `fn(req, payload, [done])` (where `req`
is `IncomingMessage`) are still supported but are deprecated.

### Changed TypeScript support

The type system was changed in Fastify version 3. The new type system introduces
generic constraining and defaulting, plus a new way to define schema types such
as a request body, querystring, and more!

**v2:**

```ts
interface PingQuerystring {
  foo?: number;
}

interface PingParams {
  bar?: string;
}

interface PingHeaders {
  a?: string;
}

interface PingBody {
  baz?: string;
}

server.get<PingQuerystring, PingParams, PingHeaders, PingBody>(
  '/ping/:bar',
  opts,
  (request, reply) => {
    console.log(request.query); // This is of type `PingQuerystring`
    console.log(request.params); // This is of type `PingParams`
    console.log(request.headers); // This is of type `PingHeaders`
    console.log(request.body); // This is of type `PingBody`
  }
);
```

**v3:**

```ts
server.get<{
  Querystring: PingQuerystring;
  Params: PingParams;
  Headers: PingHeaders;
  Body: PingBody;
}>('/ping/:bar', opts, async (request, reply) => {
  console.log(request.query); // This is of type `PingQuerystring`
  console.log(request.params); // This is of type `PingParams`
  console.log(request.headers); // This is of type `PingHeaders`
  console.log(request.body); // This is of type `PingBody`
});
```

### Manage uncaught exception ([#2073](https://github.com/fastify/fastify/pull/2073))

In sync route handlers, if an error was thrown the server crashed by design
without calling the configured `.setErrorHandler()`. This has changed and now
all unexpected errors in sync and async routes are managed.

**v2:**

```js
fastify.setErrorHandler((error, request, reply) => {
  // this is NOT called
  reply.send(error)
})
fastify.get('/', (request, reply) => {
  const maybeAnArray = request.body.something ? [] : 'I am a string'
  maybeAnArray.substr() // Thrown: [].substr is not a function and crash the server
})
```

**v3:**

```js
fastify.setErrorHandler((error, request, reply) => {
  // this IS called
  reply.send(error)
})
fastify.get('/', (request, reply) => {
  const maybeAnArray = request.body.something ? [] : 'I am a string'
  maybeAnArray.substr() // Thrown: [].substr is not a function, but it is handled
})
```

## Further additions and improvements

- Hooks now have consistent context regardless of how they are registered
  ([#2005](https://github.com/fastify/fastify/pull/2005))
- Deprecated `request.req` and `reply.res` for
  [`request.raw`](../Reference/Request.md) and
  [`reply.raw`](../Reference/Reply.md)
  ([#2008](https://github.com/fastify/fastify/pull/2008))
- Removed `modifyCoreObjects` option
  ([#2015](https://github.com/fastify/fastify/pull/2015))
- Added [`connectionTimeout`](../Reference/Server.md#factory-connection-timeout)
  option ([#2086](https://github.com/fastify/fastify/pull/2086))
- Added [`keepAliveTimeout`](../Reference/Server.md#factory-keep-alive-timeout)
  option ([#2086](https://github.com/fastify/fastify/pull/2086))
- Added async-await support for [plugins](../Reference/Plugins.md#async-await)
  ([#2093](https://github.com/fastify/fastify/pull/2093))
- Added the feature to throw object as error
  ([#2134](https://github.com/fastify/fastify/pull/2134))
````

## Source: https://fastify.dev/docs/latest/Guides/Migration-Guide-V4
````markdown
# V4 Migration Guide

This guide is intended to help with migration from Fastify v3 to v4.

Before migrating to v4, please ensure that you have fixed all deprecation
warnings from v3. All v3 deprecations have been removed and they will no longer
work after upgrading.

## Codemods
### Fastify v4 Codemods

To help with the upgrade, we’ve worked with the team at
[Codemod](https://github.com/codemod-com/codemod) to
publish codemods that will automatically update your code to many of
the new APIs and patterns in Fastify v4.

Run the following
[migration recipe](https://go.codemod.com/fastify-4-migration-recipe) to
automatically update your code to Fastify v4:

```
npx codemod@latest fastify/4/migration-recipe
```

This will run the following codemods:

- [`fastify/4/remove-app-use`](https://go.codemod.com/fastify-4-remove-app-use)
- [`fastify/4/reply-raw-access`](https://go.codemod.com/fastify-4-reply-raw-access)
- [`fastify/4/wrap-routes-plugin`](https://go.codemod.com/fastify-4-wrap-routes-plugin)
- [`fastify/4/await-register-calls`](https://go.codemod.com/fastify-4-await-register-calls)

Each of these codemods automates the changes listed in the v4 migration guide.
For a complete list of available Fastify codemods and further details,
see [Codemod Registry](https://go.codemod.com/fastify).


## Breaking Changes

### Error handling composition ([#3261](https://github.com/fastify/fastify/pull/3261))

When an error is thrown in an async error handler function, the upper-level
error handler is executed if set. If there is no upper-level error handler,
the default will be executed as it was previously:

```js
import Fastify from 'fastify'

const fastify = Fastify()

fastify.register(async fastify => {
  fastify.setErrorHandler(async err => {
    console.log(err.message) // 'kaboom'
    throw new Error('caught')
  })

  fastify.get('/encapsulated', async () => {
    throw new Error('kaboom')
  })
})

fastify.setErrorHandler(async err => {
  console.log(err.message) // 'caught'
  throw new Error('wrapped')
})

const res = await fastify.inject('/encapsulated')
console.log(res.json().message) // 'wrapped'
```

>The root error handler is Fastify’s generic error handler.
>This error handler will use the headers and status code in the Error object,
>if they exist. **The headers and status code will not be automatically set if
>a custom error handler is provided**.

### Removed `app.use()` ([#3506](https://github.com/fastify/fastify/pull/3506))

With v4 of Fastify, `app.use()` has been removed and the use of middleware is
no longer supported.

If you need to use middleware, use
[`@fastify/middie`](https://github.com/fastify/middie) or
[`@fastify/express`](https://github.com/fastify/fastify-express), which will
continue to be maintained.
However, it is strongly recommended that you migrate to Fastify's [hooks](../Reference/Hooks.md).

> **Note**: Codemod remove `app.use()` with:
>
> ```bash
> npx codemod@latest fastify/4/remove-app-use
> ```

### `reply.res` moved to `reply.raw`

If you previously used the `reply.res` attribute to access the underlying Request
object you will now need to use `reply.raw`.

> **Note**: Codemod `reply.res` to `reply.raw` with:
>
> ```bash
> npx codemod@latest fastify/4/reply-raw-access
> ```

### Need to `return reply` to signal a "fork" of the promise chain

In some situations, like when a response is sent asynchronously or when you are
not explicitly returning a response, you will now need to return the `reply`
argument from your router handler.

### `exposeHeadRoutes` true by default

Starting with v4, every `GET` route will create a sibling `HEAD` route.
You can revert this behavior by setting `exposeHeadRoutes: false` in the server options.

### Synchronous route definitions ([#2954](https://github.com/fastify/fastify/pull/2954))

To improve error reporting in route definitions, route registration is now synchronous.
As a result, if you specify an `onRoute` hook in a plugin you should now either:
* wrap your routes in a plugin (recommended)

  For example, refactor this:
  ```js
  fastify.register((instance, opts, done) => {
    instance.addHook('onRoute', (routeOptions) => {
      const { path, method } = routeOptions;
      console.log({ path, method });
      done();
    });
  });

  fastify.get('/', (request, reply) => { reply.send('hello') });
  ```

  Into this:
  ```js
  fastify.register((instance, opts, done) => {
    instance.addHook('onRoute', (routeOptions) => {
      const { path, method } = routeOptions;
      console.log({ path, method });
      done();
    });
  });

  fastify.register((instance, opts, done) => {
    instance.get('/', (request, reply) => { reply.send('hello') });
    done();
  });
  ```
> **Note**: Codemod synchronous route definitions with:
>
> ```bash
> npx codemod@latest fastify/4/wrap-routes-plugin
> ```

* use `await register(...)`

  For example, refactor this:
  ```js
  fastify.register((instance, opts, done) => {
    instance.addHook('onRoute', (routeOptions) => {
      const { path, method } = routeOptions;
      console.log({ path, method });
    });
    done();
  });
  ```

  Into this:
  ```js
  await fastify.register((instance, opts, done) => {
    instance.addHook('onRoute', (routeOptions) => {
      const { path, method } = routeOptions;
      console.log({ path, method });
    });
    done();
  });
  ```

> **Note**: Codemod 'await register(...)' with:
>
> ```bash
> npx codemod@latest fastify/4/await-register-calls
> ```


### Optional URL parameters

If you've already used any implicitly optional parameters, you'll get a 404
error when trying to access the route. You will now need to declare the
optional parameters explicitly.

For example, if you have the same route for listing and showing a post,
refactor this:
```js
fastify.get('/posts/:id', (request, reply) => {
  const { id } = request.params;
});
```

Into this:
```js
fastify.get('/posts/:id?', (request, reply) => {
  const { id } = request.params;
});
```

## Non-Breaking Changes

### Deprecation of variadic `.listen()` signature

The [variadic signature](https://en.wikipedia.org/wiki/Variadic_function) of the
`fastify.listen()` method is now deprecated.

Before this release, the following invocations of this method were valid:

  - `fastify.listen(8000)`
  - `fastify.listen(8000, ‘127.0.0.1’)`
  - `fastify.listen(8000, ‘127.0.0.1’, 511)`
  - `fastify.listen(8000, (err) => { if (err) throw err })`
  - `fastify.listen({ port: 8000 }, (err) => { if (err) throw err })`

With Fastify v4, only the following invocations are valid:

  - `fastify.listen()`
  - `fastify.listen({ port: 8000 })`
  - `fastify.listen({ port: 8000 }, (err) => { if (err) throw err })`

### Change of schema for multiple types

Ajv has been upgraded to v8 in Fastify v4, meaning "type" keywords with multiple
types other than "null"
[are now prohibited](https://ajv.js.org/strict-mode.html#strict-types).

You may encounter a console warning such as:
```sh
strict mode: use allowUnionTypes to allow union type keyword at "#/properties/image" (strictTypes)
```

As such, schemas like below will need to be changed from:
```js
{
  type: 'object',
  properties: {
    api_key: { type: 'string' },
    image: { type: ['object', 'array'] }
  }
}
```

Into:
```js
{
  type: 'object',
  properties: {
    api_key: { type: 'string' },
    image: {
      anyOf: [
        { type: 'array' },
        { type: 'object' }
      ]
    }
  }
}
```

### Add `reply.trailers` methods ([#3794](https://github.com/fastify/fastify/pull/3794))

Fastify now supports the [HTTP Trailer] response headers.


[HTTP Trailer]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Trailer
````

## Source: https://fastify.dev/docs/latest/Guides/Migration-Guide-V5
````markdown
# V5 Migration Guide

This guide is intended to help with migration from Fastify v4 to v5.

Before migrating to v5, please ensure that you have fixed all deprecation
warnings from v4. All v4 deprecations have been removed and will no longer
work after upgrading.

## Long Term Support Cycle

Fastify v5 will only support Node.js v20+. If you are using an older version of
Node.js, you will need to upgrade to a newer version to use Fastify v5.

Fastify v4 is still supported until June 30, 2025. If you are unable to upgrade,
you should consider buying an end-of-life support plan from HeroDevs.

### Why Node.js v20?

Fastify v5 will only support Node.js v20+ because it has significant differences
compared to v18, such as
better support for `node:test`. This allows us to provide a better developer
experience and streamline maintenance.

Node.js v18 will exit Long Term Support on April 30, 2025, so you should be planning
to upgrade to v20 anyway.

## Breaking Changes

### Full JSON Schema is now required for `querystring`, `params` and `body` and response schemas

Starting with v5, Fastify will require a full JSON schema for the `querystring`,
`params` and `body` schema. Note that the `jsonShortHand` option has been
removed as well.

If the default JSON Schema validator is used, you will need
to provide a full JSON schema for the
`querystring`, `params`, `body`, and `response` schemas,
including the `type` property.

```js
// v4
fastify.get('/route', {
  schema: {
    querystring: {
      name: { type: 'string' }
    }
  }
}, (req, reply) => {
  reply.send({ hello: req.query.name });
});
```

```js
// v5
fastify.get('/route', {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' }
      },
      required: ['name']
    }
  }
}, (req, reply) => {
  reply.send({ hello: req.query.name });
});
```

See [#5586](https://github.com/fastify/fastify/pull/5586) for more details

Note that it's still possible to override the JSON Schema validator to
use a different format, such as Zod. This change simplifies that as well.

This change helps with integration of other tools, such as
[`@fastify/swagger`](https://github.com/fastify/fastify-swagger).

### New logger constructor signature

In Fastify v4, Fastify accepted the options to build a pino
logger in the `logger` option, as well as a custom logger instance.
This was the source of significant confusion.

As a result, the `logger` option will not accept a custom logger anymore in v5.
To use a custom logger, you should use the `loggerInstance` option instead:

```js
// v4
const logger = require('pino')();
const fastify = require('fastify')({
  logger
});
```

```js
// v5
const loggerInstance = require('pino')();
const fastify = require('fastify')({
  loggerInstance
});
```

### `useSemicolonDelimiter` false by default

Starting with v5, Fastify instances will no longer default to supporting the use
of semicolon delimiters in the query string as they did in v4.
This is due to it being non-standard
behavior and not adhering to [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986#section-3.4).

If you still wish to use semicolons as delimiters, you can do so by
setting `useSemicolonDelimiter: true` in the server configuration.

```js
const fastify = require('fastify')({
  useSemicolonDelimiter: true
});
```

### The parameters object no longer has a prototype

In v4, the `parameters` object had a prototype. This is no longer the case in v5.
This means that you can no longer access properties inherited from `Object` on
the `parameters` object, such as `toString` or `hasOwnProperty`.

```js
// v4
fastify.get('/route/:name', (req, reply) => {
  console.log(req.params.hasOwnProperty('name')); // true
  return { hello: req.params.name };
});
```

```js
// v5
fastify.get('/route/:name', (req, reply) => {
  console.log(Object.hasOwn(req.params, 'name')); // true
  return { hello: req.params.name };
});
```

This increases the security of the application by hardening against prototype
pollution attacks.

### Type Providers now differentiate between validator and serializer schemas

In v4, the type providers had the same types for both validation and serialization.
In v5, the type providers have been split into two separate types: `ValidatorSchema`
and `SerializerSchema`.

[`@fastify/type-provider-json-schema-to-ts`](https://github.com/fastify/fastify-type-provider-json-schema-to-ts)
and
[`@fastify/type-provider-typebox`](https://github.com/fastify/fastify-type-provider-typebox)
have already been updated: upgrade to the latest version to get the new types.
If you are using a custom type provider, you will need to modify it like
the following:

```
--- a/index.ts
+++ b/index.ts
@@ -11,7 +11,8 @@ import {
 import { FromSchema, FromSchemaDefaultOptions, FromSchemaOptions, JSONSchema } from 'json-schema-to-ts'

 export interface JsonSchemaToTsProvider<
   Options extends FromSchemaOptions = FromSchemaDefaultOptions
 > extends FastifyTypeProvider {
-  output: this['input'] extends JSONSchema ? FromSchema<this['input'], Options> : unknown;
+  validator: this['schema'] extends JSONSchema ? FromSchema<this['schema'], Options> : unknown;
+  serializer: this['schema'] extends JSONSchema ? FromSchema<this['schema'], Options> : unknown;
 }
 ```

### Changes to the .listen() method

The variadic argument signature of the `.listen()` method has been removed.
This means that you can no longer call `.listen()` with a variable number of arguments.

```js
// v4
fastify.listen(8000)
```

Will become:

```js
// v5
fastify.listen({ port: 8000 })
```

This was already deprecated in v4 as `FSTDEP011`, so you should have already updated
your code to use the new signature.

### Direct return of trailers has been removed

In v4, you could directly return trailers from a handler.
This is no longer possible in v5.

```js
// v4
fastify.get('/route', (req, reply) => {
  reply.trailer('ETag', function (reply, payload) {
    return 'custom-etag'
  })
  reply.send('')
});
```

```js
// v5
fastify.get('/route', (req, reply) => {
  reply.trailer('ETag', async function (reply, payload) {
    return 'custom-etag'
  })
  reply.send('')
});
```

A callback could also be used.
This was already deprecated in v4 as `FSTDEP013`,
so you should have already updated your code to use the new signature.

### Streamlined access to route definition

All deprecated properties relating to accessing the route definition have been removed
and are now accessed via `request.routeOptions`.

| Code | Description | How to solve | Discussion |
| ---- | ----------- | ------------ | ---------- |
| FSTDEP012 | You are trying to access the deprecated `request.context` property. | Use `request.routeOptions.config` or `request.routeOptions.schema`. | [#4216](https://github.com/fastify/fastify/pull/4216) [#5084](https://github.com/fastify/fastify/pull/5084) |
| FSTDEP015 | You are accessing the deprecated `request.routeSchema` property. | Use `request.routeOptions.schema`. | [#4470](https://github.com/fastify/fastify/pull/4470) |
| FSTDEP016 | You are accessing the deprecated `request.routeConfig` property. | Use `request.routeOptions.config`. | [#4470](https://github.com/fastify/fastify/pull/4470) |
| FSTDEP017 | You are accessing the deprecated `request.routerPath` property. | Use `request.routeOptions.url`. | [#4470](https://github.com/fastify/fastify/pull/4470) |
| FSTDEP018 | You are accessing the deprecated `request.routerMethod` property. | Use `request.routeOptions.method`. | [#4470](https://github.com/fastify/fastify/pull/4470) |
| FSTDEP019 | You are accessing the deprecated `reply.context` property. | Use `reply.routeOptions.config` or `reply.routeOptions.schema`. | [#5032](https://github.com/fastify/fastify/pull/5032) [#5084](https://github.com/fastify/fastify/pull/5084) |

See [#5616](https://github.com/fastify/fastify/pull/5616) for more information.

### `reply.redirect()` has a new signature

The `reply.redirect()` method has a new signature:
`reply.redirect(url: string, code?: number)`.

```js
// v4
reply.redirect(301, '/new-route')
```

Change it to:

```js
// v5
reply.redirect('/new-route', 301)
```

This was already deprecated in v4 as `FSTDEP021`, so you should have already
updated your code to use the new signature.


### Modifying `reply.sent` is now forbidden

In v4, you could modify the `reply.sent` property to prevent the response from
being sent.
This is no longer possible in v5, use `reply.hijack()` instead.

```js
// v4
fastify.get('/route', (req, reply) => {
  reply.sent = true;
  reply.raw.end('hello');
});
```

Change it to:

```js
// v5
fastify.get('/route', (req, reply) => {
  reply.hijack();
  reply.raw.end('hello');
});
```

This was already deprecated in v4 as `FSTDEP010`, so you should have already
updated your code to use the new signature.

### Constraints for route versioning signature changes

We changed the signature for route versioning constraints.
The `version` and `versioning` options have been removed and you should
use the `constraints` option instead.

| Code | Description | How to solve | Discussion |
| ---- | ----------- | ------------ | ---------- |
| FSTDEP008 | You are using route constraints via the route `{version: "..."}` option.  |  Use `{constraints: {version: "..."}}` option.  | [#2682](https://github.com/fastify/fastify/pull/2682) |
| FSTDEP009 | You are using a custom route versioning strategy via the server `{versioning: "..."}` option. |  Use `{constraints: {version: "..."}}` option.  | [#2682](https://github.com/fastify/fastify/pull/2682) |

### `HEAD` routes requires to register before `GET` when `exposeHeadRoutes: true`

We have a more strict requirement for custom `HEAD` route when
`exposeHeadRoutes: true`.

When you provides a custom `HEAD` route, you must either explicitly
set `exposeHeadRoutes` to `false`

```js
// v4
fastify.get('/route', {

}, (req, reply) => {
  reply.send({ hello: 'world' });
});

fastify.head('/route', (req, reply) => {
  // ...
});
```

```js
// v5
fastify.get('/route', {
  exposeHeadRoutes: false
}, (req, reply) => {
  reply.send({ hello: 'world' });
});

fastify.head('/route', (req, reply) => {
  // ...
});
```

or place the `HEAD` route before `GET`.

```js
// v5
fastify.head('/route', (req, reply) => {
  // ...
});

fastify.get('/route', {

}, (req, reply) => {
  reply.send({ hello: 'world' });
});
```

This was changed in [#2700](https://github.com/fastify/fastify/pull/2700),
and the old behavior was deprecated in v4 as `FSTDEP007`.

### Removed `request.connection`

The `request.connection` property has been removed in v5.
You should use `request.socket` instead.

```js
// v4
fastify.get('/route', (req, reply) => {
  console.log(req.connection.remoteAddress);
  return { hello: 'world' };
});
```

```js
// v5
fastify.get('/route', (req, reply) => {
  console.log(req.socket.remoteAddress);
  return { hello: 'world' };
});
```

This was already deprecated in v4 as `FSTDEP05`, so you should
have already updated your code to use the new signature.

### `reply.getResponseTime()` has been removed, use `reply.elapsedTime` instead

The `reply.getResponseTime()` method has been removed in v5.
You should use `reply.elapsedTime` instead.

```js
// v4
fastify.get('/route', (req, reply) => {
  console.log(reply.getResponseTime());
  return { hello: 'world' };
});
```

```js
// v5
fastify.get('/route', (req, reply) => {
  console.log(reply.elapsedTime);
  return { hello: 'world' };
});
```

This was already deprecated in v4 as `FSTDEP20`, so you should have already
updated your code to use the new signature.

### `fastify.hasRoute()` now matches the behavior of `find-my-way`

The `fastify.hasRoute()` method now matches the behavior of `find-my-way`
and requires the route definition to be passed as it is defined in the route.

```js
// v4
fastify.get('/example/:file(^\\d+).png', function (request, reply) { })

console.log(fastify.hasRoute({
  method: 'GET',
  url: '/example/12345.png'
)); // true
```

```js
// v5

fastify.get('/example/:file(^\\d+).png', function (request, reply) { })

console.log(fastify.hasRoute({
  method: 'GET',
  url: '/example/:file(^\\d+).png'
)); // true
```

### Removal of some non-standard HTTP methods

We have removed the following HTTP methods from Fastify:
- `PROPFIND`
- `PROPPATCH`
- `MKCOL`
- `COPY`
- `MOVE`
- `LOCK`
- `UNLOCK`
- `TRACE`
- `SEARCH`

It's now possible to add them back using the `addHttpMethod` method.

```js
const fastify = Fastify()

// add a new http method on top of the default ones:
fastify.addHttpMethod('REBIND')

// add a new HTTP method that accepts a body:
fastify.addHttpMethod('REBIND', { hasBody: true })

// reads the HTTP methods list:
fastify.supportedMethods // returns a string array
```

See [#5567](https://github.com/fastify/fastify/pull/5567) for more
information.

### Removed support from reference types in decorators

Decorating Request/Reply with a reference type (`Array`, `Object`)
is now prohibited as this reference is shared amongst all requests.

```js
// v4
fastify.decorateRequest('myObject', { hello: 'world' });
```

```js
// v5
fastify.decorateRequest('myObject');
fastify.addHook('onRequest', async (req, reply) => {
  req.myObject = { hello: 'world' };
});
```

or turn it into a function

```js
// v5
fastify.decorateRequest('myObject', () => ({ hello: 'world' }));
```

or as a getter

```js
// v5
fastify.decorateRequest('myObject', {
  getter () {
    return { hello: 'world' }
  }
});
```

See [#5462](https://github.com/fastify/fastify/pull/5462) for more information.

### Remove support for DELETE with a `Content-Type: application/json` header and an empty body

In v4, Fastify allowed `DELETE` requests with a `Content-Type: application/json`
header and an empty body was accepted.
This is no longer allowed in v5.

See [#5419](https://github.com/fastify/fastify/pull/5419) for more information.

### Plugins cannot mix callback/promise API anymore

In v4, plugins could mix the callback and promise API, leading to unexpected behavior.
This is no longer allowed in v5.

```js
// v4
fastify.register(async function (instance, opts, done) {
  done();
});
```

```js
// v5
fastify.register(async function (instance, opts) {
  return;
});
```

or

```js
// v5
fastify.register(function (instance, opts, done) {
  done();
});
```

### Requests now have `host`, `hostname`, and `port`, and `hostname` no longer includes the port number

In Fastify v4, `req.hostname` would include both the hostname and the
server’s port, so locally it might have the value `localhost:1234`.
With v5, we aligned to the Node.js URL object and now include `host`, `hostname`,
and `port` properties. `req.host` has the same value as `req.hostname` did in v4,
while `req.hostname` includes the hostname _without_ a port if a port is present,
and `req.port` contains just the port number.
See [#4766](https://github.com/fastify/fastify/pull/4766)
and [#4682](https://github.com/fastify/fastify/issues/4682) for more information.

### Removes `getDefaultRoute` and `setDefaultRoute` methods

The `getDefaultRoute` and `setDefaultRoute` methods have been removed in v5.

See [#4485](https://github.com/fastify/fastify/pull/4485)
and [#4480](https://github.com/fastify/fastify/pull/4485)
for more information.
This was already deprecated in v4 as `FSTDEP014`,
so you should have already updated your code.

## New Features

### Diagnostic Channel support

Fastify v5 now supports the [Diagnostics Channel](https://nodejs.org/api/diagnostics_channel.html)
API natively
and provides a way to trace the lifecycle of a request.

```js
'use strict'

const diagnostics = require('node:diagnostics_channel')
const sget = require('simple-get').concat
const Fastify = require('fastify')

diagnostics.subscribe('tracing:fastify.request.handler:start', (msg) => {
  console.log(msg.route.url) // '/:id'
  console.log(msg.route.method) // 'GET'
})

diagnostics.subscribe('tracing:fastify.request.handler:end', (msg) => {
  // msg is the same as the one emitted by the 'tracing:fastify.request.handler:start' channel
  console.log(msg)
})

diagnostics.subscribe('tracing:fastify.request.handler:error', (msg) => {
  // in case of error
})

const fastify = Fastify()
fastify.route({
  method: 'GET',
  url: '/:id',
  handler: function (req, reply) {
    return { hello: 'world' }
  }
})

fastify.listen({ port: 0 }, function () {
  sget({
    method: 'GET',
    url: fastify.listeningOrigin + '/7'
  }, (err, response, body) => {
    t.error(err)
    t.equal(response.statusCode, 200)
    t.same(JSON.parse(body), { hello: 'world' })
  })
})
```

See the [documentation](https://github.com/fastify/fastify/blob/main/docs/Reference/Hooks.md#diagnostics-channel-hooks)
and [#5252](https://github.com/fastify/fastify/pull/5252) for additional details.

## Contributors

The complete list of contributors, across all of the core
Fastify packages, is provided below. Please consider
contributing to those that are capable of accepting sponsorships.

| Contributor | Sponsor Link | Packages |
| --- | --- | --- |
| 10xLaCroixDrinker | [❤️ sponsor](https://github.com/sponsors/10xLaCroixDrinker) | fastify-cli |
| Bram-dc |  | fastify; fastify-swagger |
| BrianValente |  | fastify |
| BryanAbate |  | fastify-cli |
| Cadienvan | [❤️ sponsor](https://github.com/sponsors/Cadienvan) | fastify |
| Cangit |  | fastify |
| Cyberlane |  | fastify-elasticsearch |
| Eomm | [❤️ sponsor](https://github.com/sponsors/Eomm) | ajv-compiler; fastify; fastify-awilix; fastify-diagnostics-channel; fastify-elasticsearch; fastify-hotwire; fastify-mongodb; fastify-nextjs; fastify-swagger-ui; under-pressure |
| EstebanDalelR | [❤️ sponsor](https://github.com/sponsors/EstebanDalelR) | fastify-cli |
| Fdawgs | [❤️ sponsor](https://github.com/sponsors/Fdawgs) | aws-lambda-fastify; csrf-protection; env-schema; fastify; fastify-accepts; fastify-accepts-serializer; fastify-auth; fastify-awilix; fastify-basic-auth; fastify-bearer-auth; fastify-caching; fastify-circuit-breaker; fastify-cli; fastify-cookie; fastify-cors; fastify-diagnostics-channel; fastify-elasticsearch; fastify-env; fastify-error; fastify-etag; fastify-express; fastify-flash; fastify-formbody; fastify-funky; fastify-helmet; fastify-hotwire; fastify-http-proxy; fastify-jwt; fastify-kafka; fastify-leveldb; fastify-mongodb; fastify-multipart; fastify-mysql; fastify-nextjs; fastify-oauth2; fastify-passport; fastify-plugin; fastify-postgres; fastify-rate-limit; fastify-redis; fastify-reply-from; fastify-request-context; fastify-response-validation; fastify-routes; fastify-routes-stats; fastify-schedule; fastify-secure-session; fastify-sensible; fastify-swagger-ui; fastify-url-data; fastify-websocket; fastify-zipkin; fluent-json-schema; forwarded; middie; point-of-view; process-warning; proxy-addr; safe-regex2; secure-json-parse; under-pressure |
| Gehbt |  | fastify-secure-session |
| Gesma94 |  | fastify-routes-stats |
| H4ad | [❤️ sponsor](https://github.com/sponsors/H4ad) | aws-lambda-fastify |
| JohanManders |  | fastify-secure-session |
| LiviaMedeiros |  | fastify |
| Momy93 |  | fastify-secure-session |
| MunifTanjim |  | fastify-swagger-ui |
| Nanosync |  | fastify-secure-session |
| RafaelGSS | [❤️ sponsor](https://github.com/sponsors/RafaelGSS) | fastify; under-pressure |
| Rantoledo |  | fastify |
| SMNBLMRR |  | fastify |
| SimoneDevkt |  | fastify-cli |
| Tony133 |  | fastify |
| Uzlopak | [❤️ sponsor](https://github.com/sponsors/Uzlopak) | fastify; fastify-autoload; fastify-diagnostics-channel; fastify-hotwire; fastify-nextjs; fastify-passport; fastify-plugin; fastify-rate-limit; fastify-routes; fastify-static; fastify-swagger-ui; point-of-view; under-pressure |
| Zamiell |  | fastify-secure-session |
| aadito123 |  | fastify |
| aaroncadillac | [❤️ sponsor](https://github.com/sponsors/aaroncadillac) | fastify |
| aarontravass |  | fastify |
| acro5piano | [❤️ sponsor](https://github.com/sponsors/acro5piano) | fastify-secure-session |
| adamward459 |  | fastify-cli |
| adrai | [❤️ sponsor](https://github.com/sponsors/adrai) | aws-lambda-fastify |
| alenap93 |  | fastify |
| alexandrucancescu |  | fastify-nextjs |
| anthonyringoet |  | aws-lambda-fastify |
| arshcodemod |  | fastify |
| autopulated |  | point-of-view |
| barbieri |  | fastify |
| beyazit |  | fastify |
| big-kahuna-burger | [❤️ sponsor](https://github.com/sponsors/big-kahuna-burger) | fastify-cli; fastify-compress; fastify-helmet |
| bilalshareef |  | fastify-routes |
| blue86321 |  | fastify-swagger-ui |
| bodinsamuel |  | fastify-rate-limit |
| busybox11 | [❤️ sponsor](https://github.com/sponsors/busybox11) | fastify |
| climba03003 |  | csrf-protection; fastify; fastify-accepts; fastify-accepts-serializer; fastify-auth; fastify-basic-auth; fastify-bearer-auth; fastify-caching; fastify-circuit-breaker; fastify-compress; fastify-cors; fastify-env; fastify-etag; fastify-flash; fastify-formbody; fastify-http-proxy; fastify-mongodb; fastify-swagger-ui; fastify-url-data; fastify-websocket; middie |
| dancastillo | [❤️ sponsor](https://github.com/sponsors/dancastillo) | fastify; fastify-basic-auth; fastify-caching; fastify-circuit-breaker; fastify-cors; fastify-helmet; fastify-passport; fastify-response-validation; fastify-routes; fastify-schedule |
| danny-andrews |  | fastify-kafka |
| davidcralph | [❤️ sponsor](https://github.com/sponsors/davidcralph) | csrf-protection |
| davideroffo |  | under-pressure |
| dhensby |  | fastify-cli |
| dmkng |  | fastify |
| domdomegg |  | fastify |
| faustman |  | fastify-cli |
| floridemai |  | fluent-json-schema |
| fox1t |  | fastify-autoload |
| giuliowaitforitdavide |  | fastify |
| gunters63 |  | fastify-reply-from |
| gurgunday |  | fastify; fastify-circuit-breaker; fastify-cookie; fastify-multipart; fastify-mysql; fastify-rate-limit; fastify-response-validation; fastify-sensible; fastify-swagger-ui; fluent-json-schema; middie; proxy-addr; safe-regex2; secure-json-parse |
| ildella |  | under-pressure |
| james-kaguru |  | fastify |
| jcbain |  | fastify-http-proxy |
| jdhollander |  | fastify-swagger-ui |
| jean-michelet |  | fastify; fastify-autoload; fastify-cli; fastify-mysql; fastify-sensible |
| johaven |  | fastify-multipart |
| jordanebelanger |  | fastify-plugin |
| jscheffner |  | fastify |
| jsprw |  | fastify-secure-session |
| jsumners | [❤️ sponsor](https://github.com/sponsors/jsumners) | ajv-compiler; avvio; csrf-protection; env-schema; fast-json-stringify; fastify; fastify-accepts; fastify-accepts-serializer; fastify-auth; fastify-autoload; fastify-awilix; fastify-basic-auth; fastify-bearer-auth; fastify-caching; fastify-circuit-breaker; fastify-compress; fastify-cookie; fastify-cors; fastify-env; fastify-error; fastify-etag; fastify-express; fastify-flash; fastify-formbody; fastify-funky; fastify-helmet; fastify-http-proxy; fastify-jwt; fastify-kafka; fastify-leveldb; fastify-multipart; fastify-mysql; fastify-oauth2; fastify-plugin; fastify-postgres; fastify-redis; fastify-reply-from; fastify-request-context; fastify-response-validation; fastify-routes; fastify-routes-stats; fastify-schedule; fastify-secure-session; fastify-sensible; fastify-static; fastify-swagger; fastify-swagger-ui; fastify-url-data; fastify-websocket; fastify-zipkin; fluent-json-schema; forwarded; light-my-request; middie; process-warning; proxy-addr; safe-regex2; secure-json-parse; under-pressure |
| karankraina |  | under-pressure |
| kerolloz | [❤️ sponsor](https://github.com/sponsors/kerolloz) | fastify-jwt |
| kibertoad |  | fastify-rate-limit |
| kukidon-dev |  | fastify-passport |
| kunal097 |  | fastify |
| lamweili |  | fastify-sensible |
| lemonclown |  | fastify-mongodb |
| liuhanqu |  | fastify |
| matthyk |  | fastify-plugin |
| mch-dsk |  | fastify |
| mcollina | [❤️ sponsor](https://github.com/sponsors/mcollina) | ajv-compiler; avvio; csrf-protection; fastify; fastify-accepts; fastify-accepts-serializer; fastify-auth; fastify-autoload; fastify-awilix; fastify-basic-auth; fastify-bearer-auth; fastify-caching; fastify-circuit-breaker; fastify-cli; fastify-compress; fastify-cookie; fastify-cors; fastify-diagnostics-channel; fastify-elasticsearch; fastify-env; fastify-etag; fastify-express; fastify-flash; fastify-formbody; fastify-funky; fastify-helmet; fastify-http-proxy; fastify-jwt; fastify-kafka; fastify-leveldb; fastify-multipart; fastify-mysql; fastify-oauth2; fastify-passport; fastify-plugin; fastify-postgres; fastify-rate-limit; fastify-redis; fastify-reply-from; fastify-request-context; fastify-response-validation; fastify-routes; fastify-routes-stats; fastify-schedule; fastify-secure-session; fastify-static; fastify-swagger; fastify-swagger-ui; fastify-url-data; fastify-websocket; fastify-zipkin; fluent-json-schema; light-my-request; middie; point-of-view; proxy-addr; secure-json-parse; under-pressure |
| melroy89 | [❤️ sponsor](https://github.com/sponsors/melroy89) | under-pressure |
| metcoder95 | [❤️ sponsor](https://github.com/sponsors/metcoder95) | fastify-elasticsearch |
| mhamann |  | fastify-cli |
| mihaur |  | fastify-elasticsearch |
| mikesamm |  | fastify |
| mikhael-abdallah |  | secure-json-parse |
| miquelfire | [❤️ sponsor](https://github.com/sponsors/miquelfire) | fastify-routes |
| miraries |  | fastify-swagger-ui |
| mohab-sameh |  | fastify |
| monish001 |  | fastify |
| moradebianchetti81 |  | fastify |
| mouhannad-sh |  | aws-lambda-fastify |
| multivoltage |  | point-of-view |
| muya | [❤️ sponsor](https://github.com/sponsors/muya) | under-pressure |
| mweberxyz |  | point-of-view |
| nflaig |  | fastify |
| nickfla1 |  | avvio |
| o-az |  | process-warning |
| ojeytonwilliams |  | csrf-protection |
| onosendi |  | fastify-formbody |
| philippviereck |  | fastify |
| pip77 |  | fastify-mongodb |
| puskin94 |  | fastify |
| remidewitte |  | fastify |
| rozzilla |  | fastify |
| samialdury |  | fastify-cli |
| sknetl |  | fastify-cors |
| sourcecodeit |  | fastify |
| synapse |  | env-schema |
| timursaurus |  | secure-json-parse |
| tlhunter |  | fastify |
| tlund101 |  | fastify-rate-limit |
| ttshivers |  | fastify-http-proxy |
| voxpelli | [❤️ sponsor](https://github.com/sponsors/voxpelli) | fastify |
| weixinwu |  | fastify-cli |
| zetaraku |  | fastify-cli |
````

## Source: https://fastify.dev/docs/latest/Guides/Plugins-Guide
````markdown
<h1 align="center">Fastify</h1>

# The hitchhiker's guide to plugins
First of all, `DON'T PANIC`!

Fastify was built from the beginning to be an extremely modular system. We built
a powerful API that allows you to add methods and utilities to Fastify by
creating a namespace. We built a system that creates an encapsulation model,
which allows you to split your application into multiple microservices at any
moment, without the need to refactor the entire application.

**Table of contents**
- [The hitchhiker's guide to plugins](#the-hitchhikers-guide-to-plugins)
  - [Register](#register)
  - [Decorators](#decorators)
  - [Hooks](#hooks)
  - [How to handle encapsulation and
    distribution](#how-to-handle-encapsulation-and-distribution)
  - [ESM support](#esm-support)
  - [Handle errors](#handle-errors)
  - [Custom errors](#custom-errors)
  - [Emit Warnings](#emit-warnings)
  - [Let's start!](#lets-start)

## Register
<a id="register"></a>

As with JavaScript, where everything is an object, in Fastify everything is a
plugin.

Your routes, your utilities, and so on are all plugins. To add a new plugin,
whatever its functionality may be, in Fastify you have a nice and unique API:
[`register`](../Reference/Plugins.md).
```js
fastify.register(
  require('./my-plugin'),
  { options }
)
```
`register` creates a new Fastify context, which means that if you perform any
changes on the Fastify instance, those changes will not be reflected in the
context's ancestors. In other words, encapsulation!

*Why is encapsulation important?*

Well, let's say you are creating a new disruptive startup, what do you do? You
create an API server with all your stuff, everything in the same place, a
monolith!

Ok, you are growing very fast and you want to change your architecture and try
microservices. Usually, this implies a huge amount of work, because of cross
dependencies and a lack of separation of concerns in the codebase.

Fastify helps you in that regard. Thanks to the encapsulation model, it will
completely avoid cross dependencies and will help you structure your code into
cohesive blocks.

*Let's return to how to correctly use `register`.*

As you probably know, the required plugins must expose a single function with
the following signature
```js
module.exports = function (fastify, options, done) {}
```
Where `fastify` is the encapsulated Fastify instance, `options` is the options
object, and `done` is the function you **must** call when your plugin is ready.

Fastify's plugin model is fully reentrant and graph-based, it handles
asynchronous code without any problems and it enforces both the load and close
order of plugins. *How?* Glad you asked, check out
[`avvio`](https://github.com/mcollina/avvio)! Fastify starts loading the plugin
__after__ `.listen()`, `.inject()` or `.ready()` are called.

Inside a plugin you can do whatever you want, register routes and utilities (we
will see this in a moment), and do nested registers, just remember to call `done`
when everything is set up!
```js
module.exports = function (fastify, options, done) {
  fastify.get('/plugin', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  done()
}
```

Well, now you know how to use the `register` API and how it works, but how do we
add new functionality to Fastify and even better, share them with other
developers?

## Decorators
<a id="decorators"></a>

Okay, let's say that you wrote a utility that is so good that you decided to
make it available along with all your code. How would you do it? Probably
something like the following:
```js
// your-awesome-utility.js
module.exports = function (a, b) {
  return a + b
}
```
```js
const util = require('./your-awesome-utility')
console.log(util('that is ', 'awesome'))
```
Now you will import your utility in every file you need it in. (And do not
forget that you will probably also need it in your tests).

Fastify offers you a more elegant and comfortable way to do this, *decorators*.
Creating a decorator is extremely easy, just use the
[`decorate`](../Reference/Decorators.md) API:
```js
fastify.decorate('util', (a, b) => a + b)
```
Now you can access your utility just by calling `fastify.util` whenever you need
it - even inside your test.

And here starts the magic; do you remember how just now we were talking about
encapsulation? Well, using `register` and `decorate` in conjunction enables
exactly that, let me show you an example to clarify this:
```js
fastify.register((instance, opts, done) => {
  instance.decorate('util', (a, b) => a + b)
  console.log(instance.util('that is ', 'awesome'))

  done()
})

fastify.register((instance, opts, done) => {
  console.log(instance.util('that is ', 'awesome')) // This will throw an error

  done()
})
```
Inside the second register call `instance.util` will throw an error because
`util` exists only inside the first register context.

Let's step back for a moment and dig deeper into this: every time you use the
`register` API, a new context is created that avoids the negative situations
mentioned above.

Do note that encapsulation applies to the ancestors and siblings, but not the
children.
```js
fastify.register((instance, opts, done) => {
  instance.decorate('util', (a, b) => a + b)
  console.log(instance.util('that is ', 'awesome'))

  fastify.register((instance, opts, done) => {
    console.log(instance.util('that is ', 'awesome')) // This will not throw an error
    done()
  })

  done()
})

fastify.register((instance, opts, done) => {
  console.log(instance.util('that is ', 'awesome')) // This will throw an error

  done()
})
```
*Take home message: if you need a utility that is available in every part of
your application, take care that it is declared in the root scope of your
application. If that is not an option,  you can use the `fastify-plugin` utility
as described [here](#distribution).*

`decorate` is not the only API that you can use to extend the server
functionality, you can also use `decorateRequest` and `decorateReply`.

*`decorateRequest` and `decorateReply`? Why do we need them if we already have
`decorate`?*

Good question, we added them to make Fastify more developer-friendly. Let's see
an example:
```js
fastify.decorate('html', payload => {
  return generateHtml(payload)
})

fastify.get('/html', (request, reply) => {
  reply
    .type('text/html')
    .send(fastify.html({ hello: 'world' }))
})
```
It works, but it could be much better!
```js
fastify.decorateReply('html', function (payload) {
  this.type('text/html') // This is the 'Reply' object
  this.send(generateHtml(payload))
})

fastify.get('/html', (request, reply) => {
  reply.html({ hello: 'world' })
})
```
Reminder that the `this` keyword is not available on *arrow functions*,
so when passing functions in *`decorateReply`* and *`decorateRequest`* as
a utility that also needs access to the `request` and `reply` instance,
a function that is defined using the `function` keyword is needed instead
of an *arrow function expression*.

You can do the same for the `request` object:
```js
fastify.decorate('getHeader', (req, header) => {
  return req.headers[header]
})

fastify.addHook('preHandler', (request, reply, done) => {
  request.isHappy = fastify.getHeader(request.raw, 'happy')
  done()
})

fastify.get('/happiness', (request, reply) => {
  reply.send({ happy: request.isHappy })
})
```
Again, it works, but it can be much better!
```js
fastify.decorateRequest('setHeader', function (header) {
  this.isHappy = this.headers[header]
})

fastify.decorateRequest('isHappy', false) // This will be added to the Request object prototype, yay speed!

fastify.addHook('preHandler', (request, reply, done) => {
  request.setHeader('happy')
  done()
})

fastify.get('/happiness', (request, reply) => {
  reply.send({ happy: request.isHappy })
})
```

We have seen how to extend server functionality and how to handle the
encapsulation system, but what if you need to add a function that must be
executed whenever the server "[emits](../Reference/Lifecycle.md)" an
event?

## Hooks
<a id="hooks"></a>

You just built an amazing utility, but now you need to execute that for every
request, this is what you will likely do:
```js
fastify.decorate('util', (request, key, value) => { request[key] = value })

fastify.get('/plugin1', (request, reply) => {
  fastify.util(request, 'timestamp', new Date())
  reply.send(request)
})

fastify.get('/plugin2', (request, reply) => {
  fastify.util(request, 'timestamp', new Date())
  reply.send(request)
})
```
I think we all agree that this is terrible. Repeated code, awful readability and
it cannot scale.

So what can you do to avoid this annoying issue? Yes, you are right, use a
[hook](../Reference/Hooks.md)!

```js
fastify.decorate('util', (request, key, value) => { request[key] = value })

fastify.addHook('preHandler', (request, reply, done) => {
  fastify.util(request, 'timestamp', new Date())
  done()
})

fastify.get('/plugin1', (request, reply) => {
  reply.send(request)
})

fastify.get('/plugin2', (request, reply) => {
  reply.send(request)
})
```
Now for every request, you will run your utility. You can register as many hooks
as you need.

Sometimes you want a hook that should be executed for just a subset of routes,
how can you do that? Yep, encapsulation!

```js
fastify.register((instance, opts, done) => {
  instance.decorate('util', (request, key, value) => { request[key] = value })

  instance.addHook('preHandler', (request, reply, done) => {
    instance.util(request, 'timestamp', new Date())
    done()
  })

  instance.get('/plugin1', (request, reply) => {
    reply.send(request)
  })

  done()
})

fastify.get('/plugin2', (request, reply) => {
  reply.send(request)
})
```
Now your hook will run just for the first route!

An alternative approach is to make use of the [onRoute hook](../Reference/Hooks.md#onroute)
to customize application routes dynamically from inside the plugin. Every time
a new route is registered, you can read and modify the route options. For example,
based on a [route config option](../Reference/Routes.md#routes-options):

```js
fastify.register((instance, opts, done) => {
  instance.decorate('util', (request, key, value) => { request[key] = value })

  function handler(request, reply, done) {
    instance.util(request, 'timestamp', new Date())
    done()
  }

  instance.addHook('onRoute', (routeOptions) => {
    if (routeOptions.config && routeOptions.config.useUtil === true) {
      // set or add our handler to the route preHandler hook
      if (!routeOptions.preHandler) {
        routeOptions.preHandler = [handler]
        return
      }
      if (Array.isArray(routeOptions.preHandler)) {
        routeOptions.preHandler.push(handler)
        return
      }
      routeOptions.preHandler = [routeOptions.preHandler, handler]
    }
  })

  fastify.get('/plugin1', {config: {useUtil: true}}, (request, reply) => {
    reply.send(request)
  })

  fastify.get('/plugin2', (request, reply) => {
    reply.send(request)
  })

  done()
})
```

This variant becomes extremely useful if you plan to distribute your plugin, as
described in the next section.

As you probably noticed by now, `request` and `reply` are not the standard
Node.js *request* and *response* objects, but Fastify's objects.


## How to handle encapsulation and distribution
<a id="distribution"></a>

Perfect, now you know (almost) all of the tools that you can use to extend
Fastify. Nevertheless, chances are that you came across one big issue: how is
distribution handled?

The preferred way to distribute a utility is to wrap all your code inside a
`register`. Using this, your plugin can support asynchronous bootstrapping
*(since `decorate` is a synchronous API)*, in the case of a database connection
for example.

*Wait, what? Didn't you tell me that `register` creates an encapsulation and
that the stuff I create inside will not be available outside?*

Yes, I said that. However, what I didn't tell you is that you can tell Fastify
to avoid this behavior with the
[`fastify-plugin`](https://github.com/fastify/fastify-plugin) module.
```js
const fp = require('fastify-plugin')
const dbClient = require('db-client')

function dbPlugin (fastify, opts, done) {
  dbClient.connect(opts.url, (err, conn) => {
    fastify.decorate('db', conn)
    done()
  })
}

module.exports = fp(dbPlugin)
```
You can also tell `fastify-plugin` to check the installed version of Fastify, in
case you need a specific API.

As we mentioned earlier, Fastify starts loading its plugins __after__
`.listen()`, `.inject()` or `.ready()` are called and as such, __after__ they
have been declared. This means that, even though the plugin may inject variables
to the external Fastify instance via [`decorate`](../Reference/Decorators.md),
the decorated variables will not be accessible before calling `.listen()`,
`.inject()`, or `.ready()`.

In case you rely on a variable injected by a preceding plugin and want to pass
that in the `options` argument of `register`, you can do so by using a function
instead of an object:
```js
const fastify = require('fastify')()
const fp = require('fastify-plugin')
const dbClient = require('db-client')

function dbPlugin (fastify, opts, done) {
  dbClient.connect(opts.url, (err, conn) => {
    fastify.decorate('db', conn)
    done()
  })
}

fastify.register(fp(dbPlugin), { url: 'https://example.com' })
fastify.register(require('your-plugin'), parent => {
  return { connection: parent.db, otherOption: 'foo-bar' }
})
```
In the above example, the `parent` variable of the function passed in as the
second argument of `register` is a copy of the **external Fastify instance**
that the plugin was registered at. This means that we can access any
variables that were injected by preceding plugins in the order of declaration.

## ESM support
<a id="esm-support"></a>

ESM is supported as well from [Node.js
`v13.3.0`](https://nodejs.org/api/esm.html) and above! Just export your plugin
as an ESM module and you are good to go!

```js
// plugin.mjs
async function plugin (fastify, opts) {
  fastify.get('/', async (req, reply) => {
    return { hello: 'world' }
  })
}

export default plugin
```

## Handle errors
<a id="handle-errors"></a>

One of your plugins may fail during startup. Maybe you expect it
and you have a custom logic that will be triggered in that case. How can you
implement this? The `after` API is what you need. `after` simply registers a
callback that will be executed just after a register, and it can take up to
three parameters.

The callback changes based on the parameters you are giving:

1. If no parameter is given to the callback and there is an error, that error
   will be passed to the next error handler.
1. If one parameter is given to the callback, that parameter will be the error
   object.
1. If two parameters are given to the callback, the first will be the error
   object; the second will be the done callback.
1. If three parameters are given to the callback, the first will be the error
   object, the second will be the top-level context unless you have specified
   both server and override, in that case, the context will be what the override
   returns, and the third the done callback.

Let's see how to use it:
```js
fastify
  .register(require('./database-connector'))
  .after(err => {
    if (err) throw err
  })
```

## Custom errors
<a id="custom-errors"></a>

If your plugin needs to expose custom errors, you can easily generate consistent
error objects across your codebase and plugins with the
[`@fastify/error`](https://github.com/fastify/fastify-error) module.

```js
const createError = require('@fastify/error')
const CustomError = createError('ERROR_CODE', 'message')
console.log(new CustomError())
```

## Emit Warnings
<a id="emit-warnings"></a>

If you want to deprecate an API, or you want to warn the user about a specific
use case, you can use the
[`process-warning`](https://github.com/fastify/process-warning) module.

```js
const warning = require('process-warning')()
warning.create('MyPluginWarning', 'MP_ERROR_CODE', 'message')
warning.emit('MP_ERROR_CODE')
```

## Let's start!
<a id="start"></a>

Awesome, now you know everything you need to know about Fastify and its plugin
system to start building your first plugin, and please if you do, tell us! We
will add it to the [*ecosystem*](https://github.com/fastify/fastify#ecosystem)
section of our documentation!

If you want to see some real-world examples, check out:
- [`@fastify/view`](https://github.com/fastify/point-of-view) Templates
  rendering (*ejs, pug, handlebars, marko*) plugin support for Fastify.
- [`@fastify/mongodb`](https://github.com/fastify/fastify-mongodb) Fastify
  MongoDB connection plugin, with this you can share the same MongoDB connection
  pool in every part of your server.
- [`@fastify/multipart`](https://github.com/fastify/fastify-multipart) Multipart
  support for Fastify
- [`@fastify/helmet`](https://github.com/fastify/fastify-helmet) Important
  security headers for Fastify


*Do you feel like something is missing here? Let us know! :)*
````

## Source: https://fastify.dev/docs/latest/Guides/Prototype-Poisoning
````markdown
> The following is an article written by Eran Hammer.
> It is reproduced here for posterity [with permission](https://github.com/fastify/fastify/issues/1426#issuecomment-817957913).
> It has been reformatted from the original HTML source to Markdown source,
> but otherwise remains the same. The original HTML can be retrieved from the
> above permission link.

## History behind prototype poisoning
<a id="pp"></a>

Based on the article by Eran Hammer,the issue is created by a web security bug.
It is also a perfect illustration of the efforts required to maintain
open-source software and the limitations of existing communication channels.

But first, if we use a JavaScript framework to process incoming JSON data, take
a moment to read up on [Prototype Poisoning](https://medium.com/intrinsic/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96)
in general, and the specific
[technical details](https://github.com/hapijs/hapi/issues/3916) of this issue.
This could be a critical issue so, we might need to verify your own code first.
It focuses on specific framework however, any solution that uses `JSON.parse()`
to process external data is potentially at risk.

### BOOM
<a id="pp-boom"></a>

The engineering team at Lob (long time generous supporters of my work!) reported
a critical security vulnerability they identified in our data validation
module — [joi](https://github.com/hapijs/joi). They provided some technical
details and a proposed solution.

The main purpose of a data validation library is to ensure the output fully
complies with the rules defined. If it doesn't, validation fails. If it passes,
we can blindly trust that the data you are working with is safe. In fact, most
developers treat validated input as completely safe from a system integrity
perspective which is crucial!

In our case, the Lob team provided an example where some data was able to escape
by the validation logic and pass through undetected. This is the worst possible
defect a validation library can have.

### Prototype in a nutshell
<a id="pp-nutshell"></a>

To understand this, we need to understand how JavaScript works a bit.
Every object in JavaScript can have a prototype. It is a set of methods and
properties it "inherits" from another object. I have put inherits in quotes
because JavaScript isn't really an object-oriented language. It is a prototype-
based object-oriented language.

A long time ago, for a bunch of irrelevant reasons, someone decided that it
would be a good idea to use the special property name `__proto__` to access (and
set) an object's prototype. This has since been deprecated but nevertheless,
fully supported.

To demonstrate:

```
> const a = { b: 5 };
> a.b;
5
> a.__proto__ = { c: 6 };
> a.c;
6
> a;
{ b: 5 }
```

The object doesn't have a `c` property, but its prototype does.
When validating the object, the validation library ignores the prototype and
only validates the object's own properties. This allows `c` to sneak in via the
prototype.

Another important part is the way `JSON.parse()` — a utility
provided by the language to convert JSON formatted text into
objects  —  handles this magic `__proto__` property name.

```
> const text = '{"b": 5, "__proto__": { "c": 6 }}';
> const a = JSON.parse(text);
> a;
{b: 5, __proto__: { c: 6 }}
```
Notice how `a` has a `__proto__` property. This is not a prototype reference. It
is a simple object property key, just like `b`. As we've seen from the first
example, we can't actually create this key through assignment as that invokes
the prototype magic and sets an actual prototype. `JSON.parse()` however, sets a
simple property with that poisonous name.

By itself, the object created by `JSON.parse()` is perfectly safe. It doesn't
have a prototype of its own. It has a seemingly harmless property that just
happens to overlap with a built-in JavaScript magic name.

However, other methods are not as lucky:

```
> const x = Object.assign({}, a);
> x;
{ b: 5}
> x.c;
6;
```

If we take the `a` object created earlier by `JSON.parse()` and pass it to the
helpful `Object.assign()` method (used to perform a shallow copy of all the top
level properties of `a` into the provided empty `{}` object), the magic
`__proto__` property "leaks" and becomes `x` 's actual prototype.

Surprise!

If you get some external text input and parse it with `JSON.parse()`
then perform some simple manipulation of that object (e.g shallow clone and add
an `id` ), and pass it to our validation library, it would sneak in undetected
via `__proto__`.

### Oh joi!
<a id="pp-oh-joi"></a>

The first question is, of course, why does the validation module **joi** ignore
the prototype and let potentially harmful data through? We asked ourselves the
same question and our instant thought was "it was an oversight". A bug - a really
big mistake. The joi module should not have allowed this to happen. But…

While joi is used primarily for validating web input data, it also has a
significant user base using it to validate internal objects, some of which have
prototypes. The fact that joi ignores the prototype is a helpful "feature". It
allows validating the object's own properties while ignoring what could be a
very complicated prototype structure (with many methods and literal properties).

Any solution at the joi level would mean breaking some currently working code.

### The right thing
<a id="pp-right-thing"></a>

At this point, we were looking at a devastatingly bad security vulnerability.
Right up there in the upper echelons of epic security failures. All we knew is
that our extremely popular data validation library fails to block harmful data,
and that this data is trivial to sneak through. All you need to do is add
`__proto__` and some crap to a JSON input and send it on its way to an
application built using our tools.

(Dramatic pause)

We knew we had to fix joi to prevent this but given the scale of this issue, we
had to do it in a way that will put a fix out without drawing too much attention
to it — without making it too easy to exploit — at least for a few days until
most systems received the update.

Sneaking a fix isn't the hardest thing to accomplish. If you combine it with an
otherwise purposeless refactor of the code, and throw in a few unrelated bug
fixes and maybe a cool new feature, you can publish a new version without
drawing attention to the real issue being fixed.

The problem was, the right fix was going to break valid use cases. You see, joi
has no way of knowing if you want it to ignore the prototype you set, or block
the prototype set by an attacker. A solution that fixes the exploit will break
code and breaking code tends to get a lot of attention.

On the other hand, if we released a proper ([semantically
versioned](https://semver.org/)) fix, mark it as a breaking change, and add a
new API to explicitly tell joi what you want it to do with the prototype, we
will share with the world how to exploit this vulnerability while also making it
more time consuming for systems to upgrade (breaking changes never get applied
automatically by build tools).


### A detour
<a id="pp-detour"></a>

While the issue at hand was about incoming request payloads, we had to pause and
check if it could also impact data coming via the query string, cookies, and
headers. Basically, anything that gets serialized into objects from text.

We quickly confirmed node default query string parser was fine as well as its
header parser. I identified one potential issue with base64-encoded JSON cookies
as well as the usage of custom query string parsers. We also wrote some tests to
confirm that the most popular third-party query string parser  —
[qs](https://www.npmjs.com/package/qs) —  was not vulnerable (it is not!).

### A development
<a id="pp-a-development"></a>

Throughout this triage, we just assumed that the offending input with its
poisoned prototype was coming into joi from hapi, the web framework connecting
the hapi.js ecosystem. Further investigation by the Lob team found that the
problem was a bit more nuanced.

hapi used `JSON.parse()` to process incoming data. It first set the result
object as a `payload` property of the incoming request, and then passed that
same object for validation by joi before being passed to the application
business logic for processing. Since `JSON.parse()` doesn't actually leak the
`__proto__` property, it would arrive to joi with an invalid key and fail
validation.

However, hapi provides two extension points where the payload data can be
inspected (and processed) prior to validation. It is all properly documented and
well understood by most developers. The extension points are there to allow you
to interact with the raw inputs prior to validation for legitimate (and often
security related) reasons.

If during one of these two extension points, a developer used `Object.assign()`
or a similar method on the payload, the `__proto__` property would leak and
become an actual prototype.

### Sigh of relief
<a id="pp-sigh-of-relief"></a>

We were now dealing with a much different level of awfulness. Manipulating the
payload object prior to validation is not common which meant this was no longer
a doomsday scenario. It was still potentially catastrophic but the exposure
dropped from every joi user to some very specific implementations.

We were no longer looking at a secretive joi release. The issue in joi is still
there, but we can now address it properly with a new API and breaking release
over the next few weeks.

We also knew that we can easily mitigate this vulnerability at the framework
level since it knows which data is coming from the outside and which is
internally generated. The framework is really the only piece that can protect
developers against making such unexpected mistakes.

### Good news, bad news, no news?
<a id="pp-good-news-no-news"></a>

The good news was that this wasn't our fault. It wasn't a bug in hapi or joi. It
was only possible through a complex combination of actions that was not unique
to hapi or joi. This can happen with every other JavaScript framework. If hapi
is broken, then the world is broken.

Great — we solved the blame game.

The bad news is that when there is nothing to blame (other than JavaScript
itself), it is much harder getting it fixed.

The first question people ask once a security issue is found is if there is
going to be a CVE published. A CVE — Common Vulnerabilities and Exposures — is a
[database](https://cve.mitre.org/) of known security issues. It is a critical
component of web security. The benefit of publishing a CVE is that it
immediately triggers alarms and informs and often breaks automated builds until
the issue is resolved.

But what do we pin this to?

Probably, nothing. We are still debating whether we should tag some versions of
hapi with a warning. The "we" is the node security process. Since we now have a
new version of hapi that mitigate the problem by default, it can be considered a
fix. But because the fix isn't to a problem in hapi itself, it is not exactly
kosher to declare older versions harmful.

Publishing an advisory on previous versions of hapi for the sole purpose of
nudging people into awareness and upgrade is an abuse of the advisory process.
I'm personally fine with abusing it for the purpose of improving security but
that's not my call. As of this writing, it is still being debated.

### The solution business
<a id="pp-solution-business"></a>

Mitigating the issue wasn't hard. Making it scale and safe was a bit more
involved. Since we knew where harmful data can enter the system, and we knew
where we used the problematic `JSON.parse()` we could replace it with a safe
implementation.

One problem. Validating data can be costly and we are now planning on validating
every incoming JSON text. The built-in `JSON.parse()` implementation is fast.
Really really fast. It is unlikely we can build a replacement that will be more
secure and anywhere as fast. Especially not overnight and without introducing
new bugs.

It was obvious we were going to wrap the existing `JSON.parse()` method with
some additional logic. We just had to make sure it was not adding too much
overhead. This isn't just a performance consideration but also a security one.
If we make it easy to slow down a system by simply sending specific data, we
make it easy to execute a [DoS
attack](https://en.wikipedia.org/wiki/Denial-of-service_attack) at very low
cost.

I came up with a stupidly simple solution: first parse the text using the
existing tools. If this didn't fail, scan the original raw text for the
offending string "__proto__". Only if we find it, perform an actual scan of the
object. We can't block every reference to "__proto__" — sometimes it is
perfectly valid value (like when writing about it here and sending this text
over to Medium for publication).

This made the "happy path" practically as fast as before. It just added one
function call, a quick text scan (again, very fast built-in implementation), and
a conditional return. The solution had negligible impact on the vast majority of
data expected to pass through it.

Next problem. The prototype property doesn't have to be at the top level of the
incoming object. It can be nested deep inside. This means we cannot just check
for the presence of it at the top level. We need to recursively iterate through
the object.

While recursive functions are a favorite tool, they could be disastrous when
writing security-conscious code. You see, recursive function increase the size
of the runtime call stack. The more times you loop, the longer the call stack
gets. At some point — KABOOM— you reach the maximum length and the process dies.

If you cannot guarantee the shape of the incoming data, recursive iteration
becomes an open threat. An attacker only needs to craft a deep enough object to
crash your servers.

I used a flat loop implementation that is both more memory efficient (less
function calls, less passing of temporary arguments) and more secure. I am not
pointing this out to brag, but to highlight how basic engineering practices can
create (or avoid) security pitfalls.

### Putting it to the test
<a id="pp-putting-to-test"></a>

I sent the code to two people. First to [Nathan
LaFreniere](https://github.com/nlf) to double check the security properties of
the solution, and then to [Matteo Collina](https://github.com/mcollina) to
review the performance. They are among the very best at what they do and often
my go-to people.

The performance benchmarks confirmed that the "happy path" was practically
unaffected. The interesting findings was that removing the offending values was
faster then throwing an exception. This raised the question of what should be
the default behavior of the new module — which I called
[**bourne**](https://github.com/hapijs/bourne) —  error or sanitize.

The concern, again, was exposing the application to a DoS attack. If sending a
request with `__proto__` makes things 500% slower, that could be an easy vector
to exploit. But after a bit more testing we confirmed that sending **any**
invalid JSON text was creating a very similar cost.

In other words, if you parse JSON, invalid values are going to cost you more,
regardless of what makes them invalid. It is also important to remember that
while the benchmark showed the significant % cost of scanning suspected objects,
the actual cost in CPU time was still in the fraction of milliseconds. Important
to note and measure but not actually harmful.

### hapi ever-after
<a id="pp-hapi-ever-after"></a>

There are a bunch of things to be grateful for.

The initial disclosure by the Lob team was perfect. It was reported privately,
to the right people, with the right information. They followed up with
additional findings, and gave us the time and space to resolve it the right way.
Lob also was a major sponsor of my work on hapi over the years and that
financial support is critical to allow everything else to happen. More on that
in a bit.

Triage was stressful but staffed with the right people. Having folks like
[Nicolas Morel](https://github.com/Marsup), Nathan, and Matteo, available and
eager to help is critical. This isn't easy to deal with without the pressure,
but with it, mistakes are likely without proper team collaboration.

We got lucky with the actual vulnerability. What started up looking like a
catastrophic problem, ended up being a delicate but straight-forward problem to
address.

We also got lucky by having full access to mitigate it at the source — didn't
need to send emails to some unknown framework maintainer and hope for a quick
answer. hapi's total control over all of its dependencies proved its usefulness
and security again. Not using [hapi](https://hapi.dev)? [Maybe you
should](https://hueniverse.com/why-you-should-consider-hapi-6163689bd7c2).

### The after in happy ever-after
<a id="pp-after-ever-after"></a>

This is where I have to take advantage of this incident to reiterate the cost
and need for sustainable and secure open source.

My time alone on this one issue exceeded 20 hours. That's half a working week.
It came at the end of a month were I already spent over 30 hours publishing a
new major release of hapi (most of the work was done in December). This puts me
at a personal financial loss of over $5000 this month (I had to cut back on paid
client work to make time for it).

If you rely on code I maintain, this is exactly the level of support, quality,
and commitment you want (and lets be honest — expect). Most of you take it for
granted — not just my work but the work of hundreds of other dedicated open
source maintainers.

Because this work is important, I decided to try and make it not just
financially sustainable but to grow and expand it. There is so much to improve.
This is exactly what motivates me to implement the new [commercial licensing
plan](https://web.archive.org/web/20190201220503/https://hueniverse.com/on-hapi-licensing-a-preview-f982662ee898)
coming in March. You can read more about it
[here](https://web.archive.org/web/20190201220503/https://hueniverse.com/on-hapi-licensing-a-preview-f982662ee898).
````

## Source: https://fastify.dev/docs/latest/Guides/Recommendations
````markdown
<h1 align="center">Fastify</h1>

## Recommendations

This document contains a set of recommendations when using Fastify.

- [Use A Reverse Proxy](#use-a-reverse-proxy)
  - [HAProxy](#haproxy)
  - [Nginx](#nginx)
- [Kubernetes](#kubernetes)
- [Capacity Planning For Production](#capacity)
- [Running Multiple Instances](#multiple)

## Use A Reverse Proxy
<a id="reverseproxy"></a>

Node.js is an early adopter of frameworks shipping with an easy-to-use web
server within the standard library. Previously, with languages like PHP or
Python, one would need either a web server with specific support for the
language or the ability to set up some sort of [CGI gateway][cgi] that works
with the language. With Node.js, one can write an application that _directly_
handles HTTP requests. As a result, the temptation is to write applications that
handle requests for multiple domains, listen on multiple ports (i.e. HTTP _and_
HTTPS), and then expose these applications directly to the Internet to handle
requests.

The Fastify team **strongly** considers this to be an anti-pattern and extremely
bad practice:

1. It adds unnecessary complexity to the application by diluting its focus.
2. It prevents [horizontal scalability][scale-horiz].

See [Why should I use a Reverse Proxy if Node.js is Production Ready?][why-use]
for a more thorough discussion of why one should opt to use a reverse proxy.

For a concrete example, consider the situation where:

1. The app needs multiple instances to handle load.
1. The app needs TLS termination.
1. The app needs to redirect HTTP requests to HTTPS.
1. The app needs to serve multiple domains.
1. The app needs to serve static resources, e.g. jpeg files.

There are many reverse proxy solutions available, and your environment may
dictate the solution to use, e.g. AWS or GCP. Given the above, we could use
[HAProxy][haproxy] or [Nginx][nginx] to solve these requirements:

### HAProxy

```conf
# The global section defines base HAProxy (engine) instance configuration.
global
  log /dev/log syslog
  maxconn 4096
  chroot /var/lib/haproxy
  user haproxy
  group haproxy

  # Set some baseline TLS options.
  tune.ssl.default-dh-param 2048
  ssl-default-bind-options no-sslv3 no-tlsv10 no-tlsv11
  ssl-default-bind-ciphers ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:RSA+AESGCM:RSA+AES:!aNULL:!MD5:!DSS
  ssl-default-server-options no-sslv3 no-tlsv10 no-tlsv11
  ssl-default-server-ciphers ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:RSA+AESGCM:RSA+AES:!aNULL:!MD5:!DSS

# Each defaults section defines options that will apply to each subsequent
# subsection until another defaults section is encountered.
defaults
  log   global
  mode  http
  option        httplog
  option        dontlognull
  retries       3
  option redispatch
  # The following option makes haproxy close connections to backend servers
  # instead of keeping them open. This can alleviate unexpected connection
  # reset errors in the Node process.
  option http-server-close
  maxconn       2000
  timeout connect 5000
  timeout client 50000
  timeout server 50000

  # Enable content compression for specific content types.
  compression algo gzip
  compression type text/html text/plain text/css application/javascript

# A "frontend" section defines a public listener, i.e. an "http server"
# as far as clients are concerned.
frontend proxy
  # The IP address here would be the _public_ IP address of the server.
  # Here, we use a private address as an example.
  bind 10.0.0.10:80
  # This redirect rule will redirect all traffic that is not TLS traffic
  # to the same incoming request URL on the HTTPS port.
  redirect scheme https code 308 if !{ ssl_fc }
  # Technically this use_backend directive is useless since we are simply
  # redirecting all traffic to this frontend to the HTTPS frontend. It is
  # merely included here for completeness sake.
  use_backend default-server

# This frontend defines our primary, TLS only, listener. It is here where
# we will define the TLS certificates to expose and how to direct incoming
# requests.
frontend proxy-ssl
  # The `/etc/haproxy/certs` directory in this example contains a set of
  # certificate PEM files that are named for the domains the certificates are
  # issued for. When HAProxy starts, it will read this directory, load all of
  # the certificates it finds here, and use SNI matching to apply the correct
  # certificate to the connection.
  bind 10.0.0.10:443 ssl crt /etc/haproxy/certs

  # Here we define rule pairs to handle static resources. Any incoming request
  # that has a path starting with `/static`, e.g.
  # `https://one.example.com/static/foo.jpeg`, will be redirected to the
  # static resources server.
  acl is_static path -i -m beg /static
  use_backend static-backend if is_static

  # Here we define rule pairs to direct requests to appropriate Node.js
  # servers based on the requested domain. The `acl` line is used to match
  # the incoming hostname and define a boolean indicating if it is a match.
  # The `use_backend` line is used to direct the traffic if the boolean is
  # true.
  acl example1 hdr_sub(Host) one.example.com
  use_backend example1-backend if example1

  acl example2 hdr_sub(Host) two.example.com
  use_backend example2-backend if example2

  # Finally, we have a fallback redirect if none of the requested hosts
  # match the above rules.
  default_backend default-server

# A "backend" is used to tell HAProxy where to request information for the
# proxied request. These sections are where we will define where our Node.js
# apps live and any other servers for things like static assets.
backend default-server
  # In this example we are defaulting unmatched domain requests to a single
  # backend server for all requests. Notice that the backend server does not
  # have to be serving TLS requests. This is called "TLS termination": the TLS
  # connection is "terminated" at the reverse proxy.
  # It is possible to also proxy to backend servers that are themselves serving
  # requests over TLS, but that is outside the scope of this example.
  server server1 10.10.10.2:80

# This backend configuration will serve requests for `https://one.example.com`
# by proxying requests to three backend servers in a round-robin manner.
backend example1-backend
  server example1-1 10.10.11.2:80
  server example1-2 10.10.11.2:80
  server example2-2 10.10.11.3:80

# This one serves requests for `https://two.example.com`
backend example2-backend
  server example2-1 10.10.12.2:80
  server example2-2 10.10.12.2:80
  server example2-3 10.10.12.3:80

# This backend handles the static resources requests.
backend static-backend
  server static-server1 10.10.9.2:80
```

[cgi]: https://en.wikipedia.org/wiki/Common_Gateway_Interface
[scale-horiz]: https://en.wikipedia.org/wiki/Scalability#Horizontal
[why-use]: https://web.archive.org/web/20190821102906/https://medium.com/intrinsic/why-should-i-use-a-reverse-proxy-if-node-js-is-production-ready-5a079408b2ca
[haproxy]: https://www.haproxy.org/

### Nginx

```nginx
# This upstream block groups 3 servers into one named backend fastify_app
# with 2 primary servers distributed via round-robin
# and one backup which is used when the first 2 are not reachable
# This also assumes your fastify servers are listening on port 80.
# more info: https://nginx.org/en/docs/http/ngx_http_upstream_module.html
upstream fastify_app {
  server 10.10.11.1:80;
  server 10.10.11.2:80;
  server 10.10.11.3:80 backup;
}

# This server block asks NGINX to respond with a redirect when
# an incoming request from port 80 (typically plain HTTP), to
# the same request URL but with HTTPS as protocol.
# This block is optional, and usually used if you are handling
# SSL termination in NGINX, like in the example here.
server {
  # default server is a special parameter to ask NGINX
  # to set this server block to the default for this address/port
  # which in this case is any address and port 80
  listen 80 default_server;
  listen [::]:80 default_server;

  # With a server_name directive you can also ask NGINX to
  # use this server block only with matching server name(s)
  # listen 80;
  # listen [::]:80;
  # server_name example.tld;

  # This matches all paths from the request and responds with
  # the redirect mentioned above.
  location / {
    return 301 https://$host$request_uri;
  }
}

# This server block asks NGINX to respond to requests from
# port 443 with SSL enabled and accept HTTP/2 connections.
# This is where the request is then proxied to the fastify_app
# server group via port 3000.
server {
  # This listen directive asks NGINX to accept requests
  # coming to any address, port 443, with SSL.
  listen 443 ssl default_server;
  listen [::]:443 ssl default_server;

  # With a server_name directive you can also ask NGINX to
  # use this server block only with matching server name(s)
  # listen 443 ssl;
  # listen [::]:443 ssl;
  # server_name example.tld;

  # Enable HTTP/2 support
  http2 on;

  # Your SSL/TLS certificate (chain) and secret key in the PEM format
  ssl_certificate /path/to/fullchain.pem;
  ssl_certificate_key /path/to/private.pem;

  # A generic best practice baseline for based
  # on https://ssl-config.mozilla.org/
  ssl_session_timeout 1d;
  ssl_session_cache shared:FastifyApp:10m;
  ssl_session_tickets off;

  # This tells NGINX to only accept TLS 1.3, which should be fine
  # with most modern browsers including IE 11 with certain updates.
  # If you want to support older browsers you might need to add
  # additional fallback protocols.
  ssl_protocols TLSv1.3;
  ssl_prefer_server_ciphers off;

  # This adds a header that tells browsers to only ever use HTTPS
  # with this server.
  add_header Strict-Transport-Security "max-age=63072000" always;

  # The following directives are only necessary if you want to
  # enable OCSP Stapling.
  ssl_stapling on;
  ssl_stapling_verify on;
  ssl_trusted_certificate /path/to/chain.pem;

  # Custom nameserver to resolve upstream server names
  # resolver 127.0.0.1;

  # This section matches all paths and proxies it to the backend server
  # group specified above. Note the additional headers that forward
  # information about the original request. You might want to set
  # trustProxy to the address of your NGINX server so the X-Forwarded
  # fields are used by fastify.
  location / {
    # more info: https://nginx.org/en/docs/http/ngx_http_proxy_module.html
    proxy_http_version 1.1;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # This is the directive that proxies requests to the specified server.
    # If you are using an upstream group, then you do not need to specify a port.
    # If you are directly proxying to a server e.g.
    # proxy_pass http://127.0.0.1:3000 then specify a port.
    proxy_pass http://fastify_app;
  }
}
```

[nginx]: https://nginx.org/

## Kubernetes
<a id="kubernetes"></a>

The `readinessProbe` uses ([by
default](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes))
the pod IP as the hostname. Fastify listens on `127.0.0.1` by default. The probe
will not be able to reach the application in this case. To make it work,
the application must listen on `0.0.0.0` or specify a custom hostname in
the `readinessProbe.httpGet` spec, as per the following example:

```yaml
readinessProbe:
    httpGet:
        path: /health
        port: 4000
    initialDelaySeconds: 30
    periodSeconds: 30
    timeoutSeconds: 3
    successThreshold: 1
    failureThreshold: 5
```

## Capacity Planning For Production
<a id="capacity"></a>

In order to rightsize the production environment for your Fastify application,
it is highly recommended that you perform your own measurements against
different configurations of the environment, which may
use real CPU cores, virtual CPU cores (vCPU), or even fractional
vCPU cores. We will use the term vCPU throughout this
recommendation to represent any CPU type.

Tools such as [k6](https://github.com/grafana/k6)
or [autocannon](https://github.com/mcollina/autocannon) can be used for
conducting the necessary performance tests.

That said, you may also consider the following as a rule of thumb:

* To have the lowest possible latency, 2 vCPU are recommended per app
instance (e.g., a k8s pod). The second vCPU will mostly be used by the
garbage collector (GC) and libuv threadpool. This will minimize the latency
for your users, as well as the memory usage, as the GC will be run more
frequently. Also, the main thread won't have to stop to let the GC run.

* To optimize for throughput (handling the largest possible amount of
requests per second per vCPU available), consider using a smaller amount of vCPUs
per app instance. It is totally fine to run Node.js applications with 1 vCPU.

* You may experiment with an even smaller amount of vCPU, which may provide
even better throughput in certain use-cases. There are reports of API gateway
solutions working well with 100m-200m vCPU in Kubernetes.

See [Node's Event Loop From the Inside Out ](https://www.youtube.com/watch?v=P9csgxBgaZ8)
to understand the workings of Node.js in greater detail and make a
better determination about what your specific application needs.

## Running Multiple Instances
<a id="multiple"></a>

There are several use-cases where running multiple Fastify
apps on the same server might be considered. A common example
would be exposing metrics endpoints on a separate port,
to prevent public access, when using a reverse proxy or an ingress
firewall is not an option.

It is perfectly fine to spin up several Fastify instances within the same
Node.js process and run them concurrently, even in high load systems.
Each Fastify instance only generates as much load as the traffic it receives,
plus the memory used for that Fastify instance.
````

## Source: https://fastify.dev/docs/latest/Guides/Serverless
````markdown
<h1 align="center">Serverless</h1>

Run serverless applications and REST APIs using your existing Fastify
application. You may need to make code changes to work on your
serverless platform of choice. This document contains a small guide
for the most popular serverless providers and how to use
Fastify with them.

#### Should you use Fastify in a serverless platform?

That is up to you! Keep in mind, functions as a service should always use
small and focused functions, but you can also run an entire web application with
them. It is important to remember that the bigger the application the slower the
initial boot will be. The best way to run Fastify applications in serverless
environments is to use platforms like Google Cloud Run, AWS Fargate, Azure
Container Instances, and Vercel where the server can handle multiple requests
at the same time and make full use of Fastify's features.

One of the best features of using Fastify in serverless applications is the ease
of development. In your local environment, you will always run the Fastify
application directly without the need for any additional tools, while the same
code will be executed in your serverless platform of choice with an additional
snippet of code.

### Contents

- [AWS](#aws)
- [Genezio](#genezio)
- [Google Cloud Functions](#google-cloud-functions)
- [Google Firebase Functions](#google-firebase-functions)
- [Google Cloud Run](#google-cloud-run)
- [Netlify Lambda](#netlify-lambda)
- [Vercel](#vercel)

## AWS

To integrate with AWS, you have two choices of library:

- Using [@fastify/aws-lambda](https://github.com/fastify/aws-lambda-fastify)
  which only adds API Gateway support but has heavy optimizations for fastify.
- Using [@h4ad/serverless-adapter](https://github.com/H4ad/serverless-adapter)
  which is a little slower as it creates an HTTP request for each AWS event but
  has support for more AWS services such as: AWS SQS, AWS SNS and others.

So you can decide which option is best for you, but you can test both libraries.

### Using @fastify/aws-lambda

The sample provided allows you to easily build serverless web
applications/services and RESTful APIs using Fastify on top of AWS Lambda and
Amazon API Gateway.

#### app.js

```js
const fastify = require('fastify');

function init() {
  const app = fastify();
  app.get('/', (request, reply) => reply.send({ hello: 'world' }));
  return app;
}

if (require.main === module) {
  // called directly i.e. "node app"
  init().listen({ port: 3000 }, (err) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
} else {
  // required as a module => executed on aws lambda
  module.exports = init;
}
```

When executed in your lambda function we do not need to listen to a specific
port, so we just export the wrapper function `init` in this case. The
[`lambda.js`](#lambdajs) file will use this export.

When you execute your Fastify application like always, i.e. `node app.js` *(the
detection for this could be `require.main === module`)*, you can normally listen
to your port, so you can still run your Fastify function locally.

#### lambda.js

```js
const awsLambdaFastify = require('@fastify/aws-lambda')
const init = require('./app');

const proxy = awsLambdaFastify(init())
// or
// const proxy = awsLambdaFastify(init(), { binaryMimeTypes: ['application/octet-stream'] })

exports.handler = proxy;
// or
// exports.handler = (event, context, callback) => proxy(event, context, callback);
// or
// exports.handler = (event, context) => proxy(event, context);
// or
// exports.handler = async (event, context) => proxy(event, context);
```

We just require
[@fastify/aws-lambda](https://github.com/fastify/aws-lambda-fastify) (make sure
you install the dependency `npm i @fastify/aws-lambda`) and our
[`app.js`](#appjs) file and call the exported `awsLambdaFastify` function with
the `app` as the only parameter. The resulting `proxy` function has the correct
signature to be used as a lambda `handler` function. This way all the incoming
events (API Gateway requests) are passed to the `proxy` function of
[@fastify/aws-lambda](https://github.com/fastify/aws-lambda-fastify).

#### Example

An example deployable with
[claudia.js](https://claudiajs.com/tutorials/serverless-express.html) can be
found
[here](https://github.com/claudiajs/example-projects/tree/master/fastify-app-lambda).

### Considerations

- API Gateway does not support streams yet, so you are not able to handle
  [streams](../Reference/Reply.md#streams).
- API Gateway has a timeout of 29 seconds, so it is important to provide a reply
  during this time.

#### Beyond API Gateway

If you need to integrate with more AWS services, take a look at
[@h4ad/serverless-adapter](https://viniciusl.com.br/serverless-adapter/docs/main/frameworks/fastify)
on Fastify to find out how to integrate.

## Genezio

[Genezio](https://genezio.com/) is a platform designed to simplify the deployment
of serverless applications to the cloud.

[Genezio has a dedicated guide for deploying a Fastify application.](https://genezio.com/docs/frameworks/fastify/)

## Google Cloud Functions

### Creation of Fastify instance
```js
const fastify = require("fastify")({
  logger: true // you can also define the level passing an object configuration to logger: {level: 'debug'}
});
```

### Add Custom `contentTypeParser` to Fastify instance

As explained [in issue
#946](https://github.com/fastify/fastify/issues/946#issuecomment-766319521),
since the Google Cloud Functions platform parses the body of the request before
it arrives at the Fastify instance, troubling the body request in case of `POST`
and `PATCH` methods, you need to add a custom [`Content-Type
Parser`](../Reference/ContentTypeParser.md) to mitigate this behavior.

```js
fastify.addContentTypeParser('application/json', {}, (req, body, done) => {
  done(null, body.body);
});
```

### Define your endpoint (examples)

A simple `GET` endpoint:
```js
fastify.get('/', async (request, reply) => {
  reply.send({message: 'Hello World!'})
})
```

Or a more complete `POST` endpoint with schema validation:
```js
fastify.route({
  method: 'POST',
  url: '/hello',
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string'}
      },
      required: ['name']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'}
        }
      }
    },
  },
  handler: async (request, reply) => {
    const { name } = request.body;
    reply.code(200).send({
      message: `Hello ${name}!`
    })
  }
})
```

### Implement and export the function

Final step, implement the function to handle the request and pass it to Fastify
by emitting `request` event to `fastify.server`:

```js
const fastifyFunction = async (request, reply) => {
  await fastify.ready();
  fastify.server.emit('request', request, reply)
}

exports.fastifyFunction = fastifyFunction;
```

### Local test

Install [Google Functions Framework for
Node.js](https://github.com/GoogleCloudPlatform/functions-framework-nodejs).

You can install it globally:
```bash
npm i -g @google-cloud/functions-framework
```

Or as a development library:
```bash
npm i -D @google-cloud/functions-framework
```

Then you can run your function locally with Functions Framework:
```bash
npx @google-cloud/functions-framework --target=fastifyFunction
```

Or add this command to your `package.json` scripts:
```json
"scripts": {
  ...
  "dev": "npx @google-cloud/functions-framework --target=fastifyFunction"
  ...
}
```
and run it with `npm run dev`.

### Deploy
```bash
gcloud functions deploy fastifyFunction \
--runtime nodejs14 --trigger-http --region $GOOGLE_REGION --allow-unauthenticated
```

#### Read logs
```bash
gcloud functions logs read
```

#### Example request to `/hello` endpoint
```bash
curl -X POST https://$GOOGLE_REGION-$GOOGLE_PROJECT.cloudfunctions.net/me \
  -H "Content-Type: application/json" \
  -d '{ "name": "Fastify" }'
{"message":"Hello Fastify!"}
```

### References
- [Google Cloud Functions - Node.js Quickstart
  ](https://cloud.google.com/functions/docs/quickstart-nodejs)

## Google Firebase Functions

Follow this guide if you want to use Fastify as the HTTP framework for
Firebase Functions instead of the vanilla JavaScript router provided with
`onRequest(async (req, res) => {}`.

### The onRequest() handler

We use the `onRequest` function to wrap our Fastify application instance.

As such, we'll begin with importing it to the code:

```js
const { onRequest } = require("firebase-functions/v2/https")
```

### Creation of Fastify instance

Create the Fastify instance and encapsulate the returned application instance
in a function that will register routes, await the server's processing of
plugins, hooks, and other settings. As follows:

```js
const fastify = require("fastify")({
  logger: true,
})

const fastifyApp = async (request, reply) => {
  await registerRoutes(fastify)
  await fastify.ready()
  fastify.server.emit("request", request, reply)
}
```

### Add Custom `contentTypeParser` to Fastify instance and define endpoints

Firebase Function's HTTP layer already parses the request
and makes a JSON payload available. It also provides access
to the raw body, unparsed, which is useful for calculating
request signatures to validate HTTP webhooks.

Add as follows to the `registerRoutes()` function:

```js
async function registerRoutes (fastify) {
  fastify.addContentTypeParser("application/json", {}, (req, payload, done) => {
    // useful to include the request's raw body on the `req` object that will
    // later be available in your other routes so you can calculate the HMAC
    // if needed
    req.rawBody = payload.rawBody

    // payload.body is already the parsed JSON so we just fire the done callback
    // with it
    done(null, payload.body)
  })

  // define your endpoints here...
  fastify.post("/some-route-here", async (request, reply) => {})

  fastify.get('/', async (request, reply) => {
    reply.send({message: 'Hello World!'})
  })
}
```

### Export the function using Firebase onRequest

Final step is to export the Fastify app instance to Firebase's own
`onRequest()` function so it can pass the request and reply objects to it:

```js
exports.app = onRequest(fastifyApp)
```

### Local test

Install the Firebase tools functions so you can use the CLI:

```bash
npm i -g firebase-tools
```

Then you can run your function locally with:

```bash
firebase emulators:start --only functions
```

### Deploy

Deploy your Firebase Functions with:

```bash
firebase deploy --only functions
```

#### Read logs

Use the Firebase tools CLI:

```bash
firebase functions:log
```

### References
- [Fastify on Firebase Functions](https://github.com/lirantal/lemon-squeezy-firebase-webhook-fastify/blob/main/package.json)
- [An article about HTTP webhooks on Firebase Functions and Fastify: A Practical Case Study with Lemon Squeezy](https://lirantal.com/blog/http-webhooks-firebase-functions-fastify-practical-case-study-lemon-squeezy)

## Google Cloud Run

Unlike AWS Lambda or Google Cloud Functions, Google Cloud Run is a serverless
**container** environment. Its primary purpose is to provide an
infrastructure-abstracted environment to run arbitrary containers. As a result,
Fastify can be deployed to Google Cloud Run with little-to-no code changes from
the way you would write your Fastify app normally.

*Follow the steps below to deploy to Google Cloud Run if you are already
familiar with gcloud or just follow their
[quickstart](https://cloud.google.com/run/docs/quickstarts/build-and-deploy)*.

### Adjust Fastify server

For Fastify to properly listen for requests within the container, be
sure to set the correct port and address:

```js
function build() {
  const fastify = Fastify({ trustProxy: true })
  return fastify
}

async function start() {
  // Google Cloud Run will set this environment variable for you, so
  // you can also use it to detect if you are running in Cloud Run
  const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined

  // You must listen on the port Cloud Run provides
  const port = process.env.PORT || 3000

  // You must listen on all IPV4 addresses in Cloud Run
  const host = IS_GOOGLE_CLOUD_RUN ? "0.0.0.0" : undefined

  try {
    const server = build()
    const address = await server.listen({ port, host })
    console.log(`Listening on ${address}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = build

if (require.main === module) {
  start()
}
```

### Add a Dockerfile

You can add any valid `Dockerfile` that packages and runs a Node app. A basic
`Dockerfile` can be found in the official [gcloud
docs](https://github.com/knative/docs/blob/2d654d1fd6311750cc57187a86253c52f273d924/docs/serving/samples/hello-world/helloworld-nodejs/Dockerfile).

```Dockerfile
# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:10

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm i --production

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "start" ]
```

### Add a .dockerignore

To keep build artifacts out of your container (which keeps it small and improves
build times) add a `.dockerignore` file like the one below:

```dockerignore
Dockerfile
README.md
node_modules
npm-debug.log
```

### Submit build

Next, submit your app to be built into a Docker image by running the following
command (replacing `PROJECT-ID` and `APP-NAME` with your GCP project id and an
app name):

```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/APP-NAME
```

### Deploy Image

After your image has built, you can deploy it with the following command:

```bash
gcloud beta run deploy --image gcr.io/PROJECT-ID/APP-NAME --platform managed
```

Your app will be accessible from the URL GCP provides.

## netlify-lambda

First, please perform all preparation steps related to **AWS Lambda**.

Create a folder called `functions`, then create `server.js` (and your endpoint
path will be `server.js`) inside the `functions` folder.

### functions/server.js

```js
export { handler } from '../lambda.js'; // Change `lambda.js` path to your `lambda.js` path
```

### netlify.toml

```toml
[build]
  # This will be run the site build
  command = "npm run build:functions"
  # This is the directory is publishing to netlify's CDN
  # and this is directory of your front of your app
  # publish = "build"
  # functions build directory
  functions = "functions-build" # always appends `-build` folder to your `functions` folder for builds
```

### webpack.config.netlify.js

**Do not forget to add this Webpack config, or else problems may occur**

```js
const nodeExternals = require('webpack-node-externals');
const dotenv = require('dotenv-safe');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'production';
const dev = env === 'development';

if (dev) {
  dotenv.config({ allowEmptyValues: true });
}

module.exports = {
  mode: env,
  devtool: dev ? 'eval-source-map' : 'none',
  externals: [nodeExternals()],
  devServer: {
    proxy: {
      '/.netlify': {
        target: 'http://localhost:9000',
        pathRewrite: { '^/.netlify/functions': '' }
      }
    }
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_ROOT_PATH': JSON.stringify('/'),
      'process.env.NETLIFY_ENV': true,
      'process.env.CONTEXT': env
    })
  ]
};
```

### Scripts

Add this command to your `package.json` *scripts*

```json
"scripts": {
  ...
  "build:functions": "netlify-lambda build functions --config ./webpack.config.netlify.js"
  ...
}
```

Then it should work fine.

## Vercel

[Vercel](https://vercel.com) fully supports deploying Fastify applications.
Additionally, with Vercel's
[Fluid compute](https://vercel.com/docs/functions/fluid-compute), you can combine
server-like concurrency with the autoscaling properties of traditional
serverless functions.

Get started with the
[Fastify Node.js template on Vercel](
https://vercel.com/templates/other/fastify-serverless-function).

[Fluid compute](https://vercel.com/docs/functions/fluid-compute) currently
requires an explicit opt-in. Learn more about enabling Fluid compute
[here](
https://vercel.com/docs/functions/fluid-compute#how-to-enable-fluid-compute).
````

## Source: https://fastify.dev/docs/latest/Guides/Style-Guide
````markdown
# Fastify Style Guide

## Welcome

Welcome to *Fastify Style Guide*. This guide is here to provide you with a
conventional writing style for users writing developer documentation on our Open
Source framework. Each topic is precise and well explained to help you write
documentation users can easily understand and implement.

## Who is this guide for?

This guide is for anyone who loves to build with Fastify or wants to contribute
to our documentation. You do not need to be an expert in writing technical
documentation. This guide is here to help you.

Visit the [contribute](https://fastify.dev/contribute) page on our website or
read the
[CONTRIBUTING.md](https://github.com/fastify/fastify/blob/main/CONTRIBUTING.md)
file on GitHub to join our Open Source folks.

## Before you write

You need to know the following:

* JavaScript
* Node.js
* Git
* GitHub
* Markdown
* HTTP
* NPM

### Consider your Audience

Before you start writing, think about your audience. In this case, your audience
should already know HTTP, JavaScript, NPM, and Node.js. It is necessary to keep
your readers in mind because they are the ones consuming your content. You want
to give as much useful information as possible. Consider the vital things they
need to know and how they can understand them. Use words and references that
readers can relate to easily. Ask for feedback from the community, it can help
you write better documentation that focuses on the user and what you want to
achieve.

### Get straight to the point

Give your readers a clear and precise action to take. Start with what is most
important. This way, you can help them find what they need faster. Mostly,
readers tend to read the first content on a page, and many will not scroll
further.

**Example**

Less like this: Colons are very important to register a parametric path. It lets
the framework know there is a new parameter created. You can place the colon
before the parameter name so the parametric path can be created.

More Like this: To register a parametric path, put a colon before the parameter
name. Using a colon lets the framework know it is a parametric path and not a
static path.

### Avoid adding video or image content


Do not add videos or screenshots to the documentation. It is easier to keep
under version control. Videos and images will eventually end up becoming
outdated as new updates keep developing. Instead, make a referral link or a
YouTube video. You can add links by using `[Title](www.websitename.com)` in the
markdown.

**Example**

```
To learn more about hooks, see [Fastify hooks](https://fastify.dev/docs/latest/Reference/Hooks/).
```

Result:
>To learn more about hooks, see [Fastify
>hooks](https://fastify.dev/docs/latest/Reference/Hooks/).



### Avoid plagiarism

Make sure you avoid copying other people's work. Keep it as original as
possible. You can learn from what they have done and reference where it is from
if you use a particular quote from their work.


## Word Choice

There are a few things you need to use and avoid when writing your documentation
to improve readability for readers and make documentation neat, direct, and
clean.


### When to use the second person "you" as the pronoun

When writing articles or guides, your content should communicate directly to
readers in the second person ("you") addressed form. It is easier to give them
direct instruction on what to do on a particular topic. To see an example, visit
the [Plugins Guide](./Plugins-Guide.md).

**Example**

Less like this: we can use the following plugins.

More like this: You can use the following plugins.

> According to [Wikipedia](#), ***You*** is usually a second person pronoun.
> Also, used to refer to an indeterminate person, as a more common alternative
> to a very formal indefinite pronoun.

## When to avoid the second person "you" as the pronoun

One of the main rules of formal writing such as reference documentation, or API
documentation, is to avoid the second person ("you") or directly addressing the
reader.

**Example**

Less like this: You can use the following recommendation as an example.

More like this: As an example, the following recommendations should be
referenced.

To view a live example, refer to the [Decorators](../Reference/Decorators.md)
reference document.


### Avoid using contractions

Contractions are the shortened version of written and spoken forms of a word,
i.e. using "don't" instead of "do not". Avoid contractions to provide a more
formal tone.

### Avoid using condescending terms

Condescending terms are words that include:

* Just
* Easy
* Simply
* Basically
* Obviously

The reader may not find it easy to use Fastify's framework and plugins; avoid
words that make it sound simple, easy, offensive, or insensitive. Not everyone
who reads the documentation has the same level of understanding.


### Starting with a verb

Mostly start your description with a verb, which makes it simple and precise for
the reader to follow. Prefer using present tense because it is easier to read
and understand than the past or future tense.

**Example**

 Less like this: There is a need for Node.js to be installed before you can be
 able to use Fastify.

 More like this: Install Node.js to make use of Fastify.

### Grammatical moods

Grammatical moods are a great way to express your writing. Avoid sounding too
bossy while making a direct statement. Know when to switch between indicative,
imperative, and subjunctive moods.


**Indicative** - Use when making a factual statement or question.

Example: Since there is no testing framework available, "Fastify recommends ways
to write tests".

**Imperative** - Use when giving instructions, actions, commands, or when you
write your headings.

Example: Install dependencies before starting development.


**Subjunctive** -  Use when making suggestions, hypotheses, or non-factual
statements.

Example: Reading the documentation on our website is recommended to get
comprehensive knowledge of the framework.

### Use **active** voice instead of **passive**

Using active voice is a more compact and direct way of conveying your
documentation.

**Example**


Passive: The node dependencies and packages are installed by npm.

Active:  npm installs packages and node dependencies.

## Writing Style

### Documentation titles

When creating a new guide, API, or reference in the `/docs/` directory, use
short titles that best describe the topic of your documentation. Name your files
in kebab-cases and avoid Raw or camelCase. To learn more about kebab-case you
can visit this medium article on [Case
Styles](https://medium.com/better-programming/string-case-styles-camel-pascal-snake-and-kebab-case-981407998841).

**Examples**:

>`hook-and-plugins.md`,

 `adding-test-plugins.md`,

 `removing-requests.md`.

### Hyperlinks

Hyperlinks should have a clear title of what they reference. Here is how your
hyperlink should look:

```MD
<!-- More like this -->

// Add clear & brief description
[Fastify Plugins] (https://fastify.dev/docs/latest/Plugins/)

<!--Less like this -->

// incomplete description
[Fastify] (https://fastify.dev/docs/latest/Plugins/)

// Adding title in link brackets
[](https://fastify.dev/docs/latest/Plugins/ "fastify plugin")

// Empty title
[](https://fastify.dev/docs/latest/Plugins/)

// Adding links localhost URLs instead of using code strings (``)
[http://localhost:3000/](http://localhost:3000/)

```

Include in your documentation as many essential references as possible, but
avoid having numerous links when writing for beginners to avoid distractions.
````

## Source: https://fastify.dev/docs/latest/Guides/Testing
````markdown
<h1 style="text-align: center;">Fastify</h1>

# Testing
<a id="testing"></a>

Testing is one of the most important parts of developing an application. Fastify
is very flexible when it comes to testing and is compatible with most testing
frameworks (such as [Node Test Runner](https://nodejs.org/api/test.html),
which is used in the examples below).

## Application

Let's `cd` into a fresh directory called 'testing-example' and type `npm init
-y` in our terminal.

Run `npm i fastify && npm i pino-pretty -D`

### Separating concerns makes testing easy

First, we are going to separate our application code from our server code:

**app.js**:

```js
'use strict'

const fastify = require('fastify')

function build(opts={}) {
  const app = fastify(opts)
  app.get('/', async function (request, reply) {
    return { hello: 'world' }
  })

  return app
}

module.exports = build
```

**server.js**:

```js
'use strict'

const server = require('./app')({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
})

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
```

### Benefits of using fastify.inject()

Fastify comes with built-in support for fake HTTP injection thanks to
[`light-my-request`](https://github.com/fastify/light-my-request).

Before introducing any tests, we will use the `.inject` method to make a fake
request to our route:

**app.test.js**:

```js
'use strict'

const build = require('./app')

const test = async () => {
  const app = build()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  console.log('status code: ', response.statusCode)
  console.log('body: ', response.body)
}
test()
```

First, our code will run inside an asynchronous function, giving us access to
async/await.

`.inject` ensures all registered plugins have booted up and our application is
ready to test. Finally, we pass the request method we want to use and a route.
Using await we can store the response without a callback.



Run the test file in your terminal `node app.test.js`

```sh
status code:  200
body:  {"hello":"world"}
```



### Testing with HTTP injection

Now we can replace our `console.log` calls with actual tests!

In your `package.json` change the "test" script to:

`"test": "node --test --watch"`

**app.test.js**:

```js
'use strict'

const { test } = require('node:test')
const build = require('./app')

test('requests the "/" route', async t => {
  t.plan(1)
  const app = build()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })
  t.assert.strictEqual(response.statusCode, 200, 'returns a status code of 200')
})
```

Finally, run `npm test` in the terminal and see your test results!

The `inject` method can do much more than a simple GET request to a URL:
```js
fastify.inject({
  method: String,
  url: String,
  query: Object,
  payload: Object,
  headers: Object,
  cookies: Object
}, (error, response) => {
  // your tests
})
```

`.inject` methods can also be chained by omitting the callback function:

```js
fastify
  .inject()
  .get('/')
  .headers({ foo: 'bar' })
  .query({ foo: 'bar' })
  .end((err, res) => { // the .end call will trigger the request
    console.log(res.payload)
  })
```

or in the promisified version

```js
fastify
  .inject({
    method: String,
    url: String,
    query: Object,
    payload: Object,
    headers: Object,
    cookies: Object
  })
  .then(response => {
    // your tests
  })
  .catch(err => {
    // handle error
  })
```

Async await is supported as well!
```js
try {
  const res = await fastify.inject({ method: String, url: String, payload: Object, headers: Object })
  // your tests
} catch (err) {
  // handle error
}
```

#### Another Example:

**app.js**
```js
const Fastify = require('fastify')

function buildFastify () {
  const fastify = Fastify()

  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })

  return fastify
}

module.exports = buildFastify
```

**test.js**
```js
const { test } = require('node:test')
const buildFastify = require('./app')

test('GET `/` route', t => {
  t.plan(4)

  const fastify = buildFastify()

  // At the end of your tests it is highly recommended to call `.close()`
  // to ensure that all connections to external services get closed.
  t.after(() => fastify.close())

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, response) => {
    t.assert.ifError(err)
    t.assert.strictEqual(response.statusCode, 200)
    t.assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8')
    t.assert.deepStrictEqual(response.json(), { hello: 'world' })
  })
})
```

### Testing with a running server
Fastify can also be tested after starting the server with `fastify.listen()` or
after initializing routes and plugins with `fastify.ready()`.

#### Example:

Uses **app.js** from the previous example.

**test-listen.js** (testing with [`undici`](https://www.npmjs.com/package/undici))
```js
const { test } = require('node:test')
const { Client } = require('undici')
const buildFastify = require('./app')

test('should work with undici', async t => {
  t.plan(2)

  const fastify = buildFastify()

  await fastify.listen()

   const client = new Client(
    'http://localhost:' + fastify.server.address().port, {
      keepAliveTimeout: 10,
      keepAliveMaxTimeout: 10
    }
  )

  t.after(() => {
    fastify.close()
    client.close()
  })

  const response = await client.request({ method: 'GET', path: '/' })

  t.assert.strictEqual(await response.body.text(), '{"hello":"world"}')
  t.assert.strictEqual(response.statusCode, 200)
})
```

Alternatively, starting with Node.js 18,
[`fetch`](https://nodejs.org/docs/latest-v18.x/api/globals.html#fetch)
may be used without requiring any extra dependencies:

**test-listen.js**
```js
const { test } = require('node:test')
const buildFastify = require('./app')

test('should work with fetch', async t => {
  t.plan(3)

  const fastify = buildFastify()

  t.after(() => fastify.close())

  await fastify.listen()

  const response = await fetch(
    'http://localhost:' + fastify.server.address().port
  )

  t.assert.strictEqual(response.status, 200)
  t.assert.strictEqual(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )
  const jsonResult = await response.json()
  t.assert.strictEqual(jsonResult.hello, 'world')
})
```

**test-ready.js** (testing with
[`SuperTest`](https://www.npmjs.com/package/supertest))
```js
const { test } = require('node:test')
const supertest = require('supertest')
const buildFastify = require('./app')

test('GET `/` route', async (t) => {
  const fastify = buildFastify()

  t.after(() => fastify.close())

  await fastify.ready()

  const response = await supertest(fastify.server)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
  t.assert.deepStrictEqual(response.body, { hello: 'world' })
})
```

### How to inspect node tests
1. Isolate your test by passing the `{only: true}` option
```javascript
test('should ...', {only: true}, t => ...)
```
2. Run `node --test`
```bash
> node --test --test-only --inspect-brk test/<test-file.test.js>
```
- `--test-only` specifies to run tests with the `only` option enabled
- `--inspect-brk` will launch the node debugger
3. In VS Code, create and launch a `Node.js: Attach` debug configuration. No
   modification should be necessary.

Now you should be able to step through your test file (and the rest of
`Fastify`) in your code editor.



## Plugins
Let's `cd` into a fresh directory called 'testing-plugin-example' and type `npm init
-y` in our terminal.

Run `npm i fastify fastify-plugin`

**plugin/myFirstPlugin.js**:

```js
const fP = require("fastify-plugin")

async function myPlugin(fastify, options) {
    fastify.decorateRequest("helloRequest", "Hello World")
    fastify.decorate("helloInstance", "Hello Fastify Instance")
}

module.exports = fP(myPlugin)
```

A basic example of a Plugin. See [Plugin Guide](./Plugins-Guide.md)

**test/myFirstPlugin.test.js**:

```js
const Fastify = require("fastify");
const { test } = require("node:test");
const myPlugin = require("../plugin/myFirstPlugin");

test("Test the Plugin Route", async t => {
    // Create a mock fastify application to test the plugin
    const fastify = Fastify()

    fastify.register(myPlugin)

    // Add an endpoint of your choice
    fastify.get("/", async (request, reply) => {
        return ({ message: request.helloRequest })
    })

    // Use fastify.inject to fake a HTTP Request
    const fastifyResponse = await fastify.inject({
        method: "GET",
        url: "/"
    })

  console.log('status code: ', fastifyResponse.statusCode)
  console.log('body: ', fastifyResponse.body)
})
```
Learn more about [```fastify.inject()```](#benefits-of-using-fastifyinject).
Run the test file in your terminal `node test/myFirstPlugin.test.js`

```sh
status code:  200
body:  {"message":"Hello World"}
```

Now we can replace our `console.log` calls with actual tests!

In your `package.json` change the "test" script to:

`"test": "node --test --watch"`

Create the test for the endpoint.

**test/myFirstPlugin.test.js**:

```js
const Fastify = require("fastify");
const { test } = require("node:test");
const myPlugin = require("../plugin/myFirstPlugin");

test("Test the Plugin Route", async t => {
    // Specifies the number of test
    t.plan(2)

    const fastify = Fastify()

    fastify.register(myPlugin)

    fastify.get("/", async (request, reply) => {
        return ({ message: request.helloRequest })
    })

    const fastifyResponse = await fastify.inject({
        method: "GET",
        url: "/"
    })

    t.assert.strictEqual(fastifyResponse.statusCode, 200)
    t.assert.deepStrictEqual(JSON.parse(fastifyResponse.body), { message: "Hello World" })
})
```

Finally, run `npm test` in the terminal and see your test results!

Test the ```.decorate()``` and ```.decorateRequest()```.

**test/myFirstPlugin.test.js**:

```js
const Fastify = require("fastify");
const { test }= require("node:test");
const myPlugin = require("../plugin/myFirstPlugin");

test("Test the Plugin Route", async t => {
    t.plan(5)
    const fastify = Fastify()

    fastify.register(myPlugin)

    fastify.get("/", async (request, reply) => {
        // Testing the fastify decorators
        t.assert.ifError(request.helloRequest)
        t.assert.ok(request.helloRequest, "Hello World")
        t.assert.ok(fastify.helloInstance, "Hello Fastify Instance")
        return ({ message: request.helloRequest })
    })

    const fastifyResponse = await fastify.inject({
        method: "GET",
        url: "/"
    })
    t.assert.strictEqual(fastifyResponse.statusCode, 200)
    t.assert.deepStrictEqual(JSON.parse(fastifyResponse.body), { message: "Hello World" })
})
```
````

## Source: https://fastify.dev/docs/latest/Guides/Write-Plugin
````markdown
<h1 style="text-align: center;">Fastify</h1>

# How to write a good plugin
First, thank you for deciding to write a plugin for Fastify. Fastify is a
minimal framework and plugins are its strength, so thank you.

The core principles of Fastify are performance, low overhead, and providing a
good experience to our users. When writing a plugin, it is important to keep
these principles in mind. Therefore, in this document, we will analyze what
characterizes a quality plugin.

*Need some inspiration? You can use the label ["plugin
suggestion"](https://github.com/fastify/fastify/issues?q=is%3Aissue+is%3Aopen+label%3A%22plugin+suggestion%22)
in our issue tracker!*

## Code
Fastify uses different techniques to optimize its code, many of which are
documented in our Guides. We highly recommend you read [the hitchhiker's guide
to plugins](./Plugins-Guide.md) to discover all the APIs you can use to build
your plugin and learn how to use them.

Do you have a question or need some advice? We are more than happy to help you!
Just open an issue in our [help repository](https://github.com/fastify/help).

Once you submit a plugin to our [ecosystem list](./Ecosystem.md), we will review
your code and help you improve it if necessary.

## Documentation
Documentation is extremely important. If your plugin is not well documented we
will not accept it to the ecosystem list. Lack of quality documentation makes it
more difficult for people to use your plugin, and will likely result in it going
unused.

If you want to see some good examples of how to document a plugin take a look
at:
- [`@fastify/caching`](https://github.com/fastify/fastify-caching)
- [`@fastify/compress`](https://github.com/fastify/fastify-compress)
- [`@fastify/cookie`](https://github.com/fastify/fastify-cookie)
- [`@fastify/under-pressure`](https://github.com/fastify/under-pressure)
- [`@fastify/view`](https://github.com/fastify/point-of-view)

## License
You can license your plugin as you prefer, we do not enforce any kind of
license.

We prefer the [MIT license](https://choosealicense.com/licenses/mit/) because we
think it allows more people to use the code freely. For a list of alternative
licenses see the [OSI list](https://opensource.org/licenses) or GitHub's
[choosealicense.com](https://choosealicense.com/).

## Examples
Always put an example file in your repository. Examples are very helpful for
users and give a very fast way to test your plugin. Your users will be grateful.

## Test
A plugin **must** be thoroughly tested to verify that is working properly.

A plugin without tests will not be accepted to the ecosystem list. A lack of
tests does not inspire trust nor guarantee that the code will continue to work
among different versions of its dependencies.

We do not enforce any testing library. We use [`node:test`](https://nodejs.org/api/test.html)
since it offers out-of-the-box parallel testing and code coverage, but it is up
to you to choose your library of preference.
We highly recommend you read the [Plugin Testing](./Testing.md#plugins) to
learn about how to test your plugins.

## Code Linter
It is not mandatory, but we highly recommend you use a code linter in your
plugin. It will ensure a consistent code style and help you to avoid many
errors.

We use [`standard`](https://standardjs.com/) since it works without the need to
configure it and is very easy to integrate into a test suite.

## Continuous Integration
It is not mandatory, but if you release your code as open source, it helps to
use Continuous Integration to ensure contributions do not break your plugin and
to show that the plugin works as intended. Both
[CircleCI](https://circleci.com/) and [GitHub
Actions](https://github.com/features/actions) are free for open source projects
and easy to set up.

In addition, you can enable services like [Dependabot](https://github.com/dependabot),
which will help you keep your dependencies up to date and discover if a new
release of Fastify has some issues with your plugin.

## Let's start!
Awesome, now you know everything you need to know about how to write a good
plugin for Fastify! After you have built one (or more!) let us know! We will add
it to the [ecosystem](https://github.com/fastify/fastify#ecosystem) section of
our documentation!

If you want to see some real world examples, check out:
- [`@fastify/view`](https://github.com/fastify/point-of-view) Templates
  rendering (*ejs, pug, handlebars, marko*) plugin support for Fastify.
- [`@fastify/mongodb`](https://github.com/fastify/fastify-mongodb) Fastify
  MongoDB connection plugin, with this you can share the same MongoDB connection
  pool in every part of your server.
- [`@fastify/multipart`](https://github.com/fastify/fastify-multipart) Multipart
  support for Fastify.
- [`@fastify/helmet`](https://github.com/fastify/fastify-helmet) Important
  security headers for Fastify.
````

## Source: https://fastify.dev/docs/latest/Guides/Write-Type-Provider
````markdown
<h1 align="center">Fastify</h1>

## How to write your own type provider

Things to keep in mind when implementing a custom [type provider](../Reference/Type-Providers.md):

### Type Contravariance

Whereas exhaustive type narrowing checks normally rely on `never` to represent
an unreachable state, reduction in type provider interfaces should only be done
up to `unknown`.

The reasoning is that certain methods of `FastifyInstance` are
contravariant on `TypeProvider`, which can lead to TypeScript surfacing
assignability issues unless the custom type provider interface is
substitutable with `FastifyTypeProviderDefault`.

For example, `FastifyTypeProviderDefault` will not be assignable to the following:
```ts
export interface NotSubstitutableTypeProvider extends FastifyTypeProvider {
   // bad, nothing is assignable to `never` (except for itself)
  validator: this['schema'] extends /** custom check here**/ ? /** narrowed type here **/ : never;
  serializer: this['schema'] extends /** custom check here**/ ? /** narrowed type here **/ : never;
}
```

Unless changed to:
```ts
export interface SubstitutableTypeProvider extends FastifyTypeProvider {
  // good, anything can be assigned to `unknown`
  validator: this['schema'] extends /** custom check here**/ ? /** narrowed type here **/ : unknown;
  serializer: this['schema'] extends /** custom check here**/ ? /** narrowed type here **/ : unknown;
}
```
````

## Source: https://fastify.dev/docs/latest/Reference/ContentTypeParser
````markdown
<h1 align="center">Fastify</h1>

## `Content-Type` Parser
Fastify natively supports `'application/json'` and `'text/plain'` content types
with a default charset of `utf-8`. These default parsers can be changed or
removed.

Unsupported content types will throw an `FST_ERR_CTP_INVALID_MEDIA_TYPE` error.

To support other content types, use the `addContentTypeParser` API or an
existing [plugin](https://fastify.dev/ecosystem/).

As with other APIs, `addContentTypeParser` is encapsulated in the scope in which
it is declared. If declared in the root scope, it is available everywhere; if
declared in a plugin, it is available only in that scope and its children.

Fastify automatically adds the parsed request payload to the [Fastify
request](./Request.md) object, accessible via `request.body`.

Note that for `GET` and `HEAD` requests, the payload is never parsed. For
`OPTIONS` and `DELETE` requests, the payload is parsed only if a valid
`content-type` header is provided. Unlike `POST`, `PUT`, and `PATCH`, the
[catch-all](#catch-all) parser is not executed, and the payload is simply not
parsed.

> ⚠ Warning:
> When using regular expressions to detect `Content-Type`, it is important to
> ensure proper detection. For example, to match `application/*`, use
> `/^application\/([\w-]+);?/` to match the
> [essence MIME type](https://mimesniff.spec.whatwg.org/#mime-type-miscellaneous)
> only.

### Usage
```js
fastify.addContentTypeParser('application/jsoff', function (request, payload, done) {
  jsoffParser(payload, function (err, body) {
    done(err, body)
  })
})

// Handle multiple content types with the same function
fastify.addContentTypeParser(['text/xml', 'application/xml'], function (request, payload, done) {
  xmlParser(payload, function (err, body) {
    done(err, body)
  })
})

// Async is also supported in Node versions >= 8.0.0
fastify.addContentTypeParser('application/jsoff', async function (request, payload) {
  const res = await jsoffParserAsync(payload)

  return res
})

// Handle all content types that matches RegExp
fastify.addContentTypeParser(/^image\/([\w-]+);?/, function (request, payload, done) {
  imageParser(payload, function (err, body) {
    done(err, body)
  })
})

// Can use default JSON/Text parser for different content Types
fastify.addContentTypeParser('text/json', { parseAs: 'string' }, fastify.getDefaultJsonParser('ignore', 'ignore'))
```

Fastify first tries to match a content-type parser with a `string` value before
trying to find a matching `RegExp`. For overlapping content types, it starts
with the last one configured and ends with the first (last in, first out).
To specify a general content type more precisely, first specify the general
type, then the specific one, as shown below.

```js
// Here only the second content type parser is called because its value also matches the first one
fastify.addContentTypeParser('application/vnd.custom+xml', (request, body, done) => {} )
fastify.addContentTypeParser('application/vnd.custom', (request, body, done) => {} )

// Here the desired behavior is achieved because fastify first tries to match the
// `application/vnd.custom+xml` content type parser
fastify.addContentTypeParser('application/vnd.custom', (request, body, done) => {} )
fastify.addContentTypeParser('application/vnd.custom+xml', (request, body, done) => {} )
```

### Using addContentTypeParser with fastify.register
When using `addContentTypeParser` with `fastify.register`, avoid `await`
when registering routes. Using `await` makes route registration asynchronous,
potentially registering routes before `addContentTypeParser` is set.

#### Correct Usage
```js
const fastify = require('fastify')();


fastify.register((fastify, opts) => {
  fastify.addContentTypeParser('application/json', function (request, payload, done) {
    jsonParser(payload, function (err, body) {
      done(err, body)
    })
  })

  fastify.get('/hello', async (req, res) => {});
});
```

In addition to `addContentTypeParser`, the `hasContentTypeParser`,
`removeContentTypeParser`, and `removeAllContentTypeParsers` APIs are available.

#### hasContentTypeParser

Use the `hasContentTypeParser` API to check if a specific content type parser
exists.

```js
if (!fastify.hasContentTypeParser('application/jsoff')){
  fastify.addContentTypeParser('application/jsoff', function (request, payload, done) {
    jsoffParser(payload, function (err, body) {
      done(err, body)
    })
  })
}
```

#### removeContentTypeParser

`removeContentTypeParser` can remove a single content type or an array of
content types, supporting both `string` and `RegExp`.

```js
fastify.addContentTypeParser('text/xml', function (request, payload, done) {
  xmlParser(payload, function (err, body) {
    done(err, body)
  })
})

// Removes the both built-in content type parsers so that only the content type parser for text/html is available
fastify.removeContentTypeParser(['application/json', 'text/plain'])
```

#### removeAllContentTypeParsers
The `removeAllContentTypeParsers` API removes all existing content type parsers
eliminating the need to specify each one individually. This API supports
encapsulation and is useful for registering a
[catch-all content type parser](#catch-all) that should be executed for every
content type, ignoring built-in parsers.

```js
fastify.removeAllContentTypeParsers()

fastify.addContentTypeParser('text/xml', function (request, payload, done) {
  xmlParser(payload, function (err, body) {
    done(err, body)
  })
})
```

> ℹ️ Note: `function(req, done)` and `async function(req)` are
> still supported but deprecated.

#### Body Parser
The request body can be parsed in two ways. First, add a custom content type
parser and handle the request stream. Or second, use the `parseAs` option in the
`addContentTypeParser` API, specifying `'string'` or `'buffer'`. Fastify will
handle the stream, check the [maximum size](./Server.md#factory-body-limit) of
the body, and the content length. If the limit is exceeded, the custom parser
will not be invoked.
```js
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
  try {
    const json = JSON.parse(body)
    done(null, json)
  } catch (err) {
    err.statusCode = 400
    done(err, undefined)
  }
})
```

See
[`example/parser.js`](https://github.com/fastify/fastify/blob/main/examples/parser.js)
for an example.

##### Custom Parser Options
+ `parseAs` (string): `'string'` or `'buffer'` to designate how the incoming
  data should be collected. Default: `'buffer'`.
+ `bodyLimit` (number): The maximum payload size, in bytes, that the custom
  parser will accept. Defaults to the global body limit passed to the [`Fastify
  factory function`](./Server.md#bodylimit).

#### Catch-All
To catch all requests regardless of content type, use the `'*'` content type:
```js
fastify.addContentTypeParser('*', function (request, payload, done) {
  let data = ''
  payload.on('data', chunk => { data += chunk })
  payload.on('end', () => {
    done(null, data)
  })
})
```
All requests without a corresponding content type parser will be handled by
this function.

This is also useful for piping the request stream. Define a content parser like:

```js
fastify.addContentTypeParser('*', function (request, payload, done) {
  done()
})
```

And then access the core HTTP request directly for piping:

```js
app.post('/hello', (request, reply) => {
  reply.send(request.raw)
})
```

Here is a complete example that logs incoming [json
line](https://jsonlines.org/) objects:

```js
const split2 = require('split2')
const pump = require('pump')

fastify.addContentTypeParser('*', (request, payload, done) => {
  done(null, pump(payload, split2(JSON.parse)))
})

fastify.route({
  method: 'POST',
  url: '/api/log/jsons',
  handler: (req, res) => {
    req.body.on('data', d => console.log(d)) // log every incoming object
  }
})
 ```

For piping file uploads, check out
[`@fastify/multipart`](https://github.com/fastify/fastify-multipart).

To execute the content type parser on all content types, call
`removeAllContentTypeParsers` first.

```js
// Without this call, the request body with the content type application/json would be processed by the built-in JSON parser
fastify.removeAllContentTypeParsers()

fastify.addContentTypeParser('*', function (request, payload, done) {
  const data = ''
  payload.on('data', chunk => { data += chunk })
  payload.on('end', () => {
    done(null, data)
  })
})
```
````

## Source: https://fastify.dev/docs/latest/Reference/Decorators
````markdown
<h1 align="center">Fastify</h1>

## Decorators

The decorators API customizes core Fastify objects, such as the server instance
and any request and reply objects used during the HTTP request lifecycle. It
can attach any type of property to core objects, e.g., functions, plain
objects, or native types.

This API is *synchronous*. Defining a decoration asynchronously could result in
the Fastify instance booting before the decoration completes. To register an
asynchronous decoration, use the `register` API with `fastify-plugin`. See the
[Plugins](./Plugins.md) documentation for more details.

Decorating core objects with this API allows the underlying JavaScript engine to
optimize the handling of server, request, and reply objects. This is
accomplished by defining the shape of all such object instances before they are
instantiated and used. As an example, the following is not recommended because
it will change the shape of objects during their lifecycle:

```js
// Bad example! Continue reading.

// Attach a user property to the incoming request before the request
// handler is invoked.
fastify.addHook('preHandler', function (req, reply, done) {
  req.user = 'Bob Dylan'
  done()
})

// Use the attached user property in the request handler.
fastify.get('/', function (req, reply) {
  reply.send(`Hello, ${req.user}`)
})
```

The above example mutates the request object after instantiation, causing the
JavaScript engine to deoptimize access. Using the decoration API avoids this
deoptimization:

```js
// Decorate request with a 'user' property
fastify.decorateRequest('user', '')

// Update our property
fastify.addHook('preHandler', (req, reply, done) => {
  req.user = 'Bob Dylan'
  done()
})
// And finally access it
fastify.get('/', (req, reply) => {
  reply.send(`Hello, ${req.user}!`)
})
```

Keep the initial shape of a decorated field close to its future dynamic value.
Initialize a decorator as `''` for strings and `null` for objects or functions.
This works only with value types; reference types will throw an error during
Fastify startup. See [decorateRequest](#decorate-request) and
[JavaScript engine fundamentals: Shapes
and Inline Caches](https://mathiasbynens.be/notes/shapes-ics)
for more information.

### Usage
<a id="usage"></a>

#### `decorate(name, value, [dependencies])`
<a id="decorate"></a>

This method customizes the Fastify [server](./Server.md) instance.

For example, to attach a new method to the server instance:

```js
fastify.decorate('utility', function () {
  // Something very useful
})
```

Non-function values can also be attached to the server instance:

```js
fastify.decorate('conf', {
  db: 'some.db',
  port: 3000
})
```

To access decorated properties, use the name provided to the decoration API:

```js
fastify.utility()

console.log(fastify.conf.db)
```

The decorated [Fastify server](./Server.md) is bound to `this` in
[route](./Routes.md) handlers:

```js
fastify.decorate('db', new DbConnection())

fastify.get('/', async function (request, reply) {
  // using return
  return { hello: await this.db.query('world') }

  // or
  // using reply.send()
  reply.send({ hello: await this.db.query('world') })
  await reply
})
```

The `dependencies` parameter is an optional list of decorators that the
decorator being defined relies upon. This list contains the names of other
decorators. In the following example, the "utility" decorator depends on the
"greet" and "hi" decorators:

```js
async function greetDecorator (fastify, opts) {
  fastify.decorate('greet', () => {
    return 'greet message'
  })
}

async function hiDecorator (fastify, opts) {
  fastify.decorate('hi', () => {
    return 'hi message'
  })
}

async function utilityDecorator (fastify, opts) {
  fastify.decorate('utility', () => {
    return `${fastify.greet()} | ${fastify.hi()}`
  })
}

fastify.register(fastifyPlugin(greetDecorator, { name: 'greet' }))
fastify.register(fastifyPlugin(hiDecorator, { name: 'hi' }))
fastify.register(fastifyPlugin(utilityDecorator, { dependencies: ['greet', 'hi'] }))

fastify.get('/', function (req, reply) {
  // Response: {"hello":"greet message | hi message"}
  reply.send({ hello: fastify.utility() })
})

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})
```

Using an arrow function breaks the binding of `this` to
the `FastifyInstance`.

If a dependency is not satisfied, the `decorate` method throws an exception.
The dependency check occurs before the server instance boots, not during
runtime.

#### `decorateReply(name, value, [dependencies])`
<a id="decorate-reply"></a>

This API adds new methods/properties to the core `Reply` object:

```js
fastify.decorateReply('utility', function () {
  // Something very useful
})
```

Using an arrow function will break the binding of `this` to the Fastify
`Reply` instance.

Using `decorateReply` will throw and error if used with a reference type:

```js
// Don't do this
fastify.decorateReply('foo', { bar: 'fizz'})
```
In this example, the object reference would be shared with all requests, and
**any mutation will impact all requests, potentially creating security
vulnerabilities or memory leaks**. Fastify blocks this.

To achieve proper encapsulation across requests configure a new value for each
incoming request in the [`'onRequest'` hook](./Hooks.md#onrequest).

```js
const fp = require('fastify-plugin')

async function myPlugin (app) {
  app.decorateReply('foo')
  app.addHook('onRequest', async (req, reply) => {
    reply.foo = { bar: 42 }
  })
}

module.exports = fp(myPlugin)
```

See [`decorate`](#decorate) for information about the `dependencies` parameter.

#### `decorateRequest(name, value, [dependencies])`
<a id="decorate-request"></a>

As with [`decorateReply`](#decorate-reply), this API adds new methods/properties
to the core `Request` object:

```js
fastify.decorateRequest('utility', function () {
  // something very useful
})
```

Using an arrow function will break the binding of `this` to the Fastify
`Request` instance.

Using `decorateRequest` will emit an error if used with a reference type:

```js
// Don't do this
fastify.decorateRequest('foo', { bar: 'fizz'})
```
In this example, the object reference would be shared with all requests, and
**any mutation will impact all requests, potentially creating security
vulnerabilities or memory leaks**. Fastify blocks this.

To achieve proper encapsulation across requests configure a new value for each
incoming request in the [`'onRequest'` hook](./Hooks.md#onrequest).

Example:

```js
const fp = require('fastify-plugin')

async function myPlugin (app) {
  app.decorateRequest('foo')
  app.addHook('onRequest', async (req, reply) => {
    req.foo = { bar: 42 }
  })
}

module.exports = fp(myPlugin)
```

The hook solution is more flexible and allows for more complex initialization
because more logic can be added to the `onRequest` hook.

Another approach is to use the getter/setter pattern, but it requires 2 decorators:

```js
fastify.decorateRequest('my_decorator_holder') // define the holder
fastify.decorateRequest('user', {
  getter () {
    this.my_decorator_holder ??= {} // initialize the holder
    return this.my_decorator_holder
  }
})

fastify.get('/', async function (req, reply) {
  req.user.access = 'granted'
  // other code
})
```

This ensures that the `user` property is always unique for each request.

See [`decorate`](#decorate) for information about the `dependencies` parameter.

#### `hasDecorator(name)`
<a id="has-decorator"></a>

Used to check for the existence of a server instance decoration:

```js
fastify.hasDecorator('utility')
```

#### hasRequestDecorator
<a id="has-request-decorator"></a>

Used to check for the existence of a Request decoration:

```js
fastify.hasRequestDecorator('utility')
```

#### hasReplyDecorator
<a id="has-reply-decorator"></a>

Used to check for the existence of a Reply decoration:

```js
fastify.hasReplyDecorator('utility')
```

### Decorators and Encapsulation
<a id="decorators-encapsulation"></a>

Defining a decorator (using `decorate`, `decorateRequest`, or `decorateReply`)
with the same name more than once in the same **encapsulated** context will
throw an exception. For example, the following will throw:

```js
const server = require('fastify')()

server.decorateReply('view', function (template, args) {
  // Amazing view rendering engine
})

server.get('/', (req, reply) => {
  reply.view('/index.html', { hello: 'world' })
})

// Somewhere else in our codebase, we define another
// view decorator. This throws.
server.decorateReply('view', function (template, args) {
  // Another rendering engine
})

server.listen({ port: 3000 })
```


But this will not:

```js
const server = require('fastify')()

server.decorateReply('view', function (template, args) {
  // Amazing view rendering engine.
})

server.register(async function (server, opts) {
  // We add a view decorator to the current encapsulated
  // plugin. This will not throw as outside of this encapsulated
  // plugin view is the old one, while inside it is the new one.
  server.decorateReply('view', function (template, args) {
    // Another rendering engine
  })

  server.get('/', (req, reply) => {
    reply.view('/index.page', { hello: 'world' })
  })
}, { prefix: '/bar' })

server.listen({ port: 3000 })
```

### Getters and Setters
<a id="getters-setters"></a>

Decorators accept special "getter/setter" objects with `getter` and optional
`setter` functions. This allows defining properties via decorators,
for example:

```js
fastify.decorate('foo', {
  getter () {
    return 'a getter'
  }
})
```

Will define the `foo` property on the Fastify instance:

```js
console.log(fastify.foo) // 'a getter'
```

### `getDecorator<T>` API

Fastify's `getDecorator<T>` API retrieves an existing decorator from the
Fastify instance, `Request`, or `Reply`. If the decorator is not defined, an
`FST_ERR_DEC_UNDECLARED` error is thrown.

#### Use cases

**Early Plugin Dependency Validation**

`getDecorator<T>` on Fastify instance verifies that required decorators are
available at registration time. 

For example:

```js
fastify.register(async function (fastify) {
  const usersRepository = fastify.getDecorator('usersRepository')

  fastify.get('/users', async function (request, reply) {
    // We are sure `usersRepository` exists at runtime
    return usersRepository.findAll()
  })
})
```

**Handling Missing Decorators**

Directly accessing a decorator may lead to unexpected behavior if it is not declared:

```ts
const user = request.user;
if (user && user.isAdmin) {
  // Execute admin tasks.
}
```

If `request.user` doesn't exist, then `user` will be set to `undefined`. 
This makes it unclear whether the user is unauthenticated or the decorator is missing.

Using `getDecorator` enforces runtime safety:

```ts
// If the decorator is missing, an explicit `FST_ERR_DEC_UNDECLARED` 
// error is thrown immediately.
const user = request.getDecorator('user');
if (user && user.isAdmin) {
  // Execute admin tasks.
}
```

**Alternative to Module Augmentation**

Decorators are typically typed via module augmentation:

```ts
declare module 'fastify' {
  interface FastifyInstance {
    usersRepository: IUsersRepository
  }
  interface FastifyRequest {
    session: ISession
  }
  interface FastifyReply {
    sendSuccess: SendSuccessFn
  }
}
```

This approach modifies the Fastify instance globally, which may lead to
conflicts and inconsistent behavior in multi-server setups or with plugin
encapsulation.

Using `getDecorator<T>` allows to limit types scope:

```ts
serverOne.register(async function (fastify) {
  const usersRepository = fastify.getDecorator<PostgreUsersRepository>(
    'usersRepository'
  )

  fastify.decorateRequest('session', null)
  fastify.addHook('onRequest', async (req, reply) => {
    // Yes, the request object has a setDecorator method. 
    // More information will be provided soon.
    req.setDecorator('session', { user: 'Jean' })
  })

  fastify.get('/me', (request, reply) => {
    const session = request.getDecorator<ISession>('session')
    reply.send(session)
  })
})

serverTwo.register(async function (fastify) {
  const usersRepository = fastify.getDecorator<SqlLiteUsersRepository>(
    'usersRepository'
  )

  fastify.decorateReply('sendSuccess', function (data) {
    return this.send({ success: true })
  })

  fastify.get('/success', async (request, reply) => {
    const sendSuccess = reply.getDecorator<SendSuccessFn>('sendSuccess')
    await sendSuccess()
  })
})
```

#### Bound functions inference

To save time, it's common to infer function types instead of 
writing them manually:

```ts
function sendSuccess (this: FastifyReply) {
  return this.send({ success: true })
}

export type SendSuccess = typeof sendSuccess
```

However, `getDecorator` returns functions with the `this` 
context already **bound**, meaning the `this` parameter disappears 
from the function signature.

To correctly type it, you should use `OmitThisParameter` utility:

```ts
function sendSuccess (this: FastifyReply) {
  return this.send({ success: true })
}

type BoundSendSuccess = OmitThisParameter<typeof sendSuccess>

fastify.decorateReply('sendSuccess', sendSuccess)
fastify.get('/success', async (request, reply) => {
  const sendSuccess = reply.getDecorator<BoundSendSuccess>('sendSuccess')
  await sendSuccess()
})
```

### `Request.setDecorator<T>` Method

The `setDecorator<T>` method provides a safe and convenient way to 
update the value of a `Request` decorator.  
If the decorator does not exist, a `FST_ERR_DEC_UNDECLARED` error 
is thrown.

#### Use Cases

**Runtime Safety**

A typical way to set a `Request` decorator looks like this:

```ts
fastify.decorateRequest('user', '')
fastify.addHook('preHandler', async (req, reply) => {
  req.user = 'Bob Dylan'
})
```

However, there is no guarantee that the decorator actually exists 
unless you manually check beforehand.  
Additionally, typos are common, e.g. `account`, `acount`, or `accout`.

By using `setDecorator`, you are always sure that the decorator exists:

```ts
fastify.decorateRequest('user', '')
fastify.addHook('preHandler', async (req, reply) => {
  // Throws FST_ERR_DEC_UNDECLARED if the decorator does not exist
  req.setDecorator('user-with-typo', 'Bob Dylan')
})
```

---

**Type Safety**

If the `FastifyRequest` interface does not declare the decorator, you 
would typically need to use type assertions:

```ts
fastify.addHook('preHandler', async (req, reply) => {
  (req as typeof req & { user: string }).user = 'Bob Dylan'
})
```

The `setDecorator<T>` method eliminates the need for explicit type 
assertions while allowing type safety:

```ts
fastify.addHook('preHandler', async (req, reply) => {
  req.setDecorator<string>('user', 'Bob Dylan')
})
```
````

## Source: https://fastify.dev/docs/latest/Reference/Encapsulation
````markdown
<h1 align="center">Fastify</h1>

## Encapsulation
<a id="encapsulation"></a>

A fundamental feature of Fastify is the "encapsulation context." It governs
which [decorators](./Decorators.md), registered [hooks](./Hooks.md), and
[plugins](./Plugins.md) are available to [routes](./Routes.md). A visual
representation of the encapsulation context is shown in the following figure:

![Figure 1](../resources/encapsulation_context.svg)

In the figure above, there are several entities:

1. The _root context_
2. Three _root plugins_
3. Two _child contexts_, each with:
    * Two _child plugins_
    * One _grandchild context_, each with:
        - Three _child plugins_

Every _child context_ and _grandchild context_ has access to the _root plugins_.
Within each _child context_, the _grandchild contexts_ have access to the
_child plugins_ registered within the containing _child context_, but the
containing _child context_ **does not** have access to the _child plugins_
registered within its _grandchild context_.

Given that everything in Fastify is a [plugin](./Plugins.md) except for the
_root context_, every "context" and "plugin" in this example is a plugin
that can consist of decorators, hooks, plugins, and routes. To put this
example into concrete terms, consider a basic scenario of a REST API server
with three routes: the first route (`/one`) requires authentication, the
second route (`/two`) does not, and the third route (`/three`) has access to
the same context as the second route. Using [@fastify/bearer-auth][bearer] to
provide authentication, the code for this example is as follows:

```js
'use strict'

const fastify = require('fastify')()

fastify.decorateRequest('answer', 42)

fastify.register(async function authenticatedContext (childServer) {
  childServer.register(require('@fastify/bearer-auth'), { keys: ['abc123'] })

  childServer.route({
    path: '/one',
    method: 'GET',
    handler (request, response) {
      response.send({
        answer: request.answer,
        // request.foo will be undefined as it is only defined in publicContext
        foo: request.foo,
        // request.bar will be undefined as it is only defined in grandchildContext
        bar: request.bar
      })
    }
  })
})

fastify.register(async function publicContext (childServer) {
  childServer.decorateRequest('foo', 'foo')

  childServer.route({
    path: '/two',
    method: 'GET',
    handler (request, response) {
      response.send({
        answer: request.answer,
        foo: request.foo,
        // request.bar will be undefined as it is only defined in grandchildContext
        bar: request.bar
      })
    }
  })

  childServer.register(async function grandchildContext (grandchildServer) {
    grandchildServer.decorateRequest('bar', 'bar')

    grandchildServer.route({
      path: '/three',
      method: 'GET',
      handler (request, response) {
        response.send({
          answer: request.answer,
          foo: request.foo,
          bar: request.bar
        })
      }
    })
  })
})

fastify.listen({ port: 8000 })
```

The server example above demonstrates the encapsulation concepts from the
original diagram:

1. Each _child context_ (`authenticatedContext`, `publicContext`, and
   `grandchildContext`) has access to the `answer` request decorator defined in
   the _root context_.
2. Only the `authenticatedContext` has access to the `@fastify/bearer-auth`
   plugin.
3. Both the `publicContext` and `grandchildContext` have access to the `foo`
   request decorator.
4. Only the `grandchildContext` has access to the `bar` request decorator.

To see this, start the server and issue requests:

```sh
# curl -H 'authorization: Bearer abc123' http://127.0.0.1:8000/one
{"answer":42}
# curl http://127.0.0.1:8000/two
{"answer":42,"foo":"foo"}
# curl http://127.0.0.1:8000/three
{"answer":42,"foo":"foo","bar":"bar"}
```

[bearer]: https://github.com/fastify/fastify-bearer-auth

## Sharing Between Contexts
<a id="shared-context"></a>

Each context in the prior example inherits _only_ from its parent contexts. Parent
contexts cannot access entities within their descendant contexts. If needed,
encapsulation can be broken using [fastify-plugin][fastify-plugin], making
anything registered in a descendant context available to the parent context.

To allow `publicContext` access to the `bar` decorator in `grandchildContext`,
rewrite the code as follows:

```js
'use strict'

const fastify = require('fastify')()
const fastifyPlugin = require('fastify-plugin')

fastify.decorateRequest('answer', 42)

// `authenticatedContext` omitted for clarity

fastify.register(async function publicContext (childServer) {
  childServer.decorateRequest('foo', 'foo')

  childServer.route({
    path: '/two',
    method: 'GET',
    handler (request, response) {
      response.send({
        answer: request.answer,
        foo: request.foo,
        bar: request.bar
      })
    }
  })

  childServer.register(fastifyPlugin(grandchildContext))

  async function grandchildContext (grandchildServer) {
    grandchildServer.decorateRequest('bar', 'bar')

    grandchildServer.route({
      path: '/three',
      method: 'GET',
      handler (request, response) {
        response.send({
          answer: request.answer,
          foo: request.foo,
          bar: request.bar
        })
      }
    })
  }
})

fastify.listen({ port: 8000 })
```

Restarting the server and re-issuing the requests for `/two` and `/three`:

```sh
# curl http://127.0.0.1:8000/two
{"answer":42,"foo":"foo","bar":"bar"}
# curl http://127.0.0.1:8000/three
{"answer":42,"foo":"foo","bar":"bar"}
```

[fastify-plugin]: https://github.com/fastify/fastify-plugin
````

## Source: https://fastify.dev/docs/latest/Reference/Errors
````markdown
<h1 align="center">Fastify</h1>

## Errors
<a id="errors"></a>

**Table of contents**
- [Errors](#errors)
  - [Error Handling In Node.js](#error-handling-in-nodejs)
    - [Uncaught Errors](#uncaught-errors)
    - [Catching Errors In Promises](#catching-errors-in-promises)
  - [Errors In Fastify](#errors-in-fastify)
    - [Errors In Input Data](#errors-in-input-data)
    - [Catching Uncaught Errors In Fastify](#catching-uncaught-errors-in-fastify)
  - [Errors In Fastify Lifecycle Hooks And A Custom Error Handler](#errors-in-fastify-lifecycle-hooks-and-a-custom-error-handler)
  - [Fastify Error Codes](#fastify-error-codes)
    - [FST_ERR_NOT_FOUND](#fst_err_not_found)
    - [FST_ERR_OPTIONS_NOT_OBJ](#fst_err_options_not_obj)
    - [FST_ERR_QSP_NOT_FN](#fst_err_qsp_not_fn)
    - [FST_ERR_SCHEMA_CONTROLLER_BUCKET_OPT_NOT_FN](#fst_err_schema_controller_bucket_opt_not_fn)
    - [FST_ERR_SCHEMA_ERROR_FORMATTER_NOT_FN](#fst_err_schema_error_formatter_not_fn)
    - [FST_ERR_AJV_CUSTOM_OPTIONS_OPT_NOT_OBJ](#fst_err_ajv_custom_options_opt_not_obj)
    - [FST_ERR_AJV_CUSTOM_OPTIONS_OPT_NOT_ARR](#fst_err_ajv_custom_options_opt_not_arr)
    - [FST_ERR_CTP_ALREADY_PRESENT](#fst_err_ctp_already_present)
    - [FST_ERR_CTP_INVALID_TYPE](#fst_err_ctp_invalid_type)
    - [FST_ERR_CTP_EMPTY_TYPE](#fst_err_ctp_empty_type)
    - [FST_ERR_CTP_INVALID_HANDLER](#fst_err_ctp_invalid_handler)
    - [FST_ERR_CTP_INVALID_PARSE_TYPE](#fst_err_ctp_invalid_parse_type)
    - [FST_ERR_CTP_BODY_TOO_LARGE](#fst_err_ctp_body_too_large)
    - [FST_ERR_CTP_INVALID_MEDIA_TYPE](#fst_err_ctp_invalid_media_type)
    - [FST_ERR_CTP_INVALID_CONTENT_LENGTH](#fst_err_ctp_invalid_content_length)
    - [FST_ERR_CTP_EMPTY_JSON_BODY](#fst_err_ctp_empty_json_body)
    - [FST_ERR_CTP_INSTANCE_ALREADY_STARTED](#fst_err_ctp_instance_already_started)
    - [FST_ERR_INSTANCE_ALREADY_LISTENING](#fst_err_instance_already_listening)
    - [FST_ERR_DEC_ALREADY_PRESENT](#fst_err_dec_already_present)
    - [FST_ERR_DEC_DEPENDENCY_INVALID_TYPE](#fst_err_dec_dependency_invalid_type)
    - [FST_ERR_DEC_MISSING_DEPENDENCY](#fst_err_dec_missing_dependency)
    - [FST_ERR_DEC_AFTER_START](#fst_err_dec_after_start)
    - [FST_ERR_DEC_REFERENCE_TYPE](#fst_err_dec_reference_type)
    - [FST_ERR_DEC_UNDECLARED](#fst_err_dec_undeclared)
    - [FST_ERR_HOOK_INVALID_TYPE](#fst_err_hook_invalid_type)
    - [FST_ERR_HOOK_INVALID_HANDLER](#fst_err_hook_invalid_handler)
    - [FST_ERR_HOOK_INVALID_ASYNC_HANDLER](#fst_err_hook_invalid_async_handler)
    - [FST_ERR_HOOK_NOT_SUPPORTED](#fst_err_hook_not_supported)
    - [FST_ERR_MISSING_MIDDLEWARE](#fst_err_missing_middleware)
    - [FST_ERR_HOOK_TIMEOUT](#fst_err_hook_timeout)
    - [FST_ERR_LOG_INVALID_DESTINATION](#fst_err_log_invalid_destination)
    - [FST_ERR_LOG_INVALID_LOGGER](#fst_err_log_invalid_logger)
    - [FST_ERR_LOG_INVALID_LOGGER_INSTANCE](#fst_err_log_invalid_logger_instance)
    - [FST_ERR_LOG_INVALID_LOGGER_CONFIG](#fst_err_log_invalid_logger_config)
    - [FST_ERR_LOG_LOGGER_AND_LOGGER_INSTANCE_PROVIDED](#fst_err_log_logger_and_logger_instance_provided)
    - [FST_ERR_REP_INVALID_PAYLOAD_TYPE](#fst_err_rep_invalid_payload_type)
    - [FST_ERR_REP_RESPONSE_BODY_CONSUMED](#fst_err_rep_response_body_consumed)
    - [FST_ERR_REP_READABLE_STREAM_LOCKED](#fst_err_rep_readable_stream_locked)
    - [FST_ERR_REP_ALREADY_SENT](#fst_err_rep_already_sent)
    - [FST_ERR_REP_SENT_VALUE](#fst_err_rep_sent_value)
    - [FST_ERR_SEND_INSIDE_ONERR](#fst_err_send_inside_onerr)
    - [FST_ERR_SEND_UNDEFINED_ERR](#fst_err_send_undefined_err)
    - [FST_ERR_BAD_STATUS_CODE](#fst_err_bad_status_code)
    - [FST_ERR_BAD_TRAILER_NAME](#fst_err_bad_trailer_name)
    - [FST_ERR_BAD_TRAILER_VALUE](#fst_err_bad_trailer_value)
    - [FST_ERR_FAILED_ERROR_SERIALIZATION](#fst_err_failed_error_serialization)
    - [FST_ERR_MISSING_SERIALIZATION_FN](#fst_err_missing_serialization_fn)
    - [FST_ERR_MISSING_CONTENTTYPE_SERIALIZATION_FN](#fst_err_missing_contenttype_serialization_fn)
    - [FST_ERR_REQ_INVALID_VALIDATION_INVOCATION](#fst_err_req_invalid_validation_invocation)
    - [FST_ERR_SCH_MISSING_ID](#fst_err_sch_missing_id)
    - [FST_ERR_SCH_ALREADY_PRESENT](#fst_err_sch_already_present)
    - [FST_ERR_SCH_CONTENT_MISSING_SCHEMA](#fst_err_sch_content_missing_schema)
    - [FST_ERR_SCH_DUPLICATE](#fst_err_sch_duplicate)
    - [FST_ERR_SCH_VALIDATION_BUILD](#fst_err_sch_validation_build)
    - [FST_ERR_SCH_SERIALIZATION_BUILD](#fst_err_sch_serialization_build)
    - [FST_ERR_SCH_RESPONSE_SCHEMA_NOT_NESTED_2XX](#fst_err_sch_response_schema_not_nested_2xx)
    - [FST_ERR_INIT_OPTS_INVALID](#fst_err_init_opts_invalid)
    - [FST_ERR_FORCE_CLOSE_CONNECTIONS_IDLE_NOT_AVAILABLE](#fst_err_force_close_connections_idle_not_available)
    - [FST_ERR_DUPLICATED_ROUTE](#fst_err_duplicated_route)
    - [FST_ERR_BAD_URL](#fst_err_bad_url)
    - [FST_ERR_ASYNC_CONSTRAINT](#fst_err_async_constraint)
    - [FST_ERR_INVALID_URL](#fst_err_invalid_url)
    - [FST_ERR_ROUTE_OPTIONS_NOT_OBJ](#fst_err_route_options_not_obj)
    - [FST_ERR_ROUTE_DUPLICATED_HANDLER](#fst_err_route_duplicated_handler)
    - [FST_ERR_ROUTE_HANDLER_NOT_FN](#fst_err_route_handler_not_fn)
    - [FST_ERR_ROUTE_MISSING_HANDLER](#fst_err_route_missing_handler)
    - [FST_ERR_ROUTE_METHOD_INVALID](#fst_err_route_method_invalid)
    - [FST_ERR_ROUTE_METHOD_NOT_SUPPORTED](#fst_err_route_method_not_supported)
    - [FST_ERR_ROUTE_BODY_VALIDATION_SCHEMA_NOT_SUPPORTED](#fst_err_route_body_validation_schema_not_supported)
    - [FST_ERR_ROUTE_BODY_LIMIT_OPTION_NOT_INT](#fst_err_route_body_limit_option_not_int)
    - [FST_ERR_ROUTE_REWRITE_NOT_STR](#fst_err_route_rewrite_not_str)
    - [FST_ERR_REOPENED_CLOSE_SERVER](#fst_err_reopened_close_server)
    - [FST_ERR_REOPENED_SERVER](#fst_err_reopened_server)
    - [FST_ERR_PLUGIN_VERSION_MISMATCH](#fst_err_plugin_version_mismatch)
    - [FST_ERR_PLUGIN_CALLBACK_NOT_FN](#fst_err_plugin_callback_not_fn)
    - [FST_ERR_PLUGIN_NOT_VALID](#fst_err_plugin_not_valid)
    - [FST_ERR_ROOT_PLG_BOOTED](#fst_err_root_plg_booted)
    - [FST_ERR_PARENT_PLUGIN_BOOTED](#fst_err_parent_plugin_booted)
    - [FST_ERR_PLUGIN_TIMEOUT](#fst_err_plugin_timeout)
    - [FST_ERR_PLUGIN_NOT_PRESENT_IN_INSTANCE](#fst_err_plugin_not_present_in_instance)
    - [FST_ERR_PLUGIN_INVALID_ASYNC_HANDLER](#fst_err_plugin_invalid_async_handler)
    - [FST_ERR_VALIDATION](#fst_err_validation)
    - [FST_ERR_LISTEN_OPTIONS_INVALID](#fst_err_listen_options_invalid)
    - [FST_ERR_ERROR_HANDLER_NOT_FN](#fst_err_error_handler_not_fn)
    - [FST_ERR_ERROR_HANDLER_ALREADY_SET](#fst_err_error_handler_already_set)

### Error Handling In Node.js
<a id="error-handling"></a>

#### Uncaught Errors
In Node.js, uncaught errors can cause memory leaks, file descriptor leaks, and
other major production issues.
[Domains](https://nodejs.org/en/docs/guides/domain-postmortem/) were a failed
attempt to fix this.

Given that it is not possible to process all uncaught errors sensibly, the best
way to deal with them is to
[crash](https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly).

#### Catching Errors In Promises
When using promises, attach a `.catch()` handler synchronously.

### Errors In Fastify
Fastify follows an all-or-nothing approach and aims to be lean and optimal. The
developer is responsible for ensuring errors are handled properly.

#### Errors In Input Data
Most errors result from unexpected input data, so it is recommended to
[validate input data against a JSON schema](./Validation-and-Serialization.md).

#### Catching Uncaught Errors In Fastify
Fastify tries to catch as many uncaught errors as possible without hindering
performance. This includes:

1. synchronous routes, e.g. `app.get('/', () => { throw new Error('kaboom') })`
2. `async` routes, e.g. `app.get('/', async () => { throw new Error('kaboom')
   })`

In both cases, the error will be caught safely and routed to Fastify's default
error handler, resulting in a generic `500 Internal Server Error` response.

To customize this behavior, use
[`setErrorHandler`](./Server.md#seterrorhandler).

### Errors In Fastify Lifecycle Hooks And A Custom Error Handler

From the [Hooks documentation](./Hooks.md#manage-errors-from-a-hook):
> If you get an error during the execution of your hook, just pass it to
> `done()` and Fastify will automatically close the request and send the
> appropriate error code to the user.

When a custom error handler is defined through
[`setErrorHandler`](./Server.md#seterrorhandler), it will receive the error
passed to the `done()` callback or through other supported automatic error
handling mechanisms. If `setErrorHandler` is used multiple times, the error will
be routed to the most precedent handler within the error
[encapsulation context](./Encapsulation.md). Error handlers are fully
encapsulated, so a `setErrorHandler` call within a plugin will limit the error
handler to that plugin's context.

The root error handler is Fastify's generic error handler. This error handler
will use the headers and status code in the `Error` object, if they exist. The
headers and status code will not be automatically set if a custom error handler
is provided.

The following should be considered when using a custom error handler:

- `reply.send(data)` behaves as in [regular route handlers](./Reply.md#senddata)
  - objects are serialized, triggering the `preSerialization` lifecycle hook if
    defined
  - strings, buffers, and streams are sent to the client with appropriate headers
    (no serialization)

- Throwing a new error in a custom error handler will call the parent
  `errorHandler`.
  - The `onError` hook will be triggered once for the first error thrown
  - An error will not be triggered twice from a lifecycle hook. Fastify
    internally monitors error invocation to avoid infinite loops for errors
    thrown in the reply phases of the lifecycle (those after the route handler)

When using Fastify's custom error handling through
[`setErrorHandler`](./Server.md#seterrorhandler), be aware of how errors are
propagated between custom and default error handlers.

If a plugin's error handler re-throws an error that is not an instance of
[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error),
it will not propagate to the parent context error handler. Instead, it will be
caught by the default error handler. This can be seen in the `/bad` route of the
example below.

To ensure consistent error handling, throw instances of `Error`. For example,
replace `throw 'foo'` with `throw new Error('foo')` in the `/bad` route to
ensure errors propagate through the custom error handling chain as intended.
This practice helps avoid potential pitfalls when working with custom error
handling in Fastify.

For example:
```js
const Fastify = require('fastify')

// Instantiate the framework
const fastify = Fastify({
  logger: true
})

// Register parent error handler
fastify.setErrorHandler((error, request, reply) => {
  reply.status(500).send({ ok: false })
})

fastify.register((app, options, next) => {
  // Register child error handler
  fastify.setErrorHandler((error, request, reply) => {
    throw error
  })

  fastify.get('/bad', async () => {
    // Throws a non-Error type, 'bar'
    throw 'foo'
  })

  fastify.get('/good', async () => {
    // Throws an Error instance, 'bar'
    throw new Error('bar')
  })

  next()
})

// Run the server
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is listening at ${address}
})
```

### Fastify Error Codes
<a id="fastify-error-codes"></a>

You can access `errorCodes` for mapping:
```js
// ESM
import { errorCodes } from 'fastify'

// CommonJS
const errorCodes = require('fastify').errorCodes
```

For example:
```js
const Fastify = require('fastify')

// Instantiate the framework
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.code('bad status code').send({ hello: 'world' })
})

fastify.setErrorHandler(function (error, request, reply) {
  if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    // Log error
    this.log.error(error)
    // Send error response
    reply.status(500).send({ ok: false })
  } else {
    // Fastify will use parent error handler to handle this
    reply.send(error)
  }
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```

Below is a table with all the error codes used by Fastify.

| Code | Description | How to solve | Discussion |
|------|-------------|--------------|------------|
| <a id="fst_err_not_found">FST_ERR_NOT_FOUND</a> | 404 Not Found | - | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_options_not_obj">FST_ERR_OPTIONS_NOT_OBJ</a> | Fastify options wrongly specified. | Fastify options should be an object. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_qsp_not_fn">FST_ERR_QSP_NOT_FN</a> | QueryStringParser wrongly specified. | QueryStringParser option should be a function. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_schema_controller_bucket_opt_not_fn">FST_ERR_SCHEMA_CONTROLLER_BUCKET_OPT_NOT_FN</a> | SchemaController.bucket wrongly specified. | SchemaController.bucket option should be a function. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_schema_error_formatter_not_fn">FST_ERR_SCHEMA_ERROR_FORMATTER_NOT_FN</a> | SchemaErrorFormatter option wrongly specified. | SchemaErrorFormatter option should be a non async function. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_ajv_custom_options_opt_not_obj">FST_ERR_AJV_CUSTOM_OPTIONS_OPT_NOT_OBJ</a> | ajv.customOptions wrongly specified. | ajv.customOptions option should be an object. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_ajv_custom_options_opt_not_arr">FST_ERR_AJV_CUSTOM_OPTIONS_OPT_NOT_ARR</a> | ajv.plugins option wrongly specified. | ajv.plugins option should be an array. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_ctp_already_present">FST_ERR_CTP_ALREADY_PRESENT</a> | The parser for this content type was already registered. | Use a different content type or delete the already registered parser. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_ctp_invalid_type">FST_ERR_CTP_INVALID_TYPE</a> | `Content-Type` wrongly specified | The `Content-Type` should be a string. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_ctp_empty_type">FST_ERR_CTP_EMPTY_TYPE</a> | `Content-Type` is an empty string. | `Content-Type` cannot be an empty string. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_ctp_invalid_handler">FST_ERR_CTP_INVALID_HANDLER</a> | Invalid handler for the content type. | Use a different handler. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_ctp_invalid_parse_type">FST_ERR_CTP_INVALID_PARSE_TYPE</a> | The provided parse type is not supported. | Accepted values are <code>string</code> or <code>buffer</code>. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_ctp_body_too_large">FST_ERR_CTP_BODY_TOO_LARGE</a> | The request body is larger than the provided limit. | Increase the limit in the Fastify server instance setting: [bodyLimit](./Server.md#bodylimit) | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_ctp_invalid_media_type">FST_ERR_CTP_INVALID_MEDIA_TYPE</a> | The received media type is not supported (i.e. there is no suitable `Content-Type` parser for it). | Use a different content type. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_ctp_invalid_content_length">FST_ERR_CTP_INVALID_CONTENT_LENGTH</a> | Request body size did not match <code>Content-Length</code>. | Check the request body size and the <code>Content-Length</code> header. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_ctp_empty_json_body">FST_ERR_CTP_EMPTY_JSON_BODY</a> | Body cannot be empty when content-type is set to <code>application/json</code>. | Check the request body. | [#1253](https://github.com/fastify/fastify/pull/1253) |
| <a id="fst_err_ctp_instance_already_started">FST_ERR_CTP_INSTANCE_ALREADY_STARTED</a> | Fastify is already started. | - | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_instance_already_listening">FST_ERR_INSTANCE_ALREADY_LISTENING</a> | Fastify instance is already listening. | - | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_dec_already_present">FST_ERR_DEC_ALREADY_PRESENT</a> | A decorator with the same name is already registered. | Use a different decorator name. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_dec_dependency_invalid_type">FST_ERR_DEC_DEPENDENCY_INVALID_TYPE</a> | The dependencies of decorator must be of type `Array`. | Use an array for the dependencies. | [#3090](https://github.com/fastify/fastify/pull/3090) |
| <a id="fst_err_dec_missing_dependency">FST_ERR_DEC_MISSING_DEPENDENCY</a> | The decorator cannot be registered due to a missing dependency. | Register the missing dependency. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_dec_after_start">FST_ERR_DEC_AFTER_START</a> | The decorator cannot be added after start. | Add the decorator before starting the server. | [#2128](https://github.com/fastify/fastify/pull/2128) |
| <a id="fst_err_dec_reference_type">FST_ERR_DEC_REFERENCE_TYPE</a> | The decorator cannot be a reference type. | Define the decorator with a getter/setter interface or an empty decorator with a hook. | [#5462](https://github.com/fastify/fastify/pull/5462) |
| <a id="fst_err_dec_undeclared">FST_ERR_DEC_UNDECLARED</a> | An attempt was made to access a decorator that has not been declared. | Declare the decorator before using it. | [#](https://github.com/fastify/fastify/pull/)
| <a id="fst_err_hook_invalid_type">FST_ERR_HOOK_INVALID_TYPE</a> | The hook name must be a string. | Use a string for the hook name. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_hook_invalid_handler">FST_ERR_HOOK_INVALID_HANDLER</a> | The hook callback must be a function. | Use a function for the hook callback. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_hook_invalid_async_handler">FST_ERR_HOOK_INVALID_ASYNC_HANDLER</a> | Async function has too many arguments. Async hooks should not use the `done` argument. | Remove the `done` argument from the async hook. | [#4367](https://github.com/fastify/fastify/pull/4367) |
| <a id="fst_err_hook_not_supported">FST_ERR_HOOK_NOT_SUPPORTED</a> | The hook is not supported. | Use a supported hook. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_missing_middleware">FST_ERR_MISSING_MIDDLEWARE</a> | You must register a plugin for handling middlewares, visit [`Middleware`](./Middleware.md) for more info. | Register a plugin for handling middlewares. | [#2014](https://github.com/fastify/fastify/pull/2014) |
| <a id="fst_err_hook_timeout">FST_ERR_HOOK_TIMEOUT</a> | A callback for a hook timed out. | Increase the timeout for the hook. | [#3106](https://github.com/fastify/fastify/pull/3106) |
| <a id="fst_err_log_invalid_destination">FST_ERR_LOG_INVALID_DESTINATION</a> | The logger does not accept the specified destination. | Use a `'stream'` or a `'file'` as the destination. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_log_invalid_logger">FST_ERR_LOG_INVALID_LOGGER</a> | The logger should have all these methods: `'info'`, `'error'`, `'debug'`, `'fatal'`, `'warn'`, `'trace'`, `'child'`. | Use a logger with all the required methods. | [#4520](https://github.com/fastify/fastify/pull/4520) |
| <a id="fst_err_log_invalid_logger_instance">FST_ERR_LOG_INVALID_LOGGER_INSTANCE</a> | The `loggerInstance` only accepts a logger instance, not a configuration object. | To pass a configuration object, use `'logger'` instead. | [#5020](https://github.com/fastify/fastify/pull/5020) |
| <a id="fst_err_log_invalid_logger_config">FST_ERR_LOG_INVALID_LOGGER_CONFIG</a> | The logger option only accepts a configuration object, not a logger instance. | To pass an instance, use `'loggerInstance'` instead.  | [#5020](https://github.com/fastify/fastify/pull/5020) |
| <a id="fst_err_log_logger_and_logger_instance_provided">FST_ERR_LOG_LOGGER_AND_LOGGER_INSTANCE_PROVIDED</a> | You cannot provide both `'logger'` and `'loggerInstance'`. | Please provide only one option.  | [#5020](https://github.com/fastify/fastify/pull/5020) |
| <a id="fst_err_rep_invalid_payload_type">FST_ERR_REP_INVALID_PAYLOAD_TYPE</a> | Reply payload can be either a `string` or a `Buffer`. | Use a `string` or a `Buffer` for the payload. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_rep_response_body_consumed">FST_ERR_REP_RESPONSE_BODY_CONSUMED</a> | Using `Response` as reply payload, but the body is being consumed. | Make sure you don't consume the `Response.body` | [#5286](https://github.com/fastify/fastify/pull/5286) |
| <a id="fst_err_rep_readable_stream_locked">FST_ERR_REP_READABLE_STREAM_LOCKED</a> | Using `ReadableStream` as reply payload, but locked with another reader. | Make sure you don't call the `Readable.getReader` before sending or release lock with `reader.releaseLock()` before sending. | [#5920](https://github.com/fastify/fastify/pull/5920) |
| <a id="fst_err_rep_already_sent">FST_ERR_REP_ALREADY_SENT</a> | A response was already sent. | - | [#1336](https://github.com/fastify/fastify/pull/1336) |
| <a id="fst_err_rep_sent_value">FST_ERR_REP_SENT_VALUE</a> | The only possible value for `reply.sent` is `true`. | - | [#1336](https://github.com/fastify/fastify/pull/1336) |
| <a id="fst_err_send_inside_onerr">FST_ERR_SEND_INSIDE_ONERR</a> | You cannot use `send` inside the `onError` hook. | - | [#1348](https://github.com/fastify/fastify/pull/1348) |
| <a id="fst_err_send_undefined_err">FST_ERR_SEND_UNDEFINED_ERR</a> | Undefined error has occurred. | - | [#2074](https://github.com/fastify/fastify/pull/2074) |
| <a id="fst_err_bad_status_code">FST_ERR_BAD_STATUS_CODE</a> | The status code is not valid. | Use a valid status code. | [#2082](https://github.com/fastify/fastify/pull/2082) |
| <a id="fst_err_bad_trailer_name">FST_ERR_BAD_TRAILER_NAME</a> | Called `reply.trailer` with an invalid header name. | Use a valid header name. | [#3794](https://github.com/fastify/fastify/pull/3794) |
| <a id="fst_err_bad_trailer_value">FST_ERR_BAD_TRAILER_VALUE</a> | Called `reply.trailer` with an invalid type. Expected a function. | Use a function. | [#3794](https://github.com/fastify/fastify/pull/3794) |
| <a id="fst_err_failed_error_serialization">FST_ERR_FAILED_ERROR_SERIALIZATION</a> | Failed to serialize an error. | - | [#4601](https://github.com/fastify/fastify/pull/4601) |
| <a id="fst_err_missing_serialization_fn">FST_ERR_MISSING_SERIALIZATION_FN</a> | Missing serialization function. | Add a serialization function. | [#3970](https://github.com/fastify/fastify/pull/3970) |
| <a id="fst_err_missing_contenttype_serialization_fn">FST_ERR_MISSING_CONTENTTYPE_SERIALIZATION_FN</a> | Missing `Content-Type` serialization function. | Add a serialization function. | [#4264](https://github.com/fastify/fastify/pull/4264) |
| <a id="fst_err_req_invalid_validation_invocation">FST_ERR_REQ_INVALID_VALIDATION_INVOCATION</a> | Invalid validation invocation. Missing validation function for HTTP part nor schema provided. | Add a validation function. | [#3970](https://github.com/fastify/fastify/pull/3970) |
| <a id="fst_err_sch_missing_id">FST_ERR_SCH_MISSING_ID</a> | The schema provided does not have `$id` property. | Add a `$id` property. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_sch_already_present">FST_ERR_SCH_ALREADY_PRESENT</a> | A schema with the same `$id` already exists. | Use a different `$id`. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| <a id="fst_err_sch_content_missing_schema">FST_ERR_SCH_CONTENT_MISSING_SCHEMA</a> | A schema is missing for the corresponding content type. | Add a schema. | [#4264](https://github.com/fastify/fastify/pull/4264) |
| <a id="fst_err_sch_duplicate">FST_ERR_SCH_DUPLICATE</a> | Schema with the same attribute already present! | Use a different attribute. | [#1954](https://github.com/fastify/fastify/pull/1954) |
| <a id="fst_err_sch_validation_build">FST_ERR_SCH_VALIDATION_BUILD</a> | The JSON schema provided for validation to a route is not valid. | Fix the JSON schema. | [#2023](https://github.com/fastify/fastify/pull/2023) |
| <a id="fst_err_sch_serialization_build">FST_ERR_SCH_SERIALIZATION_BUILD</a> | The JSON schema provided for serialization of a route response is not valid. | Fix the JSON schema. | [#2023](https://github.com/fastify/fastify/pull/2023) |
| <a id="fst_err_sch_response_schema_not_nested_2xx">FST_ERR_SCH_RESPONSE_SCHEMA_NOT_NESTED_2XX</a> | Response schemas should be nested under a valid status code (2XX). | Use a valid status code. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_init_opts_invalid">FST_ERR_INIT_OPTS_INVALID</a> | Invalid initialization options. | Use valid initialization options. | [#1471](https://github.com/fastify/fastify/pull/1471) |
| <a id="fst_err_force_close_connections_idle_not_available">FST_ERR_FORCE_CLOSE_CONNECTIONS_IDLE_NOT_AVAILABLE</a> | Cannot set forceCloseConnections to `idle` as your HTTP server does not support `closeIdleConnections` method. | Use a different value for `forceCloseConnections`. | [#3925](https://github.com/fastify/fastify/pull/3925) |
| <a id="fst_err_duplicated_route">FST_ERR_DUPLICATED_ROUTE</a> | The HTTP method already has a registered controller for that URL. | Use a different URL or register the controller for another HTTP method. | [#2954](https://github.com/fastify/fastify/pull/2954) |
| <a id="fst_err_bad_url">FST_ERR_BAD_URL</a> | The router received an invalid URL. | Use a valid URL. | [#2106](https://github.com/fastify/fastify/pull/2106) |
| <a id="fst_err_async_constraint">FST_ERR_ASYNC_CONSTRAINT</a> | The router received an error when using asynchronous constraints. | - | [#4323](https://github.com/fastify/fastify/pull/4323) |
| <a id="fst_err_invalid_url">FST_ERR_INVALID_URL</a> | URL must be a string. | Use a string for the URL. | [#3653](https://github.com/fastify/fastify/pull/3653) |
| <a id="fst_err_route_options_not_obj">FST_ERR_ROUTE_OPTIONS_NOT_OBJ</a> | Options for the route must be an object. | Use an object for the route options. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_route_duplicated_handler">FST_ERR_ROUTE_DUPLICATED_HANDLER</a> | Duplicate handler for the route is not allowed. | Use a different handler. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_route_handler_not_fn">FST_ERR_ROUTE_HANDLER_NOT_FN</a> | Handler for the route must be a function. | Use a function for the handler. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_route_missing_handler">FST_ERR_ROUTE_MISSING_HANDLER</a> | Missing handler function for the route. | Add a handler function. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_route_method_invalid">FST_ERR_ROUTE_METHOD_INVALID</a> | Method is not a valid value. | Use a valid value for the method. | [#4750](https://github.com/fastify/fastify/pull/4750) |
| <a id="fst_err_route_method_not_supported">FST_ERR_ROUTE_METHOD_NOT_SUPPORTED</a> | Method is not supported for the route. | Use a supported method. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_route_body_validation_schema_not_supported">FST_ERR_ROUTE_BODY_VALIDATION_SCHEMA_NOT_SUPPORTED</a> | Body validation schema route is not supported. | Use a different different method for the route. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_route_body_limit_option_not_int">FST_ERR_ROUTE_BODY_LIMIT_OPTION_NOT_INT</a> | `bodyLimit` option must be an integer. | Use an integer for the `bodyLimit` option. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_route_rewrite_not_str">FST_ERR_ROUTE_REWRITE_NOT_STR</a> | `rewriteUrl` needs to be of type `string`. | Use a string for the `rewriteUrl`. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_reopened_close_server">FST_ERR_REOPENED_CLOSE_SERVER</a> | Fastify has already been closed and cannot be reopened. | - | [#2415](https://github.com/fastify/fastify/pull/2415) |
| <a id="fst_err_reopened_server">FST_ERR_REOPENED_SERVER</a> | Fastify is already listening. | - | [#2415](https://github.com/fastify/fastify/pull/2415) |
| <a id="fst_err_plugin_version_mismatch">FST_ERR_PLUGIN_VERSION_MISMATCH</a> | Installed Fastify plugin mismatched expected version. | Use a compatible version of the plugin. | [#2549](https://github.com/fastify/fastify/pull/2549) |
| <a id="fst_err_plugin_callback_not_fn">FST_ERR_PLUGIN_CALLBACK_NOT_FN</a> | Callback for a hook is not a function. | Use a function for the callback. | [#3106](https://github.com/fastify/fastify/pull/3106) |
| <a id="fst_err_plugin_not_valid">FST_ERR_PLUGIN_NOT_VALID</a> | Plugin must be a function or a promise. | Use a function or a promise for the plugin. | [#3106](https://github.com/fastify/fastify/pull/3106) |
| <a id="fst_err_root_plg_booted">FST_ERR_ROOT_PLG_BOOTED</a> | Root plugin has already booted. | - | [#3106](https://github.com/fastify/fastify/pull/3106) |
| <a id="fst_err_parent_plugin_booted">FST_ERR_PARENT_PLUGIN_BOOTED</a> | Impossible to load plugin because the parent (mapped directly from `avvio`) | - | [#3106](https://github.com/fastify/fastify/pull/3106) |
| <a id="fst_err_plugin_timeout">FST_ERR_PLUGIN_TIMEOUT</a> | Plugin did not start in time. | Increase the timeout for the plugin. | [#3106](https://github.com/fastify/fastify/pull/3106) |
| <a id="fst_err_plugin_not_present_in_instance">FST_ERR_PLUGIN_NOT_PRESENT_IN_INSTANCE</a> | The decorator is not present in the instance. | - | [#4554](https://github.com/fastify/fastify/pull/4554) |
| <a id="fst_err_plugin_invalid_async_handler">FST_ERR_PLUGIN_INVALID_ASYNC_HANDLER</a> | The plugin being registered mixes async and callback styles. | - | [#5141](https://github.com/fastify/fastify/pull/5141) |
| <a id="fst_err_validation">FST_ERR_VALIDATION</a> | The Request failed the payload validation. | Check the request payload. | [#4824](https://github.com/fastify/fastify/pull/4824) |
| <a id="fst_err_listen_options_invalid">FST_ERR_LISTEN_OPTIONS_INVALID</a> | Invalid listen options. | Check the listen options. | [#4886](https://github.com/fastify/fastify/pull/4886) |
| <a id="fst_err_error_handler_not_fn">FST_ERR_ERROR_HANDLER_NOT_FN</a> | Error Handler must be a function | Provide a function to `setErrorHandler`. | [#5317](https://github.com/fastify/fastify/pull/5317) | <a id="fst_err_error_handler_already_set">FST_ERR_ERROR_HANDLER_ALREADY_SET</a> | Error Handler already set in this scope. Set `allowErrorHandlerOverride: true` to allow overriding. | By default, `setErrorHandler` can only be called once per encapsulation context. | [#6097](https://github.com/fastify/fastify/pull/6098) |
````

## Source: https://fastify.dev/docs/latest/Reference/Hooks
````markdown
<h1 align="center">Fastify</h1>

## Hooks

Hooks are registered with the `fastify.addHook` method and allow you to listen
to specific events in the application or request/response lifecycle. You have to
register a hook before the event is triggered, otherwise, the event is lost.

By using hooks you can interact directly with the lifecycle of Fastify. There
are Request/Reply hooks and application hooks:

- [Request/Reply Hooks](#requestreply-hooks)
  - [onRequest](#onrequest)
  - [preParsing](#preparsing)
  - [preValidation](#prevalidation)
  - [preHandler](#prehandler)
  - [preSerialization](#preserialization)
  - [onError](#onerror)
  - [onSend](#onsend)
  - [onResponse](#onresponse)
  - [onTimeout](#ontimeout)
  - [onRequestAbort](#onrequestabort)
  - [Manage Errors from a hook](#manage-errors-from-a-hook)
  - [Respond to a request from a hook](#respond-to-a-request-from-a-hook)
- [Application Hooks](#application-hooks)
  - [onReady](#onready)
  - [onListen](#onlisten)
  - [onClose](#onclose)
  - [preClose](#preclose)
  - [onRoute](#onroute)
  - [onRegister](#onregister)
- [Scope](#scope)
- [Route level hooks](#route-level-hooks)
- [Using Hooks to Inject Custom Properties](#using-hooks-to-inject-custom-properties)
- [Diagnostics Channel Hooks](#diagnostics-channel-hooks)

> ℹ️ Note: The `done` callback is not available when using `async`/`await` or
> returning a `Promise`. If you do invoke a `done` callback in this situation
> unexpected behavior may occur, e.g. duplicate invocation of handlers.

## Request/Reply Hooks

[Request](./Request.md) and [Reply](./Reply.md) are the core Fastify objects.

`done` is the function to continue with the [lifecycle](./Lifecycle.md).

It is easy to understand where each hook is executed by looking at the
[lifecycle page](./Lifecycle.md).

Hooks are affected by Fastify's encapsulation, and can thus be applied to
selected routes. See the [Scopes](#scope) section for more information.

There are eight different hooks that you can use in Request/Reply *(in order of
execution)*:

### onRequest
```js
fastify.addHook('onRequest', (request, reply, done) => {
  // Some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('onRequest', async (request, reply) => {
  // Some code
  await asyncMethod()
})
```

> ℹ️ Note: In the [onRequest](#onrequest) hook, `request.body` will always be
> `undefined`, because the body parsing happens before the
> [preValidation](#prevalidation) hook.

### preParsing

If you are using the `preParsing` hook, you can transform the request payload
stream before it is parsed. It receives the request and reply objects as other
hooks, and a stream with the current request payload.

If it returns a value (via `return` or via the callback function), it must
return a stream.

For instance, you can decompress the request body:

```js
fastify.addHook('preParsing', (request, reply, payload, done) => {
  // Some code
  done(null, newPayload)
})
```
Or `async/await`:
```js
fastify.addHook('preParsing', async (request, reply, payload) => {
  // Some code
  await asyncMethod()
  return newPayload
})
```

> ℹ️ Note: In the [preParsing](#preparsing) hook, `request.body` will always be
> `undefined`, because the body parsing happens before the
> [preValidation](#prevalidation) hook.

> ℹ️ Note: You should also add a `receivedEncodedLength` property to the
> returned stream. This property is used to correctly match the request payload
> with the `Content-Length` header value. Ideally, this property should be updated
> on each received chunk.

> ℹ️ Note: The size of the returned stream is checked to not exceed the limit
> set in [`bodyLimit`](./Server.md#bodylimit) option.

### preValidation

If you are using the `preValidation` hook, you can change the payload before it
is validated. For example:

```js
fastify.addHook('preValidation', (request, reply, done) => {
  request.body = { ...request.body, importantKey: 'randomString' }
  done()
})
```
Or `async/await`:
```js
fastify.addHook('preValidation', async (request, reply) => {
  const importantKey = await generateRandomString()
  request.body = { ...request.body, importantKey }
})
```

### preHandler

The `preHandler` hook allows you to specify a function that is executed before
a routes's handler.

```js
fastify.addHook('preHandler', (request, reply, done) => {
  // some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('preHandler', async (request, reply) => {
  // Some code
  await asyncMethod()
})
```
### preSerialization

If you are using the `preSerialization` hook, you can change (or replace) the
payload before it is serialized. For example:

```js
fastify.addHook('preSerialization', (request, reply, payload, done) => {
  const err = null
  const newPayload = { wrapped: payload }
  done(err, newPayload)
})
```
Or `async/await`:
```js
fastify.addHook('preSerialization', async (request, reply, payload) => {
  return { wrapped: payload }
})
```

> ℹ️ Note: The hook is NOT called if the payload is a `string`, a `Buffer`, a
> `stream`, or `null`.

### onError
```js
fastify.addHook('onError', (request, reply, error, done) => {
  // Some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('onError', async (request, reply, error) => {
  // Useful for custom error logging
  // You should not use this hook to update the error
})
```
This hook is useful if you need to do some custom error logging or add some
specific header in case of error.

It is not intended for changing the error, and calling `reply.send` will throw
an exception.

This hook will be executed before
the [Custom Error Handler set by `setErrorHandler`](./Server.md#seterrorhandler).

> ℹ️ Note: Unlike the other hooks, passing an error to the `done` function is not
> supported.

### onSend
If you are using the `onSend` hook, you can change the payload. For example:

```js
fastify.addHook('onSend', (request, reply, payload, done) => {
  const err = null;
  const newPayload = payload.replace('some-text', 'some-new-text')
  done(err, newPayload)
})
```
Or `async/await`:
```js
fastify.addHook('onSend', async (request, reply, payload) => {
  const newPayload = payload.replace('some-text', 'some-new-text')
  return newPayload
})
```

You can also clear the payload to send a response with an empty body by
replacing the payload with `null`:

```js
fastify.addHook('onSend', (request, reply, payload, done) => {
  reply.code(304)
  const newPayload = null
  done(null, newPayload)
})
```

> You can also send an empty body by replacing the payload with the empty string
> `''`, but be aware that this will cause the `Content-Length` header to be set
> to `0`, whereas the `Content-Length` header will not be set if the payload is
> `null`.

> ℹ️ Note: If you change the payload, you may only change it to a `string`, a
> `Buffer`, a `stream`, a `ReadableStream`, a `Response`, or `null`.


### onResponse
```js
fastify.addHook('onResponse', (request, reply, done) => {
  // Some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('onResponse', async (request, reply) => {
  // Some code
  await asyncMethod()
})
```

The `onResponse` hook is executed when a response has been sent, so you will not
be able to send more data to the client. It can however be useful for sending
data to external services, for example, to gather statistics.

> ℹ️ Note: Setting `disableRequestLogging` to `true` will disable any error log
> inside the `onResponse` hook. In this case use `try - catch` to log errors.

### onTimeout

```js
fastify.addHook('onTimeout', (request, reply, done) => {
  // Some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('onTimeout', async (request, reply) => {
  // Some code
  await asyncMethod()
})
```
`onTimeout` is useful if you need to monitor the request timed out in your
service (if the `connectionTimeout` property is set on the Fastify instance).
The `onTimeout` hook is executed when a request is timed out and the HTTP socket
has been hung up. Therefore, you will not be able to send data to the client.

### onRequestAbort

```js
fastify.addHook('onRequestAbort', (request, done) => {
  // Some code
  done()
})
```
Or `async/await`:
```js
fastify.addHook('onRequestAbort', async (request) => {
  // Some code
  await asyncMethod()
})
```
The `onRequestAbort` hook is executed when a client closes the connection before
the entire request has been processed. Therefore, you will not be able to send
data to the client.

> ℹ️ Note: Client abort detection is not completely reliable.
> See: [`Detecting-When-Clients-Abort.md`](../Guides/Detecting-When-Clients-Abort.md)

### Manage Errors from a hook
If you get an error during the execution of your hook, just pass it to `done()`
and Fastify will automatically close the request and send the appropriate error
code to the user.

```js
fastify.addHook('onRequest', (request, reply, done) => {
  done(new Error('Some error'))
})
```

If you want to pass a custom error code to the user, just use `reply.code()`:
```js
fastify.addHook('preHandler', (request, reply, done) => {
  reply.code(400)
  done(new Error('Some error'))
})
```
*The error will be handled by [`Reply`](./Reply.md#errors).*

Or if you're using `async/await` you can just throw an error:
```js
fastify.addHook('onRequest', async (request, reply) => {
  throw new Error('Some error')
})
```

### Respond to a request from a hook

If needed, you can respond to a request before you reach the route handler, for
example when implementing an authentication hook. Replying from a hook implies
that the hook chain is __stopped__ and the rest of the hooks and handlers are
not executed. If the hook is using the callback approach, i.e. it is not an
`async` function or it returns a `Promise`, it is as simple as calling
`reply.send()` and avoiding calling the callback. If the hook is `async`,
`reply.send()` __must__ be called _before_ the function returns or the promise
resolves, otherwise, the request will proceed. When `reply.send()` is called
outside of the promise chain, it is important to `return reply` otherwise the
request will be executed twice.

It is important to __not mix callbacks and `async`/`Promise`__, otherwise the
hook chain will be executed twice.

If you are using `onRequest` or `preHandler` use `reply.send`.

```js
fastify.addHook('onRequest', (request, reply, done) => {
  reply.send('Early response')
})

// Works with async functions too
fastify.addHook('preHandler', async (request, reply) => {
  setTimeout(() => {
    reply.send({ hello: 'from prehandler' })
  })
  return reply // mandatory, so the request is not executed further
// Commenting the line above will allow the hooks to continue and fail with FST_ERR_REP_ALREADY_SENT
})
```

If you want to respond with a stream, you should avoid using an `async` function
for the hook. If you must use an `async` function, your code will need to follow
the pattern in
[test/hooks-async.js](https://github.com/fastify/fastify/blob/94ea67ef2d8dce8a955d510cd9081aabd036fa85/test/hooks-async.js#L269-L275).

```js
fastify.addHook('onRequest', (request, reply, done) => {
  const stream = fs.createReadStream('some-file', 'utf8')
  reply.send(stream)
})
```

If you are sending a response without `await` on it, make sure to always `return
reply`:

```js
fastify.addHook('preHandler', async (request, reply) => {
  setImmediate(() => { reply.send('hello') })

  // This is needed to signal the handler to wait for a response
  // to be sent outside of the promise chain
  return reply
})

fastify.addHook('preHandler', async (request, reply) => {
  // the @fastify/static plugin will send a file asynchronously,
  // so we should return reply
  reply.sendFile('myfile')
  return reply
})
```

## Application Hooks

You can hook into the application-lifecycle as well.

- [onReady](#onready)
- [onListen](#onlisten)
- [onClose](#onclose)
- [preClose](#preclose)
- [onRoute](#onroute)
- [onRegister](#onregister)

### onReady
Triggered before the server starts listening for requests and when `.ready()` is
invoked. It cannot change the routes or add new hooks. Registered hook functions
are executed serially. Only after all `onReady` hook functions have completed
will the server start listening for requests. Hook functions accept one
argument: a callback, `done`, to be invoked after the hook function is complete.
Hook functions are invoked with `this` bound to the associated Fastify instance.

```js
// callback style
fastify.addHook('onReady', function (done) {
  // Some code
  const err = null;
  done(err)
})

// or async/await style
fastify.addHook('onReady', async function () {
  // Some async code
  await loadCacheFromDatabase()
})
```

### onListen

Triggered when the server starts listening for requests. The hooks run one
after another. If a hook function causes an error, it is logged and
ignored, allowing the queue of hooks to continue. Hook functions accept one
argument: a callback, `done`, to be invoked after the hook function is
complete. Hook functions are invoked with `this` bound to the associated
Fastify instance.

This is an alternative to `fastify.server.on('listening', () => {})`.

```js
// callback style
fastify.addHook('onListen', function (done) {
  // Some code
  const err = null;
  done(err)
})

// or async/await style
fastify.addHook('onListen', async function () {
  // Some async code
})
```

> ℹ️ Note: This hook will not run when the server is started using
> fastify.inject()` or `fastify.ready()`.

### onClose
<a id="on-close"></a>

Triggered when `fastify.close()` is invoked to stop the server, after all in-flight
HTTP requests have been completed.
It is useful when [plugins](./Plugins.md) need a "shutdown" event, for example,
to close an open connection to a database.

The hook function takes the Fastify instance as a first argument,
and a `done` callback for synchronous hook functions.
```js
// callback style
fastify.addHook('onClose', (instance, done) => {
  // Some code
  done()
})

// or async/await style
fastify.addHook('onClose', async (instance) => {
  // Some async code
  await closeDatabaseConnections()
})
```

### preClose
<a id="pre-close"></a>

Triggered when `fastify.close()` is invoked to stop the server, before all in-flight
HTTP requests have been completed.
It is useful when [plugins](./Plugins.md) have set up some state attached
to the HTTP server that would prevent the server to close.
_It is unlikely you will need to use this hook_,
use the [`onClose`](#onclose) for the most common case.

```js
// callback style
fastify.addHook('preClose', (done) => {
  // Some code
  done()
})

// or async/await style
fastify.addHook('preClose', async () => {
  // Some async code
  await removeSomeServerState()
})
```

### onRoute
<a id="on-route"></a>

Triggered when a new route is registered. Listeners are passed a [`routeOptions`](./Routes.md#routes-options)
object as the sole parameter. The interface is synchronous, and, as such, the
listeners are not passed a callback. This hook is encapsulated.

```js
fastify.addHook('onRoute', (routeOptions) => {
  //Some code
  routeOptions.method
  routeOptions.schema
  routeOptions.url // the complete URL of the route, it will include the prefix if any
  routeOptions.path // `url` alias
  routeOptions.routePath // the URL of the route without the prefix
  routeOptions.bodyLimit
  routeOptions.logLevel
  routeOptions.logSerializers
  routeOptions.prefix
})
```

If you are authoring a plugin and you need to customize application routes, like
modifying the options or adding new route hooks, this is the right place.

```js
fastify.addHook('onRoute', (routeOptions) => {
  function onPreSerialization(request, reply, payload, done) {
    // Your code
    done(null, payload)
  }
  // preSerialization can be an array or undefined
  routeOptions.preSerialization = [...(routeOptions.preSerialization || []), onPreSerialization]
})
```

To add more routes within an onRoute hook, the routes must
be tagged correctly. The hook will run into an infinite loop if
not tagged. The recommended approach is shown below.

```js
const kRouteAlreadyProcessed = Symbol('route-already-processed')

fastify.addHook('onRoute', function (routeOptions) {
  const { url, method } = routeOptions

  const isAlreadyProcessed = (routeOptions.custom && routeOptions.custom[kRouteAlreadyProcessed]) || false

  if (!isAlreadyProcessed) {
    this.route({
      url,
      method,
      custom: {
        [kRouteAlreadyProcessed]: true
      },
      handler: () => {}
    })
  }
})
```

For more details, see this [issue](https://github.com/fastify/fastify/issues/4319).

### onRegister
<a id="on-register"></a>

Triggered when a new plugin is registered and a new encapsulation context is
created. The hook will be executed **before** the registered code.

This hook can be useful if you are developing a plugin that needs to know when a
plugin context is formed, and you want to operate in that specific context, thus
this hook is encapsulated.

> ℹ️ Note: This hook will not be called if a plugin is wrapped inside
> [`fastify-plugin`](https://github.com/fastify/fastify-plugin).
```js
fastify.decorate('data', [])

fastify.register(async (instance, opts) => {
  instance.data.push('hello')
  console.log(instance.data) // ['hello']

  instance.register(async (instance, opts) => {
    instance.data.push('world')
    console.log(instance.data) // ['hello', 'world']
  }, { prefix: '/hola' })
}, { prefix: '/ciao' })

fastify.register(async (instance, opts) => {
  console.log(instance.data) // []
}, { prefix: '/hello' })

fastify.addHook('onRegister', (instance, opts) => {
  // Create a new array from the old one
  // but without keeping the reference
  // allowing the user to have encapsulated
  // instances of the `data` property
  instance.data = instance.data.slice()

  // the options of the new registered instance
  console.log(opts.prefix)
})
```

## Scope
<a id="scope"></a>

Except for [onClose](#onclose), all hooks are encapsulated. This means that you
can decide where your hooks should run by using `register` as explained in the
[plugins guide](../Guides/Plugins-Guide.md). If you pass a function, that
function is bound to the right Fastify context and from there you have full
access to the Fastify API.

```js
fastify.addHook('onRequest', function (request, reply, done) {
  const self = this // Fastify context
  done()
})
```

Note that the Fastify context in each hook is the same as the plugin where the
route was registered, for example:

```js
fastify.addHook('onRequest', async function (req, reply) {
  if (req.raw.url === '/nested') {
    assert.strictEqual(this.foo, 'bar')
  } else {
    assert.strictEqual(this.foo, undefined)
  }
})

fastify.get('/', async function (req, reply) {
  assert.strictEqual(this.foo, undefined)
  return { hello: 'world' }
})

fastify.register(async function plugin (fastify, opts) {
  fastify.decorate('foo', 'bar')

  fastify.get('/nested', async function (req, reply) {
    assert.strictEqual(this.foo, 'bar')
    return { hello: 'world' }
  })
})
```

Warn: if you declare the function with an [arrow
function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions),
the `this` will not be Fastify, but the one of the current scope.


## Route level hooks
<a id="route-hooks"></a>

You can declare one or more custom lifecycle hooks ([onRequest](#onrequest),
[onResponse](#onresponse), [preParsing](#preparsing),
[preValidation](#prevalidation), [preHandler](#prehandler),
[preSerialization](#preserialization), [onSend](#onsend),
[onTimeout](#ontimeout), and [onError](#onerror)) hook(s) that will be
**unique** for the route. If you do so, those hooks are always executed as the
last hook in their category.

This can be useful if you need to implement authentication, where the
[preParsing](#preparsing) or [preValidation](#prevalidation) hooks are exactly
what you need. Multiple route-level hooks can also be specified as an array.

```js
fastify.addHook('onRequest', (request, reply, done) => {
  // Your code
  done()
})

fastify.addHook('onResponse', (request, reply, done) => {
  // your code
  done()
})

fastify.addHook('preParsing', (request, reply, done) => {
  // Your code
  done()
})

fastify.addHook('preValidation', (request, reply, done) => {
  // Your code
  done()
})

fastify.addHook('preHandler', (request, reply, done) => {
  // Your code
  done()
})

fastify.addHook('preSerialization', (request, reply, payload, done) => {
  // Your code
  done(null, payload)
})

fastify.addHook('onSend', (request, reply, payload, done) => {
  // Your code
  done(null, payload)
})

fastify.addHook('onTimeout', (request, reply, done) => {
  // Your code
  done()
})

fastify.addHook('onError', (request, reply, error, done) => {
  // Your code
  done()
})

fastify.route({
  method: 'GET',
  url: '/',
  schema: { ... },
  onRequest: function (request, reply, done) {
    // This hook will always be executed after the shared `onRequest` hooks
    done()
  },
  // // Example with an async hook. All hooks support this syntax
  //
  // onRequest: async function (request, reply) {
  //  // This hook will always be executed after the shared `onRequest` hooks
  //  await ...
  // }
  onResponse: function (request, reply, done) {
    // this hook will always be executed after the shared `onResponse` hooks
    done()
  },
  preParsing: function (request, reply, done) {
    // This hook will always be executed after the shared `preParsing` hooks
    done()
  },
  preValidation: function (request, reply, done) {
    // This hook will always be executed after the shared `preValidation` hooks
    done()
  },
  preHandler: function (request, reply, done) {
    // This hook will always be executed after the shared `preHandler` hooks
    done()
  },
  // // Example with an array. All hooks support this syntax.
  //
  // preHandler: [function (request, reply, done) {
  //   // This hook will always be executed after the shared `preHandler` hooks
  //   done()
  // }],
  preSerialization: (request, reply, payload, done) => {
    // This hook will always be executed after the shared `preSerialization` hooks
    done(null, payload)
  },
  onSend: (request, reply, payload, done) => {
    // This hook will always be executed after the shared `onSend` hooks
    done(null, payload)
  },
  onTimeout: (request, reply, done) => {
    // This hook will always be executed after the shared `onTimeout` hooks
    done()
  },
  onError: (request, reply, error, done) => {
    // This hook will always be executed after the shared `onError` hooks
    done()
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})
```

> ℹ️ Note: Both options also accept an array of functions.

## Using Hooks to Inject Custom Properties
<a id="using-hooks-to-inject-custom-properties"></a>

You can use a hook to inject custom properties into incoming requests.
This is useful for reusing processed data from hooks in controllers.

A very common use case is, for example, checking user authentication based
on their token and then storing their recovered data into
the [Request](./Request.md) instance. This way, your controllers can read it
easily with `request.authenticatedUser` or whatever you want to call it.
That's how it might look like:

```js
fastify.addHook('preParsing', async (request) => {
  request.authenticatedUser = {
    id: 42,
    name: 'Jane Doe',
    role: 'admin'
  }
})

fastify.get('/me/is-admin', async function (req, reply) {
  return { isAdmin: req.authenticatedUser?.role === 'admin' || false }
})
```

Note that `.authenticatedUser` could actually be any property name
chosen by yourself. Using your own custom property prevents you
from mutating existing properties, which
would be a dangerous and destructive operation. So be careful and
make sure your property is entirely new, also using this approach
only for very specific and small cases like this example.

Regarding TypeScript in this example, you'd need to update the
`FastifyRequest` core interface to include your new property typing
(for more about it, see [TypeScript](./TypeScript.md) page), like:

```ts
interface AuthenticatedUser { /* ... */ }

declare module 'fastify' {
  export interface FastifyRequest {
    authenticatedUser?: AuthenticatedUser;
  }
}
```

Although this is a very pragmatic approach, if you're trying to do
something more complex that changes these core objects, then
consider creating a custom [Plugin](./Plugins.md) instead.

## Diagnostics Channel Hooks

One [`diagnostics_channel`](https://nodejs.org/api/diagnostics_channel.html)
publish event, `'fastify.initialization'`, happens at initialization time. The
Fastify instance is passed into the hook as a property of the object passed in.
At this point, the instance can be interacted with to add hooks, plugins,
routes, or any other sort of modification.

For example, a tracing package might do something like the following (which is,
of course, a simplification). This would be in a file loaded in the
initialization of the tracking package, in the typical "require instrumentation
tools first" fashion.

```js
const tracer = /* retrieved from elsewhere in the package */
const dc = require('node:diagnostics_channel')
const channel = dc.channel('fastify.initialization')
const spans = new WeakMap()

channel.subscribe(function ({ fastify }) {
  fastify.addHook('onRequest', (request, reply, done) => {
    const span = tracer.startSpan('fastify.request.handler')
    spans.set(request, span)
    done()
  })

  fastify.addHook('onResponse', (request, reply, done) => {
    const span = spans.get(request)
    span.finish()
    done()
  })
})
```

> ℹ️ Note: The TracingChannel class API is currently experimental and may undergo
> breaking changes even in semver-patch releases of Node.js.

Five other events are published on a per-request basis following the
[Tracing Channel](https://nodejs.org/api/diagnostics_channel.html#class-tracingchannel)
nomenclature. The list of the channel names and the event they receive is:

- `tracing:fastify.request.handler:start`: Always fires
  - `{ request: Request, reply: Reply, route: { url, method } }`
- `tracing:fastify.request.handler:end`: Always fires
  - `{ request: Request, reply: Reply, route: { url, method }, async: Bool }`
- `tracing:fastify.request.handler:asyncStart`: Fires for promise/async handlers
  - `{ request: Request, reply: Reply, route: { url, method } }`
- `tracing:fastify.request.handler:asyncEnd`: Fires for promise/async handlers
  - `{ request: Request, reply: Reply, route: { url, method } }`
- `tracing:fastify.request.handler:error`: Fires when an error occurs
  - `{ request: Request, reply: Reply, route: { url, method }, error: Error }`

The object instance remains the same for all events associated with a given
request. All payloads include a `request` and `reply` property which are an
instance of Fastify's `Request` and `Reply` instances. They also include a
`route` property which is an object with the matched `url` pattern (e.g.
`/collection/:id`) and the `method` HTTP method (e.g. `GET`). The `:start` and
`:end` events always fire for requests. If a request handler is an `async`
function or one that returns a `Promise` then the `:asyncStart` and `:asyncEnd`
events also fire. Finally, the `:error` event contains an `error` property
associated with the request's failure.

These events can be received like so:

```js
const dc = require('node:diagnostics_channel')
const channel = dc.channel('tracing:fastify.request.handler:start')
channel.subscribe((msg) => {
  console.log(msg.request, msg.reply)
})
```
````

## Source: https://fastify.dev/docs/latest/Reference/HTTP2
````markdown
<h1 align="center">Fastify</h1>

## HTTP2

_Fastify_ supports HTTP2 over HTTPS (h2) or plaintext (h2c).

Currently, none of the HTTP2-specific APIs are available through _Fastify_, but
Node's `req` and `res` can be accessed through the `Request` and `Reply`
interfaces. PRs are welcome.

### Secure (HTTPS)

HTTP2 is supported in all modern browsers __only over a secure connection__:

```js
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const fastify = require('fastify')({
  http2: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.cert'))
  }
})

fastify.get('/', function (request, reply) {
  reply.code(200).send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

[ALPN negotiation](https://datatracker.ietf.org/doc/html/rfc7301) allows
support for both HTTPS and HTTP/2 over the same socket.
Node core `req` and `res` objects can be either
[HTTP/1](https://nodejs.org/api/http.html) or
[HTTP/2](https://nodejs.org/api/http2.html). _Fastify_ supports this out of the
box:

```js
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const fastify = require('fastify')({
  http2: true,
  https: {
    allowHTTP1: true, // fallback support for HTTP1
    key: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.cert'))
  }
})

// this route can be accessed through both protocols
fastify.get('/', function (request, reply) {
  reply.code(200).send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

Test the new server with:

```
$ npx h2url https://localhost:3000
```

### Plain or insecure

For microservices, HTTP2 can connect in plain text, but this is not
supported by browsers.

```js
'use strict'

const fastify = require('fastify')({
  http2: true
})

fastify.get('/', function (request, reply) {
  reply.code(200).send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

Test the new server with:

```
$ npx h2url http://localhost:3000
```
````

## Source: https://fastify.dev/docs/latest/Reference/Index
````markdown
<h1 align="center">Fastify</h1>

## Core Documents
<a id="reference-core-docs"></a>

For the full table of contents (TOC), see [below](#reference-toc). The following
list is a subset of the full TOC that detail core Fastify APIs and concepts in
order of most likely importance to the reader:

+ [Server](./Server.md): Documents the core Fastify API. Includes documentation
  for the factory function and the object returned by the factory function.
+ [Lifecycle](./Lifecycle.md): Explains the Fastify request lifecycle and
  illustrates where [Hooks](./Hooks.md) are available for integrating with it.
+ [Routes](./Routes.md): Details how to register routes with Fastify and how
  Fastify builds and evaluates the routing trie.
+ [Request](./Request.md): Details Fastify's request object that is passed into
  each request handler.
+ [Reply](./Reply.md): Details Fastify's response object available to each
  request handler.
+ [Validation and Serialization](./Validation-and-Serialization.md): Details
  Fastify's support for validating incoming data and how Fastify serializes data
  for responses.
+ [Plugins](./Plugins.md): Explains Fastify's plugin architecture and API.
+ [Encapsulation](./Encapsulation.md): Explains a core concept upon which all
  Fastify plugins are built.
+ [Decorators](./Decorators.md): Explains the server, request, and response
  decorator APIs.
+ [Hooks](./Hooks.md): Details the API by which Fastify plugins can inject
  themselves into Fastify's handling of the request lifecycle.


## Reference Documentation Table Of Contents
<a id="reference-toc"></a>

This table of contents is in alphabetical order.

+ [Content Type Parser](./ContentTypeParser.md): Documents Fastify's default
  content type parser and how to add support for new content types.
+ [Decorators](./Decorators.md): Explains the server, request, and response
  decorator APIs.
+ [Encapsulation](./Encapsulation.md): Explains a core concept upon which all
  Fastify plugins are built.
+ [Errors](./Errors.md): Details how Fastify handles errors and lists the
  standard set of errors Fastify generates.
+ [Hooks](./Hooks.md): Details the API by which Fastify plugins can inject
  themselves into Fastify's handling of the request lifecycle.
+ [HTTP2](./HTTP2.md): Details Fastify's HTTP2 support.
+ [Lifecycle](./Lifecycle.md): Explains the Fastify request lifecycle and
  illustrates where [Hooks](./Hooks.md) are available for integrating with it.
+ [Logging](./Logging.md): Details Fastify's included logging and how to
  customize it.
+ [Long Term Support](./LTS.md): Explains Fastify's long term support (LTS)
  guarantee and the exceptions possible to the [semver](https://semver.org)
  contract.
+ [Middleware](./Middleware.md): Details Fastify's support for Express.js style
  middleware.
+ [Plugins](./Plugins.md): Explains Fastify's plugin architecture and API.
+ [Reply](./Reply.md): Details Fastify's response object available to each
  request handler.
+ [Request](./Request.md): Details Fastify's request object that is passed into
  each request handler.
+ [Routes](./Routes.md): Details how to register routes with Fastify and how
  Fastify builds and evaluates the routing trie.
+ [Server](./Server.md): Documents the core Fastify API. Includes documentation
  for the factory function and the object returned by the factory function.
+ [TypeScript](./TypeScript.md): Documents Fastify's TypeScript support and
  provides recommendations for writing applications in TypeScript that utilize
  Fastify.
+ [Validation and Serialization](./Validation-and-Serialization.md): Details
  Fastify's support for validating incoming data and how Fastify serializes data
  for responses.
+ [Warnings](./Warnings.md): Details the warnings Fastify emits and how to
  solve them.
````

## Source: https://fastify.dev/docs/latest/Reference/Lifecycle
````markdown
<h1 align="center">Fastify</h1>

## Lifecycle
<a id="lifecycle"></a>

This schema shows the internal lifecycle of Fastify.

The right branch of each section shows the next phase of the lifecycle. The left
branch shows the corresponding error code generated if the parent throws an
error. All errors are automatically handled by Fastify.

```
Incoming Request
  │
  └─▶ Routing
        │
        └─▶ Instance Logger
             │
   4**/5** ◀─┴─▶ onRequest Hook
                  │
        4**/5** ◀─┴─▶ preParsing Hook
                        │
              4**/5** ◀─┴─▶ Parsing
                             │
                   4**/5** ◀─┴─▶ preValidation Hook
                                  │
                            400 ◀─┴─▶ Validation
                                        │
                              4**/5** ◀─┴─▶ preHandler Hook
                                              │
                                    4**/5** ◀─┴─▶ User Handler
                                                    │
                                                    └─▶ Reply
                                                          │
                                                4**/5** ◀─┴─▶ preSerialization Hook
                                                                │
                                                                └─▶ onSend Hook
                                                                      │
                                                            4**/5** ◀─┴─▶ Outgoing Response
                                                                            │
                                                                            └─▶ onResponse Hook
```

Before or during the `User Handler`, `reply.hijack()` can be called to:
- Prevent Fastify from running subsequent hooks and the user handler
- Prevent Fastify from sending the response automatically

If `reply.raw` is used to send a response, `onResponse` hooks will still
be executed.

## Reply Lifecycle
<a id="reply-lifecycle"></a>

When the user handles the request, the result may be:

- In an async handler: it returns a payload or throws an `Error`
- In a sync handler: it sends a payload or an `Error` instance

If the reply was hijacked, all subsequent steps are skipped. Otherwise, when
submitted, the data flow is as follows:

```
                        ★ schema validation Error
                                    │
                                    └─▶ schemaErrorFormatter
                                               │
                          reply sent ◀── JSON ─┴─ Error instance
                                                      │
                                                      │         ★ throw an Error
                     ★ send or return                 │                 │
                            │                         │                 │
                            │                         ▼                 │
       reply sent ◀── JSON ─┴─ Error instance ──▶ onError Hook ◀───────┘
                                                      │
                                 reply sent ◀── JSON ─┴─ Error instance ──▶ setErrorHandler
                                                                                │
                                                                                └─▶ reply sent
```

`reply sent` means the JSON payload will be serialized by one of the following:
- The [reply serializer](./Server.md#setreplyserializer) if set
- The [serializer compiler](./Server.md#setserializercompiler) if a JSON schema
  is set for the HTTP status code
- The default `JSON.stringify` function
````

## Source: https://fastify.dev/docs/latest/Reference/Logging
````markdown
<h1 align="center">Fastify</h1>

## Logging

### Enable Logging
Logging is disabled by default. Enable it by passing `{ logger: true }` or
`{ logger: { level: 'info' } }` when creating a Fastify instance. Note that if
the logger is disabled, it cannot be enabled at runtime.
[abstract-logging](https://www.npmjs.com/package/abstract-logging) is used for
this purpose.

As Fastify is focused on performance, it uses
[pino](https://github.com/pinojs/pino) as its logger, with the default log
level set to `'info'` when enabled.

#### Basic logging setup
Enabling the production JSON logger:

```js
const fastify = require('fastify')({
  logger: true
})
```

#### Environment-Specific Configuration
Enabling the logger with appropriate configuration for local development,
production, and test environments requires more configuration:

```js
const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}
const fastify = require('fastify')({
  logger: envToLogger[environment] ?? true // defaults to true if no entry matches in the map
})
```
⚠️ `pino-pretty` needs to be installed as a dev dependency. It is not included
by default for performance reasons.

### Usage
The logger can be used in route handlers as follows:

```js
fastify.get('/', options, function (request, reply) {
  request.log.info('Some info about the current request')
  reply.send({ hello: 'world' })
})
```

Trigger new logs outside route handlers using the Pino instance from the Fastify
instance:
```js
fastify.log.info('Something important happened!');
```

#### Passing Logger Options
To pass options to the logger, provide them to Fastify. See the
[Pino documentation](https://github.com/pinojs/pino/blob/master/docs/api.md#options)
for available options. To specify a file destination, use:

```js
const fastify = require('fastify')({
  logger: {
    level: 'info',
    file: '/path/to/file' // Will use pino.destination()
  }
})

fastify.get('/', options, function (request, reply) {
  request.log.info('Some info about the current request')
  reply.send({ hello: 'world' })
})
```

To pass a custom stream to the Pino instance, add a `stream` field to the logger
object:

```js
const split = require('split2')
const stream = split(JSON.parse)

const fastify = require('fastify')({
  logger: {
    level: 'info',
    stream: stream
  }
})
```

### Advanced Logger Configuration

<a id="logging-request-id"></a>
#### Request ID Tracking
By default, Fastify adds an ID to every request for easier tracking. If the
`requestIdHeader` option is set and the corresponding header is present, its
value is used; otherwise, a new incremental ID is generated. See Fastify Factory
[`requestIdHeader`](./Server.md#factory-request-id-header) and Fastify Factory
[`genReqId`](./Server.md#genreqid) for customization options.

#### Serializers
The default logger uses standard serializers for objects with `req`, `res`, and
`err` properties. The `req` object is the Fastify [`Request`](./Request.md)
object, and the `res` object is the Fastify [`Reply`](./Reply.md) object. This
behavior can be customized with custom serializers.

```js
const fastify = require('fastify')({
  logger: {
    serializers: {
      req (request) {
        return { url: request.url }
      }
    }
  }
})
```
For example, the response payload and headers could be logged using the approach
below (not recommended):

```js
const fastify = require('fastify')({
  logger: {
    transport: {
      target: 'pino-pretty'
    },
    serializers: {
      res (reply) {
        // The default
        return {
          statusCode: reply.statusCode
        }
      },
      req (request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routeOptions.url,
          parameters: request.params,
          // Including headers in the log could violate privacy laws,
          // e.g., GDPR. Use the "redact" option to remove sensitive
          // fields. It could also leak authentication data in the logs.
          headers: request.headers
        };
      }
    }
  }
});
```

> ℹ️ Note: In some cases, the [`Reply`](./Reply.md) object passed to the `res`
> serializer cannot be fully constructed. When writing a custom `res`
> serializer, check for the existence of any properties on `reply` aside from
> `statusCode`, which is always present. For example, verify the existence of
> `getHeaders` before calling it:

```js
const fastify = require('fastify')({
  logger: {
    transport: {
      target: 'pino-pretty'
    },
    serializers: {
      res (reply) {
        // The default
        return {
          statusCode: reply.statusCode,
          headers: typeof reply.getHeaders === 'function'
            ? reply.getHeaders()
            : {}
        }
      },
    }
  }
});
```

> ℹ️ Note: The body cannot be serialized inside a `req` method because the
request is serialized when the child logger is created. At that time, the body
is not yet parsed.

See the following approach to log `req.body`:

```js
app.addHook('preHandler', function (req, reply, done) {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body')
  }
  done()
})
```

> ℹ️ Note: Ensure serializers never throw errors, as this can cause the Node
> process to exit. See the
> [Pino documentation](https://getpino.io/#/docs/api?id=opt-serializers) for more
> information.

*Any logger other than Pino will ignore this option.*

### Using Custom Loggers
A custom logger instance can be supplied by passing it as `loggerInstance`. The
logger must conform to the Pino interface, with methods: `info`, `error`,
`debug`, `fatal`, `warn`, `trace`, `silent`, `child`, and a string property
`level`.

Example:

```js
const log = require('pino')({ level: 'info' })
const fastify = require('fastify')({ loggerInstance: log })

log.info('does not have request information')

fastify.get('/', function (request, reply) {
  request.log.info('includes request information, but is the same logger instance as `log`')
  reply.send({ hello: 'world' })
})
```

*The logger instance for the current request is available in every part of the
[lifecycle](./Lifecycle.md).*

### Log Redaction

[Pino](https://getpino.io) supports low-overhead log redaction for obscuring
values of specific properties in recorded logs. For example, log all HTTP
headers except the `Authorization` header for security:

```js
const fastify = Fastify({
  logger: {
    stream: stream,
    redact: ['req.headers.authorization'],
    level: 'info',
    serializers: {
      req (request) {
        return {
          method: request.method,
          url: request.url,
          headers: request.headers,
          host: request.host,
          remoteAddress: request.ip,
          remotePort: request.socket.remotePort
        }
      }
    }
  }
})
```

See https://getpino.io/#/docs/redaction for more details.
````

## Source: https://fastify.dev/docs/latest/Reference/LTS
````markdown
<h1 align="center">Fastify</h1>

## Long Term Support
<a id="lts"></a>

Fastify's Long Term Support (LTS) is provided according to the schedule laid out
in this document:

1. Major releases, "X" release of [semantic versioning][semver] X.Y.Z release
   versions, are supported for a minimum period of six months from their release
   date. The release date of any specific version can be found at
   [https://github.com/fastify/fastify/releases](https://github.com/fastify/fastify/releases).
2. Major releases will receive security updates for an additional six months
   from the release of the next major release. After this period we will still
   review and release security fixes as long as they are provided by the
   community and they do not violate other constraints, e.g. minimum supported
   Node.js version.
3. Major releases will be tested and verified against all Node.js release lines
   that are supported by the [Node.js LTS
   policy](https://github.com/nodejs/Release) within the LTS period of that
   given Fastify release line. This implies that only the latest Node.js release
   of a given line is supported.
4. In addition to Node.js runtime, major releases of Fastify will also be tested
   and verified against alternative runtimes that are compatible with Node.js.
   The maintenance teams of these alternative runtimes are responsible for ensuring
   and guaranteeing these tests work properly.
   1. [N|Solid](https://docs.nodesource.com/docs/product_suite) tests and
      verifies each Fastify major release against current N|Solid LTS versions.
      NodeSource ensures Fastify compatibility with N|Solid, aligning with the
      support scope of N|Solid LTS versions at the time of the Fastify release.
      This guarantees N|Solid users can confidently use Fastify.

A "month" is defined as 30 consecutive days.

> ## Security Releases and Semver
>
> As a consequence of providing long-term support for major releases, there are
> occasions where we need to release breaking changes as a _minor_ version
> release. Such changes will _always_ be noted in the [release
> notes](https://github.com/fastify/fastify/releases).
> 
> To avoid automatically receiving breaking security updates it is possible to
> use the tilde (`~`) range qualifier. For example, to get patches for the 3.15
> release, and avoid automatically updating to the 3.16 release, specify the
> dependency as `"fastify": "~3.15.x"`. This will leave your application
> vulnerable, so please use it with caution.

### Security Support Beyond LTS

Fastify's partner, HeroDevs, provides commercial security support through the
OpenJS Ecosystem Sustainability Program for versions of Fastify that are EOL.
For more information, see their [Never Ending Support][hd-link] service.

### Schedule
<a id="lts-schedule"></a>

| Version | Release Date | End Of LTS Date | Node.js            | Nsolid(Node)   |
| :------ | :----------- | :-------------- | :----------------- | :------------- |
| 1.0.0   | 2018-03-06   | 2019-09-01      | 6, 8, 9, 10, 11    |                |
| 2.0.0   | 2019-02-25   | 2021-01-31      | 6, 8, 10, 12, 14   |                |
| 3.0.0   | 2020-07-07   | 2023-06-30      | 10, 12, 14, 16, 18 | v5(18)         |
| 4.0.0   | 2022-06-08   | 2025-06-30      | 14, 16, 18, 20, 22 | v5(18), v5(20) |
| 5.0.0   | 2024-09-17   | TBD             | 20, 22             | v5(20)         |

### CI tested operating systems
<a id="supported-os"></a>

Fastify uses GitHub Actions for CI testing, please refer to [GitHub&#39;s
documentation regarding workflow
runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources)
for further details on what the latest virtual environment is in relation to the
YAML workflow labels below:

| OS      | YAML Workflow Label | Package Manager | Node.js     | Nsolid(Node)  |
| ------- | ------------------- | --------------- | ----------- | ------------- |
| Linux   | `ubuntu-latest`     | npm             | 20          | v5(20)        |
| Linux   | `ubuntu-latest`     | yarn,pnpm       | 20          | v5(20)        |
| Windows | `windows-latest`    | npm             | 20          | v5(20)        |
| MacOS   | `macos-latest`      | npm             | 20          | v5(20)        |

Using [yarn](https://yarnpkg.com/) might require passing the `--ignore-engines`
flag.

[semver]: https://semver.org/

[hd-link]: https://www.herodevs.com/support/fastify-nes?utm_source=fastify&utm_medium=link&utm_campaign=eol_support_fastify
````

## Source: https://fastify.dev/docs/latest/Reference/Middleware
````markdown
<h1 align="center">Fastify</h1>

## Middleware

Starting with Fastify v3.0.0, middleware is not supported out of the box and
requires an external plugin such as
[`@fastify/express`](https://github.com/fastify/fastify-express) or
[`@fastify/middie`](https://github.com/fastify/middie).


An example of registering the
[`@fastify/express`](https://github.com/fastify/fastify-express) plugin to `use`
Express middleware:

```js
await fastify.register(require('@fastify/express'))
fastify.use(require('cors')())
fastify.use(require('dns-prefetch-control')())
fastify.use(require('frameguard')())
fastify.use(require('hsts')())
fastify.use(require('ienoopen')())
fastify.use(require('x-xss-protection')())
```

[`@fastify/middie`](https://github.com/fastify/middie) can also be used,
which provides support for simple Express-style middleware with improved
performance:

```js
await fastify.register(require('@fastify/middie'))
fastify.use(require('cors')())
```

Middleware can be encapsulated, allowing control over where it runs using
`register` as explained in the [plugins guide](../Guides/Plugins-Guide.md).

Fastify middleware does not expose the `send` method or other methods specific
to the Fastify [Reply](./Reply.md#reply) instance. This is because Fastify wraps
the incoming `req` and `res` Node instances using the
[Request](./Request.md#request) and [Reply](./Reply.md#reply) objects
internally, but this is done after the middleware phase. To create middleware,
use the Node `req` and `res` instances. Alternatively, use the `preHandler` hook
that already has the Fastify [Request](./Request.md#request) and
[Reply](./Reply.md#reply) instances. For more information, see
[Hooks](./Hooks.md#hooks).

#### Restrict middleware execution to certain paths
<a id="restrict-usage"></a>

To run middleware under certain paths, pass the path as the first parameter to
`use`.

> ℹ️ Note: This does not support routes with parameters
> (e.g. `/user/:id/comments`) and wildcards are not supported in multiple paths.

```js
const path = require('node:path')
const serveStatic = require('serve-static')

// Single path
fastify.use('/css', serveStatic(path.join(__dirname, '/assets')))

// Wildcard path
fastify.use('/css/(.*)', serveStatic(path.join(__dirname, '/assets')))

// Multiple paths
fastify.use(['/css', '/js'], serveStatic(path.join(__dirname, '/assets')))
```

### Alternatives

Fastify offers alternatives to commonly used middleware, such as
[`@fastify/helmet`](https://github.com/fastify/fastify-helmet) for
[`helmet`](https://github.com/helmetjs/helmet),
[`@fastify/cors`](https://github.com/fastify/fastify-cors) for
[`cors`](https://github.com/expressjs/cors), and
[`@fastify/static`](https://github.com/fastify/fastify-static) for
[`serve-static`](https://github.com/expressjs/serve-static).
````

## Source: https://fastify.dev/docs/latest/Reference/Plugins
````markdown
<h1 align="center">Fastify</h1>

## Plugins
Fastify can be extended with plugins, which can be a set of routes, a server
[decorator](./Decorators.md), or other functionality. Use the `register` API to
add one or more plugins.

By default, `register` creates a *new scope*, meaning changes to the Fastify
instance (via `decorate`) will not affect the current context ancestors, only
its descendants. This feature enables plugin *encapsulation* and *inheritance*,
creating a *directed acyclic graph* (DAG) and avoiding cross-dependency issues.

The [Getting Started](../Guides/Getting-Started.md#your-first-plugin) guide
includes an example of using this API:
```js
fastify.register(plugin, [options])
```

### Plugin Options
<a id="plugin-options"></a>

The optional `options` parameter for `fastify.register` supports a predefined
set of options that Fastify itself will use, except when the plugin has been
wrapped with [fastify-plugin](https://github.com/fastify/fastify-plugin). This
options object will also be passed to the plugin upon invocation, regardless of
whether or not the plugin has been wrapped. The currently supported list of
Fastify specific options is:

+ [`logLevel`](./Routes.md#custom-log-level)
+ [`logSerializers`](./Routes.md#custom-log-serializer)
+ [`prefix`](#route-prefixing-option)

These options will be ignored when used with fastify-plugin.

To avoid collisions, a plugin should consider namespacing its options. For
example, a plugin `foo` might be registered like so:

```js
fastify.register(require('fastify-foo'), {
  prefix: '/foo',
  foo: {
    fooOption1: 'value',
    fooOption2: 'value'
  }
})
```

If collisions are not a concern, the plugin may accept the options object as-is:

```js
fastify.register(require('fastify-foo'), {
  prefix: '/foo',
  fooOption1: 'value',
  fooOption2: 'value'
})
```

The `options` parameter can also be a `Function` evaluated at plugin registration,
providing access to the Fastify instance via the first argument:

```js
const fp = require('fastify-plugin')

fastify.register(fp((fastify, opts, done) => {
  fastify.decorate('foo_bar', { hello: 'world' })

  done()
}))

// The opts argument of fastify-foo will be { hello: 'world' }
fastify.register(require('fastify-foo'), parent => parent.foo_bar)
```

The Fastify instance passed to the function is the latest state of the **external
Fastify instance** the plugin was declared on, allowing access to variables
injected via [`decorate`](./Decorators.md) by preceding plugins according to the
**order of registration**. This is useful if a plugin depends on changes made to
the Fastify instance by a preceding plugin, such as utilizing an existing database
connection.

Keep in mind that the Fastify instance passed to the function is the same as the
one passed into the plugin, a copy of the external Fastify instance rather than a
reference. Any usage of the instance will behave the same as it would if called
within the plugin's function. For example, if `decorate` is called, the decorated
variables will be available within the plugin's function unless it was wrapped
with [`fastify-plugin`](https://github.com/fastify/fastify-plugin).

#### Route Prefixing option
<a id="route-prefixing-option"></a>

If an option with the key `prefix` and a `string` value is passed, Fastify will
use it to prefix all the routes inside the register. For more info, check
[here](./Routes.md#route-prefixing).

Be aware that if routes are wrapped with
[`fastify-plugin`](https://github.com/fastify/fastify-plugin), this option will
not work (see the [workaround](./Routes.md#fastify-plugin)).

#### Error handling
<a id="error-handling"></a>

Error handling is done by [avvio](https://github.com/mcollina/avvio#error-handling).

As a general rule, handle errors in the next `after` or `ready` block, otherwise
they will be caught inside the `listen` callback.

```js
fastify.register(require('my-plugin'))

// `after` will be executed once
// the previous declared `register` has finished
fastify.after(err => console.log(err))

// `ready` will be executed once all the registers declared
// have finished their execution
fastify.ready(err => console.log(err))

// `listen` is a special ready,
// so it behaves in the same way
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) console.log(err)
})
```

### async/await
<a id="async-await"></a>

*async/await* is supported by `after`, `ready`, and `listen`, as well as
`fastify` being a Thenable.

```js
await fastify.register(require('my-plugin'))

await fastify.after()

await fastify.ready()

await fastify.listen({ port: 3000 })
```
Using `await` when registering a plugin loads the plugin and its dependencies,
"finalizing" the encapsulation process. Any mutations to the plugin after it and
its dependencies have been loaded will not be reflected in the parent instance.

#### ESM support
<a id="esm-support"></a>

ESM is supported from [Node.js `v13.3.0`](https://nodejs.org/api/esm.html)
and above.

```js
// main.mjs
import Fastify from 'fastify'
const fastify = Fastify()

fastify.register(import('./plugin.mjs'))

fastify.listen({ port: 3000 }, console.log)


// plugin.mjs
async function plugin (fastify, opts) {
  fastify.get('/', async (req, reply) => {
    return { hello: 'world' }
  })
}

export default plugin
```

### Create a plugin
<a id="create-plugin"></a>

Creating a plugin is easy. Create a function that takes three parameters: the
`fastify` instance, an `options` object, and the `done` callback.

Example:
```js
module.exports = function (fastify, opts, done) {
  fastify.decorate('utility', function () {})

  fastify.get('/', handler)

  done()
}
```
`register` can also be used inside another `register`:
```js
module.exports = function (fastify, opts, done) {
  fastify.decorate('utility', function () {})

  fastify.get('/', handler)

  fastify.register(require('./other-plugin'))

  done()
}
```

Remember, `register` always creates a new Fastify scope. If this is not needed,
read the following section.

### Handle the scope
<a id="handle-scope"></a>

If `register` is used only to extend server functionality with
[`decorate`](./Decorators.md), tell Fastify not to create a new scope. Otherwise,
changes will not be accessible in the upper scope.

There are two ways to avoid creating a new context:
- Use the [`fastify-plugin`](https://github.com/fastify/fastify-plugin) module
- Use the `'skip-override'` hidden property

Using the `fastify-plugin` module is recommended, as it solves this problem and
allows passing a version range of Fastify that the plugin will support:
```js
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, opts, done) {
  fastify.decorate('utility', function () {})
  done()
}, '0.x')
```
Check the [`fastify-plugin`](https://github.com/fastify/fastify-plugin)
documentation to learn more about how to use this module.

If not using `fastify-plugin`, the `'skip-override'` hidden property can be used,
but it is not recommended. Future Fastify API changes will be your responsibility
to update, whilst `fastify-plugin` ensures backward compatibility.
```js
function yourPlugin (fastify, opts, done) {
  fastify.decorate('utility', function () {})
  done()
}
yourPlugin[Symbol.for('skip-override')] = true
module.exports = yourPlugin
```
````

## Source: https://fastify.dev/docs/latest/Reference/Principles
````markdown
# Technical Principles

Every decision in the Fastify framework and its official plugins is guided by
the following technical principles:

1. “Zero” overhead in production
2. “Good” developer experience
3. Works great for small & big projects alike
4. Easy to migrate to microservices (or even serverless) and back
5. Security & data validation
6. If something could be a plugin, it likely should be
7. Easily testable
8. Do not monkeypatch core
9. Semantic versioning & Long Term Support
10. Specification adherence

## "Zero" Overhead in Production

Fastify aims to implement features with minimal overhead. This is achieved by
using fast algorithms, data structures, and JavaScript-specific features.

Since JavaScript does not offer zero-overhead data structures, this principle
can conflict with providing a great developer experience and additional features,
as these usually incur some overhead.

## "Good" Developer Experience

Fastify aims to provide the best developer experience at its performance point.
It offers a great out-of-the-box experience that is flexible enough to adapt to
various situations.

For example, binary addons are forbidden because most JavaScript developers do
not have access to a compiler.

## Works great for small and big projects alike

Most applications start small and become more complex over time. Fastify aims to
grow with this complexity, providing advanced features to structure codebases.

## Easy to migrate to microservices (or even serverless) and back

Route deployment should not matter. The framework should "just work".

## Security and Data Validation

A web framework is the first point of contact with untrusted data and must act
as the first line of defense for the system.

## If something could be a plugin, it likely should

Recognizing the infinite use cases for an HTTP framework, catering to all in a
single module would make the codebase unmaintainable. Therefore, hooks and
options are provided to customize the framework as needed.

## Easily testable

Testing Fastify applications should be a first-class concern.

## Do not monkeypatch core

Monkeypatching Node.js APIs or installing globals that alter the runtime makes
building modular applications harder and limits Fastify's use cases. Other
frameworks do this; Fastify does not.

## Semantic Versioning and Long Term Support

A clear [Long Term Support strategy is provided](./LTS.md) to inform developers when
to upgrade.

## Specification adherence

In doubt, we chose the strict behavior as defined by the relevant
Specifications.
````

## Source: https://fastify.dev/docs/latest/Reference/Reply
````markdown
<h1 align="center">Fastify</h1>

## Reply
- [Reply](#reply)
  - [Introduction](#introduction)
  - [.code(statusCode)](#codestatuscode)
  - [.elapsedTime](#elapsedtime)
  - [.statusCode](#statuscode)
  - [.server](#server)
  - [.header(key, value)](#headerkey-value)
  - [.headers(object)](#headersobject)
  - [.getHeader(key)](#getheaderkey)
  - [.getHeaders()](#getheaders)
  - [.removeHeader(key)](#removeheaderkey)
  - [.hasHeader(key)](#hasheaderkey)
  - [.writeEarlyHints(hints, callback)](#writeearlyhintshints-callback)
  - [.trailer(key, function)](#trailerkey-function)
  - [.hasTrailer(key)](#hastrailerkey)
  - [.removeTrailer(key)](#removetrailerkey)
  - [.redirect(dest, [code ,])](#redirectdest--code)
  - [.callNotFound()](#callnotfound)
  - [.type(contentType)](#typecontenttype)
  - [.getSerializationFunction(schema | httpStatus, [contentType])](#getserializationfunctionschema--httpstatus)
  - [.compileSerializationSchema(schema, [httpStatus], [contentType])](#compileserializationschemaschema-httpstatus)
  - [.serializeInput(data, [schema | httpStatus], [httpStatus], [contentType])](#serializeinputdata-schema--httpstatus-httpstatus)
  - [.serializer(func)](#serializerfunc)
  - [.raw](#raw)
  - [.sent](#sent)
  - [.hijack()](#hijack)
  - [.send(data)](#senddata)
    - [Objects](#objects)
    - [Strings](#strings)
    - [Streams](#streams)
    - [Buffers](#buffers)
    - [TypedArrays](#typedarrays)
    - [ReadableStream](#readablestream)
    - [Response](#response)
    - [Errors](#errors)
    - [Type of the final payload](#type-of-the-final-payload)
    - [Async-Await and Promises](#async-await-and-promises)
  - [.then(fulfilled, rejected)](#thenfulfilled-rejected)

### Introduction
<a id="introduction"></a>

The second parameter of the handler function is `Reply`. Reply is a core Fastify
object that exposes the following functions and properties:

- `.code(statusCode)` - Sets the status code.
- `.status(statusCode)` - An alias for `.code(statusCode)`.
- `.statusCode` - Read and set the HTTP status code.
- `.elapsedTime` - Returns the amount of time passed
since the request was received by Fastify.
- `.server` - A reference to the fastify instance object.
- `.header(name, value)` - Sets a response header.
- `.headers(object)` - Sets all the keys of the object as response headers.
- `.getHeader(name)` - Retrieve value of already set header.
- `.getHeaders()` - Gets a shallow copy of all current response headers.
- `.removeHeader(key)` - Remove the value of a previously set header.
- `.hasHeader(name)` - Determine if a header has been set.
- `.writeEarlyHints(hints, callback)` - Sends early hints to the user
  while the response is being prepared.
- `.trailer(key, function)` - Sets a response trailer.
- `.hasTrailer(key)` - Determine if a trailer has been set.
- `.removeTrailer(key)` - Remove the value of a previously set trailer.
- `.type(value)` - Sets the header `Content-Type`.
- `.redirect(dest, [code,])` - Redirect to the specified URL, the status code is
  optional (defaults to `302`).
- `.callNotFound()` - Invokes the custom not found handler.
- `.serialize(payload)` - Serializes the specified payload using the default
  JSON serializer or using the custom serializer (if one is set) and returns the
  serialized payload.
- `.getSerializationFunction(schema | httpStatus, [contentType])` - Returns the serialization
  function for the specified schema or http status, if any of either are set.
- `.compileSerializationSchema(schema, [httpStatus], [contentType])` - Compiles
  the specified schema and returns a serialization function using the default
  (or customized) `SerializerCompiler`. The optional `httpStatus` is forwarded
  to the `SerializerCompiler` if provided, default to `undefined`.
- `.serializeInput(data, schema, [,httpStatus], [contentType])` - Serializes
  the specified data using the specified schema and returns the serialized payload.
  If the optional `httpStatus`, and `contentType` are provided, the function
  will use the serializer function given for that specific content type and
  HTTP Status Code. Default to `undefined`.
- `.serializer(function)` - Sets a custom serializer for the payload.
- `.send(payload)` - Sends the payload to the user, could be a plain text, a
  buffer, JSON, stream, or an Error object.
- `.sent` - A boolean value that you can use if you need to know if `send` has
  already been called.
- `.hijack()` - interrupt the normal request lifecycle.
- `.raw` - The
  [`http.ServerResponse`](https://nodejs.org/dist/latest-v20.x/docs/api/http.html#http_class_http_serverresponse)
  from Node core.
- `.log` - The logger instance of the incoming request.
- `.request` - The incoming request.

```js
fastify.get('/', options, function (request, reply) {
  // Your code
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ hello: 'world' })
})
```

### .code(statusCode)
<a id="code"></a>

If not set via `reply.code`, the resulting `statusCode` will be `200`.

### .elapsedTime
<a id="elapsedTime"></a>

Invokes the custom response time getter to calculate the amount of time passed
since the request was received by Fastify.

```js
const milliseconds = reply.elapsedTime
```

### .statusCode
<a id="statusCode"></a>

This property reads and sets the HTTP status code. It is an alias for
`reply.code()` when used as a setter.
```js
if (reply.statusCode >= 299) {
  reply.statusCode = 500
}
```

### .server
<a id="server"></a>

The Fastify server instance, scoped to the current [encapsulation
context](./Encapsulation.md).

```js
fastify.decorate('util', function util () {
  return 'foo'
})

fastify.get('/', async function (req, rep) {
  return rep.server.util() // foo
})
```

### .header(key, value)
<a id="header"></a>

Sets a response header. If the value is omitted or undefined, it is coerced to
`''`.

> ℹ️ Note: The header's value must be properly encoded using
> [`encodeURI`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
> or similar modules such as
> [`encodeurl`](https://www.npmjs.com/package/encodeurl). Invalid characters
> will result in a 500 `TypeError` response.

For more information, see
[`http.ServerResponse#setHeader`](https://nodejs.org/dist/latest-v20.x/docs/api/http.html#http_response_setheader_name_value).

- ### set-cookie
  <a id="set-cookie"></a>

    - When sending different values as a cookie with `set-cookie` as the key,
      every value will be sent as a cookie instead of replacing the previous
      value.

    ```js
    reply.header('set-cookie', 'foo');
    reply.header('set-cookie', 'bar');
    ```
  - The browser will only consider the latest reference of a key for the
    `set-cookie` header. This is done to avoid parsing the `set-cookie` header
    when added to a reply and speeds up the serialization of the reply.

  - To reset the `set-cookie` header, you need to make an explicit call to
    `reply.removeHeader('set-cookie')`, read more about `.removeHeader(key)`
    [here](#removeheaderkey).



### .headers(object)
<a id="headers"></a>

Sets all the keys of the object as response headers.
[`.header`](#headerkey-value) will be called under the hood.
```js
reply.headers({
  'x-foo': 'foo',
  'x-bar': 'bar'
})
```

### .getHeader(key)
<a id="getHeader"></a>

Retrieves the value of a previously set header.
```js
reply.header('x-foo', 'foo') // setHeader: key, value
reply.getHeader('x-foo') // 'foo'
```

### .getHeaders()
<a id="getHeaders"></a>

Gets a shallow copy of all current response headers, including those set via the
raw `http.ServerResponse`. Note that headers set via Fastify take precedence
over those set via `http.ServerResponse`.

```js
reply.header('x-foo', 'foo')
reply.header('x-bar', 'bar')
reply.raw.setHeader('x-foo', 'foo2')
reply.getHeaders() // { 'x-foo': 'foo', 'x-bar': 'bar' }
```

### .removeHeader(key)
<a id="getHeader"></a>

Remove the value of a previously set header.
```js
reply.header('x-foo', 'foo')
reply.removeHeader('x-foo')
reply.getHeader('x-foo') // undefined
```

### .hasHeader(key)
<a id="hasHeader"></a>

Returns a boolean indicating if the specified header has been set.

### .writeEarlyHints(hints, callback)
<a id="writeEarlyHints"></a>

Sends early hints to the client. Early hints allow the client to
start processing resources before the final response is sent.
This can improve performance by allowing the client to preload
or preconnect to resources while the server is still generating the response.

The hints parameter is an object containing the early hint key-value pairs.

Example:

```js
reply.writeEarlyHints({
  Link: '</styles.css>; rel=preload; as=style'
});
```

The optional callback parameter is a function that will be called
once the hint is sent or if an error occurs.

### .trailer(key, function)
<a id="trailer"></a>

Sets a response trailer. Trailer is usually used when you need a header that
requires heavy resources to be sent after the `data`, for example,
`Server-Timing` and `Etag`. It can ensure the client receives the response data
as soon as possible.

> ℹ️ Note: The header `Transfer-Encoding: chunked` will be added once you use
> the trailer. It is a hard requirement for using trailer in Node.js.

> ℹ️ Note: Any error passed to `done` callback will be ignored. If you interested
> in the error, you can turn on `debug` level logging.*

```js
reply.trailer('server-timing', function() {
  return 'db;dur=53, app;dur=47.2'
})

const { createHash } = require('node:crypto')
// trailer function also receive two argument
// @param {object} reply fastify reply
// @param {string|Buffer|null} payload payload that already sent, note that it will be null when stream is sent
// @param {function} done callback to set trailer value
reply.trailer('content-md5', function(reply, payload, done) {
  const hash = createHash('md5')
  hash.update(payload)
  done(null, hash.digest('hex'))
})

// when you prefer async-await
reply.trailer('content-md5', async function(reply, payload) {
  const hash = createHash('md5')
  hash.update(payload)
  return hash.digest('hex')
})
```

### .hasTrailer(key)
<a id="hasTrailer"></a>

Returns a boolean indicating if the specified trailer has been set.

### .removeTrailer(key)
<a id="removeTrailer"></a>

Remove the value of a previously set trailer.
```js
reply.trailer('server-timing', function() {
  return 'db;dur=53, app;dur=47.2'
})
reply.removeTrailer('server-timing')
reply.getTrailer('server-timing') // undefined
```


### .redirect(dest, [code ,])
<a id="redirect"></a>

Redirects a request to the specified URL, the status code is optional, default
to `302` (if status code is not already set by calling `code`).

> ℹ️ Note: The input URL must be properly encoded using
> [`encodeURI`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
> or similar modules such as
> [`encodeurl`](https://www.npmjs.com/package/encodeurl). Invalid URLs will
> result in a 500 `TypeError` response.

Example (no `reply.code()` call) sets status code to `302` and redirects to
`/home`
```js
reply.redirect('/home')
```

Example (no `reply.code()` call) sets status code to `303` and redirects to
`/home`
```js
reply.redirect('/home', 303)
```

Example (`reply.code()` call) sets status code to `303` and redirects to `/home`
```js
reply.code(303).redirect('/home')
```

Example (`reply.code()` call) sets status code to `302` and redirects to `/home`
```js
reply.code(303).redirect('/home', 302)
```

### .callNotFound()
<a id="call-not-found"></a>

Invokes the custom not found handler. Note that it will only call `preHandler`
hook specified in [`setNotFoundHandler`](./Server.md#set-not-found-handler).

```js
reply.callNotFound()
```

### .type(contentType)
<a id="type"></a>

Sets the content type for the response. This is a shortcut for
`reply.header('Content-Type', 'the/type')`.

```js
reply.type('text/html')
```
If the `Content-Type` has a JSON subtype, and the charset parameter is not set,
`utf-8` will be used as the charset by default. For other content types, the
charset must be set explicitly.

### .getSerializationFunction(schema | httpStatus, [contentType])
<a id="getserializationfunction"></a>

By calling this function using a provided `schema` or `httpStatus`,
and the optional `contentType`, it will return a `serialzation` function
that can be used to serialize diverse inputs. It returns `undefined` if no
serialization function was found using either of the provided inputs.

This heavily depends of the `schema#responses` attached to the route, or
the serialization functions compiled by using `compileSerializationSchema`.

```js
const serialize = reply
                  .getSerializationFunction({
                    type: 'object',
                    properties: {
                      foo: {
                        type: 'string'
                      }
                    }
                  })
serialize({ foo: 'bar' }) // '{"foo":"bar"}'

// or

const serialize = reply
                  .getSerializationFunction(200)
serialize({ foo: 'bar' }) // '{"foo":"bar"}'

// or

const serialize = reply
                  .getSerializationFunction(200, 'application/json')
serialize({ foo: 'bar' }) // '{"foo":"bar"}'
```

See [.compileSerializationSchema(schema, [httpStatus], [contentType])](#compileserializationschema)
for more information on how to compile serialization schemas.

### .compileSerializationSchema(schema, [httpStatus], [contentType])
<a id="compileserializationschema"></a>

This function will compile a serialization schema and
return a function that can be used to serialize data.
The function returned (a.k.a. _serialization function_) returned is compiled
by using the provided `SerializerCompiler`. Also this is cached by using
a `WeakMap` for reducing compilation calls.

The optional parameters `httpStatus` and `contentType`, if provided,
are forwarded directly to the `SerializerCompiler`, so it can be used
to compile the serialization function if a custom `SerializerCompiler` is used.

This heavily depends of the `schema#responses` attached to the route, or
the serialization functions compiled by using `compileSerializationSchema`.

```js
const serialize = reply
                  .compileSerializationSchema({
                    type: 'object',
                    properties: {
                      foo: {
                        type: 'string'
                      }
                    }
                  })
serialize({ foo: 'bar' }) // '{"foo":"bar"}'

// or

const serialize = reply
                  .compileSerializationSchema({
                    type: 'object',
                    properties: {
                      foo: {
                        type: 'string'
                      }
                    }
                  }, 200)
serialize({ foo: 'bar' }) // '{"foo":"bar"}'

// or

const serialize = reply
                  .compileSerializationSchema({
                        '3xx': {
                          content: {
                            'application/json': {
                              schema: {
                                name: { type: 'string' },
                                phone: { type: 'number' }
                              }
                            }
                          }
                        }
                  }, '3xx', 'application/json')
serialize({ name: 'Jone', phone: 201090909090 }) // '{"name":"Jone", "phone":201090909090}'
```

Note that you should be careful when using this function, as it will cache
the compiled serialization functions based on the schema provided. If the
schemas provided is mutated or changed, the serialization functions will not
detect that the schema has been altered and for instance it will reuse the
previously compiled serialization function based on the reference of the schema
previously provided.

If there's a need to change the properties of a schema, always opt to create
a totally new object, otherwise the implementation won't benefit from the cache
mechanism.

:Using the following schema as example:
```js
const schema1 = {
  type: 'object',
  properties: {
    foo: {
      type: 'string'
    }
  }
}
```

*Not*
```js
const serialize = reply.compileSerializationSchema(schema1)

// Later on...
schema1.properties.foo.type. = 'integer'
const newSerialize = reply.compileSerializationSchema(schema1)

console.log(newSerialize === serialize) // true
```

*Instead*
```js
const serialize = reply.compileSerializationSchema(schema1)

// Later on...
const newSchema = Object.assign({}, schema1)
newSchema.properties.foo.type = 'integer'

const newSerialize = reply.compileSerializationSchema(newSchema)

console.log(newSerialize === serialize) // false
```

### .serializeInput(data, [schema | httpStatus], [httpStatus], [contentType])
<a id="serializeinput"></a>

This function will serialize the input data based on the provided schema
or HTTP status code. If both are provided the `httpStatus` will take precedence.

If there is not a serialization function for a given `schema` a new serialization
function will be compiled, forwarding the `httpStatus` and `contentType` if provided.

```js
reply
  .serializeInput({ foo: 'bar'}, {
    type: 'object',
    properties: {
      foo: {
        type: 'string'
      }
    }
  }) // '{"foo":"bar"}'

// or

reply
  .serializeInput({ foo: 'bar'}, {
    type: 'object',
    properties: {
      foo: {
        type: 'string'
      }
    }
  }, 200) // '{"foo":"bar"}'

// or

reply
  .serializeInput({ foo: 'bar'}, 200) // '{"foo":"bar"}'

// or

reply
  .serializeInput({ name: 'Jone', age: 18 }, '200', 'application/vnd.v1+json') // '{"name": "Jone", "age": 18}'
```

See [.compileSerializationSchema(schema, [httpStatus], [contentType])](#compileserializationschema)
for more information on how to compile serialization schemas.

### .serializer(func)
<a id="serializer"></a>

By default, `.send()` will JSON-serialize any value that is not one of `Buffer`,
`stream`, `string`, `undefined`, or `Error`. If you need to replace the default
serializer with a custom serializer for a particular request, you can do so with
the `.serializer()` utility. Be aware that if you are using a custom serializer,
you must set a custom `'Content-Type'` header.

```js
reply
  .header('Content-Type', 'application/x-protobuf')
  .serializer(protoBuf.serialize)
```

Note that you don't need to use this utility inside a `handler` because Buffers,
streams, and strings (unless a serializer is set) are considered to already be
serialized.

```js
reply
  .header('Content-Type', 'application/x-protobuf')
  .send(protoBuf.serialize(data))
```

See [`.send()`](#send) for more information on sending different types of
values.

### .raw
<a id="raw"></a>

This is the
[`http.ServerResponse`](https://nodejs.org/dist/latest-v20.x/docs/api/http.html#http_class_http_serverresponse)
from Node core. Whilst you are using the Fastify `Reply` object, the use of
`Reply.raw` functions is at your own risk as you are skipping all the Fastify
logic of handling the HTTP response. e.g.:

```js
app.get('/cookie-2', (req, reply) => {
  reply.setCookie('session', 'value', { secure: false }) // this will not be used

  // in this case we are using only the nodejs http server response object
  reply.raw.writeHead(200, { 'Content-Type': 'text/plain' })
  reply.raw.write('ok')
  reply.raw.end()
})
```
Another example of the misuse of `Reply.raw` is explained in
[Reply](#getheaders).

### .sent
<a id="sent"></a>

As the name suggests, `.sent` is a property to indicate if a response has been
sent via `reply.send()`. It will also be `true` in case `reply.hijack()` was
used.

In case a route handler is defined as an async function or it returns a promise,
it is possible to call `reply.hijack()` to indicate that the automatic
invocation of `reply.send()` once the handler promise resolve should be skipped.
By calling `reply.hijack()`, an application claims full responsibility for the
low-level request and response. Moreover, hooks will not be invoked.

*Modifying the `.sent` property directly is deprecated. Please use the
aforementioned `.hijack()` method to achieve the same effect.*

### .hijack()
<a name="hijack"></a>

Sometimes you might need to halt the execution of the normal request lifecycle
and handle sending the response manually.

To achieve this, Fastify provides the `reply.hijack()` method that can be called
during the request lifecycle (At any point before `reply.send()` is called), and
allows you to prevent Fastify from sending the response, and from running the
remaining hooks (and user handler if the reply was hijacked before).

```js
app.get('/', (req, reply) => {
  reply.hijack()
  reply.raw.end('hello world')

  return Promise.resolve('this will be skipped')
})
```

If `reply.raw` is used to send a response back to the user, the `onResponse`
hooks will still be executed.

### .send(data)
<a id="send"></a>

As the name suggests, `.send()` is the function that sends the payload to the
end user.

#### Objects
<a id="send-object"></a>

As noted above, if you are sending JSON objects, `send` will serialize the
object with
[fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify) if you
set an output schema, otherwise, `JSON.stringify()` will be used.
```js
fastify.get('/json', options, function (request, reply) {
  reply.send({ hello: 'world' })
})
```

#### Strings
<a id="send-string"></a>

If you pass a string to `send` without a `Content-Type`, it will be sent as
`text/plain; charset=utf-8`. If you set the `Content-Type` header and pass a
string to `send`, it will be serialized with the custom serializer if one is
set, otherwise, it will be sent unmodified (unless the `Content-Type` header is
set to `application/json; charset=utf-8`, in which case it will be
JSON-serialized like an object — see the section above).
```js
fastify.get('/json', options, function (request, reply) {
  reply.send('plain string')
})
```

#### Streams
<a id="send-streams"></a>

If you are sending a stream and you have not set a `'Content-Type'` header,
*send* will set it to `'application/octet-stream'`.

As noted above, streams are considered to be pre-serialized, so they will be
sent unmodified without response validation.

```js
const fs = require('node:fs')

fastify.get('/streams', function (request, reply) {
  const stream = fs.createReadStream('some-file', 'utf8')
  reply.header('Content-Type', 'application/octet-stream')
  reply.send(stream)
})
```
When using async-await you will need to return or await the reply object:
```js
const fs = require('node:fs')

fastify.get('/streams', async function (request, reply) {
  const stream = fs.createReadStream('some-file', 'utf8')
  reply.header('Content-Type', 'application/octet-stream')
  return reply.send(stream)
})
```

#### Buffers
<a id="send-buffers"></a>

If you are sending a buffer and you have not set a `'Content-Type'` header,
*send* will set it to `'application/octet-stream'`.

As noted above, Buffers are considered to be pre-serialized, so they will be
sent unmodified without response validation.

```js
const fs = require('node:fs')

fastify.get('/streams', function (request, reply) {
  fs.readFile('some-file', (err, fileBuffer) => {
    reply.send(err || fileBuffer)
  })
})
```

When using async-await you will need to return or await the reply object:
```js
const fs = require('node:fs')

fastify.get('/streams', async function (request, reply) {
  fs.readFile('some-file', (err, fileBuffer) => {
    reply.send(err || fileBuffer)
  })
  return reply
})
```

#### TypedArrays
<a id="send-typedarrays"></a>

`send` manages TypedArray like a Buffer, and sets the `'Content-Type'`
header to `'application/octet-stream'` if not already set.

As noted above, TypedArray/Buffers are considered to be pre-serialized, so they
will be sent unmodified without response validation.

```js
const fs = require('node:fs')

fastify.get('/streams', function (request, reply) {
  const typedArray = new Uint16Array(10)
  reply.send(typedArray)
})
```

#### ReadableStream
<a id="send-readablestream"></a>

`ReadableStream` will be treated as a node stream mentioned above,
the content is considered to be pre-serialized, so they will be
sent unmodified without response validation.

```js
const fs = require('node:fs')
const { ReadableStream } = require('node:stream/web')

fastify.get('/streams', function (request, reply) {
  const stream = fs.createReadStream('some-file')
  reply.header('Content-Type', 'application/octet-stream')
  reply.send(ReadableStream.from(stream))
})
```

#### Response
<a id="send-response"></a>

`Response` allows to manage the reply payload, status code and
headers in one place. The payload provided inside `Response` is
considered to be pre-serialized, so they will be sent unmodified
without response validation.

Please be aware when using `Response`, the status code and headers
will not directly reflect to `reply.statusCode` and `reply.getHeaders()`.
Such behavior is based on `Response` only allow `readonly` status
code and headers. The data is not allow to be bi-direction editing,
and may confuse when checking the `payload` in `onSend` hooks.

```js
const fs = require('node:fs')
const { ReadableStream } = require('node:stream/web')

fastify.get('/streams', function (request, reply) {
  const stream = fs.createReadStream('some-file')
  const readableStream = ReadableStream.from(stream)
  const response = new Response(readableStream, {
    status: 200,
    headers: { 'content-type': 'application/octet-stream' }
  })
  reply.send(response)
})
```


#### Errors
<a id="errors"></a>

If you pass to *send* an object that is an instance of *Error*, Fastify will
automatically create an error structured as the following:

```js
{
  error: String        // the HTTP error message
  code: String         // the Fastify error code
  message: String      // the user error message
  statusCode: Number   // the HTTP status code
}
```

You can add custom properties to the Error object, such as `headers`, that will
be used to enhance the HTTP response.

> ℹ️ Note: If you are passing an error to `send` and the statusCode is less than
> 400, Fastify will automatically set it at 500.

Tip: you can simplify errors by using the
[`http-errors`](https://npm.im/http-errors) module or
[`@fastify/sensible`](https://github.com/fastify/fastify-sensible) plugin to
generate errors:

```js
fastify.get('/', function (request, reply) {
  reply.send(httpErrors.Gone())
})
```

To customize the JSON error output you can do it by:

- setting a response JSON schema for the status code you need
- add the additional properties to the `Error` instance

Notice that if the returned status code is not in the response schema list, the
default behavior will be applied.

```js
fastify.get('/', {
  schema: {
    response: {
      501: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          code: { type: 'string' },
          error: { type: 'string' },
          message: { type: 'string' },
          time: { type: 'string' }
        }
      }
    }
  }
}, function (request, reply) {
  const error = new Error('This endpoint has not been implemented')
  error.time = 'it will be implemented in two weeks'
  reply.code(501).send(error)
})
```

If you want to customize error handling, check out
[`setErrorHandler`](./Server.md#seterrorhandler) API.

> ℹ️ Note: you are responsible for logging when customizing the error handler.

API:

```js
fastify.setErrorHandler(function (error, request, reply) {
  request.log.warn(error)
  const statusCode = error.statusCode >= 400 ? error.statusCode : 500
  reply
    .code(statusCode)
    .type('text/plain')
    .send(statusCode >= 500 ? 'Internal server error' : error.message)
})
```

Beware that calling `reply.send(error)` in your custom error handler will send
the error to the default error handler.
Check out the [Reply Lifecycle](./Lifecycle.md#reply-lifecycle)
for more information.

The not found errors generated by the router will use the
[`setNotFoundHandler`](./Server.md#setnotfoundhandler)

API:

```js
fastify.setNotFoundHandler(function (request, reply) {
  reply
    .code(404)
    .type('text/plain')
    .send('a custom not found')
})
```

#### Type of the final payload
<a id="payload-type"></a>

The type of the sent payload (after serialization and going through any
[`onSend` hooks](./Hooks.md#onsend)) must be one of the following types,
otherwise, an error will be thrown:

- `string`
- `Buffer`
- `stream`
- `undefined`
- `null`

#### Async-Await and Promises
<a id="async-await-promise"></a>

Fastify natively handles promises and supports async-await.

*Note that in the following examples we are not using reply.send.*
```js
const { promisify } = require('node:util')
const delay = promisify(setTimeout)

fastify.get('/promises', options, function (request, reply) {
 return delay(200).then(() => { return { hello: 'world' }})
})

fastify.get('/async-await', options, async function (request, reply) {
  await delay(200)
  return { hello: 'world' }
})
```

Rejected promises default to a `500` HTTP status code. Reject the promise, or
`throw` in an `async function`, with an object that has `statusCode` (or
`status`) and `message` properties to modify the reply.

```js
fastify.get('/teapot', async function (request, reply) {
  const err = new Error()
  err.statusCode = 418
  err.message = 'short and stout'
  throw err
})

fastify.get('/botnet', async function (request, reply) {
  throw { statusCode: 418, message: 'short and stout' }
  // will return to the client the same json
})
```

If you want to know more please review
[Routes#async-await](./Routes.md#async-await).

### .then(fulfilled, rejected)
<a id="then"></a>

As the name suggests, a `Reply` object can be awaited upon, i.e. `await reply`
will wait until the reply is sent. The `await` syntax calls the `reply.then()`.

`reply.then(fulfilled, rejected)` accepts two parameters:

- `fulfilled` will be called when a response has been fully sent,
- `rejected` will be called if the underlying stream had an error, e.g. the
  socket has been destroyed.

For more details, see:

- https://github.com/fastify/fastify/issues/1864 for the discussion about this
  feature
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
  for the signature
````

## Source: https://fastify.dev/docs/latest/Reference/Request
````markdown
<h1 align="center">Fastify</h1>

## Request
The first parameter of the handler function is `Request`.

Request is a core Fastify object containing the following fields:
- `query` - The parsed querystring, its format is specified by
  [`querystringParser`](./Server.md#querystringparser).
- `body` - The request payload, see [Content-Type Parser](./ContentTypeParser.md)
  for details on what request payloads Fastify natively parses and how to support
  other content types.
- `params` - The params matching the URL.
- [`headers`](#headers) - The headers getter and setter.
- `raw` - The incoming HTTP request from Node core.
- `server` - The Fastify server instance, scoped to the current
  [encapsulation context](./Encapsulation.md).
- `id` - The request ID.
- `log` - The logger instance of the incoming request.
- `ip` - The IP address of the incoming request.
- `ips` - An array of the IP addresses, ordered from closest to furthest, in the
  `X-Forwarded-For` header of the incoming request (only when the
  [`trustProxy`](./Server.md#factory-trust-proxy) option is enabled).
- `host` - The host of the incoming request (derived from `X-Forwarded-Host`
  header when the [`trustProxy`](./Server.md#factory-trust-proxy) option is
  enabled). For HTTP/2 compatibility, it returns `:authority` if no host header
  exists. The host header may return an empty string if `requireHostHeader` is
  `false`, not provided with HTTP/1.0, or removed by schema validation.
- `hostname` - The hostname derived from the `host` property of the incoming request.
- `port` - The port from the `host` property, which may refer to the port the
  server is listening on.
- `protocol` - The protocol of the incoming request (`https` or `http`).
- `method` - The method of the incoming request.
- `url` - The URL of the incoming request.
- `originalUrl` - Similar to `url`, allows access to the original `url` in
  case of internal re-routing.
- `is404` - `true` if request is being handled by 404 handler, `false` otherwise.
- `socket` - The underlying connection of the incoming request.
- `context` - Deprecated, use `request.routeOptions.config` instead. A Fastify
  internal object. Do not use or modify it directly. It is useful to access one
  special key:
  - `context.config` - The route [`config`](./Routes.md#routes-config) object.
- `routeOptions` - The route [`option`](./Routes.md#routes-options) object.
  - `bodyLimit` - Either server limit or route limit.
  - `config` - The [`config`](./Routes.md#routes-config) object for this route.
  - `method` - The HTTP method for the route.
  - `url` - The path of the URL to match this route.
  - `handler` - The handler for this route.
  - `attachValidation` - Attach `validationError` to request (if there is
    a schema defined).
  - `logLevel` - Log level defined for this route.
  - `schema` - The JSON schemas definition for this route.
  - `version` - A semver compatible string that defines the version of the endpoint.
  - `exposeHeadRoute` - Creates a sibling HEAD route for any GET routes.
  - `prefixTrailingSlash` - String used to determine how to handle passing `/`
    as a route with a prefix.
- [.getValidationFunction(schema | httpPart)](#getvalidationfunction) -
  Returns a validation function for the specified schema or HTTP part, if
  set or cached.
- [.compileValidationSchema(schema, [httpPart])](#compilevalidationschema) -
  Compiles the specified schema and returns a validation function using the
  default (or customized) `ValidationCompiler`. The optional `httpPart` is
  forwarded to the `ValidationCompiler` if provided, defaults to `null`.
- [.validateInput(data, schema | httpPart, [httpPart])](#validate) -
  Validates the input using the specified schema and returns the serialized
  payload. If `httpPart` is provided, the function uses the serializer for
  that HTTP Status Code. Defaults to `null`.

### Headers

The `request.headers` is a getter that returns an object with the headers of the
incoming request. Set custom headers as follows:

```js
request.headers = {
  'foo': 'bar',
  'baz': 'qux'
}
```

This operation adds new values to the request headers, accessible via
`request.headers.bar`. Standard request headers remain accessible via
`request.raw.headers`.

For performance reasons, `Symbol('fastify.RequestAcceptVersion')` may be added
to headers on `not found` routes.

> ℹ️ Note: Schema validation may mutate the `request.headers` and
> `request.raw.headers` objects, causing the headers to become empty.

```js
fastify.post('/:params', options, function (request, reply) {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.raw)
  console.log(request.server)
  console.log(request.id)
  console.log(request.ip)
  console.log(request.ips)
  console.log(request.host)
  console.log(request.hostname)
  console.log(request.port)
  console.log(request.protocol)
  console.log(request.url)
  console.log(request.routeOptions.method)
  console.log(request.routeOptions.bodyLimit)
  console.log(request.routeOptions.method)
  console.log(request.routeOptions.url)
  console.log(request.routeOptions.attachValidation)
  console.log(request.routeOptions.logLevel)
  console.log(request.routeOptions.version)
  console.log(request.routeOptions.exposeHeadRoute)
  console.log(request.routeOptions.prefixTrailingSlash)
  console.log(request.routeOptions.logLevel)
  request.log.info('some info')
})
```
### .getValidationFunction(schema | httpPart)
<a id="getvalidationfunction"></a>

By calling this function with a provided `schema` or `httpPart`, it returns a
`validation` function to validate diverse inputs. It returns `undefined` if no
serialization function is found using the provided inputs.

This function has an `errors` property. Errors encountered during the last
validation are assigned to `errors`.

```js
const validate = request
                  .getValidationFunction({
                    type: 'object',
                    properties: {
                      foo: {
                        type: 'string'
                      }
                    }
                  })
console.log(validate({ foo: 'bar' })) // true
console.log(validate.errors) // null

// or

const validate = request
                  .getValidationFunction('body')
console.log(validate({ foo: 0.5 })) // false
console.log(validate.errors) // validation errors
```

See [.compileValidationSchema(schema, [httpStatus])](#compileValidationSchema)
for more information on compiling validation schemas.

### .compileValidationSchema(schema, [httpPart])
<a id="compilevalidationschema"></a>

This function compiles a validation schema and returns a function to validate data.
The returned function (a.k.a. _validation function_) is compiled using the provided
[`SchemaController#ValidationCompiler`](./Server.md#schema-controller). A `WeakMap`
is used to cache this, reducing compilation calls.

The optional parameter `httpPart`, if provided, is forwarded to the
`ValidationCompiler`, allowing it to compile the validation function if a custom
`ValidationCompiler` is provided for the route.

This function has an `errors` property. Errors encountered during the last
validation are assigned to `errors`.

```js
const validate = request
                  .compileValidationSchema({
                    type: 'object',
                    properties: {
                      foo: {
                        type: 'string'
                      }
                    }
                  })
console.log(validate({ foo: 'bar' })) // true
console.log(validate.errors) // null

// or

const validate = request
                  .compileValidationSchema({
                    type: 'object',
                    properties: {
                      foo: {
                        type: 'string'
                      }
                    }
                  }, 200)
console.log(validate({ hello: 'world' })) // false
console.log(validate.errors) // validation errors
```

Be careful when using this function, as it caches compiled validation functions
based on the provided schema. If schemas are mutated or changed, the validation
functions will not detect the alterations and will reuse the previously compiled
validation function, as the cache is based on the schema's reference.

If schema properties need to be changed, create a new schema object to benefit
from the cache mechanism.

Using the following schema as an example:
```js
const schema1 = {
  type: 'object',
  properties: {
    foo: {
      type: 'string'
    }
  }
}
```

*Not*
```js
const validate = request.compileValidationSchema(schema1)

// Later on...
schema1.properties.foo.type. = 'integer'
const newValidate = request.compileValidationSchema(schema1)

console.log(newValidate === validate) // true
```

*Instead*
```js
const validate = request.compileValidationSchema(schema1)

// Later on...
const newSchema = Object.assign({}, schema1)
newSchema.properties.foo.type = 'integer'

const newValidate = request.compileValidationSchema(newSchema)

console.log(newValidate === validate) // false
```

### .validateInput(data, [schema | httpStatus], [httpStatus])
<a id="validate"></a>

This function validates the input based on the provided schema or HTTP part. If
both are provided, the `httpPart` parameter takes precedence.

If no validation function exists for a given `schema`, a new validation function
will be compiled, forwarding the `httpPart` if provided.

```js
request
  .validateInput({ foo: 'bar'}, {
    type: 'object',
    properties: {
      foo: {
        type: 'string'
      }
    }
  }) // true

// or

request
  .validateInput({ foo: 'bar'}, {
    type: 'object',
    properties: {
      foo: {
        type: 'string'
      }
    }
  }, 'body') // true

// or

request
  .validateInput({ hello: 'world'}, 'query') // false
```

See [.compileValidationSchema(schema, [httpStatus])](#compileValidationSchema)
for more information on compiling validation schemas.
````

## Source: https://fastify.dev/docs/latest/Reference/Routes
````markdown
<h1 align="center">Fastify</h1>

## Routes

The route methods configure the endpoints of the application. Routes can be
declared using the shorthand method or the full declaration.

- [Full declaration](#full-declaration)
- [Routes options](#routes-options)
- [Shorthand declaration](#shorthand-declaration)
- [Url building](#url-building)
- [Async Await](#async-await)
- [Promise resolution](#promise-resolution)
- [Route Prefixing](#route-prefixing)
  - [Handling of / route inside prefixed
    plugins](#handling-of--route-inside-prefixed-plugins)
- [Custom Log Level](#custom-log-level)
- [Custom Log Serializer](#custom-log-serializer)
- [Config](#config)
- [Constraints](#constraints)
  - [Version Constraints](#version-constraints)
  - [Host Constraints](#host-constraints)

### Full declaration
<a id="full-declaration"></a>

```js
fastify.route(options)
```

### Routes options
<a id="options"></a>

* `method`: currently it supports `GET`, `HEAD`, `TRACE`, `DELETE`,
  `OPTIONS`, `PATCH`, `PUT` and `POST`. To accept more methods,
  the [`addHttpMethod`](./Server.md#addHttpMethod) must be used.
  It could also be an array of methods.
* `url`: the path of the URL to match this route (alias: `path`).
* `schema`: an object containing the schemas for the request and response. They
  need to be in [JSON Schema](https://json-schema.org/) format, check
  [here](./Validation-and-Serialization.md) for more info.

  * `body`: validates the body of the request if it is a POST, PUT, PATCH,
    TRACE, SEARCH, PROPFIND, PROPPATCH or LOCK method.
  * `querystring` or `query`: validates the querystring. This can be a complete
    JSON Schema object, with the property `type` of `object` and `properties`
    object of parameters, or simply the values of what would be contained in the
    `properties` object as shown below.
  * `params`: validates the params.
  * `response`: filter and generate a schema for the response, setting a schema
    allows us to have 10-20% more throughput.
* `exposeHeadRoute`: creates a sibling `HEAD` route for any `GET` routes.
  Defaults to the value of [`exposeHeadRoutes`](./Server.md#exposeHeadRoutes)
  instance option. If you want a custom `HEAD` handler without disabling this
  option, make sure to define it before the `GET` route.
* `attachValidation`: attach `validationError` to request, if there is a schema
  validation error, instead of sending the error to the error handler. The
  default [error format](https://ajv.js.org/api.html#error-objects) is the Ajv
  one.
* `onRequest(request, reply, done)`: a [function](./Hooks.md#onrequest) called
  as soon as a request is received, it could also be an array of functions.
* `preParsing(request, reply, payload, done)`: a
  [function](./Hooks.md#preparsing) called before parsing the request, it could
  also be an array of functions.
* `preValidation(request, reply, done)`: a [function](./Hooks.md#prevalidation)
  called after the shared `preValidation` hooks, useful if you need to perform
  authentication at route level for example, it could also be an array of
  functions.
* `preHandler(request, reply, done)`: a [function](./Hooks.md#prehandler) called
  just before the request handler, it could also be an array of functions.
* `preSerialization(request, reply, payload, done)`: a
  [function](./Hooks.md#preserialization) called just before the serialization,
  it could also be an array of functions.
* `onSend(request, reply, payload, done)`: a [function](./Hooks.md#route-hooks)
  called right before a response is sent, it could also be an array of
  functions.
* `onResponse(request, reply, done)`: a [function](./Hooks.md#onresponse) called
  when a response has been sent, so you will not be able to send more data to
  the client. It could also be an array of functions.
* `onTimeout(request, reply, done)`: a [function](./Hooks.md#ontimeout) called
  when a request is timed out and the HTTP socket has been hung up.
* `onError(request, reply, error, done)`: a [function](./Hooks.md#onerror)
  called when an Error is thrown or sent to the client by the route handler.
* `handler(request, reply)`: the function that will handle this request. The
  [Fastify server](./Server.md) will be bound to `this` when the handler is
  called. Note: using an arrow function will break the binding of `this`.
* `errorHandler(error, request, reply)`: a custom error handler for the scope of
  the request. Overrides the default error global handler, and anything set by
  [`setErrorHandler`](./Server.md#seterrorhandler), for requests to the route.
  To access the default handler, you can access `instance.errorHandler`. Note
  that this will point to fastify's default `errorHandler` only if a plugin
  hasn't overridden it already.
* `childLoggerFactory(logger, binding, opts, rawReq)`: a custom factory function
  that will be called to produce a child logger instance for every request.
  See [`childLoggerFactory`](./Server.md#childloggerfactory) for more info.
  Overrides the default logger factory, and anything set by
  [`setChildLoggerFactory`](./Server.md#setchildloggerfactory), for requests to
  the route. To access the default factory, you can access
  `instance.childLoggerFactory`. Note that this will point to Fastify's default
  `childLoggerFactory` only if a plugin hasn't overridden it already.
* `validatorCompiler({ schema, method, url, httpPart })`: function that builds
  schemas for request validations. See the [Validation and
  Serialization](./Validation-and-Serialization.md#schema-validator)
  documentation.
* `serializerCompiler({ { schema, method, url, httpStatus, contentType } })`:
  function that builds schemas for response serialization. See the [Validation and
  Serialization](./Validation-and-Serialization.md#schema-serializer)
  documentation.
* `schemaErrorFormatter(errors, dataVar)`: function that formats the errors from
  the validation compiler. See the [Validation and
  Serialization](./Validation-and-Serialization.md#error-handling)
  documentation. Overrides the global schema error formatter handler, and
  anything set by `setSchemaErrorFormatter`, for requests to the route.
* `bodyLimit`: prevents the default JSON body parser from parsing request bodies
  larger than this number of bytes. Must be an integer. You may also set this
  option globally when first creating the Fastify instance with
  `fastify(options)`. Defaults to `1048576` (1 MiB).
* `logLevel`: set log level for this route. See below.
* `logSerializers`: set serializers to log for this route.
* `config`: object used to store custom configuration.
* `version`: a [semver](https://semver.org/) compatible string that defined the
  version of the endpoint. [Example](#version-constraints).
* `constraints`: defines route restrictions based on request properties or
  values, enabling customized matching using
  [find-my-way](https://github.com/delvedor/find-my-way) constraints. Includes
  built-in `version` and `host` constraints, with support for custom constraint
  strategies.
* `prefixTrailingSlash`: string used to determine how to handle passing `/` as a
  route with a prefix.
  * `both` (default): Will register both `/prefix` and `/prefix/`.
  * `slash`: Will register only `/prefix/`.
  * `no-slash`: Will register only `/prefix`.

  Note: this option does not override `ignoreTrailingSlash` in
  [Server](./Server.md) configuration.

* `request` is defined in [Request](./Request.md).

* `reply` is defined in [Reply](./Reply.md).

> ℹ️ Note: The documentation for `onRequest`, `preParsing`, `preValidation`,
> `preHandler`, `preSerialization`, `onSend`, and `onResponse` is detailed in
> [Hooks](./Hooks.md). To send a response before the request is handled by the
> `handler`, see [Respond to a request from
> a hook](./Hooks.md#respond-to-a-request-from-a-hook).

Example:
```js
fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        excitement: { type: 'integer' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})
```

### Shorthand declaration
<a id="shorthand-declaration"></a>

The above route declaration is more *Hapi*-like, but if you prefer an
*Express/Restify* approach, we support it as well:

`fastify.get(path, [options], handler)`

`fastify.head(path, [options], handler)`

`fastify.post(path, [options], handler)`

`fastify.put(path, [options], handler)`

`fastify.delete(path, [options], handler)`

`fastify.options(path, [options], handler)`

`fastify.patch(path, [options], handler)`

Example:
```js
const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}
fastify.get('/', opts, (request, reply) => {
  reply.send({ hello: 'world' })
})
```

`fastify.all(path, [options], handler)` will add the same handler to all the
supported methods.

The handler may also be supplied via the `options` object:
```js
const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
}
fastify.get('/', opts)
```

> ℹ️ Note: Specifying the handler in both `options` and as the third parameter to
> the shortcut method throws a duplicate `handler` error.

### Url building
<a id="url-building"></a>

Fastify supports both static and dynamic URLs.

To register a **parametric** path, use a *colon* before the parameter name. For
**wildcard**, use a *star*. Static routes are always checked before parametric
and wildcard routes.

```js
// parametric
fastify.get('/example/:userId', function (request, reply) {
  // curl ${app-url}/example/12345
  // userId === '12345'
  const { userId } = request.params;
  // your code here
})
fastify.get('/example/:userId/:secretToken', function (request, reply) {
  // curl ${app-url}/example/12345/abc.zHi
  // userId === '12345'
  // secretToken === 'abc.zHi'
  const { userId, secretToken } = request.params;
  // your code here
})

// wildcard
fastify.get('/example/*', function (request, reply) {})
```

Regular expression routes are supported, but slashes must be escaped.
Take note that RegExp is also very expensive in terms of performance!
```js
// parametric with regexp
fastify.get('/example/:file(^\\d+).png', function (request, reply) {
  // curl ${app-url}/example/12345.png
  // file === '12345'
  const { file } = request.params;
  // your code here
})
```

It is possible to define more than one parameter within the same couple of slash
("/"). Such as:
```js
fastify.get('/example/near/:lat-:lng/radius/:r', function (request, reply) {
  // curl ${app-url}/example/near/15°N-30°E/radius/20
  // lat === "15°N"
  // lng === "30°E"
  // r ==="20"
  const { lat, lng, r } = request.params;
  // your code here
})
```
*Remember in this case to use the dash ("-") as parameters separator.*

Finally, it is possible to have multiple parameters with RegExp:
```js
fastify.get('/example/at/:hour(^\\d{2})h:minute(^\\d{2})m', function (request, reply) {
  // curl ${app-url}/example/at/08h24m
  // hour === "08"
  // minute === "24"
  const { hour, minute } = request.params;
  // your code here
})
```
In this case as parameter separator it is possible to use whatever character is
not matched by the regular expression.

The last parameter can be made optional by adding a question mark ("?") to the
end of the parameter name.
```js
fastify.get('/example/posts/:id?', function (request, reply) {
  const { id } = request.params;
  // your code here
})
```
In this case, `/example/posts` and `/example/posts/1` are both valid. The
optional param will be `undefined` if not specified.

Having a route with multiple parameters may negatively affect performance.
Prefer a single parameter approach, especially on routes that are on the hot
path of your application. For more details, see
[find-my-way](https://github.com/delvedor/find-my-way).

To include a colon in a path without declaring a parameter, use a double colon.
For example:
```js
fastify.post('/name::verb') // will be interpreted as /name:verb
```

### Async Await
<a id="async-await"></a>

Are you an `async/await` user? We have you covered!
```js
fastify.get('/', options, async function (request, reply) {
  const data = await getData()
  const processed = await processData(data)
  return processed
})
```

As shown, `reply.send` is not called to send data back to the user. Simply
return the body and you are done!

If needed, you can also send data back with `reply.send`. In this case, do not
forget to `return reply` or `await reply` in your `async` handler to avoid race
conditions.

```js
fastify.get('/', options, async function (request, reply) {
  const data = await getData()
  const processed = await processData(data)
  return reply.send(processed)
})
```

If the route is wrapping a callback-based API that will call `reply.send()`
outside of the promise chain, it is possible to `await reply`:

```js
fastify.get('/', options, async function (request, reply) {
  setImmediate(() => {
    reply.send({ hello: 'world' })
  })
  await reply
})
```

Returning reply also works:

```js
fastify.get('/', options, async function (request, reply) {
  setImmediate(() => {
    reply.send({ hello: 'world' })
  })
  return reply
})
```

> ⚠ Warning:
> * When using both `return value` and `reply.send(value)`, the first one takes
>   precedence, the second is discarded, and a *warn* log is emitted.
> * Calling `reply.send()` outside of the promise is possible but requires special
>   attention. See [promise-resolution](#promise-resolution).
> * `undefined` cannot be returned. See [promise-resolution](#promise-resolution).

### Promise resolution
<a id="promise-resolution"></a>

If the handler is an `async` function or returns a promise, be aware of the
special behavior to support callback and promise control-flow. When the
handler's promise resolves, the reply is automatically sent with its value
unless you explicitly await or return `reply` in the handler.

1. If using `async/await` or promises but responding with `reply.send`:
    - **Do** `return reply` / `await reply`.
    - **Do not** forget to call `reply.send`.
2. If using `async/await` or promises:
    - **Do not** use `reply.send`.
    - **Do** return the value to send.

This approach supports both `callback-style` and `async-await` with minimal
trade-off. However, it is recommended to use only one style for consistent
error handling within your application.

> ℹ️ Note: Every async function returns a promise by itself.

### Route Prefixing
<a id="route-prefixing"></a>

Sometimes maintaining multiple versions of the same API is necessary. A common
approach is to prefix routes with the API version number, e.g., `/v1/user`.
Fastify offers a fast and smart way to create different versions of the same API
without changing all the route names by hand, called *route prefixing*. Here is
how it works:

```js
// server.js
const fastify = require('fastify')()

fastify.register(require('./routes/v1/users'), { prefix: '/v1' })
fastify.register(require('./routes/v2/users'), { prefix: '/v2' })

fastify.listen({ port: 3000 })
```

```js
// routes/v1/users.js
module.exports = function (fastify, opts, done) {
  fastify.get('/user', handler_v1)
  done()
}
```

```js
// routes/v2/users.js
module.exports = function (fastify, opts, done) {
  fastify.get('/user', handler_v2)
  done()
}
```
Fastify will not complain about using the same name for two different routes
because it handles the prefix automatically at compilation time. This ensures
performance is not affected.

Now clients will have access to the following routes:
- `/v1/user`
- `/v2/user`

This can be done multiple times and works for nested `register`. Route
parameters are also supported.

To use a prefix for all routes, place them inside a plugin:

```js
const fastify = require('fastify')()

const route = {
    method: 'POST',
    url: '/login',
    handler: () => {},
    schema: {},
}

fastify.register(function (app, _, done) {
  app.get('/users', () => {})
  app.route(route)

  done()
}, { prefix: '/v1' }) // global route prefix

await fastify.listen({ port: 3000 })
```

### Route Prefixing and fastify-plugin
<a id="fastify-plugin"></a>

If using [`fastify-plugin`](https://github.com/fastify/fastify-plugin) to wrap
routes, this option will not work. To make it work, wrap a plugin in a plugin:
```js
const fp = require('fastify-plugin')
const routes = require('./lib/routes')

module.exports = fp(async function (app, opts) {
  app.register(routes, {
    prefix: '/v1',
  })
}, {
  name: 'my-routes'
})
```

#### Handling of / route inside prefixed plugins

The `/` route behaves differently based on whether the prefix ends with `/`.
For example, with a prefix `/something/`, adding a `/` route matches only
`/something/`. With a prefix `/something`, adding a `/` route matches both
`/something` and `/something/`.

See the `prefixTrailingSlash` route option above to change this behavior.

### Custom Log Level
<a id="custom-log-level"></a>

Different log levels can be set for routes in Fastify by passing the `logLevel`
option to the plugin or route with the desired
[value](https://github.com/pinojs/pino/blob/master/docs/api.md#level-string).

Be aware that setting `logLevel` at the plugin level also affects
[`setNotFoundHandler`](./Server.md#setnotfoundhandler) and
[`setErrorHandler`](./Server.md#seterrorhandler).

```js
// server.js
const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes/user'), { logLevel: 'warn' })
fastify.register(require('./routes/events'), { logLevel: 'debug' })

fastify.listen({ port: 3000 })
```

Or pass it directly to a route:
```js
fastify.get('/', { logLevel: 'warn' }, (request, reply) => {
  reply.send({ hello: 'world' })
})
```
*Remember that the custom log level applies only to routes, not to the global
Fastify Logger, accessible with `fastify.log`.*

### Custom Log Serializer
<a id="custom-log-serializer"></a>

In some contexts, logging a large object may waste resources. Define custom
[`serializers`](https://github.com/pinojs/pino/blob/master/docs/api.md#serializers-object)
and attach them in the appropriate context.

```js
const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes/user'), {
  logSerializers: {
    user: (value) => `My serializer one - ${value.name}`
  }
})
fastify.register(require('./routes/events'), {
  logSerializers: {
    user: (value) => `My serializer two - ${value.name} ${value.surname}`
  }
})

fastify.listen({ port: 3000 })
```

Serializers can be inherited by context:

```js
const fastify = Fastify({
  logger: {
    level: 'info',
    serializers: {
      user (req) {
        return {
          method: req.method,
          url: req.url,
          headers: req.headers,
          host: req.host,
          remoteAddress: req.ip,
          remotePort: req.socket.remotePort
        }
      }
    }
  }
})

fastify.register(context1, {
  logSerializers: {
    user: value => `My serializer father - ${value}`
  }
})

async function context1 (fastify, opts) {
  fastify.get('/', (req, reply) => {
    req.log.info({ user: 'call father serializer', key: 'another key' })
    // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
    reply.send({})
  })
}

fastify.listen({ port: 3000 })
```

### Config
<a id="routes-config"></a>

Registering a new handler, you can pass a configuration object to it and
retrieve it in the handler.

```js
// server.js
const fastify = require('fastify')()

function handler (req, reply) {
  reply.send(reply.routeOptions.config.output)
}

fastify.get('/en', { config: { output: 'hello world!' } }, handler)
fastify.get('/it', { config: { output: 'ciao mondo!' } }, handler)

fastify.listen({ port: 3000 })
```

### Constraints
<a id="constraints"></a>

Fastify supports constraining routes to match certain requests based on
properties like the `Host` header or any other value via
[`find-my-way`](https://github.com/delvedor/find-my-way) constraints.
Constraints are specified in the `constraints` property of the route options.
Fastify has two built-in constraints: `version` and `host`. Custom constraint
strategies can be added to inspect other parts of a request to decide if a route
should be executed.

#### Version Constraints

You can provide a `version` key in the `constraints` option to a route.
Versioned routes allows multiple handlers to be declared for the same HTTP
route path, matched according to the request's `Accept-Version` header.
The `Accept-Version` header value should follow the
[semver](https://semver.org/) specification, and routes should be declared
with exact semver versions for matching.

Fastify will require a request `Accept-Version` header to be set if the route
has a version set, and will prefer a versioned route to a non-versioned route
for the same path. Advanced version ranges and pre-releases currently are not
supported.

*Be aware that using this feature will cause a degradation of the overall
performances of the router.*

```js
fastify.route({
  method: 'GET',
  url: '/',
  constraints: { version: '1.2.0' },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})

fastify.inject({
  method: 'GET',
  url: '/',
  headers: {
    'Accept-Version': '1.x' // it could also be '1.2.0' or '1.2.x'
  }
}, (err, res) => {
  // { hello: 'world' }
})
```

> ⚠ Warning:
> Set a
> [`Vary`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary)
> header in responses with the value used for versioning
> (e.g., `'Accept-Version'`) to prevent cache poisoning attacks.
> This can also be configured in a Proxy/CDN.
>
> ```js
> const append = require('vary').append
> fastify.addHook('onSend', (req, reply, payload, done) => {
>   if (req.headers['accept-version']) { // or the custom header being used
>     let value = reply.getHeader('Vary') || ''
>     const header = Array.isArray(value) ? value.join(', ') : String(value)
>     if ((value = append(header, 'Accept-Version'))) { // or the custom header being used
>       reply.header('Vary', value)
>     }
>   }
>  done()
> })
> ```

If multiple versions with the same major or minor are declared, Fastify will
always choose the highest compatible with the `Accept-Version` header value.

If the request lacks an `Accept-Version` header, a 404 error will be returned.

Custom version matching logic can be defined through the
[`constraints`](./Server.md#constraints) configuration when creating a Fastify
server instance.

#### Host Constraints

Provide a `host` key in the `constraints` route option to limit the route to
certain values of the request `Host` header. `host` constraint values can be
specified as strings for exact matches or RegExps for arbitrary host matching.

```js
fastify.route({
  method: 'GET',
  url: '/',
  constraints: { host: 'auth.fastify.dev' },
  handler: function (request, reply) {
    reply.send('hello world from auth.fastify.dev')
  }
})

fastify.inject({
  method: 'GET',
  url: '/',
  headers: {
    'Host': 'example.com'
  }
}, (err, res) => {
  // 404 because the host doesn't match the constraint
})

fastify.inject({
  method: 'GET',
  url: '/',
  headers: {
    'Host': 'auth.fastify.dev'
  }
}, (err, res) => {
  // => 'hello world from auth.fastify.dev'
})
```

RegExp `host` constraints can also be specified allowing constraining to hosts
matching wildcard subdomains (or any other pattern):

```js
fastify.route({
  method: 'GET',
  url: '/',
  constraints: { host: /.*\.fastify\.dev/ }, // will match any subdomain of fastify.dev
  handler: function (request, reply) {
    reply.send('hello world from ' + request.headers.host)
  }
})
```

#### Asynchronous Custom Constraints

Custom constraints can be provided, and the `constraint` criteria can be
fetched from another source such as a database. Use asynchronous custom
constraints as a last resort, as they impact router performance.

```js
function databaseOperation(field, done) {
  done(null, field)
}

const secret = {
  // strategy name for referencing in the route handler `constraints` options
  name: 'secret',
  // storage factory for storing routes in the find-my-way route tree
  storage: function () {
    let handlers = {}
    return {
      get: (type) => { return handlers[type] || null },
      set: (type, store) => { handlers[type] = store }
    }
  },
  // function to get the value of the constraint from each incoming request
  deriveConstraint: (req, ctx, done) => {
    databaseOperation(req.headers['secret'], done)
  },
  // optional flag marking if handlers without constraints can match requests that have a value for this constraint
  mustMatchWhenDerived: true
}
```

> ⚠ Warning:
> When using asynchronous constraints, avoid returning errors inside the
> callback. If errors are unavoidable, provide a custom `frameworkErrors`
> handler to manage them. Otherwise, route selection may break or expose
> sensitive information.
>
> ```js
> const Fastify = require('fastify')
>
> const fastify = Fastify({
>   frameworkErrors: function (err, res, res) {
>     if (err instanceof Fastify.errorCodes.FST_ERR_ASYNC_CONSTRAINT) {
>       res.code(400)
>       return res.send("Invalid header provided")
>     } else {
>       res.send(err)
>     }
>   }
> })
> ```
````

## Source: https://fastify.dev/docs/latest/Reference/Server
````markdown
<h1 align="center">Fastify</h1>

## Factory
<a id="factory"></a>

The Fastify module exports a factory function that is used to create new
<code><b>Fastify server</b></code> instances. This factory function accepts an
options object which is used to customize the resulting instance. This document
describes the properties available in that options object.

- [Factory](#factory)
  - [`http`](#http)
  - [`http2`](#http2)
  - [`https`](#https)
  - [`connectionTimeout`](#connectiontimeout)
  - [`keepAliveTimeout`](#keepalivetimeout)
  - [`forceCloseConnections`](#forcecloseconnections)
  - [`maxRequestsPerSocket`](#maxrequestspersocket)
  - [`requestTimeout`](#requesttimeout)
  - [`ignoreTrailingSlash`](#ignoretrailingslash)
  - [`ignoreDuplicateSlashes`](#ignoreduplicateslashes)
  - [`maxParamLength`](#maxparamlength)
  - [`bodyLimit`](#bodylimit)
  - [`onProtoPoisoning`](#onprotopoisoning)
  - [`onConstructorPoisoning`](#onconstructorpoisoning)
  - [`logger`](#logger)
  - [`loggerInstance`](#loggerInstance)
  - [`disableRequestLogging`](#disablerequestlogging)
  - [`serverFactory`](#serverfactory)
  - [`caseSensitive`](#casesensitive)
  - [`allowUnsafeRegex`](#allowunsaferegex)
  - [`requestIdHeader`](#requestidheader)
  - [`requestIdLogLabel`](#requestidloglabel)
  - [`genReqId`](#genreqid)
  - [`trustProxy`](#trustproxy)
  - [`pluginTimeout`](#plugintimeout)
  - [`querystringParser`](#querystringparser)
  - [`exposeHeadRoutes`](#exposeheadroutes)
  - [`constraints`](#constraints)
  - [`return503OnClosing`](#return503onclosing)
  - [`ajv`](#ajv)
  - [`serializerOpts`](#serializeropts)
  - [`http2SessionTimeout`](#http2sessiontimeout)
  - [`frameworkErrors`](#frameworkerrors)
  - [`clientErrorHandler`](#clienterrorhandler)
  - [`rewriteUrl`](#rewriteurl)
  - [`useSemicolonDelimiter`](#usesemicolondelimiter)
  - [`allowErrorHandlerOverride`](#allowerrorhandleroverride)
- [Instance](#instance)
  - [Server Methods](#server-methods)
    - [server](#server)
    - [after](#after)
    - [ready](#ready)
    - [listen](#listen)
  - [`listenTextResolver`](#listentextresolver)
    - [addresses](#addresses)
    - [routing](#routing)
    - [route](#route)
    - [hasRoute](#hasroute)
    - [findRoute](#findroute)
    - [close](#close)
    - [decorate\*](#decorate)
    - [register](#register)
    - [addHook](#addhook)
    - [prefix](#prefix)
    - [pluginName](#pluginname)
    - [hasPlugin](#hasplugin)
  - [listeningOrigin](#listeningorigin)
    - [log](#log)
    - [version](#version)
    - [inject](#inject)
    - [addHttpMethod](#addHttpMethod)
    - [addSchema](#addschema)
    - [getSchemas](#getschemas)
    - [getSchema](#getschema)
    - [setReplySerializer](#setreplyserializer)
    - [setValidatorCompiler](#setvalidatorcompiler)
    - [setSchemaErrorFormatter](#setschemaerrorformatter)
    - [setSerializerCompiler](#setserializercompiler)
    - [validatorCompiler](#validatorcompiler)
    - [serializerCompiler](#serializercompiler)
    - [schemaErrorFormatter](#schemaerrorformatter)
    - [schemaController](#schemacontroller)
    - [setNotFoundHandler](#setnotfoundhandler)
    - [setErrorHandler](#seterrorhandler)
    - [setChildLoggerFactory](#setchildloggerfactory)
    - [setGenReqId](#setGenReqId)
    - [addConstraintStrategy](#addconstraintstrategy)
    - [hasConstraintStrategy](#hasconstraintstrategy)
    - [printRoutes](#printroutes)
    - [printPlugins](#printplugins)
    - [addContentTypeParser](#addcontenttypeparser)
    - [hasContentTypeParser](#hascontenttypeparser)
    - [removeContentTypeParser](#removecontenttypeparser)
    - [removeAllContentTypeParsers](#removeallcontenttypeparsers)
    - [getDefaultJsonParser](#getdefaultjsonparser)
    - [defaultTextParser](#defaulttextparser)
    - [errorHandler](#errorhandler)
    - [childLoggerFactory](#childloggerfactory)
    - [Symbol.asyncDispose](#symbolasyncdispose)
    - [initialConfig](#initialconfig)

### `http`
<a id="factory-http"></a>

+ Default: `null`

An object used to configure the server's listening socket. The options
are the same as the Node.js core [`createServer`
method](https://nodejs.org/docs/latest-v20.x/api/http.html#httpcreateserveroptions-requestlistener).

This option is ignored if options [`http2`](#factory-http2) or
[`https`](#factory-https) are set.

### `http2`
<a id="factory-http2"></a>

+ Default: `false`

If `true` Node.js core's
[HTTP/2](https://nodejs.org/dist/latest-v20.x/docs/api/http2.html) module is
used for binding the socket.

### `https`
<a id="factory-https"></a>

+ Default: `null`

An object used to configure the server's listening socket for TLS. The options
are the same as the Node.js core [`createServer`
method](https://nodejs.org/dist/latest-v20.x/docs/api/https.html#https_https_createserver_options_requestlistener).
When this property is `null`, the socket will not be configured for TLS.

This option also applies when the [`http2`](#factory-http2) option is set.

### `connectionTimeout`
<a id="factory-connection-timeout"></a>

+ Default: `0` (no timeout)

Defines the server timeout in milliseconds. See documentation for
[`server.timeout`
property](https://nodejs.org/api/http.html#http_server_timeout) to understand
the effect of this option.

When `serverFactory` option is specified this option is ignored.

### `keepAliveTimeout`
<a id="factory-keep-alive-timeout"></a>

+ Default: `72000` (72 seconds)

Defines the server keep-alive timeout in milliseconds. See documentation for
[`server.keepAliveTimeout`
property](https://nodejs.org/api/http.html#http_server_keepalivetimeout) to
understand the effect of this option. This option only applies when HTTP/1 is in
use.

When `serverFactory` option is specified this option is ignored.

### `forceCloseConnections`
<a id="forcecloseconnections"></a>

+ Default: `"idle"` if the HTTP server allows it, `false` otherwise

When set to `true`, upon [`close`](#close) the server will iterate the current
persistent connections and [destroy their
sockets](https://nodejs.org/dist/latest-v16.x/docs/api/net.html#socketdestroyerror).

> ⚠ Warning:
> Connections are not inspected to determine if requests have
> been completed.

Fastify will prefer the HTTP server's
[`closeAllConnections`](https://nodejs.org/dist/latest-v18.x/docs/api/http.html#servercloseallconnections)
method if supported, otherwise, it will use internal connection tracking.

When set to `"idle"`, upon [`close`](#close) the server will iterate the current
persistent connections which are not sending a request or waiting for a response
and destroy their sockets. The value is only supported if the HTTP server
supports the
[`closeIdleConnections`](https://nodejs.org/dist/latest-v18.x/docs/api/http.html#servercloseidleconnections)
method, otherwise attempting to set it will throw an exception.

### `maxRequestsPerSocket`
<a id="factory-max-requests-per-socket"></a>

+ Default: `0` (no limit)

Defines the maximum number of requests a socket can handle before closing keep
alive connection. See [`server.maxRequestsPerSocket`
property](https://nodejs.org/dist/latest/docs/api/http.html#http_server_maxrequestspersocket)
to understand the effect of this option. This option only applies when HTTP/1.1
is in use. Also, when `serverFactory` option is specified, this option is
ignored.

> ℹ️ Note:
>  At the time of writing, only node >= v16.10.0 supports this option.

### `requestTimeout`
<a id="factory-request-timeout"></a>

+ Default: `0` (no limit)

Defines the maximum number of milliseconds for receiving the entire request from
the client. See [`server.requestTimeout`
property](https://nodejs.org/dist/latest/docs/api/http.html#http_server_requesttimeout)
to understand the effect of this option.

When `serverFactory` option is specified, this option is ignored.
It must be set to a non-zero value (e.g. 120 seconds) to protect against potential
Denial-of-Service attacks in case the server is deployed without a reverse proxy
in front.

> ℹ️ Note:
>  At the time of writing, only node >= v14.11.0 supports this option

### `ignoreTrailingSlash`
<a id="factory-ignore-slash"></a>

+ Default: `false`

Fastify uses [find-my-way](https://github.com/delvedor/find-my-way) to handle
routing. By default, Fastify will take into account the trailing slashes.
Paths like `/foo` and `/foo/` are treated as different paths. If you want to
change this, set this flag to `true`. That way, both `/foo` and `/foo/` will
point to the same route. This option applies to *all* route registrations for
the resulting server instance.

```js
const fastify = require('fastify')({
  ignoreTrailingSlash: true
})

// registers both "/foo" and "/foo/"
fastify.get('/foo/', function (req, reply) {
  reply.send('foo')
})

// registers both "/bar" and "/bar/"
fastify.get('/bar', function (req, reply) {
  reply.send('bar')
})
```

### `ignoreDuplicateSlashes`
<a id="factory-ignore-duplicate-slashes"></a>

+ Default: `false`

Fastify uses [find-my-way](https://github.com/delvedor/find-my-way) to handle
routing. You can use `ignoreDuplicateSlashes` option to remove duplicate slashes
from the path. It removes duplicate slashes in the route path and the request
URL. This option applies to *all* route registrations for the resulting server
instance.

When `ignoreTrailingSlash` and `ignoreDuplicateSlashes` are both set
to `true` Fastify will remove duplicate slashes, and then trailing slashes,
meaning `//a//b//c//` will be converted to `/a/b/c`.

```js
const fastify = require('fastify')({
  ignoreDuplicateSlashes: true
})

// registers "/foo/bar/"
fastify.get('///foo//bar//', function (req, reply) {
  reply.send('foo')
})
```

### `maxParamLength`
<a id="factory-max-param-length"></a>

+ Default: `100`

You can set a custom length for parameters in parametric (standard, regex, and
multi) routes by using `maxParamLength` option; the default value is 100
characters. If the maximum length limit is reached, the not found route will
be invoked.

This can be useful especially if you have a regex-based route, protecting you
against [ReDoS
attacks](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS).

### `bodyLimit`
<a id="factory-body-limit"></a>

+ Default: `1048576` (1MiB)

Defines the maximum payload, in bytes, the server is allowed to accept.
The default body reader sends [`FST_ERR_CTP_BODY_TOO_LARGE`](./Errors.md#fst_err_ctp_body_too_large)
reply, if the size of the body exceeds this limit.
If [`preParsing` hook](./Hooks.md#preparsing) is provided, this limit is applied
to the size of the stream the hook returns (i.e. the size of "decoded" body).

### `onProtoPoisoning`
<a id="factory-on-proto-poisoning"></a>

+ Default: `'error'`

Defines what action the framework must take when parsing a JSON object with
`__proto__`. This functionality is provided by
[secure-json-parse](https://github.com/fastify/secure-json-parse). See
[Prototype Poisoning](../Guides/Prototype-Poisoning.md) for more details about
prototype poisoning attacks.

Possible values are `'error'`, `'remove'`, or `'ignore'`.

### `onConstructorPoisoning`
<a id="factory-on-constructor-poisoning"></a>

+ Default: `'error'`

Defines what action the framework must take when parsing a JSON object with
`constructor`. This functionality is provided by
[secure-json-parse](https://github.com/fastify/secure-json-parse). See
[Prototype Poisoning](../Guides/Prototype-Poisoning.md) for more details about
prototype poisoning attacks.

Possible values are `'error'`, `'remove'`, or `'ignore'`.

### `logger`
<a id="factory-logger"></a>

Fastify includes built-in logging via the [Pino](https://getpino.io/) logger.
This property is used to configure the internal logger instance.

The possible values this property may have are:

+ Default: `false`. The logger is disabled. All logging methods will point to a
  null logger [abstract-logging](https://npm.im/abstract-logging) instance.

+ `object`: a standard Pino [options
  object](https://github.com/pinojs/pino/blob/c77d8ec5ce/docs/API.md#constructor).
  This will be passed directly to the Pino constructor. If the following
  properties are not present on the object, they will be added accordingly:
    * `level`: the minimum logging level. If not set, it will be set to
      `'info'`.
    * `serializers`: a hash of serialization functions. By default, serializers
      are added for `req` (incoming request objects), `res` (outgoing response
      objects), and `err` (standard `Error` objects). When a log method receives
      an object with any of these properties then the respective serializer will
      be used for that property. For example:
        ```js
        fastify.get('/foo', function (req, res) {
          req.log.info({req}) // log the serialized request object
          res.send('foo')
        })
        ```
      Any user-supplied serializer will override the default serializer of the
      corresponding property.

### `loggerInstance`
<a id="factory-logger-instance"></a>

+ Default: `null`

A custom logger instance. The logger must be a Pino instance or conform to the
Pino interface by having the following methods: `info`, `error`, `debug`,
`fatal`, `warn`, `trace`, `child`. For example:
  ```js
  const pino = require('pino')();

  const customLogger = {
    info: function (o, ...n) {},
    warn: function (o, ...n) {},
    error: function (o, ...n) {},
    fatal: function (o, ...n) {},
    trace: function (o, ...n) {},
    debug: function (o, ...n) {},
    child: function() {
      const child = Object.create(this);
      child.pino = pino.child(...arguments);
      return child;
    },
  };

  const fastify = require('fastify')({logger: customLogger});
  ```

### `disableRequestLogging`
<a id="factory-disable-request-logging"></a>

+ Default: `false`

When logging is enabled, Fastify will issue an `info` level log
message when a request is received and when the response for that request has
been sent. By setting this option to `true`, these log messages will be
disabled. This allows for more flexible request start and end logging by
attaching custom `onRequest` and `onResponse` hooks.

The other log entries that will be disabled are:
- an error log written by the default `onResponse` hook on reply callback errors
- the error and info logs written by the `defaultErrorHandler`
on error management
- the info log written by the `fourOhFour` handler when a
non existent route is requested

Other log messages emitted by Fastify will stay enabled,
like deprecation warnings and messages
emitted when requests are received while the server is closing.

```js
// Examples of hooks to replicate the disabled functionality.
fastify.addHook('onRequest', (req, reply, done) => {
  req.log.info({ url: req.raw.url, id: req.id }, 'received request')
  done()
})

fastify.addHook('onResponse', (req, reply, done) => {
  req.log.info({ url: req.raw.originalUrl, statusCode: reply.raw.statusCode }, 'request completed')
  done()
})
```

### `serverFactory`
<a id="custom-http-server"></a>

You can pass a custom HTTP server to Fastify by using the `serverFactory`
option.

`serverFactory` is a function that takes a `handler` parameter, which takes the
`request` and `response` objects as parameters, and an options object, which is
the same you have passed to Fastify.

```js
const serverFactory = (handler, opts) => {
  const server = http.createServer((req, res) => {
    handler(req, res)
  })

  return server
}

const fastify = Fastify({ serverFactory })

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 })
```

Internally Fastify uses the API of Node core HTTP server, so if you are using a
custom server you must be sure to have the same API exposed. If not, you can
enhance the server instance inside the `serverFactory` function before the
`return` statement.

### `caseSensitive`
<a id="factory-case-sensitive"></a>

+ Default: `true`

When `true` routes are registered as case-sensitive. That is, `/foo`
is not equal to `/Foo`.
When `false` then routes are case-insensitive.

Please note that setting this option to `false` goes against
[RFC3986](https://datatracker.ietf.org/doc/html/rfc3986#section-6.2.2.1).

By setting `caseSensitive` to `false`, all paths will be matched as lowercase,
but the route parameters or wildcards will maintain their original letter
casing.
This option does not affect query strings, please refer to
[`querystringParser`](#querystringparser) to change their handling.

```js
fastify.get('/user/:username', (request, reply) => {
  // Given the URL: /USER/NodeJS
  console.log(request.params.username) // -> 'NodeJS'
})
```

### `allowUnsafeRegex`
<a id="factory-allow-unsafe-regex"></a>

+ Default `false`

Disabled by default, so routes only allow safe regular expressions. To use
unsafe expressions, set `allowUnsafeRegex` to `true`.

```js
fastify.get('/user/:id(^([0-9]+){4}$)', (request, reply) => {
  // Throws an error without allowUnsafeRegex = true
})
```

### `requestIdHeader`
<a id="factory-request-id-header"></a>

+ Default: `'request-id'`

The header name used to set the request-id. See [the
request-id](./Logging.md#logging-request-id) section.
Setting `requestIdHeader` to `true` will set the `requestIdHeader` to
`"request-id"`.
Setting `requestIdHeader` to a non-empty string will use
the specified string as the `requestIdHeader`.
By default `requestIdHeader` is set to `false` and will immediately use [genReqId](#genreqid).
Setting `requestIdHeader` to an empty String (`""`) will set the
requestIdHeader to `false`.

+ Default: `false`

```js
const fastify = require('fastify')({
  requestIdHeader: 'x-custom-id', // -> use 'X-Custom-Id' header if available
  //requestIdHeader: false, // -> always use genReqId
})
```

### `requestIdLogLabel`
<a id="factory-request-id-log-label"></a>

+ Default: `'reqId'`

Defines the label used for the request identifier when logging the request.

### `genReqId`
<a id="factory-gen-request-id"></a>

+ Default: `value of 'request-id' header if provided or monotonically increasing
  integers`

Function for generating the request-id. It will receive the _raw_ incoming
request as a parameter. This function is expected to be error-free.

Especially in distributed systems, you may want to override the default ID
generation behavior as shown below. For generating `UUID`s you may want to check
out [hyperid](https://github.com/mcollina/hyperid).

> ℹ️ Note:
> `genReqId` will be not called if the header set in
> <code>[requestIdHeader](#requestidheader)</code> is available (defaults to
> 'request-id').

```js
let i = 0
const fastify = require('fastify')({
  genReqId: function (req) { return i++ }
})
```

### `trustProxy`
<a id="factory-trust-proxy"></a>

+ Default: `false`
+ `true/false`: Trust all proxies (`true`) or do not trust any proxies
  (`false`).
+ `string`: Trust only given IP/CIDR (e.g. `'127.0.0.1'`). May be a list of
  comma separated values (e.g. `'127.0.0.1,192.168.1.1/24'`).
+ `Array<string>`: Trust only given IP/CIDR list (e.g. `['127.0.0.1']`).
+ `number`: Trust the nth hop from the front-facing proxy server as the client.
+ `Function`: Custom trust function that takes `address` as first argument
    ```js
    function myTrustFn(address, hop) {
      return address === '1.2.3.4' || hop === 1
    }
    ```

By enabling the `trustProxy` option, Fastify will know that it is sitting behind
a proxy and that the `X-Forwarded-*` header fields may be trusted, which
otherwise may be easily spoofed.

```js
const fastify = Fastify({ trustProxy: true })
```

For more examples, refer to the
[`@fastify/proxy-addr`](https://www.npmjs.com/package/@fastify/proxy-addr) package.

You may access the `ip`, `ips`, `host` and `protocol` values on the
[`request`](./Request.md) object.

```js
fastify.get('/', (request, reply) => {
  console.log(request.ip)
  console.log(request.ips)
  console.log(request.host)
  console.log(request.protocol)
})
```

> ℹ️ Note:
> If a request contains multiple `x-forwarded-host` or `x-forwarded-proto`
> headers, it is only the last one that is used to derive `request.hostname`
> and `request.protocol`.

### `pluginTimeout`
<a id="plugin-timeout"></a>

+ Default: `10000`

The maximum amount of time in *milliseconds* in which a plugin can load. If not,
[`ready`](#ready) will complete with an `Error` with code
`'ERR_AVVIO_PLUGIN_TIMEOUT'`. When set to `0`, disables this check. This
controls [avvio](https://www.npmjs.com/package/avvio) 's `timeout` parameter.

### `querystringParser`
<a id="factory-querystring-parser"></a>

The default query string parser that Fastify uses is a more performant fork 
of Node.js's core `querystring` module called 
[`fast-querystring`](https://github.com/anonrig/fast-querystring).

You can use this option to use a custom parser, such as
[`qs`](https://www.npmjs.com/package/qs).

If you only want the keys (and not the values) to be case insensitive we
recommend using a custom parser to convert only the keys to lowercase.

```js
const qs = require('qs')
const fastify = require('fastify')({
  querystringParser: str => qs.parse(str)
})
```

You can also use Fastify's default parser but change some handling behavior,
like the example below for case insensitive keys and values:

```js
const querystring = require('fast-querystring')
const fastify = require('fastify')({
  querystringParser: str => querystring.parse(str.toLowerCase())
})
```

### `exposeHeadRoutes`
<a id="exposeHeadRoutes"></a>

+ Default: `true`

Automatically creates a sibling `HEAD` route for each `GET` route defined. If
you want a custom `HEAD` handler without disabling this option, make sure to
define it before the `GET` route.

### `constraints`
<a id="constraints"></a>

Fastify's built-in route constraints are provided by `find-my-way`, which
allows constraining routes by `version` or `host`. You can add new constraint
strategies, or override the built-in strategies, by providing a `constraints`
object with strategies for `find-my-way`. You can find more information on
constraint strategies in the
[find-my-way](https://github.com/delvedor/find-my-way) documentation.

```js
const customVersionStrategy = {
  storage: function () {
    const versions = {}
    return {
      get: (version) => { return versions[version] || null },
      set: (version, store) => { versions[version] = store }
    }
  },
  deriveVersion: (req, ctx) => {
    return req.headers['accept']
  }
}

const fastify = require('fastify')({
  constraints: {
    version: customVersionStrategy
  }
})
```

### `return503OnClosing`
<a id="factory-return-503-on-closing"></a>

+ Default: `true`

Returns 503 after calling `close` server method. If `false`, the server routes
the incoming request as usual.

### `ajv`
<a id="factory-ajv"></a>

Configure the Ajv v8 instance used by Fastify without providing a custom one.
The default configuration is explained in the
[#schema-validator](./Validation-and-Serialization.md#schema-validator) section.

```js
const fastify = require('fastify')({
  ajv: {
    customOptions: {
      removeAdditional: 'all' // Refer to [ajv options](https://ajv.js.org/options.html#removeadditional)
    },
    plugins: [
      require('ajv-merge-patch'),
      [require('ajv-keywords'), 'instanceof']
      // Usage: [plugin, pluginOptions] - Plugin with options
      // Usage: plugin - Plugin without options
    ]
  }
})
```

### `serializerOpts`
<a id="serializer-opts"></a>

Customize the options of the default
[`fast-json-stringify`](https://github.com/fastify/fast-json-stringify#options)
instance that serializes the response's payload:

```js
const fastify = require('fastify')({
  serializerOpts: {
    rounding: 'ceil'
  }
})
```

### `http2SessionTimeout`
<a id="http2-session-timeout"></a>

+ Default: `72000`

Set a default
[timeout](https://nodejs.org/api/http2.html#http2sessionsettimeoutmsecs-callback)
to every incoming HTTP/2 session in milliseconds. The session will be closed on
the timeout.

This option is needed to offer a graceful "close" experience when using
HTTP/2. The low default has been chosen to mitigate denial of service attacks.
When the server is behind a load balancer or can scale automatically this value
can be increased to fit the use case. Node core defaults this to `0`.

### `frameworkErrors`
<a id="framework-errors"></a>

+ Default: `null`

Fastify provides default error handlers for the most common use cases. It is
possible to override one or more of those handlers with custom code using this
option.

> ℹ️ Note:
> Only `FST_ERR_BAD_URL` and `FST_ERR_ASYNC_CONSTRAINT` are implemented at present.

```js
const fastify = require('fastify')({
  frameworkErrors: function (error, req, res) {
    if (error instanceof FST_ERR_BAD_URL) {
      res.code(400)
      return res.send("Provided url is not valid")
    } else if(error instanceof FST_ERR_ASYNC_CONSTRAINT) {
      res.code(400)
      return res.send("Provided header is not valid")
    } else {
      res.send(err)
    }
  }
})
```

### `clientErrorHandler`
<a id="client-error-handler"></a>

Set a
[clientErrorHandler](https://nodejs.org/api/http.html#http_event_clienterror)
that listens to `error` events emitted by client connections and responds with a
`400`.

It is possible to override the default `clientErrorHandler` using this option.

+ Default:
```js
function defaultClientErrorHandler (err, socket) {
  if (err.code === 'ECONNRESET') {
    return
  }

  const body = JSON.stringify({
    error: http.STATUS_CODES['400'],
    message: 'Client Error',
    statusCode: 400
  })
  this.log.trace({ err }, 'client error')

  if (socket.writable) {
    socket.end([
      'HTTP/1.1 400 Bad Request',
      `Content-Length: ${body.length}`,
      `Content-Type: application/json\r\n\r\n${body}`
    ].join('\r\n'))
  }
}
```

> ℹ️ Note:
> `clientErrorHandler` operates with raw sockets. The handler is expected to
> return a properly formed HTTP response that includes a status line, HTTP headers
> and a message body. Before attempting to write the socket, the handler should
> check if the socket is still writable as it may have already been destroyed.

```js
const fastify = require('fastify')({
  clientErrorHandler: function (err, socket) {
    const body = JSON.stringify({
      error: {
        message: 'Client error',
        code: '400'
      }
    })

    // `this` is bound to fastify instance
    this.log.trace({ err }, 'client error')

    // the handler is responsible for generating a valid HTTP response
    socket.end([
      'HTTP/1.1 400 Bad Request',
      `Content-Length: ${body.length}`,
      `Content-Type: application/json\r\n\r\n${body}`
    ].join('\r\n'))
  }
})
```

### `rewriteUrl`
<a id="rewrite-url"></a>

Set a sync callback function that must return a string that allows rewriting
URLs. This is useful when you are behind a proxy that changes the URL.
Rewriting a URL will modify the `url` property of the `req` object.

Note that `rewriteUrl` is called _before_ routing, it is not encapsulated and it
is an instance-wide configuration.

```js
// @param {object} req The raw Node.js HTTP request, not the `FastifyRequest` object.
// @this Fastify The root Fastify instance (not an encapsulated instance).
// @returns {string} The path that the request should be mapped to.
function rewriteUrl (req) {
  if (req.url === '/hi') {
    this.log.debug({ originalUrl: req.url, url: '/hello' }, 'rewrite url');
    return '/hello'
  } else {
    return req.url;
  }
}
```

### `useSemicolonDelimiter`
<a id="use-semicolon-delimiter"></a>

+ Default `false`

Fastify uses [find-my-way](https://github.com/delvedor/find-my-way) which supports,
separating the path and query string with a `;` character (code 59), e.g. `/dev;foo=bar`.
This decision originated from [delvedor/find-my-way#76]
(https://github.com/delvedor/find-my-way/issues/76). Thus, this option will support
backwards compatiblilty for the need to split on `;`. To enable support for splitting
on `;` set `useSemicolonDelimiter` to `true`.

```js
const fastify = require('fastify')({
  useSemicolonDelimiter: true
})

fastify.get('/dev', async (request, reply) => {
  // An example request such as `/dev;foo=bar`
  // Will produce the following query params result `{ foo = 'bar' }`
  return request.query
})
```

### `allowErrorHandlerOverride`
<a id="allow-error-handler-override"></a>

* **Default:** `true`

> ⚠ **Warning:** This option will be set to `false` by default 
> in the next major release.

When set to `false`, it prevents `setErrorHandler` from being called 
multiple times within the same scope, ensuring that the previous error 
handler is not unintentionally overridden.

#### Example of incorrect usage:

```js
app.setErrorHandler(function freeSomeResources () {
  // Never executed, memory leaks
})

app.setErrorHandler(function anotherErrorHandler () {
  // Overrides the previous handler
})
```

## Instance

### Server Methods

#### server
<a id="server"></a>

`fastify.server`: The Node core
[server](https://nodejs.org/api/http.html#http_class_http_server) object as
returned by the [**`Fastify factory function`**](#factory).

> ⚠ Warning:
> If utilized improperly, certain Fastify features could be disrupted.
> It is recommended to only use it for attaching listeners.

#### after
<a id="after"></a>

Invoked when the current plugin and all the plugins that have been registered
within it have finished loading. It is always executed before the method
`fastify.ready`.

```js
fastify
  .register((instance, opts, done) => {
    console.log('Current plugin')
    done()
  })
  .after(err => {
    console.log('After current plugin')
  })
  .register((instance, opts, done) => {
    console.log('Next plugin')
    done()
  })
  .ready(err => {
    console.log('Everything has been loaded')
  })
```

In case `after()` is called without a function, it returns a `Promise`:

```js
fastify.register(async (instance, opts) => {
  console.log('Current plugin')
})

await fastify.after()
console.log('After current plugin')

fastify.register(async (instance, opts) => {
  console.log('Next plugin')
})

await fastify.ready()

console.log('Everything has been loaded')
```

#### ready
<a id="ready"></a>

Function called when all the plugins have been loaded. It takes an error
parameter if something went wrong.
```js
fastify.ready(err => {
  if (err) throw err
})
```
If it is called without any arguments, it will return a `Promise`:

```js
fastify.ready().then(() => {
  console.log('successfully booted!')
}, (err) => {
  console.log('an error happened', err)
})
```

#### listen
<a id="listen"></a>

Starts the server and internally waits for the `.ready()` event. The signature
is `.listen([options][, callback])`. Both the `options` object and the
`callback` parameters extend the [Node.js
core](https://nodejs.org/api/net.html#serverlistenoptions-callback) options
object. Thus, all core options are available with the following additional
Fastify specific options:

### `listenTextResolver`
<a id="listen-text-resolver"></a>

Set an optional resolver for the text to log after server has been successfully
started.
It is possible to override the default `Server listening at [address]` log
entry using this option.

```js
server.listen({
  port: 9080,
  listenTextResolver: (address) => { return `Prometheus metrics server is listening at ${address}` }
})
```

By default, the server will listen on the address(es) resolved by `localhost`
when no specific host is provided. If listening on any available interface is
desired, then specifying `0.0.0.0` for the address will listen on all IPv4
addresses. The address argument provided above will then return the first such
IPv4 address. The following table details the possible values for `host` when
targeting `localhost`, and what the result of those values for `host` will be.

 Host          | IPv4 | IPv6
 --------------|------|-------
 `::`            | ✅<sup>*</sup> | ✅
 `::` + [`ipv6Only`](https://nodejs.org/api/net.html#serverlistenoptions-callback) | 🚫 | ✅
 `0.0.0.0`       | ✅ | 🚫
 `localhost`     | ✅ | ✅
 `127.0.0.1`     | ✅ | 🚫
 `::1`           | 🚫 | ✅

<sup>*</sup> Using `::` for the address will listen on all IPv6 addresses and,
depending on OS, may also listen on [all IPv4
addresses](https://nodejs.org/api/net.html#serverlistenport-host-backlog-callback).

Be careful when deciding to listen on all interfaces; it comes with inherent
[security
risks](https://web.archive.org/web/20170831174611/https://snyk.io/blog/mongodb-hack-and-secure-defaults/).

The default is to listen on `port: 0` (which picks the first available open
port) and `host: 'localhost'`:

```js
fastify.listen((err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

Specifying an address is also supported:

```js
fastify.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

If no callback is provided a Promise is returned:

```js
fastify.listen({ port: 3000 })
  .then((address) => console.log(`server listening on ${address}`))
  .catch(err => {
    console.log('Error starting server:', err)
    process.exit(1)
  })
```

When deploying to a Docker, and potentially other, containers, it is advisable
to listen on `0.0.0.0` because they do not default to exposing mapped ports to
`localhost`:

```js
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

If the `port` is omitted (or is set to zero), a random available port is
automatically chosen (available via `fastify.server.address().port`).

The default options of listen are:

```js
fastify.listen({
  port: 0,
  host: 'localhost',
  exclusive: false,
  readableAll: false,
  writableAll: false,
  ipv6Only: false
}, (err) => {})
```

#### addresses
<a id="addresses"></a>

This method returns an array of addresses that the server is listening on. If
you call it before `listen()` is called or after the `close()` function, it will
return an empty array.

```js
await fastify.listen({ port: 8080 })
const addresses = fastify.addresses()
// [
//   { port: 8080, family: 'IPv6', address: '::1' },
//   { port: 8080, family: 'IPv4', address: '127.0.0.1' }
// ]
```

Note that the array contains the `fastify.server.address()` too.

#### routing
<a id="routing"></a>

Method to access the `lookup` method of the internal router and match the
request to the appropriate handler:

```js
fastify.routing(req, res)
```

#### route
<a id="route"></a>

Method to add routes to the server, it also has shorthand functions, check
[here](./Routes.md).

#### hasRoute
<a id="hasRoute"></a>

Method to check if a route is already registered to the internal router. It
expects an object as the payload. `url` and `method` are mandatory fields. It
is possible to also specify `constraints`. The method returns `true` if the
route is registered or `false` if not.

```js
const routeExists = fastify.hasRoute({
  url: '/',
  method: 'GET',
  constraints: { version: '1.0.0' } // optional
})

if (routeExists === false) {
  // add route
}
```

#### findRoute
<a id="findRoute"></a>

Method to retrieve a route already registered to the internal router. It
expects an object as the payload. `url` and `method` are mandatory fields. It
is possible to also specify `constraints`.
The method returns a route object or `null` if the route cannot be found.

```js
const route = fastify.findRoute({
  url: '/artists/:artistId',
  method: 'GET',
  constraints: { version: '1.0.0' } // optional
})

if (route !== null) {
  // perform some route checks
  console.log(route.params)   // `{artistId: ':artistId'}`
}
```


#### close
<a id="close"></a>

`fastify.close(callback)`: call this function to close the server instance and
run the [`'onClose'`](./Hooks.md#on-close) hook.

Calling `close` will also cause the server to respond to every new incoming
request with a `503` error and destroy that request. See [`return503OnClosing`
flags](#factory-return-503-on-closing) for changing this behavior.

If it is called without any arguments, it will return a Promise:

```js
fastify.close().then(() => {
  console.log('successfully closed!')
}, (err) => {
  console.log('an error happened', err)
})
```

#### decorate*
<a id="decorate"></a>

Function useful if you need to decorate the fastify instance, Reply or Request,
check [here](./Decorators.md).

#### register
<a id="register"></a>

Fastify allows the user to extend its functionality with plugins. A plugin can
be a set of routes, a server decorator, or whatever, check [here](./Plugins.md).

#### addHook
<a id="addHook"></a>

Function to add a specific hook in the lifecycle of Fastify, check
[here](./Hooks.md).

#### prefix
<a id="prefix"></a>

The full path that will be prefixed to a route.

Example:

```js
fastify.register(function (instance, opts, done) {
  instance.get('/foo', function (request, reply) {
    // Will log "prefix: /v1"
    request.log.info('prefix: %s', instance.prefix)
    reply.send({ prefix: instance.prefix })
  })

  instance.register(function (instance, opts, done) {
    instance.get('/bar', function (request, reply) {
      // Will log "prefix: /v1/v2"
      request.log.info('prefix: %s', instance.prefix)
      reply.send({ prefix: instance.prefix })
    })

    done()
  }, { prefix: '/v2' })

  done()
}, { prefix: '/v1' })
```

#### pluginName
<a id="pluginName"></a>

Name of the current plugin. The root plugin is called `'fastify'`. There are
different ways to define a name (in order).

1. If you use [fastify-plugin](https://github.com/fastify/fastify-plugin) the
   metadata `name` is used.
2. If the exported plugin has the `Symbol.for('fastify.display-name')` property,
   then the value of that property is used.
   Example: `pluginFn[Symbol.for('fastify.display-name')] = "Custom Name"`
3. If you `module.exports` a plugin the filename is used.
4. If you use a regular [function
   declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Defining_functions)
   the function name is used.

*Fallback*: The first two lines of your plugin will represent the plugin name.
Newlines are replaced by ` -- `. This will help to identify the root cause when
you deal with many plugins.

> ⚠ Warning:
> If you have to deal with nested plugins, the name differs with the usage of
> the [fastify-plugin](https://github.com/fastify/fastify-plugin) because
> no new scope is created and therefore we have no place to attach contextual
> data. In that case, the plugin name will represent the boot order of all
> involved plugins in the format of `fastify -> plugin-A -> plugin-B`.

#### hasPlugin
<a id="hasPlugin"></a>

Method to check if a specific plugin has been registered. Relies on the plugin
metadata name. Returns `true` if the plugin is registered. Otherwise, returns
`false`.

```js
const fastify = require('fastify')()
fastify.register(require('@fastify/cookie'), {
  secret: 'my-secret',
  parseOptions: {}
})

fastify.ready(() => {
  fastify.hasPlugin('@fastify/cookie') // true
})
```

### listeningOrigin
<a id="listeningOrigin"></a>

The current origin the server is listening to.
For example, a TCP socket based server returns
a base address like `http://127.0.0.1:3000`,
and a Unix socket server will return the socket
path, e.g. `fastify.temp.sock`.

#### log
<a id="log"></a>

The logger instance, check [here](./Logging.md).

#### version
<a id="version"></a>

Fastify version of the instance. Used for plugin support. See
[Plugins](./Plugins.md#handle-the-scope) for information on how the version is
used by plugins.

#### inject
<a id="inject"></a>

Fake HTTP injection (for testing purposes)
[here](../Guides/Testing.md#benefits-of-using-fastifyinject).

#### addHttpMethod
<a id="addHttpMethod"></a>

Fastify supports the `GET`, `HEAD`, `TRACE`, `DELETE`, `OPTIONS`,
`PATCH`, `PUT` and `POST` HTTP methods by default.
The `addHttpMethod` method allows to add any non standard HTTP
methods to the server that are [supported by Node.js](https://nodejs.org/api/http.html#httpmethods).

```js
// Add a new HTTP method called 'MKCOL' that supports a request body
fastify.addHttpMethod('MKCOL', { hasBody: true,  })

// Add a new HTTP method called 'COPY' that does not support a request body
fastify.addHttpMethod('COPY')
```

After calling `addHttpMethod`, it is possible to use the route shorthand
methods to define routes for the new HTTP method:

```js
fastify.addHttpMethod('MKCOL', { hasBody: true })
fastify.mkcol('/', (req, reply) => {
  // Handle the 'MKCOL' request
})
```


#### addSchema
<a id="add-schema"></a>

`fastify.addSchema(schemaObj)`, adds a JSON schema to the Fastify instance. This
allows you to reuse it everywhere in your application just by using the standard
`$ref` keyword.

To learn more, read the [Validation and
Serialization](./Validation-and-Serialization.md) documentation.

#### getSchemas
<a id="get-schemas"></a>

`fastify.getSchemas()`, returns a hash of all schemas added via `.addSchema`.
The keys of the hash are the `$id`s of the JSON Schema provided.

#### getSchema
<a id="get-schema"></a>

`fastify.getSchema(id)`, return the JSON schema added with `.addSchema` and the
matching `id`. It returns `undefined` if it is not found.

#### setReplySerializer
<a id="set-reply-serializer"></a>

Set the reply serializer for all the routes. This will be used as default if a
[Reply.serializer(func)](./Reply.md#serializerfunc) has not been set. The
handler is fully encapsulated, so different plugins can set different error
handlers. Note: the function parameter is called only for status `2xx`. Check
out the [`setErrorHandler`](#seterrorhandler) for errors.

```js
fastify.setReplySerializer(function (payload, statusCode){
  // serialize the payload with a sync function
  return `my serialized ${statusCode} content: ${payload}`
})
```

#### setValidatorCompiler
<a id="set-validator-compiler"></a>

Set the schema validator compiler for all routes. See
[#schema-validator](./Validation-and-Serialization.md#schema-validator).

#### setSchemaErrorFormatter
<a id="set-schema-error-formatter"></a>

Set the schema error formatter for all routes. See
[#error-handling](./Validation-and-Serialization.md#schemaerrorformatter).

#### setSerializerCompiler
<a id="set-serializer-resolver"></a>

Set the schema serializer compiler for all routes. See
[#schema-serializer](./Validation-and-Serialization.md#schema-serializer).

> ℹ️ Note:
> [`setReplySerializer`](#set-reply-serializer) has priority if set!

#### validatorCompiler
<a id="validator-compiler"></a>

This property can be used to get the schema validator. If not set, it will be
`null` until the server starts, then it will be a function with the signature
`function ({ schema, method, url, httpPart })` that returns the input `schema`
compiled to a function for validating data. The input `schema` can access all
the shared schemas added with [`.addSchema`](#add-schema) function.

#### serializerCompiler
<a id="serializer-compiler"></a>

This property can be used to get the schema serializer. If not set, it will be
`null` until the server starts, then it will be a function with the signature
`function ({ schema, method, url, httpPart })` that returns the input `schema`
compiled to a function for validating data. The input `schema` can access all
the shared schemas added with [`.addSchema`](#add-schema) function.

#### schemaErrorFormatter
<a id="schema-error-formatter"></a>

This property can be used to set a function to format errors that happen while
the `validationCompiler` fails to validate the schema. See
[#error-handling](./Validation-and-Serialization.md#schemaerrorformatter).

#### schemaController
<a id="schema-controller"></a>

This property can be used to fully manage:
- `bucket`: where the schemas of your application will be stored
- `compilersFactory`: what module must compile the JSON schemas

It can be useful when your schemas are stored in another data structure that is
unknown to Fastify.

Another use case is to tweak all the schemas processing. Doing so it is possible
to use Ajv v8 JTD or Standalone feature. To use such as JTD or the Standalone
mode, refers to the [`@fastify/ajv-compiler`
documentation](https://github.com/fastify/ajv-compiler#usage).

```js
const fastify = Fastify({
  schemaController: {
    /**
     * This factory is called whenever `fastify.register()` is called.
     * It may receive as input the schemas of the parent context if some schemas have been added.
     * @param {object} parentSchemas these schemas will be returned by the
     * `getSchemas()` method function of the returned `bucket`.
     */
    bucket: function factory (parentSchemas) {
      return {
        add (inputSchema) {
          // This function must store the schema added by the user.
          // This function is invoked when `fastify.addSchema()` is called.
        },
        getSchema (schema$id) {
          // This function must return the raw schema requested by the `schema$id`.
          // This function is invoked when `fastify.getSchema(id)` is called.
          return aSchema
        },
        getSchemas () {
          // This function must return all the schemas referenced by the routes schemas' $ref
          // It must return a JSON where the property is the schema `$id` and the value is the raw JSON Schema.
          const allTheSchemaStored = {
            'schema$id1': schema1,
            'schema$id2': schema2
          }
          return allTheSchemaStored
        }
      }
    },

    /**
     * The compilers factory lets you fully control the validator and serializer
     * in the Fastify's lifecycle, providing the encapsulation to your compilers.
     */
    compilersFactory: {
      /**
       * This factory is called whenever a new validator instance is needed.
       * It may be called whenever `fastify.register()` is called only if new schemas have been added to the
       * encapsulation context.
       * It may receive as input the schemas of the parent context if some schemas have been added.
       * @param {object} externalSchemas these schemas will be returned by the
       * `bucket.getSchemas()`. Needed to resolve the external references $ref.
       * @param {object} ajvServerOption the server `ajv` options to build your compilers accordingly
       */
      buildValidator: function factory (externalSchemas, ajvServerOption) {
        // This factory function must return a schema validator compiler.
        // See [#schema-validator](./Validation-and-Serialization.md#schema-validator) for details.
        const yourAjvInstance = new Ajv(ajvServerOption.customOptions)
        return function validatorCompiler ({ schema, method, url, httpPart }) {
          return yourAjvInstance.compile(schema)
        }
      },

      /**
       * This factory is called whenever a new serializer instance is needed.
       * It may be called whenever `fastify.register()` is called only if new schemas have been added to the
       * encapsulation context.
       * It may receive as input the schemas of the parent context if some schemas have been added.
       * @param {object} externalSchemas these schemas will be returned by the
       * `bucket.getSchemas()`. Needed to resolve the external references $ref.
       * @param {object} serializerOptsServerOption the server `serializerOpts`
       * options to build your compilers accordingly
       */
      buildSerializer: function factory (externalSchemas, serializerOptsServerOption) {
        // This factory function must return a schema serializer compiler.
        // See [#schema-serializer](./Validation-and-Serialization.md#schema-serializer) for details.
        return function serializerCompiler ({ schema, method, url, httpStatus, contentType }) {
          return data => JSON.stringify(data)
        }
      }
    }
  }
});
```

#### setNotFoundHandler
<a id="set-not-found-handler"></a>

`fastify.setNotFoundHandler(handler(request, reply))`: set the 404 handler. This
call is encapsulated by prefix, so different plugins can set different not found
handlers if a different [`prefix` option](./Plugins.md#route-prefixing-option)
is passed to `fastify.register()`. The handler is treated as a regular route
handler so requests will go through the full [Fastify
lifecycle](./Lifecycle.md#lifecycle). *async-await* is supported as well.

You can also register [`preValidation`](./Hooks.md#route-hooks) and
[`preHandler`](./Hooks.md#route-hooks) hooks for the 404 handler.

> ℹ️ Note:
> The `preValidation` hook registered using this method will run for a
> route that Fastify does not recognize and **not** when a route handler manually
> calls [`reply.callNotFound`](./Reply.md#call-not-found). In which case, only
> preHandler will be run.


```js
fastify.setNotFoundHandler({
  preValidation: (req, reply, done) => {
    // your code
    done()
  },
  preHandler: (req, reply, done) => {
    // your code
    done()
  }
}, function (request, reply) {
    // Default not found handler with preValidation and preHandler hooks
})

fastify.register(function (instance, options, done) {
  instance.setNotFoundHandler(function (request, reply) {
    // Handle not found request without preValidation and preHandler hooks
    // to URLs that begin with '/v1'
  })
  done()
}, { prefix: '/v1' })
```

Fastify calls setNotFoundHandler to add a default 404 handler at startup before
plugins are registered. If you would like to augment the behavior of the default
404 handler, for example with plugins, you can call setNotFoundHandler with no
arguments `fastify.setNotFoundHandler()` within the context of these registered
plugins.

> ℹ️ Note:
> Some config properties from the request object will be
> undefined inside the custom not found handler. E.g.:
> `request.routeOptions.url`, `routeOptions.method` and `routeOptions.config`.
> This method design goal is to allow calling the common not found route.
> To return a per-route customized 404 response, you can do it in
> the response itself.

#### setErrorHandler
<a id="set-error-handler"></a>

`fastify.setErrorHandler(handler(error, request, reply))`: Set a function that
will be invoked whenever an exception is thrown during the request lifecycle.
The handler is bound to the Fastify instance and is fully encapsulated, so
different plugins can set different error handlers. *async-await* is
supported as well.

If the error `statusCode` is less than 400, Fastify will automatically
set it to 500 before calling the error handler.

`setErrorHandler` will ***not*** catch:
- exceptions thrown in an `onResponse` hook because the response has already been
  sent to the client. Use the `onSend` hook instead.
- not found (404) errors. Use [`setNotFoundHandler`](#set-not-found-handler)
  instead.

```js
fastify.setErrorHandler(function (error, request, reply) {
  // Log error
  this.log.error(error)
  // Send error response
  reply.status(409).send({ ok: false })
})
```

Fastify is provided with a default function that is called if no error handler
is set. It can be accessed using `fastify.errorHandler` and it logs the error
with respect to its `statusCode`.

```js
const statusCode = error.statusCode
if (statusCode >= 500) {
  log.error(error)
} else if (statusCode >= 400) {
  log.info(error)
} else {
  log.error(error)
}
```

> ⚠ Warning:
> Avoid calling setErrorHandler multiple times in the same scope.
> See [`allowErrorHandlerOverride`](#allowerrorhandleroverride).


#### setChildLoggerFactory
<a id="set-child-logger-factory"></a>

`fastify.setChildLoggerFactory(factory(logger, bindings, opts, rawReq))`: Set a
function that will be called when creating a child logger instance for each request
which allows for modifying or adding child logger bindings and logger options, or
returning a custom child logger implementation.

Child logger bindings have a performance advantage over per-log bindings because
they are pre-serialized by Pino when the child logger is created.

The first parameter is the parent logger instance, followed by the default bindings
and logger options which should be passed to the child logger, and finally
the raw request (not a Fastify request object). The function is bound with `this`
being the Fastify instance.

For example:
```js
const fastify = require('fastify')({
  childLoggerFactory: function (logger, bindings, opts, rawReq) {
    // Calculate additional bindings from the request if needed
    bindings.traceContext = rawReq.headers['x-cloud-trace-context']
    return logger.child(bindings, opts)
  }
})
```

The handler is bound to the Fastify instance and is fully encapsulated, so
different plugins can set different logger factories.

#### setGenReqId
<a id="set-gen-req-id"></a>

`fastify.setGenReqId(function (rawReq))` Synchronous function for setting the request-id
for additional Fastify instances. It will receive the _raw_ incoming request as a
parameter. The provided function should not throw an Error in any case.

Especially in distributed systems, you may want to override the default ID
generation behavior to handle custom ways of generating different IDs in
order to handle different use cases. Such as observability or webhooks plugins.

For example:
```js
const fastify = require('fastify')({
  genReqId: (req) => {
    return 'base'
  }
})

fastify.register((instance, opts, done) => {
  instance.setGenReqId((req) => {
    // custom request ID for `/webhooks`
    return 'webhooks-id'
  })
  done()
}, { prefix: '/webhooks' })

fastify.register((instance, opts, done) => {
  instance.setGenReqId((req) => {
    // custom request ID for `/observability`
    return 'observability-id'
  })
  done()
}, { prefix: '/observability' })
```

The handler is bound to the Fastify instance and is fully encapsulated, so
different plugins can set a different request ID.

#### addConstraintStrategy
<a id="addConstraintStrategy"></a>

Function to add a custom constraint strategy. To register a new type of
constraint, you must add a new constraint strategy that knows how to match
values to handlers, and that knows how to get the constraint value from a
request.

Add a custom constraint strategy using the `fastify.addConstraintStrategy`
method:

```js
const customResponseTypeStrategy = {
  // strategy name for referencing in the route handler `constraints` options
  name: 'accept',
  // storage factory for storing routes in the find-my-way route tree
  storage: function () {
    let handlers = {}
    return {
      get: (type) => { return handlers[type] || null },
      set: (type, store) => { handlers[type] = store }
    }
  },
  // function to get the value of the constraint from each incoming request
  deriveConstraint: (req, ctx) => {
    return req.headers['accept']
  },
  // optional flag marking if handlers without constraints can match requests that have a value for this constraint
  mustMatchWhenDerived: true
}

const router = Fastify();
router.addConstraintStrategy(customResponseTypeStrategy);
```

#### hasConstraintStrategy
<a id="hasConstraintStrategy"></a>

The `fastify.hasConstraintStrategy(strategyName)` checks if there already exists
a custom constraint strategy with the same name.

#### printRoutes
<a id="print-routes"></a>

`fastify.printRoutes()`: Fastify router builds a tree of routes for each HTTP
method. If you call the prettyPrint without specifying an HTTP method, it will
merge all the trees into one and print it. The merged tree doesn't represent the
internal router structure. **Do not use it for debugging.**

*Remember to call it inside or after a `ready` call.*

```js
fastify.get('/test', () => {})
fastify.get('/test/hello', () => {})
fastify.get('/testing', () => {})
fastify.get('/testing/:param', () => {})
fastify.put('/update', () => {})

fastify.ready(() => {
  console.log(fastify.printRoutes())
  // └── /
  //     ├── test (GET)
  //     │   ├── /hello (GET)
  //     │   └── ing (GET)
  //     │       └── /
  //     │           └── :param (GET)
  //     └── update (PUT)
})
```

If you want to print the internal router tree, you should specify the `method`
param. Printed tree will represent the internal router structure.
**You can use it for debugging.**

```js
  console.log(fastify.printRoutes({ method: 'GET' }))
  // └── /
  //     └── test (GET)
  //         ├── /hello (GET)
  //         └── ing (GET)
  //             └── /
  //                 └── :param (GET)

  console.log(fastify.printRoutes({ method: 'PUT' }))
  // └── /
  //     └── update (PUT)
```

`fastify.printRoutes({ commonPrefix: false })` will print compressed trees. This
may be useful when you have a large number of routes with common prefixes.
It doesn't represent the internal router structure. **Do not use it for debugging.**

```js
  console.log(fastify.printRoutes({ commonPrefix: false }))
  // ├── /test (GET)
  // │   ├── /hello (GET)
  // │   └── ing (GET)
  // │       └── /:param (GET)
  // └── /update (PUT)
```

`fastify.printRoutes({ includeMeta: (true | []) })` will display properties from
the `route.store` object for each displayed route. This can be an `array` of
keys (e.g. `['onRequest', Symbol('key')]`), or `true` to display all properties.
A shorthand option, `fastify.printRoutes({ includeHooks: true })` will include
all [hooks](./Hooks.md).

```js
  fastify.get('/test', () => {})
  fastify.get('/test/hello', () => {})

  const onTimeout = () => {}

  fastify.addHook('onRequest', () => {})
  fastify.addHook('onTimeout', onTimeout)

  console.log(fastify.printRoutes({ includeHooks: true, includeMeta: ['errorHandler'] }))
  // └── /
  //     └── test (GET)
  //         • (onTimeout) ["onTimeout()"]
  //         • (onRequest) ["anonymous()"]
  //         • (errorHandler) "defaultErrorHandler()"
  //         test (HEAD)
  //         • (onTimeout) ["onTimeout()"]
  //         • (onRequest) ["anonymous()"]
  //         • (onSend) ["headRouteOnSendHandler()"]
  //         • (errorHandler) "defaultErrorHandler()"
  //         └── /hello (GET)
  //             • (onTimeout) ["onTimeout()"]
  //             • (onRequest) ["anonymous()"]
  //             • (errorHandler) "defaultErrorHandler()"
  //             /hello (HEAD)
  //             • (onTimeout) ["onTimeout()"]
  //             • (onRequest) ["anonymous()"]
  //             • (onSend) ["headRouteOnSendHandler()"]
  //             • (errorHandler) "defaultErrorHandler()"

  console.log(fastify.printRoutes({ includeHooks: true }))
  // └── /
  //     └── test (GET)
  //         • (onTimeout) ["onTimeout()"]
  //         • (onRequest) ["anonymous()"]
  //         test (HEAD)
  //         • (onTimeout) ["onTimeout()"]
  //         • (onRequest) ["anonymous()"]
  //         • (onSend) ["headRouteOnSendHandler()"]
  //         └── /hello (GET)
  //             • (onTimeout) ["onTimeout()"]
  //             • (onRequest) ["anonymous()"]
  //             /hello (HEAD)
  //             • (onTimeout) ["onTimeout()"]
  //             • (onRequest) ["anonymous()"]
  //             • (onSend) ["headRouteOnSendHandler()"]
```

#### printPlugins
<a id="print-plugins"></a>

`fastify.printPlugins()`: Prints the representation of the internal plugin tree
used by the avvio, useful for debugging require order issues.

*Remember to call it inside or after a `ready` call.*

```js
fastify.register(async function foo (instance) {
  instance.register(async function bar () {})
})
fastify.register(async function baz () {})

fastify.ready(() => {
  console.error(fastify.printPlugins())
  // will output the following to stderr:
  // └── root
  //     ├── foo
  //     │   └── bar
  //     └── baz
})
```

#### addContentTypeParser
<a id="addContentTypeParser"></a>

`fastify.addContentTypeParser(content-type, options, parser)` is used to pass
a custom parser for a given content type. Useful for adding parsers for custom
content types, e.g. `text/json, application/vnd.oasis.opendocument.text`.
`content-type` can be a string, string array or RegExp.

```js
// The two arguments passed to getDefaultJsonParser are for ProtoType poisoning
// and Constructor Poisoning configuration respectively. The possible values are
// 'ignore', 'remove', 'error'. ignore  skips all validations and it is similar
// to calling JSON.parse() directly. See the
// [`secure-json-parse` documentation](https://github.com/fastify/secure-json-parse#api) for more information.

fastify.addContentTypeParser('text/json', { asString: true }, fastify.getDefaultJsonParser('ignore', 'ignore'))
```

#### hasContentTypeParser
<a id="hasContentTypeParser"></a>

`fastify.hasContentTypeParser(contentType)` is used to check whether there is a
content type parser in the current context for the specified content type.

```js
fastify.hasContentTypeParser('text/json')

fastify.hasContentTypeParser(/^.+\/json$/)
```

#### removeContentTypeParser
<a id="removeContentTypeParser"></a>

`fastify.removeContentTypeParser(contentType)` is used to remove content type
parsers in the current context. This method allows for example to remove the
both built-in parsers for `application/json` and `text/plain`.

```js
fastify.removeContentTypeParser('application/json')

fastify.removeContentTypeParser(['application/json', 'text/plain'])
```

#### removeAllContentTypeParsers
<a id="removeAllContentTypeParsers"></a>

The `fastify.removeAllContentTypeParsers()` method allows all content type
parsers in the current context to be removed. A use case of this method is the
implementation of catch-all content type parser. Before adding this parser with
`fastify.addContentTypeParser()` one could call the
`removeAllContentTypeParsers` method.

For more details about the usage of the different content type parser APIs see
[here](./ContentTypeParser.md#usage).

#### getDefaultJsonParser
<a id="getDefaultJsonParser"></a>

`fastify.getDefaultJsonParser(onProtoPoisoning, onConstructorPoisoning)` takes
two arguments. First argument is ProtoType poisoning configuration and second
argument is constructor poisoning configuration. See the [`secure-json-parse`
documentation](https://github.com/fastify/secure-json-parse#api) for more
information.


#### defaultTextParser
<a id="defaultTextParser"></a>

`fastify.defaultTextParser()` can be used to parse content as plain text.

```js
fastify.addContentTypeParser('text/json', { asString: true }, fastify.defaultTextParser)
```

#### errorHandler
<a id="errorHandler"></a>

`fastify.errorHandler` can be used to handle errors using fastify's default
error handler.

```js
fastify.get('/', {
  errorHandler: (error, request, reply) => {
    if (error.code === 'SOMETHING_SPECIFIC') {
      reply.send({ custom: 'response' })
      return
    }

    fastify.errorHandler(error, request, response)
  }
}, handler)
```

#### childLoggerFactory
<a id="childLoggerFactory"></a>

`fastify.childLoggerFactory` returns the custom logger factory function for the
Fastify instance. See the [`childLoggerFactory` config option](#setchildloggerfactory)
for more info.

#### Symbol.asyncDispose
<a id="symbolAsyncDispose"></a>

`fastify[Symbol.asyncDispose]` is a symbol that can be used to define an
asynchronous function that will be called when the Fastify instance is closed.

It's commonly used alongside the `using` TypeScript keyword to ensure that
resources are cleaned up when the Fastify instance is closed.

This combines perfectly inside short lived processes or unit tests, where you must
close all Fastify resources after returning from inside the function.

```ts
test('Uses app and closes it afterwards', async () => {
  await using app = fastify();
  // do something with app.
})
```

In the above example, Fastify is closed automatically after the test finishes.

Read more about the
[ECMAScript Explicit Resource Management](https://tc39.es/proposal-explicit-resource-management)
and the [using keyword](https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/)
introduced in TypeScript 5.2.

#### initialConfig
<a id="initial-config"></a>

`fastify.initialConfig`: Exposes a frozen read-only object registering the
initial options passed down by the user to the Fastify instance.

The properties that can currently be exposed are:
- connectionTimeout
- keepAliveTimeout
- bodyLimit
- caseSensitive
- allowUnsafeRegex
- http2
- https (it will return `false`/`true` or `{ allowHTTP1: true/false }` if
  explicitly passed)
- ignoreTrailingSlash
- disableRequestLogging
- maxParamLength
- onProtoPoisoning
- onConstructorPoisoning
- pluginTimeout
- requestIdHeader
- requestIdLogLabel
- http2SessionTimeout
- useSemicolonDelimiter

```js
const { readFileSync } = require('node:fs')
const Fastify = require('fastify')

const fastify = Fastify({
  https: {
    allowHTTP1: true,
    key: readFileSync('./fastify.key'),
    cert: readFileSync('./fastify.cert')
  },
  logger: { level: 'trace'},
  ignoreTrailingSlash: true,
  maxParamLength: 200,
  caseSensitive: true,
  trustProxy: '127.0.0.1,192.168.1.1/24',
})

console.log(fastify.initialConfig)
/*
will log :
{
  caseSensitive: true,
  https: { allowHTTP1: true },
  ignoreTrailingSlash: true,
  maxParamLength: 200
}
*/

fastify.register(async (instance, opts) => {
  instance.get('/', async (request, reply) => {
    return instance.initialConfig
    /*
    will return :
    {
      caseSensitive: true,
      https: { allowHTTP1: true },
      ignoreTrailingSlash: true,
      maxParamLength: 200
    }
    */
  })

  instance.get('/error', async (request, reply) => {
    // will throw an error because initialConfig is read-only
    // and can not be modified
    instance.initialConfig.https.allowHTTP1 = false

    return instance.initialConfig
  })
})

// Start listening.
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```
````

## Source: https://fastify.dev/docs/latest/Reference/Type-Providers
````markdown
<h1 align="center">Fastify</h1>

## Type Providers

Type Providers are a TypeScript feature that enables Fastify to infer type
information from inline JSON Schema. They are an alternative to specifying
generic arguments on routes and can reduce the need to keep associated types for
each schema in a project.

### Providers

Official Type Provider packages follow the
`@fastify/type-provider-{provider-name}` naming convention.
Several community providers are also available.

The following inference packages are supported:

- [`json-schema-to-ts`](https://github.com/ThomasAribart/json-schema-to-ts)
- [`typebox`](https://github.com/sinclairzx81/typebox)
- [`zod`](https://github.com/colinhacks/zod)

See also the Type Provider wrapper packages for each of the packages respectively:

- [`@fastify/type-provider-json-schema-to-ts`](https://github.com/fastify/fastify-type-provider-json-schema-to-ts)
- [`@fastify/type-provider-typebox`](https://github.com/fastify/fastify-type-provider-typebox)
- [`fastify-type-provider-zod`](https://github.com/turkerdev/fastify-type-provider-zod)
 (3rd party)

### Json Schema to Ts

The following sets up a `json-schema-to-ts` Type Provider:

```bash
$ npm i @fastify/type-provider-json-schema-to-ts
```

```typescript
import fastify from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'

const server = fastify().withTypeProvider<JsonSchemaToTsProvider>()

server.get('/route', {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        foo: { type: 'number' },
        bar: { type: 'string' },
      },
      required: ['foo', 'bar']
    }
  }
}, (request, reply) => {

  // type Query = { foo: number, bar: string }
  const { foo, bar } = request.query // type safe!
})
```

### TypeBox

The following sets up a TypeBox Type Provider:

```bash
$ npm i @fastify/type-provider-typebox
```

```typescript
import fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'

const server = fastify().withTypeProvider<TypeBoxTypeProvider>()

server.get('/route', {
  schema: {
    querystring: Type.Object({
      foo: Type.Number(),
      bar: Type.String()
    })
  }
}, (request, reply) => {

  // type Query = { foo: number, bar: string }
  const { foo, bar } = request.query // type safe!
})
```

See the [TypeBox
documentation](https://github.com/sinclairzx81/typebox#validation)
for setting up AJV to work with TypeBox.

### Zod

See [official documentation](https://github.com/turkerdev/fastify-type-provider-zod)
for Zod Type Provider instructions.


### Scoped Type-Provider

The provider types don't propagate globally. In encapsulated usage, one can
remap the context to use one or more providers (for example, `typebox` and
`json-schema-to-ts` can be used in the same application).

Example:

```ts
import Fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { Type } from '@sinclair/typebox'

const fastify = Fastify()

function pluginWithTypebox(fastify: FastifyInstance, _opts, done): void {
  fastify.withTypeProvider<TypeBoxTypeProvider>()
    .get('/', {
      schema: {
        body: Type.Object({
          x: Type.String(),
          y: Type.Number(),
          z: Type.Boolean()
        })
      }
    }, (req) => {
        const { x, y, z } = req.body // type safe
    });
  done()
}

function pluginWithJsonSchema(fastify: FastifyInstance, _opts, done): void {
  fastify.withTypeProvider<JsonSchemaToTsProvider>()
    .get('/', {
      schema: {
        body: {
          type: 'object',
          properties: {
            x: { type: 'string' },
            y: { type: 'number' },
            z: { type: 'boolean' }
          },
        }
      }
    }, (req) => {
      const { x, y, z } = req.body // type safe
    });
  done()
}

fastify.register(pluginWithJsonSchema)
fastify.register(pluginWithTypebox)
```

It is important to note that since the types do not propagate globally, it is
currently not possible to avoid multiple registrations on routes when dealing
with several scopes, as shown below:

```ts
import Fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>()

server.register(plugin1) // wrong
server.register(plugin2) // correct

function plugin1(fastify: FastifyInstance, _opts, done): void {
  fastify.get('/', {
    schema: {
      body: Type.Object({
        x: Type.String(),
        y: Type.Number(),
        z: Type.Boolean()
      })
    }
  }, (req) => {
    // In a new scope, call `withTypeProvider` again to ensure it works
    const { x, y, z } = req.body
  });
  done()
}

function plugin2(fastify: FastifyInstance, _opts, done): void {
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>()

  server.get('/', {
    schema: {
      body: Type.Object({
        x: Type.String(),
        y: Type.Number(),
        z: Type.Boolean()
      })
    }
  }, (req) => {
    // works
    const { x, y, z } = req.body
  });
  done()
}
```

### Type Definition of FastifyInstance + TypeProvider

When working with modules, use `FastifyInstance` with Type Provider generics.
See the example below:

```ts
// index.ts
import Fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { registerRoutes } from './routes'

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>()

registerRoutes(server)

server.listen({ port: 3000 })
```

```ts
// routes.ts
import { Type } from '@sinclair/typebox'
import {
  FastifyInstance,
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault
} from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

export function registerRoutes(fastify: FastifyTypebox): void {
  fastify.get('/', {
    schema: {
      body: Type.Object({
        x: Type.String(),
        y: Type.Number(),
        z: Type.Boolean()
      })
    }
  }, (req) => {
    // works
    const { x, y, z } = req.body
  });
}
```
````

## Source: https://fastify.dev/docs/latest/Reference/TypeScript
````markdown
<h1 align="center">Fastify</h1>

## TypeScript

The Fastify framework is written in vanilla JavaScript, and as such type
definitions are not as easy to maintain; however, since version 2 and beyond,
maintainers and contributors have put in a great effort to improve the types.

The type system was changed in Fastify version 3. The new type system introduces
generic constraining and defaulting, plus a new way to define schema types such
as a request body, querystring, and more! As the team works on improving
framework and type definition synergy, sometimes parts of the API will not be
typed or may be typed incorrectly. We encourage you to **contribute** to help us
fill in the gaps. Just make sure to read our
[`CONTRIBUTING.md`](https://github.com/fastify/fastify/blob/main/CONTRIBUTING.md)
file before getting started to make sure things go smoothly!

> The documentation in this section covers Fastify version 3.x typings

> Plugins may or may not include typings. See [Plugins](#plugins) for more
> information. We encourage users to send pull requests to improve typings
> support.

🚨 Don't forget to install `@types/node`

## Learn By Example

The best way to learn the Fastify type system is by example! The following four
examples should cover the most common Fastify development cases. After the
examples there is further, more detailed documentation for the type system.

### Getting Started

This example will get you up and running with Fastify and TypeScript. It results
in a blank http Fastify server.

1. Create a new npm project, install Fastify, and install typescript & Node.js
   types as peer dependencies:
  ```bash
  npm init -y
  npm i fastify
  npm i -D typescript @types/node
  ```
2. Add the following lines to the `"scripts"` section of the `package.json`:
  ```json
  {
    "scripts": {
      "build": "tsc -p tsconfig.json",
      "start": "node index.js"
    }
  }
  ```

3. Initialize a TypeScript configuration file:
  ```bash
  npx tsc --init
  ```
  or use one of the [recommended
  ones](https://github.com/tsconfig/bases#node-14-tsconfigjson).

*Note: Set `target` property in `tsconfig.json` to `es2017` or greater to avoid
[FastifyDeprecation](https://github.com/fastify/fastify/issues/3284) warning.*

4. Create an `index.ts` file - this will contain the server code
5. Add the following code block to your file:
   ```typescript
   import fastify from 'fastify'

   const server = fastify()

   server.get('/ping', async (request, reply) => {
     return 'pong\n'
   })

   server.listen({ port: 8080 }, (err, address) => {
     if (err) {
       console.error(err)
       process.exit(1)
     }
     console.log(`Server listening at ${address}`)
   })
   ```
6. Run `npm run build` - this will compile `index.ts` into `index.js` which can
   be executed using Node.js. If you run into any errors please open an issue in
   [fastify/help](https://github.com/fastify/help/)
7. Run `npm run start` to run the Fastify server
8. You should see `Server listening at http://127.0.0.1:8080` in your console
9. Try out your server using `curl localhost:8080/ping`, it should return `pong`
   🏓

🎉 You now have a working Typescript Fastify server! This example demonstrates
the simplicity of the version 3.x type system. By default, the type system
assumes you are using an `http` server. The later examples will demonstrate how
to create more complex servers such as `https` and `http2`, how to specify route
schemas, and more!

> For more examples on initializing Fastify with TypeScript (such as enabling
> HTTP2) check out the detailed API section [here][Fastify]

### Using Generics

The type system heavily relies on generic properties to provide the most
accurate development experience. While some may find the overhead a bit
cumbersome, the tradeoff is worth it! This example will dive into implementing
generic types for route schemas and the dynamic properties located on the
route-level `request` object.

1. If you did not complete the previous example, follow steps 1-4 to get set up.
2. Inside `index.ts`, define three interfaces `IQuerystring`,`IHeaders` and `IReply`:
   ```typescript
   interface IQuerystring {
     username: string;
     password: string;
   }

   interface IHeaders {
     'h-Custom': string;
   }

   interface IReply {
     200: { success: boolean };
     302: { url: string };
     '4xx': { error: string };
   }
   ```
3. Using the three interfaces, define a new API route and pass them as generics.
   The shorthand route methods (i.e. `.get`) accept a generic object
   `RouteGenericInterface` containing five named properties: `Body`,
   `Querystring`, `Params`, `Headers` and `Reply`. The interfaces `Body`,
   `Querystring`, `Params` and `Headers` will be passed down through the route
   method into the route method handler `request` instance and the `Reply`
   interface to the `reply` instance.
   ```typescript
   server.get<{
     Querystring: IQuerystring,
     Headers: IHeaders,
     Reply: IReply
   }>('/auth', async (request, reply) => {
     const { username, password } = request.query
     const customerHeader = request.headers['h-Custom']
     // do something with request data

     // chaining .statusCode/.code calls with .send allows type narrowing. For example:
     // this works
     reply.code(200).send({ success: true });
     // but this gives a type error
     reply.code(200).send('uh-oh');
     // it even works for wildcards
     reply.code(404).send({ error: 'Not found' });
     return `logged in!`
   })
   ```

4. Build and run the server code with `npm run build` and `npm run start`
5. Query the API
   ```bash
   curl localhost:8080/auth?username=admin&password=Password123!
   ```
   And it should return back `logged in!`
6. But wait there's more! The generic interfaces are also available inside route
   level hook methods. Modify the previous route by adding a `preValidation`
   hook:
   ```typescript
   server.get<{
     Querystring: IQuerystring,
     Headers: IHeaders,
     Reply: IReply
   }>('/auth', {
     preValidation: (request, reply, done) => {
       const { username, password } = request.query
       done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
     }
   }, async (request, reply) => {
     const customerHeader = request.headers['h-Custom']
     // do something with request data
     return `logged in!`
   })
   ```
7. Build and run and query with the `username` query string option set to
   anything other than `admin`. The API should now return a HTTP 500 error
   `{"statusCode":500,"error":"Internal Server Error","message":"Must be
   admin"}`

🎉 Good work, now you can define interfaces for each route and have strictly
typed request and reply instances. Other parts of the Fastify type system rely
on generic properties. Make sure to reference the detailed type system
documentation below to learn more about what is available.

### JSON Schema

To validate your requests and responses you can use JSON Schema files. If you
didn't know already, defining schemas for your Fastify routes can increase their
throughput! Check out the [Validation and
Serialization](./Validation-and-Serialization.md) documentation for more info.

Also it has the advantage to use the defined type within your handlers
(including pre-validation, etc.).

Here are some options on how to achieve this.

#### Fastify Type Providers

Fastify offers two packages wrapping `json-schema-to-ts` and `typebox`:

- [`@fastify/type-provider-json-schema-to-ts`](https://github.com/fastify/fastify-type-provider-json-schema-to-ts)
- [`@fastify/type-provider-typebox`](https://github.com/fastify/fastify-type-provider-typebox)

And a `zod` wrapper by a third party called [`fastify-type-provider-zod`](https://github.com/turkerdev/fastify-type-provider-zod)

They simplify schema validation setup and you can read more about them in [Type
Providers](./Type-Providers.md) page.

Below is how to setup schema validation using the `typebox`,
`json-schema-to-typescript`, and `json-schema-to-ts` packages without type
providers.

#### TypeBox

A useful library for building types and a schema at once is [TypeBox](https://www.npmjs.com/package/@sinclair/typebox).
With TypeBox you define your schema within your code and use them directly as
types or schemas as you need them.

When you want to use it for validation of some payload in a fastify route you
can do it as follows:

1. Install `typebox` in your project.

    ```bash
    npm i @sinclair/typebox
    ```

2. Define the schema you need with `Type` and create the respective type  with
   `Static`.

    ```typescript
    import { Static, Type } from '@sinclair/typebox'

    export const User = Type.Object({
      name: Type.String(),
      mail: Type.Optional(Type.String({ format: 'email' })),
    })

    export type UserType = Static<typeof User>
    ```

3. Use the defined type and schema during the definition of your route

    ```typescript
    import Fastify from 'fastify'
    // ...

    const fastify = Fastify()

    fastify.post<{ Body: UserType, Reply: UserType }>(
      '/',
      {
        schema: {
          body: User,
          response: {
            200: User
          },
        },
      },
      (request, reply) => {
        // The `name` and `mail` types are automatically inferred
        const { name, mail } = request.body;
        reply.status(200).send({ name, mail });
      }
    )
    ```

#### json-schema-to-typescript

In the last example we used Typebox to define the types and schemas for our
route. Many users will already be using JSON Schemas to define these properties,
and luckily there is a way to transform existing JSON Schemas into TypeScript
interfaces!

1. If you did not complete the 'Getting Started' example, go back and follow
   steps 1-4 first.
2. Install the `json-schema-to-typescript` module:

   ```bash
   npm i -D json-schema-to-typescript
   ```

3. Create a new folder called `schemas` and add two files `headers.json` and
   `querystring.json`. Copy and paste the following schema definitions into the
   respective files:

   ```json
   {
     "title": "Headers Schema",
     "type": "object",
     "properties": {
       "h-Custom": { "type": "string" }
     },
     "additionalProperties": false,
     "required": ["h-Custom"]
   }
   ```

   ```json
   {
     "title": "Querystring Schema",
     "type": "object",
     "properties": {
       "username": { "type": "string" },
       "password": { "type": "string" }
     },
     "additionalProperties": false,
     "required": ["username", "password"]
   }
   ```

4. Add a `compile-schemas` script to the package.json:

```json
   {
     "scripts": {
       "compile-schemas": "json2ts -i schemas -o types"
     }
   }
```

   `json2ts` is a CLI utility included in `json-schema-to-typescript`. `schemas`
   is the input path, and `types` is the output path.
5. Run `npm run compile-schemas`. Two new files should have been created in the
   `types` directory.
6. Update `index.ts` to have the following code:

```typescript
   import fastify from 'fastify'

   // import json schemas as normal
   import QuerystringSchema from './schemas/querystring.json'
   import HeadersSchema from './schemas/headers.json'

   // import the generated interfaces
   import { QuerystringSchema as QuerystringSchemaInterface } from './types/querystring'
   import { HeadersSchema as HeadersSchemaInterface } from './types/headers'

   const server = fastify()

   server.get<{
     Querystring: QuerystringSchemaInterface,
     Headers: HeadersSchemaInterface
   }>('/auth', {
     schema: {
       querystring: QuerystringSchema,
       headers: HeadersSchema
     },
     preValidation: (request, reply, done) => {
       const { username, password } = request.query
       done(username !== 'admin' ? new Error('Must be admin') : undefined)
     }
     //  or if using async
     //  preValidation: async (request, reply) => {
     //    const { username, password } = request.query
     //    if (username !== "admin") throw new Error("Must be admin");
     //  }
   }, async (request, reply) => {
     const customerHeader = request.headers['h-Custom']
     // do something with request data
     return `logged in!`
   })

   server.route<{
     Querystring: QuerystringSchemaInterface,
     Headers: HeadersSchemaInterface
   }>({
     method: 'GET',
     url: '/auth2',
     schema: {
       querystring: QuerystringSchema,
       headers: HeadersSchema
     },
     preHandler: (request, reply, done) => {
       const { username, password } = request.query
       const customerHeader = request.headers['h-Custom']
       done()
     },
     handler: (request, reply) => {
       const { username, password } = request.query
       const customerHeader = request.headers['h-Custom']
       reply.status(200).send({username});
     }
   })

   server.listen({ port: 8080 }, (err, address) => {
     if (err) {
       console.error(err)
       process.exit(0)
     }
     console.log(`Server listening at ${address}`)
   })
   ```
   Pay special attention to the imports at the top of this file. It might seem
   redundant, but you need to import both the schema files and the generated
   interfaces.

Great work! Now you can make use of both JSON Schemas and TypeScript
definitions.

#### json-schema-to-ts

If you do not want to generate types from your schemas, but want to use them
directly from your code, you can use the package
[json-schema-to-ts](https://www.npmjs.com/package/json-schema-to-ts).

You can install it as dev-dependency.

```bash
npm i -D json-schema-to-ts
```

In your code you can define your schema like a normal object. But be aware of
making it *const* like explained in the docs of the module.

```typescript
const todo = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    done: { type: 'boolean' },
  },
  required: ['name'],
} as const; // don't forget to use const !
```

With the provided type `FromSchema` you can build a type from your schema and
use it in your handler.

```typescript
import { FromSchema } from "json-schema-to-ts";
fastify.post<{ Body: FromSchema<typeof todo> }>(
  '/todo',
  {
    schema: {
      body: todo,
      response: {
        201: {
          type: 'string',
        },
      },
    }
  },
  async (request, reply): Promise<void> => {

    /*
    request.body has type
    {
      [x: string]: unknown;
      description?: string;
      done?: boolean;
      name: string;
    }
    */

    request.body.name // will not throw type error
    request.body.notthere // will throw type error

    reply.status(201).send();
  },
);
```

### Plugins

One of Fastify's most distinguishable features is its extensive plugin
ecosystem. Plugin types are fully supported, and take advantage of the
[declaration
merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
pattern. This example is broken up into three parts: Creating a TypeScript
Fastify Plugin, Creating Type Definitions for a Fastify Plugin, and Using a
Fastify Plugin in a TypeScript Project.

#### Creating a TypeScript Fastify Plugin

1. Initialize a new npm project and install required dependencies
   ```bash
   npm init -y
   npm i fastify fastify-plugin
   npm i -D typescript @types/node
   ```
2. Add a `build` script to the `"scripts"` section and `'index.d.ts'` to the
   `"types"` section of the `package.json` file:
   ```json
   {
     "types": "index.d.ts",
     "scripts": {
       "build": "tsc -p tsconfig.json"
     }
   }
   ```
3. Initialize a TypeScript configuration file:
   ```bash
   npx typescript --init
   ```
   Once the file is generated, enable the `"declaration"` option in the
   `"compilerOptions"` object.
   ```json
   {
     "compilerOptions": {
       "declaration": true
     }
   }
   ```
4. Create an `index.ts` file - this will contain the plugin code
5. Add the following code to `index.ts`
   ```typescript
   import { FastifyPluginCallback, FastifyPluginAsync } from 'fastify'
   import fp from 'fastify-plugin'

   // using declaration merging, add your plugin props to the appropriate fastify interfaces
   // if prop type is defined here, the value will be typechecked when you call decorate{,Request,Reply}
   declare module 'fastify' {
     interface FastifyRequest {
       myPluginProp: string
     }
     interface FastifyReply {
       myPluginProp: number
     }
   }

   // define options
   export interface MyPluginOptions {
     myPluginOption: string
   }

   // define plugin using callbacks
   const myPluginCallback: FastifyPluginCallback<MyPluginOptions> = (fastify, options, done) => {
     fastify.decorateRequest('myPluginProp', 'super_secret_value')
     fastify.decorateReply('myPluginProp', options.myPluginOption)

     done()
   }

   // define plugin using promises
   const myPluginAsync: FastifyPluginAsync<MyPluginOptions> = async (fastify, options) => {
     fastify.decorateRequest('myPluginProp', 'super_secret_value')
     fastify.decorateReply('myPluginProp', options.myPluginOption)
   }

   // export plugin using fastify-plugin
   export default fp(myPluginCallback, '3.x')
   // or
   // export default fp(myPluginAsync, '3.x')
   ```
6. Run `npm run build` to compile the plugin code and produce both a JavaScript
   source file and a type definition file.
7. With the plugin now complete you can [publish to npm] or use it locally.
   > You do not _need_ to publish your plugin to npm to use it. You can include
   > it in a Fastify project and reference it as you would any piece of code! As
   > a TypeScript user, make sure the declaration override exists somewhere that
   > will be included in your project compilation so the TypeScript interpreter
   > can process it.

#### Creating Type Definitions for a Fastify Plugin

This plugin guide is for Fastify plugins written in JavaScript. The steps
outlined in this example are for adding TypeScript support for users consuming
your plugin.

1. Initialize a new npm project and install required dependencies
   ```bash
   npm init -y
   npm i fastify-plugin
   ```
2. Create two files `index.js` and `index.d.ts`
3. Modify the package json to include these files under the `main` and `types`
   properties (the name does not have to be `index` explicitly, but it is
   recommended the files have the same name):
   ```json
   {
     "main": "index.js",
     "types": "index.d.ts"
   }
   ```
4. Open `index.js` and add the following code:
   ```javascript
   // fastify-plugin is highly recommended for any plugin you write
   const fp = require('fastify-plugin')

   function myPlugin (instance, options, done) {

     // decorate the fastify instance with a custom function called myPluginFunc
     instance.decorate('myPluginFunc', (input) => {
       return input.toUpperCase()
     })

     done()
   }

   module.exports = fp(myPlugin, {
     fastify: '5.x',
     name: 'my-plugin' // this is used by fastify-plugin to derive the property name
   })
   ```
5. Open `index.d.ts` and add the following code:
   ```typescript
   import { FastifyPluginCallback } from 'fastify'

   interface PluginOptions {
     //...
   }

   // Optionally, you can add any additional exports.
   // Here we are exporting the decorator we added.
   export interface myPluginFunc {
     (input: string): string
   }

   // Most importantly, use declaration merging to add the custom property to the Fastify type system
   declare module 'fastify' {
     interface FastifyInstance {
       myPluginFunc: myPluginFunc
     }
   }

   // fastify-plugin automatically adds named export, so be sure to add also this type
   // the variable name is derived from `options.name` property if `module.exports.myPlugin` is missing
   export const myPlugin: FastifyPluginCallback<PluginOptions>

   // fastify-plugin automatically adds `.default` property to the exported plugin. See the note below
   export default myPlugin
   ```

__Note__: [fastify-plugin](https://github.com/fastify/fastify-plugin) v2.3.0 and
newer, automatically adds `.default` property and a named export to the exported
plugin. Be sure to `export default` and `export const myPlugin` in your typings
to provide the best developer experience. For a complete example you can check
out
[@fastify/swagger](https://github.com/fastify/fastify-swagger/blob/main/index.d.ts).

With those files completed, the plugin is now ready to be consumed by any
TypeScript project!

The Fastify plugin system enables developers to decorate the Fastify instance,
and the request/reply instances. For more information check out this blog post
on [Declaration Merging and Generic
Inheritance](https://dev.to/ethanarrowood/is-declaration-merging-and-generic-inheritance-at-the-same-time-impossible-53cp).

#### Using a Plugin

Using a Fastify plugin in TypeScript is just as easy as using one in JavaScript.
Import the plugin with `import/from` and you're all set -- except there is one
exception users should be aware of.

Fastify plugins use declaration merging to modify existing Fastify type
interfaces (check out the previous two examples for more details). Declaration
merging is not very _smart_, meaning if the plugin type definition for a plugin
is within the scope of the TypeScript interpreter, then the plugin types will be
included **regardless** of if the plugin is being used or not. This is an
unfortunate limitation of using TypeScript and is unavoidable as of right now.

However, there are a couple of suggestions to help improve this experience:
- Make sure the `no-unused-vars` rule is enabled in
  [ESLint](https://eslint.org/docs/rules/no-unused-vars) and any imported plugin
  are actually being loaded.
- Use a module such as [depcheck](https://www.npmjs.com/package/depcheck) or
  [npm-check](https://www.npmjs.com/package/npm-check) to verify plugin
  dependencies are being used somewhere in your project.

Note that using `require` will not load the type definitions properly and may
cause type errors.
TypeScript can only identify the types that are directly imported into code,
which means that you can use require inline with import on top. For example:

```typescript
import 'plugin' // here will trigger the type augmentation.

fastify.register(require('plugin'))
```

```typescript
import plugin from 'plugin' //  here will trigger the type augmentation.

fastify.register(plugin)
```

Or even explicit config on tsconfig
```jsonc
{
  "types": ["plugin"] // we force TypeScript to import the types
}
```

## Code Completion In Vanilla JavaScript

Vanilla JavaScript can use the published types to provide code completion (e.g.
[Intellisense](https://code.visualstudio.com/docs/editor/intellisense)) by
following the [TypeScript JSDoc
Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).

For example:

```js
/**  @type {import('fastify').FastifyPluginAsync<{ optionA: boolean, optionB: string }>} */
module.exports = async function (fastify, { optionA, optionB }) {
  fastify.get('/look', () => 'at me');
}
```

## API Type System Documentation

This section is a detailed account of all the types available to you in Fastify
version 3.x

All `http`, `https`, and `http2` types are inferred from `@types/node`

[Generics](#generics) are documented by their default value as well as their
constraint value(s). Read these articles for more information on TypeScript
generics.
- [Generic Parameter
  Default](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#generic-parameter-defaults)
- [Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)


#### How to import

The Fastify API is powered by the `fastify()` method. In JavaScript you would
import it using `const fastify = require('fastify')`. In TypeScript it is
recommended to use the `import/from` syntax instead so types can be resolved.
There are a couple supported import methods with the Fastify type system.

1. `import fastify from 'fastify'`
   - Types are resolved but not accessible using dot notation
   - Example:
     ```typescript
     import fastify from 'fastify'

     const f = fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```
   - Gain access to types with destructuring:
     ```typescript
     import fastify, { FastifyInstance } from 'fastify'

     const f: FastifyInstance = fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```
   - Destructuring also works for the main API method:
     ```typescript
     import { fastify, FastifyInstance } from 'fastify'

     const f: FastifyInstance = fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```
2. `import * as Fastify from 'fastify'`
   - Types are resolved and accessible using dot notation
   - Calling the main Fastify API method requires a slightly different syntax
     (see example)
   - Example:
     ```typescript
     import * as Fastify from 'fastify'

     const f: Fastify.FastifyInstance = Fastify.fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```
3. `const fastify = require('fastify')`
   - This syntax is valid and will import fastify as expected; however, types
     will **not** be resolved
   - Example:
     ```typescript
     const fastify = require('fastify')

     const f = fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```
   - Destructuring is supported and will resolve types properly
     ```typescript
     const { fastify } = require('fastify')

     const f = fastify()
     f.listen({ port: 8080 }, () => { console.log('running') })
     ```

#### Generics

Many type definitions share the same generic parameters; they are all
documented, in detail, within this section.

Most definitions depend on `@types/node` modules `http`, `https`, and `http2`

##### RawServer
Underlying Node.js server type

Default: `http.Server`

Constraints: `http.Server`, `https.Server`, `http2.Http2Server`,
`http2.Http2SecureServer`

Enforces generic parameters: [`RawRequest`][RawRequestGeneric],
[`RawReply`][RawReplyGeneric]

##### RawRequest
Underlying Node.js request type

Default: [`RawRequestDefaultExpression`][RawRequestDefaultExpression]

Constraints: `http.IncomingMessage`, `http2.Http2ServerRequest`

Enforced by: [`RawServer`][RawServerGeneric]

##### RawReply
Underlying Node.js response type

Default: [`RawReplyDefaultExpression`][RawReplyDefaultExpression]

Constraints: `http.ServerResponse`, `http2.Http2ServerResponse`

Enforced by: [`RawServer`][RawServerGeneric]

##### Logger
Fastify logging utility

Default: [`FastifyLoggerOptions`][FastifyLoggerOptions]

Enforced by: [`RawServer`][RawServerGeneric]

##### RawBody
A generic parameter for the content-type-parser methods.

Constraints: `string | Buffer`

---

#### Fastify

##### fastify< [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [Logger][LoggerGeneric]>(opts?: [FastifyServerOptions][FastifyServerOptions]): [FastifyInstance][FastifyInstance]
[src](https://github.com/fastify/fastify/blob/main/fastify.d.ts#L19)

The main Fastify API method. By default creates an HTTP server. Utilizing
discriminant unions and overload methods, the type system will automatically
infer which type of server (http, https, or http2) is being created purely based
on the options based to the method (see the examples below for more
information). It also supports an extensive generic type system to allow the
user to extend the underlying Node.js Server, Request, and Reply objects.
Additionally, the `Logger` generic exists for custom log types. See the examples
and generic breakdown below for more information.

###### Example 1: Standard HTTP server

No need to specify the `Server` generic as the type system defaults to HTTP.
```typescript
import fastify from 'fastify'

const server = fastify()
```
Check out the Learn By Example - [Getting Started](#getting-started) example for
a more detailed http server walkthrough.

###### Example 2: HTTPS server

1. Create the following imports from `@types/node` and `fastify`
   ```typescript
   import fs from 'node:fs'
   import path from 'node:path'
   import fastify from 'fastify'
   ```
2. Perform the following steps before setting up a Fastify HTTPS server
to create the `key.pem` and `cert.pem` files:
```sh
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```
3. Instantiate a Fastify https server and add a route:
   ```typescript
   const server = fastify({
     https: {
       key: fs.readFileSync(path.join(__dirname, 'key.pem')),
       cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
     }
   })

   server.get('/', async function (request, reply) {
     return { hello: 'world' }
   })

   server.listen({ port: 8080 }, (err, address) => {
     if (err) {
       console.error(err)
       process.exit(0)
     }
     console.log(`Server listening at ${address}`)
   })
   ```
4. Build and run! Test your server out by querying with: `curl -k
   https://localhost:8080`

###### Example 3: HTTP2 server

There are two types of HTTP2 server types, insecure and secure. Both require
specifying the `http2` property as `true` in the `options` object. The `https`
property is used for creating a secure http2 server; omitting the `https`
property will create an insecure http2 server.

```typescript
const insecureServer = fastify({ http2: true })
const secureServer = fastify({
  http2: true,
  https: {} // use the `key.pem` and `cert.pem` files from the https section
})
```

For more details on using HTTP2 check out the Fastify [HTTP2](./HTTP2.md)
documentation page.

###### Example 4: Extended HTTP server

Not only can you specify the server type, but also the request and reply types.
Thus, allowing you to specify special properties, methods, and more! When
specified at server instantiation, the custom type becomes available on all
further instances of the custom type.
```typescript
import fastify from 'fastify'
import http from 'node:http'

interface customRequest extends http.IncomingMessage {
  mySpecialProp: string
}

const server = fastify<http.Server, customRequest>()

server.get('/', async (request, reply) => {
  const someValue = request.raw.mySpecialProp // TS knows this is a string, because of the `customRequest` interface
  return someValue.toUpperCase()
})
```

###### Example 5: Specifying logger types

Fastify uses [Pino](https://getpino.io/#/) logging library under the hood. Since
`pino@7`, all of it's properties can be configured via `logger` field when
constructing Fastify's instance. If properties you need aren't exposed, please
open an Issue to [`Pino`](https://github.com/pinojs/pino/issues) or pass a
preconfigured external instance of Pino (or any other compatible logger) as
temporary fix to Fastify via the same field. This allows creating custom
serializers as well, see the [Logging](Logging.md) documentation for more info.

```typescript
import fastify from 'fastify'

const server = fastify({
  logger: {
    level: 'info',
    redact: ['x-userinfo'],
    messageKey: 'message'
  }
})

server.get('/', async (request, reply) => {
  server.log.info('log message')
  return 'another message'
})
```

---

##### fastify.HTTPMethods
[src](https://github.com/fastify/fastify/blob/main/types/utils.d.ts#L8)

Union type of: `'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' |
'OPTIONS'`

##### fastify.RawServerBase
[src](https://github.com/fastify/fastify/blob/main/types/utils.d.ts#L13)

Dependent on `@types/node` modules `http`, `https`, `http2`

Union type of: `http.Server | https.Server | http2.Http2Server |
http2.Http2SecureServer`

##### fastify.RawServerDefault
[src](https://github.com/fastify/fastify/blob/main/types/utils.d.ts#L18)

Dependent on `@types/node` modules `http`

Type alias for `http.Server`

---

##### fastify.FastifyServerOptions< [RawServer][RawServerGeneric], [Logger][LoggerGeneric]>

[src](https://github.com/fastify/fastify/blob/main/fastify.d.ts#L29)

An interface of properties used in the instantiation of the Fastify server. Is
used in the main [`fastify()`][Fastify] method. The `RawServer` and `Logger`
generic parameters are passed down through that method.

See the main [fastify][Fastify] method type definition section for examples on
instantiating a Fastify server with TypeScript.

##### fastify.FastifyInstance< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RequestGeneric][FastifyRequestGenericInterface], [Logger][LoggerGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/instance.d.ts#L16)

Interface that represents the Fastify server object. This is the returned server
instance from the [`fastify()`][Fastify] method. This type is an interface so it
can be extended via [declaration
merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
if your code makes use of the `decorate` method.

Through the use of generic cascading, all methods attached to the instance
inherit the generic properties from instantiation. This means that by specifying
the server, request, or reply types, all methods will know how to type those
objects.

Check out the main [Learn by Example](#learn-by-example) section for detailed
guides, or the more simplified [fastify][Fastify] method examples for additional
details on this interface.

---

#### Request

##### fastify.FastifyRequest< [RequestGeneric][FastifyRequestGenericInterface], [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric]>
[src](https://github.com/fastify/fastify/blob/main/types/request.d.ts#L15)

This interface contains properties of Fastify request object. The properties
added here disregard what kind of request object (http vs http2) and disregard
what route level it is serving; thus calling `request.body` inside a GET request
will not throw an error (but good luck sending a GET request with a body 😉).

If you need to add custom properties to the `FastifyRequest` object (such as
when using the [`decorateRequest`][DecorateRequest] method) you need to use
declaration merging on this interface.

A basic example is provided in the [`FastifyRequest`][FastifyRequest] section.
For a more detailed example check out the Learn By Example section:
[Plugins](#plugins)

###### Example
```typescript
import fastify from 'fastify'

const server = fastify()

server.decorateRequest('someProp', 'hello!')

server.get('/', async (request, reply) => {
  const { someProp } = request // need to use declaration merging to add this prop to the request interface
  return someProp
})

// this declaration must be in scope of the typescript interpreter to work
declare module 'fastify' {
  interface FastifyRequest { // you must reference the interface and not the type
    someProp: string
  }
}

// Or you can type your request using
type CustomRequest = FastifyRequest<{
  Body: { test: boolean };
}>

server.get('/typedRequest', async (request: CustomRequest, reply: FastifyReply) => {
  return request.body.test
})
```

##### fastify.RequestGenericInterface
[src](https://github.com/fastify/fastify/blob/main/types/request.d.ts#L4)

Fastify request objects have four dynamic properties: `body`, `params`, `query`,
and `headers`. Their respective types are assignable through this interface. It
is a named property interface enabling the developer to ignore the properties
they do not want to specify. All omitted properties are defaulted to `unknown`.
The corresponding property names are: `Body`, `Querystring`, `Params`,
`Headers`.

```typescript
import fastify, { RequestGenericInterface } from 'fastify'

const server = fastify()

interface requestGeneric extends RequestGenericInterface {
  Querystring: {
    name: string
  }
}

server.get<requestGeneric>('/', async (request, reply) => {
  const { name } = request.query // the name prop now exists on the query prop
  return name.toUpperCase()
})
```

If you want to see a detailed example of using this interface check out the
Learn by Example section: [JSON Schema](#json-schema).

##### fastify.RawRequestDefaultExpression\<[RawServer][RawServerGeneric]\>
[src](https://github.com/fastify/fastify/blob/main/types/utils.d.ts#L23)

Dependent on `@types/node` modules `http`, `https`, `http2`

Generic parameter `RawServer` defaults to [`RawServerDefault`][RawServerDefault]

If `RawServer` is of type `http.Server` or `https.Server`, then this expression
returns `http.IncomingMessage`, otherwise, it returns
`http2.Http2ServerRequest`.

```typescript
import http from 'node:http'
import http2 from 'node:http2'
import { RawRequestDefaultExpression } from 'fastify'

RawRequestDefaultExpression<http.Server> // -> http.IncomingMessage
RawRequestDefaultExpression<http2.Http2Server> // -> http2.Http2ServerRequest
```

---

#### Reply

##### fastify.FastifyReply<[RequestGeneric][FastifyRequestGenericInterface], [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [ContextConfig][ContextConfigGeneric]>
[src](https://github.com/fastify/fastify/blob/main/types/reply.d.ts#L32)

This interface contains the custom properties that Fastify adds to the standard
Node.js reply object. The properties added here disregard what kind of reply
object (http vs http2).

If you need to add custom properties to the FastifyReply object (such as when
using the `decorateReply` method) you need to use declaration merging on this
interface.

A basic example is provided in the [`FastifyReply`][FastifyReply] section. For a
more detailed example check out the Learn By Example section:
[Plugins](#plugins)

###### Example
```typescript
import fastify from 'fastify'

const server = fastify()

server.decorateReply('someProp', 'world')

server.get('/', async (request, reply) => {
  const { someProp } = reply // need to use declaration merging to add this prop to the reply interface
  return someProp
})

// this declaration must be in scope of the typescript interpreter to work
declare module 'fastify' {
  interface FastifyReply { // you must reference the interface and not the type
    someProp: string
  }
}
```

##### fastify.RawReplyDefaultExpression< [RawServer][RawServerGeneric]>
[src](https://github.com/fastify/fastify/blob/main/types/utils.d.ts#L27)

Dependent on `@types/node` modules `http`, `https`, `http2`

Generic parameter `RawServer` defaults to [`RawServerDefault`][RawServerDefault]

If `RawServer` is of type `http.Server` or `https.Server`, then this expression
returns `http.ServerResponse`, otherwise, it returns
`http2.Http2ServerResponse`.

```typescript
import http from 'node:http'
import http2 from 'node:http2'
import { RawReplyDefaultExpression } from 'fastify'

RawReplyDefaultExpression<http.Server> // -> http.ServerResponse
RawReplyDefaultExpression<http2.Http2Server> // -> http2.Http2ServerResponse
```

---

#### Plugin

Fastify allows the user to extend its functionalities with plugins. A plugin can
be a set of routes, a server decorator or whatever. To activate plugins, use the
[`fastify.register()`][FastifyRegister] method.

When creating plugins for Fastify, it is recommended to use the `fastify-plugin`
module. Additionally, there is a guide to creating plugins with TypeScript and
Fastify available in the Learn by Example, [Plugins](#plugins) section.

##### fastify.FastifyPluginCallback< [Options][FastifyPluginOptions]>
[src](https://github.com/fastify/fastify/blob/main/types/plugin.d.ts#L9)

Interface method definition used within the
[`fastify.register()`][FastifyRegister] method.

##### fastify.FastifyPluginAsync< [Options][FastifyPluginOptions]>
[src](https://github.com/fastify/fastify/blob/main/types/plugin.d.ts#L20)

Interface method definition used within the
[`fastify.register()`][FastifyRegister] method.

##### fastify.FastifyPlugin< [Options][FastifyPluginOptions]>
[src](https://github.com/fastify/fastify/blob/main/types/plugin.d.ts#L29)

Interface method definition used within the
[`fastify.register()`][FastifyRegister] method. Document deprecated in favor of
`FastifyPluginCallback` and `FastifyPluginAsync` since general `FastifyPlugin`
doesn't properly infer types for async functions.

##### fastify.FastifyPluginOptions
[src](https://github.com/fastify/fastify/blob/main/types/plugin.d.ts#L31)

A loosely typed object used to constrain the `options` parameter of
[`fastify.register()`][FastifyRegister] to an object. When creating a plugin,
define its options as an extension of this interface (`interface MyPluginOptions
extends FastifyPluginOptions`) so they can be passed to the register method.

---

#### Register

##### fastify.FastifyRegister(plugin: [FastifyPluginCallback][FastifyPluginCallback], opts: [FastifyRegisterOptions][FastifyRegisterOptions])
[src](https://github.com/fastify/fastify/blob/main/types/register.d.ts#L9)
##### fastify.FastifyRegister(plugin: [FastifyPluginAsync][FastifyPluginAsync], opts: [FastifyRegisterOptions][FastifyRegisterOptions])
[src](https://github.com/fastify/fastify/blob/main/types/register.d.ts#L9)
##### fastify.FastifyRegister(plugin: [FastifyPlugin][FastifyPlugin], opts: [FastifyRegisterOptions][FastifyRegisterOptions])
[src](https://github.com/fastify/fastify/blob/main/types/register.d.ts#L9)

This type interface specifies the type for the
[`fastify.register()`](./Server.md#register) method. The type interface returns
a function signature with an underlying generic `Options` which is defaulted to
[FastifyPluginOptions][FastifyPluginOptions]. It infers this generic from the
FastifyPlugin parameter when calling this function so there is no need to
specify the underlying generic. The options parameter is the intersection of the
plugin's options and two additional optional properties: `prefix: string` and
`logLevel`: [LogLevel][LogLevel]. `FastifyPlugin` is deprecated use
`FastifyPluginCallback` and `FastifyPluginAsync` instead.

Below is an example of the options inference in action:

```typescript
const server = fastify()

const plugin: FastifyPluginCallback<{
  option1: string;
  option2: boolean;
}> = function (instance, opts, done) { }

server().register(plugin, {}) // Error - options object is missing required properties
server().register(plugin, { option1: '', option2: true }) // OK - options object contains required properties
```

See the Learn By Example, [Plugins](#plugins) section for more detailed examples
of creating TypeScript plugins in Fastify.

##### fastify.FastifyRegisterOptions
[src](https://github.com/fastify/fastify/blob/main/types/register.d.ts#L16)

This type is the intersection of the `Options` generic and a non-exported
interface `RegisterOptions` that specifies two optional properties: `prefix:
string` and `logLevel`: [LogLevel][LogLevel]. This type can also be specified as
a function that returns the previously described intersection.

---

#### Logger

Check out the [Specifying Logger Types](#example-5-specifying-logger-types)
example for more details on specifying a custom logger.

##### fastify.FastifyLoggerOptions< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/logger.d.ts#L17)

An interface definition for the internal Fastify logger. It is emulative of the
[Pino.js](https://getpino.io/#/) logger. When enabled through server options,
use it following the general [logger](./Logging.md) documentation.

##### fastify.FastifyLogFn

[src](https://github.com/fastify/fastify/blob/main/types/logger.d.ts#L7)

An overload function interface that implements the two ways Fastify calls log
methods. This interface is passed to all associated log level properties on the
FastifyLoggerOptions object.

##### fastify.LogLevel

[src](https://github.com/fastify/fastify/blob/main/types/logger.d.ts#L12)

Union type of: `'info' | 'error' | 'debug' | 'fatal' | 'warn' | 'trace'`

---

#### Context

The context type definition is similar to the other highly dynamic pieces of the
type system. Route context is available in the route handler method.

##### fastify.FastifyRequestContext

[src](https://github.com/fastify/fastify/blob/main/types/context.d.ts#L11)

An interface with a single required property `config` that is set by default to
`unknown`. Can be specified either using a generic or an overload.

This type definition is potentially incomplete. If you are using it and can
provide more details on how to improve the definition, we strongly encourage you
to open an issue in the main
[fastify/fastify](https://github.com/fastify/fastify) repository. Thank you in
advanced!

##### fastify.FastifyReplyContext

[src](https://github.com/fastify/fastify/blob/main/types/context.d.ts#L11)

An interface with a single required property `config` that is set by default to
`unknown`. Can be specified either using a generic or an overload.

This type definition is potentially incomplete. If you are using it and can
provide more details on how to improve the definition, we strongly encourage you
to open an issue in the main
[fastify/fastify](https://github.com/fastify/fastify) repository. Thank you in
advanced!

---

#### Routing

One of the core principles in Fastify is its routing capabilities. Most of the
types defined in this section are used under-the-hood by the Fastify instance
`.route` and `.get/.post/.etc` methods.

##### fastify.RouteHandlerMethod< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/route.d.ts#L105)

A type declaration for the route handler methods. Has two arguments, `request`
and `reply` which are typed by `FastifyRequest` and `FastifyReply` respectively.
The generics parameters are passed through to these arguments. The method
returns either `void` or `Promise<any>` for synchronous and asynchronous
handlers respectively.

##### fastify.RouteOptions< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/route.d.ts#L78)

An interface that extends RouteShorthandOptions and adds the following three
required properties:
1. `method` which corresponds to a singular [HTTPMethod][HTTPMethods] or a list
   of [HTTPMethods][HTTPMethods]
2. `url` a string for the route
3. `handler` the route handler method, see [RouteHandlerMethod][] for more
   details

##### fastify.RouteShorthandMethod< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/route.d.ts#12)

An overloaded function interface for three kinds of shorthand route methods to
be used in conjunction with the `.get/.post/.etc` methods.

##### fastify.RouteShorthandOptions< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/route.d.ts#55)

An interface that covers all of the base options for a route. Each property on
this interface is optional, and it serves as the base for the RouteOptions and
RouteShorthandOptionsWithHandler interfaces.

##### fastify.RouteShorthandOptionsWithHandler< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/route.d.ts#93)

This interface adds a single, required property to the RouteShorthandOptions
interface `handler` which is of type RouteHandlerMethod

---

#### Parsers

##### RawBody

A generic type that is either a `string` or `Buffer`

##### fastify.FastifyBodyParser< [RawBody][RawBodyGeneric], [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/content-type-parser.d.ts#L7)

A function type definition for specifying a body parser method. Use the
`RawBody` generic to specify the type of the body being parsed.

##### fastify.FastifyContentTypeParser< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/content-type-parser.d.ts#L17)

A function type definition for specifying a body parser method. Content is typed
via the `RawRequest` generic.

##### fastify.AddContentTypeParser< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric]>

[src](https://github.com/fastify/fastify/blob/main/types/content-type-parser.d.ts#L46)

An overloaded interface function definition for the `addContentTypeParser`
method. If `parseAs` is passed to the `opts` parameter, the definition uses
[FastifyBodyParser][] for the `parser` parameter; otherwise, it uses
[FastifyContentTypeParser][].

##### fastify.hasContentTypeParser

[src](https://github.com/fastify/fastify/blob/main/types/content-type-parser.d.ts#L63)

A method for checking the existence of a type parser of a certain content type

---

#### Errors

##### fastify.FastifyError

[src](https://github.com/fastify/fastify/blob/main/fastify.d.ts#L179)

FastifyError is a custom error object that includes status code and validation
results.

It extends the Node.js `Error` type, and adds two additional, optional
properties: `statusCode: number` and `validation: ValidationResult[]`.

##### fastify.ValidationResult

[src](https://github.com/fastify/fastify/blob/main/fastify.d.ts#L184)

The route validation internally relies upon Ajv, which is a high-performance
JSON schema validator.

This interface is passed to instance of FastifyError.

---

#### Hooks

##### fastify.onRequestHookHandler< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L17)

`onRequest` is the first hook to be executed in the request lifecycle. There was
no previous hook, the next hook will be `preParsing`.

Notice: in the `onRequest` hook, request.body will always be null, because the
body parsing happens before the `preHandler` hook.

##### fastify.preParsingHookHandler< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L35)

`preParsing` is the second hook to be executed in the request lifecycle. The
previous hook was `onRequest`, the next hook will be `preValidation`.

Notice: in the `preParsing` hook, request.body will always be null, because the
body parsing happens before the `preValidation` hook.

Notice: you should also add `receivedEncodedLength` property to the returned
stream. This property is used to correctly match the request payload with the
`Content-Length` header value. Ideally, this property should be updated on each
received chunk.

##### fastify.preValidationHookHandler< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L53)

`preValidation` is the third hook to be executed in the request lifecycle. The
previous hook was `preParsing`, the next hook will be `preHandler`.

##### fastify.preHandlerHookHandler< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L70)

`preHandler` is the fourth hook to be executed in the request lifecycle. The
previous hook was `preValidation`, the next hook will be `preSerialization`.

##### fastify.preSerializationHookHandler< PreSerializationPayload, [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], payload: PreSerializationPayload, done: (err: [FastifyError][FastifyError] | null, res?: unknown) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L94)

`preSerialization` is the fifth hook to be executed in the request lifecycle.
The previous hook was `preHandler`, the next hook will be `onSend`.

Note: the hook is NOT called if the payload is a string, a Buffer, a stream or
null.

##### fastify.onSendHookHandler< OnSendPayload, [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], payload: OnSendPayload, done: (err: [FastifyError][FastifyError] | null, res?: unknown) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L114)

You can change the payload with the `onSend` hook. It is the sixth hook to be
executed in the request lifecycle. The previous hook was `preSerialization`, the
next hook will be `onResponse`.

Note: If you change the payload, you may only change it to a string, a Buffer, a
stream, or null.

##### fastify.onResponseHookHandler< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L134)

`onResponse` is the seventh and last hook in the request hook lifecycle. The
previous hook was `onSend`, there is no next hook.

The onResponse hook is executed when a response has been sent, so you will not
be able to send more data to the client. It can however be useful for sending
data to external services, for example to gather statistics.

##### fastify.onErrorHookHandler< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(request: [FastifyRequest][FastifyRequest], reply: [FastifyReply][FastifyReply], error: [FastifyError][FastifyError], done: () => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L154)

This hook is useful if you need to do some custom error logging or add some
specific header in case of error.

It is not intended for changing the error, and calling reply.send will throw an
exception.

This hook will be executed before the customErrorHandler.

Notice: unlike the other hooks, pass an error to the done function is not
supported.

##### fastify.onRouteHookHandler< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [RequestGeneric][FastifyRequestGenericInterface], [ContextConfig][ContextConfigGeneric]>(opts: [RouteOptions][RouteOptions] & \{ path: string; prefix: string }): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L174)

Triggered when a new route is registered. Listeners are passed a routeOptions
object as the sole parameter. The interface is synchronous, and, as such, the
listener does not get passed a callback

##### fastify.onRegisterHookHandler< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [Logger][LoggerGeneric]>(instance: [FastifyInstance][FastifyInstance], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L191)

Triggered when a new plugin is registered and a new encapsulation context is
created. The hook will be executed before the registered code.

This hook can be useful if you are developing a plugin that needs to know when a
plugin context is formed, and you want to operate in that specific context.

Note: This hook will not be called if a plugin is wrapped inside fastify-plugin.

##### fastify.onCloseHookHandler< [RawServer][RawServerGeneric], [RawRequest][RawRequestGeneric], [RawReply][RawReplyGeneric], [Logger][LoggerGeneric]>(instance: [FastifyInstance][FastifyInstance], done: (err?: [FastifyError][FastifyError]) => void): Promise\<unknown\> | void

[src](https://github.com/fastify/fastify/blob/main/types/hooks.d.ts#L206)

Triggered when fastify.close() is invoked to stop the server. It is useful when
plugins need a "shutdown" event, for example to close an open connection to a
database.


<!-- Links -->

[Fastify]:
    #fastifyrawserver-rawrequest-rawreply-loggeropts-fastifyserveroptions-fastifyinstance
[RawServerGeneric]: #rawserver
[RawRequestGeneric]: #rawrequest
[RawReplyGeneric]: #rawreply
[LoggerGeneric]: #logger
[RawBodyGeneric]: #rawbody
[HTTPMethods]: #fastifyhttpmethods
[RawServerBase]: #fastifyrawserverbase
[RawServerDefault]: #fastifyrawserverdefault
[FastifyRequest]: #fastifyfastifyrequestrawserver-rawrequest-requestgeneric
[FastifyRequestGenericInterface]: #fastifyrequestgenericinterface
[RawRequestDefaultExpression]: #fastifyrawrequestdefaultexpressionrawserver
[FastifyReply]: #fastifyfastifyreplyrawserver-rawreply-contextconfig
[RawReplyDefaultExpression]: #fastifyrawreplydefaultexpression
[FastifyServerOptions]: #fastifyfastifyserveroptions-rawserver-logger
[FastifyInstance]: #fastifyfastifyinstance
[FastifyLoggerOptions]: #fastifyfastifyloggeroptions
[ContextConfigGeneric]: #ContextConfigGeneric
[FastifyPlugin]:
    #fastifyfastifypluginoptions-rawserver-rawrequest-requestgeneric
[FastifyPluginCallback]: #fastifyfastifyplugincallbackoptions
[FastifyPluginAsync]: #fastifyfastifypluginasyncoptions
[FastifyPluginOptions]: #fastifyfastifypluginoptions
[FastifyRegister]:
    #fastifyfastifyregisterrawserver-rawrequest-requestgenericplugin-fastifyplugin-opts-fastifyregisteroptions
[FastifyRegisterOptions]: #fastifyfastifytregisteroptions
[LogLevel]: #fastifyloglevel
[FastifyError]: #fastifyfastifyerror
[RouteOptions]:
    #fastifyrouteoptionsrawserver-rawrequest-rawreply-requestgeneric-contextconfig
````

## Source: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization
````markdown
<h1 align="center">Fastify</h1>

## Validation and Serialization
Fastify uses a schema-based approach. We recommend using
[JSON Schema](https://json-schema.org/) to validate routes and serialize outputs.
Fastify compiles the schema into a highly performant function.

Validation is only attempted if the content type is `application/json`.

All examples use the
[JSON Schema Draft 7](https://json-schema.org/specification-links.html#draft-7)
specification.

> ⚠ Warning:
> Treat schema definitions as application code. Validation and serialization
> features use `new Function()`, which is unsafe with user-provided schemas. See
> [Ajv](https://npm.im/ajv) and
> [fast-json-stringify](https://npm.im/fast-json-stringify) for details.
>
> Whilst Fastify supports the
> [`$async` Ajv feature](https://ajv.js.org/guide/async-validation.html),
> it should not be used for initial validation. Accessing databases during
> validation may lead to Denial of Service attacks. Use
> [Fastify's hooks](./Hooks.md) like `preHandler` for `async` tasks after validation.

### Core concepts
Validation and serialization are handled by two customizable dependencies:
- [Ajv v8](https://www.npmjs.com/package/ajv) for request validation
- [fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify) for
  response body serialization

These dependencies share only the JSON schemas added to Fastify's instance via
`.addSchema(schema)`.

#### Adding a shared schema
<a id="shared-schema"></a>

The `addSchema` API allows adding multiple schemas to the Fastify instance for
reuse throughout the application. This API is encapsulated.

Shared schemas can be reused with the JSON Schema
[**`$ref`**](https://tools.ietf.org/html/draft-handrews-json-schema-01#section-8)
keyword. Here is an overview of how references work:

+ `myField: { $ref: '#foo' }` searches for `$id: '#foo'` in the current schema
+ `myField: { $ref: '#/definitions/foo' }` searches for `definitions.foo` in the
  current schema
+ `myField: { $ref: 'http://url.com/sh.json#' }` searches for a shared schema
  with `$id: 'http://url.com/sh.json'`
+ `myField: { $ref: 'http://url.com/sh.json#/definitions/foo' }` searches for a
  shared schema with `$id: 'http://url.com/sh.json'` and uses `definitions.foo`
+ `myField: { $ref: 'http://url.com/sh.json#foo' }` searches for a shared schema
  with `$id: 'http://url.com/sh.json'` and looks for `$id: '#foo'` within it

**Simple usage:**

```js
fastify.addSchema({
  $id: 'http://example.com/',
  type: 'object',
  properties: {
    hello: { type: 'string' }
  }
})

fastify.post('/', {
  handler () {},
  schema: {
    body: {
      type: 'array',
      items: { $ref: 'http://example.com#/properties/hello' }
    }
  }
})
```

**`$ref` as root reference:**

```js
fastify.addSchema({
  $id: 'commonSchema',
  type: 'object',
  properties: {
    hello: { type: 'string' }
  }
})

fastify.post('/', {
  handler () {},
  schema: {
    body: { $ref: 'commonSchema#' },
    headers: { $ref: 'commonSchema#' }
  }
})
```

#### Retrieving the shared schemas
<a id="get-shared-schema"></a>

If the validator and serializer are customized, `.addSchema` is not useful since
Fastify no longer controls them. To access schemas added to the Fastify instance,
use `.getSchemas()`:

```js
fastify.addSchema({
  $id: 'schemaId',
  type: 'object',
  properties: {
    hello: { type: 'string' }
  }
})

const mySchemas = fastify.getSchemas()
const mySchema = fastify.getSchema('schemaId')
```

The `getSchemas` function is encapsulated and returns shared schemas available
in the selected scope:

```js
fastify.addSchema({ $id: 'one', my: 'hello' })
// will return only `one` schema
fastify.get('/', (request, reply) => { reply.send(fastify.getSchemas()) })

fastify.register((instance, opts, done) => {
  instance.addSchema({ $id: 'two', my: 'ciao' })
  // will return `one` and `two` schemas
  instance.get('/sub', (request, reply) => { reply.send(instance.getSchemas()) })

  instance.register((subinstance, opts, done) => {
    subinstance.addSchema({ $id: 'three', my: 'hola' })
    // will return `one`, `two` and `three`
    subinstance.get('/deep', (request, reply) => { reply.send(subinstance.getSchemas()) })
    done()
  })
  done()
})
```


### Validation
Route validation relies on [Ajv v8](https://www.npmjs.com/package/ajv), a
high-performance JSON Schema validator. To validate input, add the required
fields to the route schema.

Supported validations include:
- `body`: validates the request body for POST, PUT, or PATCH methods.
- `querystring` or `query`: validates the query string.
- `params`: validates the route parameters.
- `headers`: validates the request headers.

Validations can be a complete JSON Schema object with a `type` of `'object'` and
a `'properties'` object containing parameters, or a simpler variation listing
parameters at the top level.

> ℹ For using the latest Ajv (v8), refer to the
> [`schemaController`](./Server.md#schema-controller) section.

Example:
```js
const bodyJsonSchema = {
  type: 'object',
  required: ['requiredKey'],
  properties: {
    someKey: { type: 'string' },
    someOtherKey: { type: 'number' },
    requiredKey: {
      type: 'array',
      maxItems: 3,
      items: { type: 'integer' }
    },
    nullableKey: { type: ['number', 'null'] }, // or { type: 'number', nullable: true }
    multipleTypesKey: { type: ['boolean', 'number'] },
    multipleRestrictedTypesKey: {
      oneOf: [
        { type: 'string', maxLength: 5 },
        { type: 'number', minimum: 10 }
      ]
    },
    enumKey: {
      type: 'string',
      enum: ['John', 'Foo']
    },
    notTypeKey: {
      not: { type: 'array' }
    }
  }
}

const queryStringJsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    excitement: { type: 'integer' }
  }
}

const paramsJsonSchema = {
  type: 'object',
  properties: {
    par1: { type: 'string' },
    par2: { type: 'number' }
  }
}

const headersJsonSchema = {
  type: 'object',
  properties: {
    'x-foo': { type: 'string' }
  },
  required: ['x-foo']
}

const schema = {
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema,
  params: paramsJsonSchema,
  headers: headersJsonSchema
}

fastify.post('/the/url', { schema }, handler)
```

For `body` schema, it is further possible to differentiate the schema per content
type by nesting the schemas inside `content` property. The schema validation
will be applied based on the `Content-Type` header in the request.

```js
fastify.post('/the/url', {
  schema: {
    body: {
      content: {
        'application/json': {
          schema: { type: 'object' }
        },
        'text/plain': {
          schema: { type: 'string' }
        }
        // Other content types will not be validated
      }
    }
  }
}, handler)
```

Note that Ajv will try to [coerce](https://ajv.js.org/coercion.html) values to
the types specified in the schema `type` keywords, both to pass validation and
to use the correctly typed data afterwards.

The Ajv default configuration in Fastify supports coercing array parameters in
`querystring`. Example:

```js
const opts = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          default: []
        },
      },
    }
  }
}

fastify.get('/', opts, (request, reply) => {
  reply.send({ params: request.query }) // echo the querystring
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err
})
```

```sh
curl -X GET "http://localhost:3000/?ids=1

{"params":{"ids":["1"]}}
```

A custom schema validator can be specified for each parameter type (body,
querystring, params, headers).

For example, the following code disables type coercion only for the `body`
parameters, changing the Ajv default options:

```js
const schemaCompilers = {
  body: new Ajv({
    removeAdditional: false,
    coerceTypes: false,
    allErrors: true
  }),
  params: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true
  }),
  querystring: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true
  }),
  headers: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true
  })
}

server.setValidatorCompiler(req => {
    if (!req.httpPart) {
      throw new Error('Missing httpPart')
    }
    const compiler = schemaCompilers[req.httpPart]
    if (!compiler) {
      throw new Error(`Missing compiler for ${req.httpPart}`)
    }
    return compiler.compile(req.schema)
})
```

For more information, see [Ajv Coercion](https://ajv.js.org/coercion.html).

#### Ajv Plugins
<a id="ajv-plugins"></a>

A list of plugins can be provided for use with the default `ajv` instance.
Ensure the plugin is **compatible with the Ajv version shipped within Fastify**.

> Refer to [`ajv options`](./Server.md#ajv) to check plugins format.

```js
const fastify = require('fastify')({
  ajv: {
    plugins: [
      require('ajv-merge-patch')
    ]
  }
})

fastify.post('/', {
  handler (req, reply) { reply.send({ ok: 1 }) },
  schema: {
    body: {
      $patch: {
        source: {
          type: 'object',
          properties: {
            q: {
              type: 'string'
            }
          }
        },
        with: [
          {
            op: 'add',
            path: '/properties/q',
            value: { type: 'number' }
          }
        ]
      }
    }
  }
})

fastify.post('/foo', {
  handler (req, reply) { reply.send({ ok: 1 }) },
  schema: {
    body: {
      $merge: {
        source: {
          type: 'object',
          properties: {
            q: {
              type: 'string'
            }
          }
        },
        with: {
          required: ['q']
        }
      }
    }
  }
})
```

#### Validator Compiler
<a id="schema-validator"></a>

The `validatorCompiler` is a function that returns a function to validate the
body, URL parameters, headers, and query string. The default `validatorCompiler`
returns a function that implements the [ajv](https://ajv.js.org/) validation
interface. Fastify uses it internally to speed up validation.

Fastify's [baseline ajv
configuration](https://github.com/fastify/ajv-compiler#ajv-configuration) is:

```js
{
  coerceTypes: 'array', // change data type of data to match type keyword
  useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
  removeAdditional: true, // remove additional properties if additionalProperties is set to false, see: https://ajv.js.org/guide/modifying-data.html#removing-additional-properties
  uriResolver: require('fast-uri'),
  addUsedSchema: false,
  // Explicitly set allErrors to `false`.
  // When set to `true`, a DoS attack is possible.
  allErrors: false
}
```

Modify the baseline configuration by providing
[`ajv.customOptions`](./Server.md#factory-ajv) to the Fastify factory.

To change or set additional config options, create a custom instance and
override the existing one:

```js
const fastify = require('fastify')()
const Ajv = require('ajv')
const ajv = new Ajv({
  removeAdditional: 'all',
  useDefaults: true,
  coerceTypes: 'array',
  // any other options
  // ...
})
fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema)
})
```
> ℹ️ Note: When using a custom validator instance, add schemas to the validator
> instead of Fastify. Fastify's `addSchema` method will not recognize the custom
> validator.

##### Using other validation libraries
<a id="using-other-validation-libraries"></a>

The `setValidatorCompiler` function allows substituting `ajv` with other
JavaScript validation libraries like [joi](https://github.com/hapijs/joi/) or
[yup](https://github.com/jquense/yup/), or a custom one:

```js
const Joi = require('joi')

fastify.post('/the/url', {
  schema: {
    body: Joi.object().keys({
      hello: Joi.string().required()
    }).required()
  },
  validatorCompiler: ({ schema, method, url, httpPart }) => {
    return data => schema.validate(data)
  }
}, handler)
```

```js
const yup = require('yup')
// Validation options to match ajv's baseline options used in Fastify
const yupOptions = {
  strict: false,
  abortEarly: false, // return all errors
  stripUnknown: true, // remove additional properties
  recursive: true
}

fastify.post('/the/url', {
  schema: {
    body: yup.object({
      age: yup.number().integer().required(),
      sub: yup.object().shape({
        name: yup.string().required()
      }).required()
    })
  },
  validatorCompiler: ({ schema, method, url, httpPart }) => {
    return function (data) {
      // with option strict = false, yup `validateSync` function returns the
      // coerced value if validation was successful, or throws if validation failed
      try {
        const result = schema.validateSync(data, yupOptions)
        return { value: result }
      } catch (e) {
        return { error: e }
      }
    }
  }
}, handler)
```

##### .statusCode property

All validation errors have a `.statusCode` property set to `400`, ensuring the
default error handler sets the response status code to `400`.

```js
fastify.setErrorHandler(function (error, request, reply) {
  request.log.error(error, `This error has status code ${error.statusCode}`)
  reply.status(error.statusCode).send(error)
})
```

##### Validation messages with other validation libraries

Fastify's validation error messages are tightly coupled to the default
validation engine: errors returned from `ajv` are eventually run through the
`schemaErrorFormatter` function which builds human-friendly error messages.
However, the `schemaErrorFormatter` function is written with `ajv` in mind.
This may result in odd or incomplete error messages when using other validation
libraries.

To circumvent this issue, there are two main options:

1. Ensure the validation function (returned by the custom `schemaCompiler`)
   returns errors in the same structure and format as `ajv`.
2. Use a custom `errorHandler` to intercept and format custom validation errors.

Fastify adds two properties to all validation errors to help write a custom
`errorHandler`:

* `validation`: the content of the `error` property of the object returned by
  the validation function (returned by the custom `schemaCompiler`)
* `validationContext`: the context (body, params, query, headers) where the
  validation error occurred

A contrived example of such a custom `errorHandler` handling validation errors
is shown below:

```js
const errorHandler = (error, request, reply) => {
  const statusCode = error.statusCode
  let response

  const { validation, validationContext } = error

  // check if we have a validation error
  if (validation) {
    response = {
      // validationContext will be 'body', 'params', 'headers', or 'query'
      message: `A validation error occurred when validating the ${validationContext}...`,
      // this is the result of the validation library...
      errors: validation
    }
  } else {
    response = {
      message: 'An error occurred...'
    }
  }

  // any additional work here, eg. log error
  // ...

  reply.status(statusCode).send(response)
}
```

### Serialization
<a id="serialization"></a>

Fastify uses [fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify)
to send data as JSON if an output schema is provided in the route options. Using
an output schema can drastically increase throughput and help prevent accidental
disclosure of sensitive information.

Example:
```js
const schema = {
  response: {
    200: {
      type: 'object',
      properties: {
        value: { type: 'string' },
        otherValue: { type: 'boolean' }
      }
    }
  }
}

fastify.post('/the/url', { schema }, handler)
```

The response schema is based on the status code. To use the same schema for
multiple status codes, use `'2xx'` or `default`, for example:
```js
const schema = {
  response: {
    default: {
      type: 'object',
      properties: {
        error: {
          type: 'boolean',
          default: true
        }
      }
    },
    '2xx': {
      type: 'object',
      properties: {
        value: { type: 'string' },
        otherValue: { type: 'boolean' }
      }
    },
    201: {
      // the contract syntax
      value: { type: 'string' }
    }
  }
}

fastify.post('/the/url', { schema }, handler)
```
A specific response schema can be defined for different content types.
For example:
```js
const schema = {
  response: {
    200: {
      description: 'Response schema that support different content types'
      content: {
        'application/json': {
          schema: {
            name: { type: 'string' },
            image: { type: 'string' },
            address: { type: 'string' }
          }
        },
        'application/vnd.v1+json': {
          schema: {
            type: 'array',
            items: { $ref: 'test' }
          }
        }
      }
    },
    '3xx': {
      content: {
        'application/vnd.v2+json': {
          schema: {
            fullName: { type: 'string' },
            phone: { type: 'string' }
          }
        }
      }
    },
    default: {
      content: {
        // */* is match-all content-type
        '*/*': {
          schema: {
            desc: { type: 'string' }
          }
        }
      }
    }
  }
}

fastify.post('/url', { schema }, handler)
```

#### Serializer Compiler
<a id="schema-serializer"></a>

The `serializerCompiler` returns a function that must return a string from an
input object. When defining a response JSON Schema, change the default
serialization method by providing a function to serialize each route.

```js
fastify.setSerializerCompiler(({ schema, method, url, httpStatus, contentType }) => {
  return data => JSON.stringify(data)
})

fastify.get('/user', {
  handler (req, reply) {
    reply.send({ id: 1, name: 'Foo', image: 'BIG IMAGE' })
  },
  schema: {
    response: {
      '2xx': {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' }
        }
      }
    }
  }
})
```

*To set a custom serializer in a specific part of the code, use
[`reply.serializer(...)`](./Reply.md#serializerfunc).*

### Error Handling
When schema validation fails for a request, Fastify will automatically return a
status 400 response including the result from the validator in the payload. For
example, if the following schema is used for a route:

```js
const schema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    },
    required: ['name']
  }
}
```

If the request fails to satisfy the schema, the route will return a response
with the following payload:

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "body should have required property 'name'"
}
```

To handle errors inside the route, specify the `attachValidation` option. If
there is a validation error, the `validationError` property of the request will
contain the `Error` object with the raw validation result as shown below:

```js
const fastify = Fastify()

fastify.post('/', { schema, attachValidation: true }, function (req, reply) {
  if (req.validationError) {
    // `req.validationError.validation` contains the raw validation error
    reply.code(400).send(req.validationError)
  }
})
```

#### `schemaErrorFormatter`

To format errors, provide a sync function that returns an error as the
`schemaErrorFormatter` option when instantiating Fastify. The context function
will be the Fastify server instance.

`errors` is an array of Fastify schema errors `FastifySchemaValidationError`.
`dataVar` is the currently validated part of the schema (params, body,
querystring, headers).

```js
const fastify = Fastify({
  schemaErrorFormatter: (errors, dataVar) => {
    // ... my formatting logic
    return new Error(myErrorMessage)
  }
})

// or
fastify.setSchemaErrorFormatter(function (errors, dataVar) {
  this.log.error({ err: errors }, 'Validation failed')
  // ... my formatting logic
  return new Error(myErrorMessage)
})
```

Use [setErrorHandler](./Server.md#seterrorhandler) to define a custom response
for validation errors such as:

```js
fastify.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
     reply.status(422).send(new Error('validation failed'))
  }
})
```

For custom error responses in the schema, see
[`ajv-errors`](https://github.com/epoberezkin/ajv-errors). Check out the
[example](https://github.com/fastify/example/blob/HEAD/validation-messages/custom-errors-messages.js)
usage.

> Install version 1.0.1 of `ajv-errors`, as later versions are not compatible
> with AJV v6 (the version shipped by Fastify v3).

Below is an example showing how to add **custom error messages for each
property** of a schema by supplying custom AJV options. Inline comments in the
schema describe how to configure it to show a different error message for each
case:

```js
const fastify = Fastify({
  ajv: {
    customOptions: {
      jsonPointers: true,
      // ⚠ Warning: Enabling this option may lead to this security issue https://www.cvedetails.com/cve/CVE-2020-8192/
      allErrors: true
    },
    plugins: [
      require('ajv-errors')
    ]
  }
})

const schema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        errorMessage: {
          type: 'Bad name'
        }
      },
      age: {
        type: 'number',
        errorMessage: {
          type: 'Bad age', // specify custom message for
          min: 'Too young' // all constraints except required
        }
      }
    },
    required: ['name', 'age'],
    errorMessage: {
      required: {
        name: 'Why no name!', // specify error message for when the
        age: 'Why no age!' // property is missing from input
      }
    }
  }
}

fastify.post('/', { schema, }, (request, reply) => {
  reply.send({
    hello: 'world'
  })
})
```

To return localized error messages, see
[ajv-i18n](https://github.com/epoberezkin/ajv-i18n).

```js
const localize = require('ajv-i18n')

const fastify = Fastify()

const schema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      age: {
        type: 'number',
      }
    },
    required: ['name', 'age'],
  }
}

fastify.setErrorHandler(function (error, request, reply) {
  if (error.validation) {
    localize.ru(error.validation)
    reply.status(400).send(error.validation)
    return
  }
  reply.send(error)
})
```

### JSON Schema support

JSON Schema provides utilities to optimize schemas. Combined with Fastify's
shared schema, all schemas can be easily reused.

| Use Case                          | Validator | Serializer |
|-----------------------------------|-----------|------------|
| `$ref` to `$id`                   | ️️✔️ | ✔️ |
| `$ref` to `/definitions`          | ✔️ | ✔️ |
| `$ref` to shared schema `$id`          | ✔️ | ✔️ |
| `$ref` to shared schema `/definitions` | ✔️ | ✔️ |

#### Examples

##### Usage of `$ref` to `$id` in same JSON Schema

```js
const refToId = {
  type: 'object',
  definitions: {
    foo: {
      $id: '#address',
      type: 'object',
      properties: {
        city: { type: 'string' }
      }
    }
  },
  properties: {
    home: { $ref: '#address' },
    work: { $ref: '#address' }
  }
}
```


##### Usage of `$ref` to `/definitions` in same JSON Schema
```js
const refToDefinitions = {
  type: 'object',
  definitions: {
    foo: {
      $id: '#address',
      type: 'object',
      properties: {
        city: { type: 'string' }
      }
    }
  },
  properties: {
    home: { $ref: '#/definitions/foo' },
    work: { $ref: '#/definitions/foo' }
  }
}
```

##### Usage `$ref` to a shared schema `$id` as external schema
```js
fastify.addSchema({
  $id: 'http://foo/common.json',
  type: 'object',
  definitions: {
    foo: {
      $id: '#address',
      type: 'object',
      properties: {
        city: { type: 'string' }
      }
    }
  }
})

const refToSharedSchemaId = {
  type: 'object',
  properties: {
    home: { $ref: 'http://foo/common.json#address' },
    work: { $ref: 'http://foo/common.json#address' }
  }
}
```

##### Usage `$ref` to a shared schema `/definitions` as external schema
```js
fastify.addSchema({
  $id: 'http://foo/shared.json',
  type: 'object',
  definitions: {
    foo: {
      type: 'object',
      properties: {
        city: { type: 'string' }
      }
    }
  }
})

const refToSharedSchemaDefinitions = {
  type: 'object',
  properties: {
    home: { $ref: 'http://foo/shared.json#/definitions/foo' },
    work: { $ref: 'http://foo/shared.json#/definitions/foo' }
  }
}
```

### Resources
<a id="resources"></a>

- [JSON Schema](https://json-schema.org/)
- [Understanding JSON
  Schema](https://spacetelescope.github.io/understanding-json-schema/)
- [fast-json-stringify
  documentation](https://github.com/fastify/fast-json-stringify)
- [Ajv documentation](https://github.com/epoberezkin/ajv/blob/master/README.md)
- [Ajv i18n](https://github.com/epoberezkin/ajv-i18n)
- [Ajv custom errors](https://github.com/epoberezkin/ajv-errors)
- Custom error handling with core methods with error file dumping
  [example](https://github.com/fastify/example/tree/main/validation-messages)
````

## Source: https://fastify.dev/docs/latest/Reference/Warnings
````markdown
<h1 align="center">Fastify</h1>

**Table of contents**
- [Warnings](#warnings)
  - [Warnings In Fastify](#warnings-in-fastify)
  - [Fastify Warning Codes](#fastify-warning-codes)
    - [FSTWRN001](#FSTWRN001)
    - [FSTWRN002](#FSTWRN002)
  - [Fastify Deprecation Codes](#fastify-deprecation-codes)


## Warnings

### Warnings In Fastify

Fastify uses Node.js's [warning event](https://nodejs.org/api/process.html#event-warning)
API to notify users of deprecated features and coding mistakes. Fastify's
warnings are recognizable by the `FSTWRN` and `FSTDEP` prefixes. When
encountering such a warning, it is highly recommended to determine the cause
using the [`--trace-warnings`](https://nodejs.org/api/cli.html#--trace-warnings)
and [`--trace-deprecation`](https://nodejs.org/api/cli.html#--trace-deprecation)
flags. These produce stack traces pointing to where the issue occurs in the
application's code. Issues opened about warnings without this information will
be closed due to lack of details.

Warnings can also be disabled, though it is not recommended. If necessary, use
one of the following methods:

- Set the `NODE_NO_WARNINGS` environment variable to `1`
- Pass the `--no-warnings` flag to the node process
- Set `no-warnings` in the `NODE_OPTIONS` environment variable

For more information on disabling warnings, see [Node's documentation](https://nodejs.org/api/cli.html).

Disabling warnings may cause issues when upgrading Fastify versions. Only
experienced users should consider disabling warnings.

### Fastify Warning Codes

| Code | Description | How to solve | Discussion |
| ---- | ----------- | ------------ | ---------- |
| <a id="FSTWRN001">FSTWRN001</a> | The specified schema for a route is missing. This may indicate the schema is not well specified. | Check the schema for the route. | [#4647](https://github.com/fastify/fastify/pull/4647) |
| <a id="FSTWRN002">FSTWRN002</a> | The %s plugin being registered mixes async and callback styles, which will result in an error in `fastify@5`. | Do not mix async and callback style. | [#5139](https://github.com/fastify/fastify/pull/5139) |


### Fastify Deprecation Codes

Deprecation codes are supported by the Node.js CLI options:

- [--no-deprecation](https://nodejs.org/api/cli.html#--no-deprecation)
- [--throw-deprecation](https://nodejs.org/api/cli.html#--throw-deprecation)
- [--trace-deprecation](https://nodejs.org/api/cli.html#--trace-deprecation)


| Code | Description | How to solve | Discussion |
| ---- | ----------- | ------------ | ---------- |
````

## Source: https://fastify.dev/docs/latest/resources/encapsulation_context.drawio
````
<mxfile host="app.diagrams.net" modified="2020-12-06T18:51:58.018Z" agent="5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36" etag="vyaguDTT1c9e-NqGeV_7" version="13.10.9" type="device"><diagram id="hZ89Y7exsLGRT07QCK17" name="Page-1">7ZpPk5owGMY/jcd2SCKIx0q3todOO+thjzsRAmQ2Eopx1f30DRKUNLCrncXN6uKMA0/+EN5feJNndICCxWZa4Dz9ySPCBtCJNgP0dQDhaDiS36WwrQQfOJWQFDSqJHAQZvSJKLGutqIRWWoVBedM0FwXQ55lJBSahouCr/VqMWf6XXOcEEOYhZiZ6h2NRKqewnUO+ndCk7S+M3BUyQLXlZWwTHHE1w0J3QxQUHAuqrPFJiCsjF0dl6rdt47S/cAKkoljGjyhO8+Z3U9YQP3bP1PHvc9+fFK9PGK2Ug98Ww4IOgHPBNkINXSxreOxTqkgsxyH5fVaIh+gSSoWTF4BeYqXeUUhphsibzyJKWMBZ7zYNUexW36k/kgKQWWYvzCaZLJM8LKngq+yqGy362wpCv5AGq293VH2KkfX0KtD6mZM6geUtyObhqRiNCV8QUSxlVVU6VDh2uqX6wN8d6y0tAF+L2I14ZJ9zwcm8kRhOQER6kL0m60SmhmE5DzLy9O84CFZytFMXmA2x+FDsov8r5VgNCNK12H8CzKOYRi2QYq8ued6rwMDOq5Gwzdp+C0wUF8shtfMYmwXC/eKWSDfLhbATFJG/MtQ5sc/+35Jx/O6B+fZmABPz9wAmUFBXktU+guLZ0QlSKncgHQvr/rcemGCdk299rX1lAn5POSXp+nbhXzUGfI3TQsRJn7cmha80CfzuBcKdan+XrS8FmfNFf4HIZOQXYjGBiJp7rIo7DF57cN/ZPLqHwrUmdQrbjO1wRYoALp9LbKOnW8OAZFLRm2Qxt4I4X5WmNqtjT7rOyEA3norZFrqq6cEkH2Y4AcmI+MhaB0m03EbYM5tLFCL2zrzLheY5vddO4thByubnAXodnOXsnE9HoOd1gJcvvv7D0SWMTL93/s3FydTsc9cmJ7PilfnFfdDJ0Oyz1zAy7eApyc4+8wFvHwPeHrGO6e5kJeHH9Z3ZY1/J6Cbvw==</diagram></mxfile>
````

## Source: https://fastify.dev/docs/latest/resources/encapsulation_context.svg
````
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="591px" height="591px" viewBox="-0.5 -0.5 591 591" content="&lt;mxfile host=&quot;app.diagrams.net&quot; modified=&quot;2020-12-06T18:52:11.078Z&quot; agent=&quot;5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36&quot; etag=&quot;_w1zgMmeoq0M6WH2W2QF&quot; version=&quot;13.10.9&quot; type=&quot;device&quot;&gt;&lt;diagram id=&quot;hZ89Y7exsLGRT07QCK17&quot; name=&quot;Page-1&quot;&gt;7ZpPk5owGMY/jcd2SCKIx0q3todOO+thjzsRAmQ2Eopx1f30DRKUNLCrncXN6uKMA0/+EN5feJNndICCxWZa4Dz9ySPCBtCJNgP0dQDhaDiS36WwrQQfOJWQFDSqJHAQZvSJKLGutqIRWWoVBedM0FwXQ55lJBSahouCr/VqMWf6XXOcEEOYhZiZ6h2NRKqewnUO+ndCk7S+M3BUyQLXlZWwTHHE1w0J3QxQUHAuqrPFJiCsjF0dl6rdt47S/cAKkoljGjyhO8+Z3U9YQP3bP1PHvc9+fFK9PGK2Ug98Ww4IOgHPBNkINXSxreOxTqkgsxyH5fVaIh+gSSoWTF4BeYqXeUUhphsibzyJKWMBZ7zYNUexW36k/kgKQWWYvzCaZLJM8LKngq+yqGy362wpCv5AGq293VH2KkfX0KtD6mZM6geUtyObhqRiNCV8QUSxlVVU6VDh2uqX6wN8d6y0tAF+L2I14ZJ9zwcm8kRhOQER6kL0m60SmhmE5DzLy9O84CFZytFMXmA2x+FDsov8r5VgNCNK12H8CzKOYRi2QYq8ued6rwMDOq5Gwzdp+C0wUF8shtfMYmwXC/eKWSDfLhbATFJG/MtQ5sc/+35Jx/O6B+fZmABPz9wAmUFBXktU+guLZ0QlSKncgHQvr/rcemGCdk299rX1lAn5POSXp+nbhXzUGfI3TQsRJn7cmha80CfzuBcKdan+XrS8FmfNFf4HIZOQXYjGBiJp7rIo7DF57cN/ZPLqHwrUmdQrbjO1wRYoALp9LbKOnW8OAZFLRm2Qxt4I4X5WmNqtjT7rOyEA3norZFrqq6cEkH2Y4AcmI+MhaB0m03EbYM5tLFCL2zrzLheY5vddO4thByubnAXodnOXsnE9HoOd1gJcvvv7D0SWMTL93/s3FydTsc9cmJ7PilfnFfdDJ0Oyz1zAy7eApyc4+8wFvHwPeHrGO6e5kJeHH9Z3ZY1/J6Cbvw==&lt;/diagram&gt;&lt;/mxfile&gt;"><defs/><g><rect x="0" y="0" width="590" height="590" rx="88.5" ry="88.5" fill="#f5f5f5" stroke="#666666" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 588px; height: 1px; padding-top: 7px; margin-left: 1px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #333333; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Root Context</div></div></div></foreignObject><text x="295" y="19" fill="#333333" font-family="Helvetica" font-size="12px" text-anchor="middle">Root Context</text></switch></g><rect x="165" y="40" width="80" height="30" rx="4.5" ry="4.5" fill="#fff2cc" stroke="#d6b656" pointer-events="all"/><path d="M 173 40 L 173 70 M 237 40 L 237 70" fill="none" stroke="#d6b656" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 55px; margin-left: 174px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Root Plugin</div></div></div></foreignObject><text x="205" y="59" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Root Plugin</text></switch></g><rect x="255" y="40" width="80" height="30" rx="4.5" ry="4.5" fill="#fff2cc" stroke="#d6b656" pointer-events="all"/><path d="M 263 40 L 263 70 M 327 40 L 327 70" fill="none" stroke="#d6b656" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 55px; margin-left: 264px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Root Plugin</div></div></div></foreignObject><text x="295" y="59" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Root Plugin</text></switch></g><rect x="345" y="40" width="80" height="30" rx="4.5" ry="4.5" fill="#fff2cc" stroke="#d6b656" pointer-events="all"/><path d="M 353 40 L 353 70 M 417 40 L 417 70" fill="none" stroke="#d6b656" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 55px; margin-left: 354px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Root Plugin</div></div></div></foreignObject><text x="385" y="59" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Root Plugin</text></switch></g><rect x="120" y="90" width="360" height="230" rx="34.5" ry="34.5" fill="#fff2cc" stroke="#d6b656" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 358px; height: 1px; padding-top: 97px; margin-left: 121px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Context</div></div></div></foreignObject><text x="300" y="109" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Context</text></switch></g><rect x="130" y="120" width="80" height="30" rx="4.5" ry="4.5" fill="#dae8fc" stroke="#6c8ebf" pointer-events="all"/><path d="M 138 120 L 138 150 M 202 120 L 202 150" fill="none" stroke="#6c8ebf" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 135px; margin-left: 139px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Plugin</div></div></div></foreignObject><text x="170" y="139" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Plug...</text></switch></g><rect x="220" y="120" width="80" height="30" rx="4.5" ry="4.5" fill="#dae8fc" stroke="#6c8ebf" pointer-events="all"/><path d="M 228 120 L 228 150 M 292 120 L 292 150" fill="none" stroke="#6c8ebf" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 135px; margin-left: 229px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Plugin</div></div></div></foreignObject><text x="260" y="139" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Plug...</text></switch></g><rect x="140" y="175" width="320" height="125" rx="18.75" ry="18.75" fill="#dae8fc" stroke="#6c8ebf" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 318px; height: 1px; padding-top: 182px; margin-left: 141px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Grandchild Context</div></div></div></foreignObject><text x="300" y="194" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Grandchild Context</text></switch></g><rect x="167.5" y="200" width="80" height="30" rx="4.5" ry="4.5" fill="#e1d5e7" stroke="#9673a6" pointer-events="all"/><path d="M 175.5 200 L 175.5 230 M 239.5 200 L 239.5 230" fill="none" stroke="#9673a6" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 215px; margin-left: 177px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Plugin</div></div></div></foreignObject><text x="208" y="219" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Plug...</text></switch></g><rect x="257.5" y="200" width="80" height="30" rx="4.5" ry="4.5" fill="#e1d5e7" stroke="#9673a6" pointer-events="all"/><path d="M 265.5 200 L 265.5 230 M 329.5 200 L 329.5 230" fill="none" stroke="#9673a6" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 215px; margin-left: 267px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Plugin</div></div></div></foreignObject><text x="298" y="219" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Plug...</text></switch></g><rect x="352.5" y="200" width="80" height="30" rx="4.5" ry="4.5" fill="#e1d5e7" stroke="#9673a6" pointer-events="all"/><path d="M 360.5 200 L 360.5 230 M 424.5 200 L 424.5 230" fill="none" stroke="#9673a6" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 215px; margin-left: 362px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Plugin</div></div></div></foreignObject><text x="393" y="219" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Plug...</text></switch></g><rect x="120" y="340" width="360" height="230" rx="34.5" ry="34.5" fill="#fff2cc" stroke="#d6b656" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 358px; height: 1px; padding-top: 347px; margin-left: 121px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Context</div></div></div></foreignObject><text x="300" y="359" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Context</text></switch></g><rect x="130" y="370" width="80" height="30" rx="4.5" ry="4.5" fill="#dae8fc" stroke="#6c8ebf" pointer-events="all"/><path d="M 138 370 L 138 400 M 202 370 L 202 400" fill="none" stroke="#6c8ebf" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 385px; margin-left: 139px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Plugin</div></div></div></foreignObject><text x="170" y="389" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Plug...</text></switch></g><rect x="220" y="370" width="80" height="30" rx="4.5" ry="4.5" fill="#dae8fc" stroke="#6c8ebf" pointer-events="all"/><path d="M 228 370 L 228 400 M 292 370 L 292 400" fill="none" stroke="#6c8ebf" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 385px; margin-left: 229px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Plugin</div></div></div></foreignObject><text x="260" y="389" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Plug...</text></switch></g><rect x="140" y="425" width="320" height="125" rx="18.75" ry="18.75" fill="#dae8fc" stroke="#6c8ebf" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 318px; height: 1px; padding-top: 432px; margin-left: 141px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Grandchild Context</div></div></div></foreignObject><text x="300" y="444" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Grandchild Context</text></switch></g><rect x="167.5" y="450" width="80" height="30" rx="4.5" ry="4.5" fill="#e1d5e7" stroke="#9673a6" pointer-events="all"/><path d="M 175.5 450 L 175.5 480 M 239.5 450 L 239.5 480" fill="none" stroke="#9673a6" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 465px; margin-left: 177px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Plugin</div></div></div></foreignObject><text x="208" y="469" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Plug...</text></switch></g><rect x="257.5" y="450" width="80" height="30" rx="4.5" ry="4.5" fill="#e1d5e7" stroke="#9673a6" pointer-events="all"/><path d="M 265.5 450 L 265.5 480 M 329.5 450 L 329.5 480" fill="none" stroke="#9673a6" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 465px; margin-left: 267px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Plugin</div></div></div></foreignObject><text x="298" y="469" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Plug...</text></switch></g><rect x="352.5" y="450" width="80" height="30" rx="4.5" ry="4.5" fill="#e1d5e7" stroke="#9673a6" pointer-events="all"/><path d="M 360.5 450 L 360.5 480 M 424.5 450 L 424.5 480" fill="none" stroke="#9673a6" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 62px; height: 1px; padding-top: 465px; margin-left: 362px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Child Plugin</div></div></div></foreignObject><text x="393" y="469" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Child Plug...</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"/><a transform="translate(0,-5)" xlink:href="https://desk.draw.io/support/solutions/articles/16000042487" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Viewer does not support full SVG 1.1</text></a></switch></svg>
````

## Source: https://fastify.dev/docs/latest/index
````markdown
<h1 align="center">Fastify</h1>

The documentation for Fastify is split into two categories:

- [Reference documentation](./Reference/Index.md)
- [Guides](./Guides/Index.md)

The reference documentation utilizes a very formal style in an effort to document
Fastify's API and implementation details thoroughly for the developer who needs
such. The guides category utilizes an informal educational style as a means to
introduce newcomers to core and advanced Fastify concepts.

## Where To Start

Complete newcomers to Fastify should first read our [Getting
Started](./Guides/Getting-Started.md) guide.

Developers experienced with Fastify should consult the [reference
documentation](./Reference/Index.md) directly to find the topic they are seeking
more information about.

## Additional Documentation

- Fastify's [Long Term Support (LTS)](./Reference/LTS.md) policy
````
