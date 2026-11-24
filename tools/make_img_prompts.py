#!/usr/bin/env python3
"""Genspark용 이미지 프롬프트(표지 17장 + 장면 30장)와 명세서를 만든다.
사용: python3 tools/make_img_prompts.py  → docs/IMG_specs.md, docs/genspark/*.txt"""
import os, sys, importlib.util
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'content'))
from common import CHAPTERS

CHS = []
for c, _ in CHAPTERS:
    sp = importlib.util.spec_from_file_location(c, os.path.join(ROOT, 'content', c + '.py')); m = importlib.util.module_from_spec(sp); sp.loader.exec_module(m); CHS.append(m.CH)

CD = {
 'doc': 'the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie)',
 'fly': 'the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings)',
 'robo': 'Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads)',
 'asst': 'assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers)',
 'sia': 'intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow)',
 'moa': 'intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful)',
 'x1': 'secret student X1 (solid black silhouette, only two white eyes visible)',
 'x2': 'secret student X2 (tall solid black silhouette, only two white eyes visible)',
 'x3': 'secret student X3 (small solid black silhouette, only two white eyes visible)',
}
NM = {'doc': '박사', 'fly': '초파리 연구원', 'robo': '주판봇', 'asst': '조수 하루', 'sia': '인턴 시아', 'moa': '인턴 모아', 'x1': '미공개 X1', 'x2': '미공개 X2', 'x3': '미공개 X3'}
REF = {'doc': 'ref_doc.png', 'fly': 'ref_fly.png', 'robo': 'ref_jupanbot.png', 'asst': 'ref_haru.png', 'sia': 'ref_sia.png', 'moa': 'ref_moa.png', 'x1': 'ref_x1.png', 'x2': 'ref_x2.png', 'x3': 'ref_x3.png'}
CUBE = 'a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logo'

COVER_BASE = ('16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). '
              'Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. '
              'Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.')
COVER_COMP = ('Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. '
              'Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. '
              'Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.')
SCENE_BASE = ('16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). '
              'Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. '
              'Absolutely no text, letters, numbers, math symbols, logos or watermarks.')
SCENE_TAIL = ('Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. '
              'Friendly classroom mood; no winner/loser expressions.')

