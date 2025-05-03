import apiClient from "../utils/api-client";

const tokenName = import.meta.env.VITE_API_TOKEN_NAME;

export async function signup(user) {
    const {data} = await apiClient.post("/auth/signup", user);
    localStorage.setItem(tokenName, data.token);

    return data;
}