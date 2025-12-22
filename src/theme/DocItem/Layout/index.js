import React from 'react'
import clsx from 'clsx'
import { useWindowSize } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import DocItemPaginator from '@theme/DocItem/Paginator'
import DocVersionBanner from '@theme/DocVersionBanner'
import DocVersionBadge from '@theme/DocVersionBadge'
import DocItemFooter from '@theme/DocItem/Footer'
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile'
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop'
import DocItemContent from '@theme/DocItem/Content'
import DocBreadcrumbs from '@theme/DocBreadcrumbs'
import ContentVisibility from '@theme/ContentVisibility'
import styles from './styles.module.css'
import Link from '@docusaurus/Link'

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc()
  const windowSize = useWindowSize()
  const hidden = frontMatter.hide_table_of_contents
  const canRender = !hidden && toc.length > 0
  const mobile = canRender ? <DocItemTOCMobile /> : undefined
  const desktop = canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? <DocItemTOCDesktop /> : undefined
  return {
    hidden,
    mobile,
    desktop,
  }
}
export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC()
  const { metadata } = useDoc()

  // Show warning only on migration guide pages.
  const isMigrationGuide = metadata.permalink.toLowerCase().includes('migration-guide')
  const versionNumber = parseVersion(metadata.version)

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}

            {/* Show warning only on current version of documentation pages.
                NaN indicates the latest version */}
            {isMigrationGuide && (isNaN(versionNumber) || versionNumber === 5) && (
              <div className="alert alert--warning margin-top--md margin-bottom--md" role="alert">
                <p>Version 3 and before of Fastify are no longer maintained.</p>
                For information about support options for end-of-life versions, see the{' '}
                <Link to="/docs/latest/Reference/LTS">Long Term Support</Link> page.
              </div>
            )}

            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  )
}

// Return version.
const parseVersion = (versionString) => {
  // Remove 'v' prefix if present
  const cleanVersion = versionString.startsWith('v') ? versionString.slice(1) : versionString
  // Split the version string and get the first part (major version)
  const majorVersion = cleanVersion.split('.')[0]
  // Parse the major version to an integer
  return parseInt(majorVersion, 10)
}
