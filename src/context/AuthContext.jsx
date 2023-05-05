import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addUser, getUser } from "../api/users";
import axiosClient from "../utils/axiosClient";
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

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        console.log("auth provider");

        const checkUser = async () => {
            console.log("check user");

            try {
                const { data: { user } } = await supabaseClient.auth.getUser();
                let userInDB = null;

                if (user) {
                    userInDB = await getUser(user.id);

                    if (!userInDB.data.user) {
                        console.log("user not in db", user);
                        userInDB = await addUser({
                            id: user.id,
                            email: user.email,
                            name: user.user_metadata.full_name || user.email,
                            avatar_url: user.user_metadata.avatar_url || import.meta.env.VITE_DEFAULT_AVATAR,
                        });
                    }

                    const { data } = userInDB;

                    dispatch({
                        type: "LOGIN",
                        payload: data.user,
                    });
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
