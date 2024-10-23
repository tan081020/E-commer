import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgotpassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllProducts from "../pages/AllProducts";
import AllUsers from "../pages/AllUsers";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children:[
           { 
                path:"",
                element:<Home></Home>
            },
            { 
                path:"Login",
                element:<Login></Login>
            },
            { 
                path:"forgot-password",
                element:<Forgotpassword></Forgotpassword>
            },
            { 
                path:"sign-up",
                element:<SignUp></SignUp>
            },
            { 
                path:"product-category/:categoryName",
                element:<CategoryProduct></CategoryProduct>
            },
            { 
                path:"product/:id",
                element:<ProductDetail></ProductDetail>
            },
            { 
                path:"cart",
                element:<Cart></Cart>
            },
            { 
                path:"search",
                element:<SearchProduct></SearchProduct>
            },
            { 
                path:"admin-panel",
                element:<AdminPanel></AdminPanel>,
                children:[
                    { 
                        path:"all-users",
                        element:<AllUsers></AllUsers>
                    },
                    { 
                        path:"all-products",
                        element:<AllProducts></AllProducts>
                    },
                ]
            },
            
           
        ]
  },
])

export default router 