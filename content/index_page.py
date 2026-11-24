"""오리엔테이션(목차) 페이지 조립"""
import os, json

FORMAT_NOTE = {
    '첫 강의 + 쪽지시험': '박사의 짧은 강의 뒤 퀴즈로 점검',
    '조별 과제': '1조·2조가 같은 과제를 다른 방법으로 풀어 비교',
    '계산배틀': '조교 둘이 숫자로 승부, 수강생은 손계산으로 검산',
    '1:1 토론': '두 수강생이 입장을 맡아 맞붙고, 조교가 근거를 점검',
    '발표수업': '한 조가 발표하고 다른 조가 질문',
    '조별 토론': '조마다 한 가지 주장을 맡아 토론 후 결론 정리',
    '역할극 수업': '수강생이 곡면·바람개비가 되어 몸으로 보여 주기',
    '찬반 토론': '한 주장을 두고 찬성·반대로 나뉘어 반례로 겨루기',
    '발표 + 질의응답': '조교가 발표하고 수강생이 「왜?」를 질문',
    '쪽지시험 + 졸업 발표': '종합 점검과 한 장 지도 발표',
}

TOPICS = {1: '자리를 정하는 법', 2: '모양을 읽는 법', 3: '기울기를 재는 법', 4: '흐름과 휨을 재는 법'}


