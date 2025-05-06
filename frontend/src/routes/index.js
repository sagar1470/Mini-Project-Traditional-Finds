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
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import CartProduct from "../pages/CartProduct";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import PaidOrder from "../pages/PaidOrder";
import AllPaidOrder from "../pages/AllPaidOrder";
import MyOrder from "../pages/MyOrder";
import AllOrderRequest from "../pages/AllOrderRequest";


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
                path: "product-category",
                element: <CategoryProduct/>
            },
            {
                path: "product/:id",
                element: <ProductDetails/>
            },
            {
                path: "cart-product",
                element: <CartProduct/>
            },
            {
                path: "search",
                element: <SearchProduct/>
            },
            {
                path: "success",
                element: <Success/>
            },
            {
                path: "cancel",
                element: <Cancel/>
            },
            {
                path: "paid-order",
                element: <PaidOrder/>
            },
            {
                path: "myorder",
                element: <MyOrder/>
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
                    {
                        path : "all-paid-order",
                        element: <AllPaidOrder/>
                    },
                    {
                        path : "order-request",
                        element: <AllOrderRequest/>
                    },
                ]
            },
    ]
    },
   
])

export default router