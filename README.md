# MOHOTHA — Wedding Invitation SaaS Platform

A Next.js full-stack project for building and selling premium wedding invitation templates.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Folder Structure Guide

```
mohotha_project/
│
│  ← ⚙️  CONFIG FILES (Don't touch these unless you know what they do)
├── next.config.ts          Next.js settings
├── prisma.config.ts        Database connection settings
├── tsconfig.json           TypeScript settings
├── postcss.config.mjs      CSS settings
├── package.json            Project dependencies list
│
│  ← 🗄️  DATABASE
├── prisma/
│   ├── schema.prisma       Defines the database table structure (columns, types)
│   └── wedding_invitation.db  The actual local database file (auto-generated)
│
│  ← 🔌  DATABASE CONNECTION HELPER
├── lib/
│   └── prisma.ts           Creates and shares one database connection across the app
│
│  ← 🖥️  PAGES & ROUTES (Each folder = one URL on the website)
├── app/
│   ├── page.tsx            → mohotha.com/               (MOHOTHA main landing page)
│   ├── layout.tsx          → The base HTML wrapper for all pages
│   ├── globals.css         → Global CSS styles
│   │
│   │  ← 🔒  ADMIN DASHBOARDS (Private — for clients to see their RSVPs)
├── app/admin/
│   └── wedding-invitation/
│       └── page.tsx        → mohotha.com/admin/wedding-invitation (RSVP Dashboard)
│   │
│   │  ← ⚙️  SERVER ACTIONS (Backend logic — saves/fetches data from the database)
│   ├── actions/
│   │   └── wedding-invitation/
│   │       └── rsvp.ts     → submitRsvp() and getAllRsvps() functions
│   │
│   │  ← 📄  TEMPLATE ROUTES (Public pages for guests to visit)
│   ├── wedding-invitation/
│   │   └── page.tsx        → mohotha.com/wedding-invitation
│   ├── RoyalHeritage/
│   │   └── page.tsx        → mohotha.com/RoyalHeritage
│   └── demo/
│       └── page.tsx        → mohotha.com/demo
│
│  ← 🎨  COMPONENTS (All the visual design pieces)
├── components/
│   ├── ui/                 Reusable small pieces (Button, Section, etc.)
│   ├── layout/             Header, Footer, and layout pieces
│   ├── sections/           Big sections used across multiple pages
│   └── templates/          ← THE MAIN TEMPLATES (One folder per template)
│       ├── wedding-invitation/   ← Template 1: Wedding Invitation
│       ├── ocean-breeze/         ← Template 2: Ocean Breeze
│       └── RoyalHeritage/           ← Template 3: (next template)
│
│  ← 🖼️  STATIC FILES (Images, music, icons)
└── public/
    ├── images/             All photos used on the website
    ├── music/              Background music files
    └── *.svg               Icon files
```

---

## 📋 Key URLs

| URL | What it is |
|---|---|
| `localhost:3000` | MOHOTHA Main Landing Page |
| `localhost:3000/wedding-invitation` | Wedding Invitation Template (public) |
| `localhost:3000/admin/wedding-invitation` | RSVP Dashboard (for the client couple) |

---

## 🗄️ Database Commands

```bash
# Create / update the database after changing schema.prisma
npx prisma db push

# Re-generate the Prisma client after schema changes
npx prisma generate

# Open a visual browser to view your database tables
npx prisma studio
```

---

## 🚀 Deploying to Vercel (When Ready for Real Clients)

1. Create a free **Supabase** account → create a project → copy the PostgreSQL URL.
2. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
3. In `prisma.config.ts`, replace the `file:...` URL with your Supabase PostgreSQL URL.
4. Push to GitHub → connect to Vercel → add the Database URL as an Environment Variable.
5. Done! ✅
