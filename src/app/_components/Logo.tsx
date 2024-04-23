"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-4 text-xl font-semibold hover:underline"
    >
      <Image
        src="/logo-dark.svg"
        alt="logo"
        className="h-10 w-10 dark:hidden"
        width={32}
        height={32}
      />
      <Image
        src="/logo-light.svg"
        alt="logo"
        className="hidden h-10 w-10 dark:block"
        width={32}
        height={32}
      />
    </Link>
  );
}

export default Logo;
