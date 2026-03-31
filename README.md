# Online Auction Platform (MERN Stack)

## Project Overview
A complete MERN stack application that allows users to register, log in, view auction items, and place bids on those items in real-time. Created for a portfolio.

## Features
- User registration and basic login
- Browse a catalog of auction items
- View details such as starting price, current highest bid, and highest bidder
- Place competitive bids on items
- Auto-seeded sample data

## Tech Stack (MERN)
- **MongoDB**: Database for storing user credentials and auction items.
- **Express.js**: Backend framework for building RESTful APIs.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime environment.

## Folder Structure
```
online-auction-platform/
│── client/                 (React frontend)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemList.js
│   │   │   ├── ItemCard.js
│   │   │   ├── BidForm.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   │   ├── index.html
│   ├── package.json
│
│── server/                 (Node + Express backend)
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   ├── config/
│   │   ├── db.js
│   ├── server.js
│   ├── package.json
│
│── README.md
```

## Setup Instructions

### 1. MongoDB Setup
Ensure you have MongoDB running locally on `mongodb://127.0.0.1:27017`. The backend will automatically create the `auctionDB` database and seed sample items.

### 2. Backend Setup
```bash
cd server
npm install
npm start
```
*Server runs on port 5000.*

### 3. Frontend Setup
```bash
cd client
npm install
npm start
```
*Frontend runs on port 3000.*

## Future Improvements
- Implement JWT for fully secure authentication
- Add real-time bidirectional updates via WebSockets (Socket.io)
- Implement an admin dashboard to create/remove items
- Image upload support for items
