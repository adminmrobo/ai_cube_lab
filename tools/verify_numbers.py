#!/usr/bin/env python3
"""본문 「숫자로 한 번 해 보기」·퀴즈·조교 대결의 주요 숫자 검산."""
import math
ok = []
def chk(name, got, want, tol=0.01):
    assert abs(got - want) <= tol, (name, got, want); ok.append(name)
# 01장
chk('큐브 대각선 √48', math.sqrt(48), 6.93); chk('(3,4,0) 거리', math.hypot(3, 4, 0), 5); chk('(1,2,2) 거리', math.hypot(1, 2, 2), 3)
chk('민수-도윤', math.dist((3.2, 1.4, 2.0), (2.8, 1.8, 2.4)), 0.69); chk('민수-지아', math.dist((3.2, 1.4, 2.0), (1.0, 3.5, 1.2)), 3.14)
chk('정육면체 방 √12', math.sqrt(12), 3.46)
# 02장
chk('(6,8) 길이', math.hypot(6, 8), 10); chk('바람 (6,-8)', math.hypot(6, -8), 10)
# 03장
A = [[2, 1], [0, 3]]; v = [1, 2]; chk('Av 1행', A[0][0]*v[0]+A[0][1]*v[1], 4); chk('Av 2행', A[1][0]*v[0]+A[1][1]*v[1], 6)
AB = [[1*1+1*1, 1*0+1*1], [0*1+1*1, 0*0+1*1]]; BA = [[1*1+0*0, 1*1+0*1], [1*1+1*0, 1*1+1*1]]; assert AB == [[2, 1], [1, 1]] and BA == [[1, 1], [1, 2]]; ok.append('AB≠BA')
# 04·05장
chk('cos60 s=2', 2*math.cos(math.radians(60)), 1); chk('sin60 s=2', 2*math.sin(math.radians(60)), 1.73)
x, y, z = 2*math.sin(math.radians(60)), 0, 2*math.cos(math.radians(60)); chk('구면 (2,60,0) x', x, 1.73); chk('구면 z', z, 1)
# 06장
chk('x²/4+y²/9+z² 최장 지름', 2*3, 6)
# 07장
chk('가우스 (1,0)', math.exp(-1), 0.37); chk('가우스 (2,0)', math.exp(-4), 0.018, 0.001); chk('모래시계 z=1 반지름', math.sqrt(2), 1.41); chk('두 그릇 z=2', math.sqrt(3), 1.73)
# 08장
f = lambda x, y: x*x+3*x*y+y*y; chk('8장 검산', (f(1.01, 2)-f(1, 2))/0.01, 8.01); chk('f(1,2)', f(1, 2), 11)
# 09장
chk('|∇f| √20', math.sqrt(20), 4.472, 0.001); chk('45도 기울기', (2+4)*math.cos(math.radians(45)), 4.24); chk('∇f 각도', math.degrees(math.atan2(4, 2)), 63.43)
chk('3차원 ∇T 길이', math.sqrt(1+4+0.25), 2.29)
# 10장
chk('발산 (-1.2)^10', (-1.2)**10, 6.19); X = [1, 2, 3, 4, 5]; Y = [2.1, 3.9, 6.2, 7.8, 10.1]
chk('최적 w', sum(a*b for a, b in zip(X, Y))/sum(a*a for a in X), 2.004, 0.001); chk('dL/dw at 0.2', sum(2*(0.2*a-b)*a for a, b in zip(X, Y))/5, -39.68)
chk('η 한계 2/22', 2/22, 0.091, 0.001)
w = 0.2
for _ in range(10): w -= 0.02*sum(2*(w*a-b)*a for a, b in zip(X, Y))/5
chk('10걸음 뒤 w', w, 2.0, 0.01)
# 11장
F = lambda x, y: (x+0.3*y*y, y-0.3*x*x); J = [[1, 0.48], [-0.6, 1]]
for d, want in [(0.3, 0.038), (0.15, 0.0095)]:
    p = F(1+d, 0.8+d); pr = (F(1, 0.8)[0]+J[0][0]*d+J[0][1]*d, F(1, 0.8)[1]+J[1][0]*d+J[1][1]*d); chk('선형 근사 오차 %.2f' % d, math.dist(p, pr), want, 0.001)
chk('det J bend', 1*1-0.48*(-0.6), 1.288, 0.001); chk('연쇄 x=0.5', 0.5*(2*3*0.5)*3, 4.5)
# 12·13장
chk('(3x,-y) 발산', 3-1, 2)
# 14장
chk('GD 걸음 수', math.ceil(math.log(0.01/3)/math.log(0.8)), 26, 0)
x = -1.0; seq = []
for _ in range(3): x = x-(x**3-1)/(3*x*x); seq.append(x)
chk('뉴턴 1', seq[0], -0.333); chk('뉴턴 2', seq[1], 2.78); chk('뉴턴 3', seq[2], 1.90)
# 15장
chk('열 한 걸음', 9+0.25*(0+0-18), 4.5); chk('경계 안쪽', 9+9+9+1-36, -8, 0); chk('경계 바깥', 1+1+1+9-4, 8, 0)
# 16장
chk('호 길이 s=3', 3*math.radians(20), 1.047); chk('극 근처', 2*math.sin(math.radians(10))*math.radians(20), 0.121)
print('검산 통과', len(ok), '개')
