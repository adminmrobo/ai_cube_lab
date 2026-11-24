"""인포그래픽용 작은 도식 (정적 SVG, 320×240). 색은 lab.css 토큰과 같다."""
import math

K, MU, RULE, G, M, R, A, B, ACC = '#16212b', '#5b6874', '#d5dbe2', '#13733a', '#9b3fb5', '#c9302c', '#a35c00', '#1e55c8', '#3b4fb8'
CY, CO, CG, CW, CR, CB = '#f5d90a', '#f08a1c', '#1f9d4a', '#ffffff', '#d42b2b', '#2a62d4'


def T(x, y, s, c=K, size=13, w=400, anchor='start'):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{c}" font-weight="{w}" text-anchor="{anchor}">{s}</text>'


def wrap(body, label):
    return f'<svg viewBox="0 0 320 240" width="100%" role="img" aria-label="{label}" style="max-width:420px;font-family:inherit">{body}</svg>'


def iso_cube(cx, cy, s, top, left, right, stroke=K):
    """작은 등각 큐브: top/left/right는 9색 목록"""
    o = []
    def P(x, y, z):
        return (cx + (x - z) * 0.866 * s, cy + (x + z) * 0.5 * s - y * s)
    def quad(pts, col):
        return '<polygon points="%s" fill="%s" stroke="%s" stroke-width="1.2"/>' % (' '.join('%.1f,%.1f' % p for p in pts), col, stroke)
    for i in range(3):
        for j in range(3):
            x0, z0 = -1.5 + j, -1.5 + i
            o.append(quad([P(x0, 1.5, z0), P(x0 + 1, 1.5, z0), P(x0 + 1, 1.5, z0 + 1), P(x0, 1.5, z0 + 1)], top[i * 3 + j]))
            x0, y0 = -1.5 + j, 1.5 - i
            o.append(quad([P(x0, y0, 1.5), P(x0 + 1, y0, 1.5), P(x0 + 1, y0 - 1, 1.5), P(x0, y0 - 1, 1.5)], left[i * 3 + j]))
            z0, y0 = 1.5 - j, 1.5 - i
            o.append(quad([P(1.5, y0, z0), P(1.5, y0, z0 - 1), P(1.5, y0 - 1, z0 - 1), P(1.5, y0 - 1, z0)], right[i * 3 + j]))
    return ''.join(o)


def pieces():
    g = '#d9dde2'
    top = [CY if k in (0, 2, 6, 8) else (CY if k == 4 else g) for k in range(9)]
    o = [iso_cube(110, 120, 30, [CY if k in (0, 2, 6, 8) else g for k in range(9)], [CG if k in (0, 2, 6, 8) else g for k in range(9)], [CO if k in (0, 2, 6, 8) else g for k in range(9)])]
    o.append(T(230, 70, '꼭짓점 8', R, 14, 700) + T(230, 90, '스티커 3장', MU, 12))
    o.append(T(230, 125, '모서리 12', B, 14, 700) + T(230, 145, '스티커 2장', MU, 12))
    o.append(T(230, 180, '가운데 6', G, 14, 700) + T(230, 200, '고정 · 1장', MU, 12))
    o.append(T(110, 228, '꼭짓점만 색칠', MU, 12, 400, 'middle'))
    return wrap(''.join(o), '큐브 조각 세 종류')


def notation():
    o = [iso_cube(100, 120, 28, [CY] * 9, [CG] * 9, [CO] * 9)]
    o.append(f'<path d="M150 70 C 185 80, 190 140, 160 175" fill="none" stroke="{M}" stroke-width="4" marker-end="url(#ar1)"/>')
    o.append(f'<defs><marker id="ar1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="{M}"/></marker></defs>')
    o.append(T(215, 80, 'R = 오른면 시계 90°', K, 13, 700) + T(215, 105, 'R′ = 반대로 90°', K, 13) + T(215, 130, 'R2 = 180°', K, 13))
    o.append(T(215, 170, '되돌리기:', G, 13, 700) + T(215, 192, '순서는 거꾸로,', G, 12) + T(215, 210, '방향은 반대로', G, 12))
    return wrap(''.join(o), '돌리기 기호 설명')


