import User from "@/model/userModel";
import { dbConnect } from "@/app/lib/dbConnects";
import bcrypt from "bcryptjs";

export const POST = async (req, res) => {
  try {
    await dbConnect();
    const body = await req.json();
    const { username, email, password, userimage } = body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return Response.json({ message: "User Already Exist", status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userimage: userimage,
      playlist: [],
    });
    await newUser.save();

    return Response.json({
      newUser,
      message: "User Created Successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return Response.json({ message: "Internal Server Error", status: 500 });
  }
};
