import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "../layout/Layout";
import { useAppStore } from "../store/useAppStore";
import ConsentBanner from "../components/ConsentBanner";
import SmoothScroll from "../components/SmoothScroll";

// Admin components (lazy loaded to prevent bloating public bundle)
const AdminLayout = lazy(() => import("../layout/AdminLayout"));
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const AdminPanel = lazy(() => import("../pages/admin/AdminPanel"));
const Leads = lazy(() => import("../pages/admin/Leads"));
const Blogs = lazy(() => import("../pages/admin/Blogs"));
const Testimonials = lazy(() => import("../pages/admin/Testimonials"));
const MediaManager = lazy(() => import("../pages/admin/MediaManager"));
const SeoManager = lazy(() => import("../pages/admin/SeoManager"));
const Settings = lazy(() => import("../pages/admin/Settings"));

// Public site pages
const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/about/About"));
const Blog = lazy(() => import("../pages/blog/Blog"));
const BlogDetail = lazy(() => import("../pages/blog/BlogDetail"));
const Contact = lazy(() => import("../pages/contact/Contact"));
const Industries = lazy(() => import("../pages/industries/Industries"));
const IndustryDetail = lazy(() => import("../pages/industries/IndustryDetail"));
const BookCallPriority = lazy(
  () => import("../pages/bookCall/BookCallPriority"),
);
const Services = lazy(() => import("../pages/services/Services"));
const ServiceDetail = lazy(() => import("../pages/services/ServiceDetail"));
const PersonalBranding = lazy(
  () => import("../pages/personalBranding/PersonalBranding"),
);
const ContentCreation = lazy(
  () => import("../pages/contentCreation/ContentCreation"),
);
const TeamTraining = lazy(
  () => import("../pages/teamTraining/TeamTraining"),
);
const Login = lazy(() => import("../pages/login/Login"));
const Signup = lazy(() => import("../pages/signup/Signup"));
const MfdPersonalBranding = lazy(
  () => import("../pages/mfd/MfdPersonalBranding"),
);

const RouteTracker = () => {
  const location = useLocation();
  const trackPageView = useAppStore((state) => state.trackPageView);
  const initializeAnalytics = useAppStore((state) => state.initializeAnalytics);
  const loadPublicSettings = useAppStore((state) => state.loadPublicSettings);
  const consent = useAppStore((state) => state.analytics.consent);

  useEffect(() => {
    loadPublicSettings();
  }, [loadPublicSettings]);

  useEffect(() => {
    if (consent === "granted") {
      initializeAnalytics();
      trackPageView(location.pathname + location.search);
    }
  }, [
    location.pathname,
    location.search,
    consent,
    initializeAnalytics,
    trackPageView,
  ]);

  return null;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <RouteTracker />
        <Suspense
          fallback={
            <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-black/20">
              <div className="h-full w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 animate-pulse" />
            </div>
          }
        >
          <Routes>
            {/* Admin Management System (Isolated, no public floating footer/header) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPanel />} />
              <Route path="leads" element={<Leads />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="media" element={<MediaManager />} />
              <Route path="seo" element={<SeoManager />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Public Website Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="services/personal-branding" element={<PersonalBranding />} />
              <Route path="services/content-creation" element={<ContentCreation />} />
              <Route path="services/team-training" element={<TeamTraining />} />
              <Route path="services/:slug" element={<ServiceDetail />} />
              <Route path="personal-branding" element={<PersonalBranding />} />
              <Route path="content-creation" element={<ContentCreation />} />
              <Route path="team-training" element={<TeamTraining />} />
              <Route path="industries" element={<Industries />} />
              <Route path="industries/:slug" element={<IndustryDetail />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogDetail />} />
              <Route path="contact" element={<Contact />} />
              <Route path="mfd-page" element={<MfdPersonalBranding />} />
              <Route path="book-a-call" element={<BookCallPriority />} />

              <Route
                path="projects"
                element={<Navigate to="/industries" replace />}
              />
              <Route path="journal" element={<Navigate to="/blog" replace />} />
              <Route path="work" element={<Navigate to="/services" replace />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <ConsentBanner />
      </SmoothScroll>
    </BrowserRouter>
  );
};

export default AppRoutes;
