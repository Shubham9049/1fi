const mongoose = require("mongoose");
require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const Product = require("./models/Product");

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    mrp: 134900,
    price: 127400,

    description:
      "iPhone 17 Pro with a premium design, powerful performance and advanced camera system.",

    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=80",
    ],

    variants: [
      {
        storage: "256GB",
        color: "Silver",
        image:
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
      },
      {
        storage: "512GB",
        color: "Silver",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      },
    ],

    emiPlans: [
      {
        monthlyAmount: 21234,
        tenureMonths: 6,
        interestRate: 0,
        cashback: 7500,
      },
      {
        monthlyAmount: 10617,
        tenureMonths: 12,
        interestRate: 0,
        cashback: 7500,
      },
      {
        monthlyAmount: 5775,
        tenureMonths: 24,
        interestRate: 10.5,
        cashback: 7500,
      },
    ],
  },

  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    mrp: 134999,
    price: 119999,

    description:
      "Samsung Galaxy S24 Ultra with a premium display, powerful processor and advanced camera system.",

    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
    ],

    variants: [
      {
        storage: "256GB",
        color: "Titanium Black",
        image:
          "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      },
      {
        storage: "512GB",
        color: "Titanium Gray",
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      },
    ],

    emiPlans: [
      {
        monthlyAmount: 20000,
        tenureMonths: 6,
        interestRate: 0,
        cashback: 5000,
      },
      {
        monthlyAmount: 10000,
        tenureMonths: 12,
        interestRate: 0,
        cashback: 5000,
      },
      {
        monthlyAmount: 5750,
        tenureMonths: 24,
        interestRate: 10.5,
        cashback: 5000,
      },
    ],
  },

  {
    name: "OnePlus 13",
    slug: "oneplus-13",
    mrp: 69999,
    price: 64999,

    description:
      "OnePlus 13 with flagship performance, a smooth display and premium design.",

    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    ],

    variants: [
      {
        storage: "256GB",
        color: "Black",
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      },
      {
        storage: "512GB",
        color: "Blue",
        image:
          "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
      },
    ],

    emiPlans: [
      {
        monthlyAmount: 10833,
        tenureMonths: 6,
        interestRate: 0,
        cashback: 3000,
      },
      {
        monthlyAmount: 5417,
        tenureMonths: 12,
        interestRate: 0,
        cashback: 3000,
      },
      {
        monthlyAmount: 3500,
        tenureMonths: 24,
        interestRate: 10.5,
        cashback: 3000,
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany({});
    console.log("Old products deleted");

    await Product.insertMany(products);
    console.log("Products inserted successfully");

    await mongoose.connection.close();
    console.log("MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedDatabase();
