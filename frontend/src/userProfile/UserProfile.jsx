import { useEffect, useState } from "react";
import { useGetUserMutation, useUpdateUserInfoMutation } from "../redux/features/auth/authApi";

import Orders from "./Orders";
import WishList from "./WishList";
import Addresses from "./Addresses";

import { Upload } from 'lucide-react';

import { uploadProfileImage } from '../services/services';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddress } from "../redux/features/auth/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserProfile() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    image: null,
  });

  
  const [activeComponent, setActiveComponent] = useState('');
  const [other, setOther] = useState(true)

  const [imagePreview, setImagePreview] = useState(null); // Store image preview
  const [uploading, setUploading] = useState(false); // Upload state
  const [getUser, { data, isLoading, isError, error }] = useGetUserMutation();
  const dispatch = useDispatch();
  const [updateUserInfo, { isLoading: isUpdating, isSuccess, isError: isUpdateError }] = useUpdateUserInfoMutation();

  // Retrieve the user ID from localStorage
  const userString = localStorage.getItem("user");
  const localUser = userString ? JSON.parse(userString) : null;
  const userId = localUser?._id;
  console.log("User ID:", userId);

  // Fetch user data on component mount

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId).unwrap();
        console.log('response', response);
        setFormData({
          firstName: response?.user?.firstName || "",
          lastName: response?.user?.lastName || "",
          email: response?.user?.email || "",
          phoneNumber: response?.user?.phoneNumber || "",
          bio: response?.user?.bio || "",
          image: response?.user?.profileImage || null,
        });
        dispatch(setAddress(response.user.addresses))
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, getUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data: {error?.data?.message || error.message}</div>;
  }

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true); // Start upload state
      try {
        const result = await uploadProfileImage(file);
        console.log('Image uploaded:', result);

        setFormData((prevData) => ({
          ...prevData,
          image: result,
        }));
        setImagePreview(result);
        // alert('Image uploaded successfully!');
        toast.success("Image uploaded successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        // alert('Failed to upload image');
        toast.error("Failed to upload image", {
          position: "top-right",
          autoClose: 3000, // Duration in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light", // Options: 'light', 'dark', 'colored'
        });
      } finally {
        setUploading(false); // End upload state
      }
    }
  };

  // Update User Profile Logic


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserInfo({
        userId,
        profileImage: formData?.image,
        bio: formData?.bio,
        profession: formData?.profession,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        phoneNumber: formData?.phoneNumber,
      }).unwrap();
      // alert("Profile updated successfully!");
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      // alert("Failed to update profile");
      toast.error("Failed to update profile", {
        position: "top-right",
        autoClose: 3000, // Duration in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // Options: 'light', 'dark', 'colored'
      });
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'orders':
        return <Orders />;
      case 'wishList':
        return <WishList />;
      case 'addresses':
        return <Addresses />;
      default:
        return null;
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   navigate('/')
  // }

  const handleBack=()=>
  {
    navigate('/')
  }

  return (<>
    <ToastContainer />
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center">


              <div className="w-28 h-28 bg-purple-200 rounded-full overflow-hidden">

                <label htmlFor="file-upload" className="cursor-pointer">
                  {imagePreview || formData.image ? (
                    <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-lg border border-gray-200">
                      <img
                        src={imagePreview || formData.image}
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

              <h2 className="text-xl font-semibold">
                {formData?.firstName ? `${formData?.firstName} ${formData?.lastName || ""}` : "User Name"}
              </h2>
            </div>

            {/* Main */}
            <nav className="space-y-2 grid grid-cols-1 gap-1">
              {/* <button onClick={() => setActiveComponent('profile')}  className="flex items-center px-4 py-2 text-gray-600  */}
              <button onClick={() => setOther(true)} className="flex items-center px-4 py-2 text-gray-600 
              hover:text-green-800 hover:bg-yellow-100  rounded-md">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
              {/* <button onClick={()=> setOther(!other)}  className="flex items-center px-4 py-2 text-gray-600   hover:text-green-800 hover:bg-yellow-100 rounded-md" >
                  Other
               </button> */}
              <button onClick={() => { setActiveComponent('orders'); setOther(false) }} className="flex items-center px-4 py-2 text-gray-600   hover:text-green-800 hover:bg-yellow-100 rounded-md">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Orders
              </button>

              <button onClick={() => { setActiveComponent('wishList'); setOther(false) }} className="flex items-center px-4 py-2 text-gray-600  hover:text-green-800 hover:bg-yellow-100  rounded-md">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Wishlist
              </button>

              <button onClick={() => { setActiveComponent('addresses'); setOther(false) }} className="flex items-center px-4 py-2 text-gray-600  hover:text-green-800 hover:bg-yellow-100 rounded-md">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Addresses
              </button>

              <button onClick={handleBack} className="flex items-center px-4 py-2 text-gray-600  hover:text-green-800 hover:bg-yellow-100 rounded-md" >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l9-9m0 0l9 9m-9-9v18"
                  />
                </svg>

                Home
              </button>

              {/* <button onClick={handleLogout} className="flex items-center px-4 py-2 text-gray-600  hover:text-green-800 hover:bg-yellow-100 rounded-md" >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                  />
                </svg>
                Logout
              </button> */}
            </nav>
          </div>
          {/* //my profile */}

          {other ? (
            <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email e.g. john32@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number +91 234 567 8902"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    placeholder="Write something!"
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`px-6 py-2 ${isUpdating ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-md`}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Updating...' : 'Update Profile'}
                    </button>
                  </div>
                </div>

              </form>

            </div>) : (
            renderComponent()
          )
          }
         
        </div>
      </div>
    </div>

  </>
  )
}

