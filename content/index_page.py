"""오리엔테이션(목차) 페이지 조립"""
import os, json

FORMAT_NOTE = {
    '첫 강의 + 쪽지시험': '박사의 짧은 강의 뒤 퀴즈로 바로 점검',
    '조별 과제': '1조·2조가 같은 과제를 다른 방법으로 풀어 비교',
    '계산배틀': '조교 둘이 숫자로 승부, 수강생은 손계산으로 검산',
    '1:1 토론': '두 수강생이 서로 다른 편을 맡아 맞붙고, 조교가 근거를 점검',
    '조별 토론': '조마다 한 가지 주장을 맡아 토론 후 결론 정리',
    '역할극 수업': '수강생이 「움직임」이 되어 줄을 서며 직접 실행',
    '발표수업': '한 조가 발표하고 다른 조가 질문',
    '찬반 토론': '찬성 조와 반대 조가 실험 결과로 승부',
    '발표 + 질의응답': '발표 뒤 「누가, 어떻게」를 묻는 질의응답',
    '쪽지시험 + 졸업 발표': '종합 퀴즈와 조별 졸업 문장 발표',
}

TOPICS = {1: '손 — 사람의 풀이법', 2: '대수 — 군으로 보는 큐브', 3: '기계 — 컴퓨터 탐색과 AI'}


