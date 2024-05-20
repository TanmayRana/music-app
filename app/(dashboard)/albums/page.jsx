"use client";

import { columns } from "@/components/albums/AlbumsColumns";
import DataTable from "@/components/customUi/DataTable";
import Loader from "@/components/customUi/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Albums = () => {
  const [loading, setLoading] = useState(true);
  const [albums, setalbums] = useState([]);
  const router = useRouter();

  const getAlbums = async () => {
    try {
      const res = await axios.get("/api/album");
      //   console.log(res);
      setalbums(res.data.albums);
      setLoading(false);
    } catch (error) {
      console.log("[Albums-GET]", error);
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Albums</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/albums/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Created Albums
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={albums} searchkey="title" />
    </div>
  );
};

export default Albums;
