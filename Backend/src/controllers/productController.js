const product = require("../models/Product");

const getProduct = async (req, res) => {
  try {
    const data = await product.find();
    if (!data) {
      return res.status(404).json({
        msg: "no data found",
      });
    }
    return res.status(200).json({
      msg: "data fetched successfully",
      count: data.length,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "error while fetching data",
      error: error.message,
    });
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await product.findById(id);
    if (!data) {
      return res.status(200).json({
        msg: "product not found",
      });
    }
    return res.status(200).json({
      msg: "product fetched by Id",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "error while fetch data",
      error: error.message,
    });
  }
};
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await product.findOne({ slug });
    if (!data) {
      return res.status(404).json({
        msg: "data not found",
      });
    }
    return res.status(200).json({
      msg: "fetch data by slug",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "error while fetch data",
      error: error.message,
    });
  }
};
module.exports = { getProduct, getById, getProductBySlug };
