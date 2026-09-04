import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shop />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/shop/nearby" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
