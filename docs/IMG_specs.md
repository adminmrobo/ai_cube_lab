# 큐브 교실 — Genspark 이미지 요청서 (표지 17장 + 장면 30장)

> **상태 (2026-11-25): 47장 모두 반영 완료 · 추가 1장(S13 scene_00_uses) 요청 대기** — 표지 17장 `img/cover/`(480×270 격자 × 4 = 1920×1080), 장면 30장 `img/scene/`(300×200 격자 × 4 = 1200×800), 공유 미리보기 17장 `img/og/`(격자 400×210 × 3 = 1200×630). 모두 무손실 WebP. 받은 원본은 격자가 일정하지 않은 「픽셀풍」 그림이라, 같은 비율의 격자로 평균 축소한 뒤 정수배 NEAREST로 키웠어요. 아래 지시문은 다시 그릴 때 쓰는 원본이에요.

> 그림체: **16비트 RPG 픽셀아트**(SNES 시대), **흰 배경(#ffffff)의 낮의 연구실**. 그림 안에 글자·숫자·기호 금지(제목은 HTML로 얹음).
> 캐릭터는 첨부 참고 그림(캐릭터 팩 `adminmrobo/fruitfly-lab-expressions`의 E13 기본 표정 + 6인 라인업)과 똑같이.

## 1. 쓰는 법

1. **대화 하나 = 아래 묶음(S01~S11) 하나.** 같은 비율끼리 3~5장씩이에요. 표지는 16:9, 장면은 3:2.
2. 대화를 열 때마다 `refs/style_reference.png`(그림체·밝기 기준)와 `refs/lineup.png`(키·옷 기준), 그리고 그 묶음에 나오는 캐릭터의 `ref_*.png`를 함께 올려요.
3. **S01(목차 표지)을 먼저** 받아 그림체를 확인하세요. 마음에 들면 S02부터는 S01 결과 그림도 「이 그림체를 따라서」 참고 그림으로 같이 올려요.
4. 받은 그림은 아래 체크리스트의 이름으로 저장해 주세요. PNG 원본 그대로 주시면 4배 격자를 맞춰 무손실 WebP로 바꿔 반영해요(표지 1920×1080, 장면 1200×800).
5. 결과에 글자·숫자가 섞여 나오면 같은 대화에서 「Remove all text and numbers, keep everything else identical.」로 고쳐 달라고 하세요.

## 2. 공통으로 붙는 문장 (각 프롬프트에 이미 들어 있음)

```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

## S01 · 표지 그림체 확인 (16:9, 1장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_doc.png`, `refs/ref_fly.png`, `refs/ref_haru.png`, `refs/ref_jupanbot.png`, `refs/ref_moa.png`, `refs/ref_sia.png`, `refs/ref_x1.png`, `refs/ref_x2.png`, `refs/ref_x3.png`

### cover_00 — 오리엔테이션 (박사, 초파리 연구원, 주판봇, 인턴 모아, 인턴 시아, 조수 하루, 미공개 X1, 미공개 X2, 미공개 X3)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A bright classroom on the first day. On the teacher's desk stands a giant a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logo, as tall as the Professor. A clean whiteboard behind shows only an unfolded cross-shaped cube net made of colored squares. The Professor gestures to the cube; Moa waves; Sia, Haru and the three silhouettes X1-X3 sit at desks; the fruit-fly researcher and Jupanbot stand beside the desk.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful); intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers); secret student X1 (solid black silhouette, only two white eyes visible); secret student X2 (tall solid black silhouette, only two white eyes visible); secret student X3 (small solid black silhouette, only two white eyes visible).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

## S02 · 표지 01~04 (16:9, 4장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_doc.png`, `refs/ref_fly.png`, `refs/ref_haru.png`, `refs/ref_jupanbot.png`, `refs/ref_sia.png`, `refs/ref_x3.png`

### cover_01 — 01 큐브 해부 (박사, 초파리 연구원, 주판봇, 미공개 X3)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A disassembled a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logo spread on a desk: its small pieces sorted into three trays (corner pieces, edge pieces, center pieces on the inner axle). X3 counts pieces with a finger; Jupanbot leans in eagerly; the fruit-fly researcher inspects a corner piece with a magnifying glass; the Professor holds the bare center axle.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); secret student X3 (small solid black silhouette, only two white eyes visible).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_02 — 02 돌리기 기호와 층마다 쌓기 (박사, 초파리 연구원, 주판봇, 조수 하루)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: Haru holds a a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logo and turns its right face a quarter turn; a curved pixel arrow (no text) shows the turn direction. Behind, a stack of three cube layers floats like a small tower being built from the bottom. The Professor points at the turning face; Jupanbot and the fruit-fly researcher watch.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_03 — 03 CFOP (박사, 초파리 연구원, 주판봇, 미공개 X3)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A speedcubing practice table: a a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logo whose bottom two layers are solved and whose top face shows a scattered yellow pattern, a plain stopwatch (blank face, no digits), and four small colored stepping tiles in a row (green, blue, amber, red) representing four stages. Jupanbot proudly holds a stack of blank flash cards; X3 counts them; the fruit-fly researcher raises an eyebrow.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); secret student X3 (small solid black silhouette, only two white eyes visible).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_04 — 04 Roux와 ZZ (박사, 초파리 연구원, 주판봇, 인턴 시아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: Two a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logos on a table side by side: the left one has a solid block built on its left and right sides with the middle column still mixed; the right one shows all top edges with yellow facing up. Sia stands confidently beside the left cube; the Professor stands between both cubes like a debate moderator; the fruit-fly researcher and Jupanbot observe.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

## S03 · 표지 05~08 (16:9, 4장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_doc.png`, `refs/ref_fly.png`, `refs/ref_jupanbot.png`, `refs/ref_moa.png`, `refs/ref_x1.png`, `refs/ref_x2.png`

### cover_05 — 05 외울까, 생각할까 (박사, 초파리 연구원, 주판봇, 인턴 모아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A study desk with a tall tower of thick blank notebooks next to a single thin notebook and a a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logo. Moa looks up at the tall tower with sparkling eyes; Jupanbot balances the tower; the fruit-fly researcher holds the thin notebook; the Professor smiles with arms folded.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_06 — 06 큐브 군 G₀ (박사, 초파리 연구원, 주판봇, 미공개 X2)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A role-play lesson: six students stand in a single line, each holding a large colored square card (yellow, green, orange, white, red, blue) representing one face turn; X2 stands at the front holding the orange card. A circular dashed loop on the floor shows four footprints returning to the start. The Professor directs; the fruit-fly researcher and Jupanbot watch.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); secret student X2 (tall solid black silhouette, only two white eyes visible).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_07 — 07 켤레와 교환자 (박사, 초파리 연구원, 주판봇, 미공개 X1)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: X1 presents at the front holding a a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logo in which exactly three corner stickers glow softly, connected by a small circular pixel arrow; everything else on the cube is calm. A step stool stands beside a shelf, suggesting "bring it in, fix, take it away". The Professor nods; the fruit-fly researcher counts the three glowing corners; Jupanbot looks surprised.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); secret student X1 (solid black silhouette, only two white eyes visible).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_08 — 08 풀 수 있는 큐브의 세 조건 (박사, 초파리 연구원, 주판봇, 인턴 모아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A quality-check bench with several a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logos; one cube has a single corner piece visibly twisted out of line. The fruit-fly researcher points a magnifying glass at the twisted corner; Moa holds a small gauge with three indicator lights (green, green, red, no text); Jupanbot holds a screwdriver; the Professor observes.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

## S04 · 표지 09~12 (16:9, 4장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_doc.png`, `refs/ref_fly.png`, `refs/ref_haru.png`, `refs/ref_jupanbot.png`, `refs/ref_sia.png`, `refs/ref_x3.png`

### cover_09 — 09 부분군과 잉여류 (박사, 초파리 연구원, 주판봇, 인턴 시아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A large round wall clock with 12 dot markers (no numerals) whose dots are painted in four repeating colors (blue, red, green, amber), dividing the clock into four equal groups. Sia arranges colored sticky notes into four equal piles on a table below; the Professor points at the blue dots; the fruit-fly researcher and Jupanbot watch.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_10 — 10 티슬스웨이트와 코시엠바 (박사, 초파리 연구원, 주판봇, 조수 하루)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A whimsical factory machine shaped like a four-tier funnel; many small mixed-color cubes enter at the wide top, and at each narrower tier fewer cubes continue, until one neat solved cube drops out at the bottom. Jupanbot cheers at the controls; Haru takes notes; the Professor and the fruit-fly researcher inspect the tiers.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_11 — 11 큐브를 그래프로 (박사, 초파리 연구원, 주판봇, 조수 하루)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A huge network map on the whiteboard: one green dot in the center, rings of small white dots spreading outward, connected by thin blue lines like a subway map. Haru stands enthusiastically pointing at the outermost ring; the Professor stands as moderator; the fruit-fly researcher and Jupanbot study the rings.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_12 — 12 IDA*와 패턴 데이터베이스 (박사, 초파리 연구원, 주판봇, 미공개 X3)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A branching tree model made of sticks and round nodes on a table; several branches are marked with small red pixel crosses (cut off), and one branch path glows green down to a leaf. Next to it, a tall cabinet with many tiny drawers (a lookup table). X3 presents; Jupanbot pulls open a drawer; the fruit-fly researcher holds a red marker; the Professor watches.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); secret student X3 (small solid black silhouette, only two white eyes visible).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

## S05 · 표지 13~15 + 실전 연습장 (16:9, 4장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_doc.png`, `refs/ref_fly.png`, `refs/ref_haru.png`, `refs/ref_jupanbot.png`, `refs/ref_moa.png`, `refs/ref_sia.png`, `refs/ref_x2.png`

### cover_13 — 13 신의 수 20 (박사, 초파리 연구원, 주판봇, 인턴 시아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A presentation with a large step-down staircase chart (red line stepping down) meeting a rising blue line at the same level, both drawn as plain lines without labels. Sia presents with a pointer; the fruit-fly researcher proudly holds up a magnifying glass toward the meeting point; Jupanbot and the Professor watch from the side.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_14 — 14 현대 AI (박사, 초파리 연구원, 주판봇, 미공개 X2)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A path on the floor made of small checkpoint flags leading toward a a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logo on a pedestal; one flag stands oddly off the path beyond the goal. A glowing translucent neural-network-style lattice of dots floats above the path. X2 sketches the path on a clipboard; the fruit-fly researcher points at the odd flag; Jupanbot and the Professor discuss.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); secret student X2 (tall solid black silhouette, only two white eyes visible).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_15 — 15 종합 (박사, 초파리 연구원, 주판봇, 인턴 시아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: Graduation day: three large overlapping rings (red, blue, green) hang on the wall, and a a classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logo sits exactly where all three overlap. Sia wears a graduation cap and holds a rolled diploma (blank); the Professor applauds; the fruit-fly researcher looks proud; Jupanbot cheers.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

### cover_practice — 실전 연습장 (박사, 조수 하루, 인턴 시아, 인턴 모아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 480x270 pixel canvas, then upscale exactly x4 with nearest neighbor to 1920x1080 (16:9). Bright daytime lab classroom with plain white walls (#ffffff), soft pastel accents, crisp 1-pixel dark outlines, limited palette. Absolutely no text, letters, numbers, math symbols, logos or watermarks anywhere in the image.
Scene: A small street of four miniature workshops with picture-only signboards (no letters): a stopwatch icon (speedcubing academy), a computer chip icon (solver factory), a magnifying glass icon (assembly inspection), and a map pin icon (route guide center). The Professor gestures toward them; Haru, Sia and Moa are excited to start.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers); intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful).
Composition: all characters and props stay in the LEFT 54% of the frame; the RIGHT 46% is calm, empty white wall for a title overlay added later. Height ratio: Professor 1.00, Haru 0.90, Sia 0.88, X1 0.85, Moa 0.84, Jupanbot 0.72, X3 0.60, X2 0.95, fruit-fly researcher 0.41. Keep every character exactly like the attached reference images (same hair, outfit, colors). Friendly study mood; nobody looks like a winner or loser.
```

## S06 · 장면 scene_01_lv1 ~ scene_03_lv1 (3:2, 5장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_doc.png`, `refs/ref_fly.png`, `refs/ref_haru.png`, `refs/ref_jupanbot.png`, `refs/ref_moa.png`, `refs/ref_sia.png`, `refs/ref_x2.png`, `refs/ref_x3.png`

