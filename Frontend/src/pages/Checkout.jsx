import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, selectedVariant, selectedEmi } = location.state || {};

  // If user directly opens /checkout
  if (!product || !selectedVariant || !selectedEmi) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Checkout information not found
          </h2>

          <button
            onClick={() => navigate("/shop")}
            className="mt-4 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-md items-center px-4 py-4">
          <button onClick={() => navigate(-1)} className="mr-4 text-xl">
            ←
          </button>

          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>
      </div>

      <div className="mx-auto max-w-md space-y-4 px-4 py-5">
        {/* Product */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

          <div className="mt-4 flex gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gray-50 p-3">
              <img
                src={selectedVariant.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>

              <p className="mt-1 text-sm text-gray-500">
                {selectedVariant.storage} · {selectedVariant.color}
              </p>

              <p className="mt-2 text-lg font-bold">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* EMI */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Selected EMI Plan</h2>

          <div className="mt-4 rounded-2xl bg-violet-50 p-4">
            <p className="text-2xl font-bold text-violet-700">
              ₹{selectedEmi.monthlyAmount.toLocaleString("en-IN")}
              <span className="text-sm font-normal">/month</span>
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Tenure: {selectedEmi.tenureMonths} months
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Interest: {selectedEmi.interestRate}%
            </p>

            {selectedEmi.cashback > 0 && (
              <p className="mt-2 text-sm font-semibold text-green-600">
                Cashback: ₹{selectedEmi.cashback.toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </div>

        {/* Delivery */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Delivery Details</h2>

          <button className="mt-4 w-full rounded-2xl border border-gray-200 p-4 text-left">
            <p className="text-sm font-semibold">📍 Add delivery address</p>

            <p className="mt-1 text-xs text-gray-500">
              Your delivery address will be required to complete the order.
            </p>
          </button>
        </div>

        {/* Price Summary */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Price Summary</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Product price</span>

              <span className="font-medium">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">EMI tenure</span>

              <span className="font-medium">
                {selectedEmi.tenureMonths} months
              </span>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold">Monthly EMI</span>

                <span className="font-bold text-violet-600">
                  ₹{selectedEmi.monthlyAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm */}
        <button
          onClick={() => {
            alert("EMI application started successfully!");
          }}
          className="w-full rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700"
        >
          Continue with EMI
        </button>
      </div>
    </div>
  );
};

export default Checkout;
