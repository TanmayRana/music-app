"use client";

import { Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

const ImageUpload = ({ onChange, onRemove, value }) => {
  const onUpload = (result) => {
    console.log("res=", result);
    onChange(result?.info?.secure_url);
  };

  const imageUrls = Array.isArray(value) ? value : [];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {imageUrls.map((url) => (
          <div className="relative w-[200px] h-[200px]" key={url}>
            <div className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="Images"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="music-app" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-grey-1 text-white "
            >
              <Plus className="h-4 w-4 mr-2 " />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
