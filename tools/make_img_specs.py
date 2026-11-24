#!/usr/bin/env python3
"""docs/IMG_specs.md 생성: 표지 19장 + 장면 그림(1·2단계) 지시문. 16비트 RPG 픽셀아트, 흰 배경."""
import os, importlib.util
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STYLE = ('16-bit SNES-era RPG pixel art, clean pixel grid ({g} base, scaled x4 to {s} with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), '
         'soft pastel accents, no text, no letters, no numbers, no logos, no math symbols.')
CHARS = {'doc': 'Professor (teal square glasses, short ponytail with white streak, white lab coat)', 'fly': 'fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves)',
         'robo': 'Jupanbot (abacus robot, v2 design)', 'asst': 'assistant Haru (long pink hair in two buns with navy streak, jeans)', 'sia': 'intern Sia (side-swept bangs, calm)',
         'moa': 'intern Moa (white ribbon and check ribbon above ears, cheerful)', 'x1': 'secret student X1 (black silhouette, only eyes visible)', 'x2': 'secret student X2 (black silhouette, only eyes visible)',
         'x3': 'secret student X3 (small black silhouette, only eyes visible)'}
NAMES = {'doc': '박사', 'fly': '초파리', 'robo': '주판봇', 'asst': '조수 하루', 'sia': '인턴 시아', 'moa': '인턴 모아', 'x1': '미공개 X1', 'x2': '미공개 X2', 'x3': '미공개 X3'}
SCENE = {
 0: '흰 벽의 밝은 강의실. 큰 흰 보드 앞에 나무 큐브 모형, 투명 원기둥, 지구본이 나란히 놓여 있고 바닥에 화살표 모양 테이프가 붙어 있음',
 1: '교실 한쪽 모서리에 큐브 모양 투명 상자가 있고, 상자 안에 떠 있는 작은 공 하나를 세 방향 끈(앞뒤·좌우·위아래)이 붙잡고 있음',
 2: '모눈 바닥 위에 여러 색 화살표 카드가 꼬리-머리로 이어져 놓여 있고, 학생이 나침반을 들고 있음',
 3: '칠판 대신 점선 줄만 그어진 커다란 숫자 표(숫자는 그리지 않음)와 고무판, 고무판 위 동그라미가 비스듬히 늘어나 타원이 된 모습',
 4: '교실 안의 작은 회전목마 모형. 말 인형 하나가 기둥에서 떨어진 자리에 있고 바닥에 각도를 나타내는 부채꼴 무늬',
 5: '커다란 지구본 앞에서 2조(모아와 실루엣 둘)가 발표하는 장면. 지구본 위에 핀 하나가 꽂혀 있음',
 6: '책상 위에 공, 럭비공, 국그릇이 나란히 놓이고, 국그릇에 물이 반쯤 담겨 물 표면이 동그랗게 보임',
 7: '무대 위 오디션: 말안장 모양 의자, 모래시계, 도넛, 종 모형이 조명을 받고 있음. 프링글스 같은 감자칩 모양 소품',
 8: '눈 덮인 작은 언덕 모형 위에 동쪽·북쪽 두 갈래 작은 길이 표시되어 있고, 학생이 한 방향으로만 한 걸음 내딛는 모습',
 9: '등산 지도처럼 등고선이 그려진 탁자 위에 빨간 나침반 바늘 모양 화살표가 가장 가파른 쪽을 가리킴',
 10: '안개 낀 눈 골짜기 모형에서 작은 구슬(썰매)이 지그재그로 굴러 내려가는 모습, 두 조가 응원',
 11: '로봇 팔 모형의 관절 두 개와, 손끝이 그리는 작은 타원 궤적. 옆에 톱니바퀴 세 개가 맞물린 장난감',
 12: '분수대 모형에서 물이 사방으로 퍼져 나가고, 반대편 작은 배수구로 물이 모여드는 모습',
 13: '수조 속 소용돌이에 꽂힌 작은 바람개비들. 학생들이 바람개비를 들고 서 있는 역할극',
 14: '그릇, 돔 지붕, 말안장 의자 세 모형을 1조가 발표하며 손으로 휨을 느끼는 장면',
 15: '찬반 토론 테이블 두 개. 가운데 화면에 작은 흑백 픽셀 사진의 테두리만 빛나고, 쇠막대가 가운데만 붉게 달아올라 있음',
 16: '회전목마 안쪽 말과 바깥쪽 말이 같은 각도를 돌지만 바깥 말의 발자국이 더 긴 모습, 옆에 등대 모형',
 17: '졸업식 분위기의 강의실. 벽에 여섯 장의 카드(그림만, 글자 없음)가 가족 나무처럼 이어져 걸려 있고 수강생 6명이 모자를 들고 있음',
 'practice': '네 사업장 미니어처: 눈썰매장, 드론 배송 센터, 분수 공원, 그릇 공장 앞에 박사와 수강생 6명',
}


