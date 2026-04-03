# ShopHub E-Commerce Web Application

![ShopHub Logo](client/public/shophub-logo.png)

## Overview

**ShopHub** is a modern, full-stack e-commerce web application designed to provide a seamless online shopping experience. It features a responsive product catalog, filtering, cart management, and secure authentication with both user and admin functionalities.  

**Tech Stack:**  
- **Frontend:** Next.js 16, React 19, Tailwind CSS, TypeScript  
- **Backend:** Express 5, MongoDB via mongoose  
- **Authentication:** JWT-based auth with protected routes  
- **Key Features:** Product browsing, filtering, cart operations, order management, user login/register, admin dashboard  

---

## Repository Structure

### Client (`client/`)
- `app/` – Next.js routes and root layout  
- `components/` – UI components: navigation, product cards, hero section, footer, filters  
- `hooks/` – Reusable React hooks  
- `lib/` – API client, auth context, cart context, utilities  
- `public/` – Static assets (images, favicon)  
- `styles/` – Global CSS and Tailwind setup  

### Server (`server/`)
- `config/` – MongoDB connection logic  
- `controllers/` – Business logic for auth, products, cart, and orders  
- `middleware/` – Error handling and auth protection  
- `models/` – Mongoose schemas for `User`, `Product`, `Cart`, `Order`  
- `routes/` – REST API endpoints  
- `server.js` – Express app entry point  

---

## Features

### Frontend
- Product catalog with search functionality  
- Category and price filters  
- Featured products on homepage  
- Cart operations: add, remove, clear  
- User authentication (login/register)  
- Branding: Browser title & favicon reflect ShopHub  

### Backend
- REST API endpoints: `/api/auth`, `/api/products`, `/api/cart`, `/api/orders`  
- MongoDB connection with environment variable `MONGO_URI`  
- JWT-based secure authentication  
- Product CRUD and search/filter support  

---

## Implementation Highlights

### Metadata & Favicon
- Managed in `client/app/layout.tsx`  
- Title: `"ShopHub - Your One-Stop E-commerce Store"`  
- Favicon paths: `/shophub-logo.png`, `/shophub-logo.svg`  
- Apple icon fallback: `/shophub-logo.png`  

### API Client
- Located in `client/lib/api.ts`  
- Handles base URL, JSON headers, and token injection  
- Supports `/auth`, `/products`, `/cart`, `/orders` endpoints  

### Auth Context
- Located in `client/lib/auth-context.tsx`  
- Manages user login, registration, logout, and token-based session persistence  

### Database
- MongoDB connection via `server/config/db.js` using `mongoose.connect(process.env.MONGO_URI)`  

---

## Fix From Zero to Completion

**Goal:** Replace old favicon (`v0`) and ensure website title reflects ShopHub brand  

**Steps Taken:**  
1. Inspected `client/app/layout.tsx`  
2. Verified title metadata  
3. Updated `metadata.icons` to point to `/shophub-logo.png` & `/shophub-logo.svg`  
4. Added new logo assets in `client/public/`  
5. Confirmed favicon now correctly displays in browser  

**Bug Encountered:** Old favicon still showing  

**Resolution:** Updated metadata and ensured asset paths are correct  

---

## Technologies Used

- **Frontend:** next, react, react-dom, tailwindcss, lucide-react, next-themes  
- **UI & State:** react-hook-form, sonner, cmdk, @radix-ui  
- **Backend:** express, mongoose, cors, dotenv, bcrypt, jsonwebtoken  

---

## Running the Project

### Server
```bash
cd server
npm install
npm run dev
