import React from 'react';
import { useEffect } from 'react';
import Form from '../../components/Form';
import { useAppStore } from '../../store/useAppStore';

const MfdPersonalBranding = () => {
  const loadPageSeo = useAppStore((state) => state.loadPageSeo);

  useEffect(() => {
    loadPageSeo('mfd-page', 'Personal Branding For MFDs');
  }, [loadPageSeo]);

  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-14 pt-10 text-white sm:px-6 lg:px-8">
      <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-[#0b0b0f] p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-gray-400">MFD Subpage</p>
          <h1 className="mt-4 font-heading text-4xl uppercase tracking-[0.08em] sm:text-5xl">
            Personal Branding For MFDs
          </h1>
          <p className="mt-5 max-w-[52ch] font-body text-sm leading-relaxed text-gray-300 sm:text-base">
            This route has separate tracking and intent tagging so MFD leads stay isolated from
            general creator/founder pipelines.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-gray-300">
            <li>Audience tag: MFD</li>
            <li>Offer tag: MFD Personal Branding</li>
            <li>Optional SEBI registration field enabled</li>
          </ul>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <Form
            formId="mfd"
            sourcePageOverride="mfd-page"
            hiddenAudience="MFD"
            hiddenOffer="MFD Personal Branding"
            showSebiField
          />
        </div>
      </div>
    </section>
  );
};

export default MfdPersonalBranding;
