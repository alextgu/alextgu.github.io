# Desk scene assets

For the layered desk UI (video + desk mask + hitboxes):

1. **desk-video.mp4** – Background video. Place at `public/assets/desk-video.mp4`.  
   Used as Layer 1: loops, muted, autoplay, `object-fit: cover`.

2. **desk-mask.png** – Desk image as a **transparent PNG**.  
   Place at `public/assets/desk-mask.png`.  
   The “window” area in the art must be cut out (alpha transparency) so the video shows through.

Hitbox positions (Notebook, Lamp, Phone) are defined in `src/app/(with-navbar)/page.tsx` as `DESK_HITBOXES` and can be adjusted to match your art.
