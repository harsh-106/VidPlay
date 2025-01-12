import { createSlice } from "@reduxjs/toolkit";

// {name:"Patel Programming ", message:"input"}
const chatSlice = createSlice({
    name:"chat",
    initialState:{
        message:[],
    },
    reducers:{
        setMessage:(state,action) => {

            state.message.splice(40,1);
            state.message.push(action.payload);
        }
    }
})
export const {setMessage} = chatSlice.actions;
export default chatSlice.reducer;