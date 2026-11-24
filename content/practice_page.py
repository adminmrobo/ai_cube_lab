"""마지막 장 · 실전 연습장 조립"""
import os


def build(B, chs):
    B.USED.update({('doc', 'judge'), ('doc', 'think'), ('asst', 'report'), ('fly', 'magnify'), ('robo', 'calc')})
    o = [B.head('마지막 장 · 실전 연습장 — ' + B.SERIES, '스피드큐빙 학원, 솔버 공장, 조립 검수소, 길 안내 센터를 운영하며 큐브의 수학과 탐색 개념을 써 보는 시뮬레이터.', depth=1, og='../img/og/og_practice.webp')]
    o.append(f'<nav class="top" aria-label="실전 연습장 목차"><a class="logo" href="../index.html">{B.SHORT}</a><a href="#sim">사업장</a><a href="#wrap">마무리</a><a href="../15_final_review.html">15장 종합</a></nav><div id="prog"></div>')
    o.append(B.cover_html('cover_practice', '큐브 사업장 시뮬레이터', '마지막 장 · 실전 연습장', '스피드큐빙 학원 · 솔버 공장 · 조립 검수소 · 길 안내 센터', '실전 연습장 표지 — 네 사업장 앞의 박사와 수강생들', up='../'))
    o.append('<header class="hero"><div class="wrap"><div class="kicker">마지막 장 · 실전 연습장</div><h1>큐브 사업장 시뮬레이터</h1>'
             '<p class="q">핵심 질문 — 배운 개념으로 「가상 사업장」의 결정을 내리면, 숫자가 어떻게 달라질까?</p>'
             '<p>사업장 네 곳을 탭으로 골라 운영해 보세요. 초록 상자는 시장 환경(내가 못 바꾸는 조건), 파란 상자는 내 결정이에요. 성적표·그래프·캐릭터 대사가 바로 바뀌고, 미션 3개는 조작한 뒤에 자동으로 판정돼요. 주소 끝에 #academy, #solver, #qc, #route를 붙이면 그 사업장이 바로 열려요.</p>'
             + B.says([('doc', 'front', '마지막 장은 실습입니다. 정답은 계산이 판정해요. 미션 세 개씩, 모두 열두 개!'), ('moa', 'cheer', '사업장 네 곳 다 운영해 볼래요!')]) + '</div></header>')
    o.append('<section class="level" style="padding-top:24px"><div class="wrap" id="sim"></div></section>')
    o.append('''<section class="level" id="wrap"><div class="wrap"><h2>마무리 — 네 사업장이 함께 묻는 질문</h2>
<p>네 사업장은 모두 「무엇을 미리 준비하고(외운 식·표·검사 규칙·한 수의 종류), 무엇을 그때그때 계산하느냐」를 묻고 있어요. 학원에서는 외울 식의 양이 기록을, 솔버 공장에서는 표의 크기가 계산 시간을, 검수소에서는 검사 규칙 세 가지가 불량 통과율을, 길 안내 센터에서는 허용한 한 수의 종류가 가장 먼 거리(지름)를 바꿨어요. 결과 숫자를 믿기 전에 그 숫자를 만든 규칙과 기준을 먼저 확인하는 것 — 이것이 이 시리즈가 말하는 「AI 결과를 판단하는 힘」이에요.</p>
<div class="lim"><b>모형의 한계</b> — 학원의 외우는 속도와 손 속도, 솔버 공장의 계산 속도와 「확인 수 × 표 크기 ≈ 일정」 규칙, 검수소의 비용은 모두 교육용 예시값이에요. 실제 대회 기록·풀이 프로그램 성능·공장 검사 비용은 훨씬 많은 조건에 따라 달라요. 이 페이지의 결과는 경영·투자 권고가 아닙니다.</div>
</div></section>''')
    o.append(B.footer_html(('../15_final_review.html', '15 종합 — 손·기계·대수가 만나는 곳'), ('../index.html', '오리엔테이션으로'), ''))
    o.append('<script src="../assets/sprites.js"></script><script src="../assets/widgets.js"></script><script src="../assets/lab.js"></script><script src="../assets/practice.js"></script></body></html>')
    open(os.path.join(B.ROOT, 'practice', 'index.html'), 'w', encoding='utf-8').write('\n'.join(o))
    print('built practice')
