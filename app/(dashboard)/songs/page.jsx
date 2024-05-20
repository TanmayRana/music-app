"use client";

import DataTable from "@/components/customUi/DataTable";
import Loader from "@/components/customUi/Loader";
import { columns } from "@/components/songs/SongsColumns";
// import { columns } from "@/components/songs/SongsColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Songs = () => {
  const [loading, setLoading] = useState(true);
  const [songs, setsongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const router = useRouter();

  const getSong = async () => {
    try {
      const res = await axios.get("/api/song");
      console.log(res.data);
      setsongs(res.data.Songs);
      setLoading(false);
    } catch (error) {
      console.log("[Albums-GET]", error);
    }
  };
  const getAlbums = async () => {
    try {
      const res = await axios.get("/api/album");
      console.log(res.data);
      setAlbums(res.data.albums);
      setLoading(false);
    } catch (error) {
      console.log("[Albums-GET]", error);
    }
  };

  useEffect(() => {
    getSong();
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
          onClick={() => router.push("/songs/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Created Albums
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns(albums)} data={songs} searchkey="title" />
    </div>
  );
};

export default Songs;
