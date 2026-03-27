import React from 'react';
import { useAppStore } from '../store/useAppStore';

const ConsentBanner = () => {
  const consent = useAppStore((state) => state.analytics.consent);
  const setAnalyticsConsent = useAppStore((state) => state.setAnalyticsConsent);

  if (consent !== 'pending') return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[80] mx-auto max-w-3xl rounded-2xl border border-white/20 bg-black/90 p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <p className="text-sm text-gray-200">
        We use analytics to track page views, CTA clicks, and form conversion events.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setAnalyticsConsent('granted')}
          className="rounded-full bg-white px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-black"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => setAnalyticsConsent('denied')}
          className="rounded-full border border-white/30 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-white"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
