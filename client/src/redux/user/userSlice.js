import { createSlice } from '@reduxjs/toolkit'
import { update } from 'lodash';


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

const updateUserStartFunction = (state, action) => {
    state.loading = true;
    state.error = null;
}

const updateUserSuccessFunction = (state, action) => {
    const {username, email, profilePicture} = action.payload.data
    state.loading = false;
    state.error = null;
    state.currentUser.user = {
        ...state.currentUser.user,
        username,
        email,
        profilePicture
    }
}

const updateUserfailureFunction = (state, action) => {
    state.loading = false;
    state.error = action.payload;
}

const deleteUserStartFunction = (state, action) => {
    state.loading = true;
    state.error = null;
}

const deleteUserSuccessFunction = (state, action) => {
    state.loading = false;
    state.error = null;
    state.currentUser = null;
}

const deleteUserFailureFunction = (state, action) => {
    state.loading = false;
    state.error = action.payload;
}

const signoutUserStartFunction = (state, action) => {
    state.loading = true;
    state.error = null;
}

const signoutUserSuccessFunction = (state, action) => {
    state.loading = false;
    state.error = null;
    state.currentUser = null;
}

const signoutUserFailureFunction = (state, action) => {
    state.loading = false;
    state.error = action.payload;
}


export const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {
            signStart: startFunction,
            signSuccess: successFunction,
            signFailure: failureFunction,
            logout : logoutFunction,
            updateUserStart: updateUserStartFunction,
            updateUserSuccess: updateUserSuccessFunction,
            updateUserFailure: updateUserfailureFunction,
            deleteUserStart: deleteUserStartFunction,
            deleteUserSuccess: deleteUserSuccessFunction,
            deleteUserFailure: deleteUserFailureFunction,
            signoutUserStart: signoutUserStartFunction,
            signoutUserSuccess: signoutUserSuccessFunction,
            signoutUserFailure: signoutUserFailureFunction
        }
    }
)

export const {
signStart, 
signSuccess, 
signFailure, 
logout, 
updateUserStart, 
updateUserSuccess, 
updateUserFailure, 
deleteUserStart, 
deleteUserSuccess, 
deleteUserFailure,
signoutUserStart, 
signoutUserSuccess, 
signoutUserFailure,

} = userSlice.actions;

export default userSlice.reducer;