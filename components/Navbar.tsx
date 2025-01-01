import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default async function Navbar() {
  const session = await auth();
  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <p className="text-xl font-bold text-black">Startup Pitch</p>
        </Link>
        <div className="flex space-x-5 items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="text-black max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden text-primary" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                {" "}
                <button className="text-black">
                <span className="text-black max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                {/* <span className="text-black">{session?.user?.name}</span> */}
                <Avatar className="size-10">
                    <AvatarImage src={session?.user?.image ||""} alt={session?.user?.name ||""} />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button className="text-black" type="submit">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
}
