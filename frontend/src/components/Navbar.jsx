import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CartModal from '../pages/shop/productDetails/CartModal';
import avatarImg from '../assets/avatar.png'
import { logout } from '../redux/features/auth/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.auth.user);
  console.log('userrrr', user);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [isPagesDropDownOpen, setIsPagesDropDownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen)
  }

  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }

  //page dropdown menus
  const pagesDropDownMenus = [
    { label: 'Delivery', path: '/delivery' },
    { label: 'Terms and conditions', path: '/Terms-and-conditions' },
    { label: 'Our Stores', path: '/stores' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQs', path: '/faqs' },

  ]

  //user dropdown menus
  const userDropDownMenus = [
    // { label: 'Dashboard', path: '/adminDashboard' },
    { label: 'profile', path: '/profile' },
    { label: 'wishList', path: '/wishlist' },
    // { label: 'Payments', path: '/dashboard/payments' },
    { label: 'Orders', path: '/dashboard/orders' },
  ]

  const dropDownMenus = [...userDropDownMenus]

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
      navigate('/')
    } catch (error) {
      console.error("Failed to logout", error)
    }
  }
  return (
    <> <ToastContainer />
      <header className='fixed-nav-bar w-nav'>

        <nav className='max-w-screen-2xl bg-white mx-auto px- flex justify-between items-center px-6 py-4'>
          {/* // <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
    //   <nav className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-4"> */}


          <ul className="flex flex-1 bg-text-blue-700  items-center space-x-8 list-none">
            <li><Link to="/"><span className='hover:text-green-700'>Home</span></Link></li>
            <li><Link to="/shop"><span className='hover:text-green-700'>Products</span></Link></li>
            {/* <li><Link to="/pages"><span className='hover:text-green-700'>Pages</span></Link></li> */}

          
            <li className="relative group">
              <button
                className="flex items-center space-x-2 hover:text-green-700 cursor-pointer"
                onClick={() => setIsPagesDropDownOpen(!isPagesDropDownOpen)}
              >
                <span>Pages</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 transform transition-transform ${isPagesDropDownOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isPagesDropDownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                  onMouseLeave={() => setIsPagesDropDownOpen(false)}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-3">
                    <h3 className="text-lg font-bold">Pages Menu</h3>
                  </div>

                  {/* Menu Items */}
                  <ul className="divide-y divide-gray-100">
                    {pagesDropDownMenus.map((menu, index) => (
                      <li key={index}>
                        <Link
                          to={menu.path}
                          className="flex items-center px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                          onClick={() => setIsPagesDropDownOpen(false)}
                        >
                          <span className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          </span>

                          <span className="text-sm font-medium">{menu.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>


            <li><Link to="/about-us"><span className='hover:text-green-700'>About-Us</span></Link></li>
          </ul>
          <div className='nav__logo'>
            <Link to='/'>
              {/* <div className="flex flex-row transition duration-150 ease-in-out hover:scale-105">
                <h1 className="text-red-800 font-bold">Click</h1>
                <h1 className="text-blue-800 font-bold">Cart</h1>
              </div> */}
              <div className="flex flex-row items-center space-x-2 transform transition-all duration-300 ease-in-out animate-bounce">
                <h1 className="text-red-800 font-bold transition-opacity duration-300 ">Click</h1>
                <h1 className="text-blue-800 font-bold transition-opacity duration-300 ">Cart</h1>
              </div>
            </Link>
            {/* <Link to='/' className='ml-12'><img src={logoImg} alt="logo" className='w-1/12 h-1/4 rounded-lg' /></Link> */}
          </div>
          {/* nav icons */}

          <div className='nav__icons relative'>
            <span>
              <Link to='/search'>
                <i className="ri-search-line bg-text-blue-700"></i>
              </Link>
            </span>
            <span>
              <button onClick={handleCartToggle} className='hover:text-primary'>
                <i className="ri-shopping-bag-line"></i>
                <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{products.length}</sup>
              </button>
            </span>

            <span>
              {user && user ? (<>
                <img onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt="" className='size-6 rounded-full cursor-pointer'
                />
                {
                  isDropDownOpen && (

                    <div className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-3">
                        <h3 className="text-lg font-bold">User Details</h3>
                      </div>

                      {/* Menu Items */}
                      <ul className="divide-y divide-gray-100">
                        {
                          dropDownMenus.map((menu, index) =>
                          (
                            <li key={index}>
                              <Link onClick={() => setIsDropDownOpen(false)}

                                className="flex items-center px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                                to={menu.path}>
                                <span className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mr-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                  </svg>
                                </span>

                                <span className="text-sm font-medium">{menu.label}</span>
                              </Link>
                            </li>
                          ))
                        }
                        <li><Link onClick={handleLogout}


                          className="flex items-center px-5 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-300"
                        >
                          <span className="w-8 h-8 bg-red-100 text-red-600 flex items-center justify-center rounded-full mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 9.75l-4.5 4.5m0 0l-4.5-4.5m4.5 4.5V4.5"
                              />
                            </svg>
                          </span>
                          <span className="text-sm font-medium">Logout</span>

                        </Link></li>
                      </ul>
                    </div>
                  )
                }
              </>) : (<Link to='/login'>
                <i className="ri-user-line"></i> </Link>)
              }

            </span>
          </div>
        </nav>
        {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
      </header>
    </>
  )
}

export default Navbar