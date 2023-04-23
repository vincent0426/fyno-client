import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabaseClient } from "../utils/supabase";
import { useAuth } from "./useAuth";

export const useLogout = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        setIsLoading(true);

        try {
            await supabaseClient.auth.signOut();
            dispatch({
                type: "LOGOUT",
            });
            navigate("/");
            window.location.reload();
        } catch (error) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        logout, error, isLoading,
    };
};
