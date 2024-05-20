"use client";
import { Separator } from "@/components/ui/separator";
import * as yup from "yup";
import { useFormik } from "formik";
import ImageUpload from "@/components/customUi/ImageUpload";
// import VideoUpload from "../tr/page";
import VideoUpload from "@/app/(dashboard)/tr/page";

import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

const initialValues = {
  title: "",
  artistname: "",
  artistimage: [],
  songimage: [],
  songpath: [],
  album: [],
  releaseyear: "",
};

const songSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  artistname: yup.string().required("Artist is required"),
  artistimage: yup
    .array()
    .min(1, "Artist image is required")
    .required("Artist image is required"),
  songimage: yup
    .array()
    .min(1, "Album image is required")
    .required("Album image is required"),
  songpath: yup
    .array()
    .min(1, "Song path is required")
    .required("Song path is required"),
  album: yup.array().min(1, "Album is required").required("Album is required"),
  releaseyear: yup.string().required("Year is required"),
});

const SongForm = ({ initialData }) => {
  const [albums, setAlbums] = useState([]);

  const getAlbums = async () => {
    try {
      const res = await axios.get("/api/album");
      setAlbums(res.data.albums);
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: initialData ? initialData : songSchema,
    onSubmit: async (values) => {
      // try {
      //   const url = initialData
      //     ? `/api/album/${initialData._id}`
      //     : "/api/album";

      //   const res = await axios.post(url, value);

      //   if (res.status === 200) {
      //     setLoading(false);
      //     toast.success(`Album ${initialData ? "Update" : "Creatde"}`);
      //     window.location.href = "/albums";
      //     router.push("/albums");
      //   }
      // } catch (error) {
      //   console.log("[Album_POST]", error);
      // }

      const res = await axios.post("/api/song", values);
      console.log(res);
    },
  });

  return (
    <div className="p-10">
      <p className="text-heading2-bold">Created Song</p>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <form onSubmit={formik.handleSubmit} className="space-y-8 h-screen">
        <div>
          <label
            htmlFor="title"
            className="text-base font-medium text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter the title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 text-sm font-medium">
            {formik.errors.title}
          </div>
        )}
        <div>
          <label
            htmlFor="artistname"
            className="text-base font-medium text-gray-900"
          >
            Artist Name
          </label>
          <div className="mt-2">
            <input
              id="artistname"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter the artist's name"
              value={formik.values.artistname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        {formik.touched.artistname && formik.errors.artistname && (
          <div className="text-red-500 text-sm font-medium">
            {formik.errors.artistname}
          </div>
        )}
        <div>
          <label
            htmlFor="artistimage"
            className="text-base font-medium text-gray-900"
          >
            Artist Image
          </label>
          <div className="mt-2">
            <ImageUpload
              value={formik.values.artistimage}
              onChange={(url) =>
                formik.setFieldValue("artistimage", [
                  ...formik.values.artistimage,
                  url,
                ])
              }
              onRemove={(url) =>
                formik.setFieldValue(
                  "artistimage",
                  formik.values.artistimage.filter((image) => image !== url)
                )
              }
            />
          </div>
        </div>
        {formik.touched.artistimage && formik.errors.artistimage && (
          <div className="text-red-500 text-sm font-medium">
            {formik.errors.artistimage}
          </div>
        )}
        <div>
          <label
            htmlFor="songimage"
            className="text-base font-medium text-gray-900"
          >
            Album Image
          </label>
          <div className="mt-2">
            <ImageUpload
              value={formik.values.songimage}
              onChange={(url) =>
                formik.setFieldValue("songimage", [
                  ...formik.values.songimage,
                  url,
                ])
              }
              onRemove={(url) =>
                formik.setFieldValue(
                  "songimage",
                  formik.values.songimage.filter((image) => image !== url)
                )
              }
            />
          </div>
        </div>
        {formik.touched.songimage && formik.errors.songimage && (
          <div className="text-red-500 text-sm font-medium">
            {formik.errors.songimage}
          </div>
        )}
        <div>
          <label
            htmlFor="songpath"
            className="text-base font-medium text-gray-900"
          >
            Song Path
          </label>
          <div className="mt-2">
            <VideoUpload
              value={formik.values.songpath}
              onChange={(url) =>
                formik.setFieldValue("songpath", [
                  ...formik.values.songpath,
                  url,
                ])
              }
              onRemove={(url) =>
                formik.setFieldValue(
                  "songpath",
                  formik.values.songpath.filter((path) => path !== url)
                )
              }
            />
          </div>
        </div>
        {formik.touched.songpath && formik.errors.songpath && (
          <div className="text-red-500 text-sm font-medium">
            {formik.errors.songpath}
          </div>
        )}
        <div>
          <label
            htmlFor="album"
            className="text-base font-medium text-gray-900"
          >
            Album
          </label>
          <div className="mt-2">
            <Multiselect
              options={albums}
              displayValue="title"
              selectedValues={formik.values.album.map((id) =>
                albums.find((album) => album._id === id)
              )}
              onSelect={(selectedList, selectedItem) =>
                formik.setFieldValue("album", [
                  ...formik.values.album,
                  selectedItem._id,
                ])
              }
              onRemove={(selectedList, removedItem) =>
                formik.setFieldValue(
                  "album",
                  formik.values.album.filter((id) => id !== removedItem._id)
                )
              }
            />
          </div>
        </div>
        {formik.touched.album && formik.errors.album && (
          <div className="text-red-500 text-sm font-medium">
            {formik.errors.album}
          </div>
        )}
        <div>
          <label
            htmlFor="releaseyear"
            className="text-base font-medium text-gray-900"
          >
            Release Year
          </label>
          <div className="mt-2">
            <input
              id="releaseyear"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter the release year"
              value={formik.values.releaseyear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        {formik.touched.releaseyear && formik.errors.releaseyear && (
          <div className="text-red-500 text-sm font-medium">
            {formik.errors.releaseyear}
          </div>
        )}
        <div className="flex gap-10">
          <Button type="submit" className="bg-blue-1 text-white">
            Submit
          </Button>
          <Button type="button" className="bg-blue-1 text-white">
            Discard
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SongForm;
