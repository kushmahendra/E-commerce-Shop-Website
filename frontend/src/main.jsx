import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router'
import 'remixicon/fonts/remixicon.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 


createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <RouterProvider router={router} />
   <ToastContainer/>
  </Provider>
)                       
