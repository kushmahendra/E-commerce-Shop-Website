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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        User List
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-3">No.</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">First Name</th>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">User ID</th>
              <th className="px-4 py-3">Email ID</th>
              <th className="px-4 py-3">Phone Number</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b transition duration-200 hover:bg-gray-100"
              >
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={user.profileImage || "/placeholder.svg"}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="px-4 py-3 text-gray-800">{user.firstName}</td>
                <td className="px-4 py-3 text-gray-800">{user.lastName}</td>
                <td className="px-4 py-3 text-gray-800">{user._id}</td>
                <td className="px-4 py-3 text-gray-800">{user.email}</td>
                <td className="px-4 py-3 text-gray-800">{user.phoneNumber}</td>
                <td className="px-4 py-3 text-center text-indigo-500">
                  {user.orders.length}
                </td>
                <td className="px-4 py-3 text-gray-800">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-gray-800">
                  {Array.isArray(user.addresses) ? (
                    user.addresses.map((address, idx) => (
                      <div key={idx} className="mb-2">
                        <p className="font-semibold text-sm text-indigo-600">
                          {address.addressName}
                        </p>
                        <p className="text-sm">{`${address.streetAddress}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`}</p>
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
          <p className="text-center text-gray-500 mt-4">
            No users found. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
