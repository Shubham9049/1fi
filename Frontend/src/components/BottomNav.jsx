import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      icon: "⌂",
    },
    {
      name: "Shop",
      path: "/shop",
      icon: "▣",
    },
    {
      name: "EMI Dues",
      icon: "▤",
    },
    {
      name: "Limit",
      icon: "⌁",
    },
    {
      name: "Profile",
      icon: "♙",
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-3 pb-3">
      <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        {navItems.map((item) => {
          const isActive =
            item.name === "Shop"
              ? location.pathname.startsWith("/shop")
              : location.pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex min-w-[52px] flex-col items-center gap-1 text-xs ${
                isActive ? "font-semibold text-violet-600" : "text-gray-400"
              }`}
            >
              <span
                className={`text-xl ${
                  isActive ? "text-violet-600" : "text-gray-400"
                }`}
              >
                {item.icon}
              </span>

              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
