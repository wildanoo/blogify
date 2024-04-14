"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LangSwitcher = ({ locale }: { locale: "en" | "de" }) => {
  const targetLanguage = locale === "en" ? "de" : "en";
  const pathname = usePathname();
  const redirectTarget = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = targetLanguage;
    return segments.join("/");
  };
  return (
    <Link className="font-semibold" locale={targetLanguage} href={redirectTarget()}>
      {targetLanguage.toUpperCase()}
    </Link>
  );
};

export default LangSwitcher;
