# 🏆 Sanjivani Gymkhana — Frontend

<div align="center">

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-F36-orange?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<p align="center">
  <strong>A modern, responsive, and interactive sports management portal for Sanjivani Group of Institutes & Sanjivani University.</strong>
</p>

[Introduction](#-introduction) • [Key Features](#-key-features) • [File Architecture](#-file-architecture) • [Commands to Push](#-commands-to-push)

</div>

---

## 📖 Introduction

**Sanjivani Gymkhana Frontend** is the official web application engineered to manage sports activities, equipment borrowing, athlete records, tournament announcements, and facility bookings across Sanjivani campus.

Built with **React 18**, **Vite**, and **Tailwind CSS**, the application delivers a blazing-fast, single-page application (SPA) experience with custom animations, role-based route protection, responsive layouts, and seamless backend integration.

check it here : https://sanjivani-gymkhana-frontend.vercel.app/

### 🛠️ Tech Stack & Dependencies

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 18.3](https://react.dev/) | Component-based UI library |
| **Build Tool** | [Vite 5.3](https://vitejs.dev/) | High-speed frontend development server & bundler |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Modern utility-first styling with custom theme extensions |
| **Routing** | [React Router DOM 6.24](https://reactrouter.com/) | Declarative client-side routing & protected routes |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, scalable feather UI iconography |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) | Real-time toast alerts for user actions |
| **HTTP Client** | [Axios](https://axios-http.com/) | REST API communication with the backend |
| **Deployment** | [Vercel](https://vercel.com/) | Production SPA hosting with rewrite configuration (`vercel.json`) |

---

## ✨ Key Features

### 🏠 1. Home & Hero Portal
- **Campus Sports Showcase**: Hero banner with live stats, upcoming sports events, and quick actions.
- **Facility Highlights**: High-impact cards for gymnasium, cricket stadium, football ground, and indoor badminton arena.
- **Call-to-Action**: Direct links to explore equipment inventory, read notices, and login.

### ℹ️ 2. About Us & Sports Council
- **Mission & Vision**: Core principles promoting sports culture, fitness, and student excellence.
- **Milestones Timeline**: Interactive history of university sports achievements, trophies, and annual athletic meets.
- **Leadership & Committee**: Dedicated profiles for sports directors, coaches, and student Gymkhana council.
- **Animated Stat Counters**: Scroll-triggered animations for medal counts, registered athletes, and sports facilities.

### 📞 3. Contact & Support Hub
- **Interactive Contact Form**: Direct messaging to the Gymkhana department with validation.
- **Campus Map Embed**: Interactive Google Maps pinpointing the Gymkhana complex.
- **Department Contacts**: Phone numbers, emails, and office timings for various sports divisions.
- **FAQ Accordion**: Instant answers regarding memberships, tournament entry dates, and equipment policies.

### 🏋️ 4. Sports Equipment Issue & Return Management
- **Live Inventory**: Browse available balls, bats, racquets, safety gear, and fitness apparatus.
- **Issue Requests**: Submit equipment issue requests with expected return times.
- **Status Tracking**: Track active borrowings and return dates in real time.

### 📊 5. Student & Athlete Dashboard
- **User Profile**: View active memberships, registration statuses, and match participation.
- **Borrowing History**: List of past and current issued equipment items.
- **Password Management**: Secure self-service password update functionality (`ChangePassword.jsx`).

### 🛡️ 6. Admin Management Portal
- **Role-Based Access**: Dedicated administrator view protected via `ProtectedRoute.jsx`.
- **Request Approvals**: Approve or reject equipment issue and return submissions.
- **Activity & Inventory Overview**: Central control panel for campus sports inventory.

### 🖼️ 7. Sports & Campus Gallery
- **High-Resolution Photo Gallery**: Filterable photo showcase of badminton courts, basketball arena, gym equipment, and campus tournaments.

---

## 📂 File Architecture

```text
sanjivani-gymkhana-frontend/
├── public/
│   └── favicon.ico                   # Application favicon
├── src/
│   ├── assets/                       # Image assets and illustrations
│   │   └── gallery/                  # Campus & sports facility photos
│   │       ├── badminton-court.jpg
│   │       ├── basketball-court.jpg
│   │       ├── campus.jpg
│   │       ├── court.jpg
│   │       ├── football.jpg
│   │       ├── gym-equipment.jpg
│   │       ├── gymkhana-building.jpg
│   │       ├── sanjivani-university.jpg
│   │       └── sports.jpg
│   ├── components/                   # Shared UI & Layout components
│   │   ├── Footer.jsx                # Global footer with links & contact info
│   │   ├── LoadingCard.jsx           # Animated skeleton loader
│   │   ├── Navbar.jsx                # Responsive header with mobile menu
│   │   └── ProtectedRoute.jsx        # Auth & role guard wrapper
│   ├── context/                      # Global State Management
│   │   └── AuthContext.jsx           # Authentication state & JWT session
│   ├── pages/                        # View Pages
│   │   ├── About.jsx                 # About Gymkhana, Timeline & Team
│   │   ├── AdminPortal.jsx           # Admin equipment & request approvals
│   │   ├── ChangePassword.jsx        # User password update page
│   │   ├── Contact.jsx               # Contact form, FAQs & Map
│   │   ├── Dashboard.jsx             # Student athlete personal dashboard
│   │   ├── Equipment.jsx             # Equipment listing & issue request
│   │   ├── Gallery.jsx               # Campus sports photo gallery
│   │   ├── Home.jsx                  # Main landing page
│   │   └── Login.jsx                 # Student & Admin sign-in
│   ├── App.jsx                       # Main App component & route definitions
│   ├── index.css                     # Tailwind directives & custom CSS tokens
│   └── main.jsx                      # Vite React entry point
├── .env.production                   # Production environment variables
├── .gitignore                        # Git exclusion rules
├── index.html                        # HTML entry point with fonts & metadata
├── package.json                      # NPM dependencies & build scripts
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Tailwind animations, keyframes & colors
├── vercel.json                       # Vercel SPA routing rewrite rules
└── vite.config.js                    # Vite plugins & configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (`v18.0.0` or higher)
- [npm](https://www.npmjs.com/)

### 2. Installation & Running Locally

```bash
# Navigate into the frontend folder
cd sanjivani-gymkhana/frontend

# Install dependencies
npm install

# Start local Vite development server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### 3. Production Build

```bash
npm run build
npm run preview
```

---

## 📤 Commands to Push

To stage, commit, and push your changes to your GitHub frontend repository:

```bash
# 1. Check current status
git status

# 2. Stage all changes
git add .

# 3. Create a commit
git commit -m "docs: add comprehensive project README and documentation"

# 4. Push to the main branch
git push origin main
```

---

## 📄 License
This project is licensed under the **MIT License**.
