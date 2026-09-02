# The Tiny Twirl

> **Little Twirl, Big Smile!**
> A joyful space where little ones move, learn, grow, and shine.

**The Tiny Twirl** is a production-ready full-stack web application developed for **The Tiny Twirl Kids Gymnastics Centre**, a gymnastics centre based in Coimbatore, Tamil Nadu, India.

The platform was designed and developed as a **real-world client project**, combining a modern public-facing website with a secure administrative portal that allows the client to manage website content without developer intervention.

 **Live Website:** [thetinytwirl.com](https://thetinytwirl.com/?utm_source=chatgpt.com)

> **Project Showcase Permission:** This project was developed for a real client, and I have received permission from the client to showcase the project for professional, interview, portfolio, and resume purposes.

---

##  Project Overview

The Tiny Twirl needed a digital platform that could effectively represent its brand online while making day-to-day website management simple for its staff.

I designed and developed a complete full-stack solution consisting of:

* A responsive public website for parents and visitors
* A secure admin dashboard for content management
* RESTful APIs for frontend-backend communication
* MongoDB-based content storage
* Cloudinary-powered media management
* JWT-based administrator authentication
* Automated cleanup of expired events and offers
* Production deployment with Render, MongoDB Atlas, Cloudinary, and a custom domain

The project focuses on **performance, maintainability, responsive design, security, and ease of content management**.

---

## Key Features

### Public Website

The public-facing website provides parents and visitors with an engaging way to explore the centre's programs, activities, and updates.

#### Programs & Classes

* Browse available gymnastics programs
* Display age ranges and program stages
* Present program descriptions in a parent-friendly format
* Responsive program layouts across devices

#### Gallery & Media

* Dynamic photo and video gallery
* Cloud-hosted media through Cloudinary
* Admin-controlled media uploads and deletion
* Optimized media presentation for different screen sizes

#### Events & Offers

* Display upcoming workshops and events
* Promote holiday camps and special activities
* Highlight active promotional offers
* Automatically remove expired content through scheduled backend jobs

#### Testimonials

* Display parent feedback and reviews
* Admin-controlled publishing
* Support for featured testimonials on the homepage

#### Responsive Experience

* Mobile-first responsive layouts
* Tablet and desktop optimization
* Smooth animations and transitions
* Mobile-specific navigation improvements

---

## Admin Portal

A dedicated administration portal allows authorized staff to manage website content without requiring direct database access or developer assistance.

### Dashboard

Provides a quick overview of the website's current content, including:

* Active programs
* Total media items
* Active offers
* Upcoming events

### Media Management

Administrators can:

* Upload photos and videos
* View uploaded media
* Delete existing media
* Manage Cloudinary-hosted assets

### Program Management

Administrators can:

* Create new programs
* Edit existing programs
* Remove programs
* Configure age ranges and stages
* Update program descriptions

### Events & Offers Management

Administrators can:

* Create events and promotional offers
* Configure schedules and expiration dates
* Update existing content
* Remove content when required

The system also includes an automated cleanup process that removes expired events and offers from the database and associated Cloudinary resources.

### Testimonial Management

Administrators can:

* Add parent testimonials
* Edit testimonials
* Publish or unpublish testimonials
* Feature selected testimonials on the homepage

---

## Application Architecture

The application follows a **client-server architecture** with a React frontend communicating with a Node.js/Express REST API.

```text
                    ┌─────────────────────────┐
                    │      Public Users       │
                    │   Parents / Visitors    │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    React + Vite Client  │
                    │   Tailwind CSS + Motion  │
                    └────────────┬────────────┘
                                 │
                              REST API
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Node.js + Express     │
                    │      REST Backend       │
                    └──────┬─────────┬────────┘
                           │         │
                 ┌─────────┘         └──────────┐
                 ▼                             ▼
        ┌─────────────────┐           ┌─────────────────┐
        │  MongoDB Atlas  │           │    Cloudinary   │
        │ Application Data│           │ Photos & Videos │
        └─────────────────┘           └─────────────────┘

                         ┌─────────────────┐
                         │   Admin Portal  │
                         │ JWT Protected   │
                         └─────────────────┘
```

---

## Tech Stack

### Frontend

| Technology           | Purpose                                |
| -------------------- | -------------------------------------- |
| **React**            | Component-based UI development         |
| **Vite**             | Frontend development and build tooling |
| **Tailwind CSS**     | Responsive styling and UI development  |
| **React Router DOM** | Client-side routing                    |
| **Framer Motion**    | Animations and interactive transitions |
| **Lucide React**     | UI icons                               |
| **Axios**            | HTTP requests and API communication    |

### Backend

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| **Node.js**    | Server-side JavaScript runtime    |
| **Express.js** | REST API development              |
| **MongoDB**    | Application database              |
| **Mongoose**   | MongoDB ODM and schema management |
| **JWT**        | Administrator authentication      |
| **bcryptjs**   | Password hashing                  |
| **Multer**     | Multipart file upload handling    |
| **Cloudinary** | Image and video storage           |
| **Node-Cron**  | Scheduled background cleanup jobs |

### Deployment & Infrastructure

| Service              | Usage                             |
| -------------------- | --------------------------------- |
| **Render**           | Production application deployment |
| **MongoDB Atlas**    | Cloud database hosting            |
| **Cloudinary**       | Media storage and delivery        |
| **Hostinger**        | Custom domain registration        |
| **thetinytwirl.com** | Production domain                 |

---

## Security

Security was considered throughout the application, particularly around the administrative system.

### Authentication

* JWT-based administrator authentication
* Passwords protected using `bcryptjs`
* Configurable token expiration
* Protected admin routes
* Unauthorized API requests return appropriate authentication errors

### Session Handling

The frontend automatically handles expired authentication sessions.

When an API request returns a `401 Unauthorized` response:

1. The client detects the expired/invalid token.
2. The local authentication state is cleared.
3. The administrator is redirected to the login page.

### Environment Variables

Sensitive configuration such as:

* Database credentials
* JWT secrets
* Cloudinary credentials
* API configuration

is managed through environment variables rather than committed to the repository.

---

## Automated Maintenance

The backend includes scheduled background jobs using **Node-Cron**.

Expired events and offers are automatically processed and removed from:

* MongoDB
* Cloudinary

This prevents obsolete content and unused media assets from accumulating over time and reduces unnecessary storage usage.

The cleanup process runs automatically on a scheduled basis without requiring manual administrator intervention.

---

## Project Structure

```text
The Tiny Twirl/
│
├── client/                         # React frontend
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── config/                 # Application/site configuration
│   │   ├── context/                # React contexts
│   │   ├── pages/
│   │   │   ├── admin/              # Admin dashboard & CMS pages
│   │   │   └── public/             # Public-facing pages
│   │   └── services/               # API service layer
│   └── index.html
│
├── server/                         # Node.js backend
│   ├── scripts/                    # Database/utility scripts
│   ├── src/
│   │   ├── controllers/            # Business logic & request handlers
│   │   ├── jobs/                   # Scheduled background jobs
│   │   ├── middleware/             # Authentication & error handling
│   │   ├── models/                 # Mongoose schemas
│   │   ├── routes/                 # Express API routes
│   │   ├── services/               # External service integrations
│   │   └── server.js               # Application entry point
│   └── package.json
│
└── README.md
```

---


## Production Deployment

The application is deployed as a production website using the following infrastructure:

```text
Frontend / Backend
       │
       ▼
    Render
       │
       ├──────────────► MongoDB Atlas
       │
       └──────────────► Cloudinary

Custom Domain
       │
       ▼
thetinytwirl.com
       │
       ▼
   Production App
```

### Production Services

* **Application Hosting:** Render
* **Database:** MongoDB Atlas
* **Media Storage:** Cloudinary
* **Domain:** Hostinger
* **Production URL:** [https://thetinytwirl.com/](https://thetinytwirl.com/?utm_source=chatgpt.com)

---

## Engineering Highlights

This project provided hands-on experience in building and maintaining a real-world application from development through production deployment.

### Full-Stack Development

Built both the frontend and backend, including:

* React component architecture
* REST API design
* Database schema design
* Authentication and authorization
* File upload handling
* Third-party service integration

### CMS Development

Designed an administrator-facing CMS so the client can independently manage:

* Programs
* Media
* Events
* Offers
* Testimonials

### Cloud Integration

Integrated Cloudinary for scalable image and video management while keeping media assets separate from the application server.

### Production Deployment

Configured and deployed the application using:

* Render
* MongoDB Atlas
* Cloudinary
* Hostinger domain

### Background Processing

Implemented scheduled cleanup jobs to automatically remove expired content and associated media resources.

### Responsive UI

Built a responsive interface optimized for:

* Mobile
* Tablet
* Desktop

---

## Project Status

**Status:** Production / Live

This project is actively deployed and was developed for a real business client.

### Live Website

[Visit The Tiny Twirl](https://thetinytwirl.com/?utm_source=chatgpt.com)

---

## Developer

**Bharanidharan M**

Full-Stack Developer

Designed and developed the application for **The Tiny Twirl Kids Gymnastics Centre**.

This project represents my experience in taking a real client requirement from **concept → design → development → deployment → production maintenance**.

---

## Disclaimer

The Tiny Twirl is a real client project.

I have received permission from the client to showcase this project as part of my professional portfolio, resume, and job interviews.

The project contains client-specific branding and content. Please respect the ownership of the client’s brand, media, and business information.

---


> **Little Twirl, Big Smile!**
> Helping little ones move, learn, grow, and shine.
