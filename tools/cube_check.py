import itertools
FACES='URFDLB'
N={'U':(0,1,0),'R':(1,0,0),'F':(0,0,1),'D':(0,-1,0),'L':(-1,0,0),'B':(0,0,-1)}
RT={'U':(1,0,0),'R':(0,0,-1),'F':(1,0,0),'D':(1,0,0),'L':(0,0,1),'B':(-1,0,0)}
DN={'U':(0,0,1),'R':(0,-1,0),'F':(0,-1,0),'D':(0,0,-1),'L':(0,-1,0),'B':(0,-1,0)}
def add(*v): return tuple(sum(x) for x in zip(*v))
def mul(k,v): return tuple(k*x for x in v)
ST=[]
for f in FACES:
    for i in range(3):
        for j in range(3):
            ST.append((add(N[f],mul(j-1,RT[f]),mul(i-1,DN[f])),N[f]))
IDX={s:k for k,s in enumerate(ST)}
def rot(v,axis,s):  # rotate +90*s about axis (right-hand) ; axis unit
    x,y,z=v
    ax=[i for i in range(3) if axis[i]][0]; sg=axis[ax]*s
    if ax==0: r=(x,-z,y)
    elif ax==1: r=(z,y,-x)
    else: r=(-y,x,z)
    if sg<0: # rotate -90 = three times +90
        r=v
        for _ in range(3):
            x,y,z=r
            r=(x,-z,y) if ax==0 else (z,y,-x) if ax==1 else (-y,x,z)
    return r
def basemove(f):
    n=N[f]; perm=list(range(54))  # new[dest]=old[src]: sticker at src moves to dest
    p=[None]*54
    for k,(pos,nor) in enumerate(ST):
        if sum(a*b for a,b in zip(pos,n))==1:
            np_=rot(pos,n,-1); nn=rot(nor,n,-1); d=IDX[(np_,nn)]
        else: d=k
        p[k]=d  # sticker k goes to d
    return p
M={}
for f in FACES:
    p=basemove(f)
    M[f]=p
def compose(a,b): # first a then b ; maps sticker index -> new location
    return [b[a[i]] for i in range(54)]
for f in FACES:
    M[f+"2"]=compose(M[f],M[f]); M[f+"'"]=compose(M[f+"2"],M[f])
ID=list(range(54))
def seq(s):
    p=ID
    for t in s.split():
        p=compose(p,M[t])
    return p
def order(p):
    q=p;k=1
    while q!=ID: q=compose(q,p);k+=1
    return k
if __name__=='__main__':
    print('order R',order(M['R']),'RU',order(seq('R U')),'RUR\'U\'',order(seq("R U R' U'")),'sexy x6 id', seq("R U R' U' "*6)==ID)
    print('RU==UR',seq('R U')==seq('U R'))
    # BFS counts by state (sticker colors) depth<=4
    def state(p):
        s=[None]*54
        for i in range(54): s[p[i]]=i//9
        return tuple(s)
    moves=[f+m for f in FACES for m in ['',"'",'2']]
    seen={state(ID)};front=[ID];print(0,1)
    for d in range(1,5):
        nf=[]
        for p in front:
            for m in moves:
                q=compose(p,M[m]);s=state(q)
                if s not in seen: seen.add(s);nf.append(q)
        front=nf;print(d,len(nf))
    from math import factorial as F
    G=F(8)*3**7*F(12)*2**11//2
    print(G, G*12, 2048*1082565*29400*663552, 2048*1082565, 29400*663552, F(8)*F(8)*F(4)//2, 2**11*3**7*495)
