import { useEffect, useState } from "react";

const COOKIE_NAME = "seen_v2";
const COOKIE_DAYS = 180;

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const writeCookie = (name: string, value: string, days: number) => {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
};

export const useBootSeen = () => {
  const [shouldBoot, setShouldBoot] = useState<boolean>(false);

  useEffect(() => {
    const seen = readCookie(COOKIE_NAME);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!seen && !reduce) {
      setShouldBoot(true);
    }
  }, []);

  const markSeen = () => {
    writeCookie(COOKIE_NAME, "1", COOKIE_DAYS);
    setShouldBoot(false);
  };

  return { shouldBoot, markSeen };
};
