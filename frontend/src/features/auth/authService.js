import axios from "axios";

const API_URL = "/api/users/"

const register = async(userData)=>{
    const response = await axios.post(API_URL,userData);
    if(response.data){
        try {
            localStorage.setItem("user",JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    }
    return response.data;
}

const login = async(userData) =>{
    const response = await axios.post(`${API_URL}login/`,userData);
    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data));
    }
    return response.data;
}

const logout = async()=>{
    try {
        localStorage.removeItem("user");

    } catch (error) {
        console.log(error);
    }
}

const authService ={
    register,
    logout,
    login
}
export  default authService