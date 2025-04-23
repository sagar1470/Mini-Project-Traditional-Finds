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

export default router
