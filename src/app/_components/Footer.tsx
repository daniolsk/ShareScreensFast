import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="p-4 text-center text-sm md:p-6">
      Made with ❤️ by{" "}
      <Link
        href="https://github.com/daniolsk"
        target="_blank"
        className="underline"
      >
        Daniel Skowron
      </Link>
    </footer>
  );
}

export default Footer;
