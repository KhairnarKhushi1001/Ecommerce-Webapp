import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import { Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>

  )
}

export default App
