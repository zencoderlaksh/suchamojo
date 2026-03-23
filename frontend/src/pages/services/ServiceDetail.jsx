import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import PageTemplate from '../../components/PageTemplate'
import { industryLinks, serviceDetails } from '../../data/siteStructure'

const ServiceDetail = () => {
  const { slug } = useParams()
  const detail = serviceDetails[slug]

  if (!detail) {
    return <Navigate to="/services" replace />
  }

  return (
    <PageTemplate
      eyebrow={detail.eyebrow}
      title={detail.title}
      intro={detail.intro}
      points={detail.points}
      collectionTitle="Industries We Support"
      collectionLinks={industryLinks}
      fit={detail.fit}
      ctaTitle={`Talk through the ${detail.title.toLowerCase()} fit`}
      ctaBody="If this service feels like the right direction, the next step is a call to align on goals, audience, and delivery format."
    />
  )
}

export default ServiceDetail
