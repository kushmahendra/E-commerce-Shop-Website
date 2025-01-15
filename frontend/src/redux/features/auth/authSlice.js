import { createSlice } from '@reduxjs/toolkit'

const loadUserFromLocalStorage=() => {
 try {
    
    const serializedState=   localStorage.getItem('user');
    if(serializedState==null)
        return {user:null};
    return {user:JSON.parse(serializedState)}
 } catch (error) {
    return {user:null}
 }
}
const initialState= loadUserFromLocalStorage();
console.log('fdffjdhfjdhgjhdjg',initialState)
const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:{...initialState.user},
        addresses:null
  
    },
    reducers:{
        setUser:(state,action)=>
        {
            state.user=action.payload.user;
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        setAddress:(state,action)=>{
            state.addresses=action.payload
        }

        ,
        logout:(state)=>
        {
            state.user=null;
            state.token=null;
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
    }
})

export const {setUser,logout,setAddress}=authSlice.actions;
export default authSlice.reducer;
