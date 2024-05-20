// "use client";

// import { X } from "lucide-react";
// import { Badge } from "../ui/badge";
// import {
//   Command,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "../ui/command";
// import { useState } from "react";
// import { Input } from "../ui/input";

// const MultiSelect = ({ placeholder, albums, value, onChange, onRemove }) => {
//   const [inputValue, setInputValue] = useState("");
//   const [open, setOpen] = useState(false);
//   let selected = [];

//   if (value.length === 0) {
//     selected = [];
//   } else {
//     selected = value.map((id) => albums.find((album) => album._id === id));
//     console.log(selected);
//   }
//   const selectables = albums?.filter((album) => !selected.includes(album));

//   return (
//     <Command className="overflow-visible bg-white">
//       <div className="flex gap-1 flex-wrap border rounded-md">
//         {selected?.map((album) => (
//           <Badge key={album._id}>
//             {album.title}
//             <button
//               type="button"
//               className="ml-1 hover:text-red-1"
//               onClick={() => onRemove(album._id)}
//             >
//               <X className="h-3 w-3" />
//             </button>
//           </Badge>
//         ))}
//         <CommandInput
//           placeholder={placeholder}
//           value={inputValue}
//           onValueChange={setInputValue}
//           onBlur={() => setOpen(false)}
//           onFocus={() => setOpen(true)}
//         />
//       </div>

//       <div className="relative mt-2">
//         {open && (
//           <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
//             {selectables.map((item) => (
//               <CommandItem
//                 key={item._id}
//                 onMouseDown={(e) => e.preventDefault()}
//                 onSelect={() => {
//                   onChange(item?._id);
//                   setInputValue("");
//                 }}
//                 className="hover:bg-grey-2 cursor-pointer"
//               >
//                 {item.title}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         )}
//       </div>
//     </Command>
//   );
// };

// export default MultiSelect;

// components/MultiSelect.js
"use client";

import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { useState } from "react";

const MultiSelect = ({
  placeholder,
  albums = [],
  value = [],
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // Compute selected albums based on the value prop
  const selected = value
    .map((id) => albums.find((album) => album._id === id))
    .filter(Boolean);

  // Compute selectables by filtering out selected albums
  const selectables = albums.filter(
    (album) =>
      !selected.some((selectedAlbum) => selectedAlbum._id === album._id) &&
      album.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Command>
      <div className="flex gap-1 flex-wrap border rounded-md p-2">
        {selected.map((album) => (
          <Badge key={album._id}>
            {album.title}
            <button
              type="button"
              className="ml-1 hover:text-red-600"
              onClick={() => onRemove(album._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md bg-white">
            {selectables.map((album) => (
              <CommandItem
                key={album._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(album._id);
                  setInputValue("");
                }}
                className="hover:bg-gray-200 cursor-pointer"
              >
                {album.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