### scene_01_lv1 — 01장 1단계 · 조각 세 종류 — 가운데, 모서리, 꼭짓점 · 레고 분류 비유 (미공개 X3, 박사, 초파리 연구원)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: Sorting toy building blocks by shape into three bins: long two-sided bricks in one bin, three-sided corner blocks in another, single round pegs in the third. A disassembled puzzle cube lies nearby to show its pieces belong to the same three kinds.
Characters (use the attached reference images): secret student X3 (small solid black silhouette, only two white eyes visible); the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_01_lv2 — 01장 2단계 · 곱셈 원리로 세기 — 4천3백경이 나오는 길 · 자물쇠 비유 (주판봇, 초파리 연구원, 미공개 X3)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A giant combination padlock with four number-less dials (colored bands only). Jupanbot spins the first three dials; the fourth dial is glowing and locked in place, showing it is decided automatically by the others. The fruit-fly researcher points at the glowing dial.
Characters (use the attached reference images): Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); secret student X3 (small solid black silhouette, only two white eyes visible).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_02_lv1 — 02장 1단계 · 돌리기 기호 — R, R′, R2와 되돌리기 · 양말과 신발 비유 (조수 하루, 인턴 모아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: Two moments side by side in one picture: on the left, Haru sits on a bench putting on socks and then shoes; on the right, she takes the shoes off first, then the socks. Footwear placed in a clear order on the floor.
Characters (use the attached reference images): assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_02_lv2 — 02장 2단계 · 층마다 쌓기 8단계 — 아래부터 차곡차곡 · 탑 쌓기 비유 (인턴 시아, 인턴 모아, 미공개 X2)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: Building a three-layer block tower from the bottom up. The bottom layer is complete; the middle layer is being placed; a hand briefly lifts a block from the finished layer and puts it right back, showing nothing stays broken.
Characters (use the attached reference images): intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful); secret student X2 (tall solid black silhouette, only two white eyes visible).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_03_lv1 — 03장 1단계 · 십자와 F2L — 짝지어 한 번에 넣기 · 양말 짝 비유 (주판봇, 미공개 X3)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: Folded pairs of socks placed into an open drawer in one motion, next to a messy pile of single unmatched socks. Jupanbot carries a neat pair; X3 compares the two methods.
Characters (use the attached reference images): Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); secret student X3 (small solid black silhouette, only two white eyes visible).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

