import React from 'react'
import PageTemplate from '../../components/PageTemplate'
import { industryLinks } from '../../data/siteStructure'

const Blog = () => {
  return (
    <PageTemplate
      eyebrow="Blog"
      title="Blog Coming Soon"
      intro="The sitemap marks blog as a future section, so this page is set up as a clean placeholder that keeps the route live without pretending the content archive already exists."
      points={[
        'A future home for essays, insights, and brand thinking.',
        'A live route that fits the site structure today.',
        'A ready place to expand with category pages and article templates later.'
      ]}
      collectionTitle="Explore Other Pages"
      collectionLinks={industryLinks.slice(0, 4)}
      fit="Useful for visitors who are browsing thought leadership and want another way into the site until the editorial section launches."
      ctaTitle="Use this route as a future-ready placeholder"
      ctaBody="When you are ready, we can turn this into a real editorial hub with listing pages, post templates, and featured article blocks."
      ctaLink="/book-a-call"
      ctaLabel="Discuss Next Build"
    />
  )
}

export default Blog
