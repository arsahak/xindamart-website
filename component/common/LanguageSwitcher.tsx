"use client";

import { useRouter, usePathname, useParams } from "next/navigation";
import { locales, localeNames, type Locale } from "@/app/i18n-config";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ lang: Locale }>();
  const currentLang = params?.lang ?? "en";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/") || "/");
  };

  return (
    <select
      aria-label="Select language"
      value={currentLang}
      onChange={handleChange}
      className="!w-auto !py-1 !px-2 !text-sm"
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {localeNames[l]}
        </option>
      ))}
    </select>
  );
}
