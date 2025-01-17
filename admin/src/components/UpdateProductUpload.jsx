import { useState } from 'react';
import { Upload } from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import { uploadProfileImage } from '../services/services';
import {API_BASE_URL} from '../../constants/constant'
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

export default function UpdateProductUpload({  productId }) {
  const location = useLocation();
  const productDetails = location.state;

  // console.log('details',onUpdateProduct)
  const [formData, setFormData] = useState({
    name: productDetails?.name,
    description: productDetails?.description,
    category: productDetails?.category,
    price: productDetails?.price,
    oldPrice: productDetails?.oldPrice,
    color: productDetails?.color,
    rating: productDetails?.rating,
    image: productDetails?.image,
    author: productDetails?.author,
  });

  const [imagePreview, setImagePreview] = useState(productDetails?.image); // Store image preview
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


// // Handle Form Submission
const handleSubmit = async(e) => {
    e.preventDefault();
  
    // Validate Required Fields
    if (!formData.name || !formData.price || !formData.image) {
      toast.error('Please fill out all required fields and upload an image.', {
        autoClose: 5000,
        hideProgressBar: false,
      }); // Error toast
      return;
    }
  
    try {
      const response = await fetch(API_BASE_URL+`/api/product/${productDetails?._id}`,{
        method:"PUT",
        headers:{
          'Content-Type':'application/json'
        },body:JSON.stringify(formData)
      }
      )
      const data = await response.json();
      if (response.status===200) {
        // Call the update handler
        console.log(['data is',data])
        toast.success('Product updated successfully!', {
          autoClose: 5000,
          hideProgressBar: false,
        }); // Success toast
  
        // Reset Form State
      } else {
        console.warn(['error',data])

        toast.error('Failed to update product. Please try again.', {
          autoClose: 5000,
          hideProgressBar: false,
        }); // Error toast
      }
    } catch (error) {
      console.error('Error while updating product:', error);
      toast.error('An error occurred while updating the product. Please try again.', {
        autoClose: 5000,
        hideProgressBar: false,
      }); // Error toast
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-2xl">
        <div className='flex flex-row items-center  justify-between gap-12 mt-2'>
        <h2 className="text-xl font-semibold mb-6">PRODUCTS UPLOAD  </h2>
       <h2 > <Link to='/dashboard'><span className='bg-green-600 px-2 py-2 hover:bg-orange-700 rounded-lg text-white'>Back To Dashboard
        </span></Link></h2>
        </div>
     
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
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="yellow">yellow</option>
                <option value="black">black</option>
                <option value="white">white</option>
                <option value="pink">pink</option>
                <option value="purple">purple</option>
                <option value="orange">orange</option>
                <option value="golden">golden</option>
                <option value="brown">brown</option>
                <option value="gray">gray</option>
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
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
           Update Product
        </button>
      </form>
    </div>
    <ToastContainer />
    </div>
  );
}


