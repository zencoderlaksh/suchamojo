import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../pages/home/Home'
import About from '../pages/about/About'
import Blog from '../pages/blog/Blog'
import Contact from '../pages/contact/Contact'
import Industries from '../pages/industries/Industries'
import IndustryDetail from '../pages/industries/IndustryDetail'
import BookCallPriority from '../pages/bookCall/BookCallPriority'
import Services from '../pages/services/Services'
import ServiceDetail from '../pages/services/ServiceDetail'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="industries" element={<Industries />} />
          <Route path="industries/:slug" element={<IndustryDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="book-a-call" element={<BookCallPriority />} />
          <Route path="projects" element={<Navigate to="/industries" replace />} />
          <Route path="journal" element={<Navigate to="/about" replace />} />
          <Route path="work" element={<Navigate to="/services" replace />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
