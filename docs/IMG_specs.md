# 큐브 교실 — 이미지 제작 명세서 (IMG_00 시리즈 공용 + 장별 표지)

> **상태 (2026-11-25): 대체 표지 17장 반영** — `tools/make_covers.py`로 캐릭터 팩(96px) + 코드로 그린 픽셀 큐브를 960×540 격자에 놓고 2배 NEAREST 확대한 무손실 WebP예요. 아래 지시문으로 Genspark 등에서 16비트 픽셀아트를 받으면 같은 이름으로 교체하세요.

> 그림체: **16비트 RPG 픽셀아트**(SNES 시대 느낌), **흰 배경(#ffffff) 위 낮의 연구실**. 그림 안에 글자·숫자·기호를 넣지 않는다(글자는 HTML로). 키 비율: 박사 1.00 · 조수 하루 0.90 · 시아 0.88 · 미공개 X1 0.85 · 모아 0.84 · 주판봇 0.72 · X3 0.60 · X2 0.95 · 초파리 0.41.

## 1. 공용 규칙

- 판 L(글 표지): 16:9, 생성 원본 1920×1080(픽셀 격자 480×270을 4배) → 무손실 WebP, `NEAREST` 정수배만. 오른쪽 46%는 제목이 올라갈 빈 여백.
- 미공개 X1~X3은 검은 실루엣(눈만 보임).
- 금지: 무기·담배·술·피, 실존 인물·기업 로고, 큐브 제조사 로고·상표, 저작권 캐릭터, 결과 전 승패를 암시하는 표정.
- 생성 순서: ① cover_00 먼저 받아 그림체 확인 → ② 그것을 참고 그림으로 함께 올려 나머지 생성.
- 반영: `img/cover/cover_NN.webp`(1920×1080 무손실), og는 같은 그림을 정수배로 잘라 1200×630 `img/og/og_NN.webp`.

## 2. 필요한 그림 전체

| 키 | 페이지 | 상태 | 등장 |
|---|---|---|---|
| cover_00 | index.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 인턴 모아 |
| cover_01 | 01_cube_anatomy.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 미공개 X3 |
| cover_02 | 02_notation_lbl.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 조수 하루 |
| cover_03 | 03_cfop.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 주판봇 |
| cover_04 | 04_roux_zz.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 인턴 시아 |
| cover_05 | 05_algorithm_ecosystem.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 인턴 모아 |
| cover_06 | 06_cube_group.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 미공개 X2 |
| cover_07 | 07_conjugates_commutators.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 미공개 X1 |
| cover_08 | 08_solvability.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 인턴 모아 |
| cover_09 | 09_subgroups_cosets.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 인턴 시아 |
| cover_10 | 10_thistlethwaite_kociemba.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 주판봇 |
| cover_11 | 11_cayley_graph.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 조수 하루 |
| cover_12 | 12_ida_star_pdb.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 미공개 X3 |
| cover_13 | 13_gods_number.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 초파리 연구원 |
| cover_14 | 14_modern_ai.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 미공개 X2 |
| cover_15 | 15_final_review.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 초파리 연구원, 주판봇, 인턴 시아 |
| cover_practice | practice/index.html | 대체 표지 반영, 픽셀아트 대기 | 박사, 조수 하루, 인턴 시아, 인턴 모아 |
| 캐릭터 얼굴 | 모든 페이지 | 캐릭터 팩 재사용 (`assets/sprites.js`, 96px) | — |

## 3. 표지 지시문 (Genspark 등 이미지 생성 도구용)

### cover_00 — 오리엔테이션
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 흰 벽의 밝은 강의실, 교탁 위에 사람 키만 한 큰 루빅스 큐브 조형물(색 6가지, 글자 없음), 칠판 대신 흰 보드에 큐브 펼친 그림.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_01 — 큐브 해부 — 조각 26개와 4천3백경 가지
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 책상 위에 분해한 큐브 조각들을 꼭짓점·모서리·가운데로 나눠 담은 바구니 세 개.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), secret student X3 (small silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_02 — 돌리기 기호와 층마다 쌓기
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 수강생이 큐브 오른면을 돌리는 손 클로즈업과 화살표 모양 보조선(글자 없음).
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), assistant Haru (long pink hair in two buns with navy streak, jeans).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_03 — CFOP — 십자, 두 층, 마지막 층
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 초시계 옆에서 큐브의 윗면 노란 무늬를 살펴보는 장면.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), Jupanbot (abacus robot, v2 design).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_04 — Roux와 ZZ — 큐브를 고쳐 쥐지 않는 법
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 두 사람이 큐브 양쪽에 블록을 쌓는 장면과 가운데 세로줄이 비어 있는 큐브.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Sia (side-swept bangs, calm).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_05 — 외울까, 생각할까 — 식 묶음과 여러 풀이법
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 두꺼운 단어장 더미와 얇은 카드 묶음을 비교하는 책상.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_06 — 큐브 군 G₀ — 움직임을 원소로
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 수강생들이 한 줄로 서서 각자 큐브 면 하나를 들고 있는 역할극.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), secret student X2 (silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_07 — 켤레와 교환자 — 준비·작업·되돌리기
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 의자를 가져와 선반 위 큐브 조각 세 개를 돌려 끼우는 장면.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), secret student X1 (silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_08 — 풀 수 있는 큐브의 세 조건
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 검수대 위 큐브들 중 하나에 돋보기를 대는 초파리 연구원.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_09 — 부분군과 잉여류 — 나눠서 정복하기
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 벽에 걸린 큰 시계가 색깔별로 네 구역으로 나뉜 강의실.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Sia (side-swept bangs, calm).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_10 — 티슬스웨이트와 코시엠바 — 깔때기로 좁히기
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 깔때기 모양의 커다란 장치를 큐브가 통과해 내려오는 공장 라인.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), Jupanbot (abacus robot, v2 design).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_11 — 큐브를 그래프로 — 케일리 그래프와 지름
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 둥근 점과 선으로 된 거대한 노선도(가운데 초록 점) 앞의 토론.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), assistant Haru (long pink hair in two buns with navy streak, jeans).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_12 — 똑똑하게 찾기 — IDA*와 패턴 데이터베이스
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 가지가 뻗은 나무 모형에서 일부 가지에 빨간 표시를 붙이는 장면.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), secret student X3 (small silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_13 — 신의 수 20 — 30년의 추격
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 계단처럼 내려오는 기록 그래프 앞에서 발표하는 장면(숫자 없음).
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_14 — 현대 AI — 부분 목표와 학습한 지름길
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 마라톤 구간 깃발처럼 놓인 작은 큐브들을 잇는 길.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), secret student X2 (silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_15 — 종합 — 손·기계·대수가 만나는 곳
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 졸업 모자를 쓴 수강생들과 세 개의 겹친 고리 앞의 큐브.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Sia (side-swept bangs, calm).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```

### cover_practice — 실전 연습장
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 네 사업장(학원·공장·검수소·안내 센터) 간판 앞에 모인 박사와 수강생들, 간판에는 그림 아이콘만(글자 없음).
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), assistant Haru (long pink hair in two buns with navy streak, jeans), intern Sia (side-swept bangs, calm), intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Mood: friendly study session, no winner/loser expressions.
```
