# 좌표 교실 — 이미지 제작 명세서 (표지 19장 + 장면 그림)

> 상태 (2026-11-25): **지시문 작성 완료, 그림은 아직 없음.** 지금 페이지에는 CSS·캔버스로 그린 「대체 표지」와 캐릭터 팩 얼굴이 들어가 있어요. 그림을 받으면 `img/cover/cover_NN.webp`, `img/scene/scene_NN_lvK.webp`로 넣고 `python3 tools/build.py`를 다시 돌리면 자동으로 바뀌어요. 공유 미리보기는 `python3 tools/make_og.py`로 다시 만들어요.

> 그림체: **16비트 RPG 픽셀아트**(SNES 시대 느낌), **흰 배경(#ffffff) 위 낮의 연구실**. 그림 안에 글자·숫자·수식 기호를 넣지 않는다(글자는 HTML로). 캐릭터 외형은 캐릭터 팩 `CHAR_lab4` 설정샷(주판봇 v2 기본 표정 9종)을 따른다.

## 1. 공용 규칙
- 표지(판 L): 16:9, 픽셀 격자 480×270을 4배 → 1920×1080, `NEAREST` 정수배만, 무손실 WebP. 오른쪽 46%는 제목이 올라갈 빈 여백.
- 장면(판 M): 3:2, 픽셀 격자 300×200을 4배 → 1200×800, 무손실 WebP, 「일상으로 치면」 카드 안에 들어감.
- 미공개 X1~X3은 검은 실루엣(눈만 보임). 금지: 무기·담배·술·피, 실존 인물·기업 로고, 저작권 캐릭터, 결과 전 승패를 암시하는 표정.
- 생성 순서: ① cover_00 먼저 받아 그림체 확인 → ② 이것을 참고 그림으로 함께 올려 나머지 표지 → ③ 장면 그림(같은 비율끼리 3~5장씩).
- 요청 꾸러미: 캐릭터 기본 그림 4장 + 이 문서의 지시문(대화 하나에 3~5장) + 저장 이름 체크리스트(아래 2장 표).

## 2. 필요한 그림 전체
| 키 | 페이지 | 상태 | 등장 |
|---|---|---|---|
| cover_00 | index.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 인턴 모아, 인턴 시아, 조수 하루, 미공개 X1, 미공개 X2, 미공개 X3 |
| cover_01 | 01_cube_coordinates.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 조수 하루 |
| cover_02 | 02_vectors.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_03 | 03_matrices.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 미공개 X3 |
| cover_04 | 04_cylindrical.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_05 | 05_spherical.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 미공개 X2 |
| cover_06 | 06_balls_and_bowls.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_07 | 07_saddles_and_more.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 미공개 X1 |
| cover_08 | 08_partial_derivatives.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 조수 하루 |
| cover_09 | 09_gradient.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇 |
| cover_10 | 10_gradient_descent.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_11 | 11_jacobian.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 미공개 X1 |
| cover_12 | 12_divergence.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_13 | 13_curl.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 미공개 X2 |
| cover_14 | 14_hessian.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_15 | 15_laplacian.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 미공개 X3 |
| cover_16 | 16_coordinates_and_operators.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 조수 하루 |
| cover_17 | 17_final_review.html | 대체 표지 사용 중 | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_practice | practice/index.html | 대체 표지 사용 중 | 박사, 인턴 모아, 인턴 시아, 조수 하루, 미공개 X1, 미공개 X2, 미공개 X3 |
| scene_NN_lv1~2 (34장) | 각 장 1·2단계 | 지시문만 | 비유 장면 (아래 4장) |
| 캐릭터 얼굴 | 모든 페이지 | 캐릭터 팩 재사용 (`assets/sprites.js`, 96px) | — |

## 3. 표지 지시문 (Genspark 등 이미지 생성 도구용)

### cover_00 — 오리엔테이션
- 페이지: `index.html` · 등장: 박사, 초파리, 주판봇, 인턴 모아, 인턴 시아, 조수 하루, 미공개 X1, 미공개 X2, 미공개 X3
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 흰 벽의 밝은 강의실. 큰 흰 보드 앞에 나무 큐브 모형, 투명 원기둥, 지구본이 나란히 놓여 있고 바닥에 화살표 모양 테이프가 붙어 있음.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); intern Moa (white ribbon and check ribbon above ears, cheerful); intern Sia (side-swept bangs, calm); assistant Haru (long pink hair in two buns with navy streak, jeans); secret student X1 (black silhouette, only eyes visible); secret student X2 (black silhouette, only eyes visible); secret student X3 (small black silhouette, only eyes visible).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_01 — 큐브 좌표 — 점 하나에 숫자 세 개
- 페이지: `01_cube_coordinates.html` · 등장: 박사, 초파리, 주판봇, 조수 하루
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 교실 한쪽 모서리에 큐브 모양 투명 상자가 있고, 상자 안에 떠 있는 작은 공 하나를 세 방향 끈(앞뒤·좌우·위아래)이 붙잡고 있음.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); assistant Haru (long pink hair in two buns with navy streak, jeans).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_02 — 벡터 — 크기와 방향을 가진 화살표
- 페이지: `02_vectors.html` · 등장: 박사, 초파리, 주판봇, 인턴 시아
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 모눈 바닥 위에 여러 색 화살표 카드가 꼬리-머리로 이어져 놓여 있고, 학생이 나침반을 들고 있음.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); intern Sia (side-swept bangs, calm).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_03 — 행렬 — 벡터를 바꾸는 숫자 표
- 페이지: `03_matrices.html` · 등장: 박사, 초파리, 주판봇, 미공개 X3
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 칠판 대신 점선 줄만 그어진 커다란 숫자 표(숫자는 그리지 않음)와 고무판, 고무판 위 동그라미가 비스듬히 늘어나 타원이 된 모습.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); secret student X3 (small black silhouette, only eyes visible).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_04 — 원기둥 좌표 — 회전목마의 주소
- 페이지: `04_cylindrical.html` · 등장: 박사, 초파리, 주판봇, 인턴 모아
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 교실 안의 작은 회전목마 모형. 말 인형 하나가 기둥에서 떨어진 자리에 있고 바닥에 각도를 나타내는 부채꼴 무늬.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_05 — 구면 좌표 — 지구본의 주소
- 페이지: `05_spherical.html` · 등장: 박사, 초파리, 주판봇, 미공개 X2
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 커다란 지구본 앞에서 2조(모아와 실루엣 둘)가 발표하는 장면. 지구본 위에 핀 하나가 꽂혀 있음.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); secret student X2 (black silhouette, only eyes visible).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_06 — 공·럭비공·그릇 — 식으로 읽는 곡면 1
- 페이지: `06_balls_and_bowls.html` · 등장: 박사, 초파리, 주판봇, 인턴 시아
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 책상 위에 공, 럭비공, 국그릇이 나란히 놓이고, 국그릇에 물이 반쯤 담겨 물 표면이 동그랗게 보임.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); intern Sia (side-swept bangs, calm).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_07 — 말안장·모래시계·도넛 — 식으로 읽는 곡면 2
- 페이지: `07_saddles_and_more.html` · 등장: 박사, 초파리, 주판봇, 미공개 X1
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 무대 위 오디션: 말안장 모양 의자, 모래시계, 도넛, 종 모형이 조명을 받고 있음. 프링글스 같은 감자칩 모양 소품.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); secret student X1 (black silhouette, only eyes visible).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_08 — 편미분 — 한 방향으로만 재는 기울기
- 페이지: `08_partial_derivatives.html` · 등장: 박사, 초파리, 주판봇, 조수 하루
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 눈 덮인 작은 언덕 모형 위에 동쪽·북쪽 두 갈래 작은 길이 표시되어 있고, 학생이 한 방향으로만 한 걸음 내딛는 모습.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); assistant Haru (long pink hair in two buns with navy streak, jeans).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_09 — 그래디언트 — 가장 가파른 오르막 화살표
- 페이지: `09_gradient.html` · 등장: 박사, 초파리, 주판봇
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 등산 지도처럼 등고선이 그려진 탁자 위에 빨간 나침반 바늘 모양 화살표가 가장 가파른 쪽을 가리킴.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_10 — 경사 하강 — 기울기 반대로 걸어 바닥 찾기
- 페이지: `10_gradient_descent.html` · 등장: 박사, 초파리, 주판봇, 인턴 모아
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 안개 낀 눈 골짜기 모형에서 작은 구슬(썰매)이 지그재그로 굴러 내려가는 모습, 두 조가 응원.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_11 — 야코비안 — 출력이 여러 개일 때의 기울기 표
- 페이지: `11_jacobian.html` · 등장: 박사, 초파리, 주판봇, 미공개 X1
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 로봇 팔 모형의 관절 두 개와, 손끝이 그리는 작은 타원 궤적. 옆에 톱니바퀴 세 개가 맞물린 장난감.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); secret student X1 (black silhouette, only eyes visible).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_12 — 발산 — 샘과 배수구 찾기
- 페이지: `12_divergence.html` · 등장: 박사, 초파리, 주판봇, 인턴 모아
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 분수대 모형에서 물이 사방으로 퍼져 나가고, 반대편 작은 배수구로 물이 모여드는 모습.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_13 — 회전(컬) — 바람개비가 도는 곳
- 페이지: `13_curl.html` · 등장: 박사, 초파리, 주판봇, 미공개 X2
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 수조 속 소용돌이에 꽂힌 작은 바람개비들. 학생들이 바람개비를 들고 서 있는 역할극.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); secret student X2 (black silhouette, only eyes visible).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_14 — 헤시안 — 휨을 적은 표
- 페이지: `14_hessian.html` · 등장: 박사, 초파리, 주판봇, 인턴 시아
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 그릇, 돔 지붕, 말안장 의자 세 모형을 1조가 발표하며 손으로 휨을 느끼는 장면.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); intern Sia (side-swept bangs, calm).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_15 — 라플라시안 — 평균 휨과 이웃 평균
- 페이지: `15_laplacian.html` · 등장: 박사, 초파리, 주판봇, 미공개 X3
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 찬반 토론 테이블 두 개. 가운데 화면에 작은 흑백 픽셀 사진의 테두리만 빛나고, 쇠막대가 가운데만 붉게 달아올라 있음.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); secret student X3 (small black silhouette, only eyes visible).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_16 — 좌표가 바뀌면 공식도 바뀐다 — 같은 연산자, 다른 좌표
- 페이지: `16_coordinates_and_operators.html` · 등장: 박사, 초파리, 주판봇, 조수 하루
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 회전목마 안쪽 말과 바깥쪽 말이 같은 각도를 돌지만 바깥 말의 발자국이 더 긴 모습, 옆에 등대 모형.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); assistant Haru (long pink hair in two buns with navy streak, jeans).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_17 — 종합 — 기말 쪽지시험과 졸업 발표
- 페이지: `17_final_review.html` · 등장: 박사, 초파리, 주판봇, 인턴 모아
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 졸업식 분위기의 강의실. 벽에 여섯 장의 카드(그림만, 글자 없음)가 가족 나무처럼 이어져 걸려 있고 수강생 6명이 모자를 들고 있음.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves); Jupanbot (abacus robot, v2 design); intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
### cover_practice — 실전 연습장
- 페이지: `practice/index.html` · 등장: 박사, 인턴 모아, 인턴 시아, 조수 하루, 미공개 X1, 미공개 X2, 미공개 X3
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
Scene: 네 사업장 미니어처: 눈썰매장, 드론 배송 센터, 분수 공원, 그릇 공장 앞에 박사와 수강생 6명.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat); intern Moa (white ribbon and check ribbon above ears, cheerful); intern Sia (side-swept bangs, calm); assistant Haru (long pink hair in two buns with navy streak, jeans); secret student X1 (black silhouette, only eyes visible); secret student X2 (black silhouette, only eyes visible); secret student X3 (small black silhouette, only eyes visible).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

