#!/usr/bin/env python3
"""
Generate the Open Graph share image for Harness Atlas.

Pipeline:
  1. Convert brand woff2 fonts -> TTF (Pillow cannot read woff2).
     - Space Grotesk is a variable font; instance it at weight 700 and 400.
     - Space Mono ships as static Regular / Bold.
  2. Draw a 1200x630 image with Pillow ImageDraw:
     - left column of editorial text
     - right-side "concentric rings + colored capability nodes" motif
  3. Save og-cover.png and verify with sips (run separately).

Reproducible: re-running regenerates fonts and the PNG.
"""

import math
import os
import random

from PIL import Image, ImageDraw, ImageFont, ImageFilter
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "fonts")
TTF_DIR = os.path.join(HERE, "fonts-ttf")
OUT = os.path.join(HERE, "og-cover.png")

# ---- brand palette (dark theme) -------------------------------------------
BG        = (0x15, 0x12, 0x0F)   # warm near-black canvas
INK       = (0xF1, 0xEB, 0xE0)   # primary text
INK2      = (0xB6, 0xAC, 0x9C)   # secondary text
MUTED     = (0x85, 0x7C, 0x6E)   # muted text / labels
LINE      = (0x2C, 0x27, 0x1F)   # hairline
LINE2     = (0x3C, 0x35, 0x2A)   # stronger line
VERMILION = (0xFF, 0x6B, 0x45)   # signature accent (sparingly)

# fate colors (carry meaning)
COMPOUND  = (0x46, 0xC2, 0xA4)   # teal/green
FADE      = (0xAB, 0xA1, 0x92)   # warm gray
PROTECT   = (0xE2, 0xA6, 0x3E)   # amber


# ---------------------------------------------------------------------------
# Font preparation
# ---------------------------------------------------------------------------
def woff2_to_ttf(src, dst):
    """Decompress a woff2 into a plain TTF on disk.

    Opening a woff2 with TTFont auto-decompresses it (requires brotli);
    clearing the flavor and saving writes a plain TTF/OTF.
    """
    font = TTFont(src)
    font.flavor = None
    font.save(dst)


def instance_variable(src_ttf, dst_ttf, weight):
    """Instance a variable TTF at a fixed wght axis value."""
    font = TTFont(src_ttf)
    instantiateVariableFont(font, {"wght": weight}, inplace=True)
    font.save(dst_ttf)


def prepare_fonts():
    os.makedirs(TTF_DIR, exist_ok=True)

    grotesk_var = os.path.join(TTF_DIR, "SpaceGrotesk-variable.ttf")
    grotesk_700 = os.path.join(TTF_DIR, "SpaceGrotesk-700.ttf")
    grotesk_400 = os.path.join(TTF_DIR, "SpaceGrotesk-400.ttf")
    grotesk_500 = os.path.join(TTF_DIR, "SpaceGrotesk-500.ttf")
    mono_reg    = os.path.join(TTF_DIR, "SpaceMono-Regular.ttf")
    mono_bold   = os.path.join(TTF_DIR, "SpaceMono-Bold.ttf")

    woff2_to_ttf(os.path.join(FONTS, "SpaceGrotesk-variable.woff2"), grotesk_var)
    woff2_to_ttf(os.path.join(FONTS, "SpaceMono-Regular.woff2"), mono_reg)
    woff2_to_ttf(os.path.join(FONTS, "SpaceMono-Bold.woff2"), mono_bold)

    instance_variable(grotesk_var, grotesk_700, 700)
    instance_variable(grotesk_var, grotesk_400, 400)
    instance_variable(grotesk_var, grotesk_500, 500)

    return {
        "grotesk_700": grotesk_700,
        "grotesk_400": grotesk_400,
        "grotesk_500": grotesk_500,
        "mono_reg": mono_reg,
        "mono_bold": mono_bold,
    }


# ---------------------------------------------------------------------------
# Text helpers
# ---------------------------------------------------------------------------
def text_width(draw, text, font, tracking=0):
    if tracking == 0:
        return draw.textlength(text, font=font)
    w = 0
    for ch in text:
        w += draw.textlength(ch, font=font) + tracking
    return w - tracking if text else 0


def draw_tracked(draw, xy, text, font, fill, tracking=0):
    """Draw text with manual letter-spacing (tracking)."""
    x, y = xy
    if tracking == 0:
        draw.text((x, y), text, font=font, fill=fill)
        return draw.textlength(text, font=font)
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x - xy[0]


def wrap_to_lines(draw, text, font, max_width):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=font) <= max_width or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


# ---------------------------------------------------------------------------
# Drawing
# ---------------------------------------------------------------------------
W, H = 1200, 630
SS = 2  # supersample factor for crisp anti-aliased vectors + text


