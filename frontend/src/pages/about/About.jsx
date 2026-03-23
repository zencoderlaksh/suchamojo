import React from 'react'
import PageTemplate from '../../components/PageTemplate'
import { serviceLinks } from '../../data/siteStructure'

const About = () => {
  return (
    <PageTemplate
      eyebrow="About"
      title="About Suchamojo"
      intro="Suchamojo sits at the intersection of story, strategy, and visibility. The work is built around helping people sound more like themselves while becoming easier to trust and remember."
      points={[
        'A story-led approach to personal branding and positioning.',
        'Strategy grounded in identity instead of trend-chasing.',
        'Support for founders, experts, and leaders building durable authority.'
      ]}
      collectionTitle="Start With a Service"
      collectionLinks={serviceLinks}
      fit="For people who want to understand the thinking behind the brand before choosing the right offer."
    />
  )
}

export default About
