import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ProductUpload from '../components/ProductUpload';
import ProductList from '../components/ProductList';
import OrderList from '../components/OrderList';
import { uploadProfileImage } from '../services/services';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Page() {
  const [activeTab, setActiveTab] = useState('add');
  const [products, setProducts] = useState([]);
  const [avatar, setAvatar] = useState(localStorage.getItem("profile_img") ||'/avatar.png');
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  console.log('env is ',import.meta.env.VITE_CLOUD_NAME)

  const fileInputRef = useRef(null);

  // Handle Avatar Upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
     
         const result  = await uploadProfileImage(file);
            console.log('hello world',result)
            const response = await fetch(`http://localhost:8080/admin/detail/update/${localStorage.getItem("userId")}`,{
              method:'PUT',
              headers:{
                'Content-type':'application/json'
              },
              body:JSON.stringify({
                profile_img:result
              })
            })
            if(response.ok){
              setAvatar(result)
              alert('Avatar uploaded successfully!');
              localStorage.setItem("profile_img",result)

            }
            else{
              alert('Failed to update profile image')
            }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar.');
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {

      const token = localStorage.getItem('token');

      if (!token) {
        console.warn('No token found, redirecting to login...');
        navigate('/'); // Redirect to login if no token exists
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/products/products');
        setProducts(response.data.data || response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        alert('Failed to fetch products.');
      }
    };
    fetchProducts();
  }, [navigate]);

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/products/create-product',
        product
      );
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Failed to add product.');
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setTimeout(() => navigate('/'), 0);
  };
  

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#ff6b00]">Glamora</h1>
            <span className="text-gray-500">Admin panel</span>
          </div>
          <img
            src={avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover cursor-pointer"
            onClick={handleAvatarClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleAvatarUpload}
          />
        </header>
        {activeTab === 'add' && <ProductUpload onAddProduct={handleAddProduct} />}
        {activeTab === 'list' && (
          <ProductList products={products} onRemoveProduct={handleRemoveProduct} />
        )}
        {activeTab === 'orders' && <OrderList />}
        {activeTab === 'logout' &&  handleLogout() }
      </main>
    </div>
  );
}






// // import { useState, useRef, useEffect } from 'react';
// // import Sidebar from './components/Sidebar';
// // import ProductUpload from './components/ProductUpload';
// // import ProductList from './components/ProductList';
// // import OrderList from './components/OrderList';

// // export default function App() {
// //   const [activeTab, setActiveTab] = useState('add');
// //   const [products, setProducts] = useState([
 
// //       {
// //         id: 1,
// //         name: "Elegant Blouse",
// //         category: "Women",
// //         description: "A stylish blouse for women.",
// //         price: 20,
// //         oldPrice: 25,
// //         image: "/placeholder.svg",
// //         color: "Red",
// //         rating: 4.5
// //       },
// //       {
// //         id: 2,
// //         name: "Stylish Floral Print Summer Dress",
// //         category: "Women",
// //         description: "Self-tied V Neck Design for summer.",
// //         price: 25,
// //         oldPrice: 30,
// //         image: "/placeholder.svg",
// //         color: "Blue",
// //         rating: 4.2
// //       }
// //   ]);

// //   const [avatar, setAvatar] = useState('public/avatar.png'); // Avatar state for uploaded image

// //   // Ref to access file input
// //   const fileInputRef = useRef(null);

// //   // Handle file selection
// //   const handleAvatarChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const imageUrl = URL.createObjectURL(file);
// //       setAvatar(imageUrl);
// //     }
// //   };

// //   // Trigger file input on image click
// //   const handleImageClick = () => {
// //     fileInputRef.current.click();
// //   };

// //   const handleAddProduct = (product) => {
// //     setProducts([...products, { ...product, id: products.length + 1 }]);
// //   };

// //   const handleRemoveProduct = (id) => {
// //     setProducts(products.filter(product => product.id !== id));
// //   };

// //   // const handleRemoveProduct = async (id) => {
// //   //   try {
// //   //     // Call the DELETE API
// //   //     await axios.delete(`http://localhost:8080/api/products/${id}`);
      
// //   //     // Update the local state to remove the product from the list
// //   //     setProducts(products.filter(product => product.id !== id));
// //   //   } catch (error) {
// //   //     console.error('Failed to delete the product:', error);
// //   //     alert('Failed to delete the product. Please try again.');
// //   //   }
// //   // };

// //   return (
// //     <div className="flex min-h-screen bg-gray-50">
// //       <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
// //       <main className="flex-1 p-8">
// //         <header className="flex items-center justify-between mb-8">
// //           <div className="flex items-center gap-4">
// //             <h1 className="text-2xl font-bold text-[#ff6b00]">Glamora</h1>
// //             <span className="text-gray-500">Admin panel</span>
// //           </div>
          
// //           {/* Clickable Avatar Image */}
// //           <img 
// //             src={avatar} 
// //             alt="Avatar" 
// //             className="w-20 h-20 rounded-full object-cover cursor-pointer" 
// //             onClick={handleImageClick}
// //           />
// //           <input
// //             type="file"
// //             ref={fileInputRef}
// //             className="hidden"
// //             accept="image/*"
// //             onChange={handleAvatarChange}
// //           />
// //         </header>

// //         {activeTab === 'add' && (
// //           <ProductUpload onAddProduct={handleAddProduct} />
// //         )}
// //         {activeTab === 'list' && (
// //           <ProductList products={products} onRemoveProduct={handleRemoveProduct} />
// //         )}
// //         {activeTab === 'orders' && <OrderList />}
// //       </main>
// //     </div>
// //   );
// // }

