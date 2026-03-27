import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Layout from '../layout/Layout'
import { useAppStore } from '../store/useAppStore'
import ConsentBanner from '../components/ConsentBanner'

const Home = lazy(() => import('../pages/home/Home'))
const About = lazy(() => import('../pages/about/About'))
const Blog = lazy(() => import('../pages/blog/Blog'))
const BlogDetail = lazy(() => import('../pages/blog/BlogDetail'))
const Contact = lazy(() => import('../pages/contact/Contact'))
const Industries = lazy(() => import('../pages/industries/Industries'))
const IndustryDetail = lazy(() => import('../pages/industries/IndustryDetail'))
const BookCallPriority = lazy(() => import('../pages/bookCall/BookCallPriority'))
const Services = lazy(() => import('../pages/services/Services'))
const ServiceDetail = lazy(() => import('../pages/services/ServiceDetail'))
const Login = lazy(() => import('../pages/login/Login'))
const Signup = lazy(() => import('../pages/signup/Signup'))
const MfdPersonalBranding = lazy(() => import('../pages/mfd/MfdPersonalBranding'))
const AdminPanel = lazy(() => import('../pages/admin/AdminPanel'))

const RouteTracker = () => {
  const location = useLocation()
  const trackPageView = useAppStore((state) => state.trackPageView)
  const initializeAnalytics = useAppStore((state) => state.initializeAnalytics)
  const loadPublicSettings = useAppStore((state) => state.loadPublicSettings)
  const consent = useAppStore((state) => state.analytics.consent)

  useEffect(() => {
    loadPublicSettings()
  }, [loadPublicSettings])

  useEffect(() => {
    if (consent === 'granted') {
      initializeAnalytics()
      trackPageView(location.pathname + location.search)
    }
  }, [location.pathname, location.search, consent, initializeAnalytics, trackPageView])

  return null
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <RouteTracker />
      <Suspense fallback={<div className="px-4 py-10 text-sm text-gray-300">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="industries" element={<Industries />} />
            <Route path="industries/:slug" element={<IndustryDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="mfd-page" element={<MfdPersonalBranding />} />
            <Route path="book-a-call" element={<BookCallPriority />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="projects" element={<Navigate to="/industries" replace />} />
            <Route path="journal" element={<Navigate to="/blog" replace />} />
            <Route path="work" element={<Navigate to="/services" replace />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </Suspense>
      <ConsentBanner />
    </BrowserRouter>
  )
}

export default AppRoutes
