import React, { lazy } from 'react'
import { useLocation } from '@docusaurus/router'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { useActiveVersion, useVersions } from '@docusaurus/plugin-content-docs/client'
import { usePluginData } from '@docusaurus/useGlobalData'

// Reuse Orama's theme helpers but ensure the search filter receives a version name string.
import useOrama from '@orama/plugin-docusaurus-v3/dist/theme/SearchBar/useOrama.js'
import { getColorMode, getPreferredVersion } from '@orama/plugin-docusaurus-v3/dist/theme/SearchBar/utils.js'

const oramaComponentsPath = '../../node_modules/@orama/react-components/dist/index.js'

const OramaSearchButton = lazy(() =>
  import(oramaComponentsPath).then((module) => ({
    default: module.OramaSearchButton,
  })),
)

const OramaSearchBox = lazy(() =>
  import(oramaComponentsPath).then((module) => ({
    default: module.OramaSearchBox,
  })),
)

// Add `where` when collectionManager is provided. Handles different query APIs.
function formatSearchParams(versionName, collectionManager) {
  if (collectionManager) {
    return {
      version: versionName,
    }
  }

  return {
    version: { eq: versionName },
  }
}

function resolveVersionName({ activeVersionName, preferredVersionName, versions }) {
  // Plugin passes the whole version object; Orama expects a string. Keep this override until upstream fixes it.
  return activeVersionName || preferredVersionName || versions?.[0]?.name || 'latest'
}

export function OramaSearchNoDocs() {
  const colorMode = getColorMode()
  const {
    searchBoxConfig,
    searchBtnConfig = {
      text: 'Search',
    },
  } = useOrama()
  const collectionManager = searchBoxConfig.basic?.collectionManager

  return (
    <>
      <OramaSearchButton colorScheme={colorMode} className="DocSearch-Button" {...searchBtnConfig}>
        {searchBtnConfig?.text}
      </OramaSearchButton>
      <OramaSearchBox
        {...(collectionManager ? {} : searchBoxConfig.basic)}
        {...searchBoxConfig.custom}
        oramaCoreClientInstance={collectionManager}
        colorScheme={colorMode}
        searchParams={{
          where: formatSearchParams('latest', collectionManager),
        }}
      />
    </>
  )
}

export function OramaSearchWithDocs({ pluginId }) {
  const colorMode = getColorMode()
  const { searchBoxConfig, searchBtnConfig } = useOrama()
  const collectionManager = searchBoxConfig.basic?.collectionManager
  const versions = useVersions(pluginId)
  const activeVersion = useActiveVersion(pluginId)
  const preferredVersion = getPreferredVersion(searchBoxConfig.basic?.clientInstance)

  // Ensure the filter receives a string version name, not a full version object.
  const currentVersionName = resolveVersionName({
    activeVersionName: activeVersion?.name,
    preferredVersionName: preferredVersion,
    versions,
  })

  const searchParams = currentVersionName
    ? {
        where: formatSearchParams(currentVersionName, collectionManager),
      }
    : {}

  return (
    <>
      <OramaSearchButton colorScheme={colorMode} className="DocSearch-Button" {...searchBtnConfig}>
        {searchBtnConfig?.text || 'Search'}
      </OramaSearchButton>
      <OramaSearchBox
        {...(collectionManager ? {} : searchBoxConfig.basic)}
        {...searchBoxConfig.custom}
        oramaCoreClientInstance={collectionManager}
        colorScheme={colorMode}
        searchParams={searchParams}
      />
    </>
  )
}

export default function OramaSearchWrapper() {
  const { pathname } = useLocation()
  const { docsInstances } = usePluginData('@orama/plugin-docusaurus-v3')
  let pluginId

  if (docsInstances) {
    pluginId = docsInstances.find((id) => pathname.includes(id)) || docsInstances?.[0]
  }

  return (
    <BrowserOnly fallback={<div>Loading Search...</div>}>
      {() => {
        if (pluginId) {
          return <OramaSearchWithDocs pluginId={pluginId} />
        }
        return <OramaSearchNoDocs />
      }}
    </BrowserOnly>
  )
}
