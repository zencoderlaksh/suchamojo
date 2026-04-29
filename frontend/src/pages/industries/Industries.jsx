import React from "react";
import PageTemplate from "../../components/PageTemplate";
import { industryLinks } from "../../data/siteStructure";

const Industries = () => {
  return (
    <PageTemplate
      eyebrow="Industries"
      title="Industries We Serve"
      intro="Different industries need different trust signals. These pages organize how Suchamojo speaks to each audience with the right level of authority, nuance, and clarity."
      points={[
        "Industry-specific positioning and messaging direction.",
        "A clearer view of how personal branding applies in trust-heavy markets.",
        "A route into the most relevant service based on your role and growth stage.",
      ]}
      collectionTitle="Industry Subpages"
      collectionLinks={industryLinks}
      fit="Built for professionals and leaders whose expertise needs a sharper public narrative, not just more content."
    />
  );
};

export default Industries;
