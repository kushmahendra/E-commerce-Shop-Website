import { useState } from "react";
import AdminPannel from "./AdminPannel";
import ProductList from "./ProductList";

export default function AdminDashboard() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Elegant Striped Flutter Sleeve Overlap Collar Fashion Mini Blouse",
      image: "/public/avatar.png",
      price: 20,
    },
    // Add more products as needed
  ]);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-orange-500">SavvyShop Admin</h1>
        </div>

        {/* Admin Panel (Upload Form) */}
        <AdminPannel handleAddProduct={handleAddProduct} />

        {/* Product List */}
        <ProductList
          products={products}
          handleDeleteProduct={handleDeleteProduct}
        />
      </div>
    </div>
  );
}
