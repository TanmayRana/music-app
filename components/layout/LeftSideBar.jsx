"use client";
import { navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

const LeftSideBar = () => {
  const pathname = usePathname();
  const session = useSession();
  const user = session?.data?.user;
  return (
    <div className="h-screen left-0 top-0 static p-10 flex flex-col gap-16 bg-blue-2 shadow-lg max-lg:hidden ">
      <Image src="/logo.png" alt="logo" width={150} height={70} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-body-medium items-center">
        <Avatar>
          <AvatarImage
            src={`${user?.userimage ? user?.userimage : "/userimag.png"}`}
          />
        </Avatar>
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
