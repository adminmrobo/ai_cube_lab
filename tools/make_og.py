#!/usr/bin/env python3
"""공유 미리보기(og) 그림 만들기: 300×158 픽셀 격자를 4배(NEAREST)로 키운 1200×632 → 1200×630으로 자름, 무손실 WebP.
픽셀아트 표지가 들어오면(img/cover/*.webp) 그 그림에서 잘라 다시 만든다."""
import os, sys, importlib.util
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'content'))
FONT = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
COLS = [(47, 111, 143), (155, 63, 181), (19, 115, 58), (163, 92, 0)]


def base(motif):
    W, H = 300, 158
    im = Image.new('RGB', (W, H), (255, 255, 255))
    d = ImageDraw.Draw(im)
    for y in range(0, H, 6):
        for x in range(0, W, 6):
            d.point((x, y), fill=(222, 232, 240))
    c, c2 = COLS[motif % 4], COLS[(motif + 1) % 4]
    ox, oy, a, dx, dy = 222, 70, 48, 26, 20
    def ln(x0, y0, x1, y1, col):
        d.line((x0, y0, x1, y1), fill=col, width=3)
    for e in [(0, 0, a, 0), (a, 0, a, a), (a, a, 0, a), (0, a, 0, 0)]:
        ln(ox + e[0], oy + e[1], ox + e[2], oy + e[3], c)
        ln(ox + e[0] - dx, oy + e[1] - dy, ox + e[2] - dx, oy + e[3] - dy, c)
    for e in [(0, 0), (a, 0), (a, a), (0, a)]:
        ln(ox + e[0], oy + e[1], ox + e[0] - dx, oy + e[1] - dy, c)
    ln(196, 148, 236, 118, c2); d.rectangle((234, 114, 240, 120), fill=c2)
    return im


def make(key, label, title, motif):
    im = base(motif).resize((1200, 632), Image.NEAREST).crop((0, 1, 1200, 631))
    d = ImageDraw.Draw(im)
    f1 = ImageFont.truetype(FONT, 30, index=1); f2 = ImageFont.truetype(FONT, 54, index=1)
    d.rectangle((60, 70, 60 + d.textlength(label, font=f1) + 32, 122), fill=(22, 33, 43))
    d.text((76, 74), label, font=f1, fill=(255, 255, 255))
    words, lines, cur = title.split(' '), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f2) > 640 and cur:
            lines.append(cur); cur = w
        else:
            cur = t
    lines.append(cur)
    for i, ln in enumerate(lines[:4]):
        d.text((60, 150 + i * 72), ln, font=f2, fill=(22, 33, 43))
    d.text((60, 560), '좌표 교실 — AI를 위한 좌표와 벡터 미분', font=f1, fill=(91, 104, 116))
    im.save(os.path.join(ROOT, 'img', 'og', key + '.webp'), lossless=True)


def main():
    make('og_index', '오리엔테이션', '좌표 교실 — 좌표에서 기울기까지 17장', 0)
    make('og_practice', '마지막 장 · 실전 연습장', '좌표 교실 사업장 시뮬레이터', 2)
    for i in range(1, 18):
        spec = importlib.util.spec_from_file_location('c', os.path.join(ROOT, 'content', 'ch%02d.py' % i))
        m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
        ch = m.CH
        make('og_%02d' % i, '%02d장 · %s' % (i, ch['pillar_name']), ch['title'], i)
    print('og done')


if __name__ == '__main__':
    main()
