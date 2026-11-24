# 시리즈 공용 데이터
SERIES = '큐브 교실 — AI를 위한 좌표와 벡터 미분'
SITE = 'https://adminmrobo.github.io/ai_cube_lab/'
AUTHOR = {'name': '안상선', 'en': 'Ahn Sangsun', 'site': 'https://adminmrobo.github.io/who_am_i/who_am_i.html', 'org': '(주)M-Robo 대표'}

# who: (이름, 이 시리즈의 자리, 기본 표정, 한 줄 소개)
PEOPLE = {
    'doc': ('박사', '선생님', 'front', '목소리는 크지만 판단은 계산대로. 막히는 곳에서 꼭 멈춰 줍니다.'),
    'fly': ('초파리 연구원', '조교 (의심 담당)', 'magnify', '작지만 날카롭다. "정말 그래?" 하고 반례와 검산을 들고 옵니다.'),
    'robo': ('주판봇', '조교 (확신 담당)', 'calc', '공식과 빠른 계산을 좋아한다. 가끔 너무 빨리 확신합니다.'),
    'sia': ('인턴 시아', '수강생 · 1조', 'smile', '조용하고 꼼꼼한 정리 담당. 표와 그림으로 정리하는 걸 좋아해요.'),
    'moa': ('인턴 모아', '수강생 · 2조', 'smile', '상냥하고 잘 웃는다. 발표와 응원 목소리가 제일 커요.'),
    'asst': ('조수 하루', '수강생 · 1조', 'smile', '수식이 나오면 손을 번쩍 드는 질문 담당. 처음 오신 분의 눈높이.'),
    'x1': ('미공개 X1', '수강생 · 1조', 'e13', '정체는 비밀. 짧고 엉뚱한 질문을 던진다.'),
    'x2': ('미공개 X2', '수강생 · 2조', 'e13', '정체는 비밀. 조용히 그림을 그려 온다.'),
    'x3': ('미공개 X3', '수강생 · 2조', 'e13', '정체는 비밀. 숫자 세기와 손계산을 좋아한다.'),
}

CHAPTERS = [('ch%02d' % i, None) for i in range(1, 18)]

