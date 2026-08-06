"use client";

import { useAuthStore } from "@/store/auth.store";
import { Radar, CircleX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const user = useAuthStore(
    (state) => state.user
  );

  const isLoading = useAuthStore(
    (state) => state.isLoading
  );


  // Prevent hydration mismatch while auth is being checked
  if (isLoading) {
    return null;
  }


  const links = [
    {
      href: "/",
      label: "Home",
    },
  ];


  if (user) {
    links.push(
      {
        href: "/dashboard",
        label: "Dashboard",
      },
      {
        href: "/userrepo",
        label: "Repos",
      }
    );
  }


  const navbarWidth = open
    ? user
      ? "w-[460px]"
      : "w-[220px]"
    : "w-16";


  return (
    <nav className="fixed top-6 right-10 z-50">

      <div
        className={`
          flex items-center relative overflow-hidden rounded-full
          border border-white/10 bg-emerald-500 backdrop-blur-xl
          transition-all duration-500 h-12
          ${navbarWidth}
        `}
      >

        <button
          onClick={() => setOpen(true)}
          disabled={open}
          className="absolute left-5 z-10 cursor-pointer"
        >
          <Radar className="text-white" />
        </button>


        <div
          className={`
            w-full flex items-center justify-between
            pr-6 pl-14 transition-opacity
            ${open
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
            }
          `}
        >

          <div className="font-sans flex gap-5 text-white items-center">

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  hover:text-black
                  transition-all duration-300
                "
              >
                {link.label}
              </Link>
            ))}


            {user ? (

              <Link
                href="/profile"
                className="flex items-center gap-2 group"
              >

                {user.avatarUrl && (
                  <img
                    src={user.avatarUrl}
                    alt={user.name ?? "Profile"}
                    className=" w-6 h-6 rounded-full border border-white/20 group-hover:border-black transition-all"
                  />
                )}

                <span
                  className=" text-sm group-hover:text-black transition-all max-w-[100px] truncate"
                >
                  {user.name ?? user.login ?? "Profile"}
                </span>

              </Link>

            ) : (

              <div className="flex gap-3 items-center text-sm">

                <Link
                  href="/login"
                  className="
                    hover:text-black
                    transition-all
                  "
                >
                  Login
                </Link>

              </div>

            )}

          </div>


          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer pl-3"
          >
            <CircleX
              className="
                text-white
                hover:text-black
                transition-all
              "
            />
          </button>


        </div>

      </div>

    </nav>
  );
}