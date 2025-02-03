import { Package, ShoppingBag, DollarSign, Users, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react";
import axios from 'axios'
import { API_BASE_URL } from "../../constants/constant";
import { format } from "date-fns"; // Helps format dates easily

const monthlyData = {
  income: [42000, 45678, 41200, 38900, 52300, 45678, 48000, 51000, 49500, 53200, 50100, 55000],
  orders: [789, 856, 743, 890, 743, 856, 920, 880, 910, 850, 945, 980],
  products: [1150, 1234, 1180, 1220, 1195, 1234, 1300, 1280, 1350, 1290, 1400, 1450],
  newUsers: [120, 145, 132, 150, 180, 165, 210, 190, 205, 220, 240, 255],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
}

export default function RevenueManagement({ products }) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/orders`);
        console.log('order response', response);

        setOrders(response?.data || []); // Ensure users array is set correctly
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  // Calculate total revenue
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  console.log('pdinfo', products);

  // Helper function to get percentage change
  const getPercentageChange = (current, previous) => {
    const change = ((current - previous) / previous) * 100
    return change.toFixed(1)
  }

  // Helper function to render a graph
  const renderGraph = (data, color, maxValue) => (
    <div className="h-64 flex items-end gap-2">
      {data.map((value, index) => (
        <div key={index} className="flex-1 flex flex-col items-center group">
          <div className="relative w-full">
            <div
              className={`w-full bg-${color}-100 rounded-sm transition-all duration-300 group-hover:bg-${color}-200`}
              style={{
                height: `${(value / maxValue) * 200}px`,
              }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              {value}
            </div>
          </div>
          <span className="text-xs text-gray-500 mt-2">{monthlyData.months[index]}</span>
        </div>
      ))}
    </div>
  )

//monthly calculated
  const calculateMonthlyRevenue = (orders, targetMonth, targetYear) => {
    return orders
      .filter((order) => {
        const orderDate = new Date(order.orderDate);
        return (
          orderDate.getMonth() === targetMonth && orderDate.getFullYear() === targetYear
        );
      })
      .reduce((total, order) => total + (order.totalAmount || 0), 0);
  };
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyRevenue = calculateMonthlyRevenue(orders, currentMonth, currentYear);


  console.log("Total Revenue:", totalRevenue);
  console.log("Monthly Revenue:", monthlyRevenue);

  return (
    <div className="p-6 max-w-7xl mx-auto mt-20 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="font-bold text-2xl">Revenue Management</h1>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Total Products</span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold">{products?.length || 0}</h3>
            <p className="text-sm text-gray-500 mt-1">+3 new today</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Total Orders</span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold"> {orders?.length || 0}</h3>
            <p className="text-sm text-gray-500 mt-1">7 pending approval</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Total Revenue</span>
          </div>
          <div className="mt-4">

            <h3 className="text-3xl font-bold ">${totalRevenue?.toFixed(2)}</h3>
            <p className="text-sm text-green-500 mt-1">+8% from last month</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-gray-500">Active Users</span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold">2,345</h3>
            <p className="text-sm text-gray-500 mt-1">128 currently online</p>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income Graph */}
        {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Monthly Income</h3>
              <p className="text-sm text-gray-500">Last 12 months</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">
                +{getPercentageChange(monthlyData.income[11], monthlyData.income[10])}%
              </span>
            </div>
          </div>
          {renderGraph(monthlyData.income, "blue", 55000)}
        </div> */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className="text-lg font-semibold">Monthly Income</h3>
        <p className="text-sm text-gray-500">Last 12 months</p>
      </div>
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-green-500" />
        <span className="text-sm text-green-500">
          {/* Use the percentage change between current and previous month */}
          +{getPercentageChange(monthlyRevenue, calculateMonthlyRevenue(orders, currentMonth - 1, currentYear))}%
        </span>
      </div>
    </div>
    {/* Render the graph with the monthly revenue data */}
    {renderGraph([monthlyRevenue], "blue", 55000)} {/* Only current month's data */}
  </div>

        {/* Monthly Orders Graph */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Monthly Orders</h3>
              <p className="text-sm text-gray-500">Last 12 months</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">
                +{getPercentageChange(monthlyData.orders[11], monthlyData.orders[10])}%
              </span>
            </div>
          </div>
          {renderGraph(monthlyData.orders, "purple", 1000)}
        </div>

        {/* Monthly Products Graph */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Monthly Products</h3>
              <p className="text-sm text-gray-500">Last 12 months</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">
                +{getPercentageChange(monthlyData.products[11], monthlyData.products[10])}%
              </span>
            </div>
          </div>
          {renderGraph(monthlyData.products, "green", 1500)}
        </div>

        {/* Monthly New Users Graph */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">New Users</h3>
              <p className="text-sm text-gray-500">Last 12 months</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">
                +{getPercentageChange(monthlyData.newUsers[11], monthlyData.newUsers[10])}%
              </span>
            </div>
          </div>
          {renderGraph(monthlyData.newUsers, "orange", 300)}
        </div>
      </div>
    </div>
  )
}

