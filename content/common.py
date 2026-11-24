# 시리즈 공용 데이터
SERIES = '큐브 교실 — 루빅스 큐브로 배우는 군·탐색·AI'
SHORT = '큐브 교실'
SITE = 'https://adminmrobo.github.io/ai_cube_lab/'
AUTHOR = {'name': '안상선', 'en': 'Ahn Sangsun', 'site': 'https://adminmrobo.github.io/who_am_i/who_am_i.html', 'org': '(주)M-Robo 대표'}

# who: (이름, 이 시리즈의 자리, 기본 표정, 한 줄 소개)
PEOPLE = {
    'doc': ('박사', '선생님', 'front', '목소리는 크지만 판단은 계산대로. 막히는 곳에서 꼭 멈춰 줍니다.'),
    'fly': ('초파리 연구원', '조교 (의심 담당)', 'magnify', '작지만 날카롭다. "정말 그래?" 하고 반례를 찾아옵니다.'),
    'robo': ('주판봇', '조교 (확신 담당)', 'calc', '큰 숫자와 빠른 계산을 좋아한다. 가끔 너무 빨리 확신합니다.'),
    'sia': ('인턴 시아', '수강생 · 1조', 'e13', '조용하고 꼼꼼한 정리 담당. 큐브는 천천히, 정확하게.'),
    'moa': ('인턴 모아', '수강생 · 2조', 'e13', '상냥하고 잘 웃는다. 발표와 응원 목소리가 제일 크다.'),
    'asst': ('조수 하루', '수강생 · 1조', 'e13', '수식이 나오면 손을 번쩍 드는 질문 담당. 처음 오신 분의 눈높이.'),
    'x1': ('미공개 X1', '수강생 · 1조', 'e13', '정체는 비밀. 짧고 엉뚱한 질문을 던진다.'),
    'x2': ('미공개 X2', '수강생 · 2조', 'e13', '정체는 비밀. 조용히 그림을 그려 온다.'),
    'x3': ('미공개 X3', '수강생 · 2조', 'e13', '정체는 비밀. 숫자 세기를 좋아한다.'),
}
GROUP1 = ('1조 「꼭짓점조」', ['sia', 'asst', 'x1'], '시아 · 하루 · X1')
GROUP2 = ('2조 「모서리조」', ['moa', 'x2', 'x3'], '모아 · X2 · X3')

# (콘텐츠 파일, 슬러그)
CHAPTERS = [('ch%02d' % i, None) for i in range(1, 16)]

