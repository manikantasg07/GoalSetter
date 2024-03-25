import {createSlice, createAsyncThunk} from"@reduxjs/toolkit";
import goalService from "./goalService";

const initialState= {
    goals : [],
    isLoading : false,
    isError : false,
    isSuccess : false,
    message : ""
}

export const createGoal = createAsyncThunk("goals/create",async(goalData,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goalData,token);
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.messagen) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }

})

export const getGoals = createAsyncThunk("goals/get",async(_,thunkAPI)=>{
    try {
        const token= thunkAPI.getState().auth.user.token;
        return await goalService.getGoals(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.messagen) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteGoal = createAsyncThunk("goal/delete",async(goalId,thunkAPI)=>{
    try {
        const token= thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(goalId,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.messagen) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

const goalSlice = createSlice({
    name : "goals",
    initialState,
    reducers:{
        reset : (state)=>initialState
    },
    extraReducers : (builder)=>{
        builder.addCase(createGoal.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(createGoal.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.goals.push(action.payload)
        });
        builder.addCase(createGoal.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.message= action.payload;
        });
        builder.addCase(getGoals.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(getGoals.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.goals=action.payload
        });
        builder.addCase(getGoals.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.message= action.payload;
        });
        builder.addCase(deleteGoal.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(deleteGoal.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.goals=state.goals.filter((goal)=>{
                return (goal._id != action.payload.deletedGoal._id)
            })
        });
        builder.addCase(deleteGoal.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError =true;
            state.message= action.payload;
        });
    }
})

export default goalSlice.reducer;
export const {reset} = goalSlice.actions;