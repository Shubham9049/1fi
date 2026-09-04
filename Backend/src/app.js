const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("../src/routes/productRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoute);
app.use("/", (req, res) => {
  res.json({
    msg: "API is Healthy and Live 🚀",
  });
});
module.exports = app;
