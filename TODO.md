# Implementation Plan

## Issue 1: Testimonials Upload from Admin Dashboard + Frontend Visibility

### Step 1: Fix Backend Testimonial Routes ✅

- `backend/routes/testimonialRoutes.js`: Added `protect` middleware before `isAdmin` on POST/PUT/DELETE so `req.user` is populated.

### Step 2: Create Admin Testimonials Page ✅

- `frontend/src/pages/admin/Testimonials.jsx`: Full CRUD admin page (list, create, edit, delete) styled like Blogs.jsx.

### Step 3: Add Route ✅

- `frontend/src/appRoutes/AppRoutes.jsx`: Imported Testimonials admin page and added route `/admin/testimonials`.

### Step 4: Add Sidebar Link ✅

- `frontend/src/layout/AdminLayout.jsx`: Added `<Link to="/admin/testimonials">Testimonials</Link>` in sidebar nav.

### Step 5: Fix Frontend Visibility ✅

- `frontend/src/pages/home/component/Testimonials.jsx`: Hide entire section when no testimonials exist.

---

## Issue 2: Auto-Reply Email to Leads via Nodemailer

### Step 6: Install Nodemailer Dependency ✅

- `backend/package.json`: Added `nodemailer` to dependencies.
- Ran `cd backend && npm install`.

### Step 7: Update Lead Emails Service ✅

- `backend/services/leadEmails.js`: Added Nodemailer as primary transport with Resend fallback. Added professional placeholder template with clear comment for template swap.

### Step 8: Update Lead Controller ✅

- `backend/controllers/leadController.js`: Updated emailStatus init to detect both Nodemailer (`SMTP_HOST`) and Resend (`RESEND_API_KEY`) credentials.

### Step 9: Add Test Email Endpoint ✅

- `backend/routes/leadRoutes.js`: Added `POST /api/leads/test-email` (admin-only) for quick email configuration verification.
- `backend/controllers/leadController.js`: Added `testEmailConfiguration` controller that sends a real test email without creating a lead.
