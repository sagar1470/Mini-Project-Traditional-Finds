import express from "express";
import userSignUpController from "../controller/user/userSignUp.js";
import userSignInController from "../controller/user/userSignin.js";
import userDetailsController from "../controller/user/userDetails.js"
import authToken from "../middleware/authToken.js";
import userLogout from "../controller/user/userLogout.js";
import allUser from "../controller/user/allUser.js";
import updateUser from "../controller/user/updateUser.js";
import UploadProductController from "../controller/product/uploadProduct.js";
import getProductController from "../controller/product/getProduct.js";
import updateProductController from "../controller/product/updateProduct.js";
import getCategoryProduct from "../controller/product/getCategoryProductOne.js";
import getCategoryWiseProduct from "../controller/product/getCategoryWiseProduct.js";
import getProductDetails from "../controller/product/getProductDetails.js";
import addCartController from "../controller/user/addCartController.js";
import countCartProduct from "../controller/user/countCartProduct.js";
import DisplayingAddedCartProduct from "../controller/user/DisplayingAddedCartProduct.js";
import UpdateAddToCart from "../controller/user/UpdateAddToCart.js";
import deleteAddToCartProduct from "../controller/user/deleteAddToCartProduct.js";
import SearchProduct from "../controller/product/searchProduct.js";
import filterProduct from "../controller/product/filterProduct.js";
import paymentController from "../controller/order/paymentController.js";
import webhooks from "../controller/order/webhooks.js";
import orderController from "../controller/order/orderController.js";
import allOrderController from "../controller/order/allorderController.js";
import orderRequestController from "../controller/order/orderRequestController.js";
import myOrder from "../controller/order/myOrderController.js";
import myOrderController from "../controller/order/myOrderController.js";
import allOrderRequestController from "../controller/order/allOrderRequestController.js";



const router = express.Router()

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/logout", userLogout)

// admin panel
router.get("/all-user",authToken, allUser)
router.post("/update-user",authToken, updateUser)

// product
router.post("/upload-product",authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", SearchProduct)
router.post("/filter-product", filterProduct)

// product cart added
router.post("/add-to-cart", authToken, addCartController)
router.get("/count-cart-product", authToken, countCartProduct)
router.get("/display-added-cart-product", authToken, DisplayingAddedCartProduct)
router.post("/update-add-to-cart", authToken, UpdateAddToCart)
router.post("/delete-add-to-cart-product", authToken, deleteAddToCartProduct)


// payment and order
router.post("/checkout", authToken, paymentController)
router.post("/webhook", webhooks) // api/webhook
router.get("/order-list", authToken, orderController)
router.get("/all-order", authToken, allOrderController)
router.post('/order-request', authToken, orderRequestController)
router.get('/myorder',authToken, myOrderController)
router.get('/all-order-request', authToken, allOrderRequestController)


export default router
