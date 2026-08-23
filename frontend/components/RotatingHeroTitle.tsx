"use client";

import { useEffect, useRef, useState } from "react";
import { PAGE_SETTLED_EVENT } from "./ScrollMotionProvider";

const WORD_TRANSITION_MS = 480;

type RotatingHeroTitleProps = {
  items: readonly string[];
  intervalMs?: number;
  firstLine?: string;
};

export default function RotatingHeroTitle({
  items,
  intervalMs = 2400,
  firstLine = "Trebate",
}: RotatingHeroTitleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const currentIndexRef = useRef(0);
  const sizingWord = items.reduce(
    (longest, item) => item.length > longest.length ? item : longest,
    items[0] ?? "",
  );
  const accessibleItems = `${items
    .map((item) => item.replace(/\?$/, ""))
    .join(", ")
    .replace(/, ([^,]*)$/, " ili $1")}?`;

  useEffect(() => {
    if (items.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let started = false;
    let cycleTimer: number | null = null;
    let transitionTimer: number | null = null;
    let startFrame: number | null = null;

    const clearTimer = (timer: number | null) => {
      if (timer !== null) window.clearTimeout(timer);
    };

    const scheduleNext = () => {
      clearTimer(cycleTimer);
      cycleTimer = window.setTimeout(() => {
        if (disposed || document.hidden) return;
        const outgoingIndex = currentIndexRef.current;
        const nextIndex = (outgoingIndex + 1) % items.length;
        currentIndexRef.current = nextIndex;
        setPreviousIndex(outgoingIndex);
        setCurrentIndex(nextIndex);
        clearTimer(transitionTimer);
        transitionTimer = window.setTimeout(() => {
          if (!disposed) setPreviousIndex(null);
        }, WORD_TRANSITION_MS);
        scheduleNext();
      }, intervalMs);
    };

    const start = () => {
      if (disposed || started) return;
      started = true;
      scheduleNext();
    };

    const handleVisibilityChange = () => {
      clearTimer(cycleTimer);
      clearTimer(transitionTimer);
      cycleTimer = null;
      transitionTimer = null;
      setPreviousIndex(null);
      if (!document.hidden && started) scheduleNext();
    };

    window.addEventListener(PAGE_SETTLED_EVENT, start);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const curtain = document.querySelector(".route-curtain");
    if (curtain?.classList.contains("is-idle") || (!curtain && document.documentElement.dataset.introComplete === "true")) {
      startFrame = window.requestAnimationFrame(start);
    }

    return () => {
      disposed = true;
      clearTimer(cycleTimer);
      clearTimer(transitionTimer);
      if (startFrame !== null) window.cancelAnimationFrame(startFrame);
      window.removeEventListener(PAGE_SETTLED_EVENT, start);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [intervalMs, items]);

  const currentItem = items[currentIndex] ?? "";
  const previousItem = previousIndex === null ? null : items[previousIndex];

  return (
    <h1 className="rotating-title" aria-label={`${firstLine} ${accessibleItems}`}>
      <span aria-hidden="true">{firstLine}</span>
      <br aria-hidden="true" />
      <span className="rotating-title__line" aria-hidden="true">
        <span className="rotating-title__sizer">{sizingWord}</span>
        {previousItem && <em className="rotating-title__word is-leaving">{previousItem}</em>}
        <em className={previousItem ? "rotating-title__word is-entering" : "rotating-title__word"} key={currentIndex}>
          {currentItem}
        </em>
      </span>
    </h1>
  );
}
