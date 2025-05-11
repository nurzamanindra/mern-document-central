import apiClient from "../utils/api-client";
import {signoutUserStart, signoutUserSuccess, signoutUserFailure} from '../redux/user/userSlice';
import { useDispatch } from "react-redux";

export async function signup(user) {
    const {data} = await apiClient.post("/auth/signup", user);
    return data;
}

export async function signin(user) {
    const {data} = await apiClient.post("/auth/signin", user);
    return data
}

export async function signout(){
    const {data} = await apiClient.post("/auth/signout");
    return data;
}   

export async function continueWithGoogle(accessToken){
    const {data} = await apiClient.post("/auth/google", {accessToken});
    return data;
}

export async function updateUserProfile(userId, userData){
    const {data} = await apiClient.put(`/user/update/${userId}`, userData);
    return data;
}

export async function deleteUserProfile(userId){
    const {data} = await apiClient.delete(`/user/delete/${userId}`);
    return data;
}


export async function handleSignOut(dispatch) {
 
    dispatch(signoutUserStart());

    try {
      const data = await signout();
      dispatch(signoutUserSuccess(data));
      console.log(data);
    } catch (error) {
      console.error(error);
      dispatch(signoutUserFailure(error.message));
    }

  };
