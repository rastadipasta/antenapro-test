"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  LEGAL_ROUTES,
  PRIMARY_ROUTES,
  SECONDARY_SERVICE_ROUTES,
} from "@/lib/site-data";
import {
  SITE_PRELOAD_PROGRESS_EVENT,
  SITE_PRELOAD_SETTLED_EVENT,
  SITE_PRELOAD_STARTED_EVENT,
  type SitePreloadProgressDetail,
} from "@/lib/preload-events";

type NetworkInformation = {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
};

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function emitProgress(detail: SitePreloadProgressDetail) {
  window.dispatchEvent(new CustomEvent(SITE_PRELOAD_PROGRESS_EVENT, { detail }));
}

export default function SitePreloader() {
  const router = useRouter();
  const pathname = usePathname();
  const startedRef = useRef(false);
  const initialPathnameRef = useRef(pathname);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const timers = new Set<number>();
    const deferredTasks = new Set<() => void>();
    const prefetchedRoutes = new Set<string>();
    const idleWindow = window as WindowWithIdleCallback;
    let idleHandle: number | null = null;
    let disposed = false;

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        if (!disposed) callback();
      }, delay);
      timers.add(timer);
    };

    const runWhenVisible = (callback: () => void) => {
      if (document.hidden) deferredTasks.add(callback);
      else callback();
    };

    const prefetchRoute = (route: string) => {
      if (route === initialPathnameRef.current || prefetchedRoutes.has(route)) return;
      prefetchedRoutes.add(route);
      try {
        router.prefetch(route);
        document.documentElement.dataset.prefetchedRoutes = String(prefetchedRoutes.size);
      } catch {
        // Prefetch is opportunistic and must never block the loader.
      }
    };

    const prefetchBatch = (routes: readonly string[], delayStep = 70) => {
      routes.forEach((route, index) => {
        schedule(() => runWhenVisible(() => prefetchRoute(route)), index * delayStep);
      });
    };

    const prefetchWhenIdle = (routes: readonly string[]) => {
      const callback = () => prefetchBatch(routes, 110);
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(callback, { timeout: 5000 });
      } else {
        schedule(callback, 2400);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) return;
      const pending = Array.from(deferredTasks);
      deferredTasks.clear();
      pending.forEach((task) => task());
    };

    const networkNavigator = navigator as NavigatorWithConnection;
    const connection =
      networkNavigator.connection ??
      networkNavigator.mozConnection ??
      networkNavigator.webkitConnection;
    const effectiveType = connection?.effectiveType;
    const isConstrained = connection?.saveData === true || effectiveType === "slow-2g" || effectiveType === "2g";
    const isBalanced = effectiveType === "3g";
    const strategy = isConstrained ? "constrained" : isBalanced ? "balanced" : "fast";

    document.documentElement.dataset.sitePreload = "active";
    document.documentElement.dataset.preloadStrategy = strategy;
    document.addEventListener("visibilitychange", handleVisibilityChange);

    schedule(() => {
      window.dispatchEvent(new Event(SITE_PRELOAD_STARTED_EVENT));
      emitProgress({ progress: 0.2, stage: "critical" });
    }, 30);

    const primaryRoutes = isConstrained
      ? Array.from(new Set(["/", "/kontakt", initialPathnameRef.current]))
      : PRIMARY_ROUTES;

    schedule(() => prefetchBatch(primaryRoutes, 75), 360);
    schedule(() => emitProgress({ progress: 0.55, stage: "primary" }), 1000);

    if (isConstrained) {
      schedule(() => emitProgress({ progress: 0.85, stage: "services" }), 1780);
    } else if (isBalanced) {
      schedule(() => prefetchBatch(SECONDARY_SERVICE_ROUTES, 90), 1120);
      prefetchWhenIdle(LEGAL_ROUTES);
      schedule(() => emitProgress({ progress: 0.85, stage: "services" }), 1840);
    } else {
      schedule(() => prefetchBatch(SECONDARY_SERVICE_ROUTES, 75), 1080);
      schedule(() => prefetchBatch(LEGAL_ROUTES, 90), 1740);
      schedule(() => emitProgress({ progress: 0.85, stage: "services" }), 1820);
    }

    schedule(() => {
      emitProgress({ progress: 1, stage: "complete" });
      document.documentElement.dataset.sitePreload = "settled";
      window.dispatchEvent(
        new CustomEvent(SITE_PRELOAD_SETTLED_EVENT, {
          detail: { strategy, routeCount: prefetchedRoutes.size },
        }),
      );
    }, 2050);

    return () => {
      disposed = true;
      timers.forEach(window.clearTimeout);
      timers.clear();
      deferredTasks.clear();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (idleHandle !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle);
      }
    };
  }, [router]);

  return null;
}
