// import { useState } from 'react';

// export default function PlaceHolder() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: '',
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
//       firstName: '',
//       lastName: '',
//       email: '',
//       street: '',
//       city: '',
//       state: '',
//       zipcode: '',
//       country: '',
//       phone: '',
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto  bg-yellow-100 rounded-xl shadow-md overflow-hidden">
//       {/* Header */}
//       <div className="bg-red-500 p-6">
//         <h2 className="text-2xl font-bold text-white">Delivery Information</h2>
//         {/* <p className="text-indigo-100 mt-1">
//           Enter your details to complete the delivery process.
//         </p> */}
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="p-6 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
//           <div>
         
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
//         </div>

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

//         <div>
       
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>


//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
//         >
//           Submit Delivery Info
//         </button>
//       </form>
//     </div>
//   );
// }
