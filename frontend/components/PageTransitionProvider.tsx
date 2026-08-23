"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import BrandLoader from "./BrandLoader";
import { PAGE_SETTLED_EVENT } from "./ScrollMotionProvider";
import TransitionCurtain from "./TransitionCurtain";

const INTRO_DURATION = 2200;
const TRANSITION_DURATION = 1300;
const ROUTE_SWAP_DELAY = TRANSITION_DURATION / 2;
const REVEAL_DURATION = 650;
const REDUCED_DURATION = 130;
const NAVIGATION_TIMEOUT = 5000;

type TransitionPhase = "intro" | "idle" | "transitioning" | "pop-reveal";
type PendingNavigation = { destination: string; pathname: string };

const ROUTE_TITLES: Record<string, string> = {
  "/": "Početna",
  "/o-nama": "O nama",
  "/projekti": "Projekti",
  "/kontakt": "Kontakt",
  "/politika-privatnosti": "Privatnost",
  "/pravila-o-kolacicima": "Kolačići",
  "/usluge/montaza-antena": "Montaža antena",
  "/usluge/starlink-internet-wifi": "Starlink i Wi-Fi",
  "/usluge/videonadzor-alarmi": "Videonadzor i alarmi",
  "/usluge/montaza-televizora": "Montaža televizora",
  "/usluge/eon-tv-podrska": "EON TV podrška",
  "/usluge/a1-podrska": "A1 podrška",
};

function getRouteTitle(path: string) {
  return ROUTE_TITLES[path] ?? "AntenaPRO";
}

function getAnchor(event: MouseEvent) {
  return event.target instanceof Element
    ? event.target.closest<HTMLAnchorElement>("a[href]")
    : null;
}

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<TransitionPhase>("intro");
  const [transitionTitle, setTransitionTitle] = useState(() => getRouteTitle(pathname));
  const [contentEntering, setContentEntering] = useState(false);
  const phaseRef = useRef<TransitionPhase>("intro");
  const pendingRef = useRef<PendingNavigation | null>(null);
  const previousOverflowRef = useRef("");
  const timersRef = useRef<number[]>([]);
  const reducedMotionRef = useRef(false);

  const updatePhase = (nextPhase: TransitionPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  };

  const schedule = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
    return timer;
  };

  const lockScroll = () => {
    if (document.body.dataset.transitionLocked === "true") return;
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.transitionLocked = "true";
  };

  const unlockScroll = () => {
    document.body.style.overflow = previousOverflowRef.current;
    delete document.body.dataset.transitionLocked;
  };

  const focusPage = () => {
    const main = document.querySelector<HTMLElement>("main");
    if (!main) return;
    const hadTabIndex = main.hasAttribute("tabindex");
    if (!hadTabIndex) main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
    if (!hadTabIndex) {
      main.addEventListener("blur", () => main.removeAttribute("tabindex"), { once: true });
    }
  };

  const finishTransition = (shouldFocus = false) => {
    pendingRef.current = null;
    setContentEntering(false);
    updatePhase("idle");
    unlockScroll();
    if (shouldFocus) focusPage();
    window.requestAnimationFrame(() => window.dispatchEvent(new Event(PAGE_SETTLED_EVENT)));
  };

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lockScroll();
    const duration = reducedMotionRef.current ? REDUCED_DURATION : INTRO_DURATION;
    schedule(() => {
      document.documentElement.dataset.introComplete = "true";
      finishTransition();
    }, duration);

    return () => {
      timersRef.current.forEach(window.clearTimeout);
      timersRef.current = [];
      unlockScroll();
    };
    // This persistent provider intentionally initializes once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const anchor = getAnchor(event);
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        anchor.dataset.noTransition !== undefined ||
        (anchor.target && anchor.target !== "_self")
      ) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (!['http:', 'https:'].includes(url.protocol) || url.origin !== window.location.origin) return;

      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      if (phaseRef.current !== "idle") return;

      pendingRef.current = {
        destination: `${url.pathname}${url.search}${url.hash}`,
        pathname: url.pathname,
      };
      const startedNavigation = pendingRef.current;
      setTransitionTitle(getRouteTitle(url.pathname));
      setContentEntering(false);
      lockScroll();
      updatePhase("transitioning");

      const swapDelay = reducedMotionRef.current ? REDUCED_DURATION / 2 : ROUTE_SWAP_DELAY;
      const transitionDuration = reducedMotionRef.current ? REDUCED_DURATION : TRANSITION_DURATION;
      schedule(() => {
        const pending = pendingRef.current;
        if (!pending || pending !== startedNavigation) return;
        try {
          router.push(pending.destination, { scroll: true });
        } catch {
          finishTransition();
        }
      }, swapDelay);

      schedule(() => {
        if (pendingRef.current === startedNavigation) finishTransition(true);
      }, transitionDuration);

      schedule(() => {
        if (pendingRef.current === startedNavigation) finishTransition();
      }, NAVIGATION_TIMEOUT);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    const pending = pendingRef.current;
    if (!pending || pending.pathname !== pathname) return;
    window.requestAnimationFrame(() => setContentEntering(true));
  }, [pathname]);

  useEffect(() => {
    const handlePopState = () => {
      if (phaseRef.current !== "idle") return;
      setTransitionTitle(getRouteTitle(window.location.pathname));
      lockScroll();
      updatePhase("pop-reveal");
      const duration = reducedMotionRef.current ? REDUCED_DURATION : REVEAL_DURATION;
      schedule(() => finishTransition(true), duration);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`transition-content ${contentEntering ? "is-entering" : ""}`}>
        {children}
      </div>
      <div className={`route-curtain is-${phase}`} aria-hidden="true">
        {phase === "intro" ? (
          <BrandLoader trackPreload />
        ) : (
          <TransitionCurtain title={transitionTitle} showLogo={transitionTitle === "Početna"} />
        )}
      </div>
    </>
  );
}
