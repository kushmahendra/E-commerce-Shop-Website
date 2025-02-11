import React, { useState } from "react";

export default function SaleOff() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    { id: 1, name: "Cotton Twill Swetter", price: 29.0, rating: 4, image: "img418.jpg", isNew: true },
    { id: 2, name: "Crest Design Women's", price: 11.9, rating: 4, image: "img419.jpg", isNew: true },
    { id: 3, name: "Traditional Saree with Jewelry", price: 11.9, rating: 4, image: "img420.jpg", isNew: true },
    { id: 4, name: "Elegant Earrings for Women ", price: 11.9, rating: 4, image: "img421.jpg", isNew: true },
    { id: 5, name: "Necklace Women`s", price: 11.9, rating: 4, image: "img422.jpg", isNew: true },
  
  ];

  const itemsPerPage = 4;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);
  if (visibleProducts.length < itemsPerPage) {
    visibleProducts.push(...products.slice(0, itemsPerPage - visibleProducts.length));
  }

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, index) => (
//       <span key={index} className={`text-xl ${index < rating ? "text-yellow-400" : "text-gray-300"}`}>
//         ★
//       </span>
//     ))
//   }

  return (
    <div className="max-w-full mx-auto px-4 py-12 my-8 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">SALE OFF</h2>
        <p className="text-gray-600">Mirum est notare quam littera gothica quam nunc putamus parum claram!</p>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
      >
        ◀
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
      >
        ▶
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibleProducts.map((product) => (
          <div key={product.id} className="relative transition-opacity duration-300 opacity-100">
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-cyan-400 text-white px-3 py-1 text-sm rounded-full">New</span>
            )}
            <div className="aspect-square bg-gray-100 mb-4 rounded-2xl overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-medium text-lg mb-2">{product.name}</h3>
            {/* <p className="flex mb-2">{renderStars(product.rating)}</p> */}
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
