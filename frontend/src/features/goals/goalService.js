import axios from "axios";

const API_URL = "/api/goals";


const createGoal = async(goalData,token)=>{
    const config= {
        headers : {
            authorization : `Bearer ${token}`,
        }
    }
    const response= await axios.post(API_URL,goalData,config);
    return response.data.goal;
}

const getGoals = async(token)=>{
    const config = {
        headers:{
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config);
    return response.data.goals;
}

const updateGoal= async({goalId,text,token})=>{
    const config = {
        headers:{
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/${goalId}`,{goalId,text},config);
    return response.data;
}

const deleteGoal = async(goalId,token)=>{
    const config = {
        headers:{
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}/${goalId}`,config);
    return response.data;
}

const goalService={
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal
}

export default goalService;