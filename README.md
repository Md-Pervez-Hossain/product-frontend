# Product Frontend

React and Tailwind CSS frontend for the multi-service deployment learning project.

## Architecture

The browser talks to one API entry point. The Auth Gateway handles authentication and forwards product and order requests to their dedicated services.

```text
React frontend
      |
      v
Auth Gateway
  |       |
  v       v
Product  Order
Service  Service
```

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

The Vite development server proxies `/api` to `http://localhost:3000`. A hosted environment can provide `VITE_API_BASE` through its environment settings when the gateway uses a different public URL. All `.env` files are ignored by Git.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run preview  # preview production output
```

## Features

- Login and registration
- JWT session persistence
- Product creation, listing, and deletion
- Order creation using MongoDB product identifiers
- User-specific order history
- Responsive Tailwind CSS interface
