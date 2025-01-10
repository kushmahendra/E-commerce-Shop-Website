// import { useEffect, useState } from "react";
// import { useGetUserMutation } from "../redux/features/auth/authApi";

// export default function Profile() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     bio: "",
//     image: null,
//   });

//   // Retrieve the user ID from localStorage
//   const userString = localStorage.getItem("user");
//   const localUser = userString ? JSON.parse(userString) : null;
//   const userId = localUser?._id;
//   console.log("User ID:", userId);

//   // Initialize the mutation hook
//   const [getUser, { data, isLoading, isError, error }] = useGetUserMutation();

//   // Fetch user data on component mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await getUser(userId).unwrap();
//         console.log('response',response);
//         setFormData({
//           firstName: response?.user?.firstName || "",
//           lastName: response?.user?.lastName || "",
//           email: response?.user?.email || "",
//           phoneNumber: response?.user?.phoneNumber || "",
//           bio: response?.user?.bio || "",
//           image: response?.user?.profileImage || null,
//         });
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       }
//     };

//     if (userId) {
//       fetchUser();
//     }
//   }, [userId, getUser]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching user data: {error?.data?.message || error.message}</div>;
//   }

//   return (
//     <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
//       <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
//       <form className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               First Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter first name"
//               value={formData.firstName}
//               onChange={(e) =>
//                 setFormData({ ...formData, firstName: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Last Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter last name"
//               value={formData.lastName}
//               onChange={(e) =>
//                 setFormData({ ...formData, lastName: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter email e.g. john32@example.com"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone
//             </label>
//             <input
//               type="tel"
//               placeholder="Enter phone number +91 234 567 8902"
//               value={formData.phoneNumber}
//               onChange={(e) =>
//                 setFormData({ ...formData, phoneNumber: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Bio
//           </label>
//           <textarea
//             value={formData.bio}
//             placeholder="Write something!"
//             onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//             rows={4}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//         </div>
//       </form>
//     </div>
//   );
// }
