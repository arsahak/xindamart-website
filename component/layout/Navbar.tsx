"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { navCategories } from "@/app/data/categories";
import { MegaMenu } from "@/component/layout/MegaMenu";
import { MobileDrawer } from "@/component/motion/MobileDrawer";
import { getDirection, type Locale } from "@/app/i18n-config";
import type { Dictionary } from "@/app/dictionaries";

interface NavbarProps {
  dict: Dictionary;
}

const Navbar = ({ dict }: NavbarProps) => {
  const params = useParams<{ lang: Locale }>();
  const lang = params?.lang ?? "en";
  const dir = getDirection(lang);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-(--color-surface) shadow-(--shadow-sm)">
      {/* Main row: logo, search, actions */}
      <div className="container flex items-center gap-3 py-3">
        <button
          type="button"
          aria-label="Open menu"
          className="btn-ghost !p-2 lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={22} />
        </button>

        <Link
          href={`/${lang}`}
          className="shrink-0 font-[family-name:var(--font-heading)] text-xl font-extrabold tracking-tight text-(--color-primary) sm:text-2xl"
        >
          Xinda<span className="text-(--color-secondary)">mart</span>
        </Link>

        <form role="search" className="hidden flex-1 items-center md:flex">
          <label htmlFor="navbar-search" className="sr-only">
            {dict.common.search}
          </label>
          <div className="flex w-full items-center gap-1 rounded-full border border-(--color-border) bg-(--color-bg) p-1 transition-colors focus-within:border-(--color-primary) focus-within:bg-(--color-surface) focus-within:shadow-[0_0_0_3px_var(--color-primary-faint)]">
            <input
              id="navbar-search"
              type="search"
              placeholder={dict.common.search}
              className="w-full min-w-0 border-0 bg-transparent px-3 py-0 shadow-none outline-none"
            />
            <button type="submit" aria-label={dict.common.search} className="btn-primary shrink-0 rounded-full px-5 py-2">
              <Search size={18} />
            </button>
          </div>
        </form>

        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          <Link
            href={`/${lang}/wishlist`}
            className="btn-ghost hidden !flex-col !gap-0.5 !px-3 !py-1.5 sm:flex"
          >
            <Heart size={20} />
            <span className="text-xs font-medium">{dict.nav.wishlist}</span>
          </Link>

          <Link
            href={`/${lang}/cart`}
            className="btn-ghost relative hidden !flex-col !gap-0.5 !px-3 !py-1.5 sm:flex"
          >
            <span className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-(--color-secondary) text-[10px] font-bold text-white">
                0
              </span>
            </span>
            <span className="text-xs font-medium">{dict.nav.cart}</span>
          </Link>

          <Link
            href={`/${lang}/sign-in`}
            className="btn-ghost hidden !flex-col !gap-0.5 !px-3 !py-1.5 sm:flex"
          >
            <User size={20} />
            <span className="text-xs font-medium">{dict.nav.account}</span>
          </Link>

          <Link href={`/${lang}/cart`} className="btn-ghost relative !p-2 sm:hidden">
            <ShoppingCart size={20} />
            <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-(--color-secondary) text-[9px] font-bold text-white">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* Category row with mega menus (desktop) */}
      <div
        className="relative hidden border-t border-(--color-border) bg-(--color-bg) lg:block"
        onMouseLeave={() => setActiveCategory(null)}
      >
        <nav className="container flex items-center gap-1">
          <Link
            href={`/${lang}/category`}
            className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-(--color-primary)"
          >
            <LayoutGrid size={16} />
            {dict.nav.all_categories}
          </Link>

          {navCategories.map((category) => (
            <div key={category.label} onMouseEnter={() => setActiveCategory(category.label)}>
              <Link
                href={`/${lang}${category.href}`}
                className="flex items-center gap-1 px-3 py-2.5 text-sm font-medium text-(--color-text) transition-colors hover:text-(--color-primary)"
              >
                {category.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeCategory === category.label ? "rotate-180" : ""
                  }`}
                />
              </Link>
            </div>
          ))}

          <Link
            href={`/${lang}/deals`}
            className="px-3 py-2.5 text-sm font-semibold text-(--color-secondary)"
          >
            {dict.nav.deals}
          </Link>
          <Link
            href={`/${lang}/sellers`}
            className="px-3 py-2.5 text-sm font-medium text-(--color-text) transition-colors hover:text-(--color-primary)"
          >
            {dict.nav.sellers}
          </Link>
        </nav>

        {navCategories.map((category) => (
          <MegaMenu key={category.label} category={category} show={activeCategory === category.label} />
        ))}
      </div>

      {/* Mobile drawer */}
      <MobileDrawer show={mobileOpen} onClose={() => setMobileOpen(false)} side={dir === "rtl" ? "right" : "left"}>
        <div className="flex items-center justify-between border-b border-(--color-border) p-4">
          <Link
            href={`/${lang}`}
            onClick={() => setMobileOpen(false)}
            className="font-[family-name:var(--font-heading)] text-xl font-extrabold tracking-tight text-(--color-primary)"
          >
            Xinda<span className="text-(--color-secondary)">mart</span>
          </Link>
          <button type="button" aria-label="Close menu" className="btn-ghost !p-2" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <form role="search" className="flex items-center p-4">
          <label htmlFor="mobile-search" className="sr-only">
            {dict.common.search}
          </label>
          <div className="flex w-full items-center gap-1 rounded-full border border-(--color-border) bg-(--color-bg) p-1 transition-colors focus-within:border-(--color-primary) focus-within:bg-(--color-surface) focus-within:shadow-[0_0_0_3px_var(--color-primary-faint)]">
            <input
              id="mobile-search"
              type="search"
              placeholder={dict.common.search}
              className="w-full min-w-0 border-0 bg-transparent px-3 py-0 shadow-none outline-none"
            />
            <button type="submit" aria-label={dict.common.search} className="btn-primary shrink-0 rounded-full px-5 py-2">
              <Search size={18} />
            </button>
          </div>
        </form>

        <nav className="flex flex-col gap-1 px-2 pb-4">
          <Link
            href={`/${lang}`}
            onClick={() => setMobileOpen(false)}
            className="rounded-(--radius-md) px-3 py-2.5 text-sm font-medium transition-colors hover:bg-(--color-bg)"
          >
            {dict.nav.home}
          </Link>

          {navCategories.map((category) => (
            <details key={category.label} className="group">
              <summary className="flex list-none items-center justify-between rounded-(--radius-md) border-0 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-(--color-bg)">
                {category.label}
                <ChevronDown size={16} className="transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="flex flex-col gap-0.5 py-1 ps-6">
                {category.columns
                  .flatMap((column) => column.links)
                  .slice(0, 6)
                  .map((link) => (
                    <Link
                      key={link.href}
                      href={`/${lang}${link.href}`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-(--radius-md) px-3 py-2 text-sm text-(--color-text-muted) transition-colors hover:bg-(--color-bg) hover:text-(--color-primary)"
                    >
                      {link.label}
                    </Link>
                  ))}
              </div>
            </details>
          ))}

          <Link
            href={`/${lang}/deals`}
            onClick={() => setMobileOpen(false)}
            className="rounded-(--radius-md) px-3 py-2.5 text-sm font-semibold text-(--color-secondary) transition-colors hover:bg-(--color-bg)"
          >
            {dict.nav.deals}
          </Link>
          <Link
            href={`/${lang}/sellers`}
            onClick={() => setMobileOpen(false)}
            className="rounded-(--radius-md) px-3 py-2.5 text-sm font-medium transition-colors hover:bg-(--color-bg)"
          >
            {dict.nav.sellers}
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-(--color-border) p-4">
          <div className="grid grid-cols-2 gap-2">
            <Link href={`/${lang}/wishlist`} onClick={() => setMobileOpen(false)} className="btn-outline btn-sm">
              <Heart size={16} />
              {dict.nav.wishlist}
            </Link>
            <Link href={`/${lang}/cart`} onClick={() => setMobileOpen(false)} className="btn-outline btn-sm">
              <ShoppingCart size={16} />
              {dict.nav.cart}
            </Link>
          </div>
          <Link href={`/${lang}/sign-in`} onClick={() => setMobileOpen(false)} className="btn-primary btn-sm">
            <User size={16} />
            {dict.nav.sign_in}
          </Link>
        </div>
      </MobileDrawer>
    </header>
  );
};

export default Navbar;
