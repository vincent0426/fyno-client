import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axiosClient from "../utils/axiosClient";

function SinglePost() {
    const [post, setPost] = useState(null);
    const [postImages, setPostImages] = useState(null);
    const { id: postId } = useParams();
    useEffect(() => {
        console.log("single post page");

        const getPost = async () => {
            try {
                const response = await axiosClient.get(`/api/posts/${postId}`);
                setPost(response.data.post);
                console.log("response", response);
            } catch (error) {
                console.log("error", error);
            }
        };

        getPost();
    }, []);

    return (
        <div>SinglePost</div>
    );
}

export default SinglePost;
