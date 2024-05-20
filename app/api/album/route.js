import { dbConnect } from "@/app/lib/dbConnects";
import Album from "@/model/albumModel";
import Song from "@/model/songModel";

export const POST = async (req, res) => {
  await dbConnect();

  try {
    const { title, description, year, albumimage } = await req.json();

    const existingAlbum = await Album.findOne({ title: title });

    if (existingAlbum) {
      return Response.json({ message: "Album already exists", status: 400 });
    }
    const newAlbum = new Album({ title, description, year, albumimage });
    await newAlbum.save();

    return Response.json({
      newAlbum,
      message: "Album Created Successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error", status: 500 });
  }
};

export const GET = async (req, res) => {
  await dbConnect();

  try {
    const albums = await Album.find().sort({ createdAt: "desc" });
    return Response.json({ albums, status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error", status: 500 });
  }
};
