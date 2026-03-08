import homeData from "@/data/home.json";
import hackathonsData from "@/data/hackathons.json";
import contentData from "@/data/content.json";

// ── Type definitions ──

export interface HudCard {
  displayType: "HUD_CARD";
  subtitle: string;
  content: string;
}

export interface HudList {
  displayType: "HUD_LIST";
  subtitle: string;
  items: string[];
}

export type DeskState = HudCard | HudList;

export interface BillboardBlog {
  type: "blog";
  id: string;
  image: string;
  title: string;
  summary?: string;
}

export interface BillboardVideo {
  type: "video";
  id: string;
  image: string;
  title: string;
  videoUrl?: string;
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
    hobbies: { path: string; description?: string; categories: HobbyCategory[] };
    workbench?: { path: string; description?: string };
  };
}

// ── Merged content (home + content.json portals) ──

export const siteContent: SiteContent = {
  ...homeData,
  portals: contentData.portals as SiteContent["portals"],
};

// ── Desktop folders (content.json + hackathons.json merged) ──

type DesktopFolderItem = (typeof contentData.desktopFolders)[number];

function mergeDesktopFolders(): DesktopFolderItem[] {
  const folders = contentData.desktopFolders as DesktopFolderItem[];
  return folders.map((folder) => {
    if (folder.id === "hackathons" && folder.content && "entries" in folder.content) {
      return {
        ...folder,
        content: {
          ...folder.content,
          entries: hackathonsData.entries,
        },
      };
    }
    return folder;
  });
}

export const desktopFolders = mergeDesktopFolders();

// ── Fallback ──

const DEFAULT_DESK_STATE: HudCard = {
  displayType: "HUD_CARD",
  subtitle: "Alex T. Gu",
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