COVERS = [
 ('cover_00', 'index.html', '오리엔테이션', ['doc', 'fly', 'robo', 'moa', 'sia', 'asst', 'x1', 'x2', 'x3'],
  f'A bright classroom on the first day. On the teacher\'s desk stands a giant {CUBE}, as tall as the Professor. A clean whiteboard behind shows only an unfolded cross-shaped cube net made of colored squares. The Professor gestures to the cube; Moa waves; Sia, Haru and the three silhouettes X1-X3 sit at desks; the fruit-fly researcher and Jupanbot stand beside the desk.'),
 ('cover_01', '01_cube_anatomy.html', '01 큐브 해부', ['doc', 'fly', 'robo', 'x3'],
  f'A disassembled {CUBE} spread on a desk: its small pieces sorted into three trays (corner pieces, edge pieces, center pieces on the inner axle). X3 counts pieces with a finger; Jupanbot leans in eagerly; the fruit-fly researcher inspects a corner piece with a magnifying glass; the Professor holds the bare center axle.'),
 ('cover_02', '02_notation_lbl.html', '02 돌리기 기호와 층마다 쌓기', ['doc', 'fly', 'robo', 'asst'],
  f'Haru holds a {CUBE} and turns its right face a quarter turn; a curved pixel arrow (no text) shows the turn direction. Behind, a stack of three cube layers floats like a small tower being built from the bottom. The Professor points at the turning face; Jupanbot and the fruit-fly researcher watch.'),
 ('cover_03', '03_cfop.html', '03 CFOP', ['doc', 'fly', 'robo', 'x3'],
  f'A speedcubing practice table: a {CUBE} whose bottom two layers are solved and whose top face shows a scattered yellow pattern, a plain stopwatch (blank face, no digits), and four small colored stepping tiles in a row (green, blue, amber, red) representing four stages. Jupanbot proudly holds a stack of blank flash cards; X3 counts them; the fruit-fly researcher raises an eyebrow.'),
 ('cover_04', '04_roux_zz.html', '04 Roux와 ZZ', ['doc', 'fly', 'robo', 'sia'],
  f'Two {CUBE}s on a table side by side: the left one has a solid block built on its left and right sides with the middle column still mixed; the right one shows all top edges with yellow facing up. Sia stands confidently beside the left cube; the Professor stands between both cubes like a debate moderator; the fruit-fly researcher and Jupanbot observe.'),
 ('cover_05', '05_algorithm_ecosystem.html', '05 외울까, 생각할까', ['doc', 'fly', 'robo', 'moa'],
  f'A study desk with a tall tower of thick blank notebooks next to a single thin notebook and a {CUBE}. Moa looks up at the tall tower with sparkling eyes; Jupanbot balances the tower; the fruit-fly researcher holds the thin notebook; the Professor smiles with arms folded.'),
 ('cover_06', '06_cube_group.html', '06 큐브 군 G₀', ['doc', 'fly', 'robo', 'x2'],
  'A role-play lesson: six students stand in a single line, each holding a large colored square card (yellow, green, orange, white, red, blue) representing one face turn; X2 stands at the front holding the orange card. A circular dashed loop on the floor shows four footprints returning to the start. The Professor directs; the fruit-fly researcher and Jupanbot watch.'),
 ('cover_07', '07_conjugates_commutators.html', '07 켤레와 교환자', ['doc', 'fly', 'robo', 'x1'],
  f'X1 presents at the front holding a {CUBE} in which exactly three corner stickers glow softly, connected by a small circular pixel arrow; everything else on the cube is calm. A step stool stands beside a shelf, suggesting "bring it in, fix, take it away". The Professor nods; the fruit-fly researcher counts the three glowing corners; Jupanbot looks surprised.'),
 ('cover_08', '08_solvability.html', '08 풀 수 있는 큐브의 세 조건', ['doc', 'fly', 'robo', 'moa'],
  f'A quality-check bench with several {CUBE}s; one cube has a single corner piece visibly twisted out of line. The fruit-fly researcher points a magnifying glass at the twisted corner; Moa holds a small gauge with three indicator lights (green, green, red, no text); Jupanbot holds a screwdriver; the Professor observes.'),
 ('cover_09', '09_subgroups_cosets.html', '09 부분군과 잉여류', ['doc', 'fly', 'robo', 'sia'],
  'A large round wall clock with 12 dot markers (no numerals) whose dots are painted in four repeating colors (blue, red, green, amber), dividing the clock into four equal groups. Sia arranges colored sticky notes into four equal piles on a table below; the Professor points at the blue dots; the fruit-fly researcher and Jupanbot watch.'),
 ('cover_10', '10_thistlethwaite_kociemba.html', '10 티슬스웨이트와 코시엠바', ['doc', 'fly', 'robo', 'asst'],
  'A whimsical factory machine shaped like a four-tier funnel; many small mixed-color cubes enter at the wide top, and at each narrower tier fewer cubes continue, until one neat solved cube drops out at the bottom. Jupanbot cheers at the controls; Haru takes notes; the Professor and the fruit-fly researcher inspect the tiers.'),
 ('cover_11', '11_cayley_graph.html', '11 큐브를 그래프로', ['doc', 'fly', 'robo', 'asst'],
  'A huge network map on the whiteboard: one green dot in the center, rings of small white dots spreading outward, connected by thin blue lines like a subway map. Haru stands enthusiastically pointing at the outermost ring; the Professor stands as moderator; the fruit-fly researcher and Jupanbot study the rings.'),
 ('cover_12', '12_ida_star_pdb.html', '12 IDA*와 패턴 데이터베이스', ['doc', 'fly', 'robo', 'x3'],
  'A branching tree model made of sticks and round nodes on a table; several branches are marked with small red pixel crosses (cut off), and one branch path glows green down to a leaf. Next to it, a tall cabinet with many tiny drawers (a lookup table). X3 presents; Jupanbot pulls open a drawer; the fruit-fly researcher holds a red marker; the Professor watches.'),
 ('cover_13', '13_gods_number.html', '13 신의 수 20', ['doc', 'fly', 'robo', 'sia'],
  'A presentation with a large step-down staircase chart (red line stepping down) meeting a rising blue line at the same level, both drawn as plain lines without labels. Sia presents with a pointer; the fruit-fly researcher proudly holds up a magnifying glass toward the meeting point; Jupanbot and the Professor watch from the side.'),
 ('cover_14', '14_modern_ai.html', '14 현대 AI', ['doc', 'fly', 'robo', 'x2'],
  f'A path on the floor made of small checkpoint flags leading toward a {CUBE} on a pedestal; one flag stands oddly off the path beyond the goal. A glowing translucent neural-network-style lattice of dots floats above the path. X2 sketches the path on a clipboard; the fruit-fly researcher points at the odd flag; Jupanbot and the Professor discuss.'),
 ('cover_15', '15_final_review.html', '15 종합', ['doc', 'fly', 'robo', 'sia'],
  f'Graduation day: three large overlapping rings (red, blue, green) hang on the wall, and a {CUBE} sits exactly where all three overlap. Sia wears a graduation cap and holds a rolled diploma (blank); the Professor applauds; the fruit-fly researcher looks proud; Jupanbot cheers.'),
 ('cover_practice', 'practice/index.html', '실전 연습장', ['doc', 'asst', 'sia', 'moa'],
  'A small street of four miniature workshops with picture-only signboards (no letters): a stopwatch icon (speedcubing academy), a computer chip icon (solver factory), a magnifying glass icon (assembly inspection), and a map pin icon (route guide center). The Professor gestures toward them; Haru, Sia and Moa are excited to start.'),
]

