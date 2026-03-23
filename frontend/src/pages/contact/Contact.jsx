import React from 'react'
import PageTemplate from '../../components/PageTemplate'
import { serviceLinks } from '../../data/siteStructure'

const Contact = () => {
  return (
    <PageTemplate
      eyebrow="Contact"
      title="Contact"
      intro="A clear contact page for inbound conversations, partnership inquiries, and people who want to understand the best way to start."
      points={[
        'Reach out with your challenge, audience, and current stage.',
        'Use this route for general inquiries and early conversations.',
        'Move into the right service path or a direct consultation from here.'
      ]}
      collectionTitle="Popular Service Paths"
      collectionLinks={serviceLinks}
      fit="Designed for visitors who want a straightforward route into the brand without needing to decide everything upfront."
      ctaTitle="Prefer a higher-intent route?"
      ctaBody="If the visitor is already qualified and ready to discuss working together, the book-a-call page is the stronger conversion step."
      ctaLink="/book-a-call"
      ctaLabel="Go to Book a Call"
    />
  )
}

export default Contact
