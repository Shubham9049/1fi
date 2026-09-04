import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/shop/nearby" element={<Shop />} />

        <Route path="/products/:slug" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
