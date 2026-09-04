# 1Fi Marketplace

A full-stack implementation of the **1Fi Marketplace** section inside the Shop experience.

The project is built as part of the 1Fi SDE Intern assignment, focusing on product discovery, product details, variant selection, EMI plan selection, and checkout flow.

---

## Live Demo

🔗 **Frontend:** https://1fi-pi.vercel.app

🔗 **Backend API:** https://onefi-aeg8.onrender.com

## 🚀 Features

### Shop

- Top Brands section
- Nearby Stores section
- 1Fi Marketplace section
- Product search UI
- Mobile-first responsive design
- Bottom navigation

### 1Fi Marketplace

- Product listing
- Product images
- Product name
- MRP and selling price
- Discount information
- EMI starting amount
- Product details page

### Product Details

- Product image gallery
- Product variants
- Storage and color selection
- EMI plan selection
- Monthly EMI amount
- EMI tenure
- Interest rate
- Cashback information
- Offers and benefits
- Delivery information
- Product highlights
- Proceed with EMI CTA

### Checkout

- Selected product summary
- Selected variant
- Selected EMI plan
- Price summary
- Delivery details
- Continue with EMI CTA

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 🏗️ Architecture

The application follows a simple client-server architecture:

```text
React Frontend
      ↓
REST API
      ↓
Express.js Backend
      ↓
MongoDB
```

## Backend Run Command

```text
npm install
node src/seed.js
npm run dev
```

## Frontend Run Command

```text
cd Frontend
npm install
npm run dev
```
