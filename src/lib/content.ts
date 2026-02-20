import data from "@/data/content.json";

// ── Type definitions for content.json ──

export interface HudCard {
  displayType: "HUD_CARD";
  title: string;
  content: string;
}

export interface HudList {
  displayType: "HUD_LIST";
  title: string;
  items: string[];
}

export type DeskState = HudCard | HudList;

export interface BillboardBlog {
  type: "blog";
  id: string;
  image: string;
  title: string;
  summary: string;
}

export interface BillboardVideo {
  type: "video";
  id: string;
  image: string;
  title: string;
  videoUrl: string;
}

export type BillboardItem = BillboardBlog | BillboardVideo;

export interface HobbyCategory {
  id: string;
  displayType: string;
  title: string;
  items: unknown[];
}

export interface SiteContent {
  deskStates: Record<string, DeskState>;
  billboard: BillboardItem[];
  portals: {
    projects: { path: string; items: unknown[] };
    hobbies: { path: string; categories: HobbyCategory[] };
  };
}

// ── Typed content ──

export const siteContent = data as SiteContent;

// ── Fallback ──

const DEFAULT_DESK_STATE: HudCard = {
  displayType: "HUD_CARD",
  title: "Alex T. Gu",
  content: "Bio content goes here...",
};

// ── Content picker ──

/**
 * Resolves a desk state by view key.
 * Falls back to the "alex" entry, then to a hardcoded default
 * so the site never renders broken content.
 */
export function getContentByView(view: string | null | undefined): DeskState {
  if (!view) return siteContent.deskStates.alex ?? DEFAULT_DESK_STATE;

  const state = siteContent.deskStates[view];
  if (state) return state;

  return siteContent.deskStates.alex ?? DEFAULT_DESK_STATE;
}

/**
 * Returns the billboard items array (typed).
 */
export function getBillboardItems(): BillboardItem[] {
  return siteContent.billboard ?? [];
}
