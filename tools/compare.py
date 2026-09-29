"""Side-by-side: Figma screen (left, status bar trimmed) vs app screenshot (right).
Usage: python3 tools/compare.py <figma@1x.png> <app.png> <out.png> [y0 y1]
The Figma frames include a 50pt fake iOS status bar that the web build does not render,
so the Figma image is shifted up by 50pt to align with the app."""
import sys
from PIL import Image, ImageDraw
fig = Image.open(sys.argv[1]).convert('RGB')
app = Image.open(sys.argv[2]).convert('RGB')
fig = fig.crop((0, 50, fig.width, fig.height))
y0, y1 = (int(sys.argv[4]), int(sys.argv[5])) if len(sys.argv) > 5 else (0, max(fig.height, app.height))
fig, app = fig.crop((0, y0, 375, y1)), app.crop((0, y0, 375, y1))
out = Image.new('RGB', (375 * 2 + 12, y1 - y0), (255, 0, 255))
out.paste(fig, (0, 0)); out.paste(app, (387, 0))
d = ImageDraw.Draw(out)
for y in range(0, y1 - y0, 50):
    d.line((375, y, 387, y), fill=(0, 0, 0))
out.save(sys.argv[3]); print(sys.argv[3])
