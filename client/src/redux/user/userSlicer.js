import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentUser : null,
    error: null,
    loading : false
}

const signinStartFunction = (state, action) => {
    state.loading = true;
    state.error = null;
}

const signinSuccessFunction = (state, action) => {
    state.currentUser = action.payload;
    state.loading = false;
    state.error = null;
}

const signinFailureFunction = (state, action) => {
    state.loading = false;
    state.error = action.payload;
}

export const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {
            signinStart: signinStartFunction,
            signinSuccess: signinSuccessFunction,
            signinFailure: signinFailureFunction
        }
    }
)

export const {signinStart, signinSuccess, signinFailure} = userSlice.actions;

export default userSlice.reducer;