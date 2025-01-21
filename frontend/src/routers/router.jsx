
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



const router = createBrowserRouter([
 
    {path: "/",element:<App/>,

      children:[
        { path:'/', element:<Home/> },
        {path:'/categories/:categoryName',element: <CategoryPage/>},
        {path:'/search',element:<Search/>},
        {path:"/shop",element:<ShopPage/>},
        {path:'/shop/:id', element:<SingleProduct/>}
             ] 
    },
    
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/> },
    {path:'/forget', element:<ForgetPassword/>},
    {path:'/Otp', element:<OtpWithNewPassword/>},

    {path:'/profile', element:(
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),},
    {path:'/checkout',element:<Checkout/>},
    {path:'/ordered', element:<Ordered/>},
    {path:'/', element:<CartModal/>},
  ]);
  export default router
