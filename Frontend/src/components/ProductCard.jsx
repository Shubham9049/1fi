import { useState } from "react";
import { Link } from "react-router-dom";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const formatCurrency = (amount) =>
  Number.isFinite(Number(amount)) ? currencyFormatter.format(Number(amount)) : "";

const getBestEmiPlan = (emiPlans) => {
  const validPlans = Array.isArray(emiPlans)
    ? emiPlans.filter((plan) => Number.isFinite(Number(plan?.monthlyAmount)))
    : [];

  if (!validPlans.length) {
    return null;
  }

  const noCostPlans = validPlans.filter(
    (plan) => Number(plan.interestRate) === 0,
  );
  const preferredPlans = noCostPlans.length ? noCostPlans : validPlans;

  return preferredPlans.reduce((lowestPlan, plan) =>
    Number(plan.monthlyAmount) < Number(lowestPlan.monthlyAmount)
      ? plan
      : lowestPlan,
  );
};

const ProductImagePlaceholder = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-8 w-8 text-slate-300"
  >
    <path
      d="M7 3.75h10A2.25 2.25 0 0 1 19.25 6v12A2.25 2.25 0 0 1 17 20.25H7A2.25 2.25 0 0 1 4.75 18V6A2.25 2.25 0 0 1 7 3.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M9 17.25h6M10.5 6.75h3"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

const ProductCard = ({ product, isSaved = false, onToggleSaved }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const productId = product._id || product.slug;
  const primaryVariant = Array.isArray(product.variants)
    ? product.variants[0]
    : null;
  const imageUrl = product.images?.[0] || primaryVariant?.image;
  const variantLabel = [primaryVariant?.color, primaryVariant?.storage]
    .filter(Boolean)
    .join(" / ");
  const price = Number(product.price);
  const mrp = Number(product.mrp);
  const hasPrice = Number.isFinite(price);
  const hasDiscount =
    Number.isFinite(mrp) && mrp > price && Number.isFinite(price);
  const discount = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const bestEmiPlan = getBestEmiPlan(product.emiPlans);
  const isNoCostEmi = bestEmiPlan && Number(bestEmiPlan.interestRate) === 0;
  const cashback = Number(bestEmiPlan?.cashback) || 0;

  return (
    <article className="group relative">
      <Link
        to={`/products/${product.slug}`}
        className="flex min-h-[132px] gap-3 p-3 outline-none transition-colors duration-200 hover:bg-violet-50/60 focus-visible:bg-violet-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500 active:bg-violet-50"
      >
        <div className="relative flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2 sm:h-[7.5rem] sm:w-28">
          {discount > 0 && (
            <span className="absolute left-1.5 top-1.5 z-[1] rounded-md bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white shadow-sm">
              SAVE {discount}%
            </span>
          )}

          {imageUrl && !imageFailed ? (
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <ProductImagePlaceholder />
          )}
        </div>

        <div className="min-w-0 flex-1 py-0.5 pr-8">
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-[1.25rem] text-slate-900 transition-colors group-hover:text-violet-700">
            {product.name}
          </h3>

          {variantLabel && (
            <p className="mt-0.5 truncate text-[11px] text-slate-500">
              {variantLabel}
            </p>
          )}

          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-base font-bold tracking-tight text-slate-950">
              {hasPrice ? formatCurrency(price) : "Price on request"}
            </span>

            {hasDiscount && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatCurrency(mrp)}
              </span>
            )}

            {discount > 0 && (
              <span className="text-[11px] font-semibold text-emerald-600">
                {discount}% off
              </span>
            )}
          </div>

          {bestEmiPlan && (
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-violet-700">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0"
              >
                <path
                  d="M10 2.5 12 4l2.5-.2.7 2.4 2.1 1.4-1 2.3.2 2.5-2.4.7-1.4 2.1-2.3-1-2.5.2-.7-2.4-2.1-1.4 1-2.3-.2-2.5 2.4-.7L8 2.5h2Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                />
                <path
                  d="m7.3 10 1.6 1.6 3.8-3.7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
              {isNoCostEmi ? "No-cost EMI from" : "EMI from"}{" "}
              {formatCurrency(bestEmiPlan.monthlyAmount)}/mo
            </p>
          )}

          {cashback > 0 && (
            <p className="mt-0.5 text-[11px] text-slate-500">
              Includes {formatCurrency(cashback)} cashback
            </p>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          onToggleSaved?.(productId);
        }}
        aria-label={
          isSaved ? `Remove ${product.name} from saved items` : `Save ${product.name}`
        }
        aria-pressed={isSaved}
        className={`absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white/95 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
          isSaved
            ? "border-violet-200 text-violet-600"
            : "border-slate-200 text-slate-400 hover:border-violet-200 hover:text-violet-600"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill={isSaved ? "currentColor" : "none"}
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      </button>
    </article>
  );
};

export default ProductCard;
