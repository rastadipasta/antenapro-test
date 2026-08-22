"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";
import {
  SITE_PRELOAD_PROGRESS_EVENT,
  type SitePreloadProgressDetail,
} from "@/lib/preload-events";

type BrandLoaderProps = {
  className?: string;
  label?: string;
  announce?: boolean;
  trackPreload?: boolean;
};

export default function BrandLoader({
  className = "",
  label = "Učitavanje",
  announce = false,
  trackPreload = false,
}: BrandLoaderProps) {
  const [progress, setProgress] = useState(trackPreload ? 0.08 : 0);

  useEffect(() => {
    if (!trackPreload) return;
    const handleProgress = (event: Event) => {
      const detail = (event as CustomEvent<SitePreloadProgressDetail>).detail;
      if (detail) setProgress(detail.progress);
    };
    window.addEventListener(SITE_PRELOAD_PROGRESS_EVENT, handleProgress);
    return () => window.removeEventListener(SITE_PRELOAD_PROGRESS_EVENT, handleProgress);
  }, [trackPreload]);

  const progressStyle = trackPreload
    ? ({ "--loader-progress": progress } as CSSProperties)
    : undefined;

  return (
    <div
      className={`brand-loader ${className}`.trim()}
      aria-hidden={announce ? undefined : true}
      role={announce ? "status" : undefined}
      aria-live={announce ? "polite" : undefined}
      aria-label={announce ? label : undefined}
    >
      <div className="brand-loader__stage">
        <div className="brand-loader__logo">
          <Image
            src="/images/logo-nav-transparent.png"
            alt=""
            width={240}
            height={219}
            priority
            sizes="(max-width: 640px) 150px, 200px"
          />
        </div>
        <span className="brand-loader__progress" style={progressStyle} aria-hidden="true"><i /></span>
      </div>
      {announce && <span className="sr-only">{label}</span>}
    </div>
  );
}
