const stores = [
  {
    name: "Apple Store",
    location: "2.4 km away",
  },
  {
    name: "Croma",
    location: "3.1 km away",
  },
  {
    name: "Reliance Digital",
    location: "4.2 km away",
  },
];

const NearbyStores = () => {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-gray-900">Nearby Stores</h2>

      <div className="space-y-3">
        {stores.map((store) => (
          <div
            key={store.name}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {store.name}
              </h3>

              <p className="mt-1 text-xs text-gray-400">{store.location}</p>
            </div>

            <span className="text-lg text-violet-500">→</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyStores;
