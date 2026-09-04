const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    storage: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const emiPlanSchema = new mongoose.Schema(
  {
    monthlyAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    tenureMonths: {
      type: Number,
      required: true,
      min: 1,
    },

    interestRate: {
      type: Number,
      required: true,
      min: 0,
    },

    cashback: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    mrp: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (images) {
          return images.length > 0;
        },
        message: "At least one product image is required",
      },
    },

    variants: {
      type: [variantSchema],
      required: true,
      validate: {
        validator: function (variants) {
          return variants.length >= 2;
        },
        message: "Each product must have at least 2 variants",
      },
    },

    emiPlans: {
      type: [emiPlanSchema],
      required: true,
      validate: {
        validator: function (emiPlans) {
          return emiPlans.length > 0;
        },
        message: "At least one EMI plan is required",
      },
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
