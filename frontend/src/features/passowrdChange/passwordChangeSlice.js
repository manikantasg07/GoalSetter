import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import changepasswordService from "../passowrdChange/passwordChangeService"

const initialState = {
    email : "",
    isLoading:false,
    otpSent : false,
    otpVerified:false,
    passwordChanged : false,
    isError:false,
    message:""
}

export const requestOtp = createAsyncThunk("user/requestOtp",async(email,thunkAPI)=>{
    try {
        return await changepasswordService.requestOtp(email);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.messagen) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})
export const verifyOtp = createAsyncThunk("user/verifyOtp",async(otp,thunkAPI)=>{
    try {
        const email = thunkAPI.getState().changePassword.email;
        return await changepasswordService.verifyOtp({email,otp});
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.messagen) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const changePassword = createAsyncThunk("user/changePassword",async({password,confirmPassword},thunkAPI)=>{
    try {
        const email = thunkAPI.getState().changePassword.email;
        return await changepasswordService.passwordChange({email,password,confirmPassword});
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.messagen) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

const passwordChangeSlice = createSlice({
    name : "passwordChange",
    initialState,
    reducers : {
        reset : (state) => ({
            ...state,
            isLoading:false,
            otpSent : false,
            otpVerified:false,
            passwordChanged : false,
            isError:false,
            message:""
        }),
        fullReset:(state)=>(state=initialState)
    },
    extraReducers : (builder)=>{
        builder.addCase(requestOtp.pending,(state,action)=>{
            state.isLoading = true
        })
        builder.addCase(requestOtp.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.email = action.payload.email;
            state.otpSent = true
        })
        builder.addCase(requestOtp.rejected,(state,action)=>{
            state.isError = true;
            state.message = action.payload;
        })
        builder.addCase(verifyOtp.pending,(state,action)=>{
            state.isLoading = true
        })
        builder.addCase(verifyOtp.fulfilled,(state,action)=>{
            state.otpVerified = true;
        })
        builder.addCase(verifyOtp.rejected,(state,action)=>{
            state.isError = true;
            state.message = action.payload;
        })
        builder.addCase(changePassword.pending,(state,action)=>{
            state.isLoading = true
        })
        builder.addCase(changePassword.fulfilled,(state,action)=>{
            state.passwordChanged= true;
            state.message= "Password Changed successfully"
        })
        builder.addCase(changePassword.rejected,(state,action)=>{
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const {reset,fullReset} = passwordChangeSlice.actions;
export default passwordChangeSlice.reducer;
