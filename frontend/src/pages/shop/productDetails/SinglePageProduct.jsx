import React, { useState } from "react";

const SinglePageProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0); // Default image index

  const images = [
    "/images/white-dress.png",
    "/images/cream-dress.png",
    "/images/black-trim-dress.png",
    "/images/black-dress.png",
    "/images/green-dress.png",
  ];

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 flex justify-center">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Image Section */}
          <div className="relative">
            <div className="w-full h-96 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg relative">
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800"
                onClick={handlePrevImage}
              >
                &#8249;
              </button>
              <img src={images[selectedImage]} alt="Product" className="h-full object-cover" />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800"
                onClick={handleNextImage}
              >
                &#8250;
              </button>
            </div>
            <div className="flex space-x-2 mt-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Thumbnail"
                  className={`h-20 w-20 object-cover cursor-pointer rounded-lg border ${
                    selectedImage === index ? "border-black" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Adrianna Papell Women's</h2>
              <p className="text-gray-600 mt-2">
                Regular fit, round neckline, short sleeves. Made of extra long staple pima cotton.
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-400">★</span>
                </div>
                <span className="text-gray-500">(1 Review)</span>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-gray-500 line-through">$23.90</span>
                <span className="text-2xl font-semibold text-red-500">$19.12</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {/* Sizes */}
                <div>
                  <h4 className="text-gray-700 font-medium">Size</h4>
                  <div className="flex space-x-2 mt-2">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button
                        key={size}
                        className="px-3 py-1 border border-gray-300 rounded-lg hover:border-black"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="text-gray-700 font-medium">Color</h4>
                  <div className="flex space-x-2 mt-2">
                    <button className="h-8 w-8 rounded-full border border-gray-300 bg-white"></button>
                    <button className="h-8 w-8 rounded-full border border-gray-300 bg-gray-800"></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 bg-black text-white py-2 rounded-lg text-center">ADD TO CART</button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="text-gray-500 hover:underline">Size Guide</button>
                <button className="text-gray-500 hover:underline">Add to Wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePageProduct;
