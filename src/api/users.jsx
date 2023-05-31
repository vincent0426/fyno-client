import axiosClient from "../utils/axiosClient";

export const addUser = async (user) => {
    const response = await axiosClient.post("/api/users", {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
        signature: user.signature,
        bio: user.bio,
    });

    return response;
};

export const getUser = async (id) => {
    const response = await axiosClient.get(`/api/users/${id}`);

    return response;
};

export const getUserPosts = async (id) => {
    const response = await axiosClient.get(`/api/users/${id}/posts`);

    return response;
};

export const updateUser = async (user) => {
    console.log("user", user);
    const response = await axiosClient.put("/api/users/me", {
        name: user.name,
        signature: user.signature,
        bio: user.bio,
    });

    return response;
};
