import { useState } from 'react';
import { Upload } from 'lucide-react';
import axios from 'axios';
import { uploadProfileImage } from '../services/services';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast notifications

export default function ProductUpload({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    oldPrice: '',
    color: '',
    // rating: '',
    // image: null,
    images: [], // Updated to handle multiple images
    sizes: ['M'], // Default size from schema
    stock: '',
    author: '6772806c0361a7f113ef0fd1',
  });

  // const [imagePreview, setImagePreview] = useState(null); // Store image preview
  // const [uploading, setUploading] = useState(false); // Upload state
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Handle Image Upload
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setUploading(true); // Start upload state


  //     // const uploadData = new FormData();
  //     // uploadData.append('image', file);

  //     try {

  //       const result = await uploadProfileImage(file);
  //       console.log('hello world', result)

  //       // Update formData without overwriting other fields
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         image: result,
  //       }));
  //       setImagePreview(result)

  //       toast.success('Image uploaded successfully!', {
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //       }); // Success toast
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //       toast.error('Failed to upload image', {
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //       }); // Error toast
  //     } finally {
  //       setUploading(false); // End upload state
  //     }
  //   }
  // };

  // Handle multiple image uploads
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const result = await uploadProfileImage(file);
        return result;
      });

      const uploadedImages = await Promise.all(uploadPromises);

      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...uploadedImages],
      }));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...uploadedImages]);

      toast.success('Images uploaded successfully!', {
        autoClose: 5000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images', {
        autoClose: 5000,
        hideProgressBar: false,
      });
    } finally {
      setUploading(false);
    }
  };

  // Handle Form Submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!formData.name || !formData.price || !formData.image || !formData.stock) {
  //     toast.error('Please fill out all required fields and upload an image.', {
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //     }); // Error toast
  //     return;
  //   }

  //   onAddProduct(formData);
  //   toast.success('Product uploaded successfully!', {
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //   }); // Success toast

  //   // Reset Form State
  //   setFormData({
  //     name: '',
  //     description: '',
  //     category: '',
  //     price: '',
  //     oldPrice: '',
  //     color: '',
  //     rating: '',
  //     image: null,
  //     stock: '',
  //     author: '6772806c0361a7f113ef0fd1'
  //   });
  //   setImagePreview(null);
  // };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || formData.images.length === 0 || !formData.stock) {
      toast.error('Please fill out all required fields and upload at least one image.', {
        autoClose: 5000,
        hideProgressBar: false,
      });
      return;
    }
    onAddProduct(formData);
    toast.success('Product uploaded successfully!', {
      autoClose: 5000,
      hideProgressBar: false,
    });

    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      oldPrice: '',
      color: '',
      // rating: '',
      images: [],
      sizes: ['M'], // Default size from schema
      stock: '',
      author: '6772806c0361a7f113ef0fd1',
    });
    setImagePreviews([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center text-purple-700">PRODUCTS UPLOAD</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload Section */}
        {/* <div className="border-4 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white shadow-md transition-all hover:shadow-xl hover:border-green-500">
          <label htmlFor="file-upload" className="cursor-pointer">
            {imagePreview ? (
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-lg border-4 border-gray-200 shadow-lg">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-gradient-to-tl from-green-400 to-blue-500 rounded-full">
                <Upload className="w-8 h-8 text-white" />
              </div>
            )}
            <p className="text-sm text-gray-700">
              {imagePreview ? 'Change Image' : 'Upload Image'}
            </p>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div> */}

        {/* Image Upload Section */}
        <div className="border-4 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white shadow-md transition-all hover:shadow-xl hover:border-green-500">
          <label htmlFor="file-upload" className="cursor-pointer">
            {imagePreviews.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {imagePreviews.map((image, index) => (
                  <div key={index} className="w-24 h-24 overflow-hidden rounded-lg border-2 border-gray-200">
                    <img src={image} alt={`Preview ${index}`} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-gradient-to-tl from-green-400 to-blue-500 rounded-full">
                <Upload className="w-8 h-8 text-white" />
              </div>
            )}
            <p className="text-sm text-gray-700">{imagePreviews.length > 0 ? 'Add More Images' : 'Upload Images'}</p>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div>


        {/* Product Details Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Enter product name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Product Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Enter product description..."
            />
          </div>

          {/* Category and Price */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700">Product Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="">Select Category</option>
                <option value="accessories">Accessories</option>
                <option value="dress">Dress</option>
                <option value="cosmetics">Cosmetics</option>
                <option value="jewellery">Jewellery</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700">Product Price</label>
              <input
                type="number"
                value={formData.price}
                // onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                onChange={(e) => {
                  const newPrice = e.target.value;
                  // Check if the value is a valid non-negative number or empty string
                  if (newPrice >= 0 || newPrice === "") {
                    setFormData((prevState) => ({
                      ...prevState,
                      price: newPrice,
                    }));
                  }
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="$20"
              />
            </div>
          </div>

          {/* Old Price, Color, and Rating */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700">Old Price</label>
              <input
                type="number"
                value={formData.oldPrice}
                // onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                onChange={(e) => {
                  const newOldPrice = e.target.value;
                  // Check if the value is a valid non-negative number or empty string
                  if (newOldPrice >= 0 || newOldPrice === "") {
                    setFormData((prevState) => ({
                      ...prevState,
                      oldPrice: newOldPrice,
                    }));
                  }
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="$25"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700">Color</label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
              >

                <option value="">Select color</option>
                <option value="black">black</option>
                <option value="white">white</option>
                <option value="gray">gray</option>
                <option value="silver">silver</option>
                <option value="red">red</option>
                <option value="orange">orange</option>
                <option value="yellow">yellow</option>
                <option value="green">green</option>
                <option value="blue">blue</option>
                <option value="purple">purple</option>
                <option value="pink">pink</option>
                <option value="brown">brown</option>
                <option value="golden">golden</option>

              </select>
            </div>



            {/* 
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700">Rating</label>
              <input
                type="number"
                step="0.1"
                value={formData.rating}
                // onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                onChange={(e) => {
                  const newRating = Number(e.target.value);
                  // Ensure the value is an integer between 0 and 5
                  if (newRating >= 0 && newRating <= 5 && Number.isInteger(newRating)) {
                    setFormData((prevState) => ({
                      ...prevState,
                      rating: newRating,
                    }));
                  }
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="e.g., 4.5"
                min="0"
                max="5"
             
              />
            </div> */}
          </div>

          {/* Sizes */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-700">Sizes</label>
            <select
              multiple
              value={formData.sizes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sizes: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Stock</label>
            <input
              type="number"
              value={formData.stock}
              // onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              onChange={(e) => {
                const newStock = e.target.value;
                // Prevent negative values
                if (newStock >= 0 || newStock === "") {
                  setFormData((prevState) => ({
                    ...prevState,
                    stock: newStock,
                  }));
                }
              }}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Enter stock number"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Author Id</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Type here..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
        >
          + Add Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );


}

