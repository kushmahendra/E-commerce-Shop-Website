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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen)
  }

  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }


  //user dropdown menus
  const userDropDownMenus = [
    { label: 'Dashboard', path: '/adminDashboard' },
    { label: 'profile', path: '/profile' },
    { label: 'Payments', path: '/dashboard/payments' },
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

        <nav className='max-w-screen-2xl bg-[#e0aaff] mx-auto px- flex justify-between items-center px-6 py-4'>
          {/* // <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
    //   <nav className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-4"> */}


          <ul className="flex flex-1 bg-text-blue-700  items-center space-x-4 list-none">
            <li><Link to="/"><span className='hover:text-green-700'>Home</span></Link></li>
            <li><Link to="/shop"><span className='hover:text-green-700'>Shop</span></Link></li>
            <li><Link to="/pages"><span className='hover:text-green-700'>Pages</span></Link></li>
            <li><Link to="/contact"><span className='hover:text-green-700'>Contact</span></Link></li>
          </ul>
          <div className='nav__logo'>
            <Link to='/'>
            <div className="flex flex-row transition duration-150 ease-in-out hover:scale-105">
                <h1 className="text-red-800 font-bold">Click</h1>
                <h1 className="text-blue-800 font-bold">Cart</h1>
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
                    <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                      <ul className='font-medium space-y-4 p-2'>
                        {
                          dropDownMenus.map((menu, index) =>
                          (
                            <li key={index}>
                              <Link onClick={() => setIsDropDownOpen(false)}
                                className='dropdown-items' to={menu.path}>
                                {menu.label}
                              </Link>
                            </li>
                          ))
                        }
                        <li><Link onClick={handleLogout} className='dropdown-items'>Logout</Link></li>
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