import { dbConnect } from "@/app/lib/dbConnects";
import Album from "@/model/albumModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export const GET = async (req, { params }) => {
  try {
    await dbConnect();
    const album = await Album.findById(params.albumId);
    if (!album) {
      return Response.json({ message: "Album not found", status: 404 });
    }

    return Response.json({ album, status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error", status: 500 });
  }
};

export const POST = async (req, { params }) => {
  try {
    await dbConnect();
    const albumId = params.albumId;

    const session = await getServerSession(authOptions);
    // const userId = session.user?._id;

    if (!session.user || !session) {
      return Response.json({
        message: "Unauthorized Plase SignIn your account",
        status: 401,
      });
    }

    const album = await Album.findById(albumId);

    if (!album) {
      return Response.json({ message: "Album not found", status: 404 });
    }

    const { title, description, year, albumimage } = await req.json();

    if (!title || !description || !year || !albumimage) {
      return Response.json({ message: "All fields are required", status: 400 });
    }

    const updatedAlbum = await Album.findByIdAndUpdate(
      albumId,
      {
        title,
        description,
        year,
        albumimage,
      },
      {
        new: true,
      }
    );

    return Response.json({
      updatedAlbum,
      message: "Albums is Update",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error", status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const session = await getServerSession(authOptions);
    // const userId = session.user?._id;

    if (!session.user || !session) {
      return Response.json({
        message: "Unauthorized Plase SignIn your account",
        status: 401,
      });
    }

    await dbConnect();

    const albumId = params.albumId;
    const album = await Album.findById(albumId);
    if (!album) {
      return Response.json({ message: "Album not found", status: 404 });
    }
    await Album.findByIdAndDelete(albumId);
    return Response.json({ message: "Album is deleted", status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error", status: 500 });
  }
};
