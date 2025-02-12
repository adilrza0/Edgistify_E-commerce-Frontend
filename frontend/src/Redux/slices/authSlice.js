import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:'',  
    isAuthenticated:false,
    user:{},
    
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload,
            state.isAuthenticated=true
        },
        setUser:(state,action)=>{
            state.user=action.payload
        },
        
       
    }
})
export const {setToken,setUser,} = authSlice.actions
export default authSlice.reducer