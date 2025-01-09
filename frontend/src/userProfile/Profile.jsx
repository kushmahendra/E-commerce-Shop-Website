import { useState } from "react"


export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: ""
  })

  return(
    <>
     <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
       
       <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
       <form className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               First Name
             </label>
             <input
               type="text"
               placeholder='Enter your first name'
               value={formData.firstName}
               onChange={(e) => setFormData({...formData, firstName: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Last Name
             </label>
             <input
               type="text"
               placeholder='Enter your last name'
               value={formData.lastName}
               onChange={(e) => setFormData({...formData, lastName: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Email
             </label>
             <input
               type="email"
                placeholder='Enter your email eg. john32@example.com'
               value={formData.email}
               onChange={(e) => setFormData({...formData, email: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Phone
             </label>
             <input
               type="tel"
                placeholder='Enter your phone number +91 234 567 8902'
               value={formData.phone}
               onChange={(e) => setFormData({...formData, phone: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
             />
           </div>
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">
             Bio
           </label>
           <textarea
             value={formData.bio}
           placeholder='write something !'
             onChange={(e) => setFormData({...formData, bio: e.target.value})}
             rows={4}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
           />
         </div>
       </form>
 </div>
    </>
  )

}
