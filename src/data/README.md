# Content data

Content is split by area so you can edit one file without touching the rest.

| File | Purpose |
|------|--------|
| **home.json** | Desk states (alex, computer, bucketlist) and billboard items for the main / explore view. |
| **hackathons.json** | Hackathon entries shown in the computer’s Hackathons folder. |
| **content.json** | Everything else: computer desktop folders (structure + website, experiences, alex_mov, projects), and portals (hobbies, workbench). The Hackathons folder’s `entries` are empty here and are merged at runtime from `hackathons.json`. |

Merging is done in `@/lib/content.ts`: it imports these files and exports `siteContent` (home + portals) and `desktopFolders` (content folders with hackathons entries injected).

You can add more area-specific files later (e.g. `hobbies.json`, `workbench.json`) and wire them in `content.ts` the same way as hackathons.
