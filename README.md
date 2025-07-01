# AI Test Master - SaaS Landing Page

A modern React.js landing page and authentication system for AI Test Master, built with Vite, Tailwind CSS, and Express.js backend.

## 🚀 Features

- **Modern Landing Page** - Complete SaaS-style marketing site
- **User Authentication** - Signup and Login functionality  
- **Backend Integration** - Node.js + Express + SQLite
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Amzur Branding** - Professional corporate branding

## 🎯 Current Working Routes

- `/` - Complete landing page with all marketing sections
- `/signup` - User registration form (✅ Working)
- `/login` - User login form (✅ Working)

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router DOM, Lucide React
**Backend:** Node.js, Express.js, SQLite3, bcryptjs, cors

## 🚀 Quick Start

1. **Frontend:** `npm install && npm run dev` (runs on http://localhost:5173)
2. **Backend:** `cd backend && npm install && npm start` (runs on http://localhost:3001)

## 📁 Clean Project Structure

```
src/
├── components/           # All React components
│   ├── LandingPage.jsx  # Main landing page
│   ├── Header.jsx       # Navigation
│   ├── Hero.jsx         # Hero section  
│   ├── Signup.jsx       # Registration (✅)
│   ├── Login.jsx        # Login (✅)
│   └── [other sections]
├── services/api.js      # API functions
└── App.jsx             # Main app

backend/
├── routes/auth.js      # Auth endpoints
├── server.js          # Express server
└── database.sqlite    # User data
```

## ✅ Status: PRODUCTION READY

- Landing page: ✅ Complete
- Authentication: ✅ Signup & Login working
- Backend: ✅ Connected and functional
- Database: ✅ SQLite with user storage
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography

## Components

- **Header**: Navigation with logo and call-to-action buttons
- **Hero**: Main landing section with value proposition
- **Dashboard**: Interactive dashboard mockup showing platform capabilities
- **Test Management**: Test suite management interface
- **Features**: Key features with icons and descriptions
- **Roles**: Role-based benefits for QA Engineers, Developers, and Clients
- **Pricing**: Three-tier pricing plans with feature comparisons
- **Integrations**: Popular tool integrations (GitHub, Jenkins, Selenium, JIRA)
- **CTA**: Call-to-action section encouraging trial signup
- **Footer**: Simple footer with branding

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful & consistent icons
- **PostCSS**: CSS post-processing
- **Autoprefixer**: Automatic vendor prefixing

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Dashboard.jsx
│   ├── TestManagement.jsx
│   ├── Features.jsx
│   ├── Roles.jsx
│   ├── Pricing.jsx
│   ├── Integrations.jsx
│   ├── CTA.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Customization

### Colors
The primary color scheme can be customized in `tailwind.config.js`. The current theme uses blue as the primary color.

### Content
All content is stored directly in the components. To update text, modify the respective component files.

### Styling
This project uses Tailwind CSS. Add new utility classes or customize existing ones in the `tailwind.config.js` file.

## License

This project is licensed under the MIT License.