def build(B, chs):
    esc, img, says, rich = B.esc, B.img, B.says, B.rich
    B.GLOSS = {'벡터 미분': '여러 변수 함수와 흐름(벡터장)의 기울기·휨·퍼짐·회전을 재는 수학. 그래디언트, 발산, 회전, 라플라시안 등이 있어요.',
               '좌표': '공간의 점을 숫자 몇 개로 부르는 약속. 큐브(직교)·원기둥·구면 좌표가 있어요.'}
    o = [B.head(B.SERIES + ' · 오리엔테이션', '중학생도 따라오는 좌표·벡터·행렬·미분 17장 + 실전 연습장. 박사 선생님과 두 조교, 수강생 6명이 함께하는 연구실 해설 시리즈.')]
    o.append('<nav class="top" aria-label="목차"><a class="logo" href="index.html">큐브 교실</a><a href="#three">3줄 요약</a><a href="#cast">등장인물</a><a href="#pillars">네 기둥</a><a href="#tracks">과정</a><a href="#toc">목차</a><a href="#sources">원자료</a><a href="#how">수업 방식</a><a href="practice/index.html">실전 연습장</a></nav><div id="prog"></div>')
    o.append(B.cover_html('cover_00', '큐브 교실', '오리엔테이션 · 00', 'AI를 위한 좌표와 벡터 미분 — 17장 + 실전 연습장', '큐브 교실 표지 — 박사, 조교 둘, 수강생이 큐브·원기둥·지구본 앞에 모인 강의실',
                          chars=[('doc', 'front'), ('fly', 'magnify'), ('robo', 'smile'), ('moa', 'cheer')], motif=0))
    o.append('''<header class="hero"><div class="wrap"><div class="kicker">연구실 해설 시리즈 · 좌표와 벡터 미분 입문</div><h1>큐브 교실 — AI를 위한 좌표와 벡터 미분</h1>
<p class="q">핵심 질문 — 숫자 세 개로 정한 「자리」에서 출발해, AI가 배우는 「기울기」까지 어떻게 이어질까?</p>
<p>큐브(정육면체)의 모서리에 좌표를 세우는 건 쉬워요. 그런데 그 위에서 그래디언트·야코비안·헤시안·발산·회전·라플라시안 같은 [[벡터 미분]]이 나오면 갑자기 어려워지죠. 이 시리즈는 인포그래픽 네 장에 담긴 개념을, 행렬과 벡터를 처음 배우는 분도 따라오도록 17장으로 나눠 그림을 직접 움직이며 배우게 만든 수업입니다.</p>
<div class="kpis"><div class="kpi g"><b>17장</b><span>한 장에 개념 2~4단계</span></div><div class="kpi m"><b>4기둥</b><span>자리 · 모양 · 기울기 · 흐름과 휨</span></div><div class="kpi a"><b>10가지</b><span>수업 형식 (토론·배틀·발표·역할극…)</span></div><div class="kpi r"><b>4곳</b><span>마지막 장 실전 연습장 사업장</span></div></div>''' + says([('doc', 'front', '안녕하세요, 이 교실의 선생님 박사입니다. 행렬이나 벡터를 처음 배워도 괜찮아요. 우리가 쓰는 건 「숫자 묶음」, 「숫자 표」, 「아주 짧은 구간의 기울기」 세 가지뿐이에요.'),
                                                                                                                                              ('moa', 'cheer', '저희 수강생 6명이 먼저 헤매 볼게요. 같이 가요!')]) + '</div></header>')
    o.append('''<div class="wrap"><div class="three" id="three"><h2>처음 오신 분께 — 이 시리즈를 3줄로</h2><ol>
<li><b>무엇을:</b> 점의 주소(좌표)와 화살표(벡터)·숫자 표(행렬)에서 출발해, 곡면의 모양을 읽고, 기울기(그래디언트·야코비안·헤시안)와 흐름(발산·회전·라플라시안)을 재는 법을 네 기둥으로 배웁니다.</li>
<li><b>왜 중요한가:</b> AI는 데이터를 벡터로, 층을 행렬로 다루고, 그래디언트로 배우고, 야코비안으로 역전파해요. 이 도구들을 알면 AI의 결과를 「판단」할 수 있어요.</li>
<li><b>생활·현장에서는:</b> 드론 배송 위치, 지도 앱의 오르막, 사진 앱의 「선명하게」, 날씨 지도의 바람과 소용돌이가 모두 이 교실의 내용이에요.</li></ol>
<p class="note">각 장은 따로 읽어도 되지만 순서대로 읽으면 가장 편해요. 장마다 20~30분이면 충분합니다. 수식이 나오면 조수 하루가 먼저 손을 들어 질문해 줘요.</p></div></div>''')
    castl = ''.join('<div>%s<div><span class="role">%s</span><b>%s</b><span>%s</span></div></div>' % (img(w, B.PEOPLE[w][2], cls=''), esc(B.PEOPLE[w][1]), esc(B.PEOPLE[w][0]), esc(B.PEOPLE[w][3]))
                    for w in ['doc', 'fly', 'robo', 'sia', 'moa', 'asst', 'x1', 'x2', 'x3'])
    g1 = ''.join(img(w, 'e13', cls='') for w in ['sia', 'asst', 'x1'])
    g2 = ''.join(img(w, 'e13', cls='') for w in ['moa', 'x2', 'x3'])
    o.append(f'''<section class="level" id="cast"><div class="wrap"><h2>등장인물 — 선생님 1명, 조교 2명, 수강생 6명</h2><div class="cast">{castl}</div>
<div class="groups"><div>{g1} <b>1조 「큐브조」</b> 시아(인턴1) · 하루 · X1</div><div>{g2} <b>2조 「지구본조」</b> 모아(인턴2) · X2 · X3</div></div>
<p class="note">조 이름은 원자료 공식표의 첫 기둥(큐브 = 직교 좌표)과 마지막 기둥(지구본 = 구면 좌표)에서 따왔어요.</p></div></section>''')
    pill = []
    for p in (1, 2, 3, 4):
        items = ''.join('<li><a href="%s.html">%02d %s</a></li>' % (c['slug'], c['no'], esc(c['title'])) for c in chs if c.get('pillar') == p)
        pill.append('<div><b>기둥 %d · %s</b><ul>%s</ul></div>' % (p, TOPICS[p], items))
    o.append('''<section class="level" id="pillars"><div class="wrap"><h2>네 기둥 — 이 시리즈의 큰 그림</h2>
<p>앞 기둥이 다음 기둥의 바탕이 되도록 쌓았어요. 자리(좌표)를 정해야 모양(곡면)을 적을 수 있고, 모양이 있어야 기울기를 잴 수 있고, 기울기를 화살표 밭에 쓰면 흐름과 휨이 돼요.</p>
<div class="steps">''' + ''.join(pill) + '''</div>
<div class="panel"><div class="ptitle">네 기둥 카드 — 눌러서 한 줄 요약 보기</div><div data-w="cards" data-o="''' + esc(json.dumps({'cards': [
        ['기둥 1 · 자리를 정하는 법', '<p>큐브 좌표(01), 화살표 벡터(02), 숫자 표 행렬(03), 회전목마 원기둥 좌표(04), 지구본 구면 좌표(05). 「같은 점의 여러 이름」을 배워요.</p>'],
        ['기둥 2 · 모양을 읽는 법', '<p>공·럭비공·그릇(06)과 말안장·모래시계·도넛·종(07). 식만 보고 모양을 그리고, 「기울기 0 ≠ 바닥」 함정을 만나요.</p>'],
        ['기둥 3 · 기울기를 재는 법', '<p>편미분(08), 그래디언트(09), 경사 하강(10), 야코비안과 역전파(11). AI가 배우는 방법의 한가운데예요.</p>'],
        ['기둥 4 · 흐름과 휨을 재는 법', '<p>발산(12), 회전(13), 헤시안(14), 라플라시안(15), 좌표가 바뀌면 공식도 바뀐다(16). 17장에서 한 장 지도로 묶어요.</p>']]}, ensure_ascii=False)) + '''"></div></div>
</div></section>''')
    cards = ''.join('<a href="%s.html"><span class="n">%02d · %s</span><b>%s</b><span>%s</span><span class="fmt">%s</span></a>' % (
        c['slug'], c['no'], (('기둥 %d' % c['pillar']) if c.get('pillar') else '종합') + ' · ' + B.STARS[B.LEVEL[c['no']]].split(' ')[0] + ' · 약 %d분' % B.MINUTES[c['no']] + (' <span class="track basic">기본</span>' if c['no'] in B.BASIC else ' <span class="track adv">심화</span>'), esc(c['title']), esc(c['q']), esc(c['format'][0])) for c in chs)
    cards += '<a href="practice/index.html"><span class="n">마지막 장</span><b>실전 연습장 — 큐브 교실 사업장 시뮬레이터</b><span>눈썰매장, 드론 배송 센터, 분수 공원, 그릇 공장을 직접 운영하며 배운 것을 써 봐요.</span><span class="fmt">시뮬레이터</span></a>'
    bas = ' → '.join('<a href="%s.html">%02d</a>' % (c['slug'], c['no']) for c in chs if c['no'] in B.BASIC) + ' → <a href="practice/index.html">실전 연습장</a>'
    adv = ', '.join('<a href="%s.html">%02d %s</a>' % (c['slug'], c['no'], esc(c['title'].split(' — ')[0])) for c in chs if c['no'] not in B.BASIC)
    o.append(f'''<section class="level" id="tracks"><div class="wrap"><h2>두 갈래 과정 — 어디까지 읽을까</h2>
<div class="steps"><div><b class="n">1</b><b>기본 과정 <span class="track basic">기본</span></b><p>행렬·벡터가 처음인 분은 이 순서만 따라가도 실전 연습장까지 갈 수 있어요.</p><p>{bas}</p></div>
<div><b class="n">2</b><b>심화 과정 <span class="track adv">심화</span></b><p>기본 과정을 마친 뒤 도전하세요. 대학 1~2학년 내용을 그림으로 맛보는 장이에요.</p><p>{adv}</p></div>
<div><b class="n">3</b><b>심화 단계 접기</b><p>어려운 장의 마지막 단계는 「심화」로 접어 두었어요. 펼치지 않아도 다음 장을 읽을 수 있어요. 장마다 「용어 별명 카드」로 어려운 이름을 먼저 익히세요.</p></div></div></div></section>''')
    o.append(f'<section class="level" id="toc"><div class="wrap"><h2>목차 — 17장 + 실전 연습장</h2><div class="toc">{cards}</div></div></section>')
    srcs = [(1, '① 그래디언트·야코비안·헤시안', '08~11장, 14장'), (2, '② 델 연산자 (그래디언트·발산·회전·라플라시안)', '09장, 12~15장'), (3, '③ 같은 연산자, 다른 좌표 (공식표)', '01·04·05장, 16장'), (4, '④ 곡면 11종 도감', '06~07장')]
    srcl = ''.join('<details><summary>%s — %s</summary><img loading="lazy" src="img/source/src%02d.webp" width="%d" height="%d" alt="원자료 인포그래픽 %s"></details>' % (esc(t), esc(u), n, B.SRCDIM[n][0], B.SRCDIM[n][1], esc(t)) for n, t, u in srcs)
    o.append(f'''<section class="level" id="sources"><div class="wrap"><h2>원자료 — 인포그래픽 네 장</h2>
<p>이 시리즈는 아래 영어 인포그래픽 네 장에서 출발했어요(작성자 확인 필요). 원자료와 다른 곳은 각 단계의 「원자료 인포그래픽 보기」 상자에 「원자료의 A를 이 페이지에서는 B로 바꿉니다」 형식으로 적었어요.</p>{srcl}</div></section>''')
    rows = ''.join('<tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (esc(k), esc(v), ', '.join('%02d' % c['no'] for c in chs if c['format'][0] == k)) for k, v in FORMAT_NOTE.items())
    o.append(f'''<section class="level" id="how"><div class="wrap"><h2>수업 방식 — 장마다 다른 수업</h2>
<div class="tw"><table class="tb"><thead><tr><th>형식</th><th>어떻게 하나</th><th>나오는 장</th></tr></thead><tbody>{rows}</tbody></table></div>
<h3>한 장의 흐름</h3><div class="steps"><div><b class="n">1</b><b>3줄 요약과 수업 소개</b><p>무엇을·왜·어디에 쓰는지 먼저 봐요.</p></div><div><b class="n">2</b><b>단계 2~4개</b><p>박사의 상황 질문 → 왜 이 방법 / 하루의 수식 질문 → 그림 실험 → 풀이 → 퀴즈.</p></div><div><b class="n">3</b><b>AI 판단 · 조교 대결 · 정리</b><p>AI 답의 오류 찾기, 계산으로 가리는 조교 대결, 한눈에 보는 정리표.</p></div></div>
{says([('fly', 'magnify', '원자료 그림에서 바로잡을 곳을 찾으면 「바꾼다」 상자로 표시해 뒀어. 원자료도 의심하면서 읽자고.'), ('robo', 'coin', '계산은 저한테 맡기세요! …물론 조교 대결에서 가끔 틀리지만요.')])}</div></section>''')
    o.append(B.footer_html(None, (chs[0]['slug'] + '.html', '01 ' + chs[0]['title']) if chs else None,
                           '<p class="note">원자료: 사용자가 제공한 인포그래픽 네 장(작성자 확인 필요). 이 시리즈의 숫자 예시는 모두 설명용 예시값입니다.</p>'))
    o.append(B.foot_scripts(kg=False))
    open(os.path.join(B.ROOT, 'index.html'), 'w', encoding='utf-8').write('\n'.join(o))
    print('built index')
