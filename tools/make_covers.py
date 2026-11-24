#!/usr/bin/env python3
"""픽셀아트 대체 표지 만들기 (16비트 RPG 느낌).
960×540 픽셀 격자에 그린 뒤 NEAREST 2배 → 1920×1080 무손실 WebP. 공유 미리보기는 600×315를 잘라 2배(1200×630).
캐릭터는 연구실 캐릭터 팩(96px)을 그대로 붙인다. 그림 안에는 글자를 넣지 않는다(제목은 HTML).
사용: python3 tools/make_covers.py <캐릭터팩 sprites.js>"""
import sys, os, re, io, base64, random, importlib.util
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'tools'))
sys.path.insert(0, os.path.join(ROOT, 'content'))
import cube_check as CC  # 스티커 54장 모형 (검산용과 같은 것)

GENERIC = {'think': 'e09', 'firm': 'e12', 'explain': 'e07', 'guide': 'e08', 'proud': 'e16', 'smile': 'e13', 'cheer': 'e12', 'sparkle': 'e19', 'shock': 'e24', 'cry': 'e21', 'report': 'e07', 'spark': 'e01', 'sigh': 'e02', 'doze': 'e17', 'tea': 'e01', 'ok': 'e10', 'point': 'e08', 'board': 'e07', 'calc': 'e09', 'happy': 'e12', 'wow': 'e04', 'meh': 'e18', 'blush': 'e14', 'chart': 'e07', 'coin': 'e16', 'clip': 'e10', 'arms': 'e16', 'magnify': 'e07', 'front': 'e08', 'judge': 'e10', 'verdict': 'e18'}
COL = [(245, 217, 10), (240, 138, 28), (31, 157, 74), (255, 255, 255), (212, 43, 43), (42, 98, 212)]


def load_sprites(path):
    s = open(path, encoding='utf-8').read()
    return {k: Image.open(io.BytesIO(base64.b64decode(v))).convert('RGBA') for k, v in re.findall(r'"([a-z0-9]+_e\d\d)":"data:image/webp;base64,([^"]+)"', s)}


def sprite(SP, who, mood):
    k = who + '_' + (mood if re.match(r'^e\d\d$', mood) else GENERIC.get(mood, 'e13'))
    return SP.get(k) or SP.get(who + '_e13') or SP.get(who + '_e08')


def state(seq):
    p = CC.seq(seq) if seq else CC.ID
    st = [None] * 54
    for i in range(54):
        st[p[i]] = i // 9
    return st