## S07 · 장면 scene_03_lv2 ~ scene_05_lv2 (3:2, 5장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_doc.png`, `refs/ref_fly.png`, `refs/ref_haru.png`, `refs/ref_jupanbot.png`, `refs/ref_moa.png`, `refs/ref_sia.png`, `refs/ref_x1.png`, `refs/ref_x2.png`

### scene_03_lv2 — 03장 2단계 · OLL과 PLL — 무늬로 알아보는 마지막 층 · 표지판 비유 (인턴 시아, 조수 하루)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A wall of picture-only signs (traffic light, plain colored shapes, simple 3x3 yellow-and-grey grid patterns). Sia instantly recognizes a pattern and picks a matching card from a small box, showing "recognize, then act".
Characters (use the attached reference images): intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_04_lv1 — 04장 1단계 · Roux — 양쪽 블록 먼저, 가운데 줄은 나중에 · 책장 비유 (인턴 시아, 박사)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A bookshelf whose left and right sections are completely filled, while the middle column is empty; Sia slides the last books into the middle without touching either side.
Characters (use the attached reference images): intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_04_lv2 — 04장 2단계 · ZZ — 모서리 방향을 먼저 맞추고 네 면만 돌리기 · 일방통행 비유 (인턴 모아, 초파리 연구원)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A toy one-way loop road where all small toy cars face the same direction; Moa guides traffic with a flag; no car is ever turned backwards.
Characters (use the attached reference images): intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_05_lv1 — 05장 1단계 · 식 묶음의 크기 — 21개부터 약 3,915개까지 · 단어장 비유 (인턴 모아, 주판봇)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A desk with a thin vocabulary booklet beside a towering stack of extremely thick books; a wall calendar made of blank squares with some squares checked off. Moa looks at the tall stack with determination; Jupanbot calculates on its abacus body.
Characters (use the attached reference images): intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_05_lv2 — 05장 2단계 · 다섯 갈래 — 외우기 대신 다른 목표 · 여행 경로 비유 (미공개 X1, 미공개 X2, 초파리 연구원)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A big map board with three different paths to the same flag: a wide straight highway, a short steep mountain trail, and a scenic winding river path. X1 and X2 point at different paths; the fruit-fly researcher asks which goal matters.
Characters (use the attached reference images): secret student X1 (solid black silhouette, only two white eyes visible); secret student X2 (tall solid black silhouette, only two white eyes visible); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

