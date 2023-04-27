import { useState } from "react";
import { useLocation } from "react-router-dom";

import { supabaseClient } from "../utils/supabase";

export const useLogin = () => {
    const location = useLocation();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email, password) => {
        setIsLoading(true);

        const response = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        setIsLoading(false);
        return response;
    };

    const loginWithProvider = async (provider) => {
        const path = location.state?.from || "/";

        try {
            const { data, error } = await supabaseClient.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}${path}`,
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                    },
                },
            });

            if (error) {
                throw error;
            }
        } catch (error) {
            console.log("error", error);
            setError("Something went wrong, please try again later");
        }
    };

    return {
        error, isLoading, loginWithProvider, login,
    };
};
