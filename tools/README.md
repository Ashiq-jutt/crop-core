# Design-match tooling

Figma reference screens (1x) live in `design/screens/<section>/*@1x.png` (2x originals alongside).
Each Figma frame includes a 50pt fake iOS status bar; `compare.py` trims it.

```bash
npx expo export -p web --output-dir dist-mine           # build
python3 tools/spa_server.py dist-mine 8101 &             # serve with SPA fallback
APP_PORT=8101 CDP_PORT=9401 node tools/shot.mjs /tmp/shots /weather:1113   # height = figma height - 50
python3 tools/compare.py design/screens/home-tasks/02-weather@1x.png /tmp/shots/weather.png /tmp/cmp.png 0 700
python3 design/measure.py rows|cols <png> ...            # measure ink runs (layout positions)
python3 design/sample.py <png> x0 y0 x1 y1               # sample bg / ink colours
```