def flow(steps, label, colors=None):
    o = []
    n = len(steps)
    w = 300 / n
    for i, s in enumerate(steps):
        x = 10 + i * w
        col = (colors or [ACC] * n)[i]
        o.append(f'<rect x="{x:.1f}" y="70" width="{w - 10:.1f}" height="70" rx="8" fill="{col}" fill-opacity="0.15" stroke="{col}" stroke-width="2"/>')
        lines = s.split('|')
        for j, t in enumerate(lines):
            o.append(T(x + (w - 10) / 2, 100 + j * 18, t, K, 12, 700 if j == 0 else 400, 'middle'))
        if i < n - 1:
            o.append(T(x + w - 7, 110, '→', MU, 14, 700, 'middle'))
    return wrap(''.join(o), label)


def cfop():
    return flow(['Cross|십자', 'F2L|41가지', 'OLL|57가지', 'PLL|21가지'], 'CFOP 네 단계', [G, B, A, R])


def blocks():
    g = '#d9dde2'
    left = [g, g, g, CR, CR, CR, CR, CR, CR]
    o = [iso_cube(85, 120, 24, [g] * 9, [g, g, g, CG, g, CG, CG, g, CG], [g, g, g, CO, CO, CO, CO, CO, CO])]
    o.append(T(85, 215, 'Roux: 양쪽 블록', K, 12, 700, 'middle'))
    o.append(T(85, 232, '가운데 줄은 비워 둠', MU, 11, 400, 'middle'))
    o.append(iso_cube(235, 120, 24, [CY] * 9, [g, CG, g, g, CG, g, g, CG, g], [g, CO, g, g, CO, g, g, CO, g]))
    o.append(T(235, 215, 'ZZ: L·R·U·D만', K, 12, 700, 'middle'))
    o.append(T(235, 232, '모서리 방향 유지', MU, 11, 400, 'middle'))
    return wrap(''.join(o), 'Roux와 ZZ 비교')


def memo():
    D = [('PLL', 21), ('OLL', 57), ('ZBLL', 493), ('1LLL', 3915)]
    o = [T(10, 22, '외울 식 (자릿수 눈금)', MU, 12)]
    for i, (n, v) in enumerate(D):
        y = 45 + i * 45
        w = math.log10(v) * 60
        o.append(f'<rect x="70" y="{y}" width="{w:.1f}" height="28" rx="5" fill="{ACC}" fill-opacity="{0.35 + 0.18 * i:.2f}"/>')
        o.append(T(10, y + 19, n, K, 13, 700) + T(76 + w, y + 19, f'{v:,}', K, 13))
    return wrap(''.join(o), '식 묶음 크기 비교')


def group():
    o = []
    cx, cy, r = 110, 120, 70
    for i in range(4):
        a = -math.pi / 2 + i * math.pi / 2
        x, y = cx + r * math.cos(a), cy + r * math.sin(a)
        o.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="18" fill="{"#fff" if i else G}" stroke="{K}" stroke-width="1.5"/>')
        o.append(T(x, y + 5, ['e', 'F', 'F²', 'F³'][i], '#fff' if i == 0 else K, 13, 700, 'middle'))
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{B}" stroke-width="2" stroke-dasharray="6 4"/>')
    o.append(T(cx, cy + 5, 'F를 4번 → e', B, 12, 700, 'middle'))
    o.append(T(215, 70, '닫혀 있음', K, 13, 700) + T(215, 100, '항등원 e', K, 13, 700) + T(215, 130, '역원 F⁻¹ = F³', K, 13, 700) + T(215, 160, '결합법칙', K, 13, 700))
    o.append(T(215, 200, 'RU ≠ UR (비가환)', R, 13, 700))
    return wrap(''.join(o), '군의 네 약속')


def comm():
    labels = [('A', '준비', B), ('B', '작업', A), ('A⁻¹', '되돌리기', M), ('B⁻¹', '되돌리기', R)]
    o = []
    for i, (s, t, c) in enumerate(labels):
        x = 20 + i * 75
        o.append(f'<rect x="{x}" y="60" width="62" height="56" rx="8" fill="{c}" fill-opacity="0.14" stroke="{c}" stroke-width="2"/>')
        o.append(T(x + 31, 86, s, c, 16, 700, 'middle') + T(x + 31, 106, t, K, 11, 400, 'middle'))
    o.append(T(160, 150, '켤레 = 앞의 셋 (A B A⁻¹)', K, 13, 700, 'middle'))
    o.append(T(160, 175, '교환자 = 넷 모두 (A B A⁻¹ B⁻¹)', K, 13, 700, 'middle'))
    o.append(T(160, 205, '[R U R′, D] → 꼭짓점 3개만 순환', G, 13, 700, 'middle'))
    return wrap(''.join(o), '켤레와 교환자 구조')


