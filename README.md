# The Tiny Twirl 

> Little Twirl, Big Smile! A joyful space where little ones move, learn, grow and shine.

**The Tiny Twirl** is a premier Kids Gymnastics Centre located in Coimbatore, Tamil Nadu. This project is a full-stack web application built to serve both as a beautiful public-facing website for parents and a powerful administrative portal for the gym's staff to manage their content.

---

## Features

### Public Website
- **Modern & Premium UI:** Designed with a vibrant, playful, yet professional aesthetic using Tailwind CSS and Framer Motion for smooth animations.
- **Programs & Classes:** Browse age-appropriate gymnastics programs.
- **Gallery & Media:** A dynamic gallery showcasing photos and videos of the kids in action.
- **Events & Offers:** Stay updated with upcoming workshops, holiday camps, and special promotional offers.
- **Testimonials:** Read verified reviews and feedback from happy parents.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing, complete with a smart mobile-only back button for easy navigation.

### Admin Portal
- **Secure Authentication:** JWT-based login system for administrators with auto-expiration and strict security protocols.
- **Dashboard:** Get a quick overview of active programs, total media count, active offers, and upcoming events.
- **Content Management System (CMS):**
  - **Media:** Upload and delete photos/videos directly. Hosted seamlessly via Cloudinary.
  - **Programs:** Add, edit, or remove gymnastics programs (Age range, stage, description).
  - **Offers & Events:** Schedule promotional banners and events. *Includes an automated background cron job that permanently deletes expired offers and events every midnight to save storage!*
  - **Testimonials:** Curate parent feedback, mark them as published, or feature them on the homepage.

---

## Tech Stack

**Frontend (Client)**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Framer Motion (Animations)
- Lucide React (Icons)
- Axios

**Backend (Server)**
- Node.js & Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) & bcryptjs
- Cloudinary (Image & Video hosting)
- Node-Cron (Background cleanup tasks)

---

## Project Structure

```text
The Tiny Twirl/
├── client/                 # React Frontend
│   ├── public/             # Static assets (logo.png, etc.)
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── config/         # Site-wide configuration and copy
│   │   ├── context/        # React context (AuthContext)
│   │   ├── pages/          # Page views
│   │   │   ├── admin/      # Admin dashboard and CMS views
│   │   │   └── public/     # Public-facing views (Home, About, etc.)
│   │   └── services/       # API integration
│   └── index.html
│
└── server/                 # Node.js Backend
    ├── scripts/            # Database seeding scripts
    ├── src/
    │   ├── controllers/    # Route logic (media, offers, programs)
    │   ├── jobs/           # Automated background tasks (cleanupJobs.js)
    │   ├── middleware/     # Auth and Error handling
    │   ├── models/         # Mongoose schemas
    │   ├── routes/         # Express routes
    │   ├── services/       # Cloudinary integration
    │   └── server.js       # Entry point
    └── package.json
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URL)
- Cloudinary Account (for image/video uploads)

### 2. Environment Variables

You need to create two `.env` files.

**In the `server/` directory create a `.env` file:**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**In the `client/` directory create a `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Installation

Install dependencies for both the frontend and backend. You can run this from the root directory if you use concurrently, or open two terminals:

**Terminal 1 (Backend):**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm install
npm run dev
```

### 4. Admin Access (Seeding)
To generate the first admin user, you can run the seed script:
```bash
cd server
npm run seed
```
This will create a default admin user (`admin@thetinytwirl.com` / `admin123`).

---

## Security Notes
- The admin dashboard is strictly protected by a 24-hour JWT token. 
- If the token expires, the client immediately intercepts the 401 error, wipes the local session, and redirects to the login screen.
- Media files are processed through Multer and securely pushed directly to Cloudinary.

## Maintenance
- **Cron Jobs:** Expired events and offers are automatically purged from both the database and Cloudinary daily at midnight to maintain system hygiene.

---
*Designed & Built for The Tiny Twirl Kids Gymnastics Centre.*
