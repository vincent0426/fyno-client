import { b64toBlob, blobToFile } from "./format-base64";

export const generatePostImages = (postImages, images, postId, user) => {
    for (let i = 0; i < images.length; i += 1) {
        const key = `${postId}/${i + 1}`;
        postImages.push({
            url: `https://fyno-post-images.s3.ap-northeast-1.amazonaws.com/${user.id}/${key}`,
            rank: i + 1,
        });
    }

    return postImages;
};

export const generateFile = async (image) => {
    const base64 = image.dataURL.split(",")[1];
    const type = image.dataURL.split(";")[0].split("/")[1];
    const filename = image.file.name;
    const blob = b64toBlob(base64, `image/${type}`);
    const file = blobToFile(blob, filename);

    return file;
};
