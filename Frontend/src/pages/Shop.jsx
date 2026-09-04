import { useState } from "react";

import ShopTabs from "../components/ShopTabs";
import TopBrands from "../components/TopBrands";
import NearbyStores from "../components/NearbyStores";
import ShopProducts from "../components/ShopProducts";
import BottomNav from "../components/BottomNav";

const Shop = () => {
  const [activeTab, setActiveTab] = useState("top-brands");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedProductIds, setSavedProductIds] = useState([]);
  const isMarketplace = activeTab === "marketplace";

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab !== "marketplace") {
      setSearchQuery("");
    }
  };

  const handleToggleSaved = (productId) => {
    setSavedProductIds((savedIds) =>
      savedIds.includes(productId)
        ? savedIds.filter((savedId) => savedId !== productId)
        : [...savedIds, productId],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="mx-auto w-full max-w-md">
        <div className="overflow-hidden rounded-b-[32px] bg-gradient-to-br from-violet-800 via-violet-700 to-indigo-900 px-6 py-8 text-white">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/40 px-3 py-1 text-xs font-medium">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="h-3.5 w-3.5"
            >
              <path
                d="m10 1.8.96 4.07 3.16-2.75-2.04 3.64 4.12.77-4.12.77 2.04 3.64-3.16-2.75L10 15.25l-.96-4.07-3.16 2.75 2.04-3.64-4.12-.77 4.12-.77-2.04-3.64 3.16 2.75L10 1.8Z"
                fill="currentColor"
              />
            </svg>
            NO-COST EMIs
          </div>

          <h1 className="text-3xl font-bold leading-tight">Shop today,</h1>
          <p className="mt-1 text-2xl italic">Pay later using</p>
          <p className="text-3xl font-bold">Mutual funds.</p>

          <p className="mt-4 max-w-[260px] text-sm leading-5 text-violet-100">
            No credit score required. No interest. Backed by your investments.
          </p>

          <div className="mt-5 flex justify-end gap-2 text-violet-200" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
              <rect
                x="8"
                y="4"
                width="32"
                height="40"
                rx="6"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path d="M17 10h14M21 37h6" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
            </svg>
            <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
              <path
                d="M8 16.5 24 9l16 7.5v19A3.5 3.5 0 0 1 36.5 39h-25A3.5 3.5 0 0 1 8 35.5v-19Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <path d="M8 18h32M16 25h8" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <div className="-mt-7 px-4">
          <ShopTabs activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>

        <div className="mt-5 px-4">
          <div
            className={`flex items-center gap-3 rounded-full border border-gray-200 px-4 py-3 shadow-sm ${
              isMarketplace ? "bg-white" : "bg-gray-100"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-gray-400"
            >
              <path
                d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              disabled={!isMarketplace}
              aria-label="Search marketplace products"
              placeholder={
                isMarketplace
                  ? "Search products..."
                  : "Select Marketplace to search"
              }
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-400"
            />
          </div>
        </div>

        <main className="mt-6 px-4">
          {activeTab === "top-brands" && <TopBrands />}
          {activeTab === "nearby" && <NearbyStores />}
          {isMarketplace && (
            <ShopProducts
              searchQuery={searchQuery}
              savedProductIds={savedProductIds}
              onToggleSaved={handleToggleSaved}
            />
          )}
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export default Shop;
