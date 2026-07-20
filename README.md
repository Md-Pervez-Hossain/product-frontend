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

- Public home and searchable shop routes
- Dedicated product-detail routes
- Login and registration modal
- Persistent shopping bag and quantity controls
- Authenticated checkout through Order Service
- Separate user and administrator dashboards
- User-specific order history and admin access to all orders
- Admin-only catalog management, enforced again by Product Service
- Responsive ecommerce layout and mobile navigation

## Routes

| Route | Purpose |
|---|---|
| `/` | Storefront home |
| `/shop` | Searchable and sortable catalog |
| `/products/:productId` | Product details |
| `/dashboard` | Role-aware user or administrator dashboard |
| `/orders` | Redirects to `/dashboard` for older links |
| `/manage` | Redirects to `/dashboard` for older links |

## Hosting

When the frontend and Auth Gateway have different public domains, configure
`VITE_API_BASE` in the hosting platform before building. Its value should include
the gateway's `/api` prefix, for example `https://gateway.example.com/api`.

The app uses browser-history routing. Configure the static host to rewrite unknown
frontend paths such as `/shop` or `/products/:id` to `/index.html`. Static assets
and `/api` requests should not use that rewrite.
