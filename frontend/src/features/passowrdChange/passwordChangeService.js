import axios from "axios";

const API_URL = "/api/forgotpassword/"
const API_URL_USERS = "/api/users/"

 const requestOtp=async(email)=>{
    const response = await axios.post(API_URL,{email});
    return response.data
}
const verifyOtp=async(data)=>{
    const response = await axios.post(API_URL+"verifyOtp",data);
    return response.data;
}

const passwordChange=async(data)=>{
    const response = await axios.post(API_URL_USERS+"changePassword",data);
    return response.data;
}
const changepasswordService={
    requestOtp,
    verifyOtp,
    passwordChange
}

export default changepasswordService;