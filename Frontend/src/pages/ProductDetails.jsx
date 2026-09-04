import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../services/productApi";
import { useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmi, setSelectedEmi] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductBySlug(slug);
        setProduct(response.data);
        setSelectedVariant(response.data.variants[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back
        </button>

        {/* Product Section */}
        <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
          {/* Left - Image */}
          <div className="flex min-h-[450px] items-center justify-center rounded-2xl bg-gray-50 p-8">
            <img
              src={selectedVariant?.image || product.images[0]}
              alt={product.name}
              className="max-h-[400px] w-full object-contain"
            />
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col">
            <p className="mb-2 text-sm font-medium text-gray-500">
              1Fi Marketplace
            </p>

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>

              {product.mrp > product.price && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>

            {/* Variants */}
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold">Choose Variant</h2>

              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant, index) => {
                  const isSelected =
                    selectedVariant?.storage === variant.storage &&
                    selectedVariant?.color === variant.color;

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`rounded-xl border px-4 py-3 text-sm transition ${
                        isSelected
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {variant.storage} - {variant.color}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* EMI Plans */}
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold">Choose EMI Plan</h2>

              <div className="space-y-3">
                {product.emiPlans.map((plan, index) => {
                  const isSelected =
                    selectedEmi?.tenureMonths === plan.tenureMonths &&
                    selectedEmi?.monthlyAmount === plan.monthlyAmount;

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedEmi(plan)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-black bg-gray-100"
                          : "border-gray-200 bg-white hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">
                            ₹{plan.monthlyAmount}/month
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {plan.tenureMonths} months · {plan.interestRate}%
                            interest
                          </p>
                        </div>

                        {plan.cashback > 0 && (
                          <span className="text-sm font-medium text-gray-700">
                            ₹{plan.cashback} cashback
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <button className="mt-8 w-full rounded-2xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800">
              Proceed with EMI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