## 4. 장면 그림 지시문 (「일상으로 치면」 카드용, 1·2단계)

공통 머리말 (모든 장면에 붙임):
```
16-bit SNES-era RPG pixel art, clean pixel grid (300x200 base, scaled x4 to 1200x800 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.
No characters required unless named; if characters appear, keep fixed designs from reference sheets.
```

| 키 | 장 · 단계 | 비유 | 장면 (한 줄 지시) |
|---|---|---|---|
| scene_01_lv1 | 01 · 1단계 | 사물함 비유 | 사물함이 여러 단으로 쌓인 복도에서 「둘째 줄, 넷째 열, 맨 위 단」이라고 하면 사물함 하나가 딱 정해져요. |
| scene_01_lv2 | 01 · 2단계 | 방 모서리 줄 비유 | 방 모서리에서 반대편 천장 모서리까지 잇는 줄은, 바닥을 대각선으로 가로지른 뒤 비스듬히 올라가는 길이와 같아요. |
| scene_02_lv1 | 02 · 1단계 | 보물 지도 비유 | 보물 지도의 「동쪽 3걸음, 북쪽 2걸음」은 어느 나무에서 시작하든 같은 움직임이에요. |
| scene_02_lv2 | 02 · 2단계 | 강 건너는 배 비유 | 강을 건너는 배는 앞으로 나아가는 힘과 옆으로 미는 물살이 합쳐져 비스듬히 가요. |
| scene_03_lv1 | 03 · 1단계 | 성적표 비유 | 성적표에서는 먼저 이름이 있는 가로줄을 찾고, 그다음 과목이 있는 세로줄을 따라 내려가요. |
| scene_03_lv2 | 03 · 2단계 | 장보기 계산서 비유 | 가게마다 가격표(행)와 내 장바구니(벡터)를 맞대어 「단가 × 개수」를 더하면 그 가게 계산서가 나와요. |
| scene_04_lv1 | 04 · 1단계 | 회전목마 비유 | 회전목마의 말 자리는 「기둥에서 2m, 입구에서 60°, 높이 1.5m」처럼 부르면 바로 찾아요. |
| scene_04_lv2 | 04 · 2단계 | 레이더 비유 | 레이더의 「거리·방향」을 지도의 「가로·세로」로 옮기는 건, 비스듬한 막대의 그림자 길이를 재는 일과 같아요. |
| scene_05_lv1 | 05 · 1단계 | 지구본 비유 | 지구본에서 도시는 위도·경도 두 숫자로 찾고, 우주 정거장은 「지면에서 높이」까지 세 숫자가 필요해요. |
| scene_05_lv2 | 05 · 2단계 | 손전등 그림자 비유 | 비스듬히 든 막대의 그림자 길이는 막대 길이 × sin(기운 각)이고, 그림자가 어느 쪽으로 눕는지는 손전등을 돌린 각이 정해요. |
| scene_06_lv1 | 06 · 1단계 | 풍선 비유 | 풍선 표면의 점은 꼭지(중심)에서 재면 모두 같은 거리에 있어요. |
| scene_06_lv2 | 06 · 2단계 | 찰흙 공 비유 | 찰흙 공을 위에서 누르면 납작해지고(c가 작아짐), 옆으로 당기면 길쭉해져요(a가 커짐). |
| scene_07_lv1 | 07 · 1단계 | 말안장 비유 | 말안장 가운데의 구슬은 앞뒤로는 굴러 돌아오지만, 옆으로 살짝만 밀어도 아래로 떨어져요. |
| scene_07_lv2 | 07 · 2단계 | 냉각탑과 고깔 비유 | 발전소 냉각탑은 허리가 잘록한 모래시계(일엽쌍곡면), 고깔모자는 원뿔이에요. 모래시계 위아래를 떼어 낸 듯한 두 그릇도 있어요. |
| scene_08_lv1 | 08 · 1단계 | 속도계 비유 | 속도계는 「지난 1시간 평균」이 아니라 「바로 지금」의 빠르기를 보여 줘요. 아주 짧은 시간 동안 간 거리로 재는 셈이에요. |
| scene_08_lv2 | 08 · 2단계 | 언덕 걷기 비유 | 언덕에서 동쪽으로만 걸을 때의 가파름과 북쪽으로만 걸을 때의 가파름은 다를 수 있어요. 한 방향씩 따로 재요. |
| scene_09_lv1 | 09 · 1단계 | 등산 지도 비유 | 등산 지도에 점마다 「가장 가파른 오르막」 화살표를 그리면, 화살표가 길수록 그 자리가 가파른 곳이에요. |
| scene_09_lv2 | 09 · 2단계 | 비탈 비유 | 비탈에서 몸을 돌리며 한 걸음씩 재 보면, 「가장 가파른 쪽」이 딱 한 방향 있고 정반대가 가장 가파른 내리막이에요. |
| scene_10_lv1 | 10 · 1단계 | 안개 낀 산 비유 | 안개 낀 산에서는 발밑이 기운 쪽의 반대로 한 걸음씩 내딛어요. 걸음을 반복하면 골짜기에 닿아요. |
| scene_10_lv2 | 10 · 2단계 | 좁은 골짜기 비유 | 좁은 골짜기에서 크게 뛰면 반대편 벽에 부딪혀 더 높이 튕겨요. 너무 조심스럽게 걸으면 해가 져도 바닥에 못 가요. |
| scene_11_lv1 | 11 · 1단계 | 로봇 팔 비유 | 로봇 팔 관절을 아주 조금 움직이면 손끝은 작은 타원 범위 안에서 움직여요. 어느 방향으로 잘 움직이는지가 그 타원 모양에 담겨요. |
| scene_11_lv2 | 11 · 2단계 | 내비게이션 비유 | 내비게이션은 「지금 속도 × 10초」로 바로 다음 위치를 잘 맞히지만, 1시간 뒤는 길이 굽어서 틀려요. |
| scene_12_lv1 | 12 · 1단계 | 세면대 비유 | 수도꼭지 아래에서는 물이 사방으로 퍼져 나가고(샘), 배수구 주변에서는 사방에서 모여 빨려 들어가요(배수구). |
| scene_12_lv2 | 12 · 2단계 | 교실 문 비유 | 교실 문 네 개의 「나간 사람 − 들어온 사람」을 모두 더하면 교실 안 인원 변화를 알 수 있어요. |
| scene_13_lv1 | 13 · 1단계 | 욕조 나뭇잎 비유 | 욕조 소용돌이에 띄운 나뭇잎은 물을 따라 돌면서 자기 자리에서도 빙글 돌아요. 한결같은 물살 위 나뭇잎은 떠내려가기만 해요. |
| scene_13_lv2 | 13 · 2단계 | 회전문 비유 | 회전문은 한쪽 날개를 위로, 반대쪽을 아래로 밀 때 가장 잘 돌아요. 양쪽을 똑같이 밀면 안 돌아요. |
| scene_14_lv1 | 14 · 1단계 | 그네와 미끄럼틀 비유 | 그네는 가운데에서 멀어질수록 점점 가팔라지고(기울기가 커짐), 미끄럼틀 꼭대기는 내려갈수록 가팔라져요(기울기가 작아짐 = 음수로 커짐). |
| scene_14_lv2 | 14 · 2단계 | 손끝 감각 비유 | 곡면 가운데를 손으로 만지며 앞뒤·좌우·대각선 방향으로 휨을 느끼면 그릇·돔·안장을 알 수 있어요. 헤시안은 그 「손끝 감각」을 숫자 표로 적은 것이에요. |
| scene_15_lv1 | 15 · 1단계 | 그릇과 돔 비유 | 그릇의 휨을 모두 더하면 +, 돔은 −, 말안장은 위로 휜 만큼 아래로 휘어서 0이 될 수 있어요. |
| scene_15_lv2 | 15 · 2단계 | 반 평균 비유 | 반에서 내 점수가 앞·뒤·좌·우 친구들 평균보다 낮으면 나는 「움푹한 자리」, 높으면 「솟은 자리」예요. |
| scene_16_lv1 | 16 · 1단계 | 회전목마 비유 | 회전목마 바깥쪽 말은 안쪽 말보다 같은 360°를 돌아도 훨씬 먼 거리를 달려요. 반지름이 클수록 「한 바퀴」가 길어요. |
| scene_16_lv2 | 16 · 2단계 | 등대 비유 | 등대 불빛은 멀리 있는 배일수록 더 빠르게 휙 지나가요. 같은 「각도 빠르기」라도 거리가 멀면 실제 빠르기가 달라요. |
| scene_17_lv1 | 17 · 1단계 | 가족 관계도 비유 | 가족 관계도는 「누가 누구의 자식인가」만 보면 한눈에 정리돼요. 델 연산자 가족도 「무엇에서 무엇이 나오나」만 보면 돼요. |
| scene_17_lv2 | 17 · 2단계 | 산길 한 바퀴 비유 | 산길을 한 바퀴 돌아 출발점에 오면, 오른 만큼 내려와서 높이 변화의 합이 0이에요. 「높이」에서 나온 화살표는 빙글빙글 돌 수 없어요. |

## 5. 반영 방법
1. 받은 PNG가 4배 격자에 정확히 맞는지 확인(4×4 블록 안 색이 모두 같아야 함). 맞지 않으면 `NEAREST`로 원래 격자(480×270, 300×200)로 줄였다가 다시 4배.
2. 무손실 WebP로 저장: 표지 `img/cover/`, 장면 `img/scene/`.
3. `python3 tools/build.py` → 대체 표지가 픽셀아트 표지로 바뀌고, 장면 그림이 카드에 들어가요.
4. `python3 tools/make_og.py`를 고쳐 표지에서 1200×630을 4px 격자에 맞춰 잘라 og를 다시 만들어요.
