
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgetPassword from "../components/ForgetPassword";
import OtpWithNewPassword from "../components/OtpWithNewPassword";
import UserProfile from "../userProfile/UserProfile";
import Checkout from "../pages/shop/productDetails/Checkout";
import ProtectedRoute from "../components/ProtectedRoute";
import CartModal from "../pages/shop/productDetails/CartModal";
import Ordered from "../pages/shop/productDetails/Ordered";
import ContactPage from "../components/ContactPage";
// import PaymentPage from "../userProfile/PaymentPage";
import Orders from "../userProfile/Orders";
import WishList from "../userProfile/WishList";
import SinglePageProduct from "../pages/shop/productDetails/SinglePageProduct";
import AboutUs from "../components/AboutUs";
import TermsAndConditions from "../components/TermsAndConditions";
import DeliveryPage from "../components/DeliveryPage";
import Stores from "../components/Stores";
import Faqs from "../components/Faqs";



const router = createBrowserRouter([

  {
    path: "/", element: <App />,

    children: [
      { path: '/', element: <Home /> },
      { path: '/categories/:categoryName', element: 
      
        (
          <ProtectedRoute>
        <CategoryPage />
          </ProtectedRoute>
        ),
    },
    
      {
        path: '/search', element:
          (
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          ),
      },
      { path: "/shop", element: 
        (
          <ProtectedRoute>
             <ShopPage />
          </ProtectedRoute>
        ),
 },
      {
        path: '/shop/:id', element:
          (
            <ProtectedRoute>
              <SingleProduct />
            </ProtectedRoute>
          ),
      },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/terms-and-conditions", element: <TermsAndConditions /> },
      { path: "/delivery", element: <DeliveryPage /> },
      { path: "/stores", element: <Stores /> },
      { path: "faqs", element: <Faqs /> },

s
      {
        path: '/profile', element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist", element:
          (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
      },
      {
        path: '/checkout', element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: '/ordered', element: (
          <ProtectedRoute>
            <Ordered />
          </ProtectedRoute>
        ),
      },

      {
        path: "/dashboard/orders", element:

          (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
      },

    ]
  },

  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forget', element: <ForgetPassword /> },
  { path: '/Otp', element: <OtpWithNewPassword /> },




  { path: '/', element: 
    (
      <ProtectedRoute>
        <CartModal /> 
      </ProtectedRoute>
    ),
 },

  // {path:"/dashboard/payments" , element:<PaymentPage/>},


  { path: "/pages", element: <SinglePageProduct /> },

]);
export default router
