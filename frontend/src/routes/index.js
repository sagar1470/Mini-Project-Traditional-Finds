import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProduct from "../pages/AllProduct";
import Introduction from "../context/Introduction";


const router = createBrowserRouter([
    {
        path: "introduction",
        element: <Introduction/>
     },
    {
        path: "/",
        element: <App/>,

        children : [
            {
            path: "",
            element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "signup",
                element: <Signup/>
            },
            {
                path: "admin-panel",
                element: <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element: <AllUsers/>
                    },
                    {
                        path : "all-product",
                        element: <AllProduct/>
                    },

                ]
            },

    ]
    },
   
])

export default router