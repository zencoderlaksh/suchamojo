# Form Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SUCHAMOJO FRONTEND                       │
└─────────────────────────────────────────────────────────────┘

                            AppRoutes.jsx
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
              (/login)       (/signup)    (other routes)
                    │             │             │
              ┌─────▼─────┐ ┌─────▼─────┐ ┌────▼────┐
              │   Login   │ │  Signup   │ │ Layout  │
              │Component  │ │Component  │ │         │
              └─────┬─────┘ └─────┬─────┘ └─────────┘
                    │             │
                    └─────┬───────┘
                          │
              ┌───────────▼──────────────┐
              │  validationSchemas.js    │
              │  (Zod validation)        │
              │                          │
              │ - loginSchema            │
              │ - signupSchema           │
              │ - passwordSchema         │
              │ - serviceInterests[]     │
              └──────────────────────────┘
```

---

## Login Flow

```
┌──────────────┐
│ User visits  │
│  /login      │
└──────┬───────┘
       │
       ▼
┌─────────────────────────┐
│ Login.jsx renders form  │
│ - Email input           │
│ - Password input        │
│ - Remember Me checkbox  │
└──────┬──────────────────┘
       │
       │ User enters credentials
       ▼
┌─────────────────────────┐
│ onBlur validation       │
│ (Real-time checks)      │
│                         │
│ ✓ Valid email format?   │
│ ✓ Password 8+ chars?    │
└──────┬──────────────────┘
       │
       ▼
   Errors?
     / \
    /   \
   NO   YES
   │     │
   │     ▼
   │  Show error messages
   │  (red text below field)
   │     │
   │     │ User fixes errors
   │     └──────────┐
   │                │
   ▼                │
┌──────────────────┐│
│ User clicks      ││
│ "Sign In"        ││
└──────┬───────────┘│
       │            │
       └────────────┘
       │
       ▼
┌──────────────────────────┐
│ Button shows loading     │
│ "Signing in..."          │
│ (button disabled)        │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ POST /api/auth/login     │
│ {                        │
│   email: "...",          │
│   password: "...",       │
│   rememberMe: true/false │
│ }                        │
└──────┬───────────────────┘
       │
       ▼
  API Response?
     / \
    /   \
 SUCCESS ERROR
   │      │
   │      ▼
   │   ┌──────────────────────┐
   │   │ Show error banner    │
   │   │ "Invalid credentials"│
   │   │ Re-enable button     │
   │   └──────────────────────┘
   │
   ▼
┌──────────────────────────┐
│ Store JWT token          │
│ Store user info          │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Redirect to Dashboard    │
│ (navigate("/dashboard")) │
└──────────────────────────┘
```

---

## Signup Flow

```
┌──────────────┐
│ User visits  │
│  /signup     │
└──────┬───────┘
       │
       ▼
┌────────────────────────────┐
│ Signup.jsx renders form    │
│ - Full Name input          │
│ - Email input              │
│ - Username input           │
│ - Password input           │
│ - Confirm Password input   │
│ - Phone input              │
│ - Service Interest select  │
│ - Terms checkbox           │
└──────┬─────────────────────┘
       │
       │ User enters all fields
       ▼
