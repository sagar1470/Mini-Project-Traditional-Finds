import express from "express";
import userSignUpController from "../controller/userSignUp.js";
import userSignInController from "../controller/userSignin.js";
import userDetailsController from "../controller/userDetails.js";
import authToken from "../middleware/authToken.js";
import userLogout from "../controller/userLogout.js";
import allUser from "../controller/allUser.js";
import updateUser from "../controller/updateUser.js";
import UploadProductController from "../controller/uploadProduct.js";
import getProductController from "../controller/getProduct.js";
import updateProductController from "../controller/updateProduct.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogout)

// admin panel
router.get("/all-user",authToken, allUser)
router.post("/update-user",authToken, updateUser)

// product
router.post("/upload-product",authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)

export default router;
