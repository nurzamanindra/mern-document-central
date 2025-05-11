import apiClient from "../utils/api-client";

export async function signup(user) {
    const {data} = await apiClient.post("/auth/signup", user);
    return data;
}

export async function signin(user) {
    const {data} = await apiClient.post("/auth/signin", user);
    return data
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