def lerp(a, b, t):
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def radial_vignette(size, center, inner_r, outer_r, darken=0.42):
    """A subtle darker radial vignette toward the edges."""
    w, h = size
    cx, cy = center
    vig = Image.new("L", size, 0)
    px = vig.load()
    for y in range(h):
        for x in range(w):
            d = math.hypot(x - cx, y - cy)
            if d <= inner_r:
                v = 0
            elif d >= outer_r:
                v = 255
            else:
                t = (d - inner_r) / (outer_r - inner_r)
                v = int(255 * (t * t))
            px[x, y] = v
    return vig


def build():
    fonts = prepare_fonts()
    random.seed(7)  # stable node scatter

    w, h = W * SS, H * SS
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)

    def F(path, px):
        return ImageFont.truetype(path, int(px * SS))

    M = 64 * SS  # margin

    # ---- right-side concentric ring motif ---------------------------------
    # focal center placed in the right portion of the canvas
    cx = int(w * 0.735)
    cy = int(h * 0.50)
    radii = [86, 146, 206, 266, 326]  # five rings (logical px)
    radii = [r * SS for r in radii]

    # faint vignette behind the diagram to anchor it
    glow_r = int(radii[-1] * 1.35)
    glow = Image.new("RGB", (w, h), BG)
    gd = ImageDraw.Draw(glow)
    gd.ellipse([cx - glow_r, cy - glow_r, cx + glow_r, cy + glow_r],
               fill=(0x1B, 0x17, 0x12))
    glow = glow.filter(ImageFilter.GaussianBlur(80 * SS))
    img = Image.blend(img, glow, 0.55)
    d = ImageDraw.Draw(img)

    # five concentric rings, stroke graded from LINE -> LINE2
    n = len(radii)
    for i, r in enumerate(radii):
        t = i / (n - 1)
        col = lerp(LINE, LINE2, t)
        sw = max(1, int(round((1.3 + 0.5 * t) * SS)))
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=col, width=sw)

    # center disc = "model core"
    core_r = 30 * SS
    d.ellipse([cx - core_r, cy - core_r, cx + core_r, cy + core_r],
              fill=(0x23, 0x1E, 0x18), outline=LINE2, width=int(1.5 * SS))
    inner = int(core_r * 0.42)
    d.ellipse([cx - inner, cy - inner, cx + inner, cy + inner],
              fill=VERMILION)

    # "model core" label near the center, muted Space Mono.
    # Placed in the clear band just below the core, with a short tick
    # connecting it to the disc so it reads as an annotation.
    mono_lbl = F(fonts["mono_reg"], 12.5)
    lbl = "model core"
    lw = text_width(d, lbl, mono_lbl, tracking=0.6 * SS)
    lbl_y = cy + core_r + 16 * SS
    d.line([(cx, cy + core_r + 2 * SS), (cx, lbl_y - 3 * SS)],
           fill=LINE2, width=int(1 * SS))
    draw_tracked(d, (cx - lw / 2, lbl_y), lbl,
                 mono_lbl, MUTED, tracking=0.6 * SS)

    # ---- capability nodes scattered on the rings --------------------------
    # ~24 nodes as quiet visual texture (no legend anymore). Colors no longer
    # carry meaning: most are muted ink, a few are tinted in the vermilion
    # accent so they read as "failures" on the map -- kept subtle.
    NODE_QUIET = lerp(MUTED, BG, 0.10)   # quiet warm-gray dots
    fates = (
        [NODE_QUIET] * 19 +   # most quiet
        [VERMILION] * 5       # a few "failure" accents, no legend
    )
    random.shuffle(fates)

    # distribute across rings with gentle per-ring angular jitter so nodes
    # sit on the rings but never collide / crowd
    placements = []
    # how many nodes per ring (inner rings hold fewer)
    per_ring = [3, 4, 5, 6, 6]  # = 24
    idx = 0
    for ring_i, count in enumerate(per_ring):
        r = radii[ring_i]
        base = random.uniform(0, 2 * math.pi)
        for k in range(count):
            ang = base + (2 * math.pi) * (k / count)
            ang += random.uniform(-0.18, 0.18)
            placements.append((r, ang, fates[idx % len(fates)]))
            idx += 1

    node_r = 9 * SS
    for r, ang, col in placements:
        nx = cx + r * math.cos(ang)
        ny = cy + r * math.sin(ang)
        # soft halo
        halo = int(node_r * 2.2)
        hl = Image.new("RGBA", (halo * 2, halo * 2), (0, 0, 0, 0))
        hd = ImageDraw.Draw(hl)
        hd.ellipse([0, 0, halo * 2, halo * 2], fill=col + (38,))
        hl = hl.filter(ImageFilter.GaussianBlur(6 * SS))
        img.paste(hl, (int(nx - halo), int(ny - halo)), hl)
        d = ImageDraw.Draw(img)
        # node + thin dark rim to lift it off the ring
        d.ellipse([nx - node_r - SS, ny - node_r - SS,
                   nx + node_r + SS, ny + node_r + SS], fill=BG)
        d.ellipse([nx - node_r, ny - node_r, nx + node_r, ny + node_r],
                  fill=col)

    # ---- left column text -------------------------------------------------
    x = M
    y = M

    # kicker
    f_kicker = F(fonts["mono_reg"], 13)
    draw_tracked(d, (x, y), "AN ATLAS OF AGENTIC HARNESSES",
                 f_kicker, MUTED, tracking=3.4 * SS)
    y += int(30 * SS)

    # wordmark: HARNESS·ATLAS  (dot muted, words ink)
    f_mark = F(fonts["mono_bold"], 27)
    mx = x
    seg = "HARNESS"
    draw_tracked(d, (mx, y), seg, f_mark, INK, tracking=1.0 * SS)
    mx += text_width(d, seg, f_mark, tracking=1.0 * SS) + 4 * SS
    dot = "·"
    d.text((mx, y), dot, font=f_mark, fill=MUTED)
    mx += d.textlength(dot, font=f_mark) + 4 * SS
    draw_tracked(d, (mx, y), "ATLAS", f_mark, INK, tracking=1.0 * SS)
    y += int(64 * SS)

    # headline (Grotesk 700), wrapped to <= left column width
    headline = "The moat is not the model. It is the scaffolding around it."
    head_px = 66
    f_head = F(fonts["grotesk_700"], head_px)
    col_w = int(w * 0.50)  # left text column width
    lines = wrap_to_lines(d, headline, f_head, col_w)
    # if it spills to 4 lines, nudge size down
    while len(lines) > 3 and head_px > 54:
        head_px -= 2
        f_head = F(fonts["grotesk_700"], head_px)
        lines = wrap_to_lines(d, headline, f_head, col_w)
    line_h = int(head_px * 1.08 * SS)
    for ln in lines:
        d.text((x, y), ln, font=f_head, fill=INK)
        y += line_h
    y += int(18 * SS)

    # subline (Grotesk 400)
    f_sub = F(fonts["grotesk_400"], 27)
    subline = ("Every part of a harness is built to catch "
               "a failure the model makes on its own.")
    sub_lines = wrap_to_lines(d, subline, f_sub, col_w)
    sub_h = int(27 * 1.32 * SS)
    for ln in sub_lines:
        d.text((x, y), ln, font=f_sub, fill=INK2)
        y += sub_h
    y += int(30 * SS)

    # method line: the credibility hook, with a vermilion accent rule.
    # Rendered in primary ink (brighter than the subline) so it carries weight.
    f_method = F(fonts["grotesk_400"], 22)
    method = ("We studied 147 documented incidents from the last year "
              "and a half to map how harnesses get built.")
    rule_w = int(3 * SS)
    rule_gap = int(16 * SS)
    method_x = x + rule_w + rule_gap
    method_col_w = col_w - (rule_w + rule_gap)
    m_lines = wrap_to_lines(d, method, f_method, method_col_w)
    m_h = int(22 * 1.34 * SS)
    m_top = y
    for ln in m_lines:
        d.text((method_x, y), ln, font=f_method, fill=INK)
        y += m_h
    d.rectangle([x, m_top + int(3 * SS), x + rule_w, y - int(8 * SS)],
                fill=VERMILION)

    # ---- bottom-left stats + url ------------------------------------------
    f_stat = F(fonts["mono_reg"], 15)
    f_url = F(fonts["mono_reg"], 13.5)
    url_y = H * SS - M - int(20 * SS)
    stat_y = url_y - int(28 * SS)
    draw_tracked(d, (x, stat_y),
                 "24 CAPABILITIES · 5 LAYERS",
                 f_stat, MUTED, tracking=1.6 * SS)
    url_col = lerp(MUTED, BG, 0.28)
    draw_tracked(d, (x, url_y), "avinaashanandk.github.io/harness-atlas",
                 f_url, url_col, tracking=0.8 * SS)

    # ---- gentle global vignette toward corners ----------------------------
    vig = radial_vignette((w, h), (int(w * 0.42), int(h * 0.5)),
                          int(w * 0.30), int(w * 0.78))
    dark = Image.new("RGB", (w, h), (0x0C, 0x0A, 0x08))
    img = Image.composite(dark, img, vig.point(lambda v: int(v * 0.30)))

    # ---- downsample to final size -----------------------------------------
    final = img.resize((W, H), Image.LANCZOS)
    final.save(OUT, "PNG")
    return OUT


if __name__ == "__main__":
    path = build()
    print("wrote", path)
