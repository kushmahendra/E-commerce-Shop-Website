import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CartModal from '../pages/shop/productDetails/CartModal';
import avatarImg from '../assets/avatar.png'
import { logout } from '../redux/features/auth/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { Truck, FileText, Store, Mail, HelpCircle, User, Heart, Package } from 'lucide-react';
import { useGetSingleCartQuery } from '../redux/features/cart/cartApi';
import { setProducts } from '../redux/features/cart/cartSlice';


const Navbar = () => {
  const user22 = JSON.parse(localStorage.getItem("user"));


   // Fetch cart data using the user's ID
  const { data: cartData, isLoading, isError } = useGetSingleCartQuery(user22?._id);
  const dispatch = useDispatch();
  
  // Define items after fetching cartData
  const items = cartData?.items || [];



  // Log the data to see the structure of the response
  useEffect(() => {
    if (items) {
      dispatch(setProducts(items))

    }
  }, [items]);
  

  const user = useSelector((state) => state.auth.user);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [isPagesDropDownOpen, setIsPagesDropDownOpen] = useState(false);

 
  const navigate = useNavigate();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen)
  }

  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }

  //page dropdown menus


  const pagesDropDownMenus = [
    { label: 'Delivery', path: '/delivery', icon: <Truck className="w-5 h-5" /> },
    { label: 'Terms and conditions', path: '/Terms-and-conditions', icon: <FileText className="w-5 h-5" /> },
    { label: 'Our Stores', path: '/stores', icon: <Store className="w-5 h-5" /> },
    { label: 'Contact Us', path: '/contact', icon: <Mail className="w-5 h-5" /> },
    { label: 'FAQs', path: '/faqs', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  //user dropdown menus
  const userDropDownMenus = [
    { label: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
    { label: 'WishList', path: '/wishlist', icon: <Heart className="w-5 h-5" /> },
    { label: 'Orders', path: '/dashboard/orders', icon: <Package className="w-5 h-5" /> },
  ];
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
    <>
    
      {/* <header className='fixed-nav-bar z-50  w-nav'></header> */}
      <header className='fixed top-0 left-0 w-full z-50  w-nav'>
        <nav className='max-w-full bg-white  flex justify-between items-center py-4'>

        {/* <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-all duration-300">
        <nav className="max-w-screen-2xl mx-auto px-6 flex justify-between items-center py-4"> */}


          <ul className="flex flex-1 bg-text-blue-700  items-center space-x-8 list-none">
            <li><Link to="/"><span className='hover:text-green-700'>Home</span></Link></li>
            <li><Link to="/shop"><span className='hover:text-green-700'>Products</span></Link></li>
            {/* <li><Link to="/test"><span className='hover:text-green-700'>Test</span></Link></li> */}
            {/* <li><Link to="/pages"><span className='hover:text-green-700'>Pages</span></Link></li> */}


            <li className="relative group" >
              <button
                className="flex items-center space-x-2 hover:text-green-700 cursor-pointer"
                onClick={() => setIsPagesDropDownOpen(!isPagesDropDownOpen)}
              // onMouseEnter={() => setIsPagesDropDownOpen(true)}
              >
                {/* <span >Pages</span> */}
                Pages
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
                  <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 text-white px-4 py-3">
                    <h3 className="text-lg font-bold"></h3>
                  </div>

                  {/* Menu Items */}
                  <ul className="divide-y divide-gray-100">
                    {pagesDropDownMenus.map((menu, index) => (
                      <li key={index}>
                        <Link
                          to={menu.path}
                          className="flex items-center px-5 py-3 text-gray-700 hover:bg-blue-50  hover:text-red-600  transition-colors duration-300"
                          onClick={() => setIsPagesDropDownOpen(false)}
                        // onMouseEnter={() => setIsPagesDropDownOpen(true)}
                        // onMouseLeave={() => setIsPagesDropDownOpen(false)}
                        >
                          <span className="w-8 h-8 flex items-center justify-center rounded- mr-3">
                            {menu.icon}
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
                {/* <h1 className="text-red-800 font-bold transition-opacity duration-300 ">Click</h1>
                <h1 className="text-blue-800 font-bold transition-opacity duration-300 ">Cart</h1> */}
                <h1 className="text-green-800 font-bold transition-opacity duration-300 ">Fashion</h1>
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
                {/* <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{products.length}</sup> */}
                <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{items?.length || 0}</sup>
              </button>
            </span>


            <div className="relative" >
              {user && user ? (<>
                <img onClick={handleDropDownToggle}
                  onMouseEnter={() => setIsDropDownOpen(true)}
                  src={user?.profileImage || avatarImg}
                  alt="" className='size-6 rounded-full cursor-pointer'
                />

                {isDropDownOpen && (
                  <div className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    onMouseEnter={() => setIsDropDownOpen(true)} // Keep it open when hovering over dropdown
                    onMouseLeave={() => setIsDropDownOpen(false)} // Close when mouse leaves dropdown        
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-yellow-100 via-red-100 to-orange-100 text-white px-4 py-3">
                      <h3 className="text-lg font-bold"></h3>
                    </div>

                    {/* Menu Items */}
                    <ul className="divide-y divide-gray-100">
                      {userDropDownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="flex items-center px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-red-600 transition-colors duration-300"
                            to={menu.path}
                          >
                            <span className="w-8 h-8  flex items-center justify-center rounded-full mr-3">
                              {menu.icon}
                            </span>
                            <span className="text-sm font-medium">{menu.label}</span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          onClick={handleLogout}
                          // className="flex items-center px-5 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-300"
                          className="flex items-center px-5 py-3 text-gray-700 hover:text-red-600 transition-colors duration-300"
                        >
                          <span className="w-8 h-8  flex items-center justify-center  mr-3">
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
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>) : (<Link to='/login'>
                <i className="ri-user-line"></i> </Link>)
              }

            </div>
          </div>
        </nav>
        {/* {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />} */}
        {isCartOpen && <CartModal products={items} isOpen={isCartOpen} onClose={handleCartToggle} />}
      </header>
    </>
  )

}

export default Navbar