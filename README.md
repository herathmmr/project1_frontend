# Frontend for Project

This is a React + Vite frontend for the e-commerce application.

## Prerequisites

- Node.js (16+)
- Code editor (VS Code recommended)

## How to Save and Run Locally

1. Save the Project:
   ```powershell
   # Create a projects directory (if you don't have one)
   mkdir C:\Projects

   # Create project directory
   mkdir C:\Projects\project1

   # Copy entire frontend folder to your projects directory
   # Option 1: Using PowerShell (recommended)
   Copy-Item -Path "e:\Course Videos\project1\frontend" -Destination "C:\Projects\project1" -Recurse

   # Option 2: Manual copy
   # Copy the 'frontend' folder from 'e:\Course Videos\project1'
   # to 'C:\Projects\project1'
   ```

2. Install and Run:

```powershell
# Navigate to your saved project location
cd C:\Projects\project1\frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── common/     # Shared components
│   │   ├── admin/      # Admin dashboard components
│   │   └── routes/     # Route protection components
│   ├── context/        # React Context providers
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # API client and utilities
│   ├── pages/          # Page components
│   └── utils/          # Helper functions
├── public/             # Static files
└── config files        # Various configuration files
```

## Notes

- The frontend expects the backend API at `http://localhost:3003/api`.
- Tailwind is configured via `tailwind.config.cjs` and `postcss.config.cjs`.
- Auth token (JWT) is stored in `localStorage` under `token` when login is successful.

Next steps

- Run the backend (`node index.js` or `npm start` at project root) before using API features like login or product listing.
