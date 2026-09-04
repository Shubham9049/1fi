const ShopTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      name: "Top Brands",
      value: "top-brands",
    },
    {
      name: "Nearby Stores",
      value: "nearby",
    },
    {
      name: "1Fi Marketplace",
      value: "marketplace",
    },
  ];

  return (
    <div className="rounded-full bg-violet-50 p-1.5 shadow-sm">
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-1 rounded-full px-2 py-3 text-xs font-medium transition sm:text-sm ${
                isActive
                  ? "bg-white text-violet-600 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShopTabs;
