
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
}

export default SummaryApi