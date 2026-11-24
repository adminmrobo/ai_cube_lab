# 좌표 교실 — AI를 위한 좌표와 벡터 미분

중학생도 따라올 수 있게 만든 연구실 해설 시리즈예요. 인포그래픽 네 장(그래디언트·야코비안·헤시안 / 델 연산자 / 세 좌표계의 벡터 미분 공식표 / 곡면 11종 도감)에 담긴 개념을, 행렬과 벡터를 처음 배우는 분도 따라오도록 17장으로 나누고, 장마다 다른 수업 형식(1:1 토론, 조별 과제, 계산배틀, 발표수업, 역할극, 찬반 토론, 쪽지시험 등)으로 풀었어요.

- 선생님: 박사 · 조교: 초파리 연구원, 주판봇 · 수강생: 인턴 시아(인턴1), 인턴 모아(인턴2), 조수 하루, 미공개 X1·X2·X3
- 1조 「큐브조」 시아·하루·X1 / 2조 「지구본조」 모아·X2·X3

**바로 보기:** 게시할 저장소가 정해지면 GitHub Pages 주소를 적어요. `content/common.py`의 `SITE`도 같은 주소로 바꾼 뒤 `python3 tools/build.py`를 다시 돌리세요.

## 목차

| 장 | 제목 | 수업 형식 | 과정 |
|---|---|---|---|
| 00 | [오리엔테이션](index.html) | 오리엔테이션 | — |
| 01 | [큐브 좌표 — 점 하나에 숫자 세 개](01_cube_coordinates.html) | 첫 강의 + 쪽지시험 | 기본 |
| 02 | [벡터 — 크기와 방향을 가진 화살표](02_vectors.html) | 조별 과제 | 기본 |
| 03 | [행렬 — 벡터를 바꾸는 숫자 표](03_matrices.html) | 계산배틀 | 기본 |
| 04 | [원기둥 좌표 — 회전목마의 주소](04_cylindrical.html) | 1:1 토론 | 기본 |
| 05 | [구면 좌표 — 지구본의 주소](05_spherical.html) | 발표수업 | 기본 |
| 06 | [공·럭비공·그릇 — 식으로 읽는 곡면 1](06_balls_and_bowls.html) | 조별 토론 | 기본 |
| 07 | [말안장·모래시계·도넛 — 식으로 읽는 곡면 2](07_saddles_and_more.html) | 역할극 수업 | 기본 |
| 08 | [편미분 — 한 방향으로만 재는 기울기](08_partial_derivatives.html) | 첫 강의 + 쪽지시험 | 기본 |
| 09 | [그래디언트 — 가장 가파른 오르막 화살표](09_gradient.html) | 계산배틀 | 기본 |
| 10 | [경사 하강 — 기울기 반대로 걸어 바닥 찾기](10_gradient_descent.html) | 조별 과제 | 기본 |
| 11 | [야코비안 — 출력이 여러 개일 때의 기울기 표](11_jacobian.html) | 1:1 토론 | 심화 |
| 12 | [발산 — 샘과 배수구 찾기](12_divergence.html) | 조별 토론 | 기본 |
| 13 | [회전(컬) — 바람개비가 도는 곳](13_curl.html) | 역할극 수업 | 기본 |
| 14 | [헤시안 — 휨을 적은 표](14_hessian.html) | 발표수업 | 심화 |
| 15 | [라플라시안 — 평균 휨과 이웃 평균](15_laplacian.html) | 찬반 토론 | 기본 |
| 16 | [좌표가 바뀌면 공식도 바뀐다](16_coordinates_and_operators.html) | 발표 + 질의응답 | 심화 |
| 17 | [종합 — 기말 쪽지시험과 졸업 발표](17_final_review.html) | 쪽지시험 + 졸업 발표 | 기본 |
| 마지막 장 | [실전 연습장](practice/index.html) | 시뮬레이터 (눈썰매장·드론 배송 센터·분수 공원·그릇 공장) | — |

## 구성

- `index.html`, `NN_*.html`, `practice/index.html` — 페이지 (외부 라이브러리 없음, 글꼴만 외부 요청, 브라우저 저장소 사용 안 함)
- `assets/` — 공용 스타일(`lab.css`), 캐릭터·용어·퀴즈·대결(`lab.js`), 그림 실험(`widgets.js` ← `assets/src/w1~w3.js`), 실전 연습장(`practice.js`), 캐릭터 그림(`sprites.js`), 지식 색인·꾸러미(`js/kgx.js`)
- `content/` — 장별 내용 데이터, `tools/build.py` — 조립 스크립트 (`python3 tools/build.py`)
- `tools/verify_numbers.py` 숫자 검산, `tools/check_pages.py` 화면 점검, `tools/check_practice.py` 실전 연습장 미션 검사, `tools/make_og.py` 공유 미리보기, `tools/make_img_specs.py` 그림 명세서
- `img/source/` — 원자료 인포그래픽 4장(사용자 제공), `img/og/` — 공유 미리보기
- `docs/IMG_specs.md` — 표지·장면 그림 제작 명세서(16비트 RPG 픽셀아트 지시문), `docs/WORK_NOTES.md` — 사실 카드·원자료 바로잡기·검산·교수법 채점, `docs/PERSONA_REVIEW.md` — 페르소나 평가
- `cover_manifest.json` — 표지·온톨로지 현황판 연결 파일

## 원자료와 다른 곳

원자료 인포그래픽에서 바로잡은 곳은 각 단계의 「원자료 인포그래픽 보기」 상자와 `docs/WORK_NOTES.md`에 「원자료의 A를 이 페이지에서는 B로 바꿉니다」 형식으로 적었어요. (그래디언트 화살표의 위치, 헤시안 대칭의 조건, 이차곡면이 아닌 세 곡면)

---

글 · 안상선 ([소개](https://adminmrobo.github.io/who_am_i/who_am_i.html)) · (주)M-Robo 대표
캐릭터 그림은 연구실 캐릭터 팩(adminmrobo/fruitfly-lab-expressions)을 쓰며 허락 없이 다시 쓸 수 없습니다.
