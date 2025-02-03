import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/constant";
import axios from "axios";

export default function AllUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/allusers`);
        setUsers(response.data.users || []); // Ensure users array is set correctly
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  console.log('allusersss',users)

  return (
  <>
    {/* // <div className="container mx-auto p-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-xl"> */}
      <h1 className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500">
        User List
      </h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-xl p-4">
        <table className="min-w-full table-auto text-gray-800">
          <thead className="bg-green-600 text-white rounded-t-lg">
            <tr>
              <th className="px-6 py-4 text-center">No.</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              {/* <th className="px-6 py-4">Last Name</th> */}
              <th className="px-6 py-4">User ID</th>
              <th className="px-6 py-4">Email ID</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Orders</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-100 transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={user.profileImage || "/placeholder.svg"}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-green-500 shadow-lg"
                  />
                </td>
                <td className="px-6 py-4 text-blue-700">{user.firstName} {user.lastName}</td>
                {/* <td className="px-6 py-4 text-blue-700">{user.lastName}</td> */}
                <td className="px-6 py-4 text-purple-700">{user._id}</td>
                <td className="px-6 py-4 text-green-600">{user.email}</td>
                <td className="px-6 py-4 text-orange-600">{user.phoneNumber}</td>
                <td className="px-6 py-4 text-center text-red-500">
                  {user.orders.length}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {Array.isArray(user.addresses) ? (
                    user.addresses.map((address, idx) => (
                      <div key={idx} className="mb-3">
                        <p className="font-semibold text-sm text-indigo-600">
                          {address.addressName}
                        </p>
                        <p className="text-sm text-gray-800">
                          {`${address.streetAddress}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`}
                        </p>
                       
                          {/* <p className="font-semibold text-lg text-indigo-700">
                       
                            <span>     {address.addressName} ,{address.streetAddress},</span>

                            <span className="text-blue-500">{address.city}, {address.state},</span>

                         <span className="text-red-500">{address.zipCode}, {address.country}</span></p> */}

                      </div>
                    ))
                  ) : (
                    <span className="italic text-gray-500">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No users found. Please try again later.</p>
        )}
      {/* </div> */}
    </div>
    </>
  );
}  
