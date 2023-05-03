import axiosClient from "../utils/axiosClient";

export const getPresignedUrl = async (key) => {
    console.log("get presigned url", key);
    const response = await axiosClient.post("/presigned_url", {
        key,
    });

    return response;
};
