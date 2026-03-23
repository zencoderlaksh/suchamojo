import React from 'react'
import PageTemplate from '../../components/PageTemplate'
import { serviceLinks } from '../../data/siteStructure'

const Services = () => {
  return (
    <PageTemplate
      eyebrow="Services"
      title="Service Pages"
      intro="These pages define the core ways clients can work with Suchamojo, from direct strategy to team enablement and creative support."
      points={[
        'Clear service paths for individual and team-led engagements.',
        'A focused explanation of how each offer creates brand clarity and authority.',
        'A direct route into the most relevant next page for conversion.'
      ]}
      collectionTitle="Service Subpages"
      collectionLinks={serviceLinks}
      fit="Best for people who already understand the value of strategic personal branding and want to choose the right format."
    />
  )
}

export default Services
