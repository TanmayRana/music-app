"use client";

import { navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

const TopBar = () => {
  const session = useSession();
  const user = session?.data?.user;
  //   console.log(user);
  const pathname = usePathname();
  const [dropdownMenu, setdropdownMenu] = useState(false);

  return (
    <div className="static top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-[#E9F5FE] shadow-xl lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={150} />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 relative items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setdropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="flex flex-col gap-8 absolute top-10 right-9  p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium"
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <Avatar>
          <AvatarImage
            src={`${user?.userimage ? user?.userimage : "/userimag.png"}`}
          />
        </Avatar>
      </div>
    </div>
  );
};

export default TopBar;
