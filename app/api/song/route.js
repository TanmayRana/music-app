import { dbConnect } from "@/app/lib/dbConnects";
import Song from "@/model/songModel";
import Album from "@/model/albumModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export const POST = async (req, res) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json({
        message: "Unauthorized Plase SignIn your account",
        status: 401,
      });
    }

    await dbConnect();

    const {
      title,
      artistname,
      albumimage,
      songimage,
      songpath,
      album,
      releaseyear,
    } = await req.json();

    if (
      (!title, !artistname, !albumimage, !songimage, !songpath, !releaseyear)
    ) {
      return Response.json({ message: "All fields are required", status: 400 });
    }

    const existingSong = await Song.findOne({ title: title });

    if (existingSong) {
      return Response.json({ message: "Song already exists", status: 400 });
    }

    const newSong = await Song.create({
      title,
      artistname,
      albumimage,
      songimage,
      songpath,
      album,
      releaseyear,
    });

    await newSong.save();

    if (album) {
      for (const albumId of album) {
        const album = await Album.findById(albumId);
        if (album) {
          album.songs.push(newSong._id);
          await album.save();
        }
      }
    }

    return Response.json({
      newSong,
      message: "Song created successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: error.message, status: 500 });
  }
};

export const GET = async (req, res) => {
  await dbConnect();

  try {
    const Songs = await Song.find().sort({ createdAt: "desc" });
    return Response.json({ Songs, status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error", status: 500 });
  }
};
