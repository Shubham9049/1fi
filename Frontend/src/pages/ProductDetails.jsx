import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProductBySlug } from "../services/productApi";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmi, setSelectedEmi] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await getProductBySlug(slug);

        const productData = response.data;

        setProduct(productData);

        // Default variant
        setSelectedVariant(productData.variants?.[0] || null);

        // Default EMI
        setSelectedEmi(productData.emiPlans?.[0] || null);

        // Default image
        setSelectedImage(
          productData.variants?.[0]?.image || productData.images?.[0] || "",
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500">{error}</p>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-xl bg-black px-5 py-2 text-sm text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);

    if (variant.image) {
      setSelectedImage(variant.image);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 pb-28">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-xl text-gray-700"
          >
            ←
          </button>

          <h1 className="text-sm font-semibold text-gray-900">
            Product Details
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-5">
        {/* Main Product */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ================= IMAGE SECTION ================= */}
          <div className="w-full min-w-0 overflow-hidden rounded-3xl bg-white p-4 shadow-sm">
            {/* Main Image */}
            <div className="flex h-[360px] items-center justify-center rounded-2xl bg-gray-50 p-5 sm:h-[480px]">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-full max-h-full w-full max-w-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex max-w-full gap-3 overflow-x-auto overscroll-x-contain pb-1">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 bg-white p-2 ${
                    selectedImage === image
                      ? "border-violet-600"
                      : "border-gray-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}

              {/* Variant images */}
              {product.variants?.map((variant, index) => (
                <button
                  key={`variant-${index}`}
                  onClick={() => handleVariantChange(variant)}
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 bg-white p-2 ${
                    selectedVariant === variant
                      ? "border-violet-600"
                      : "border-gray-100"
                  }`}
                >
                  <img
                    src={variant.image}
                    alt={variant.color}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ================= PRODUCT INFO ================= */}
          <div className="min-w-0 space-y-5">
            {/* Basic Information */}
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-violet-600">
                1Fi Marketplace
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                  4.7 ★
                </span>

                <span className="text-sm text-gray-500">5,033 ratings</span>
              </div>

              {/* Price */}
              <div className="mt-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>

                  {product.mrp > product.price && (
                    <>
                      <span className="text-base text-gray-400 line-through">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>

                      <span className="font-semibold text-green-600">
                        {discount}% off
                      </span>
                    </>
                  )}
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Inclusive of all applicable taxes
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <p className="mt-5 border-t border-gray-100 pt-5 text-sm leading-6 text-gray-600">
                  {product.description}
                </p>
              )}
            </div>

            {/* ================= VARIANTS ================= */}
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  Select Variant
                </h3>

                {selectedVariant && (
                  <span className="text-sm text-gray-500">
                    {selectedVariant.color}
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {product.variants?.map((variant, index) => {
                  const isSelected = selectedVariant === variant;

                  return (
                    <button
                      key={index}
                      onClick={() => handleVariantChange(variant)}
                      className={`rounded-2xl border p-3 text-left transition ${
                        isSelected
                          ? "border-violet-600 bg-violet-50"
                          : "border-gray-200 bg-white hover:border-gray-400"
                      }`}
                    >
                      <div className="flex h-20 items-center justify-center">
                        <img
                          src={variant.image}
                          alt={variant.color}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <p className="mt-2 text-sm font-semibold text-gray-900">
                        {variant.storage}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {variant.color}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= EMI ================= */}
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Choose EMI Plan
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Pay for your purchase in easy monthly installments
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {product.emiPlans?.map((plan, index) => {
                  const isSelected = selectedEmi === plan;

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedEmi(plan)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-violet-600 bg-violet-50"
                          : "border-gray-200 bg-white hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            ₹{plan.monthlyAmount.toLocaleString("en-IN")}
                            <span className="text-sm font-normal text-gray-500">
                              /month
                            </span>
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {plan.tenureMonths} months
                          </p>
                        </div>

                        {isSelected && (
                          <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                            Selected
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span>Interest: {plan.interestRate}%</span>

                        {plan.cashback > 0 && (
                          <span className="font-semibold text-green-600">
                            Cashback ₹{plan.cashback.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= OFFER ================= */}
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Offers & Benefits
              </h3>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-green-50 p-4">
                  <p className="text-sm font-semibold text-green-700">
                    🎉 No-cost EMI available
                  </p>

                  <p className="mt-1 text-xs text-green-600">
                    Choose an eligible EMI plan and pay comfortably.
                  </p>
                </div>

                {selectedEmi?.cashback > 0 && (
                  <div className="rounded-2xl bg-violet-50 p-4">
                    <p className="text-sm font-semibold text-violet-700">
                      💰 Cashback available
                    </p>

                    <p className="mt-1 text-xs text-violet-600">
                      Get ₹{selectedEmi.cashback.toLocaleString("en-IN")}{" "}
                      cashback on the selected EMI plan.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ================= DELIVERY ================= */}
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Delivery Details
              </h3>

              <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-800">
                  📍 Delivery available
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Enter your delivery location during checkout.
                </p>
              </div>
            </div>

            {/* ================= HIGHLIGHTS ================= */}
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Product Highlights
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Product</p>

                  <p className="mt-1 text-sm font-semibold">{product.name}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Variant</p>

                  <p className="mt-1 text-sm font-semibold">
                    {selectedVariant?.storage}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">EMI</p>

                  <p className="mt-1 text-sm font-semibold">
                    ₹{selectedEmi?.monthlyAmount?.toLocaleString("en-IN")}
                    /month
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Tenure</p>

                  <p className="mt-1 text-sm font-semibold">
                    {selectedEmi?.tenureMonths} months
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop CTA */}
            <button
              disabled={!selectedVariant || !selectedEmi}
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    product,
                    selectedVariant,
                    selectedEmi,
                  },
                })
              }
              className="hidden w-full rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 sm:block"
            >
              Proceed with EMI
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-100 bg-white p-3 shadow-lg sm:hidden">
        <div className="mx-auto w-full max-w-md">
          <button
            disabled={!selectedVariant || !selectedEmi}
            onClick={() =>
              navigate("/checkout", {
                state: {
                  product,
                  selectedVariant,
                  selectedEmi,
                },
              })
            }
            className="w-full rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Proceed with EMI
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