def parity():
    rows = [('① 비틀림 합', 'mod 3 = 0', '1/3 통과'), ('② 뒤집힌 수', '짝수', '1/2 통과'), ('③ 자리 바꿈', '홀짝 같음', '1/2 통과')]
    o = []
    for i, (a, b, c) in enumerate(rows):
        y = 30 + i * 52
        o.append(f'<rect x="10" y="{y}" width="300" height="42" rx="8" fill="#fff" stroke="{RULE}"/>')
        o.append(T(22, y + 26, a, K, 13, 700) + T(140, y + 26, b, B, 13, 700) + T(300, y + 26, c, MU, 12, 400, 'end'))
    o.append(T(160, 210, '셋 다 통과 = 1/3 × 1/2 × 1/2 = 1/12', G, 14, 700, 'middle'))
    return wrap(''.join(o), '풀 수 있는 큐브의 세 조건')


def cosets():
    cols = [B, R, G, A]
    o = []
    cx, cy, r = 110, 120, 80
    for i in range(12):
        a = -math.pi / 2 + i * math.pi / 6
        x, y = cx + r * math.cos(a), cy + r * math.sin(a)
        o.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="13" fill="{cols[i % 4]}"/>' + T(x, y + 5, str(i), '#fff', 12, 700, 'middle'))
    o.append(T(cx, cy + 4, 'H = {0, 4, 8}', K, 12, 700, 'middle'))
    o.append(T(210, 80, '방 4개 × 3개씩', K, 13, 700) + T(210, 105, '= 12', K, 13, 700))
    o.append(T(210, 150, '|G| ÷ |H|', B, 14, 700) + T(210, 175, '= 잉여류 개수', MU, 12))
    return wrap(''.join(o), '시계로 본 잉여류')


def funnel():
    rows = [('2,048', 300), ('1,082,565', 240), ('29,400', 180), ('663,552', 120)]
    o = []
    for i, (t, w) in enumerate(rows):
        y = 25 + i * 44
        x = 160 - w / 2
        o.append(f'<rect x="{x}" y="{y}" width="{w}" height="36" rx="6" fill="{ACC}" fill-opacity="{0.2 + 0.15 * i:.2f}" stroke="{ACC}"/>')
        o.append(T(160, y + 23, f'G{i} → G{i + 1} · {t}', K, 12, 700, 'middle'))
    o.append(T(160, 222, '곱 = 43,252,003,274,489,856,000', G, 12, 700, 'middle'))
    return wrap(''.join(o), '티슬스웨이트 깔때기')