def draw_cube(d, cx, cy, s, st, dim=None):
    def P(x, y, z):
        return (round(cx + (x - z) * 0.866 * s), round(cy + (x + z) * 0.5 * s - y * s))
    RT = {'U': (1, 0, 0), 'R': (0, 0, -1), 'F': (1, 0, 0)}
    DN = {'U': (0, 0, 1), 'R': (0, -1, 0), 'F': (0, -1, 0)}
    for i, (pos, nor) in enumerate(CC.ST):
        f = 'URFDLB'[i // 9]
        if f not in 'URF':
            continue
        c = [pos[k] + 0.5 * nor[k] for k in range(3)]
        pts = []
        for a, b in [(-.46, -.46), (.46, -.46), (.46, .46), (-.46, .46)]:
            pts.append(P(*[c[k] + a * RT[f][k] + b * DN[f][k] for k in range(3)]))
        col = COL[st[i]]
        if dim and dim(i):
            col = (205, 210, 216)
        d.polygon(pts, fill=col, outline=(22, 33, 43))
        # 픽셀 하이라이트 (16비트 느낌)
        d.point([(pts[0][0] + 3, pts[0][1] + 2)], fill=(255, 255, 255))


def bg(W, H, seed):
    im = Image.new('RGB', (W, H), (255, 255, 255))
    d = ImageDraw.Draw(im)
    R = random.Random(seed)
    for y in range(0, H, 12):
        for x in range(0, W, 12):
            if R.random() < 0.35:
                d.point((x, y), fill=(222, 228, 236))
    d.rectangle([0, H - 40, W, H], fill=(243, 246, 250))
    for x in range(0, W, 8):
        d.point((x, H - 40), fill=(213, 219, 226))
    return im, d


def cover(SP, key, seq, chars, seed, small=None):
    W, H = 960, 540
    im, d = bg(W, H, seed)
    st = state(seq)
    draw_cube(d, 250, 205, 46, st)
    if small:
        for j, sq in enumerate(small):
            draw_cube(d, 70 + j * 0, 80, 12, state(sq))
    x = 18
    for who, mood in chars:
        sp = sprite(SP, who, mood)
        if sp is None:
            continue
        im.paste(sp, (x, H - 40 - 96 + 6), sp)
        x += 104
    big = im.resize((W * 2, H * 2), Image.NEAREST)
    big.save(os.path.join(ROOT, 'img', 'cover', key + '.webp'), 'WEBP', lossless=True)
    og = im.crop((0, 0, 600, 315)).resize((1200, 630), Image.NEAREST)
    return og


SPEC = {
 'cover_00': ("R U R' U' F2 D L2", [('doc', 'front'), ('fly', 'magnify'), ('robo', 'e13'), ('moa', 'cheer')]),
 'cover_01': ('', [('doc', 'front'), ('fly', 'magnify'), ('robo', 'calc'), ('x3', 'e16')]),
 'cover_02': ("R U R' U'", [('doc', 'board'), ('fly', 'magnify'), ('robo', 'e13'), ('asst', 'spark')]),
 'cover_03': ("F R U R' U' F'", [('doc', 'front'), ('fly', 'magnify'), ('robo', 'coin'), ('x3', 'e16')]),
 'cover_04': ("M", [('doc', 'front'), ('fly', 'magnify'), ('robo', 'e13'), ('sia', 'cheer')]),
 'cover_05': ("R U R' U R U2 R'", [('doc', 'front'), ('fly', 'magnify'), ('robo', 'e13'), ('moa', 'e19')]),
 'cover_06': ('R U', [('doc', 'board'), ('fly', 'magnify'), ('robo', 'calc'), ('x2', 'e16')]),
 'cover_07': ("R U R' D R U' R' D'", [('doc', 'front'), ('fly', 'magnify'), ('robo', 'e13'), ('x1', 'e16')]),
 'cover_08': ("R2 D2 F U' B L2", [('doc', 'front'), ('fly', 'point'), ('robo', 'calc'), ('moa', 'cheer')]),
 'cover_09': ("U R2 D' F2 U2 L2", [('doc', 'board'), ('fly', 'magnify'), ('robo', 'e13'), ('sia', 'e16')]),
 'cover_10': ("R U F D2 L' B2 U'", [('doc', 'front'), ('fly', 'magnify'), ('robo', 'happy'), ('asst', 'e09')]),
 'cover_11': ("U F R", [('doc', 'board'), ('fly', 'magnify'), ('robo', 'e13'), ('asst', 'cheer')]),
 'cover_12': ("L D2 B R' F U2", [('doc', 'front'), ('fly', 'magnify'), ('robo', 'calc'), ('x3', 'e16')]),
 'cover_13': ("R L U2 F U' D F2 R2 B2 L U2 F' B' U R2 D F2 U R2 U", [('doc', 'front'), ('fly', 'proud'), ('robo', 'e13'), ('sia', 'e07')]),
 'cover_14': ("F2 L U' R B D'", [('doc', 'front'), ('fly', 'magnify'), ('robo', 'e13'), ('x2', 'e09')]),
 'cover_15': ('', [('doc', 'front'), ('fly', 'proud'), ('robo', 'happy'), ('sia', 'cheer')]),
 'cover_practice': ("R U2 D' B D'", [('doc', 'front'), ('asst', 'cheer'), ('sia', 'cheer'), ('moa', 'cheer')]),
}


def main():
    SP = load_sprites(sys.argv[1])
    os.makedirs(os.path.join(ROOT, 'img', 'cover'), exist_ok=True)
    os.makedirs(os.path.join(ROOT, 'img', 'og'), exist_ok=True)
    for i, (k, (seq, chars)) in enumerate(SPEC.items()):
        seq = seq.replace('M', "R L'") if seq == 'M' else seq
        og = cover(SP, k, seq, chars, 100 + i)
        name = 'og_index' if k == 'cover_00' else ('og_practice' if k == 'cover_practice' else 'og_' + k[-2:])
        og.save(os.path.join(ROOT, 'img', 'og', name + '.webp'), 'WEBP', lossless=True)
        print('cover', k)


if __name__ == '__main__':
    main()
