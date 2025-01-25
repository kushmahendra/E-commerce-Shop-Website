import { Plus, List, User,ShoppingCart, LogOut } from 'lucide-react';

export default function Sidebar({ activeTab, onTabChange }) {
  const tabs = [
    // { id: 'add', icon: Plus, label: 'Add Items' },
    { id: 'list', icon: List, label: 'List Items' },
    { id: 'add', icon: Plus, label: 'Add Items' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'alluser', icon: User, label: 'UserList' },
    { id: 'logout', icon: LogOut, label: 'Logout' },
  ];

  return (
    <aside className="w-[220px] h-screen bg-gradient-to-b from-purple-600 via-indigo-500 to-blue-400 shadow-lg text-white">
      <h2 className="text-2xl font-bold text-center py-4 border-b border-white/20">🛠️ Dashboard</h2>
      <nav className="flex flex-col mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 px-6 py-3 text-left text-lg font-medium rounded-r-full transition-all duration-300 hover:pl-8
              ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'hover:bg-indigo-500'
              }`}
          >
            <tab.icon
              className={`w-5 h-5 ${
                activeTab === tab.id ? 'text-indigo-600' : 'text-white'
              }`}
            />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
      <footer className="absolute bottom-4 w-full text-center text-sm text-white">
        © 2025 Shop Website
      </footer>
    </aside>
  );
}