def build(B, chs):
    esc, img, says = B.esc, B.img, B.says
    B.GLOSS = {'군': '되돌릴 수 있는 움직임들의 모음이 지키는 네 가지 약속(이어 하기·아무것도 안 하기·되돌리기·묶는 순서). 큐브의 움직임 모음이 대표 예.',
               '신의 수': '어떤 큐브든 가장 똑똑하게 풀 때 필요한 수의 최댓값. 반 바퀴도 한 수로 세면 20.'}
    o = [B.head(B.SERIES + ' · 오리엔테이션', '중학생도 따라오는 루빅스 큐브의 수학 15장 + 실전 연습장. 사람의 풀이법, 군론, 컴퓨터 탐색과 AI를 박사 선생님·두 조교·수강생 6명과 함께.')]
    o.append(f'<nav class="top" aria-label="목차"><a class="logo" href="index.html">{B.SHORT}</a><a href="#three">3줄 요약</a><a href="#cast">등장인물</a><a href="#pillars">세 갈래</a><a href="#tracks">과정</a><a href="#toc">목차</a><a href="#how">수업 방식</a><a href="practice/index.html">실전 연습장</a></nav><div id="prog"></div>')
    o.append(B.cover_html('cover_00', B.SHORT, '오리엔테이션 · 00', '루빅스 큐브로 배우는 군 · 탐색 · AI — 15장 + 실전 연습장', '큐브 교실 표지 — 박사, 조교 둘, 수강생들이 큰 큐브 앞에 모인 강의실'))
    o.append('''<header class="hero"><div class="wrap"><div class="kicker">연구실 해설 시리즈 · 큐브의 수학과 AI 입문</div><h1>큐브 교실 — 루빅스 큐브로 배우는 군·탐색·AI</h1>
<p class="q">핵심 질문 — 손바닥만 한 큐브 하나가, 어떻게 수학과 컴퓨터와 AI를 한꺼번에 가르쳐 줄 수 있을까?</p>
<p>큐브는 쉽지만, 큐브를 「설명하는」 개념은 꽤 어려워요. 경우의 수, [[군]], 잉여류, 그래프의 지름, 탐색 알고리즘, 신경망까지. 이 시리즈는 인포그래픽 20장에 담긴 개념을 15장으로 나눠, 큐브를 직접 돌려 보며 배우게 만든 수업이에요. 목표는 「[[신의 수]]가 왜 20인지」를 처음 오신 분도 설명할 수 있게 되는 것.</p>
<div class="kpis"><div class="kpi g"><b>15장</b><span>한 장에 개념 2~3단계</span></div><div class="kpi m"><b>3갈래</b><span>손 · 대수 · 기계</span></div><div class="kpi a"><b>10가지</b><span>수업 형식 (토론·배틀·발표…)</span></div><div class="kpi r"><b>1곳</b><span>마지막 장 실전 연습장</span></div></div>''' + says([('doc', 'front', '안녕하세요, 이 교실의 선생님 박사입니다. 행렬이나 벡터를 몰라도 괜찮아요. 우리가 쓰는 건 「세기」, 「되돌리기」, 「나누기」 세 가지뿐이에요.'),
                                                                                                                                                    ('moa', 'cheer', '저희 수강생 6명이 먼저 헤매 볼게요. 큐브 하나 들고 같이 가요!')]) + '</div></header>')
    o.append('''<div class="wrap"><div class="three" id="three"><h2>처음 오신 분께 — 이 시리즈를 3줄로</h2><ol>
<li><b>무엇을:</b> 큐브의 상태 수(4.3 × 10¹⁹)에서 출발해, 사람의 풀이법(손), 군으로 보는 큐브(대수), 컴퓨터 탐색과 AI(기계) 세 갈래로 「신의 수 20」까지 갑니다.</li>
<li><b>왜 중요한가:</b> 「상태는 엄청 많고 규칙은 단순한 문제」를 푸는 방법 — 세기, 바뀌지 않는 것 찾기, 나눠서 찾기, 하한으로 자르기 — 은 경로 찾기·일정 짜기·AI 탐색 어디에나 쓰여요.</li>
<li><b>생활·현장에서는:</b> 조립 검사(불변량), 물류 경로(그래프 최단 경로), 추천·계획 AI(부분 목표 탐색)를 이해하는 눈이 생겨요. 그리고 AI가 낸 답을 검증하는 습관도요.</li></ol>
<p class="note">각 장은 독립적으로 읽을 수 있지만 순서대로 읽으면 가장 편해요. 장마다 20~25분이면 충분합니다. 큐브 시뮬레이터가 페이지마다 들어 있어 실물 큐브가 없어도 돼요.</p></div></div>''')
    castl = ''.join('<div>%s<div><span class="role">%s</span><b>%s</b><span>%s</span></div></div>' % (img(w, B.PEOPLE[w][2], cls=''), esc(B.PEOPLE[w][1]), esc(B.PEOPLE[w][0]), esc(B.PEOPLE[w][3]))
                    for w in ['doc', 'fly', 'robo', 'sia', 'moa', 'asst', 'x1', 'x2', 'x3'])
    g1 = ''.join(img(w, 'e13', cls='') for w in B.GROUP1[1])
    g2 = ''.join(img(w, 'e13', cls='') for w in B.GROUP2[1])
    o.append(f'''<section class="level" id="cast"><div class="wrap"><h2>등장인물 — 선생님 1명, 조교 2명, 수강생 6명</h2><div class="cast">{castl}</div>
<div class="groups"><div>{g1} <b>{B.GROUP1[0]}</b> {B.GROUP1[2]}</div><div>{g2} <b>{B.GROUP2[0]}</b> {B.GROUP2[2]}</div></div>
<p class="note">조 이름은 큐브의 두 조각에서 왔어요. 꼭짓점 조각(스티커 3장)과 모서리 조각(스티커 2장)은 서로 자리를 바꾸지 않고 각자의 무리 안에서만 움직여요 — 두 조처럼요.</p></div></section>''')
    pill = []
    for p in (1, 2, 3):
        items = ''.join('<li><a href="%s.html">%02d %s</a></li>' % (c['slug'], c['no'], esc(c['title'])) for c in chs if c.get('pillar') == p)
        pill.append('<div><b>%d부 · %s</b><ul>%s</ul></div>' % (p, TOPICS[p], items))
    o.append('''<section class="level" id="pillars"><div class="wrap"><h2>세 갈래 — 이 시리즈의 큰 그림</h2>
<p>원자료 인포그래픽은 큐브를 「사람의 직관 → 대수의 엔진 → 기계의 계산」 세 갈래로 정리했어요. 이 시리즈도 그 순서를 따르고, 15장에서 세 갈래가 만나는 곳을 정리해요.</p>
<div class="steps">''' + ''.join(pill) + '''</div>
<details><summary>원자료 인포그래픽 보기 (영어 그림)</summary><img loading="lazy" src="img/source/src20.webp" width="1280" height="714" alt="큐브의 두 얼굴 — 세 갈래 개요 인포그래픽"></details>
<div class="panel"><div class="ptitle">큐브를 직접 돌려 보세요 — 시리즈 전체에서 쓰는 시뮬레이터</div><div data-w="cube" data-o="''' + esc(json.dumps({'seq': "R U R' U'", 'presets': [['섹시 무브', "R U R' U'", '02장에서 배우는 4수 식. 「제자리까지 몇 번?」을 눌러 보세요.'], ['꼭짓점 3-순환', "R U R' D R U' R' D'", '07장의 교환자. 조각 3개만 움직여요.'], ['슈퍼플립', "R L U2 F U' D F2 R2 B2 L U2 F' B' U R2 D F2 U R2 U", '13장. 20수가 꼭 필요한 상태예요.']]}, ensure_ascii=False)) + '''"></div></div>
</div></section>''')
    cards = ''.join('<a href="%s.html"><span class="n">%02d · %s</span><b>%s</b><span>%s</span><span class="fmt">%s</span></a>' % (
        c['slug'], c['no'], (('%d부' % c['pillar']) if c.get('pillar') else '종합') + ' · ' + B.STARS[B.LEVEL[c['no']]].split(' ')[0] + ' · 약 %d분' % B.MINUTES[c['no']] + (' <span class="track basic">기본</span>' if c['no'] in B.BASIC else ' <span class="track adv">심화</span>'), esc(c['title']), esc(c['q']), esc(c['format'][0])) for c in chs)
    cards += '<a href="practice/index.html"><span class="n">마지막 장</span><b>실전 연습장 — 큐브 사업장 시뮬레이터</b><span>스피드큐빙 학원, 솔버 공장, 조립 검수소, 길 안내 센터를 직접 운영해 보며 배운 것을 써 봐요.</span><span class="fmt">시뮬레이터</span></a>'
    bas = ' → '.join('<a href="%s.html">%02d</a>' % (c['slug'], c['no']) for c in chs if c['no'] in B.BASIC) + ' → <a href="practice/index.html">실전 연습장</a>'
    adv = ', '.join('<a href="%s.html">%02d %s</a>' % (c['slug'], c['no'], esc(c['title'].split(' — ')[0])) for c in chs if c['no'] not in B.BASIC)
    o.append(f'''<section class="level" id="tracks"><div class="wrap"><h2>두 갈래 과정 — 어디까지 읽을까</h2>
<div class="steps"><div><b class="n">1</b><b>기본 과정 <span class="track basic">기본</span></b><p>처음 오신 분은 이 순서만 따라가도 「신의 수 20」과 실전 연습장까지 갈 수 있어요.</p><p>{bas}</p></div>
<div><b class="n">2</b><b>심화 과정 <span class="track adv">심화</span></b><p>기본 과정을 마친 뒤 도전하세요. 풀이법의 세부, 잉여류, 컴퓨터 알고리즘, AI 연구를 더 깊이 다뤄요.</p><p>{adv}</p></div>
<div><b class="n">3</b><b>심화 단계 접기</b><p>어려운 장의 마지막 단계는 「심화」로 접어 두었어요. 펼치지 않아도 다음 장을 읽을 수 있어요. 장마다 「용어 별명 카드」로 어려운 이름을 먼저 익히세요.</p></div></div></div></section>''')
    o.append(f'<section class="level" id="toc"><div class="wrap"><h2>목차 — 15장 + 실전 연습장</h2><div class="toc">{cards}</div></div></section>')
    rows = ''.join('<tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (esc(k), esc(v), ', '.join('%02d' % c['no'] for c in chs if c['format'][0] == k)) for k, v in FORMAT_NOTE.items())
    o.append(f'''<section class="level" id="how"><div class="wrap"><h2>수업 방식 — 장마다 다른 수업</h2>
<div class="tw"><table class="tb"><thead><tr><th>형식</th><th>어떻게 하나</th><th>나오는 장</th></tr></thead><tbody>{rows}</tbody></table></div>
<h3>한 장의 흐름</h3><div class="steps"><div><b class="n">1</b><b>3줄 요약과 수업 소개</b><p>무엇을·왜·어디에 쓰는지 먼저 봐요.</p></div><div><b class="n">2</b><b>단계 2~3개</b><p>박사의 상황 질문 → 왜 이 방법 / 하루의 수식 질문 → 그림 실험 → 풀이 → 퀴즈.</p></div><div><b class="n">3</b><b>AI 판단 · 조교 대결 · 정리</b><p>AI 답의 오류 찾기, 계산으로 가리는 조교 대결, 한눈에 보는 정리표.</p></div></div>
{says([('fly', 'magnify', '원자료 그림에서 틀린 곳(연도, 숫자, 이름)을 찾으면 「바꾼다」 상자로 표시해 뒀어. 원자료도 의심하면서 읽자고.'), ('robo', 'coin', '계산은 저한테 맡기세요! …물론 조교 대결에서 가끔 틀리지만요.')])}</div></section>''')
    o.append(B.footer_html(None, (chs[0]['slug'] + '.html', '01 ' + chs[0]['title']) if chs else None,
                           '<p class="note">원자료: 사용자가 제공한 루빅스 큐브 인포그래픽 20장(작성자 확인 필요). 이 시리즈의 숫자 예시 중 「예시값」으로 밝힌 것은 설명용이에요.</p>'))
    o.append(B.foot_scripts(kg=False))
    open(os.path.join(B.ROOT, 'index.html'), 'w', encoding='utf-8').write('\n'.join(o))
    print('built index')