## S08 · 장면 scene_06_lv1 ~ scene_08_lv1 (3:2, 5장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_doc.png`, `refs/ref_fly.png`, `refs/ref_haru.png`, `refs/ref_moa.png`, `refs/ref_sia.png`, `refs/ref_x1.png`, `refs/ref_x2.png`

### scene_06_lv1 — 06장 1단계 · 군의 네 약속 — 이어 하기, 아무것도 안 하기, 되돌리기, 묶기 · 리모컨 비유 (미공개 X2, 조수 하루)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A huge TV remote control with a colored "up" button and "down" button (shapes only, no symbols) and a TV showing a plain colored channel screen; pressing up then down returns to the same color.
Characters (use the attached reference images): secret student X2 (tall solid black silhouette, only two white eyes visible); assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_06_lv2 — 06장 2단계 · 순서를 바꾸면 — RU ≠ UR (비가환) · 양말과 장갑 비유 (조수 하루, 미공개 X2, 초파리 연구원)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: Two students side by side: one putting on left and right gloves in any order (both results look the same), the other confused after trying to wear shoes before socks (a sock sticking out on top of a shoe). The fruit-fly researcher compares them.
Characters (use the attached reference images): assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers); secret student X2 (tall solid black silhouette, only two white eyes visible); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_07_lv1 — 07장 1단계 · 켤레 A B A⁻¹ — 준비, 작업, 되돌리기 · 의자 가져오기 비유 (미공개 X1, 박사)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: The Professor brings a small step stool, climbs it to fix a tilted picture frame on a high shelf, and the stool is shown being carried away afterwards; the room is unchanged except the frame is now straight.
Characters (use the attached reference images): secret student X1 (solid black silhouette, only two white eyes visible); the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_07_lv2 — 07장 2단계 · 교환자 [A, B] — 겹치는 곳만 움직여 3-순환 만들기 · 엇갈린 자리 비유 (미공개 X1, 인턴 시아, 조수 하루)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: Three students rotate seats around a small round table with three chairs, each moving one seat over in the same direction (shown with footprint trails), while all other chairs in the room stay untouched.
Characters (use the attached reference images): secret student X1 (solid black silhouette, only two white eyes visible); intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_08_lv1 — 08장 1단계 · 비틀림의 합과 뒤집힘의 수 — 방향 조건 둘 · 12시간 시계 비유 (인턴 모아, 초파리 연구원)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A large wall clock whose hand can only jump a full circle at a time (a curved arrow loops all the way around and lands on the same mark). The hand points at a mark that is not the top; the fruit-fly researcher shows it can never reach the top this way.
Characters (use the attached reference images): intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

