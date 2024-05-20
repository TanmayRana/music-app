// "use client";

// import Link from "next/link";
// import Delete from "../customUi/Delete";

// export const columns = [
//   {
//     accessorKey: "title",
//     header: "Title",
//     cell: ({ row }) => (
//       <Link href={`/songs/${row.original._id}`} className="hover:text-red-1">
//         {row.original.title}
//       </Link>
//     ),
//   },
//   {
//     accessorKey: "artistname",
//     header: "Artist Name",
//   },
//   {
//     accessorKey: "releaseyear",
//     header: "Release Year",
//   },
//   {
//     accessorKey: "album",
//     header: "Albums",
//     cell: ({ row }) =>
//       row.original.album
//         ?.map((id) => album.find((album) => album.title))
//         .join(", "),
//   },

//   {
//     id: "actions",
//     cell: ({ row }) => <Delete item="product" id={row.original._id} />,
//   },
// ];

"use client";

import Link from "next/link";
import Delete from "../customUi/Delete";

// Ensure albums is passed as a prop or accessible in context
export const columns = (albums) => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/songs/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "artistname",
    header: "Artist Name",
  },
  {
    accessorKey: "releaseyear",
    header: "Release Year",
  },
  {
    accessorKey: "album",
    header: "Albums",
    cell: ({ row }) => {
      const albumTitles = row.original.album
        ?.map((id) => albums.find((album) => album._id === id)?.title)
        .filter((title) => title) // Filter out undefined titles
        .join(", ");
      return albumTitles || "No albums";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
