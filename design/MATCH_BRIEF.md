# Design-match brief (read fully before starting)

The client REJECTED the previous screens because they were designed from screen names, not copied from Figma.
Your job: make every screen in your section look EXACTLY like its Figma image. Copy, never redesign.

## Source of truth
- Figma screens: `design/screens/<section>/NN-name@1x.png` (375pt wide, 1x) and `NN-name.png` (2x, use for cropping assets).
- Each Figma frame shows a fake iOS status bar (top 50pt, "9:41"). Do NOT render it; the app uses the real status bar via `Screen`.
- Everything visible must be reproduced: every text string VERBATIM (keep the design's typos, e.g. "Acers", "Wather", "Precipition"), every icon, image, colour, border, radius, shadow, spacing, font weight and size, alignment, and ordering.
- Hardcoded dummy data = exactly the values shown in the image. Put it in `src/modules/<module>/data/*.ts`.
- Bottom sheets / modals shown as short frames (e.g. 336pt tall) are sheets over a dimmed screen: reproduce the sheet exactly using `BottomSheet` (or a module-local sheet if the shared one can't match).

## Known design system (from the layered Figma screens)
- Font: DM Sans (`fonts.regular/medium/semibold/bold` in `src/theme/typography.ts`); a few labels use Outfit (`fonts.outfit`). Measure sizes from the image — flattened screens commonly use 12/14/16/18/20/24. Do not assume the theme variants fit; pick size/lineHeight from measurement (`fontFamily`, `fontSize`, `lineHeight` inline or in StyleSheet is fine when no typography variant matches).
- Colours: use `palette`/`colors` tokens when the sampled colour matches (±3 per channel); otherwise hard-code the sampled hex in the module (sample it with `design/sample.py`).
- Icons are the vuesax (iconsax) set → `iconsax-react-native` (variants Linear/Bold/Bulk/TwoTone/Outline). Verify names: `grep "export const Name:" node_modules/iconsax-react-native/dist/index.d.ts`. Colourful illustrations, photos, emoji-like crop icons, logos, flags and anything not in iconsax → crop from the 2x image into `assets/images/<module>/` with PIL (make circular crops transparent outside the circle; see how `assets/images/home/*` were made). Emoji characters in text (👋 💧 ✅) stay as text.

## Tools (see tools/README.md)
- `python3 design/measure.py rows|cols <png> ...` — find element edges; `python3 design/sample.py <png> x0 y0 x1 y1` — colours.
- Build + screenshot + compare loop (use YOUR ports/dir given in your task):
  ```
  npx expo export -p web --output-dir dist-<you>   # rebuild after changes (≈15s)
  python3 tools/spa_server.py dist-<you> <APP_PORT> &   # start once
  APP_PORT=<APP_PORT> CDP_PORT=<CDP_PORT> node tools/shot.mjs /tmp/claude-501/<you> /route:<figmaHeight-50>
  python3 tools/compare.py design/screens/<section>/<file>@1x.png /tmp/claude-501/<you>/<route>.png /tmp/claude-501/<you>/cmp.png <y0> <y1>
  ```
  Read the cmp.png (compare in ≤ 700pt vertical slices so details are legible) and fix differences. Iterate until text, sizes, colours and positions match within ~2pt. shot.mjs also prints runtime ERRORS — fix all of them.

## Code rules
- Module layout: `src/modules/<module>/{screens,components,data}`; route files in `src/app/...` are one-line re-exports.
- You may freely rewrite/replace/delete anything inside your own module(s) and route files, and change routes/flows to follow the design. Keep every button/tab/input/sheet working with local state and navigation between your screens.
- Do NOT edit `src/theme`, `src/components/ui`, `src/data`, `src/app/_layout.tsx`, `src/app/(tabs)/_layout.tsx`, `package.json`, or other agents' modules. If a shared component can't match the design, build a module-local one. Do not install packages.
- TypeScript strict, no `any`, StyleSheet.create, accessibility roles/labels on pressables, no TODOs, no dead code (delete screens/components you replace).
- Finish: `npx tsc --noEmit` and `npx expo lint` clean for your files; stop your spa_server; delete your dist-<you> folder.

## Report
Per screen: route, final compare verdict, and any remaining visible difference stated honestly.
