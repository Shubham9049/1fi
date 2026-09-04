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
      "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/k/s/z/-original-imahft5npvyvjyzz.jpeg?q=90",
      "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/j/x/c/-original-imahft5npy3u7mjx.jpeg?q=90",
      "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/a/m/i/-original-imahft5n8nukhmav.jpeg?q=90",
    ],

    variants: [
      {
        storage: "256GB",
        color: "Silver",
        image:
          "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/b/j/o/-original-imahft5nm9eewyzh.jpeg?q=90",
      },
      {
        storage: "512GB",
        color: "Cosmic Orange",
        image:
          "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/n/v/a/-original-imahft5nxmyqndhf.jpeg?q=90",
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
      "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/m/o/t/-original-imahggevtcwq3zj7.jpeg?q=90",
      "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/p/j/n/-original-imahggevhhczwtrt.jpeg?q=90",
      "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/a/i/4/-original-imahggevkfva6jhh.jpeg?q=90",
    ],

    variants: [
      {
        storage: "256GB",
        color: "Titanium Black",
        image:
          "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/y/s/g/-original-imahgfmy2zgqvjmy.jpeg?q=90",
      },
      {
        storage: "512GB",
        color: "Titanium Gray",
        image:
          "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=90",
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
    name: "OnePlus N6 5G",
    slug: "oneplus-n6-5g",
    mrp: 69999,
    price: 64999,

    description:
      "OnePlus N6 5G with flagship performance, a smooth display and premium design.",

    images: [
      "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/d/x/r/n6-5g-n6-oneplus-original-imahzvfj78yecv7k.jpeg?q=90",
      "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/l/z/7/n6-5g-n6-oneplus-original-imahzvfjwggusbmf.jpeg?q=90",
      "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/l/o/0/n6-5g-n6-oneplus-original-imahzvfjb2q8uz3z.jpeg?q=90",
    ],

    variants: [
      {
        storage: "128 GB + 4 GB",
        color: "Midnight Green",
        image:
          "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/l/o/0/n6-5g-n6-oneplus-original-imahzvfjb2q8uz3z.jpeg?q=90",
      },
      {
        storage: "128 GB + 6 GB",
        color: "Fresh Mint",
        image:
          "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mobile/y/i/x/n6-5g-n6-oneplus-original-imahzvfjuqp6kz8y.jpeg?q=90",
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