## S09 · 장면 scene_08_lv2 ~ scene_10_lv2 (3:2, 5장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_fly.png`, `refs/ref_haru.png`, `refs/ref_jupanbot.png`, `refs/ref_moa.png`, `refs/ref_sia.png`, `refs/ref_x1.png`, `refs/ref_x3.png`

### scene_08_lv2 — 08장 2단계 · 자리 바꿈의 홀짝 — 두 조각만 맞바꿀 수 없는 이유 · 카드 두 줄 비유 (주판봇, 초파리 연구원, 인턴 모아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: Two rows of playing cards (plain patterned backs, no numbers) being shuffled at the same moment by Jupanbot using both hands; Moa watches, and the fruit-fly researcher notes the two rows always change together.
Characters (use the attached reference images): Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_09_lv1 — 09장 1단계 · 부분군과 잉여류 — 시계를 같은 크기 방으로 나누기 · 반 나누기 비유 (인턴 시아, 인턴 모아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: Twelve small student figures lined up and divided into four equal teams of three, each team wearing a different colored armband (blue, red, green, amber).
Characters (use the attached reference images): intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_09_lv2 — 09장 2단계 · 두 단계 찾기 — 먼저 방에 들어가고, 방 안에서 마무리 · 우편번호 비유 (인턴 시아, 미공개 X1)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A city map split into large colored districts; an envelope flies first into one district and then to one small house inside it.
Characters (use the attached reference images): intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); secret student X1 (solid black silhouette, only two white eyes visible).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_10_lv1 — 10장 1단계 · 티슬스웨이트 4단계 — 부분군 사슬을 따라 내려가기 · 채용 깔때기 비유 (주판봇, 미공개 X3)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A four-stage selection funnel: many small figures enter a wide door at the top, fewer pass through each narrower gate, and only one reaches the bottom. Jupanbot operates the gates; X3 counts.
Characters (use the attached reference images): Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); secret student X3 (small solid black silhouette, only two white eyes visible).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_10_lv2 — 10장 2단계 · 코시엠바 2단계 — 깔때기를 줄이고 넓게 찾기 · 내비게이션 경유지 비유 (주판봇, 조수 하루)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A car navigation board showing a start dot, a destination flag and one movable waypoint flag; two route lines are compared, one noticeably shorter after the waypoint is shifted.
Characters (use the attached reference images): Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads); assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

## S10 · 장면 scene_11_lv1 ~ scene_13_lv1 (3:2, 5장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_fly.png`, `refs/ref_haru.png`, `refs/ref_jupanbot.png`, `refs/ref_moa.png`, `refs/ref_sia.png`, `refs/ref_x1.png`, `refs/ref_x3.png`

