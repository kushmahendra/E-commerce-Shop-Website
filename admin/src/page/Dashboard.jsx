import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ProductUpload from '../components/ProductUpload';
import ProductList from '../components/ProductList';
import OrderList from '../components/OrderList';
import { uploadProfileImage } from '../services/services';
import { Navigate, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import toast CSS
import AllUserList from '../components/AllUserList';
import RevenueManagement from '../components/RevenueManagement';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('list');
  const [products, setProducts] = useState([]);
  const [avatar, setAvatar] = useState(localStorage.getItem("profile_img") || '/avatar.png');
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  console.log('env is ', import.meta.env.VITE_CLOUD_NAME)

  const fileInputRef = useRef(null);

  // Handle Avatar Upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {

      const result = await uploadProfileImage(file);
      console.log('hello world', result)
      const response = await fetch(`${API_BASE_URL}/admin/detail/update/${localStorage.getItem("userId")}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          profile_img: result
        })
      })
      if (response.ok) {
        setAvatar(result)
        toast.success('Avatar uploaded successfully!', {
          autoClose: 5000,
          hideProgressBar: false,
        });
        localStorage.setItem("profile_img", result)

      }
      else {
        toast.error('Failed to update profile image', {
          autoClose: 5000,
          hideProgressBar: false,
        });
      }
    } catch (error) {

      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar.', {
        autoClose: 5000,
        hideProgressBar: false,
      });
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
        const response = await axios.get(API_BASE_URL + '/api/all');
        setProducts(response.data.data || response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to fetch products.', {
          autoClose: 5000,
          hideProgressBar: false,
        });
      }
    };
    fetchProducts();
  }, [navigate]);


  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post(
        API_BASE_URL + '/api/products',
        product
      );
      setProducts([...products, response.data]);

    } catch (error) {
      console.error('Failed to add product:', error);
      toast.error('Failed to add product.', {
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };

  const handleRemoveProduct = async (id) => {

    try {
      await axios.delete(API_BASE_URL + `/api/product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      toast.success('Product deleted successfully', {
        autoClose: 5000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product.', {
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('profile_img');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setTimeout(() => navigate('/'), 0);
  };


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between  mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#ff6b00]">Glamora</h1>
            {/* <span className="text-gray-500">Admin panel</span> */}
          </div>

          {/* Welcome Message */}
          <div className="relative flex flex-col text-right items-end bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-6 rounded-2xl shadow-xl overflow-hidden animate-bounce-in">
            {/* Decorative Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-r from-yellow-400 via-pink-300 to-purple-500 rounded-full blur-3xl opacity-40 animate-pulse" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-500 rounded-full blur-3xl opacity-40 animate-pulse" />
            </div>

            {/* Main Welcome Text */}
            <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">
              Welcome, <span className="text-yellow-300">Admin! 🎉</span>
            </h1>
            <p className="text-sm text-yellow-100 italic tracking-wide mt-1 drop-shadow-md">
              Let’s make today amazing 🌟
            </p>
          </div>

          <style jsx>{`
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(-50px);
    }
    60% {
      opacity: 1;
      transform: scale(1.05) translateY(10px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }
  .animate-bounce-in {
    animation: bounce-in 1s ease-out;
  }
`}</style>


          <img
            src={avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover cursor-pointer border-2 border-green-500"
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
        {/* <UpdateProductUpload onUpdateProduct={handleUpdateProduct} /> */}

        {/* {activeTab === 'add' && <ProductUpload onAddProduct={handleAddProduct} />} */}
        {activeTab === 'list' && (
          <ProductList products={products} onRemoveProduct={handleRemoveProduct} />
        )}
        {activeTab === 'add' && <ProductUpload onAddProduct={handleAddProduct} />}
        {activeTab === 'orders' && <OrderList />}
        {activeTab === 'alluser' && <AllUserList />}
        {activeTab === 'revenueManagement' && <RevenueManagement products={products} />}
        {activeTab === 'logout' && handleLogout()}
      </main>
      <ToastContainer />
    </div>
  );
}
