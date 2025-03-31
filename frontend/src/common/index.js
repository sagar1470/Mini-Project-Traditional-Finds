


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
}

export default SummaryApi