def load(i):
    spec = importlib.util.spec_from_file_location('c', os.path.join(ROOT, 'content', 'ch%02d.py' % i))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m.CH


def cover(key, page, title, who, scene):
    chars = '; '.join(CHARS[w] for w in who)
    return f'''### {key} — {title}
- 페이지: `{page}` · 등장: {', '.join(NAMES[w] for w in who)}
```
{STYLE.format(g='480x270', s='1920x1080')}
Scene: {scene}.
Characters (keep fixed designs from reference sheets): {chars}.
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```
'''


def main():
    chs = [load(i) for i in range(1, 18)]
    o = ['''# 좌표 교실 — 이미지 제작 명세서 (표지 19장 + 장면 그림)

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
''']
    rows = [('cover_00', 'index.html', ['doc', 'fly', 'robo', 'moa', 'sia', 'asst', 'x1', 'x2', 'x3'])]
    for c in chs:
        rows.append(('cover_%02d' % c['no'], c['slug'] + '.html', ['doc', 'fly', 'robo', c['star'][0]]))
    rows.append(('cover_practice', 'practice/index.html', ['doc', 'moa', 'sia', 'asst', 'x1', 'x2', 'x3']))
    for k, p, w in rows:
        o.append('| %s | %s | 대체 표지 사용 중 | %s |\n' % (k, p, ', '.join(NAMES[x] for x in dict.fromkeys(w))))
    o.append('| scene_NN_lv1~2 (34장) | 각 장 1·2단계 | 지시문만 | 비유 장면 (아래 4장) |\n| 캐릭터 얼굴 | 모든 페이지 | 캐릭터 팩 재사용 (`assets/sprites.js`, 96px) | — |\n\n## 3. 표지 지시문 (Genspark 등 이미지 생성 도구용)\n\n')
    o.append(cover('cover_00', 'index.html', '오리엔테이션', ['doc', 'fly', 'robo', 'moa', 'sia', 'asst', 'x1', 'x2', 'x3'], SCENE[0]))
    for c in chs:
        o.append(cover('cover_%02d' % c['no'], c['slug'] + '.html', c['title'], list(dict.fromkeys(['doc', 'fly', 'robo', c['star'][0]])), SCENE[c['no']]))
    o.append(cover('cover_practice', 'practice/index.html', '실전 연습장', ['doc', 'moa', 'sia', 'asst', 'x1', 'x2', 'x3'], SCENE['practice']))
    o.append('\n## 4. 장면 그림 지시문 (「일상으로 치면」 카드용, 1·2단계)\n\n공통 머리말 (모든 장면에 붙임):\n```\n' + STYLE.format(g='300x200', s='1200x800') + '\nNo characters required unless named; if characters appear, keep fixed designs from reference sheets.\n```\n\n| 키 | 장 · 단계 | 비유 | 장면 (한 줄 지시) |\n|---|---|---|---|\n')
    for c in chs:
        for i, st in enumerate(c['stages'][:2], 1):
            scene = st['pair'][0].replace('|', '/')
            o.append('| scene_%02d_lv%d | %02d · %d단계 | %s | %s |\n' % (c['no'], i, c['no'], i, st['pair'][2], scene))
    o.append('\n## 5. 반영 방법\n1. 받은 PNG가 4배 격자에 정확히 맞는지 확인(4×4 블록 안 색이 모두 같아야 함). 맞지 않으면 `NEAREST`로 원래 격자(480×270, 300×200)로 줄였다가 다시 4배.\n2. 무손실 WebP로 저장: 표지 `img/cover/`, 장면 `img/scene/`.\n3. `python3 tools/build.py` → 대체 표지가 픽셀아트 표지로 바뀌고, 장면 그림이 카드에 들어가요.\n4. `python3 tools/make_og.py`를 고쳐 표지에서 1200×630을 4px 격자에 맞춰 잘라 og를 다시 만들어요.\n')
    open(os.path.join(ROOT, 'docs', 'IMG_specs.md'), 'w', encoding='utf-8').write(''.join(o))
    print('IMG_specs written')


if __name__ == '__main__':
    main()
