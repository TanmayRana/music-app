import User from "@/model/userModel";
import { dbConnect } from "@/app/lib/dbConnects";
import bcrypt from "bcryptjs";

export const POST = async (req, res) => {
  try {
    await dbConnect();

    const { email, password } = await req.json();
    console.log(email);

    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return Response.json({
        status: 400,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return Response.json({
        status: 400,
        message: "Invalid Password",
      });
    }

    return Response.json({
      user,
      status: 200,
      message: "Login Successfully",
    });
  } catch (error) {
    console.log(error);

    return Response.json({ message: "Internal Server Error", status: 500 });
  }
};