┌────────────────────────────┐
│ Real-time validation       │
│ (onBlur for each field)    │
│                            │
│ ✓ Full Name: letters only? │
│ ✓ Email valid format?      │
│ ✓ Username alphanumeric?   │
│ ✓ Password strength?       │
│ ✓ Confirm password match?  │
│ ✓ Phone format valid?      │
│ ✓ Service selected?        │
│ ✓ Terms checked?           │
└──────┬─────────────────────┘
       │
       ▼
   All Valid?
     / \
    /   \
   NO   YES
   │     │
   │     ▼
   │  ┌─────────────────┐
   │  │ Submit button   │
   │  │ enabled & ready │
   │  └─────────────────┘
   │
   └─────────────┐
                 │
                 ▼ User clicks "Create Account"
        ┌────────────────────┐
        │ Show loading state │
        │ "Creating Account..│
        │ (button disabled)  │
        └────────┬───────────┘
                 │
                 ▼
        ┌────────────────────────────┐
        │ Collect metadata           │
        │ - Device type              │
        │ - Timestamp                │
        │ - Source page              │
        └────────┬───────────────────┘
                 │
                 ▼
        ┌────────────────────────────┐
        │ Prepare submitPayload:     │
        │ {                          │
        │   fullName: "...",         │
        │   email: "...",            │
        │   password: "...",         │
        │   phone: "...",            │
        │   serviceInterest: "...",  │
        │   sourcePage: "...",       │
        │   timestamp: "...",        │
        │   deviceType: "..."        │
        │ }                          │
        │ (excludes: confirmPassword,│
        │            termsAccepted)  │
        └────────┬───────────────────┘
                 │
                 ▼
        ┌────────────────────────────┐
        │ POST /api/auth/signup      │
        │ Send submitPayload as JSON │
        └────────┬───────────────────┘
                 │
                 ▼
             API Response?
               / \
              /   \
          SUCCESS ERROR
             │      │
             │      ▼
             │   ┌──────────────────────┐
             │   │ Show error banner    │
             │   │ e.g. "Email exists"  │
             │   │ Re-enable button     │
             │   │ Keep form data       │
             │   └──────────────────────┘
             │
             ▼
        ┌────────────────────────────┐
        │ Account created!           │
        │ Navigate to /login         │
        │ (User logs in with creds)  │
        └────────────────────────────┘
```

---

## Validation Logic

```
┌─────────────────────────────────────────┐
│    VALIDATION SCHEMAS (validationSchemas.js)
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          LOGIN VALIDATION               │
├─────────────────────────────────────────┤
│                                         │
│  Email:                                 │
│  ├─ Required ✓                          │
│  └─ Valid email format (RFC 5322) ✓    │
│                                         │
│  Password:                              │
│  ├─ Required ✓                          │
│  └─ Minimum 8 characters ✓              │
│                                         │
│  RememberMe:                            │
│  └─ Optional boolean ✓                  │
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│        SIGNUP VALIDATION                │
├─────────────────────────────────────────┤
│                                         │
│  Full Name:                             │
│  ├─ Required ✓                          │
│  ├─ 2-50 characters ✓                   │
│  └─ Letters & spaces only ✓             │
│                                         │
│  Email:                                 │
│  ├─ Required ✓                          │
│  └─ Valid format ✓                      │
│                                         │
│  Username:                              │
│  ├─ Optional ✓                          │
│  ├─ 3-20 characters ✓                   │
│  └─ Alphanumeric + _ - only ✓           │
│                                         │
│  Password (STRONG):                     │
│  ├─ Required ✓                          │
│  ├─ Minimum 8 characters ✓              │
│  ├─ At least 1 UPPERCASE ✓              │
│  ├─ At least 1 lowercase ✓              │
│  ├─ At least 1 number ✓                 │
│  └─ At least 1 special char ✓           │
│                                         │
│  Confirm Password:                      │
│  ├─ Required ✓                          │
│  └─ Must match password ✓               │
│                                         │
│  Phone:                                 │
│  └─ Optional, valid format ✓            │
│                                         │
│  Service Interest:                      │
│  ├─ Required ✓                          │
│  └─ One of: consulting,                 │
│             team-training,              │
│             cohort,                     │
│             mfd-branding ✓              │
│                                         │
│  Terms Accepted:                        │
│  ├─ Required ✓                          │
│  └─ Must be TRUE ✓                      │
│                                         │
└─────────────────────────────────────────┘
```

---

## Component Data Flow

```
┌──────────────────────┐
│   Login Component    │
└──────────┬───────────┘
           │
           │ useForm({resolver: zodResolver(loginSchema)})
           ▼
