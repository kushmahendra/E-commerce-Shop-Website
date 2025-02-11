// import { useState } from 'react';
// import { useSelector } from 'react-redux';

// export default function PlaceHolder() {

//   const addresses = useSelector((state)=>state.auth.addresses)
//   console.log('fhjsf',addresses )
//   const [formData, setFormData] = useState({
//     // firstName: '',
//     // lastName: '',
//     // email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     // phone: '',
//   });


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     setFormData({
//       // firstName: '',
//       // lastName: '',
//       // email: '',
//       street: '',
//       city: '',
//       state: '',
//       zipcode: '',
//       country: '',
//       // phone: '',
//     });
//   };

//   return (
//     <div className="max-w-xl   bg-red-50 rounded-xl shadow-md overflow-hidden">
//       {/* Header */}
//       <div className="bg-red-500 p-6">
//         <h2 className="text-2xl font-bold text-white"> Address </h2>
//         {/* <p className="text-indigo-100 mt-1">
//           Enter your details to complete the delivery process.
//         </p> */}
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="p-6 space-y-6">
//         {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 "> */}

//           {/* <div>

//             <input
//               type="text"
//               name="firstName"
//               placeholder="First name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>

//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div>

//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div> */}

//         <div>

//           <input
//             type="text"
//             name="street"
//             placeholder="Street"
//             value={formData.street}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>

//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>

//             <input
//               type="text"
//               name="state"
//               placeholder="State"
//               value={formData.state}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>

//             <input
//               type="text"
//               name="zipcode"
//               placeholder="Zipcode"
//               value={formData.zipcode}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>

//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={formData.country}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* <div>

//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div> */}


//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
//         >
//           Select Address
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useSelector } from "react-redux";

export default function PlaceHolder() {
  const addresses = useSelector((state) => state.auth.addresses);

  const [formData, setFormData] = useState({
    address:"",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressSelect = (address) => {
    setFormData({
      address:address.addressName,
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-xl bg-red-50 rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-red-500 p-6">
        <h2 className="text-2xl font-bold text-white">Address</h2>
      </div>

      {/* Form */}
      <form className="p-6 space-y-6">
      <div>
          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Select Address Button */}
        <button
          type="button"
          onClick={() => setIsPopupOpen(true)}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Select Address
        </button>
      </form>

      {/* Address Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800  bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-98">
            <h2 className="text-xl font-bold mb-4">Select an Address</h2>
            <ul className="space-y-2">
              {addresses.map((address, index) => (
                <div className="flex flex-row gap-2">
                  <div className="font-semibold px-4 pt-2 border bg-yellow-100 text-center">{index + 1} </div>
                  <li
                    key={index}
                    className="p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => handleAddressSelect(address)}

                  >
                    {address.addressName}: {address.streetAddress}, {address.city}, {address.state}, {address.zipCode}, {address.country}

                  </li>
                </div>
              ))}
            </ul>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