_V = {'title': True, 'author': True, 'year': True, 'doi': False, 'pages': False}
REFS = {
    'src_gjh': {'type': 'graphic', 'title': 'Gradient, Jacobian and Hessian — First and second derivatives for functions of several variables (인포그래픽)', 'author': [{'literal': '작성자 미상 (사용자 제공 자료)'}],
                'year': 2026, 'role': 'primary', 'verified': {'title': True, 'author': False, 'year': False},
                'short': '원자료 ① 그래디언트·야코비안·헤시안 인포그래픽 (사용자 제공, 출처 확인 필요)', 'use': '08~11장, 14장의 개념 목록과 응용(최적화·역전파·뉴턴 방법)'},
    'src_del': {'type': 'graphic', 'title': 'The Del Operator — ∇ gives the four central operations of vector calculus (인포그래픽)', 'author': [{'literal': '작성자 미상 (사용자 제공 자료)'}],
                'year': 2026, 'role': 'primary', 'verified': {'title': True, 'author': False, 'year': False},
                'short': '원자료 ② 델 연산자 인포그래픽 (사용자 제공, 출처 확인 필요)', 'use': '09장, 12~15장의 그래디언트·발산·회전·라플라시안'},
    'src_coord': {'type': 'graphic', 'title': 'Vector Derivatives — Same operators, different coordinates (인포그래픽)', 'author': [{'literal': '작성자 미상 (사용자 제공 자료)'}],
                  'year': 2026, 'role': 'primary', 'verified': {'title': True, 'author': False, 'year': False},
                  'short': '원자료 ③ 세 좌표계의 벡터 미분 공식표 (사용자 제공, 출처 확인 필요)', 'use': '01·04·05장의 좌표계, 16장의 척도 인자와 공식'},
    'src_surf': {'type': 'graphic', 'title': '3차원 곡면 도감 (Ellipsoid, Sphere, Elliptic Paraboloid 외 11종 인포그래픽)', 'author': [{'literal': '작성자 미상 (사용자 제공 자료)'}],
                 'year': 2026, 'role': 'primary', 'verified': {'title': True, 'author': False, 'year': False},
                 'short': '원자료 ④ 곡면 11종 도감 (사용자 제공, 출처 확인 필요)', 'use': '06~07장의 곡면 식과 모양'},
    'griffiths2017': {'type': 'book', 'title': 'Introduction to Electrodynamics (4th ed.)', 'author': [{'family': 'Griffiths', 'given': 'David J.'}], 'year': 2017, 'publisher': 'Cambridge University Press',
                      'role': 'background', 'verified': dict(_V), 'short': 'Griffiths (2017) Introduction to Electrodynamics', 'use': '델 연산자, 원기둥·구면 좌표의 벡터 미분 공식(1장)'},
    'stewart2015': {'type': 'book', 'title': 'Calculus: Early Transcendentals (8th ed.)', 'author': [{'family': 'Stewart', 'given': 'James'}], 'year': 2015, 'publisher': 'Cengage Learning',
                    'role': 'background', 'verified': dict(_V), 'short': 'Stewart (2015) Calculus', 'use': '3차원 좌표, 이차곡면, 편미분, 방향 미분, 2계 도함수 판정'},
    'strang2016': {'type': 'book', 'title': 'Introduction to Linear Algebra (5th ed.)', 'author': [{'family': 'Strang', 'given': 'Gilbert'}], 'year': 2016, 'publisher': 'Wellesley-Cambridge Press',
                   'role': 'background', 'verified': dict(_V), 'short': 'Strang (2016) Introduction to Linear Algebra', 'use': '벡터, 행렬 × 벡터, 행렬식(넓이 배율), 고유값'},
    'goodfellow2016': {'type': 'book', 'title': 'Deep Learning', 'author': [{'family': 'Goodfellow', 'given': 'Ian'}, {'family': 'Bengio', 'given': 'Yoshua'}, {'family': 'Courville', 'given': 'Aaron'}], 'year': 2016, 'publisher': 'MIT Press',
                       'role': 'background', 'verified': dict(_V), 'short': 'Goodfellow, Bengio & Courville (2016) Deep Learning', 'use': '경사 하강법, 야코비안·헤시안(4장), 역전파(6장)'},
    'rumelhart1986': {'type': 'article-journal', 'title': 'Learning representations by back-propagating errors', 'author': [{'family': 'Rumelhart', 'given': 'David E.'}, {'family': 'Hinton', 'given': 'Geoffrey E.'}, {'family': 'Williams', 'given': 'Ronald J.'}],
                      'year': 1986, 'container': 'Nature', 'volume': '323', 'pages': '533-536', 'role': 'background', 'verified': dict(_V), 'short': 'Rumelhart, Hinton & Williams (1986)', 'use': '역전파(연쇄 법칙으로 기울기 전달)'},
    'nocedal2006': {'type': 'book', 'title': 'Numerical Optimization (2nd ed.)', 'author': [{'family': 'Nocedal', 'given': 'Jorge'}, {'family': 'Wright', 'given': 'Stephen J.'}], 'year': 2006, 'publisher': 'Springer',
                    'role': 'background', 'verified': dict(_V), 'short': 'Nocedal & Wright (2006) Numerical Optimization', 'use': '뉴턴 방법, 학습률(걸음 크기)과 수렴'},
    'gonzalez2018': {'type': 'book', 'title': 'Digital Image Processing (4th ed.)', 'author': [{'family': 'Gonzalez', 'given': 'Rafael C.'}, {'family': 'Woods', 'given': 'Richard E.'}], 'year': 2018, 'publisher': 'Pearson',
                     'role': 'background', 'verified': dict(_V), 'short': 'Gonzalez & Woods (2018) Digital Image Processing', 'use': '라플라시안 필터와 경계 찾기'},
}
