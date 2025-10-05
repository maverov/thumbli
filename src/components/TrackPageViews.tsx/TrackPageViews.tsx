"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TrackPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: pathname + searchParams.toString(),
    });
  }, [pathname, searchParams]);

  return null;
}
