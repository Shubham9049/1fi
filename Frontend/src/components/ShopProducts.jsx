import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductCard from "./ProductCard";

const ProductSkeleton = () => (
  <div className="flex min-h-[132px] gap-3 p-3" aria-hidden="true">
    <div className="h-28 w-24 shrink-0 animate-pulse rounded-xl bg-slate-100" />
    <div className="flex flex-1 flex-col py-1 pr-8">
      <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-3 w-2/5 animate-pulse rounded bg-slate-100" />
      <div className="mt-3 h-5 w-3/5 animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-slate-100" />
    </div>
  </div>
);

const ShopProducts = ({
  searchQuery = "",
  savedProductIds = [],
  onToggleSaved,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getProducts({ signal: controller.signal });

        if (isCurrentRequest) {
          setProducts(Array.isArray(response?.data) ? response.data : []);
        }
      } catch (fetchError) {
        if (fetchError?.name === "AbortError") {
          return;
        }

        if (isCurrentRequest) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Unable to load products right now.",
          );
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [requestVersion]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleProducts = useMemo(() => {
    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) => {
      const variantText = Array.isArray(product.variants)
        ? product.variants
            .flatMap((variant) => [variant.color, variant.storage])
            .filter(Boolean)
            .join(" ")
        : "";
      const searchableText = [product.name, product.description, variantText]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery, products]);

  const countLabel = error
    ? "Unavailable"
    : loading
      ? "Loading"
      : `${visibleProducts.length} ${visibleProducts.length === 1 ? "product" : "products"}`;

  return (
    <section aria-labelledby="marketplace-products-heading">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-600">
            1Fi Marketplace
          </p>
          <h2
            id="marketplace-products-heading"
            className="mt-0.5 text-xl font-bold tracking-tight text-slate-950"
          >
            Marketplace picks
          </h2>
        </div>

        <span
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="pb-0.5 text-xs font-medium text-slate-500"
        >
          {countLabel}
        </span>
      </div>

      {loading ? (
        <div
          className="divide-y divide-slate-100 overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
          aria-busy="true"
        >
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-[22px] border border-red-100 bg-red-50 p-5 text-center"
        >
          <p className="text-sm font-medium text-red-700">
            Could not load products
          </p>
          <p className="mt-1 text-xs leading-5 text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => setRequestVersion((version) => version + 1)}
            className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            Try again
          </button>
        </div>
      ) : visibleProducts.length ? (
        <div className="divide-y divide-slate-100 overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          {visibleProducts.map((product) => {
            const productId = product._id || product.slug;

            return (
              <ProductCard
                key={productId}
                product={product}
                isSaved={savedProductIds.includes(productId)}
                onToggleSaved={onToggleSaved}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-[22px] border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
          <p className="text-sm font-semibold text-slate-800">
            No products found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try a different product name, colour, or storage option.
          </p>
        </div>
      )}
    </section>
  );
};

export default ShopProducts;
