import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabaseClient } from "../utils/supabase";

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
    case "LOGIN":
        return {
            user: action.payload,
        };
    case "LOGOUT":
        return {
            user: null,
        };
    default:
        return state;
    }
};

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
});

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { user } } = await supabaseClient.auth.getUser();
                console.log(user);

                if (user) {
                    const isUserInDB = await axiosClient.get(`/api/users/${user.id}`);
                    console.log(isUserInDB);

                    if (!isUserInDB.data.data) {
                        axiosClient.post("/api/users", {
                            id: user.id,
                        });
                    }

                    dispatch({
                        type: "LOGIN",
                        payload: {
                            id: user.id,
                            email: user.user_metadata.email,
                            name: user.user_metadata.name,
                            avatar_url: user.user_metadata.avatar_url,
                        },
                    });

                    // localStorage.setItem("user", JSON.stringify(userProfile));
                } else {
                    dispatch({
                        type: "LOGOUT",
                    });

                    // localStorage.removeItem("user");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsAuthenticating(false);
            }
        };

        checkUser();
    }, []);

    useEffect(() => {
        supabaseClient.auth.onAuthStateChange(async (event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                navigate("/auth/reset-forgot-password");
            }
        });
    }, []);

    const value = useMemo(
        () => ({
            ...state,
            dispatch,
            isAuthenticating,
        }),
        [state, dispatch, isAuthenticating],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
