"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/community", label: "Join the community" },
  { href: "/experiences", label: "Explore our experiences" },
  { href: "/rewards", label: "Our rewards program" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const linkClass = (href: string) =>
    `border-b pb-0.5 transition-colors ${isActive(href) ? "border-ink" : "border-transparent hover:border-ink/40"}`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_6px_10px_-4px_rgba(0,0,0,0.18)]">
      <nav className="container-page flex h-12 items-center justify-between">
        <Link href="/" className="font-serif text-[26px] leading-none">
          Véva
        </Link>

        <ul className="hidden items-center gap-10 text-[13px] lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ml-6">
            <Link href="/login" className={linkClass("/login")}>
              Login
            </Link>
          </li>
        </ul>

        <button
          className="text-[13px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="container-page flex flex-col gap-4 border-t border-line py-6 text-sm lg:hidden">
          {[...links, { href: "/login", label: "Login" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
