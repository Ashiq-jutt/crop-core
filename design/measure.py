"""Layout measurement helpers for flattened 1x screens.
rows:  python3 design/measure.py rows <png> x0 x1 [y0 y1]   -> vertical runs containing non-background ink
cols:  python3 design/measure.py cols <png> y0 y1 [x0 x1]   -> horizontal runs containing ink
"""
import sys
from PIL import Image

def ink(c, bg, tol=18):
    return sum(abs(a - b) for a, b in zip(c, bg)) > tol

def runs(flags, offset):
    out, start = [], None
    for i, f in enumerate(flags + [False]):
        if f and start is None: start = i
        if not f and start is not None: out.append((start + offset, i - 1 + offset)); start = None
    return out

mode, path = sys.argv[1], sys.argv[2]
im = Image.open(path).convert('RGB'); W, H = im.size
a, b = int(sys.argv[3]), int(sys.argv[4])
if mode == 'rows':
    y0, y1 = (int(sys.argv[5]), int(sys.argv[6])) if len(sys.argv) > 6 else (0, H)
    bg = im.getpixel((a, y0))
    flags = [any(ink(im.getpixel((x, y)), bg) for x in range(a, b)) for y in range(y0, y1)]
    for s, e in runs(flags, y0): print(f"y {s}-{e} (h={e-s+1})")
else:
    x0, x1 = (int(sys.argv[5]), int(sys.argv[6])) if len(sys.argv) > 6 else (0, W)
    bg = im.getpixel((x0, a))
    flags = [any(ink(im.getpixel((x, y)), bg) for y in range(a, b)) for x in range(x0, x1)]
    for s, e in runs(flags, x0): print(f"x {s}-{e} (w={e-s+1})")
