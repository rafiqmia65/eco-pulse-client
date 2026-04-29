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

## 📖 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Pages & Routes](#-pages--routes)
- [User Roles](#-user-roles)
- [Admin Dashboard](#-admin-dashboard)
- [Member Dashboard](#-member-dashboard)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌍 Overview

**EcoPulse** is a community-driven web platform designed for environmental enthusiasts to share, discuss, and vote on eco-friendly ideas. The application provides a full-featured experience for both regular members and administrators, with dedicated dashboards, rich content editing, and powerful idea management tools.

The client is built with **Next.js 16 App Router**, leveraging **server components**, **TanStack Query** for data fetching, and **shadcn/ui** for a polished, accessible UI.

---

## 🚀 Project Links

- **Frontend Live URL**: [https://eco-pulse-client.vercel.app/](https://eco-pulse-client.vercel.app/)
- **Backend Live URL**: [https://eco-pulse-server.vercel.app/](https://eco-pulse-server.vercel.app/)
- **Database Schema**: [https://dbdiagram.io/d/Eco-Pulse](https://dbdiagram.io/d/Eco-Pulse)

---

## ✨ Features

### General
- 🌐 Public idea discovery feed with filtering and search
- 📝 Rich text editor (Tiptap) for idea submission with formatting, images, tables, and more
- 🔐 JWT-based authentication with protected routes
- 🌙 Light/Dark theme toggle
- 📱 Fully responsive design across all screen sizes
- ⚡ Optimistic updates and real-time cache invalidation via TanStack Query

### Member Features
- Submit new eco-friendly ideas with rich content
- Vote (upvote/downvote) on community ideas
- Add ideas to a personal watchlist
- Purchase premium/full-access ideas
- View payment history
- Manage own profile and account settings

### Admin Features
- Comprehensive admin dashboard with analytics
- User management — view, promote to admin, block, unblock
- Idea moderation — approve, reject with feedback
- Category management
- Payment oversight

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **UI Library** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **State / Data Fetching** | [TanStack Query 5](https://tanstack.com/query) |
| **Forms** | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev/) |
| **Rich Text Editor** | [Tiptap](https://tiptap.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Date Utilities** | [date-fns](https://date-fns.org/) |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Auth** | JWT via [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) |
| **Env Validation** | [@t3-oss/env-nextjs](https://env.t3.gg/) |

---

## 📁 Project Structure

```
eco-pulse-client/
├── app/                          # Next.js App Router
│   ├── (PublicLayout)/           # Public-facing pages
│   │   ├── (Auth)/
│   │   │   ├── login/            # Login page
│   │   │   └── register/         # Registration page
│   │   ├── ideas/                # Browse all ideas
│   │   ├── about/                # About page
│   │   └── blog/                 # Blog page
│   ├── (DashboardLayout)/        # Authenticated dashboard
│   │   ├── admin/                # Admin-only pages
│   │   │   ├── users/            # User management
│   │   │   ├── all-ideas/        # Idea moderation
│   │   │   ├── categories/       # Category management
│   │   │   └── payments/         # Payment overview
│   │   └── dashboard/            # Member dashboard
│   │       ├── my-ideas/         # Member's own ideas
│   │       ├── ideas/            # Browse ideas (dashboard)
│   │       ├── ideas-create/     # Create new idea
│   │       ├── idea-details/     # Idea detail view
│   │       ├── purchased-ideas/  # Purchased content
│   │       ├── watchlist-ideas/  # Saved/watchlisted ideas
│   │       ├── my-votes-ideas/   # Voted ideas
│   │       └── my-payments/      # Payment history
│   └── (commonLayout)/           # Shared layout pages
├── components/
│   ├── modules/                  # Feature-specific components
│   │   └── Dashboard/
│   │       ├── admin/            # Admin dashboard components
│   │       └── member/           # Member dashboard components
│   ├── shared/                   # Reusable shared components
│   └── ui/                       # shadcn/ui primitives
├── services/                     # API service layer (Axios)
│   └── admin/                    # Admin-specific services
├── types/                        # Global TypeScript types
│   ├── api.types.ts              # Base API response types
│   └── adminTypes/               # Admin module types
├── constants/                    # App-wide constants
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries (axios config, etc.)
├── providers/                    # Context providers (QueryClient, Theme)
├── zod/                          # Zod validation schemas
└── public/                       # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.x
- **pnpm** >= 8.x (recommended) or npm/yarn

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/rafiqmia65/eco-pulse-client.git
cd eco-pulse-client
```

2. **Install dependencies:**

```bash
pnpm install
# or
npm install
```

3. **Set up environment variables:**

```bash
cp .env.example .env.local
```

Fill in your environment variables (see [Environment Variables](#-environment-variables)).

4. **Run the development server:**

```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root. Use `.env.example` as a reference:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# Authentication
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret_key

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

> ⚠️ **Never commit `.env.local` to version control.** It is already listed in `.gitignore`.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the development server with hot reload |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint for code quality checks |

---

## 🗺 Pages & Routes

### Public Routes

| Route | Description |
|---|---|
| `/` | Homepage — featured ideas and hero section |
| `/ideas` | Browse all community ideas |
| `/about` | About EcoPulse |
| `/blog` | Blog articles |
| `/login` | User login |
| `/register` | User registration |

### Member Dashboard Routes (Protected)

| Route | Description |
|---|---|
| `/dashboard` | Member overview |
| `/dashboard/ideas` | Browse ideas within dashboard |
| `/dashboard/my-ideas` | Manage your own submitted ideas |
| `/dashboard/ideas-create` | Submit a new idea |
| `/dashboard/idea-details/:id` | View full idea details |
| `/dashboard/purchased-ideas` | Ideas you have purchased |
| `/dashboard/watchlist-ideas` | Your watchlisted ideas |
| `/dashboard/my-votes-ideas` | Ideas you have voted on |
| `/dashboard/my-payments` | Your payment history |

### Admin Dashboard Routes (Admin Only)

| Route | Description |
|---|---|
| `/admin` | Admin overview & analytics |
| `/admin/users` | User management (view, block, promote) |
| `/admin/all-ideas` | Moderate all submitted ideas |
| `/admin/categories` | Manage idea categories |
| `/admin/payments` | View all platform payments |

---

## 👥 User Roles

| Role | Description |
|---|---|
| **MEMBER** | Default role for all registered users. Can submit, vote, purchase, and manage ideas. |
| **ADMIN** | Full platform access including user moderation, idea approval/rejection, and category management. |

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
