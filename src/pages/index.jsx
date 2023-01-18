import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageHeader from '@site/src/components/HomePageHeader/index.jsx'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
    </Layout>
  )
}
