import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { supabaseClient } from "../utils/supabase";

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        error, isLoading, loginWithProvider,
    };
};
