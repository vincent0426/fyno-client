import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./ImageUploader.css";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Carousel } from "react-responsive-carousel";
import { v4 as uuidv4 } from "uuid";

function ImageUploader({ images, setImages }) {
    const onChange = (imageList) => {
        // set uploaded images
        console.log(imageList);
        setImages(imageList);
    };

    return (
        <div className="mx-auto max-w-xl">
            <ImageUploading
                multiple
                acceptType={["jpg", "jpeg", "png"]}
                maxNumber={6}
                value={images}
                onChange={onChange}
            >
                {({ onImageUpload, onImageRemoveAll, imageList, onImageUpdate, onImageRemove }) => (
                    <>
                        <div className="mx-auto mt-10 flex h-[400px] w-[360px] items-center justify-center">
                            <div className="m-10 h-full w-full bg-white">
                                {imageList.length === 0 && (
                                    <p className="flex h-full w-full items-center justify-center text-gray-400">
                                        上傳圖片
                                    </p>
                                )}
                                <Carousel showArrows={false} showStatus={false} showThumbs={false}>
                                    {imageList.map((image) => (
                                        <div key={uuidv4()} className="relative">
                                            <XMarkIcon className="absolute right-0 top-0" height={24} type="button" width={24} onClick={() => onImageRemove(imageList.indexOf(image))} />
                                            <div className="flex h-[400px] w-[360px] items-center justify-center rounded-md p-6">
                                                <button
                                                    className="h-full w-full"
                                                    type="button"
                                                    onClick={() => onImageUpdate(imageList.indexOf(image))}
                                                >
                                                    <img
                                                        alt=""
                                                        className="flex h-full w-full items-center justify-center rounded-md object-contain"
                                                        src={image.dataURL}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        <div className="mt-16 flex justify-center">
                            <button
                                className="w-3.3/12 mr-2 rounded-md bg-blue-500 px-4 py-2 text-white
                                transition duration-500 hover:scale-110 hover:bg-cyan-500"
                                type="button"
                                onClick={onImageUpload}
                            >
                                上傳圖片
                            </button>
                            <button
                                className="w-3.3/12 ml-2 rounded-md bg-red-500 px-4 py-2 text-white
                                transition duration-500 hover:scale-110 hover:bg-rose-400"
                                type="button"
                                onClick={onImageRemoveAll}
                            >
                                移除圖片
                            </button>
                        </div>
                    </>
                )}
            </ImageUploading>
        </div>
    );
}

export default ImageUploader;
