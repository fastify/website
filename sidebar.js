'use strict'

function skipIndex(items) {
  return items.filter(({ type, id }) => {
    return type !== 'doc' || !id?.startsWith('version-')
  })
}

module.exports = async function sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
  const sidebarItems = await defaultSidebarItemsGenerator(args)
  return skipIndex(sidebarItems)
}
