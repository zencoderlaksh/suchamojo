import { create } from 'zustand';
import {
  createBlogPost,
  fetchAdminSettings,
  fetchBlogBySlug,
  fetchBlogs,
  fetchPageSeo,
  fetchPublicSettings,
  postConsultationLead,
  updateAdminSettings,
} from '../lib/api';

const defaultFormState = {
  values: {
    name: '',
    email: '',
    phone: '',
    category: '1:1 Consulting',
    sebiRegistered: false,
    website: '',
  },
  submitting: false,
  error: '',
  successMessage: '',
};

const upsertMetaTag = (selector, attrs, contentKey, contentValue) => {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value));
    document.head.appendChild(tag);
  }
  tag.setAttribute(contentKey, contentValue);
};

const applySeoToHead = (seo = {}, fallbackTitle = 'Suchamojo') => {
  document.title = seo.metaTitle || fallbackTitle;
  upsertMetaTag('meta[name="description"]', { name: 'description' }, 'content', seo.metaDescription || '');
  upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, 'content', seo.ogTitle || seo.metaTitle || fallbackTitle);
  upsertMetaTag(
    'meta[property="og:description"]',
    { property: 'og:description' },
    'content',
    seo.ogDescription || seo.metaDescription || '',
  );
  upsertMetaTag(
    'meta[property="og:image"]',
    { property: 'og:image' },
    'content',
    seo.ogImage || '',
  );

  if (seo.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.canonicalUrl);
  }
};

