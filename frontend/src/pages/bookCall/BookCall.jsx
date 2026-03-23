import React from 'react'
import PageTemplate from '../../components/PageTemplate'
import { serviceLinks } from '../../data/siteStructure'

const BookCall = () => {
  return (
    <PageTemplate
      eyebrow="Book a Call"
      title="Start the Conversation"
      intro="This is the high-priority conversion page for qualified leads who already know they want strategic support and are ready to discuss scope, fit, and outcomes."
      points={[
        'Share your current brand, business, or visibility challenge.',
        'Identify the most suitable service or engagement model.',
        'Leave with clarity on whether and how to work together.'
      ]}
      collectionTitle="Ways We Can Work Together"
      collectionLinks={serviceLinks}
      fit="Best for founders, experts, and teams who are serious about building a sharper public brand with intention."
      ctaTitle="Book the call"
      ctaBody="Use this page as the direct path for conversion-focused visitors. It can later be expanded with a scheduling embed, FAQs, proof points, and qualification copy."
      ctaLink="/contact"
      ctaLabel="Go to Contact"
      note="Right now this page is live as a structured conversion page and points into the existing contact flow."
    />
  )
}

export default BookCall
