import { useState } from "react";

export default function AdminPannel({ handleAddProduct }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      title,
      image: imagePreview || "/placeholder.svg",
      price,
    };
    handleAddProduct(newProduct);
    setTitle("");
    setPrice(0);
    setImagePreview(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">PRODUCTS UPLOAD</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {imagePreview ? (
              <div className="relative h-32 w-32 mx-auto">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-gray-500">Upload</div>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Choose file
            </label>
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Product name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Product Price */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Product price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="$20"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
