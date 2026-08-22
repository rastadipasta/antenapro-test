"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

export const PAGE_SETTLED_EVENT = "antenapro:page-settled";

const REVEAL_SELECTOR = "[data-reveal]";
const IMAGE_REVEAL_SELECTOR = '[data-reveal="clip"]';
const GROUP_SELECTOR = "[data-reveal-group]";

function revealImmediately(elements: HTMLElement[]) {
  elements.forEach((element) => element.classList.add("is-revealed"));
}

function prepareRevealElements(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(GROUP_SELECTOR).forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      if (!child.dataset.reveal) child.dataset.reveal = "up";
      child.style.setProperty("--reveal-index", String(Math.min(index, 5)));
    });
  });

  return Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
}

export default function ScrollMotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imageObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    let disposed = false;
    let initialized = false;

    const initialize = () => {
      if (disposed || initialized) return;
      initialized = true;
      observerRef.current?.disconnect();
      imageObserverRef.current?.disconnect();

      const elements = prepareRevealElements(document);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion || !("IntersectionObserver" in window)) {
        revealImmediately(elements);
        document.documentElement.classList.add("motion-ready");
        return;
      }

      try {
        const reveal = (observer: IntersectionObserver) => (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            element.classList.add("is-revealed");
            observer.unobserve(element);
          });
        };

        const observer = new IntersectionObserver(
          (entries) => {
            reveal(observer)(entries);
          },
          { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
        );

        const imageObserver = new IntersectionObserver(
          (entries) => {
            reveal(imageObserver)(entries);
          },
          { threshold: 0.01, rootMargin: "0px 0px 14% 0px" },
        );

        observerRef.current = observer;
        imageObserverRef.current = imageObserver;
        elements.forEach((element) => {
          if (element.matches(IMAGE_REVEAL_SELECTOR)) imageObserver.observe(element);
          else observer.observe(element);
        });
        document.documentElement.classList.add("motion-ready");
      } catch {
        revealImmediately(elements);
        document.documentElement.classList.add("motion-ready");
      }
    };

    const handlePageSettled = () => initialize();
    window.addEventListener(PAGE_SETTLED_EVENT, handlePageSettled);

    const curtain = document.querySelector(".route-curtain");
    if (curtain?.classList.contains("is-idle")) {
      window.requestAnimationFrame(initialize);
    }

    return () => {
      disposed = true;
      window.removeEventListener(PAGE_SETTLED_EVENT, handlePageSettled);
      observerRef.current?.disconnect();
      observerRef.current = null;
      imageObserverRef.current?.disconnect();
      imageObserverRef.current = null;
    };
  }, [pathname]);

  return children;
}
