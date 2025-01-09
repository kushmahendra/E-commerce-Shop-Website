"use client"

import { useState } from "react"

export default function Addresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true
    },
    {
      id: 2,
      name: "Office",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      isDefault: false
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    isDefault: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = addresses.length + 1
    setAddresses([...addresses, { ...newAddress, id }])
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      isDefault: false
    })
    setShowAddForm(false)
  }

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(address => address.id !== id))
  }

  const setAsDefault = (id) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })))
  }

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
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
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
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
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
              <div className="flex items-center gap-2">
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
              </div>
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
          {addresses.map((address) => (
            <div key={address.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{address.name}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{address.street}</p>
                  <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                  <p className="text-gray-600">{address.country}</p>
                </div>
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => setAsDefault(address.id)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


