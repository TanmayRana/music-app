// // components/VideoUpload.js
// "use client";

// import { CldUploadWidget } from "next-cloudinary";
// import { useState } from "react";

// export default function VideoUpload() {
//   const [uploadUrl, setUploadUrl] = useState("");

//   const handleUpload = (result) => {
//     console.log(result.info.secure_url);
//     setUploadUrl(result.info.secure_url);
//   };

//   console.log(uploadUrl);

//   return (
//     <div>
//       <CldUploadWidget
//         uploadPreset="music-app"
//         onUpload={handleUpload}
//         options={{ resourceType: "video" }}
//       >
//         {({ open }) => (
//           <button type="button" onClick={() => open()}>
//             Upload Video
//           </button>
//         )}
//       </CldUploadWidget>
//       {uploadUrl && (
//         <div>
//           <p>Video uploaded successfully:</p>
//           <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
//             {uploadUrl}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { Plus, Trash } from "lucide-react";
// // import { Button } from "../ui/button";
// import Image from "next/image";
// import { CldUploadWidget } from "next-cloudinary";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// const VideoUpload = ({ onChange, onRemove, value }) => {
//   const handleUpload = (result) => {
//     console.log("res=", result);
//     onChange(result?.info?.secure_url);
//   };

//   const imageUrls = Array.isArray(value) ? value : [];

//   const [uploadUrl, setUploadUrl] = useState("");

//   return (
//     <div>
//       <div className="mb-4 flex flex-wrap items-center gap-4">
//         {imageUrls.map((url) => (
//           <div className="relative w-[200px] h-[200px]" key={url}>
//             <div className="absolute top-0 right-0 z-10">
//               <Button
//                 onClick={() => onRemove(url)}
//                 size="sm"
//                 className="bg-red-1 text-white"
//               >
//                 <Trash className="h4 w-4" />
//               </Button>
//             </div>
//             {/* <Image
//               src={url}
//               alt="Images"
//               className="object-cover rounded-lg"
//               fill
//             /> */}
//             {uploadUrl && (
//               <div>
//                 <p>Video uploaded successfully:</p>
//                 <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
//                   {uploadUrl}
//                 </a>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <CldUploadWidget
//         uploadPreset="music-app"
//         onUpload={handleUpload}
//         options={{ resourceType: "video" }}
//       >
//         {({ open }) => {
//           return (
//             <Button
//               type="button"
//               onClick={() => open()}
//               className="bg-grey-1 text-white "
//             >
//               <Plus className="h-4 w-4 mr-2 " />
//               Upload Image
//             </Button>
//           );
//         }}
//       </CldUploadWidget>
//     </div>
//   );
// };

// export default VideoUpload;

"use client";

import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const VideoUpload = ({ onChange, onRemove, value }) => {
  const handleUpload = (result) => {
    console.log("res=", result);
    onChange(result?.info?.secure_url);
    setUploadUrl(result?.info?.secure_url);
  };

  const imageUrls = Array.isArray(value) ? value : [];
  const [uploadUrl, setUploadUrl] = useState("");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {imageUrls.map((url) => (
          <div className="relative w-[300px] h-[150px] " key={url}>
            <div className="absolute top-0   right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-500 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {uploadUrl && (
              <div>
                <p>Video uploaded successfully:</p>

                <audio src={uploadUrl} controls className="mt-11 w-full" />
              </div>
            )}
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset="music-app"
        onUpload={handleUpload}
        options={{ resourceType: "video" }}
      >
        {({ open }) => (
          <Button
            type="button"
            onClick={() => open()}
            className="bg-gray-500 text-white "
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default VideoUpload;
