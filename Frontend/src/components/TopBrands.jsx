const brands = [
  {
    name: "Air India",
    description: "No-cost EMIs upto 18 months",
    logo: "AI",
  },
  {
    name: "Apple Premium Reseller",
    description: "No-cost EMIs upto 24 months",
    logo: "",
  },
  {
    name: "CaratLane",
    description: "No-cost EMIs upto 6 months",
    logo: "CL",
  },
  {
    name: "CGH Earth",
    description: "No-cost EMIs upto 12 months",
    logo: "CGH",
  },
];

const TopBrands = () => {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-gray-900">Top Brands</h2>

      <div className="space-y-3">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-bold text-red-500">
              {brand.logo}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {brand.name}
              </h3>

              <p className="mt-1 text-xs text-gray-400">{brand.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopBrands;
