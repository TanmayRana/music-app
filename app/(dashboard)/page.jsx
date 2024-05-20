import { dbConnect } from "../lib/dbConnects";
import { columns } from "@/components/users/UsersColumns";
import { Separator } from "@/components/ui/separator";
import User from "@/model/userModel";
import DataTable from "@/components/customUi/DataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  await dbConnect();

  const users = await User.find().sort({ createdAt: "desc" });

  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Users</p>
      <Separator className="my-5 bg-grey-1" />
      <DataTable columns={columns} data={users} searchkey="name" />
    </div>
  );
}
