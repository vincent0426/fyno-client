import { useState } from "react";
import { useLocation } from "react-router-dom";

import { supabaseClient } from "../utils/supabase";

export const useSignup = () => {
    const location = useLocation();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (email, password) => {
        setIsLoading(true);
        const path = location.state?.from || "/";

        const response = await supabaseClient.auth.signUp(
            {
                email,
                password,
            },
        );

        setIsLoading(false);
        return response;
    };

    return {
        error, isLoading, signup,
    };
};