### scene_11_lv1 — 11장 1단계 · 점은 상태, 선은 한 수 — 작은 무리의 케일리 그래프 · 노선도 비유 (조수 하루, 미공개 X1)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A colorful subway map made only of dots and lines with a big green station in the center; small figures ride from station to station.
Characters (use the attached reference images): assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers); secret student X1 (solid black silhouette, only two white eyes visible).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_11_lv2 — 11장 2단계 · 지름 — 가장 먼 점까지의 거리 · 여섯 다리 비유 (조수 하루, 미공개 X1, 초파리 연구원)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A web of people figures connected by lines of handshakes, spreading out in rings from one person in the middle; the farthest figure is only a few links away.
Characters (use the attached reference images): assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers); secret student X1 (solid black silhouette, only two white eyes visible); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_12_lv1 — 12장 1단계 · 하한으로 가지치기 — IDA* · 직선거리 비유 (미공개 X3, 인턴 모아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A hiker at a fork in a trail: a straight dotted line runs directly to the destination flag, while the real road winds around a hill; the hiker decides a branch is too long and turns back.
Characters (use the attached reference images): secret student X3 (small solid black silhouette, only two white eyes visible); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_12_lv2 — 12장 2단계 · 패턴 데이터베이스 — 작은 문제를 미리 다 풀어 둔 표 · 구구단표 비유 (미공개 X3, 주판봇)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A wall chart grid of colored squares (no numbers) and a tall cabinet with many small drawers; Jupanbot pulls a ready-made answer card from a drawer instead of calculating.
Characters (use the attached reference images): secret student X3 (small solid black silhouette, only two white eyes visible); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_13_lv1 — 13장 1단계 · 위 경계와 아래 경계 — 52와 18에서 20과 20까지 · 문 높이 비유 (인턴 시아, 초파리 연구원)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A doorway with a tall marker bar sliding down from above and a short marker bar rising from below, closing in on the exact height of the door; height ticks are plain lines without numbers.
Characters (use the attached reference images): intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

## S11 · 장면 scene_13_lv2 ~ scene_15_lv2 (3:2, 5장)

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_fly.png`, `refs/ref_haru.png`, `refs/ref_jupanbot.png`, `refs/ref_moa.png`, `refs/ref_sia.png`, `refs/ref_x1.png`, `refs/ref_x2.png`, `refs/ref_x3.png`

### scene_13_lv2 — 13장 2단계 · 슈퍼플립 — 20수가 꼭 필요한 큐브 · 시험 문제 비유 (인턴 시아, 미공개 X3, 초파리 연구원)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A single special puzzle cube on a pedestal under a spotlight: every corner and center matches, but every edge piece is flipped so each face shows a small cross of mismatched colors. Students gaze at it as the hardest exam question.
Characters (use the attached reference images): intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); secret student X3 (small solid black silhouette, only two white eyes visible); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_14_lv1 — 14장 1단계 · 부분 목표 탐색 — 중간 목표로 긴 길 나누기 · 마라톤 구간 비유 (미공개 X2, 미공개 X1)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A marathon course with water-station checkpoint flags along the road; one checkpoint flag has been placed off the course beyond the finish line, and a runner looks puzzled at it.
Characters (use the attached reference images): secret student X2 (tall solid black silhouette, only two white eyes visible); secret student X1 (solid black silhouette, only two white eyes visible).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_14_lv2 — 14장 2단계 · 몬테카를로 트리 탐색 — 무작위로 끝까지 굴려 보기 · 시식 비유 (미공개 X2, 인턴 모아, 주판봇)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: Two dishes on a tasting table; small pebbles are dropped into two bowls after each tasting to keep score; Moa tastes, Jupanbot drops pebbles, X2 compares the bowls.
Characters (use the attached reference images): secret student X2 (tall solid black silhouette, only two white eyes visible); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_15_lv1 — 15장 1단계 · 세 갈래 다시 보기 — 손, 대수, 기계 · 사진 앨범 비유 (인턴 시아, 인턴 모아)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: Three photo albums (red, blue, green covers) open on a table, connected by strings pinned to photos of the same friend appearing in each album.
Characters (use the attached reference images): intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); intern Moa (long light-brown hair, white frilled headband with ribbon, mustard cardigan, red plaid bow, white apron dress, cheerful).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

### scene_15_lv2 — 15장 2단계 · 같은 큐브, 다른 풀이 — 수의 크기 한 장 정리 · 단위 비유 (인턴 시아, 조수 하루, 주판봇)
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A measuring tape, a kitchen scale and a ruler on a table, each with a blank colored tag being attached by students to show that every number needs its unit.
Characters (use the attached reference images): intern Sia (long straight black hair, calm face, black-and-white maid-style uniform with a grey bow); assistant Haru (long pink hair in two buns with a navy streak, lavender hoodie under a white lab coat, blue jeans, lavender sneakers); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

## S13 · 장면 scene_00_uses (3:2, 1장) — 2026-11-25 추가, 미반영

**올릴 참고 그림:** `refs/style_reference.png`, `refs/lineup.png`, `refs/ref_doc.png`, `refs/ref_fly.png`, `refs/ref_jupanbot.png` (+ 그림체 기준으로 이미 받은 장면 그림 1장)

오리엔테이션 「이 기법은 어디에 쓰이나」(#uses) 상자에 들어가요. 큐브를 표본처럼 가운데 두고, 자물쇠(암호)·지도(물류 경로)·로봇 팔·연결망으로 선이 뻗는 그림이에요. 초파리 연구원이 자물쇠를 의심하는 모습은 상자의 「큐브 군을 그대로 암호에 쓰면 안전하지 않다」 대화와 맞춰요.

### scene_00_uses — 오리엔테이션 · 이 기법은 어디에 쓰이나 · 연구용 모델 생물(표본 큐브와 연결선) 비유 (박사, 초파리 연구원, 주판봇)  → 저장: scene_00_uses.png
```
16-bit SNES-era RPG pixel art. Clean pixel grid: draw on a 300x200 pixel canvas, then upscale exactly x4 with nearest neighbor to 1200x800 (3:2). Bright daytime setting with a white background, soft pastel accents, crisp 1-pixel outlines. Absolutely no text, letters, numbers, math symbols, logos or watermarks.
Everyday analogy scene: A classic 3x3x3 puzzle cube with six plain sticker colors (yellow top, green front, orange right, white bottom, red left, blue back), no brand logo, sits on a small pedestal in the center like a lab specimen under a glass dome. From the cube, four thin colored strings run outward to four small objects pinned on the white wall around it, like a detective's corkboard: (1) a brass padlock with a key, (2) a small folded paper map with one dotted route between pins and a tiny delivery truck, (3) a small industrial robot arm gripping a block, (4) a cluster of round nodes connected by lines like a network. The Professor stands beside the pedestal and points along one string. Jupanbot happily holds up the padlock's key. The fruit-fly researcher hovers close to the padlock, examining it through a magnifying glass with a doubtful look.
Characters (use the attached reference images): the Professor (spiky black hair with one white streak, round glasses, white lab coat over black vest and black tie); the fruit-fly researcher (anthropomorphic black fruit fly, big red compound eyes, blue helmet with colorful cables, white lab coat, translucent wings); Jupanbot (retro beige CRT-monitor head with a green smiling face on the screen, small antenna, wooden abacus body, dark tank treads).
Make the key object of the analogy large and centered so the idea reads at a glance. Keep characters exactly like the attached reference images. Friendly classroom mood; no winner/loser expressions.
```

## 3. 저장 이름 체크리스트

| ✓ | 저장 이름 | 크기 | 들어갈 곳 |
|---|---|---|---|
| ☐ | cover_00.png | 1920×1080 | index.html |
| ☐ | cover_01.png | 1920×1080 | 01_cube_anatomy.html |
| ☐ | cover_02.png | 1920×1080 | 02_notation_lbl.html |
| ☐ | cover_03.png | 1920×1080 | 03_cfop.html |
| ☐ | cover_04.png | 1920×1080 | 04_roux_zz.html |
| ☐ | cover_05.png | 1920×1080 | 05_algorithm_ecosystem.html |
| ☐ | cover_06.png | 1920×1080 | 06_cube_group.html |
| ☐ | cover_07.png | 1920×1080 | 07_conjugates_commutators.html |
| ☐ | cover_08.png | 1920×1080 | 08_solvability.html |
| ☐ | cover_09.png | 1920×1080 | 09_subgroups_cosets.html |
| ☐ | cover_10.png | 1920×1080 | 10_thistlethwaite_kociemba.html |
| ☐ | cover_11.png | 1920×1080 | 11_cayley_graph.html |
| ☐ | cover_12.png | 1920×1080 | 12_ida_star_pdb.html |
| ☐ | cover_13.png | 1920×1080 | 13_gods_number.html |
| ☐ | cover_14.png | 1920×1080 | 14_modern_ai.html |
| ☐ | cover_15.png | 1920×1080 | 15_final_review.html |
| ☐ | cover_practice.png | 1920×1080 | practice/index.html |
| ☐ | scene_01_lv1.png | 1200×800 | 01장 1단계 · 조각 세 종류 — 가운데, 모서리, 꼭짓점 「일상으로 치면」 카드 |
| ☐ | scene_01_lv2.png | 1200×800 | 01장 2단계 · 곱셈 원리로 세기 — 4천3백경이 나오는 길 「일상으로 치면」 카드 |
| ☐ | scene_02_lv1.png | 1200×800 | 02장 1단계 · 돌리기 기호 — R, R′, R2와 되돌리기 「일상으로 치면」 카드 |
| ☐ | scene_02_lv2.png | 1200×800 | 02장 2단계 · 층마다 쌓기 8단계 — 아래부터 차곡차곡 「일상으로 치면」 카드 |
| ☐ | scene_03_lv1.png | 1200×800 | 03장 1단계 · 십자와 F2L — 짝지어 한 번에 넣기 「일상으로 치면」 카드 |
| ☐ | scene_03_lv2.png | 1200×800 | 03장 2단계 · OLL과 PLL — 무늬로 알아보는 마지막 층 「일상으로 치면」 카드 |
| ☐ | scene_04_lv1.png | 1200×800 | 04장 1단계 · Roux — 양쪽 블록 먼저, 가운데 줄은 나중에 「일상으로 치면」 카드 |
| ☐ | scene_04_lv2.png | 1200×800 | 04장 2단계 · ZZ — 모서리 방향을 먼저 맞추고 네 면만 돌리기 「일상으로 치면」 카드 |
| ☐ | scene_05_lv1.png | 1200×800 | 05장 1단계 · 식 묶음의 크기 — 21개부터 약 3,915개까지 「일상으로 치면」 카드 |
| ☐ | scene_05_lv2.png | 1200×800 | 05장 2단계 · 다섯 갈래 — 외우기 대신 다른 목표 「일상으로 치면」 카드 |
| ☐ | scene_06_lv1.png | 1200×800 | 06장 1단계 · 군의 네 약속 — 이어 하기, 아무것도 안 하기, 되돌리기, 묶기 「일상으로 치면」 카드 |
| ☐ | scene_06_lv2.png | 1200×800 | 06장 2단계 · 순서를 바꾸면 — RU ≠ UR (비가환) 「일상으로 치면」 카드 |
| ☐ | scene_07_lv1.png | 1200×800 | 07장 1단계 · 켤레 A B A⁻¹ — 준비, 작업, 되돌리기 「일상으로 치면」 카드 |
| ☐ | scene_07_lv2.png | 1200×800 | 07장 2단계 · 교환자 [A, B] — 겹치는 곳만 움직여 3-순환 만들기 「일상으로 치면」 카드 |
| ☐ | scene_08_lv1.png | 1200×800 | 08장 1단계 · 비틀림의 합과 뒤집힘의 수 — 방향 조건 둘 「일상으로 치면」 카드 |
| ☐ | scene_08_lv2.png | 1200×800 | 08장 2단계 · 자리 바꿈의 홀짝 — 두 조각만 맞바꿀 수 없는 이유 「일상으로 치면」 카드 |
| ☐ | scene_09_lv1.png | 1200×800 | 09장 1단계 · 부분군과 잉여류 — 시계를 같은 크기 방으로 나누기 「일상으로 치면」 카드 |
| ☐ | scene_09_lv2.png | 1200×800 | 09장 2단계 · 두 단계 찾기 — 먼저 방에 들어가고, 방 안에서 마무리 「일상으로 치면」 카드 |
| ☐ | scene_10_lv1.png | 1200×800 | 10장 1단계 · 티슬스웨이트 4단계 — 부분군 사슬을 따라 내려가기 「일상으로 치면」 카드 |
| ☐ | scene_10_lv2.png | 1200×800 | 10장 2단계 · 코시엠바 2단계 — 깔때기를 줄이고 넓게 찾기 「일상으로 치면」 카드 |
| ☐ | scene_11_lv1.png | 1200×800 | 11장 1단계 · 점은 상태, 선은 한 수 — 작은 무리의 케일리 그래프 「일상으로 치면」 카드 |
| ☐ | scene_11_lv2.png | 1200×800 | 11장 2단계 · 지름 — 가장 먼 점까지의 거리 「일상으로 치면」 카드 |
| ☐ | scene_12_lv1.png | 1200×800 | 12장 1단계 · 하한으로 가지치기 — IDA* 「일상으로 치면」 카드 |
| ☐ | scene_12_lv2.png | 1200×800 | 12장 2단계 · 패턴 데이터베이스 — 작은 문제를 미리 다 풀어 둔 표 「일상으로 치면」 카드 |
| ☐ | scene_13_lv1.png | 1200×800 | 13장 1단계 · 위 경계와 아래 경계 — 52와 18에서 20과 20까지 「일상으로 치면」 카드 |
| ☐ | scene_13_lv2.png | 1200×800 | 13장 2단계 · 슈퍼플립 — 20수가 꼭 필요한 큐브 「일상으로 치면」 카드 |
| ☐ | scene_14_lv1.png | 1200×800 | 14장 1단계 · 부분 목표 탐색 — 중간 목표로 긴 길 나누기 「일상으로 치면」 카드 |
| ☐ | scene_14_lv2.png | 1200×800 | 14장 2단계 · 몬테카를로 트리 탐색 — 무작위로 끝까지 굴려 보기 「일상으로 치면」 카드 |
| ☐ | scene_15_lv1.png | 1200×800 | 15장 1단계 · 세 갈래 다시 보기 — 손, 대수, 기계 「일상으로 치면」 카드 |
| ☐ | scene_15_lv2.png | 1200×800 | 15장 2단계 · 같은 큐브, 다른 풀이 — 수의 크기 한 장 정리 「일상으로 치면」 카드 |
| ☐ | scene_00_uses.png | 1200×800 | index.html 「이 기법은 어디에 쓰이나」 상자 (S13, 2026-11-25 추가) |

## 4. 반영 방법 (받은 뒤)

- 표지: `img/cover/cover_NN.webp`(1920×1080 무손실, 4배 격자 확인) → 공유 미리보기 `img/og/og_NN.webp`는 같은 그림에서 정수배로 잘라 1200×630.
- 장면: `img/scene/scene_NN_lvK.webp`(1200×800 무손실). 파일만 넣고 `python3 tools/build.py`를 돌리면 「일상으로 치면」 카드에 자동으로 들어가요.
- 지금 표지는 `tools/make_covers.py`로 만든 대체 표지(캐릭터 팩 96px + 코드로 그린 픽셀 큐브)예요. 받은 그림으로 같은 이름에 덮어쓰면 돼요.