export const useAppStore = create((set, get) => ({
  analytics: {
    consent: localStorage.getItem('sm_analytics_consent') || 'pending',
    gaMeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID || '',
    initialized: false,
  },
  blogs: {
    list: [],
    listLoading: false,
    listError: '',
    detail: null,
    detailLoading: false,
    detailError: '',
  },
  seoPages: {},
  settings: {
    cta: {
      enabled: true,
      label: 'Book Your Free Call',
      body: 'Start with a free 30-minute strategy call. No sales pitch. Just clarity.',
      link: '/book-a-call',
    },
    calendar: {
      defaultUrl: '',
    },
    loading: false,
    error: '',
  },
  forms: {
    default: { ...defaultFormState },
    mfd: { ...defaultFormState, values: { ...defaultFormState.values, category: 'MFD Branding' } },
  },

  setAnalyticsConsent: (consent) => {
    localStorage.setItem('sm_analytics_consent', consent);
    set((state) => ({ analytics: { ...state.analytics, consent } }));
    if (consent === 'granted') {
      get().initializeAnalytics();
    }
  },

  initializeAnalytics: () => {
    const { analytics } = get();
    if (analytics.initialized || analytics.consent !== 'granted' || !analytics.gaMeasurementId) return;

    if (!window.dataLayer) window.dataLayer = [];
    window.gtag = function gtag(...args) {
      window.dataLayer.push(args);
    };

    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.gaMeasurementId}`;
    document.head.appendChild(scriptTag);

    window.gtag('js', new Date());
    window.gtag('config', analytics.gaMeasurementId, { send_page_view: false });
    set((state) => ({ analytics: { ...state.analytics, initialized: true } }));
  },

  trackEvent: (eventName, params = {}) => {
    const { analytics } = get();
    if (analytics.consent !== 'granted' || !window.gtag) return;
    window.gtag('event', eventName, params);
  },

  trackPageView: (path) => {
    const { analytics } = get();
    if (analytics.consent !== 'granted' || !window.gtag || !analytics.gaMeasurementId) return;
    window.gtag('config', analytics.gaMeasurementId, { page_path: path });
  },

  loadBlogs: async (tag) => {
    set((state) => ({
      blogs: { ...state.blogs, listLoading: true, listError: '' },
    }));
    try {
      const data = await fetchBlogs({ tag });
      set((state) => ({
        blogs: { ...state.blogs, list: data, listLoading: false },
      }));
    } catch (error) {
      set((state) => ({
        blogs: { ...state.blogs, listLoading: false, listError: error.message },
      }));
    }
  },

  loadBlogDetail: async (slug) => {
    set((state) => ({
      blogs: { ...state.blogs, detailLoading: true, detailError: '' },
    }));
    try {
      const data = await fetchBlogBySlug(slug);
      set((state) => ({
        blogs: { ...state.blogs, detail: data, detailLoading: false },
      }));

      applySeoToHead(
        {
          metaTitle: data.metaTitle || data.title,
          metaDescription: data.metaDescription || data.excerpt,
          canonicalUrl: data.canonicalUrl,
          ogTitle: data.ogTitle || data.metaTitle || data.title,
          ogDescription: data.ogDescription || data.metaDescription || data.excerpt,
          ogImage: data.ogImage || data.heroImage || data.coverImage,
        },
        data.title,
      );
      get().trackEvent('blog_post_view', { slug: data.slug });
      return { found: true };
    } catch (error) {
      set((state) => ({
        blogs: { ...state.blogs, detailLoading: false, detailError: error.message, detail: null },
      }));
      return { found: false, error: error.message };
    }
  },

  loadPageSeo: async (slug, fallbackTitle = 'Suchamojo') => {
    try {
      const seo = await fetchPageSeo(slug);
      set((state) => ({ seoPages: { ...state.seoPages, [slug]: seo } }));
      applySeoToHead(seo, fallbackTitle);
      return seo;
    } catch (error) {
      return null;
    }
  },

  loadPublicSettings: async () => {
    set((state) => ({ settings: { ...state.settings, loading: true, error: '' } }));
    try {
      const data = await fetchPublicSettings();
      set((state) => ({
        settings: {
          ...state.settings,
          ...data,
          loading: false,
          error: '',
        },
      }));
    } catch (error) {
      set((state) => ({
        settings: { ...state.settings, loading: false, error: error.message },
      }));
    }
  },

  saveAdminSettings: async (adminKey, payload) => {
    const updated = await updateAdminSettings(adminKey, payload);
    set((state) => ({
      settings: {
        ...state.settings,
        cta: updated.cta,
        calendar: updated.calendar,
      },
    }));
    return updated;
  },

  getAdminSettings: async (adminKey) => {
    return fetchAdminSettings(adminKey);
  },

  adminCreateBlog: async (adminKey, payload) => {
    return createBlogPost(adminKey, payload);
  },

  setFormField: (formId, field, value) =>
    set((state) => ({
      forms: {
        ...state.forms,
        [formId]: {
          ...state.forms[formId],
          values: {
            ...state.forms[formId].values,
            [field]: value,
          },
        },
      },
    })),

  resetForm: (formId) =>
    set((state) => ({
      forms: {
        ...state.forms,
        [formId]: {
          ...defaultFormState,
          values: {
            ...defaultFormState.values,
            category:
              formId === 'mfd'
                ? state.forms[formId]?.values?.category || 'MFD Branding'
                : '1:1 Consulting',
          },
        },
      },
    })),

  submitForm: async ({ formId, sourcePage, hiddenAudience, hiddenOffer, deviceType }) => {
    const form = get().forms[formId];
    if (!form) return null;

    set((state) => ({
      forms: {
        ...state.forms,
        [formId]: { ...state.forms[formId], submitting: true, error: '', successMessage: '' },
      },
    }));

    try {
      const payload = {
        ...form.values,
        sourcePage,
        serviceInterest: form.values.category,
        audience: hiddenAudience || '',
        offer: hiddenOffer || '',
        timestamp: new Date().toISOString(),
        deviceType,
      };

      const response = await postConsultationLead(payload);

      set((state) => ({
        forms: {
          ...state.forms,
          [formId]: {
            ...state.forms[formId],
            submitting: false,
            error: '',
            successMessage: response.redirectToCalendar
              ? 'Qualified. Redirecting you to the booking calendar...'
              : 'Request received. Our team will contact you with the next best slot.',
          },
        },
      }));

      get().trackEvent('form_submitted', {
        source_page: sourcePage,
        service_interest: form.values.category,
        qualification_tier: response.qualificationTier,
      });

      if (response.redirectToCalendar && response.redirectUrl) {
        get().trackEvent('calendar_booking_completed', {
          source_page: sourcePage,
        });
      }

      return response;
    } catch (error) {
      set((state) => ({
        forms: {
          ...state.forms,
          [formId]: {
            ...state.forms[formId],
            submitting: false,
            error: error.message,
            successMessage: '',
          },
        },
      }));
      return null;
    }
  },
}));