# (장, 단계, 등장, 영어 장면)
SCENES = {
 (1, 1): (['x3', 'doc', 'fly'], 'Sorting toy building blocks by shape into three bins: long two-sided bricks in one bin, three-sided corner blocks in another, single round pegs in the third. A disassembled puzzle cube lies nearby to show its pieces belong to the same three kinds.'),
 (1, 2): (['robo', 'fly', 'x3'], 'A giant combination padlock with four number-less dials (colored bands only). Jupanbot spins the first three dials; the fourth dial is glowing and locked in place, showing it is decided automatically by the others. The fruit-fly researcher points at the glowing dial.'),
 (2, 1): (['asst', 'moa'], 'Two moments side by side in one picture: on the left, Haru sits on a bench putting on socks and then shoes; on the right, she takes the shoes off first, then the socks. Footwear placed in a clear order on the floor.'),
 (2, 2): (['sia', 'moa', 'x2'], 'Building a three-layer block tower from the bottom up. The bottom layer is complete; the middle layer is being placed; a hand briefly lifts a block from the finished layer and puts it right back, showing nothing stays broken.'),
 (2, 3): (['asst', 'doc'], 'A big analog wall clock without numerals; the hour hand travels a full circle and returns to its starting mark. Haru watches the hand come back to where it began.'),
 (3, 1): (['robo', 'x3'], 'Folded pairs of socks placed into an open drawer in one motion, next to a messy pile of single unmatched socks. Jupanbot carries a neat pair; X3 compares the two methods.'),
 (3, 2): (['sia', 'asst'], 'A wall of picture-only signs (traffic light, plain colored shapes, simple 3x3 yellow-and-grey grid patterns). Sia instantly recognizes a pattern and picks a matching card from a small box, showing "recognize, then act".'),
 (4, 1): (['sia', 'doc'], 'A bookshelf whose left and right sections are completely filled, while the middle column is empty; Sia slides the last books into the middle without touching either side.'),
 (4, 2): (['moa', 'fly'], 'A toy one-way loop road where all small toy cars face the same direction; Moa guides traffic with a flag; no car is ever turned backwards.'),
 (5, 1): (['moa', 'robo'], 'A desk with a thin vocabulary booklet beside a towering stack of extremely thick books; a wall calendar made of blank squares with some squares checked off. Moa looks at the tall stack with determination; Jupanbot calculates on its abacus body.'),
 (5, 2): (['x1', 'x2', 'fly'], 'A big map board with three different paths to the same flag: a wide straight highway, a short steep mountain trail, and a scenic winding river path. X1 and X2 point at different paths; the fruit-fly researcher asks which goal matters.'),
 (6, 1): (['x2', 'asst'], 'A huge TV remote control with a colored "up" button and "down" button (shapes only, no symbols) and a TV showing a plain colored channel screen; pressing up then down returns to the same color.'),
 (6, 2): (['asst', 'x2', 'fly'], 'Two students side by side: one putting on left and right gloves in any order (both results look the same), the other confused after trying to wear shoes before socks (a sock sticking out on top of a shoe). The fruit-fly researcher compares them.'),
 (7, 1): (['x1', 'doc'], 'The Professor brings a small step stool, climbs it to fix a tilted picture frame on a high shelf, and the stool is shown being carried away afterwards; the room is unchanged except the frame is now straight.'),
 (7, 2): (['x1', 'sia', 'asst'], 'Three students rotate seats around a small round table with three chairs, each moving one seat over in the same direction (shown with footprint trails), while all other chairs in the room stay untouched.'),
 (8, 1): (['moa', 'fly'], 'A large wall clock whose hand can only jump a full circle at a time (a curved arrow loops all the way around and lands on the same mark). The hand points at a mark that is not the top; the fruit-fly researcher shows it can never reach the top this way.'),
 (8, 2): (['robo', 'fly', 'moa'], 'Two rows of playing cards (plain patterned backs, no numbers) being shuffled at the same moment by Jupanbot using both hands; Moa watches, and the fruit-fly researcher notes the two rows always change together.'),
 (9, 1): (['sia', 'moa'], 'Twelve small student figures lined up and divided into four equal teams of three, each team wearing a different colored armband (blue, red, green, amber).'),
 (9, 2): (['sia', 'x1'], 'A city map split into large colored districts; an envelope flies first into one district and then to one small house inside it.'),
 (10, 1): (['robo', 'x3'], 'A four-stage selection funnel: many small figures enter a wide door at the top, fewer pass through each narrower gate, and only one reaches the bottom. Jupanbot operates the gates; X3 counts.'),
 (10, 2): (['robo', 'asst'], 'A car navigation board showing a start dot, a destination flag and one movable waypoint flag; two route lines are compared, one noticeably shorter after the waypoint is shifted.'),
 (11, 1): (['asst', 'x1'], 'A colorful subway map made only of dots and lines with a big green station in the center; small figures ride from station to station.'),
 (11, 2): (['asst', 'x1', 'fly'], 'A web of people figures connected by lines of handshakes, spreading out in rings from one person in the middle; the farthest figure is only a few links away.'),
 (11, 3): (['asst', 'fly'], 'A rumor spreading in a schoolyard: one student whispers to several, who whisper to more, with some arrows pointing back to students who already heard it.'),
 (12, 1): (['x3', 'moa'], 'A hiker at a fork in a trail: a straight dotted line runs directly to the destination flag, while the real road winds around a hill; the hiker decides a branch is too long and turns back.'),
 (12, 2): (['x3', 'robo'], 'A wall chart grid of colored squares (no numbers) and a tall cabinet with many small drawers; Jupanbot pulls a ready-made answer card from a drawer instead of calculating.'),
 (13, 1): (['sia', 'fly'], 'A doorway with a tall marker bar sliding down from above and a short marker bar rising from below, closing in on the exact height of the door; height ticks are plain lines without numbers.'),
 (13, 2): (['sia', 'x3', 'fly'], 'A single special puzzle cube on a pedestal under a spotlight: every corner and center matches, but every edge piece is flipped so each face shows a small cross of mismatched colors. Students gaze at it as the hardest exam question.'),
 (14, 1): (['x2', 'x1'], 'A marathon course with water-station checkpoint flags along the road; one checkpoint flag has been placed off the course beyond the finish line, and a runner looks puzzled at it.'),
 (14, 2): (['x2', 'moa', 'robo'], 'Two dishes on a tasting table; small pebbles are dropped into two bowls after each tasting to keep score; Moa tastes, Jupanbot drops pebbles, X2 compares the bowls.'),
 (15, 1): (['sia', 'moa'], 'Three photo albums (red, blue, green covers) open on a table, connected by strings pinned to photos of the same friend appearing in each album.'),
 (15, 2): (['sia', 'asst', 'robo'], 'A measuring tape, a kitchen scale and a ruler on a table, each with a blank colored tag being attached by students to show that every number needs its unit.'),
}


