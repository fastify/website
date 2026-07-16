import React from 'react'
import OriginalCodeBlock from '@docusaurus/theme-classic/lib/theme/CodeBlock/index.js'

export default function CodeBlock({ language, title, noTitle, ...props }) {
  const resolvedTitle = noTitle ? undefined : (title ?? language)

  return <OriginalCodeBlock language={language} title={resolvedTitle} {...props} />
}
