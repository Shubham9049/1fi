const express = require("express");

const router = express.Router();

const {
  getProduct,
  getById,
  getProductBySlug,
} = require("../controllers/productController");

router.get("/", getProduct);

router.get("/slug/:slug", getProductBySlug);

router.get("/:id", getById);

module.exports = router;
