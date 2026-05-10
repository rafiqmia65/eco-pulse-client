<div align="center">

# 🌱 EcoPulse — Client

**A modern, full-featured platform for sharing, discovering, and voting on eco-friendly ideas.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)

</div>

---

<div align="center">

### 🧭 Navigation Guide

| 🚀 **Project Overview**              | 🏗 **Development**                      | 📊 **Dashboards**                     |
| :----------------------------------- | :-------------------------------------- | :------------------------------------ |
| [🌍 Overview](#-overview)            | [🛠 Tech Stack](#-tech-stack)           | [👥 User Roles](#-user-roles)         |
| [🚀 Project Links](#-project-links)  | [📁 Structure](#-project-structure)     | [🛡 Admin Panel](#-admin-dashboard)   |
| [🔐 Demo Logins](#-demo-credentials) | [⚙️ Getting Started](#-getting-started) | [💡 Member Panel](#-member-dashboard) |
| [✨ Core Features](#-features)       | [📜 Scripts](#-available-scripts)       | [🗺 Routes](#-pages--routes)          |

</div>

<br/>

## 🌍 Overview

**EcoPulse** is a cutting-edge, community-driven platform designed for environmental innovators. It provides a robust ecosystem for sharing, discussing, and monetizing sustainable ideas. Leveraging **Google Gemini AI**, EcoPulse helps users transform simple concepts into professional-grade proposals and provides deep data insights into environmental impact.

Built with a focus on **Visual Excellence** and **High Performance**, the application features:

- **AI-Powered Workflows**: Automated content generation and smart recommendations.
- **Advanced Architecture**: Next.js 16 (App Router) with Server Components and Streaming.
- **Premium Design System**: A sleek, modern UI with support for both vibrant light and high-contrast dark modes.

---

## 🚀 Project Links

- **Frontend Live URL**: [https://eco-pulse-client.vercel.app/](https://eco-pulse-client.vercel.app/)
- **Backend Live URL**: [https://eco-pulse-server.vercel.app/](https://eco-pulse-server.vercel.app/)
- **Database Schema**: [https://dbdiagram.io/d/Eco-Pulse](https://dbdiagram.io/d/Eco-Pulse)

---

## 🔐 Demo Credentials

To explore the platform's role-based features instantly, use the following credentials:

| Role       | Email             | Password    |
| ---------- | ----------------- | ----------- |
| **Admin**  | `admin@gmail.com` | `Admin1234` |
| **Member** | `user@gmail.com`  | `User1234`  |

---

## ✨ Features

### 🧠 AI-Powered Intelligence (Real API - Gemini)

- **AI Eco Consultant**: Transforms a basic topic into a fully fleshed-out idea proposal (Title, Problem, Solution, Slug).
- **AI Smart Recommendations**: Dynamically suggests ideas based on user voting history and watchlists.
- **EcoPulse AI Chat Assistant**: A context-aware floating chatbot providing instant sustainability advice.
- **AI Data Analyzer**: Professional impact scoring and sentiment analysis for all community ideas.

### ⚡ Advanced Engineering

- **Next.js 16 (App Router)**: Utilizing server components and suspense for optimized performance.
- **Optimistic UI**: Real-time feedback for votes and engagement actions.
- **Zustand State Management**: Modular state architecture with persistence for AI and Dashboard features.
- **TanStack Query (v5)**: Advanced data fetching, caching, and background synchronization.

### 🎨 Design & UX

- **Monochromatic Premium Theme**: A sophisticated design language using HSL-tailored colors.
- **Dynamic Animations**: Smooth transitions powered by Framer Motion.
- **Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.
- **Skeleton Loaders**: Polished loading states for every data-heavy component.

---

## 🛠 Tech Stack

| Category          | Technology                                                                          |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Framework**     | [Next.js 16](https://nextjs.org/) (App Router)                                      |
| **Language**      | [TypeScript 5](https://www.typescriptlang.org/)                                     |
| **AI SDK**        | [Google Generative AI (Gemini)](https://ai.google.dev/)                             |
| **Styling**       | [Tailwind CSS 4](https://tailwindcss.com/)                                          |
| **State**         | [Zustand 5](https://github.com/pmndrs/zustand)                                      |
| **Data Fetching** | [TanStack Query 5](https://tanstack.com/query)                                      |
| **Form Logic**    | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev/)                |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/)                                                 |
| **Visuals**       | [Framer Motion](https://www.framer.com/motion/) + [Recharts](https://recharts.org/) |

---

## 📁 Project Structure

```
eco-pulse-client/
├── app/                          # Next.js App Router (16.2.2)
├── components/
│   ├── modules/                  # Feature-specific modules (Dashboard, Auth)
│   ├── shared/                   # Global components (AI Chat, Navbar, Footer)
│   └── ui/                       # shadcn/ui base primitives
├── store/                        # Zustand global state management
├── services/                     # Server actions and API service layer
├── hooks/                        # Custom React hooks (AI, UI, Auth)
├── lib/                          # Utils (Axios, AI error handling)
├── zod/                          # Validation schemas
└── env.ts                        # T3-style Environment validation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 8.x

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rafiqmia65/eco-pulse-client.git
   cd eco-pulse-client
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root. The project uses `@t3-oss/env-nextjs` for strict runtime validation.

```env
# Server Side
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000

# Client Side (Public)
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

> ⚠️ **Never commit `.env.local` to version control.** It is already listed in `.gitignore`.

---

## 📜 Available Scripts

| Script       | Description                                  |
| ------------ | -------------------------------------------- |
| `pnpm dev`   | Start the development server with hot reload |
| `pnpm build` | Create an optimized production build         |
| `pnpm start` | Start the production server                  |
| `pnpm lint`  | Run ESLint for code quality checks           |

---

## 🗺 Pages & Routes

### Public Routes

| Route       | Description                                |
| ----------- | ------------------------------------------ |
| `/`         | Homepage — featured ideas and hero section |
| `/ideas`    | Browse all community ideas                 |
| `/about`    | About EcoPulse                             |
| `/blog`     | Blog articles                              |
| `/login`    | User login                                 |
| `/register` | User registration                          |

### Member Dashboard Routes (Protected)

| Route                         | Description                     |
| ----------------------------- | ------------------------------- |
| `/dashboard`                  | Member overview                 |
| `/dashboard/ideas`            | Browse ideas within dashboard   |
| `/dashboard/my-ideas`         | Manage your own submitted ideas |
| `/dashboard/ideas-create`     | Submit a new idea               |
| `/dashboard/idea-details/:id` | View full idea details          |
| `/dashboard/purchased-ideas`  | Ideas you have purchased        |
| `/dashboard/watchlist-ideas`  | Your watchlisted ideas          |
| `/dashboard/my-votes-ideas`   | Ideas you have voted on         |
| `/dashboard/my-payments`      | Your payment history            |

### Admin Dashboard Routes (Admin Only)

| Route               | Description                            |
| ------------------- | -------------------------------------- |
| `/admin`            | Admin overview & analytics             |
| `/admin/users`      | User management (view, block, promote) |
| `/admin/all-ideas`  | Moderate all submitted ideas           |
| `/admin/categories` | Manage idea categories                 |
| `/admin/payments`   | View all platform payments             |

---

## 👥 User Roles

| Role       | Description                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------- |
| **MEMBER** | Default role for all registered users. Can submit, vote, purchase, and manage ideas.              |
| **ADMIN**  | Full platform access including user moderation, idea approval/rejection, and category management. |

---

## 🛡 Admin Dashboard

The admin dashboard provides full control over the EcoPulse platform:

### User Management (`/admin/users`)

- View all registered users with stats (total, active, blocked, admins, members)
- Search and filter by name/email, role, and status
- **Make Admin** — promote a member to admin
- **Block User** — restrict a user's access
- **Unblock User** — restore a blocked user's access
- **See Details** — view full user profile in a modal

### Idea Moderation (`/admin/all-ideas`)

- Review all submitted ideas
- **Approve** ideas to publish them to the platform
- **Reject** ideas with written feedback
- Monitor idea statuses: Draft, Pending, Approved, Rejected

### Category Management (`/admin/categories`)

- Create, update, and delete idea categories

---

## 💡 Member Dashboard

### My Ideas

- View all submitted ideas with statuses
- Edit or delete draft ideas
- Track approval status

### Create Idea

- Rich text editor (Tiptap) with formatting, image upload, tables, and task lists
- Set idea visibility (Free/Paid)
- Assign categories

### Watchlist & Votes

- Track ideas you've saved or voted on

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `refactor:` — Code refactoring
- `style:` — Styling changes
- `docs:` — Documentation updates
- `chore:` — Maintenance tasks

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ by **Md Rafiq Mia**

[![GitHub](https://img.shields.io/badge/GitHub-rafiqmia65-181717?logo=github)](https://github.com/rafiqmia65)

</div>
