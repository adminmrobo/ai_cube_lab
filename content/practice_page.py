"""마지막 장 · 실전 연습장 조립"""
import os


def build(B, chs):
    B.USED.update({('doc', 'judge'), ('doc', 'think'), ('asst', 'report'), ('fly', 'magnify'), ('robo', 'calc')})
    o = [B.head('마지막 장 · 실전 연습장 — ' + B.SERIES, '눈썰매장, 드론 배송 센터, 분수 공원, 그릇 공장을 운영하며 좌표와 벡터 미분을 써 보는 시뮬레이터.', depth=1, og='../img/og/og_practice.webp')]
    o.append('<nav class="top" aria-label="실전 연습장 목차"><a class="logo" href="../index.html">좌표 교실</a><a href="#sim">사업장</a><a href="#wrap">마무리</a><a href="../17_final_review.html">17장 종합</a></nav><div id="prog"></div>')
    o.append(B.cover_html('cover_practice', '좌표 교실 사업장 시뮬레이터', '마지막 장 · 실전 연습장', '눈썰매장 · 드론 배송 센터 · 분수 공원 · 그릇 공장', '실전 연습장 표지 — 네 사업장 앞의 박사와 수강생들', up='../',
                          chars=[('doc', 'front'), ('moa', 'cheer'), ('sia', 'smile'), ('asst', 'spark')], motif=2).replace('src="img/', 'src="../img/'))
    o.append('<header class="hero"><div class="wrap"><div class="kicker">마지막 장 · 실전 연습장</div><h1>좌표 교실 사업장 시뮬레이터</h1>'
             '<p class="q">핵심 질문 — 배운 개념으로 「가상 사업장」의 결정을 내리면, 숫자가 어떻게 달라질까?</p>'
             '<p>사업장 네 곳을 탭으로 골라 운영해 보세요. 초록 상자는 환경 조건(내가 못 바꾸는 것), 파란 상자는 내 결정이에요. 성적표·그래프·캐릭터 대사가 바로 바뀌고, 미션 3개는 조작한 뒤에 자동으로 판정돼요. 주소 끝에 #sled, #drone, #fountain, #bowl을 붙이면 그 사업장이 바로 열려요.</p>'
             + B.says([('doc', 'front', '마지막 장은 실습입니다. 정답은 계산이 판정해요. 사업장마다 미션 세 개씩, 모두 열두 개!'), ('moa', 'cheer', '네 곳 다 운영해 볼래요!')]) + '</div></header>')
    o.append('<section class="level" style="padding-top:24px"><div class="wrap" id="sim"></div></section>')
    o.append('''<section class="level" id="wrap"><div class="wrap"><h2>마무리 — 네 사업장이 함께 묻는 질문</h2>
<p>네 사업장은 모두 「숫자를 믿기 전에, 그 숫자를 만든 규칙을 확인하라」는 같은 질문을 던져요. 눈썰매장에서는 걸음 크기(학습률)가 지형의 휨에 맞는지, 드론 배송 센터에서는 주소의 약속(원기둥·구면 좌표)을 제대로 바꿨는지, 분수 공원에서는 「빠르기」와 「발산·회전」을 구별했는지, 그릇 공장에서는 대각선만이 아니라 헤시안 전체를 봤는지가 결과를 갈랐어요. 이것이 이 시리즈가 말하는 「AI 결과를 판단하는 힘」이에요.</p>
<div class="lim"><b>모형의 한계</b> — 사업장의 숫자(지형, 배송 주소, 펌프 세기, 그릇 모양)는 모두 교육용 예시값이에요. 실제 스키장 설계·드론 항법·분수 설계·제조에는 훨씬 많은 조건이 붙어요. 이 페이지의 결과는 경영·투자 권고가 아닙니다.</div>
</div></section>''')
    o.append(B.footer_html(('../17_final_review.html', '17 종합 — 기말 쪽지시험과 졸업 발표'), ('../index.html', '오리엔테이션으로'), ''))
    o.append('<script src="../assets/sprites.js"></script><script src="../assets/widgets.js"></script><script src="../assets/lab.js"></script><script src="../assets/practice.js"></script></body></html>')
    os.makedirs(os.path.join(B.ROOT, 'practice'), exist_ok=True)
    open(os.path.join(B.ROOT, 'practice', 'index.html'), 'w', encoding='utf-8').write('\n'.join(o))
    print('built practice')