┌──────────────────────────────────────┐
│    React Hook Form Instance          │
│                                      │
│  Methods:                            │
│  - register() → attach to inputs     │
│  - handleSubmit() → validate & call  │
│  - formState.errors → error display  │
│  - watch() → observe field changes   │
└──────────┬───────────────────────────┘
           │
           │ register("email")
           │ register("password")
           │ register("rememberMe")
           ▼
┌──────────────────────────┐
│   Form Inputs (DOM)      │
│                          │
│ <input {...register(...)}│
│   onChange (automatic)   │
│   onBlur (triggers val)  │
└──────────┬───────────────┘
           │
           │ User interaction
           ▼
┌──────────────────────────┐
│   Error Display          │
│                          │
│ {errors.email?.message?  │
│  && <p>error text</p>}   │
└──────────────────────────┘

           │
           │ handleSubmit(onSubmit)
           ▼
┌──────────────────────────┐
│   Validation Occurred    │
│   (Zod Schema Check)     │
└──────────┬───────────────┘
           │
       Valid?
         / \
        /   \
      YES   NO
       │     │
       │     └─→ Show all errors
       │
       ▼
┌──────────────────────────┐
│   onSubmit(data)         │
│                          │
│   API Call               │
│   fetch("/api/auth/login")
└──────────────────────────┘
```

---

## Dependencies Map

```
Login.jsx / Signup.jsx
│
├─ react-hook-form
│  └─ useForm() hook
│
├─ @hookform/resolvers
│  └─ zodResolver integration
│
├─ zod
│  └─ Validation schema definitions
│
├─ react-router-dom
│  └─ useNavigate (redirect after login)
│
└─ validationSchemas.js
   └─ loginSchema, signupSchema
```

---

## State Management in Forms

```
LOGIN COMPONENT STATE:

┌──────────────────────────────────────┐
│  Form State (React Hook Form)        │
├──────────────────────────────────────┤
│  email: "user@example.com"           │
│  password: "MyPassword123!"          │
│  rememberMe: true                    │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  Component State (useState)          │
├──────────────────────────────────────┤
│  isLoading: false/true (during API)  │
│  apiError: "" (error message)        │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  React Router State                  │
├──────────────────────────────────────┤
│  navigate() → redirect user          │
│  /login → /dashboard (on success)    │
└──────────────────────────────────────┘
```

---

## Error Handling Flow

```
                    API Call
                       │
            ┌──────────┴──────────┐
            │                     │
        Success                Error
        (200-299)             (4xx-5xx)
            │                     │
            ▼                     ▼
        Store token          Parse response
        Store user           Get error message
        Navigate away        setApiError(msg)
                            Show error banner


ERROR DISPLAY:

┌────────────────────────────────┐
│  API Error Banner              │
│  ┌──────────────────────────┐  │
│  │ 🔴 Invalid credentials   │  │
│  └──────────────────────────┘  │
│  (Red background, at top)      │
└────────────────────────────────┘

┌────────────────────────────────┐
│  Field Validation Error        │
│  ┌──────────────────────────┐  │
│  │ Email:                   │  │
│  │ [input field  ]          │  │
│  │ 📍 Invalid email address │  │
│  │    (Red text below)      │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```

---

## Data Persistence

```
LOGIN:
└─ Store in localStorage/sessionStorage:
   ├─ JWT token (for API auth)
   ├─ User ID
   ├─ User email
   └─ Session expiry time

SIGNUP:
└─ Send to Backend Only:
   ├─ User data
   ├─ Service interest (for CRM)
   ├─ Source page (analytics)
   ├─ Device type (analytics)
   └─ Timestamp (analytics)

   Note: Confirm password & Terms
         agreement (NOT stored)
```

---

**Diagram Created**: March 5, 2024  
**For**: SuchAMojo Login/Signup Implementation  
**Version**: 1.0
