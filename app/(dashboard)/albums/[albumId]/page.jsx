"use client";

import AlbumForm from "@/components/albums/AlbumForm";
import Loader from "@/components/customUi/Loader";
import axios from "axios";
import { useEffect, useState } from "react";

const AlbumDetails = ({ params }) => {
  const id = params.albumId;
  const [loading, setLoading] = useState(true);
  const [albumDetails, setAlbumDetails] = useState(null);

  const getAlbumDetails = async () => {
    try {
      const res = await axios.get(`/api/album/${id}`);
      // console.log(res.data);
      setAlbumDetails(res.data.album);
      setLoading(false);
    } catch (error) {
      console.log("[Album-GET]", error);
    }
  };

  useEffect(() => {
    getAlbumDetails();
  }, []);

  return loading ? <Loader /> : <AlbumForm initialData={albumDetails} />;
};

export default AlbumDetails;
