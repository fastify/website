import React from 'react'
import Heading from '@theme/Heading'
// TODO: will applies some styling

function HeroBanner({ title }) {
  return (
    <header className="hero-banner">
      <Heading as={'h1'} className="hero-title">
        {title}
      </Heading>
    </header>
  )
}

export default HeroBanner
