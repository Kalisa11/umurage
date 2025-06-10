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
- ✅ Artist profiles with bios and cross-linked content
- ✅ Interactive **map view** of museums and heritage sites
- ✅ Calendar view of **upcoming cultural activities**
- ✅ Community content submission and admin approval workflow
- ✅ Offline access support (for future expansion)

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
