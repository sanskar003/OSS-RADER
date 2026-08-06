"use client";

import { Radar, CircleX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LinkItems {
  href: string;
  label: string;
}

interface User {
  name?: string;
  avatarUrl?: string;
}

interface NavbarMenuProps {
  links: LinkItems[];
  user: User | null;
}

export const NavbarMenu = ({
  links,
  user,
}: NavbarMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex items-center relative overflow-hidden rounded-full 
      border border-white/10 bg-emerald-500 backdrop-blur-xl 
      transition-all duration-500 h-12 ${
        open ? "w-[500px]" : "w-16"
      }`}
    >
      <button
        onClick={() => setOpen(true)}
        disabled={open}
        className="absolute left-5 z-10 cursor-pointer"
      >
        <Radar className="text-white" />
      </button>

      <div
        className={`w-full flex items-center justify-between pr-6 pl-14 transition-opacity ${
          open
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="font-sans flex gap-5 text-white items-center">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-black transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <Link
              href="/profile"
              className="flex items-center group"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name ?? "Profile"}
                  className="
                    w-6 h-6 rounded-full 
                    border border-white/20
                    group-hover:border-black
                  "
                />
              ) : (
                <span className="hover:text-black">
                  Profile
                </span>
              )}
            </Link>
          ) : (
            <div className="flex gap-4 items-center text-sm">
              <Link
                href="/login"
                className="hover:text-black"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="
                  bg-white/20 px-3 py-1 
                  rounded-full text-xs
                  hover:text-black
                "
              >
                Sign Up
              </Link>
            </div>
          )}

        </div>

        <button
          onClick={() => setOpen(false)}
          className="cursor-pointer pl-3"
        >
          <CircleX className="text-white hover:text-black" />
        </button>
      </div>
    </div>
  );
};