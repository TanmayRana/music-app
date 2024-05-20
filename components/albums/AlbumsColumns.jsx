"use client";

import Link from "next/link";
import Delete from "../customUi/Delete";

export const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/albums/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "year",
    header: "Year",
  },

  {
    id: "actions",
    cell: ({ row }) => <Delete item="albums" id={row.original._id} />,
  },
];
