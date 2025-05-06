import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentUser : null,
    error: null,
    loading : false
}

const startFunction = (state, action) => {
    state.loading = true;
    state.error = null;
}

const successFunction = (state, action) => {
    state.currentUser = action.payload;
    state.loading = false;
    state.error = null;
}

const failureFunction = (state, action) => {
    state.loading = false;
    state.error = action.payload;
}

const logoutFunction = (state, action) => {
    state.loading = false;
    state.error = null;
    state.currentUser = null;
}

export const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {
            signStart: startFunction,
            signSuccess: successFunction,
            signFailure: failureFunction,
            logout : logoutFunction
        }
    }
)

export const {signStart, signSuccess, signFailure, logout} = userSlice.actions;

export default userSlice.reducer;