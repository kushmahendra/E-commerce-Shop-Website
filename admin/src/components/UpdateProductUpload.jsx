// import { useState } from 'react';
// import { Upload } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { uploadProfileImage } from '../services/services';
// import { API_BASE_URL } from '../../constants/constant'
// import { toast} from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

// export default function UpdateProductUpload({ productId }) {
//   const location = useLocation();
//   const productDetails = location.state;

//   // console.log('details',onUpdateProduct)
//   const [formData, setFormData] = useState({
//     name: productDetails?.name,
//     description: productDetails?.description,
//     category: productDetails?.category,
//     price: productDetails?.price,
//     oldPrice: productDetails?.oldPrice,
//     color: productDetails?.color,
//     rating: productDetails?.rating,
//     image: productDetails?.image,
//     stock: productDetails?.stock,
//     author: productDetails?.author,
//   });

//   const [imagePreview, setImagePreview] = useState(productDetails?.image); // Store image preview
//   const [uploading, setUploading] = useState(false); // Upload state

//   // Handle Image Upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setUploading(true); // Start upload state



//       // const uploadData = new FormData();
//       // uploadData.append('image', file);

//       try {

//         const result = await uploadProfileImage(file);
//         console.log('hello world', result)

//         // Update formData without overwriting other fields
//         setFormData((prevData) => ({
//           ...prevData,
//           image: result,
//         }));
//         setImagePreview(result)
//         toast.success('Image uploaded successfully!', {
//           autoClose: 5000,
//           hideProgressBar: false,
//         }); // Success toast
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         toast.error('Failed to upload image', {
//           autoClose: 5000,
//           hideProgressBar: false,
//         }); // Error toast
//       } finally {
//         setUploading(false); // End upload state
//       }
//     }
//   };


//   // // Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate Required Fields
//     if (!formData.name || !formData.price || !formData.image) {
//       toast.error('Please fill out all required fields and upload an image.', {
//         autoClose: 5000,
//         hideProgressBar: false,
//       }); // Error toast
//       return;
//     }

//     try {
//       const response = await fetch(API_BASE_URL + `/api/product/${productDetails?._id}`, {
//         method: "PUT",
//         headers: {
//           'Content-Type': 'application/json'
//         }, body: JSON.stringify(formData)
//       }
//       )
//       const data = await response.json();
//       if (response.status === 200) {
//         // Call the update handler
//         console.log(['data is', data])
//         toast.success('Product updated successfully!', {
//           autoClose: 5000,
//           hideProgressBar: false,
//         }); // Success toast

//         // Reset Form State
//       } else {
//         console.warn(['error', data])

//         toast.error('Failed to update product. Please try again.', {
//           autoClose: 5000,
//           hideProgressBar: false,
//         }); // Error toast
//       }
//     } catch (error) {
//       console.error('Error while updating product:', error);
//       toast.error('An error occurred while updating the product. Please try again.', {
//         autoClose: 5000,
//         hideProgressBar: false,
//       }); // Error toast
//     }
//   };


//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-pink-100">
//       <div className="max-w-2xl bg-white shadow-xl rounded-lg p-8">
//         <div className="flex flex-row items-center justify-between gap-12 mb-6">
//           <h2 className="text-2xl font-semibold text-indigo-600">PRODUCTS UPLOAD</h2>
//           <h2>
//             <Link to="/dashboard">
//               <span className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-orange-700 transition-all">
//                 Back To Product List
//               </span>
//             </Link>
//           </h2>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Image Upload Section */}
//           <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center bg-gradient-to-br from-pink-100 to-indigo-50">
//             <label htmlFor="file-upload" className="cursor-pointer text-indigo-500 hover:text-indigo-700">
//               {imagePreview ? (
//                 <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-lg border-2 border-indigo-300">
//                   <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
//                 </div>
//               ) : (
//                 <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-indigo-50 rounded-full">
//                   <Upload className="w-8 h-8 text-indigo-400" />
//                 </div>
//               )}
//               <p className="text-sm text-gray-500">{imagePreview ? 'Change Image' : 'Upload Image'}</p>
//             </label>
//             <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
//           </div>

//           {/* Product Details Section */}
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm text-indigo-600 mb-2">Product Name</label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter product name..."
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-indigo-600 mb-2">Product Description</label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
//                 placeholder="Enter product description..."
//               />
//             </div>

//             <div className="flex gap-6">
//               <div className="flex-1">
//                 <label className="block text-sm text-indigo-600 mb-2">Product Category</label>
//                 <select
//                   value={formData.category}
//                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Select Category</option>
//                   <option value="accessories">Accessories</option>
//                   <option value="dress">Dress</option>
//                   <option value="cosmetics">Cosmetics</option>
//                   <option value="jewellery">Jewellery</option>
//                 </select>
//               </div>

//               <div className="flex-1">
//                 <label className="block text-sm text-indigo-600 mb-2">Product Price</label>
//                 <input
//                   type="number"
//                   value={formData.price}
//                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                   className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="$20"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-6">
//               <div className="flex-1">
//                 <label className="block text-sm text-indigo-600 mb-2">Old Price</label>
//                 <input
//                   type="number"
//                   value={formData.oldPrice}
//                   onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
//                   className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="$25"
//                 />
//               </div>

//               <div className="flex-1">
//                 <label className="block text-sm text-indigo-600 mb-2">Color</label>
//                 <select
//                   value={formData.color}
//                   onChange={(e) => setFormData({ ...formData, color: e.target.value })}
//                   className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   {/* <option value="">Select color</option>
//                 <option value="red">red</option>
//                 <option value="blue">blue</option>
//                 <option value="green">green</option>
//                 <option value="yellow">yellow</option>
//                 <option value="black">black</option>
//                 <option value="white">white</option>
//                 <option value="pink">pink</option>
//                 <option value="purple">purple</option>
//                 <option value="orange">orange</option>
//                 <option value="golden">golden</option>
//                 <option value="brown">brown</option>
//                 <option value="gray">gray</option> */}

//                   <option value="">select color</option>
//                   <option value="black">black</option>
//                   <option value="white">white</option>
//                   <option value="gray">gray</option>
//                   <option value="silver">silver</option>
//                   <option value="red">red</option>
//                   <option value="orange">orange</option>
//                   <option value="yellow">yellow</option>
//                   <option value="green">green</option>
//                   <option value="blue">blue</option>
//                   <option value="purple">purple</option>
//                   <option value="pink">pink</option>
//                   <option value="brown">brown</option>
//                   <option value="golden">golden</option>

//                 </select>
//               </div>

//     <div className="flex-1">
//       <label className="block text-sm text-indigo-600 mb-2">Rating</label>
//       <input
//         type="number"
//         step="0.1"
//         value={formData.rating}
//         onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
//         className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         placeholder="e.g., 4.5"
//       />
//     </div>
//   </div>

//   {/* Stock */}
//   <div>
//     <label className="block text-sm text-indigo-600 mb-2">Stock</label>
//     <input
//       type="number"
//       value={formData.stock}
//       onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//       className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       placeholder="Enter stock number"
//     />
//   </div>

//   {/* Author */}
//   <div>
//     <label className="block text-sm text-indigo-600 mb-2">Author Name</label>
//     <input
//       type="text"
//       value={formData.author}
//       onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//       className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       placeholder="Type here..."
//     />
//   </div>
// </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             Update Product
//           </button>
//         </form>
//       </div>
//      
//     </div>
//   );

// }

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { uploadProfileImage } from '../services/services';
import { API_BASE_URL } from '../../constants/constant';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateProductUpload({ productId }) {
  const location = useLocation();
  const productDetails = location.state;

  const [formData, setFormData] = useState({
    name: productDetails?.name || '',
    description: productDetails?.description || '',
    category: productDetails?.category || '',
    price: productDetails?.price || '',
    oldPrice: productDetails?.oldPrice || '',
    color: productDetails?.color || '',
    // rating: productDetails?.rating || '',
    images: productDetails?.images || [],
    sizes: productDetails?.sizes ?? ['M'],
    stock: productDetails?.stock || '',
    author: productDetails?.author || '',
  });

  const [imagePreviews, setImagePreviews] = useState(productDetails?.images || []);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploading(true);
      try {
        const uploadPromises = files.map((file) => uploadProfileImage(file));
        const results = await Promise.all(uploadPromises);

        setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...results],
        }));

        setImagePreviews((prevPreviews) => [...prevPreviews, ...results]);
        toast.success('Images uploaded successfully!');
      } catch (error) {
        console.error('Error uploading images:', error);
        toast.error('Failed to upload images');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || formData.images.length === 0) {
      toast.error('Please fill out all required fields and upload at least one image.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/product/${productDetails?._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        toast.success('Product updated successfully!');
      } else {
        toast.error('Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error while updating product:', error);
      toast.error('An error occurred while updating the product.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-gradient-to-r from-blue-100 to-pink-100">
      <div className="max-w-full bg-white shadow-xl rounded-lg p-8">
        <div className="flex flex-row items-center justify-between gap-12 mb-6">
          <h2 className="text-2xl font-semibold text-indigo-600">UPDATE PRODUCT</h2>
          <Link to="/dashboard">
            <span className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-orange-700">
              Back To Product List
            </span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center">
            <label htmlFor="file-upload" className="cursor-pointer text-indigo-500 hover:text-indigo-700">
              <div className="flex flex-wrap gap-2 justify-center">
                {imagePreviews.map((img, index) => (
                  <div key={index} className="w-20 h-20 rounded-lg border overflow-hidden">
                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">Click to upload more images</p>
            </label>
            <input id="file-upload" type="file" multiple className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-indigo-600 mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border-2 border-indigo-300 rounded-lg"
                placeholder="Enter product name..."
              />
            </div>

            <div>
              <label className="block text-sm text-indigo-600 mb-2">Product Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border-2 border-indigo-300 rounded-lg h-32"
                placeholder="Enter product description..."
              />
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-sm text-indigo-600 mb-2">Product Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  <option value="accessories">Accessories</option>
                  <option value="dress">Dress</option>
                  <option value="cosmetics">Cosmetics</option>
                  <option value="jewellery">Jewellery</option>
                </select>
              </div>


              <div className="flex-1">
                <label className="block text-sm text-indigo-600 mb-2">Product Price</label>
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
                  className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="$20"
                />
              </div>

            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-sm text-indigo-600 mb-2">Color</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">select color</option>
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


              {/* <div className="flex-1">
                <label className="block text-sm text-indigo-600 mb-2">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 4.5"
                />
              </div> */}
            </div>

            {/* sizes */}
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
              <label className="block text-sm text-indigo-600 mb-2">Stock</label>
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
                className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter stock number"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm text-indigo-600 mb-2">Author Name</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type here..."
              />
            </div>
            {/* </div> */}
          </div>


          <div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
              {uploading ? 'Uploading...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
   
    </div>
  );
}


