# Umurage – A Digital Platform for Rwandan Cultural Preservation

**Umurage** is a web-based application designed to preserve, promote, and celebrate Rwandan indigenous culture through interactive storytelling, multimedia content, and community engagement. The platform allows users to explore traditional music, artwork, oral history, and upcoming cultural events, all in one accessible, dynamic space.

---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend/API**: Node.js, Express, PostgreSQL
- **Database**: [PostgreSQL / Supabase](https://www.supabase.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **UI/UX Design**: [Figma](https://figma.com)
- **Maps**: [Leaflet.js](https://leafletjs.com/)
- **Version Control**: Git & GitHub
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🌍 Features

- ✅ Browse and search traditional Rwandan **music**, **art**, **oral stories**, and **historical records**
- ✅ Contributor profiles with bios and cross-linked content
- ✅ Interactive **map view** of museums and heritage sites
- ✅ View of **upcoming cultural activities**
- ✅ Community content submission and admin approval workflow
- ✅ Audio player with progress bar and volume control for music
- ✅ Related content sections

## 📦 Folder Structure

```bash
.
├── client/            # Frontend Next.js application
│   ├── public/        # Static assets
│   ├── src/
│   │   ├── app/           # Next.js app directory (routes)
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utility functions and shared logic
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   ├── .next/        # Next.js build output
│   ├── next.config.ts # Next.js configuration
│   ├── tailwind.config.ts # Tailwind CSS configuration
│   └── tsconfig.json # TypeScript configuration
│
├── server/           # Backend Express application
│   ├── src/
│   │   ├── controllers/ # Controller functions
│   │   ├── db/          # Database related code
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   └── index.ts     # Entry point
│   ├── drizzle/     # Database migrations and schema
│   ├── drizzle.config.ts # Drizzle ORM configuration
│   └── tsconfig.json # TypeScript configuration
│
├── .env             # Environment variables
└── package.json     # Project dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm** (recommended)
- **PostgreSQL** database (local or cloud-based like Supabase)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd umurage
   ```

2. **Install dependencies for both client and server**

   ```bash
   # Install client dependencies
   cd client
   npm install
   # or with pnpm
   pnpm install

   # Install server dependencies
   cd ../server
   npm install
   # or with pnpm
   pnpm install
   ```

3. **Set up environment variables**

   **For the Client** (`client/.env.local`):

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

   **For the Server** (`server/.env`):

   ```env
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret_key
   PORT=3001
   NODE_ENV=development
   ```

4. **Set up the database**

   ```bash
   cd server
   # Generate database migrations
   npm run generate
   # Run migrations
   npm run migrate
   ```

5. **Run the development servers**

   **Terminal 1 - Start the backend server:**

   ```bash
   cd server
   npm run dev
   ```

   The server will start on `http://localhost:3001`

   **Terminal 2 - Start the frontend client:**

   ```bash
   cd client
   npm run dev
   ```

   The client will start on `http://localhost:3000`

### Available Scripts

**Client (Next.js):**

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Server (Express):**

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript
- `npm run start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run generate` - Generate new migrations
- `npm run studio` - Open Drizzle Studio for database management
