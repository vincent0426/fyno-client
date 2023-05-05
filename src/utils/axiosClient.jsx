import axios from "axios";

import { supabaseClient } from "./supabase";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
});

axiosClient.interceptors.request.use(async (config) => {
    const { data, error } = await supabaseClient.auth.getSession();

    if (data && data.session && data.session.access_token) {
        config.headers.Authorization = `Bearer ${data.session.access_token}`;
    }

    return config;
});

export default axiosClient;