def graph():
    o = []
    cx, cy = 110, 120
    for d, n in enumerate([1, 6, 12]):
        rr = d * 45
        if d:
            o.append(f'<circle cx="{cx}" cy="{cy}" r="{rr}" fill="none" stroke="{RULE}" stroke-dasharray="3 4"/>')
        for i in range(n):
            a = -math.pi / 2 + i * 2 * math.pi / n
            x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
            if d:
                pa = -math.pi / 2 + (i // (n // max(1, [1, 6, 12][d - 1]))) * 2 * math.pi / [1, 6, 12][d - 1]
                px, py = cx + (d - 1) * 45 * math.cos(pa), cy + (d - 1) * 45 * math.sin(pa)
                o.append(f'<line x1="{px:.1f}" y1="{py:.1f}" x2="{x:.1f}" y2="{y:.1f}" stroke="{B}" stroke-opacity=".5"/>')
            o.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{8 if d == 0 else 5}" fill="{G if d == 0 else "#fff"}" stroke="{K}"/>')
    o.append(T(220, 70, '점 = 상태', K, 13, 700) + T(220, 95, '선 = 한 수', K, 13, 700) + T(220, 135, '층: 1, 18, 243,', MU, 12) + T(220, 155, '3,240, 43,239 …', MU, 12) + T(220, 190, '지름 = 신의 수', R, 13, 700))
    return wrap(''.join(o), '케일리 그래프 층 구조')


def tree():
    o = []
    def node(x, y, cut=False, ok=False):
        c = R if cut else (G if ok else '#fff')
        return f'<circle cx="{x}" cy="{y}" r="7" fill="{c}" stroke="{K}"/>'
    lv = [[160], [80, 240], [40, 120, 200, 280], [20, 60, 100, 140, 180, 220, 260, 300]]
    cut = {(2, 0), (2, 3), (3, 4), (3, 5)}
    for d in range(1, 4):
        for i, x in enumerate(lv[d]):
            if (d, i) in cut or (d == 3 and (2, i // 2) in cut):
                pass
            par = lv[d - 1][i // 2]
            dead = (d == 3 and (2, i // 2) in cut)
            o.append(f'<line x1="{par}" y1="{30 + (d - 1) * 55}" x2="{x}" y2="{30 + d * 55}" stroke="{RULE if dead else K}" stroke-dasharray="{"3 3" if dead else "0"}"/>')
    for d in range(4):
        for i, x in enumerate(lv[d]):
            dead = d == 3 and (2, i // 2) in cut
            if dead:
                continue
            o.append(node(x, 30 + d * 55, (d, i) in cut, d == 3 and i == 6))
    o.append(T(160, 232, '빨강 = g + h가 한도를 넘어 잘라 낸 가지', MU, 11, 400, 'middle'))
    return wrap(''.join(o), 'IDA* 가지치기 나무')


def timeline():
    pts = [(1981, 52), (1990, 42), (1992, 37), (1995, 29), (2007, 26), (2008, 22), (2010, 20)]
    def X(y):
        return 30 + (y - 1981) / 29 * 270
    def Y(v):
        return 210 - (v - 15) / 40 * 180
    o = [f'<polyline points="{" ".join("%.1f,%.1f" % (X(a), Y(b)) for a, b in pts)}" fill="none" stroke="{R}" stroke-width="3"/>']
    o.append(f'<polyline points="{X(1981):.1f},{Y(18):.1f} {X(1995):.1f},{Y(18):.1f} {X(1995):.1f},{Y(20):.1f} {X(2010):.1f},{Y(20):.1f}" fill="none" stroke="{B}" stroke-width="3"/>')
    for a, b in pts:
        o.append(f'<circle cx="{X(a):.1f}" cy="{Y(b):.1f}" r="4" fill="{R}"/>' + T(X(a), Y(b) - 8, str(b), R, 11, 700, 'middle'))
    o.append(T(30, 232, '1981', MU, 11) + T(300, 232, '2010', MU, 11, 400, 'end') + T(160, 200, '아래 경계 18 → 20', B, 12, 700, 'middle'))
    return wrap(''.join(o), '신의 수 위·아래 경계')


def subgoal():
    chain = ['1', '7', '31', '125', '500', '1000']
    o = []
    for i, c in enumerate(chain):
        x = 25 + i * 54
        o.append(f'<circle cx="{x}" cy="90" r="20" fill="{G if i in (0, len(chain) - 1) else "#fff"}" stroke="{K}"/>' + T(x, 95, c, '#fff' if i in (0, len(chain) - 1) else K, 11, 700, 'middle'))
        if i < len(chain) - 1:
            o.append(T(x + 27, 95, '→', MU, 13, 700, 'middle'))
    o.append(T(160, 145, '생성기가 중간 목표를 제안', K, 13, 700, 'middle'))
    o.append(T(160, 170, '구간마다 짧게 찾아 이어 붙이기', MU, 12, 400, 'middle'))
    o.append(T(160, 205, '닿을 수 없는 목표 = 실패', R, 13, 700, 'middle'))
    return wrap(''.join(o), '부분 목표 탐색 흐름')


def venn():
    o = []
    for (x, y, c, t) in [(120, 95, R, '손'), (200, 95, B, '기계'), (160, 160, G, '대수')]:
        o.append(f'<circle cx="{x}" cy="{y}" r="62" fill="{c}" fill-opacity="0.13" stroke="{c}" stroke-width="3"/>')
    o.append(T(85, 75, '손', R, 15, 700, 'middle') + T(235, 75, '기계', B, 15, 700, 'middle') + T(160, 205, '대수', G, 15, 700, 'middle'))
    o.append(iso_cube(160, 125, 9, [CY] * 9, [CG] * 9, [CO] * 9))
    return wrap(''.join(o), '손·기계·대수 세 고리')


DIA = {'pieces': pieces, 'notation': notation, 'cfop': cfop, 'blocks': blocks, 'memo': memo, 'group': group, 'comm': comm,
       'parity': parity, 'cosets': cosets, 'funnel': funnel, 'graph': graph, 'tree': tree, 'timeline': timeline, 'subgoal': subgoal, 'venn': venn}
