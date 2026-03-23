import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import PageTemplate from '../../components/PageTemplate'
import { industryDetails, serviceLinks } from '../../data/siteStructure'

const IndustryDetail = () => {
  const { slug } = useParams()
  const detail = industryDetails[slug]

  if (!detail) {
    return <Navigate to="/industries" replace />
  }

  return (
    <PageTemplate
      eyebrow={detail.eyebrow}
      title={detail.title}
      intro={detail.intro}
      points={detail.points}
      collectionTitle="Relevant Services"
      collectionLinks={serviceLinks}
      fit="Useful for experts and operators who need their public brand to carry the same weight as their real-world work."
      ctaTitle={`Explore how ${detail.title.toLowerCase()} can build a stronger presence`}
      ctaBody="The fastest way to shape the right offer is to start with a conversation and map the message, audience, and growth goal together."
    />
  )
}

export default IndustryDetail
