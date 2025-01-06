import { Plus, List, ShoppingCart,LogOut } from 'lucide-react'

export default function Sidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'add', icon: Plus, label: 'Add Items' },
    { id: 'list', icon: List, label: 'List Items' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'logout', icon: LogOut, label: 'Logout' },
  ]

  return (
    <aside className="w-[200px] border-r bg-white">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 w-full p-4 text-left hover:bg-gray-50 transition-colors
            ${activeTab === tab.id ? 'bg-gray-50' : ''}`}
        >
          <tab.icon className="w-5 h-5" />
          <span>{tab.label}</span>
        </button>
      ))}
    </aside>
  )
}

