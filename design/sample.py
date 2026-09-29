"""Sample dominant 'ink' colour (most saturated/dark pixel) and background in a box of a raster screen.
Usage: python3 design/sample.py <png> x0 y0 x1 y1 [label]"""
import sys
from PIL import Image
from collections import Counter
im = Image.open(sys.argv[1]).convert('RGB')
x0, y0, x1, y1 = map(int, sys.argv[2:6])
px = [im.getpixel((x, y)) for x in range(x0, x1) for y in range(y0, y1)]
bg = Counter(px).most_common(1)[0][0]
def dist(c): return sum(abs(a - b) for a, b in zip(c, bg))
ink = max(px, key=dist)
h = lambda c: '#%02x%02x%02x' % c
print(f"{(sys.argv[6] if len(sys.argv) > 6 else ''):22s} bg={h(bg)} ink={h(ink)}")
