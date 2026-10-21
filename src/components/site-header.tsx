"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  BagIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";
import { mainNav, siteConfig } from "@/lib/site";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export function SiteHeader() {
  const isHome = usePathname() === "/";
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Over the homepage hero the header is transparent until the page scrolls
  const transparent = isHome && !scrolled;
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${isHome ? "fixed" : "sticky"} inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        transparent
          ? "border-transparent bg-transparent text-white"
          : "border-line bg-white text-ink"
      }`}
    >
      <div className="container-page h-header grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="-ml-3 flex items-center">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 px-3"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
            <span className="hidden md:inline">Menu</span>
          </button>
          <Link href="/search" className="inline-flex h-11 items-center gap-2 px-3">
            <SearchIcon />
            <span className="hidden md:inline">Search</span>
            <span className="sr-only md:hidden">Search</span>
          </Link>
        </div>

        <Link
          href="/"
          className="text-body tracking-[0.18em] whitespace-nowrap uppercase sm:text-heading-s sm:tracking-[0.2em] md:text-heading-m"
        >
          {siteConfig.name}
        </Link>

        <div className="-mr-3 flex items-center justify-end">
          <Link href="/wishlist" className="btn-icon hidden sm:inline-flex" aria-label="Wishlist">
            <HeartIcon />
          </Link>
          <Link href="/account" className="btn-icon" aria-label="Account">
            <UserIcon />
          </Link>
          <Link href="/cart" className="btn-icon relative" aria-label="Shopping bag, 0 items">
            <BagIcon />
            <span className="absolute top-1.5 right-1 grid size-4 place-items-center rounded-pill bg-current text-[0.625rem] leading-none">
              <span className={transparent ? "text-ink" : "text-white"}>0</span>
            </span>
          </Link>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 ${menuOpen ? "" : "pointer-events-none"}`}
        inert={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-scrim transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
          aria-hidden="true"
        />
        <nav
          id="site-menu"
          aria-label="Main"
          className={`absolute inset-y-0 left-0 flex w-full max-w-md flex-col overflow-y-auto bg-white text-ink transition-transform duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-header flex shrink-0 items-center px-(--gutter)">
            <button
              type="button"
              className="-ml-3 inline-flex h-11 items-center gap-2 px-3"
              onClick={closeMenu}
            >
              <CloseIcon />
              Close
            </button>
          </div>
          <ul className="flex flex-col gap-1 px-(--gutter) py-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-heading-s transition-colors hover:text-muted"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-auto flex flex-col gap-3 hairline-t px-(--gutter) py-8 type-caption text-muted">
            <li>
              <Link href="/account" className="link" onClick={closeMenu}>
                My Account
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="link" onClick={closeMenu}>
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/contact" className="link" onClick={closeMenu}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
