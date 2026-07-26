"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLogo() {
  const pathname = usePathname();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link href="/" onClick={handleClick} className="shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-dark.svg"
        alt="DM Workflows"
        className="h-7 w-auto sm:h-9"
      />
    </Link>
  );
}