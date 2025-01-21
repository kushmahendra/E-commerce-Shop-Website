
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetSingleUserQuery,  useUpdateUserInfoMutation } from "../redux/features/auth/authApi";
import { setAddress } from "../redux/features/auth/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Addresses() {
  const addresses = useSelector((state)=>state.auth.addresses)
  // console.log('fhjsf',add)
  const user = useSelector((state) => state.auth.user); 

  
  // const [addresses, setAddresses] = useState(add)
  const [showAddForm, setShowAddForm] = useState(false)
  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState({
  
    addressName:"",
    streetAddress:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    isDefault:true
  })
 
  const [updateUserInfo, { isLoading: isUpdating }] = useUpdateUserInfoMutation();
 

  const handleSubmit =async (e) => {
    e.preventDefault()
    const id = addresses.length + 1
    const updatedAddresses = [...addresses, { ...newAddress }];
    console.log("update", updatedAddresses);
    
    // setAddresses(updatedAddresses);
    dispatch(setAddress(updatedAddresses))
    
    try {
      await updateUserInfo({ userId: user._id, addresses: updatedAddresses }).unwrap();
      setNewAddress({
        addressName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        isDefault:true
      });
      setShowAddForm(false);
      toast.success("Address save successfully.", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Faile to save address ", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
    }
  }
  

  const deleteAddress = async (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    // setAddresses(updatedAddresses);
    dispatch(setAddress(updatedAddresses))
    
    try {
      // Update the backend with the modified addresses
      await updateUserInfo({ userId: user._id, addresses: updatedAddresses }).unwrap();
      // console.log("Address deleted successfully.");
      toast.success("Address deleted successfully.", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to Address deleted ", {
        position: "top-right",
        autoClose: 3000, // Time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // 'light', 'dark', or 'colored'
      });
    }
  };

  // const setAsDefault = (id) => {
  //   setAddresses(addresses.map(address => ({
  //     ...address,
  //     isDefault: address.id === id
  //   })))
  // }
  
  return (
    // <div className="min-h-screen bg-gray-50 p-4 md:p-8">
    <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">My Addresses</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Address
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Add New Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.addressName}
                    onChange={(e) => setNewAddress({...newAddress, addressName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.streetAddress}
                    onChange={(e) => setNewAddress({...newAddress,  streetAddress: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              {/* <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <label htmlFor="isDefault" className="text-sm text-gray-700">
                  Set as default address
                </label>
              </div> */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {addresses?.map((address,index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{address.addressName}</h3>
                    {/* {address.isDefault && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Default
                      </span>
                    )} */}
                  </div>
                  <p className="text-gray-600">{address.streetAddress }</p>
                  <p className="text-gray-600">{address.city},   {address.state},   {address.zipCode }</p>
                  <p className="text-gray-600">{address.country}</p>
                </div>
                <div className="flex gap-2">
                  {/* {!address.isDefault  && (
                    <button
                      onClick={() => setAsDefault(address.id)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Set as Default
                    </button>
                  )} */}
                  <button
                    onClick={() => deleteAddress(index)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}