_V = {'title': True, 'author': True, 'year': True, 'doi': False, 'pages': False}
REFS = {
    'src_infographics': {'type': 'graphic', 'title': '루빅스 큐브 인포그래픽 20장 (The Dual Nature of the Rubik\'s Cube 외)', 'author': [{'literal': '작성자 미상 (사용자 제공 자료)'}],
                         'year': 2026, 'role': 'primary', 'verified': {'title': True, 'author': False, 'year': False},
                         'short': '원자료 인포그래픽 20장 (사용자 제공, 출처 확인 필요)', 'use': '각 장의 개념 목록과 그림 구성의 출발점'},
    'singmaster1981': {'type': 'book', 'title': 'Notes on Rubik\'s Magic Cube', 'author': [{'family': 'Singmaster', 'given': 'David'}], 'year': 1981, 'publisher': 'Enslow',
                       'role': 'background', 'verified': dict(_V), 'short': 'Singmaster (1981) Notes on Rubik\'s Magic Cube', 'use': '돌리기 기호(R, U, F …)와 조각 세기'},
    'joyner2008': {'type': 'book', 'title': 'Adventures in Group Theory: Rubik\'s Cube, Merlin\'s Machine, and Other Mathematical Toys (2nd ed.)', 'author': [{'family': 'Joyner', 'given': 'David'}], 'year': 2008,
                   'publisher': 'Johns Hopkins University Press', 'role': 'background', 'verified': dict(_V), 'short': 'Joyner (2008) Adventures in Group Theory',
                   'use': '큐브 군, 순열, 켤레·교환자, 풀 수 있는 상태의 세 조건(큐브 기본정리)'},
    'hofstadter1981': {'type': 'article-magazine', 'title': 'Metamagical Themas: The Magic Cube\'s cubies are twiddled by cubists and solved by cubemeisters', 'author': [{'family': 'Hofstadter', 'given': 'Douglas R.'}],
                       'year': 1981, 'container': 'Scientific American', 'role': 'background', 'verified': {'title': False, 'author': True, 'year': True},
                       'short': 'Hofstadter (1981) Scientific American 칼럼', 'use': '티슬스웨이트 알고리즘의 첫 대중 소개'},
    'kociemba_web': {'type': 'webpage', 'title': 'The Two-Phase-Algorithm', 'author': [{'family': 'Kociemba', 'given': 'Herbert'}], 'year': 1992, 'publisher': 'kociemba.org',
                     'role': 'background', 'verified': {'title': True, 'author': True, 'year': False}, 'short': 'Kociemba, Two-Phase-Algorithm (kociemba.org)',
                     'use': '2단계 알고리즘의 부분군 H와 단계별 최대 수(12, 18)'},
    'korf1997': {'type': 'paper-conference', 'title': 'Finding Optimal Solutions to Rubik\'s Cube Using Pattern Databases', 'author': [{'family': 'Korf', 'given': 'Richard E.'}], 'year': 1997,
                 'container': 'Proceedings of the 14th National Conference on Artificial Intelligence (AAAI-97)', 'pages': '700-705', 'role': 'background', 'verified': dict(_V),
                 'short': 'Korf (1997) AAAI-97', 'use': 'IDA*, 패턴 데이터베이스, 무작위 큐브 10개의 최적 해답'},
    'kunkle2007': {'type': 'paper-conference', 'title': 'Twenty-Six Moves Suffice for Rubik\'s Cube', 'author': [{'family': 'Kunkle', 'given': 'Daniel'}, {'family': 'Cooperman', 'given': 'Gene'}], 'year': 2007,
                   'container': 'Proceedings of ISSAC 2007', 'role': 'background', 'verified': dict(_V), 'short': 'Kunkle & Cooperman (2007) ISSAC', 'use': '디스크 기반 병렬 잉여류 계산, 26수'},
    'rokicki2013': {'type': 'article-journal', 'title': 'The Diameter of the Rubik\'s Cube Group Is Twenty', 'author': [{'family': 'Rokicki', 'given': 'Tomas'}, {'family': 'Kociemba', 'given': 'Herbert'}, {'family': 'Davidson', 'given': 'Morley'}, {'family': 'Dethridge', 'given': 'John'}],
                    'year': 2013, 'container': 'SIAM Journal on Discrete Mathematics', 'volume': '27', 'role': 'background', 'verified': {'title': True, 'author': True, 'year': True, 'pages': False},
                    'short': 'Rokicki 외 (2013) SIAM J. Discrete Math.', 'use': '신의 수 20, 잉여류 55,882,296개, 대칭 48'},
    'cube20': {'type': 'webpage', 'title': 'God\'s Number is 20', 'author': [{'literal': 'cube20.org (Rokicki, Kociemba, Davidson, Dethridge)'}], 'year': 2010, 'publisher': 'cube20.org',
               'role': 'background', 'verified': {'title': True, 'author': True, 'year': True}, 'short': 'cube20.org — God\'s Number is 20', 'use': '신의 수 위·아래 경계의 연대표, 슈퍼플립 식, 4분의 1 회전 기준 26'},
    'wiki_optimal': {'type': 'webpage', 'title': 'Optimal solutions for the Rubik\'s Cube', 'author': [{'literal': 'Wikipedia'}], 'year': 2026, 'publisher': 'Wikipedia',
                     'role': 'background', 'verified': {'title': True, 'author': True, 'year': False}, 'short': 'Wikipedia — Optimal solutions for the Rubik\'s Cube', 'use': '무작위 큐브의 최단 거리 분포, 초기 상한(94수 등), 티슬스웨이트 단계별 최대 수'},
    'speedsolving': {'type': 'webpage', 'title': 'Speedsolving.com Wiki (CFOP, OLL, PLL, Roux, ZZ, ZBLL)', 'author': [{'literal': 'Speedsolving.com 사용자 공동 작성'}], 'year': 2026, 'publisher': 'speedsolving.com',
                     'role': 'background', 'verified': {'title': True, 'author': False, 'year': False}, 'short': 'Speedsolving.com Wiki', 'use': '풀이법 단계와 식 묶음의 경우 수(F2L 41, OLL 57, PLL 21, CMLL 42, ZBLL 493)'},
    'czechowski2021': {'type': 'paper-conference', 'title': 'Subgoal Search For Complex Reasoning Tasks', 'author': [{'family': 'Czechowski', 'given': 'Konrad'}, {'literal': '외'}], 'year': 2021,
                       'container': 'Advances in Neural Information Processing Systems 34 (NeurIPS 2021)', 'role': 'background', 'verified': dict(_V), 'short': 'Czechowski 외 (2021) NeurIPS', 'use': 'k-부분 목표 탐색(kSubS)'},
    'agostinelli2019': {'type': 'article-journal', 'title': 'Solving the Rubik\'s cube with deep reinforcement learning and search', 'author': [{'family': 'Agostinelli', 'given': 'Forest'}, {'family': 'McAleer', 'given': 'Stephen'}, {'family': 'Shmakov', 'given': 'Alexander'}, {'family': 'Baldi', 'given': 'Pierre'}],
                        'year': 2019, 'container': 'Nature Machine Intelligence', 'volume': '1', 'role': 'background', 'verified': dict(_V), 'short': 'Agostinelli 외 (2019) Nature Machine Intelligence', 'use': '학습한 거리 추정 + 탐색(DeepCubeA)'},
    'liu2023': {'type': 'paper-conference', 'title': 'Transformers Learn Shortcuts to Automata', 'author': [{'family': 'Liu', 'given': 'Bingbin'}, {'literal': '외'}], 'year': 2023,
                'container': 'International Conference on Learning Representations (ICLR 2023)', 'role': 'background', 'verified': dict(_V), 'short': 'Liu 외 (2023) ICLR', 'use': '트랜스포머가 오토마타의 지름길을 배운다는 결과 (원자료의 주장 범위 확인)'},
}
