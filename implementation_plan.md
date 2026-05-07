# Eco Pulse: Contest Requirements Alignment Plan

This plan details how to transform the existing Eco Pulse project into a production-ready, AI-powered application that fulfills all STN Contest requirements.

## User Review Required

> [!IMPORTANT]
> The contest mandates **Zustand or Redux Toolkit** for state management and **React Hook Form** for forms. The current project uses `@tanstack/react-form`. I recommend switching to React Hook Form to strictly follow the "Mandatory" tech stack.

> [!WARNING]
> You need at least **4 AI features** using a real API (Gemini/OpenAI). I have proposed 4 specific features integrated into the Eco Pulse context below.

## Open Questions
1. **Backend Repo**: Do you have the `Node.js + Express + TS` backend repository ready, or should I also provide a plan for the backend implementation?
2. **AI Provider**: Which AI API do you prefer? (Google Gemini is recommended for ease of use and free tier).

---

## Proposed Changes

### 1. Foundation & Tech Stack [MODIFY]
- **State Management**: Install `zustand`. Implement a global store for user session and theme persistence.
- **Form Handling**: Replace `@tanstack/react-form` with `react-hook-form` + `@hookform/resolvers` (for Zod).
- **Design System**: Refine `globals.css` to ensure exactly 3 primary colors + neutrals and consistent border-radius (currently `--radius` is set to `0rem`, should be made consistent).

### 2. Home Page & Public Layout [MODIFY]
- **Navbar**:
    - Ensure 4 routes for public (Home, Ideas, About, Blog).
    - Ensure 6 routes for logged-in (Home, Ideas, My Dashboard, Create Idea, AI Assistant, Profile).
    - Add a premium profile dropdown menu.
- **Hero Section**: 
    - Adjust height to 60-70vh.
    - Add interactive elements (e.g., a scrolling ticker of "Success Stories" or a CTA with hover animation).
- **New Sections**: Add missing sections to reach 8 total (e.g., Statistics, FAQ, Testimonials, Newsletter, Call to Action).

### 3. Core Listing & Details Page [MODIFY]
- **Idea Cards**: Standardize height/width. Implement Skeleton loaders using `shadcn/skeleton`.
- **Details Page**: 
    - Add "Specifications" section for eco-impact metrics.
    - Add "Reviews/Ratings" section.
    - Add "Related Ideas" carousel at the bottom.

### 4. Explore/Listing Page [MODIFY]
- Implement **Debounced Search** using `use-debounce`.
- Add **2+ Filters** (e.g., Category, Price Range/Funding Goal).
- Add **Sorting** (Latest, Most Voted, Trending).
- Implement **Pagination** (shadcn pagination component).

### 5. Role-Based Dashboard [MODIFY]
- **Roles**: Implement `ADMIN`, `MEMBER`, and `MANAGER` views.
- **Sidebar**:
    - User: Dashboard, My Ideas, My Votes, Watchlist, Purchases.
    - Admin: Overview, Manage Users, Manage Ideas, Categories, Payments, AI Insights.
- **Visuals**:
    - Add **Charts** (Bar/Line) using `recharts` reflecting real data.
    - Use **Data Tables** (shadcn table) with filtering and pagination.
- **Profile**: Create an editable profile page with image upload and personal info.

### 6. AI Features (Minimum 4) [NEW]
1. **AI Idea Generator**: Help users brainstorm eco-friendly ideas based on a niche (e.g., "Plastic waste").
2. **AI Impact Analyzer**: Analyze an idea's description and provide a "Sustainability Score" (Structured JSON output).
3. **AI Chat Assistant**: A context-aware chatbot for sustainability advice and platform navigation.
4. **AI Smart Recommendations**: Suggest ideas to users based on their "Watchlist" and "Voted" history.

### 7. Advanced Engineering [MODIFY]
- **Frontend**: 
    - Implement `Suspense` for all data-fetching components.
    - Add **Optimistic UI** for voting and watchlist actions.
    - Implement **Live Notifications** (Sonner + real-time polling or WebSockets).
- **Backend**:
    - Implement **Rate Limiting**.
    - Add **Winston/Pino** logging.
    - Add **Redis** or in-memory caching for trending ideas.

---

## Verification Plan

### Automated Tests
- `npm run lint` to ensure code quality.
- Verify AI API responses return valid JSON.

### Manual Verification
- Check responsiveness on Mobile, Tablet, and Desktop.
- Verify Dark mode contrast in all dashboard sections.
- Test Role-based access control (RBAC) by logging in as different users.
