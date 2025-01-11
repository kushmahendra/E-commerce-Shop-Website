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
    rating: '',
    image: null,
    author: '',
  });

  const [imagePreview, setImagePreview] = useState(null); // Store image preview
  const [uploading, setUploading] = useState(false); // Upload state

 // Handle Image Upload
const handleImageUpload = async (e) => {
  const file = e.target.files?.[0];
  if (file) {
    setUploading(true); // Start upload state

    
    // const uploadData = new FormData();
    // uploadData.append('image', file);

    try {
     
      const result  = await uploadProfileImage(file);
      console.log('hello world',result)
      
      // Update formData without overwriting other fields
      setFormData((prevData) => ({
        ...prevData,
        image: result,
      }));
      setImagePreview(result)

      toast.success('Image uploaded successfully!', {
        autoClose: 5000,
        hideProgressBar: false,
      }); // Success toast
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image', {
        autoClose: 5000,
        hideProgressBar: false,
      }); // Error toast
    } finally {
      setUploading(false); // End upload state
    }
  }
};


  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      toast.error('Please fill out all required fields and upload an image.', {
        autoClose: 5000,
        hideProgressBar: false,
      }); // Error toast
      return;
    }

    onAddProduct(formData);
    toast.success('Product uploaded successfully!', {
      autoClose: 5000,
      hideProgressBar: false,
    }); // Success toast

    // Reset Form State
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      oldPrice: '',
      color: '',
      rating: '',
      image: null,
      author: '',
    });
    setImagePreview(null);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">PRODUCTS UPLOAD</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <label htmlFor="file-upload" className="cursor-pointer">
            {imagePreview ? (
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-gray-50 rounded-full">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <p className="text-sm text-gray-500">
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
        </div>

        {/* Product Details Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              placeholder="Type here..."
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Product Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded-lg h-32"
              placeholder="Write content here..."
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Product Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                <option value="accessories">Accessories</option>
                <option value="dress">Dress</option>
                <option value="cosmetics">Cosmetics</option>
                <option value="jewellery">Jewellery</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Product Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="$20"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Old Price</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) =>
                  setFormData({ ...formData, oldPrice: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="$25"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm mb-1">Color</label>
              <select
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select color</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="pink">Pink</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="golden">Golden</option>
                <option value="brown">Brown</option>
                <option value="gray">Gray</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., 4.5"
              />
            </div>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm mb-1">Author Name</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              placeholder="Type here..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          + Add Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

