import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ProductUpload from '../components/ProductUpload';
import ProductList from '../components/ProductList';
import OrderList from '../components/OrderList';
import { uploadProfileImage } from '../services/services';
import { Navigate, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/constant';
import UpdateProductUpload from '../components/UpdateProductUpload';

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
        const response = await axios.get(API_BASE_URL+'/api/products/products');
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
        API_BASE_URL+'/api/products/create-product',
        product
      );
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Failed to add product.');
    }
  };

 
  // Update Product
  const handleUpdateProduct = async (id, updatedProductData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/products/product/${id}`,
        updatedProductData
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? response.data : product
        )
      );
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Failed to update product.');
    }
  };
  
  // const handleUpdateProduct = async (id) => {
  //   try {
  //     const response = await axios.put(
  //       API_BASE_URL+`/api/products/product/${id}`,
  //       product
  //     );
  //     setProducts([...products, response.data]);
  //   } catch (error) {
  //     console.error('Failed to add product:', error);
  //     alert('Failed to add product.');
  //   }
  // };

  const handleRemoveProduct = async (id) => {
    try {
      await axios.delete(API_BASE_URL+`/api/products/${id}`);
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
       {/* <UpdateProductUpload onUpdateProduct={handleUpdateProduct} /> */}

        {activeTab === 'add' && <ProductUpload onAddProduct={handleAddProduct} />}
        {activeTab === 'list' && (
          <ProductList products={products} onRemoveProduct={handleRemoveProduct}  onUpdateProduct={handleUpdateProduct} />
        )}
        {activeTab === 'orders' && <OrderList />}
        {activeTab === 'logout' &&  handleLogout() }
      </main>
    </div>
  );
}
