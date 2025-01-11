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

export default function Dashboard() {
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
            const response = await fetch(`${API_BASE_URL}/admin/detail/update/${localStorage.getItem("userId")}`,{
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
              toast.success('Avatar uploaded successfully!', {
                autoClose: 5000,
                hideProgressBar: false,
              });
              localStorage.setItem("profile_img",result)

            }
            else{
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
        const response = await axios.get(API_BASE_URL+'/api/all');
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
        API_BASE_URL+'/api/products',
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
      await axios.delete(API_BASE_URL+`/api/product/${id}`);
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
       {/* <UpdateProductUpload onUpdateProduct={handleUpdateProduct} /> */}

        {activeTab === 'add' && <ProductUpload onAddProduct={handleAddProduct} />}
        {activeTab === 'list' && (
          <ProductList products={products} onRemoveProduct={handleRemoveProduct}   />
        )}
        {activeTab === 'orders' && <OrderList />}
        {activeTab === 'logout' &&  handleLogout() }
      </main>
      <ToastContainer />
    </div>
  );
}
