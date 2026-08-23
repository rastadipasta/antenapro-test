"use client";

import { memo, type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { type SiteMetric } from "@/lib/site-data";
import { PAGE_SETTLED_EVENT } from "./ScrollMotionProvider";

type CounterVariant = "compact" | "large";

type RollingCounterProps = {
  metric: SiteMetric;
  variant: CounterVariant;
  index?: number;
  active?: boolean;
  ready?: boolean;
};

type StatsCountersProps = {
  metrics: readonly SiteMetric[];
  variant: CounterVariant;
  className?: string;
  children?: ReactNode;
};

function formatMetric(metric: SiteMetric) {
  const number = metric.decimals === undefined
    ? String(metric.value)
    : metric.value.toFixed(metric.decimals);
  return `${number}${metric.suffix ?? ""}`;
}

const DigitReel = memo(function DigitReel({ digit, index }: { digit: string; index: number }) {
  const target = Number(digit);
  const steps = 20 + target;
  const reel = Array.from({ length: steps + 1 }, (_, reelIndex) => reelIndex % 10);
  const style = {
    "--digit-delay": `${index * 60}ms`,
    "--digit-offset": `-${steps}em`,
  } as CSSProperties;

  return (
    <span className="rolling-digit" style={style}>
      <span className="rolling-digit__track">
        {reel.map((number, reelIndex) => <span key={reelIndex}>{number}</span>)}
      </span>
    </span>
  );
});

export function RollingCounter({
  metric,
  variant,
  index = 0,
  active = false,
  ready = false,
}: RollingCounterProps) {
  const displayValue = formatMetric(metric);
  const numberPart = metric.decimals === undefined
    ? String(metric.value)
    : metric.value.toFixed(metric.decimals);

  return (
    <div className={`stat-counter stat-counter--${variant}`} style={{ "--counter-index": index } as CSSProperties}>
      <strong className={`rolling-counter ${ready ? "is-ready" : ""} ${active ? "is-active" : ""}`}>
        <span className="sr-only">{displayValue}</span>
        <span className="rolling-counter__fallback" aria-hidden="true">{displayValue}</span>
        <span className="rolling-counter__visual" aria-hidden="true">
          {[...numberPart].map((character, characterIndex) => (
            /\d/.test(character)
              ? <DigitReel digit={character} index={characterIndex} key={`${character}-${characterIndex}`} />
              : <span className="rolling-counter__static" key={`${character}-${characterIndex}`}>{character}</span>
          ))}
          {metric.suffix && <span className="rolling-counter__static">{metric.suffix}</span>}
        </span>
      </strong>
      <span>{metric.label}</span>
    </div>
  );
}

export default function StatsCounters({ metrics, variant, className = "", children }: StatsCountersProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let disposed = false;
    const frames = new Set<number>();
    const scheduleFrame = (callback: () => void) => {
      const frame = window.requestAnimationFrame(() => {
        frames.delete(frame);
        if (!disposed) callback();
      });
      frames.add(frame);
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      scheduleFrame(() => setActive(true));
      return () => {
        disposed = true;
        frames.forEach(window.cancelAnimationFrame);
      };
    }

    scheduleFrame(() => setReady(true));

    const startObserving = () => {
      if (disposed || observer || !groupRef.current) return;
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          scheduleFrame(() => setActive(true));
          observer?.disconnect();
          observer = null;
        },
        { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(groupRef.current);
    };

    const handlePageSettled = () => startObserving();
    window.addEventListener(PAGE_SETTLED_EVENT, handlePageSettled);

    const curtain = document.querySelector(".route-curtain");
    if (curtain?.classList.contains("is-idle") || (!curtain && document.documentElement.dataset.introComplete === "true")) {
      scheduleFrame(startObserving);
    }

    return () => {
      disposed = true;
      frames.forEach(window.cancelAnimationFrame);
      frames.clear();
      window.removeEventListener(PAGE_SETTLED_EVENT, handlePageSettled);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className={`stats-counter-group ${active ? "is-active" : ""} ${className}`.trim()} ref={groupRef}>
      {metrics.map((metric, index) => (
        <RollingCounter
          active={active}
          index={index}
          key={`${metric.value}-${metric.suffix ?? ""}-${metric.label}`}
          metric={metric}
          ready={ready}
          variant={variant}
        />
      ))}
      {children}
    </div>
  );
}