def cover_prompt(chars, scene):
    return '\n'.join([COVER_BASE, 'Scene: ' + scene, 'Characters (use the attached reference images): ' + '; '.join(CD[c] for c in chars) + '.', COVER_COMP])


def scene_prompt(chars, scene):
    return '\n'.join([SCENE_BASE, 'Everyday analogy scene: ' + scene, 'Characters (use the attached reference images): ' + '; '.join(CD[c] for c in chars) + '.', SCENE_TAIL])


def main():
    out = os.path.join(ROOT, 'docs', 'genspark'); os.makedirs(out, exist_ok=True)
    scenes = []
    for ch in CHS:
        for i, st in enumerate(ch['stages'], 1):
            if (ch['no'], i) in SCENES and (ch['no'], i) not in [(2, 3), (11, 3)]:
                chars, sc = SCENES[(ch['no'], i)]
                lab = st['pair'][2] if len(st['pair']) > 2 else '일상 비유'
                scenes.append(('scene_%02d_lv%d' % (ch['no'], i), '%02d장 %d단계 · %s' % (ch['no'], i, st['title']), lab, chars, sc))
    sessions = [('S01', '표지 그림체 확인', '16:9', COVERS[0:1]), ('S02', '표지 01~04', '16:9', COVERS[1:5]), ('S03', '표지 05~08', '16:9', COVERS[5:9]),
                ('S04', '표지 09~12', '16:9', COVERS[9:13]), ('S05', '표지 13~15 + 실전 연습장', '16:9', COVERS[13:17])]
    for k in range(0, len(scenes), 5):
        sessions.append(('S%02d' % (6 + k // 5), '장면 %s ~ %s' % (scenes[k][0], scenes[min(k + 4, len(scenes) - 1)][0]), '3:2', scenes[k:k + 5]))
    md = ['# 큐브 교실 — Genspark 이미지 요청서 (표지 17장 + 장면 30장)', '',
          '> 그림체: **16비트 RPG 픽셀아트**(SNES 시대), **흰 배경(#ffffff)의 낮의 연구실**. 그림 안에 글자·숫자·기호 금지(제목은 HTML로 얹음).',
          '> 캐릭터는 첨부 참고 그림(캐릭터 팩 `adminmrobo/fruitfly-lab-expressions`의 E13 기본 표정 + 6인 라인업)과 똑같이.', '',
          '## 1. 쓰는 법', '',
          '1. **대화 하나 = 아래 묶음(S01~S11) 하나.** 같은 비율끼리 3~5장씩이에요. 표지는 16:9, 장면은 3:2.',
          '2. 대화를 열 때마다 `refs/style_reference.png`(그림체·밝기 기준)와 `refs/lineup.png`(키·옷 기준), 그리고 그 묶음에 나오는 캐릭터의 `ref_*.png`를 함께 올려요.',
          '3. **S01(목차 표지)을 먼저** 받아 그림체를 확인하세요. 마음에 들면 S02부터는 S01 결과 그림도 「이 그림체를 따라서」 참고 그림으로 같이 올려요.',
          '4. 받은 그림은 아래 체크리스트의 이름으로 저장해 주세요. PNG 원본 그대로 주시면 4배 격자를 맞춰 무손실 WebP로 바꿔 반영해요(표지 1920×1080, 장면 1200×800).',
          '5. 결과에 글자·숫자가 섞여 나오면 같은 대화에서 「Remove all text and numbers, keep everything else identical.」로 고쳐 달라고 하세요.', '',
          '## 2. 공통으로 붙는 문장 (각 프롬프트에 이미 들어 있음)', '', '```', COVER_BASE, COVER_COMP, '```', '']
    check = ['# 저장 이름 체크리스트', '', '| ✓ | 저장 이름 | 크기 | 들어갈 곳 |', '|---|---|---|---|']
    for sid, title, ratio, items in sessions:
        txt = []
        refs = set()
        for it in items:
            refs.update(it[3])
        reflist = ['style_reference.png', 'lineup.png'] + sorted(REF[c] for c in refs)
        md += ['## %s · %s (%s, %d장)' % (sid, title, ratio, len(items)), '', '**올릴 참고 그림:** ' + ', '.join('`refs/%s`' % r for r in reflist), '']
        txt.append('[%s] %s — 비율 %s, %d장. 참고 그림: %s' % (sid, title, ratio, len(items), ', '.join(reflist)))
        txt.append('요청 첫 줄(대화 시작 시 한 번): Please generate the following %d images one by one, each as a separate image, keeping exactly the character designs of the attached reference images and the same pixel-art style for all of them.' % len(items))
        txt.append('')
        for it in items:
            if ratio == '16:9':
                key, path, name, chars, sc = it
                p = cover_prompt(chars, sc); size = '1920×1080'; where = path
                head = '%s — %s (%s)' % (key, name, ', '.join(NM[c] for c in chars))
            else:
                key, name, lab, chars, sc = it
                p = scene_prompt(chars, sc); size = '1200×800'; where = name + ' 「일상으로 치면」 카드'
                head = '%s — %s · %s (%s)' % (key, name, lab, ', '.join(NM[c] for c in chars))
            md += ['### ' + head, '```', p, '```', '']
            txt += ['### ' + head + '  → 저장: ' + key + '.png', p, '']
            check.append('| ☐ | %s.png | %s | %s |' % (key, size, where))
        open(os.path.join(out, sid + '.txt'), 'w', encoding='utf-8').write('\n'.join(txt))
    md += ['## 3. 저장 이름 체크리스트', ''] + check[2:] + ['', '## 4. 반영 방법 (받은 뒤)', '',
           '- 표지: `img/cover/cover_NN.webp`(1920×1080 무손실, 4배 격자 확인) → 공유 미리보기 `img/og/og_NN.webp`는 같은 그림에서 정수배로 잘라 1200×630.',
           '- 장면: `img/scene/scene_NN_lvK.webp`(1200×800 무손실). 파일만 넣고 `python3 tools/build.py`를 돌리면 「일상으로 치면」 카드에 자동으로 들어가요.',
           '- 지금 표지는 `tools/make_covers.py`로 만든 대체 표지(캐릭터 팩 96px + 코드로 그린 픽셀 큐브)예요. 받은 그림으로 같은 이름에 덮어쓰면 돼요.']
    open(os.path.join(ROOT, 'docs', 'IMG_specs.md'), 'w', encoding='utf-8').write('\n'.join(md))
    open(os.path.join(out, 'CHECKLIST.md'), 'w', encoding='utf-8').write('\n'.join(check))
    print(len(COVERS), 'covers', len(scenes), 'scenes', len(sessions), 'sessions')


if __name__ == '__main__':
    main()
