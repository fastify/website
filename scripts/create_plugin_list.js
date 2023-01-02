const { promises: fs } = require('fs')

const extractPlugins = (pluginContent) => {
    const lines = pluginContent
        .split('\n')
        .filter(Boolean) // remove empty lines

    // if a line doesn't start with "-" merge it back with the previous item
    const mergedLines = lines.reduce((acc, curr) => {
        if (curr[0] === '-') {
            acc.push(curr)
        } else {
            acc[acc.length - 1] += ' ' + curr
        }
        return acc
    }, [])
    const re = /\[`([-a-zA-Z0-9./@]+)`]\(([^)]+)\)(\s*(.+))?/
    const plugins = mergedLines.map((line) => {
        const match = re.exec(line)
        if (!match) {
            throw new Error(`Invalid entry found in Plugins list (docs/Ecosystem.md): "${line}". This line did not match the expected pattern (${re})`)
        }

        const name = match[1]
        const url = match[2]
        const description = match[3] ? match[3].trim() : ''

        return { name, url, description }
    })
    return plugins
}

async function extractEcosystemFromFile(file) {
    let data
    try {
        data = await fs.readFile(file, 'utf8')
    } catch (e) {
        if (e.code === 'ENOENT') {
            const legacyEcosystemFile = file.replace('Guides', '')
            data = await fs.readFile(legacyEcosystemFile, 'utf8')
        }
    }

    const content = data.toString()
    const corePluginsContent = content
        .split('#### [Core](#core)\n')[1]
        .split('#### [Community](#community)')[0]

    const communityPluginsContent = content
        .split('#### [Core](#core)\n')[1]
        .split('#### [Community](#community)')[1]

    const plugins = {
        corePlugins: extractPlugins(corePluginsContent),
        communityPlugins: extractPlugins(communityPluginsContent)
    }

    return ({ plugins })
}

async function process() {
    plugins = await extractEcosystemFromFile('Ecosystem.md')
    console.log(JSON.stringify(plugins['plugins']['communityPlugins']))
}

process()