export const SITE_PRELOAD_STARTED_EVENT = "antenapro:preload-started";
export const SITE_PRELOAD_PROGRESS_EVENT = "antenapro:preload-progress";
export const SITE_PRELOAD_SETTLED_EVENT = "antenapro:preload-settled";

export type SitePreloadProgressDetail = {
  progress: number;
  stage: "critical" | "primary" | "services" | "complete";
};
