
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
    <ToastContainer />
    <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App

