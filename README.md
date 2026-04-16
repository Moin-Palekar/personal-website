# moinpalekar.com

A production-grade full-stack personal website with a blog system, JWT authentication, and a contact/messaging system. Built end-to-end from scratch — frontend, backend, database, deployment, and custom domain.

**Live:** [moinpalekar.com](https://moinpalekar.com)

---

## Tech Stack

**Frontend:** Next.js 16, TypeScript, Tailwind CSS, deployed on Vercel  
**Backend:** Node.js, Express.js, deployed on Render  
**Database:** MongoDB with Mongoose ODM  
**Auth:** JWT (JSON Web Tokens), bcryptjs for password hashing  
**Domain:** moinpalekar.com via Cloudflare DNS

---

## Architecture

```
moinpalekar.com (Vercel)          api.render.com (Render)
┌─────────────────────┐           ┌──────────────────────┐
│   Next.js Frontend  │ ◄──────► │   Express Backend    │
│                     │   HTTPS   │                      │
│  - App Router       │           │  - REST API          │
│  - Server Components│           │  - Auth Middleware   │
│  - Client Components│           │  - JWT Verification  │
└─────────────────────┘           └──────────┬───────────┘
                                             │
                                   ┌─────────▼───────────┐
                                   │   MongoDB Atlas     │
                                   │                     │
                                   │  - blogs            │
                                   │  - users            │
                                   │  - messages         │
                                   └─────────────────────┘
```

---

## Features

**Blog System**
- Full CRUD — create, read, update, delete blog posts
- Dynamic routing with MongoDB `_id` as slug
- Server-side data fetching with no-cache for live data

**Authentication**
- User registration with bcrypt password hashing
- JWT login with 7-day token expiry
- Auth middleware protecting write routes (POST, PUT, DELETE)
- Token stored in localStorage, sent via Authorization header

**Messaging / Contact**
- Public contact form — any visitor can send a message
- Messages stored in MongoDB with sender name, email, content, timestamp, and user agent
- Private `/messages` dashboard — only accessible when logged in with a valid JWT
- Email format validation on the backend via Mongoose regex

**Deployment**
- Frontend auto-deploys on every push to `main` via Vercel
- Backend auto-deploys on every push to `main` via Render
- Environment variables managed separately on each platform — no secrets in the repo
- Custom domain connected via Cloudflare DNS with automatic SSL

---

## Running Locally

**Prerequisites:** Node.js, a MongoDB Atlas cluster

**1. Clone the repo**
```bash
git clone https://github.com/Moin-Palekar/personal-website.git
cd personal-website
```

**2. Install frontend dependencies**
```bash
npm install
```

**3. Install backend dependencies**
```bash
cd backend
npm install
```

**4. Set up environment variables**

Create `backend/.env`:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Create `.env.local` in the root:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**5. Start both servers**

Terminal 1 (backend):
```bash
cd backend
node server.js
```

Terminal 2 (frontend):
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## API Routes

| Method | Route | Auth Required | Description |
|--------|-------|---------------|-------------|
| GET | `/blogs` | No | Fetch all blogs |
| GET | `/blogs/:id` | No | Fetch single blog |
| POST | `/blogs` | Yes | Create blog |
| PUT | `/blogs/:id` | Yes | Update blog |
| DELETE | `/blogs/:id` | Yes | Delete blog |
| POST | `/auth/register` | No | Register user |
| POST | `/auth/login` | No | Login, returns JWT |
| POST | `/messages` | No | Send a message |
| GET | `/messages` | Yes | View all messages |

---

## Project Structure

```
personal-website/
├── app/                    # Next.js App Router
│   ├── blog/               # Blog list, post, new post pages
│   ├── contact/            # Contact form
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── messages/           # Private messages dashboard
│   ├── projects/           # Projects pages
│   ├── layout.tsx          # Global layout with nav and footer
│   └── page.tsx            # Homepage
├── backend/
│   ├── middleware/
│   │   └── auth.js         # JWT verification middleware
│   ├── models/
│   │   ├── Blog.js         # Mongoose blog schema
│   │   ├── User.js         # Mongoose user schema with bcrypt hook
│   │   └── Message.js      # Mongoose message schema
│   ├── routes/
│   │   ├── blogs.js        # Blog CRUD routes
│   │   ├── auth.js         # Register and login routes
│   │   └── messages.js     # Message routes
│   ├── db.js               # MongoDB connection
│   └── server.js           # Express app entry point
└── public/                 # Static assets
```

---

Built by [Moin Palekar](https://moinpalekar.com)
