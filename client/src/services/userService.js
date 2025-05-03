import apiClient from "../utils/api-client";

export async function signup(user) {
    const {data} = await apiClient.post("/auth/signup", user);
    return data;
}

export async function signin(user) {
    const {data} = await apiClient.post("/auth/signin", user);
    return data
}