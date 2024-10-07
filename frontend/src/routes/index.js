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