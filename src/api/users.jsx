import axiosClient from "../utils/axiosClient";

export const addUser = async (user) => {
    const response = await axiosClient.post("/api/users", {
        id: user.id,
        email: user.email,
        name: user.email,
        avatar_url: user.avatar_url,
    });

    return response;
};

export const getUser = async (id) => {
    const response = await axiosClient.get(`/api/users/${id}`);

    return response;
};
