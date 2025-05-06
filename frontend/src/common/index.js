
const backendDomain = "http://localhost:8000"

const SummaryApi = {
    Signup : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    SignIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout : {
        url: `${backendDomain}/api/logout`,
        method: "get"
    },
    AllUser : {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser : {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct : {
         url: `${backendDomain}/api/upload-product`,
         method: "post"
    },
    allProduct : {
         url: `${backendDomain}/api/get-product`,
         method: "get"
    },
    updateProduct : {
         url: `${backendDomain}/api/update-product`,
         method: "post"
    },
    categoryProduct : {
         url: `${backendDomain}/api/get-categoryProduct`,
         method: "get"
    },
    categoryWiseProduct : {
         url: `${backendDomain}/api/category-product`,
         method: "post"
    },
    productDetails : {
         url: `${backendDomain}/api/product-details`,
         method: "post"
    },
    addToCartProduct : {
         url: `${backendDomain}/api/add-to-cart`,
         method: "post"
    },
    addToCartProductCount : {
         url: `${backendDomain}/api/count-cart-product`,
         method: "get"
    },
    DisplayingAddedCartProduct : {
         url: `${backendDomain}/api/display-added-cart-product`,
         method: "get"
    },
    UpdateCartProduct : {
         url: `${backendDomain}/api/update-add-to-cart`,
         method: "post"
    },
    DeleteCartProduct : {
         url: `${backendDomain}/api/delete-add-to-cart-product`,
         method: "post"
    },
    SearchProduct : {
         url: `${backendDomain}/api/search`,
         method: "get"
    },
    filterProduct : {
         url: `${backendDomain}/api/filter-product`,
         method: "post"
    },
    payment : {
         url: `${backendDomain}/api/checkout`,
         method: "post"
    },
    order : {
         url: `${backendDomain}/api/order-list`,
         method: "get"
    },
    AllOrder : {
         url: `${backendDomain}/api/all-order`,
         method: "get"
    },
    OrderRequest : {
         url: `${backendDomain}/api/order-request`,
         method: "post"
    },
    UserOrder : {
         url: `${backendDomain}/api/myorder`,
         method: "get"
    },
    AllUserOrderRequest : {
         url: `${backendDomain}/api/all-order-request`,
         method: "get"
    },
}

export default SummaryApi