import React from 'react'
import clsx from 'clsx'
import { HtmlClassNameProvider, ThemeClassNames, PageMetadata } from '@docusaurus/theme-common'
import {
  docVersionSearchTag,
  DocsSidebarProvider,
  DocsVersionProvider,
  useDocRouteMetadata,
} from '@docusaurus/theme-common/internal'
import DocPageLayout from '@theme/DocPage/Layout'
import NotFound from '@theme/NotFound'
import SearchMetadata from '@theme/SearchMetadata'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import { useLocation } from '@docusaurus/router'

function DocPageMetadata(props) {
  const { versionMetadata } = props
  return (
    <>
      <SearchMetadata
        version={versionMetadata.version}
        tag={docVersionSearchTag(versionMetadata.pluginId, versionMetadata.version)}
      />
      <PageMetadata>{versionMetadata.noIndex && <meta name="robots" content="noindex, nofollow" />}</PageMetadata>
    </>
  )
}
export default function DocPage(props) {
  const { versionMetadata } = props
  const currentDocRouteMetadata = useDocRouteMetadata(props)
  const location = useLocation()

  if (!currentDocRouteMetadata) {
    return <NotFound />
  }
  const { docElement, sidebarName, sidebarItems } = currentDocRouteMetadata

  // Show this warning only on migration guide pages for the latest version.
  const isMigrationGuide = location.pathname.toLowerCase().includes('migration-guide')
  const versionNumber = parseVersion(versionMetadata.version)

  return (
    <>
      <DocPageMetadata {...props} />
      <HtmlClassNameProvider
        className={clsx(
          // TODO: it should be removed from here
          ThemeClassNames.wrapper.docsPages,
          ThemeClassNames.page.docsDocPage,
          props.versionMetadata.className,
        )}>
        <DocsVersionProvider version={versionMetadata}>
          <DocsSidebarProvider name={sidebarName} items={sidebarItems}>
            <DocPageLayout>
              {/* NaN indicates the latest version */}
              {isMigrationGuide && (isNaN(versionNumber) || versionNumber === 5) && (
                <div className="alert alert--warning margin-top--md margin-bottom--md" role="alert">
                  <p>Version 3 and before of Fastify are no longer maintained.</p>
                  {/* <p>
                    <LatestVersionSuggestionLabel
                      versionLabel={latestVersionSuggestion.label}
                      to={latestVersionSuggestedDoc.path}
                      onClick={() => savePreferredVersionName(latestVersionSuggestion.name)}
                    />
                  </p> */}
                  For information about support options for end-of-life versions, see the{' '}
                  <a href="/docs/latest/Reference/LTS">Long Term Support</a> page.
                </div>
              )}
              {docElement}
            </DocPageLayout>
          </DocsSidebarProvider>
        </DocsVersionProvider>
      </HtmlClassNameProvider>
    </>
  )
}
function LatestVersionSuggestionLabel({ versionLabel, to, onClick }) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label used to tell the user to check the latest version"
      values={{
        versionLabel,
        latestVersionLink: (
          <b>
            <Link to={to} onClick={onClick}>
              <Translate
                id="theme.docs.versions.latestVersionLinkLabel"
                description="The label used for the latest version suggestion link label">
                latest version
              </Translate>
            </Link>
          </b>
        ),
      }}>
      {'For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).'}
    </Translate>
  )
}

const parseVersion = (versionString) => {
  // Remove 'v' prefix if present
  const cleanVersion = versionString.startsWith('v') ? versionString.slice(1) : versionString
  // Split the version string and get the first part (major version)
  const majorVersion = cleanVersion.split('.')[0]
  // Parse the major version to an integer
  return parseInt(majorVersion, 10)
}
