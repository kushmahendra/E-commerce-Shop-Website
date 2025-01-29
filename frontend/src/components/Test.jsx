"use client"

import { useState } from "react"

export default function Test() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")

  const metrics = [
    {
      title: "Total Reservations",
      value: "24",
      subtext: "+2 from yesterday",
    },
    {
      title: "Pending Approval",
      value: "7",
      subtext: "Requires attention",
    },
    {
      title: "Check-ins Today",
      value: "5",
      subtext: "3 already processed",
    },
    {
      title: "Revenue",
      value: "$12,450",
      subtext: "+10% from last month",
      isRevenue: true,
    },
  ]

  const reservations = [
    {
      id: "RES-001",
      guest: {
        name: "John Smith",
        email: "john@example.com",
      },
      checkIn: "Jan 25, 2024",
      roomType: "Deluxe Suite",
      amount: "$599",
      status: "Pending",
    },
    {
      id: "RES-002",
      guest: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
      },
      checkIn: "Feb 14, 2024",
      roomType: "Standard Double",
      amount: "$299",
      status: "Approved",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 mt-20 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservation Management</h1>
          <p className="text-gray-500">Manage and process guest reservations</p>
        </div>
        <div className="relative">
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            2
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium mb-2">{metric.title}</h3>
            <p className="text-3xl font-bold mb-2">{metric.value}</p>
            <p className={`text-sm ${metric.isRevenue ? "text-green-500" : "text-gray-500"}`}>{metric.subtext}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search reservations..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reservation ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-in
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{reservation.guest.name}</div>
                  <div className="text-sm text-gray-500">{reservation.guest.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.checkIn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.roomType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${reservation.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                  >
                    {reservation.status} ▼
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                  <button className="font-medium">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

