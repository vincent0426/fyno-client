import axios from "axios";

import { supabaseClient } from "./supabase";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

const getAccessToken = async () => {
    console.log("getAccessToken");
    // set the auth header on every request
    const { data, error } = await supabaseClient.auth.getSession();
    console.log(data);

    if (data) {
        axiosClient.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
    }
};

getAccessToken();
export default axiosClient;
