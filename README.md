# Rajesh Tope – Official Political Leader Website
### अधिकृत संकेतस्थळ: राजेश अंकुशराव टोपे (माजी मंत्री, महाराष्ट्र शासन)

A complete, premium, modern, and professional official political leadership website for **Shri Rajesh Ankushrao Tope (Rajesh Tope)**, Former Minister, Government of Maharashtra and Former MLA representing Ghansawangi, District Jalna, Maharashtra, India.

---

## 🏛️ Design & Architectural Philosophy

- **Authoritative & Dignified:** Inspired by premier official websites of Indian statesmen and political leaders.
- **Strict Minimal Palette:**
  - Primary Background: `#FFFFFF`
  - Secondary Background: `#F7F8FA`
  - Primary Text: `#17243A` (Deep Navy Slate)
  - Secondary Text: `#667085` (Muted Neutral Slate)
  - Subtle Accent: `#C58B45` (Subtle Saffron/Gold)
  - Borders: `#E7EAF0`
- **Default Language:** Defaults to **English** for new visitors, with persistent user selection across English, मराठी (Marathi), and हिंदी (Hindi).
- **Mobile-First Experience:** 100% responsive, optimized for smartphones (320px–480px) through tablets and desktop screens.
- **Micro-Interactions & Scroll Animations:** Framer Motion reveals with smooth staggered cards, hover lifts, and full `prefers-reduced-motion` compliance.

---

## 🔒 Security & Admin Architecture

- **Zero Demo Credentials in Frontend:** No demo PIN, sample passwords, or sensitive keys exist in the client JavaScript bundle.
- **Bcrypt (12 rounds) Password Hashing:** Server-side salted hash stored in gitignored `data/admin-auth.json`.
- **JWT Session Tokens:** 8-hour expiry tokens stored in `sessionStorage` (cleared on browser tab close).
- **Brute-Force Rate Limiting:** 5 failed attempts per 15 minutes per IP address on `/api/admin/login`.
- **Generic Auth Responses:** Returns generic `Invalid credentials` error to avoid username/password enumeration.
- **In-App Password Management:** Authenticated admin dashboard provides direct password change capability.

---

## 📝 Public Connect Form (5 Fields Only)

The citizen grievance & representation form is simplified to exactly five clean, mobile-friendly fields:
1. **Full Name**
2. **Mobile Number** (validated 10-digit Indian mobile)
3. **Village / City**
4. **Subject**
5. **Detailed Representation / Message** (comfortable large textarea)

- No email, category dropdown, CAPTCHA, or visible challenge UI.
- Generates a unique tracking reference number (e.g., `RT-2026-XXXXXX`).
- Server-side rate limiting (10 submissions per 5 minutes per IP).

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (.env)
Create a `.env` file based on `.env.example`:
```env
PORT=3001
JWT_SECRET=your_secure_random_jwt_secret_here
ADMIN_PASSWORD=your_secure_admin_password_here
```

### 3. Start Backend API Server
```bash
npm run server
# Runs on http://localhost:3001
```

### 4. Start Frontend Development Server
```bash
npm run dev
# Runs Vite dev server on http://localhost:5173 with proxy to backend
```

### 5. Production Build & Preview
```bash
npm run build
npm run preview
# Serves optimized production build on http://localhost:4173
```

---

## 👨‍💻 Credits
- **Designed & Developed by:** [Imran Tech](https://imran-tech-portfolio.vercel.app/)


---

## 🌟 Key Features

1. **Branded Loading Screen (2 Seconds):**
   - Centered RT monogram with subtle loading animation and progress bar.
   - Smooth fade-out reveal on initial visit.

2. **Sticky Premium Navigation:**
   - RT Monogram, title, active section spy, mobile drawer menu, and language switcher.
   - Discreet Admin Portal access button.

3. **Hero Section:**
   - Verified portrait of Rajesh Tope (`/images/rajesh-tope-portrait.jpg`).
   - Official credentials: *Former Minister, Govt. of Maharashtra* & *Former MLA – Ghansawangi, Jalna*.
   - Direct CTA buttons: *Explore My Journey*, *View Public Work*, and *Citizen Connect*.

4. **About Me (माझा परिचय):**
   - Verified biographical dossier:
     - **Full Name:** Rajeshbhaiyya Ankushrao Tope
     - **Popular Name:** Rajesh Bhaiyya Tope
     - **Date of Birth:** 11 January 1969 (Jalna, Maharashtra)
     - **Education:** B.E. (Mechanical), Maharashtra Institute of Technology (MIT), Pune, 1990
     - **Father:** Late Shri Ankushrao Raosaheb Tope (Ex-MP & Cooperative Pioneer)
     - **Political Affiliation:** Nationalist Congress Party (NCP)

5. **Political Journey (राजकीय प्रवास):**
   - Interactive vertical timeline from 1996 through 2024:
     - 1996 – Initial Lok Sabha electoral contest
     - 1999 – Elected to Maharashtra Legislative Assembly
     - 2001 – Minister of State responsibilities
     - 2008–2014 – Cabinet Minister for Higher & Technical Education
     - 2019 – Sworn in as Cabinet Minister in Maharashtra
     - 2019–2022 – Minister for Public Health & Family Welfare (Extensively noted for COVID-19 pandemic stewardship)
     - 2019–2024 – Represented Ghansawangi in Maharashtra Assembly
     - 2024 – Contested the Ghansawangi Assembly election (96,187 votes, Former MLA)

6. **Ministerial Experience (मंत्रिपदाचा अनुभव):**
   - Detailed portfolio cards: Public Health, Higher & Technical Education, Medical Education, Water Conservation, Energy, Environment, and Urban Development.

7. **Connected with Ghansawangi (घनसावंगी मतदारसंघ):**
   - Geographic context, Matsyodari Shikshan Sanstha, Samarth Sahakari Sakhar Karkhana, and interactive Leaflet map centered on Ghansawangi and Jalna district.

8. **Development Work (विकासकामे):**
   - Filterable projects across 8 categories: Roads, Water Supply, Education, Healthcare, Agriculture, Rural Development, Public Facilities, Social Initiatives.
   - Interactive modal with official references.

9. **Public Activities (जनसंपर्क):**
   - Editorial photo showcase: Village visits (गावभेट), Citizen grievance redressal (जनता दरबार), Health camps, and Farmer assemblies.

10. **News & Latest Updates:**
    - Clean newspaper-style articles with reader modal, print functionality, and category filters.

11. **Photo & Video Gallery:**
    - Lightbox viewer with zoom, captions, and next/prev controls.
    - Video gallery tab embedding official legislative speeches and press conferences.

12. **Public Connect (आपला संवाद):**
    - Interactive citizen grievance and representation submission form.
    - Real-time client-side validation, anti-spam security question, instant tracking reference ID (`RT-2026-XXXX`), and persistent storage in localStorage.

13. **Contact Section:**
    - Official addresses for Ghansawangi Central Office, Jalna District HQ Office, and Mumbai Liaison Office.
    - Official email (`office@rajeshtope.in`), operating hours, Google Maps links, and verified social media handles.

14. **Admin Control Room (`/admin` or header shield icon):**
    - PIN protected (Default Demo PIN: `admin123` or `tope2026`).
    - Review citizen petitions, update workflow status (`New` ➔ `Under Review` ➔ `Action Taken`), write administrative notes, and export to CSV.

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18+)
- npm

### Development
```bash
npm install
npm run dev
```

### Production Build & Preview
```bash
npm run build
npm run preview
```

The application is live at `http://localhost:4173/`.
