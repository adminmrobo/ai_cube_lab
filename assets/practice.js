/* 실전 연습장: 큐브 교실 사업장 시뮬레이터 (외부 라이브러리 없음, 기록은 현재 탭에만) */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,tx=U.tx,f2=U.f2,arrow=U.arrow,polyline=U.polyline,contour=U.contour;
var root=document.getElementById('sim');if(!root)return;
var SC={};
function kpi(cls,val,label){return '<div class="kpi '+cls+'"><b>'+val+'</b><span>'+label+'</span></div>';}
function sayH(who,mood,text){return '<div class="say" data-who="'+who+'"><img class="who" data-who="'+who+'" data-mood="'+mood+'" alt="" aria-hidden="true"><div><b class="name">'+Cast.names[who]+'</b><p>'+text+'</p></div></div>';}
function grp(title,cls,inner){return '<div class="cgrp '+cls+'"><div class="ct">'+title+'</div>'+inner+'</div>';}
function btns(id,opts,cur){return '<div class="ctrl" data-k="'+id+'">'+opts.map(function(o){return '<button type="button" class="bt" data-v="'+o[0]+'" aria-pressed="'+(String(o[0])===String(cur))+'">'+o[1]+'</button>';}).join('')+'</div>';}
function rng(id,label,min,max,step,val){return '<div class="ctrl"><span class="glabel">'+label+'</span><input type="range" data-k="'+id+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" aria-label="'+label+'"><span class="val" data-v="'+id+'"></span></div>';}

/* ① 눈썰매장 — 경사 하강과 학습률 */
var TER={round:['둥근 골짜기 (x² + y²)',function(x,y){return x*x+y*y;},function(x,y){return [2*x,2*y];}],long:['길쭉한 골짜기 (x² + 10y²)',function(x,y){return x*x+10*y*y;},function(x,y){return [2*x,20*y];}]};
SC.sled={title:'눈썰매장',ch:'10_gradient_descent.html',chn:'10장 경사 하강',
  st:{terr:'long',eta:0.03,N:30},
  intro:'눈 덮인 골짜기에서 썰매를 바닥까지 안내하는 눈썰매장이에요. 썰매는 매 걸음 「발밑 기울기의 반대쪽 × 걸음 크기 η」만큼 움직여요(경사 하강). 골짜기 모양(초록)은 날씨가 정하고, 걸음 크기와 걸음 수(파랑)는 여러분이 정해요. <b>목표: 높이 0.01 미만(바닥 도착).</b>',
  controls:function(st){return grp('환경 · 골짜기 모양','env',btns('terr',[['long','길쭉한 골짜기'],['round','둥근 골짜기']],st.terr))+grp('내 결정 · 걸음 크기와 걸음 수','dec',rng('eta','걸음 크기 η',0.01,0.12,0.005,st.eta)+rng('N','걸음 수',1,60,1,st.N));},
  calc:function(st){var T=TER[st.terr],p=[-3.5,1.5],path=[p.slice()],div=false;for(var i=0;i<st.N;i++){var g=T[2](p[0],p[1]);p=[p[0]-st.eta*g[0],p[1]-st.eta*g[1]];path.push(p.slice());if(Math.abs(p[0])>1e4||Math.abs(p[1])>1e4){div=true;break;}}
    var h=T[1](p[0],p[1]),h0=T[1](-3.5,1.5),first=-1;for(var k=0;k<path.length;k++){if(T[1](path[k][0],path[k][1])<0.01){first=k;break;}}
    return {path:path,h:h,h0:h0,div:div||h>h0,ok:h<0.01,first:first};},
  scores:function(r,st){return kpi(r.ok?'g':r.div?'r':'a',r.div?'튕겨 나감':f2(r.h,4),'마지막 높이 (목표 0.01 미만)')+kpi(r.first>=0?'g':'a',r.first>=0?r.first+'걸음':'아직','바닥 도착까지 걸음')+kpi(r.div?'r':'g',r.div?'발산':'수렴','썰매 상태')+kpi('a',f2(st.eta,3),'걸음 크기 η');},
  graphs:function(r,st,g1,g2){var T=TER[st.terr],s=svg(g1,320,220,'골짜기 등고선과 썰매 경로'),X=function(v){return 160+v*40;},Y=function(v){return 110-v*40;};
    var lv=[];for(var k=1;k<=12;k++)lv.push(k*k*0.25);contour(s,T[1],-3.9,3.9,-2.7,2.7,X,Y,lv,function(i,n){return U.heat(i/n);},50);
    polyline(s,r.path.map(function(p){return [X(Math.max(-4,Math.min(4,p[0]))),Y(Math.max(-2.7,Math.min(2.7,p[1])))];}),{stroke:C.k,'stroke-width':1.6});
    var L=r.path[r.path.length-1];E('circle',{cx:X(Math.max(-4,Math.min(4,L[0]))),cy:Y(Math.max(-2.7,Math.min(2.7,L[1]))),r:5,fill:C.r},s);E('circle',{cx:X(0),cy:Y(0),r:4,fill:'none',stroke:C.g,'stroke-width':2},s);
    var s2=svg(g2,320,200,'걸음별 높이'),n=r.path.length;tx(s2,8,16,'걸음별 높이 (세로는 높이의 자릿수, 빨강 선 = 목표 0.01)',{'font-size':11,fill:C.mu});
    var Yh=function(h){var lg=Math.log(Math.max(1e-6,h))/Math.LN10;return 190-(lg+6)/8*170;};E('line',{x1:20,y1:Yh(0.01),x2:315,y2:Yh(0.01),stroke:C.r,'stroke-dasharray':'4 3'},s2);
    polyline(s2,r.path.map(function(p,i){return [20+i*(295/Math.max(1,st.N)),Math.max(10,Yh(T[1](p[0],p[1])))];}),{stroke:C.b,'stroke-width':2});},
  talk:function(r,st){return [['doc',r.ok?'judge':'think',r.ok?'바닥 도착! 걸음 크기가 이 골짜기의 휨에 맞았어요.':r.div?'썰매가 튕겨 나갔어요. 가장 가파르게 휜 방향이 걸음 크기의 한계를 정해요.':'아직 내려가는 중이에요. 걸음 크기와 걸음 수를 함께 보세요.'],
    ['asst','report',st.N+'걸음 뒤 높이 '+(r.div?'측정 불가(발산)':f2(r.h,4))+'이에요.'],['fly','magnify',st.terr==='long'?'길쭉한 골짜기는 옆 벽이 10배 가팔라. η가 0.1을 넘으면 어떻게 될까?':'둥근 골짜기에서 잘 된 η가 길쭉한 골짜기에서도 될지 확인해 봐.'],
    ['robo','calc',r.div?'걸음을 크게 하면 빨리 도착할 줄 알았는데…':'걸음을 최대로 키우면 더 빨리 끝나겠죠!']];},
  missions:[{t:'최적 찾기: 길쭉한 골짜기에서 30걸음 이하로 바닥(높이 0.01 미만) 도착',chk:function(st,r,h){if(st.terr==='long'&&r.ok&&st.N<=30){h.longEta=st.eta;return true;}return false;}},
    {t:'함정 관찰: 길쭉한 골짜기에서 걸음 크기를 키워 썰매가 튕겨 나가는(발산) 것 보기',chk:function(st,r){return st.terr==='long'&&r.div;}},
    {t:'조건 바꾸기: 미션 1에서 성공한 걸음 크기 그대로 둥근 골짜기에서도 30걸음 이하로 도착하는지 확인',chk:function(st,r,h){return st.terr==='round'&&h.longEta!=null&&Math.abs(st.eta-h.longEta)<1e-9&&r.ok&&st.N<=30;}}]};

/* ② 드론 배송 센터 — 좌표 바꾸기 */
var CUST={A:{name:'고객 A (원기둥 주소)',addr:'(s, φ, z) = (3, 60°, 2)',xyz:function(){var p=60*Math.PI/180;return [3*Math.cos(p),3*Math.sin(p),2];}},
  B:{name:'고객 B (원기둥 주소)',addr:'(s, φ, z) = (2, 150°, 4)',xyz:function(){var p=150*Math.PI/180;return [2*Math.cos(p),2*Math.sin(p),4];}},
  C:{name:'고객 C (구면 주소)',addr:'(r, θ, φ) = (4, 60°, 210°)',xyz:function(){var t=60*Math.PI/180,p=210*Math.PI/180;return [4*Math.sin(t)*Math.cos(p),4*Math.sin(t)*Math.sin(p),4*Math.cos(t)];}}};
SC.drone={title:'드론 배송 센터',ch:'05_spherical.html',chn:'04장 원기둥 좌표 · 05장 구면 좌표',
  st:{cust:'A',x:1,y:1,z:1},
  intro:'고객은 원기둥 주소나 구면 주소로 주문하는데, 드론은 큐브 주소 (x, y, z)로만 날아요. 고객(초록)은 주문이 정하고, 드론의 목적지(파랑)는 여러분이 바꿔 넣어요. <b>목표: 오차 0.15 이내로 배송.</b>',
  controls:function(st){return grp('환경 · 오늘의 주문','env',btns('cust',[['A','고객 A'],['B','고객 B'],['C','고객 C']],st.cust))+grp('내 결정 · 드론 목적지 (큐브 주소)','dec',rng('x','x',-4,4,0.1,st.x)+rng('y','y',-4,4,0.1,st.y)+rng('z','z',0,4,0.1,st.z));},
  calc:function(st){var t=CUST[st.cust].xyz(),err=Math.hypot(st.x-t[0],st.y-t[1],st.z-t[2]);return {t:t,err:err,ok:err<0.15};},
  scores:function(r,st){return kpi('a',CUST[st.cust].addr,CUST[st.cust].name)+kpi(r.ok?'g':'r',f2(r.err,3),'목적지와 고객 사이 거리 (목표 0.15 미만)')+kpi(r.ok?'g':'r',r.ok?'배송 완료':'헛걸음','판정')+kpi('a','('+f2(st.x,1)+', '+f2(st.y,1)+', '+f2(st.z,1)+')','드론 목적지');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,240,'위에서 본 배송 지도'),X=function(v){return 160+v*32;},Y=function(v){return 120-v*26;};
    for(var k=1;k<=4;k++)E('circle',{cx:X(0),cy:Y(0),r:k*32,fill:'none',stroke:C.rule,transform:'scale(1,1)'},s);E('line',{x1:20,y1:Y(0),x2:300,y2:Y(0),stroke:C.rule},s);E('line',{x1:X(0),y1:10,x2:X(0),y2:230,stroke:C.rule},s);
    tx(s,8,16,'위에서 본 지도 (x, y)',{'font-size':11,fill:C.mu});E('circle',{cx:X(r.t[0]),cy:Y(r.t[1]),r:7,fill:'none',stroke:C.g,'stroke-width':3},s);E('circle',{cx:X(st.x),cy:Y(st.y),r:5,fill:C.b},s);
    var s2=svg(g2,320,200,'높이 비교');tx(s2,8,16,'높이 z 비교 (초록 = 고객, 파랑 = 드론)',{'font-size':11,fill:C.mu});E('rect',{x:90,y:190-r.t[2]*40,width:50,height:r.t[2]*40,fill:'rgba(19,115,58,.35)'},s2);E('rect',{x:180,y:190-st.z*40,width:50,height:st.z*40,fill:'rgba(30,85,200,.35)'},s2);
    tx(s2,92,186,'고객',{'font-size':11});tx(s2,182,186,'드론',{'font-size':11});},
  talk:function(r,st){var c=st.cust;return [['doc',r.ok?'judge':'think',r.ok?'배송 완료! 주소 사전(변환 공식)을 정확히 썼어요.':'아직 고객 집이 아니에요. 고객 주소를 큐브 주소로 바꾸는 공식을 떠올려 보세요.'],
    ['asst','report','고객까지 거리 '+f2(r.err,3)+'이에요.'],['fly','magnify',c==='B'?'φ = 150°면 cos이 음수야. x의 부호를 봐.':c==='C'?'구면 주소는 θ가 북극에서 잰 각이야. z = r·cos θ.':'φ = 60°에서 x = s·cos φ, y = s·sin φ.'],
    ['robo','calc',c==='C'?'구면 주소도 원기둥이랑 똑같이 x = r·cos φ 하면 되죠!':'s가 3이니까 x = 3으로 날아가면 되죠!']];},
  missions:[{t:'최적 찾기: 고객 A(원기둥 주소)에게 오차 0.15 이내로 배송',chk:function(st,r){return st.cust==='A'&&r.ok;}},
    {t:'함정 관찰: 고객 B에게 x를 양수로 두고 보내 크게 빗나가는(거리 1 이상) 것 보기',chk:function(st,r){return st.cust==='B'&&st.x>0&&r.err>1;}},
    {t:'조건 바꾸기: 구면 주소로 주문한 고객 C에게도 오차 0.15 이내로 배송',chk:function(st,r){return st.cust==='C'&&r.ok;}}]};

/* ③ 분수 공원 — 발산과 회전 */
SC.fountain={title:'분수 공원',ch:'12_divergence.html',chn:'12장 발산 · 13장 회전',
  st:{w:0,p:0.5,om:0.5},
  intro:'공원 한가운데 분수의 물 흐름은 v = (바람 + 펌프·x − 노즐·y, 펌프·y + 노즐·x)예요. 바람 세기(초록)는 날씨가 정하고, 펌프 세기와 회전 노즐(파랑)은 여러분이 정해요. 분수 중심의 발산(뿜어 나옴)과 회전(바람개비)이 성적이에요.',
  controls:function(st){return grp('환경 · 바람 세기','env',rng('w','바람',0,2,0.5,st.w))+grp('내 결정 · 펌프와 회전 노즐','dec',rng('p','펌프 세기',0,2,0.25,st.p)+rng('om','회전 노즐',-1.5,1.5,0.25,st.om));},
  calc:function(st){var F=function(x,y){return [st.w+st.p*x-st.om*y,st.p*y+st.om*x];},d=U.divcurl(F,0.3,0.2);return {F:F,div:d.div,curl:d.curl,straight:Math.abs(d.div-2)<1e-6&&Math.abs(d.curl)<1e-6,swirl:Math.abs(d.div-2)<1e-6&&Math.abs(d.curl-2)<1e-6};},
  scores:function(r,st){return kpi(Math.abs(r.div-2)<1e-6?'g':'a',f2(r.div,2),'분수 중심의 발산 (= 2 × 펌프)')+kpi(Math.abs(r.curl)<1e-6?'g':'m',f2(r.curl,2),'회전 (= 2 × 노즐)')+kpi('a',f2(st.w,1),'바람 세기')+kpi(r.straight?'g':r.swirl?'g':'a',r.straight?'곧게 퍼지는 분수':r.swirl?'소용돌이 분수':'설계 중','분수 종류');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,240,'분수 주변 흐름'),X=function(v){return 160+v*55;},Y=function(v){return 120-v*55;},mx=0,G=[];
    for(var a=-2.5;a<=2.5;a+=0.5)for(var b=-1.9;b<=1.9;b+=0.5){var v=r.F(a,b);G.push([a,b,v]);mx=Math.max(mx,Math.hypot(v[0],v[1]));}
    G.forEach(function(q){var L=Math.hypot(q[2][0],q[2][1]);if(L<1e-6)return;var sc=0.42*Math.min(1,L/mx)/L;arrow(s,X(q[0]),Y(q[1]),X(q[0]+q[2][0]*sc),Y(q[1]+q[2][1]*sc),'rgba(30,85,200,.55)',1.3);});
    E('circle',{cx:X(0),cy:Y(0),r:8,fill:'#7fb7d0',stroke:C.k},s);
    var s2=svg(g2,320,200,'발산과 회전 막대'),Yb=function(v){return 110-v*22;};E('line',{x1:20,y1:Yb(0),x2:310,y2:Yb(0),stroke:C.mu},s2);
    [[r.div,'발산',C.r,80],[r.curl,'회전',C.m,200]].forEach(function(q){E('rect',{x:q[3],y:Math.min(Yb(0),Yb(q[0])),width:50,height:Math.abs(q[0])*22,fill:q[2],opacity:.5},s2);tx(s2,q[3]+6,195,q[1]+' '+f2(q[0],2),{'font-size':12});});},
  talk:function(r,st){return [['doc',r.straight||r.swirl?'judge':'think',r.straight?'곧게 퍼지는 분수 완성! 뿜어 나오되 돌지 않아요.':r.swirl?'소용돌이 분수 완성! 뿜어 나오면서 돌아요.':'펌프는 발산을, 노즐은 회전을 맡아요. 따로따로 조절해 보세요.'],
    ['asst','report','발산 '+f2(r.div,2)+', 회전 '+f2(r.curl,2)+'이에요.'],['fly','magnify','바람을 0에서 2로 바꿔 봐. 발산이나 회전이 변해?'],
    ['robo','calc',st.w>0?'바람이 세니까 발산도 커졌겠죠!':'바람만 세게 불면 분수가 더 많이 뿜어 나올 거예요!']];},
  missions:[{t:'최적 찾기: 「곧게 퍼지는 분수」 — 발산 2, 회전 0 만들기',chk:function(st,r){return r.straight;}},
    {t:'함정 관찰: 바람을 0과 2로 모두 바꿔 보며, 발산·회전이 그대로임을 확인 (빠르기 ≠ 발산)',chk:function(st,r,h){return !!(h.w0&&h.w2);}},
    {t:'조건 바꾸기: 노즐을 켜 「소용돌이 분수」(발산 2, 회전 2) 만들기 — 발산은 그대로인지 확인',chk:function(st,r){return r.swirl;}}]};

/* ④ 그릇 공장 — 헤시안으로 모양 판정 */
var ORD={water:['물그릇 (물이 고여야 함)','bowl'],chair:['말안장 의자','saddle'],dome:['돔 지붕 (빗물이 흘러내려야 함)','dome']};
SC.bowl={title:'그릇 공장',ch:'14_hessian.html',chn:'14장 헤시안 · 15장 라플라시안',
  st:{ord:'water',a:2,b:2.5,c:2},
  intro:'곡면 f = ½(ax² + 2bxy + cy²)을 찍어 내는 공장이에요. 헤시안은 [[a, b], [b, c]]. 주문(초록)은 손님이 정하고, a, b, c(파랑)는 여러분이 정해요. 모양은 판정값 ac − b²와 a의 부호로 정해져요.',
  controls:function(st){return grp('환경 · 손님의 주문','env',btns('ord',[['water','물그릇'],['chair','말안장 의자'],['dome','돔 지붕']],st.ord))+grp('내 결정 · 헤시안 [[a, b], [b, c]]','dec',rng('a','a',-3,3,0.5,st.a)+rng('b','b',-3,3,0.5,st.b)+rng('c','c',-3,3,0.5,st.c));},
  calc:function(st){var det=st.a*st.c-st.b*st.b,tr=st.a+st.c,kind=det>0&&st.a>0?'bowl':det>0&&st.a<0?'dome':det<0?'saddle':'flat',m=tr/2,q=Math.sqrt(Math.pow((st.a-st.c)/2,2)+st.b*st.b);
    return {det:det,tr:tr,kind:kind,l1:m+q,l2:m-q,ok:kind===ORD[st.ord][1]};},
  scores:function(r,st){var nm={bowl:'그릇',dome:'돔',saddle:'말안장',flat:'판정 보류'};return kpi(r.det>0?'g':r.det<0?'r':'a',f2(r.det,2),'판정값 ac − b²')+kpi('a',f2(r.tr,1),'라플라시안 a + c')+kpi('a',nm[r.kind],'찍혀 나온 모양')+kpi(r.ok?'g':'r',r.ok?'주문 일치':'반품','판정');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,240,'제품의 등고선'),f=function(x,y){return 0.5*(st.a*x*x+2*st.b*x*y+st.c*y*y);},X=function(v){return 160+v*40;},Y=function(v){return 120-v*40;};
    contour(s,f,-3.9,3.9,-2.9,2.9,X,Y,[-6,-3,-1.5,-0.5,0.5,1.5,3,6],function(i,n){return U.heat(i/(n-1));},50);tx(s,8,16,'위에서 본 등고선 (파랑 낮음, 빨강 높음)',{'font-size':11,fill:C.mu});
    var s2=svg(g2,320,200,'고유값 막대'),Yb=function(v){return 100-v*14;};E('line',{x1:20,y1:Yb(0),x2:310,y2:Yb(0),stroke:C.mu},s2);tx(s2,8,16,'고유값 λ₁, λ₂ (둘 다 + 그릇, 둘 다 − 돔, 섞이면 안장)',{'font-size':11,fill:C.mu});
    [[r.l1,'λ₁',80],[r.l2,'λ₂',200]].forEach(function(q){E('rect',{x:q[2],y:Math.min(Yb(0),Yb(q[0])),width:50,height:Math.abs(q[0])*14,fill:q[0]>=0?C.r:C.b,opacity:.5},s2);tx(s2,q[2]+4,195,q[1]+' = '+f2(q[0],2),{'font-size':12});});},
  talk:function(r,st){return [['doc',r.ok?'judge':'think',r.ok?'주문대로 나왔어요. 판정값과 a의 부호를 정확히 맞췄어요.':'주문과 모양이 달라요. 대각선(a, c)만 보지 말고 b까지 넣어 판정값을 계산해 보세요.'],
    ['asst','report','판정값 '+f2(r.det,2)+', 라플라시안 '+f2(r.tr,1)+'이에요.'],['fly','magnify','a = c = 2로 두고 b를 2.5까지 올려 봐. 그래도 물그릇이야?'],
    ['robo','calc',r.tr>0?'라플라시안이 양수니까 무조건 그릇이죠!':'a랑 c만 보면 모양을 알 수 있어요!']];},
  missions:[{t:'최적 찾기: 물그릇 주문에 맞는 「비스듬한 그릇」(b ≠ 0) 만들기',chk:function(st,r){return st.ord==='water'&&r.ok&&st.b!==0;}},
    {t:'함정 관찰: a > 0, c > 0인데도 말안장이 되어 물그릇 주문이 반품되는 것 보기',chk:function(st,r){return st.ord==='water'&&st.a>0&&st.c>0&&r.kind==='saddle';}},
    {t:'조건 바꾸기: 주문을 돔 지붕으로 바꿔, 같은 판정 규칙(ac − b² > 0)으로 돔 만들기',chk:function(st,r){return st.ord==='dome'&&r.ok;}}]};

var ORDER=['sled','drone','fountain','bowl'],cur=null,touched={},done={},hist={};
var tabs=H('div','ctrl',null,root);tabs.setAttribute('role','tablist');
ORDER.forEach(function(k){var b=H('button','bt',SC[k].title,tabs);b.type='button';b.setAttribute('role','tab');b.dataset.t=k;b.onclick=function(){open(k);};});
var body=H('div',null,null,root);
function open(k){cur=k;[].forEach.call(tabs.children,function(b){b.setAttribute('aria-pressed',b.dataset.t===k);b.setAttribute('aria-selected',b.dataset.t===k);});
  try{history.replaceState(null,'','#'+k);}catch(e){}
  var S=SC[k];body.innerHTML='<h2>'+S.title+'</h2><div class="sitbox">'+S.intro+'</div><div class="simgrid"><div class="simctl">'+S.controls(S.st)+'</div><div class="simout"><div class="kpis"></div><div class="graphs"><div class="g1"></div><div class="g2"></div></div></div></div><div class="talkbox"></div><h3>미션</h3><ol class="missions"></ol><p class="note">배운 곳 다시 보기 → <a href="../'+S.ch+'">'+S.chn+'</a></p>';
  [].forEach.call(body.querySelectorAll('[data-k] button'),function(b){b.onclick=function(){var key=b.parentNode.dataset.k;S.st[key]=b.dataset.v;[].forEach.call(b.parentNode.children,function(x){x.setAttribute('aria-pressed',x===b);});touched[k]=1;update();};});
  [].forEach.call(body.querySelectorAll('input[data-k]'),function(r){r.oninput=function(){S.st[r.dataset.k]=+r.value;touched[k]=1;update();};});
  update();}
function update(){var S=SC[cur],st=S.st,r=S.calc(st);hist[cur]=hist[cur]||{};var h=hist[cur];
  if(cur==='fountain'&&touched[cur]){if(st.w===0)h.w0=1;if(st.w===2)h.w2=1;}
  [].forEach.call(body.querySelectorAll('.val[data-v]'),function(v){var x=st[v.dataset.v];v.textContent=typeof x==='number'?(Math.round(x*1000)/1000):x;});
  body.querySelector('.kpis').innerHTML=S.scores(r,st);var g1=body.querySelector('.g1'),g2=body.querySelector('.g2');g1.innerHTML='';g2.innerHTML='';S.graphs(r,st,g1,g2);
  body.querySelector('.talkbox').innerHTML=S.talk(r,st).map(function(t){return sayH(t[0],t[1],t[2]);}).join('');Cast.fill(body);
  done[cur]=done[cur]||{};var ml=body.querySelector('.missions');ml.innerHTML='';
  S.missions.forEach(function(m,i){var ok=touched[cur]&&m.chk(st,r,h);if(ok)done[cur][i]=1;var li=document.createElement('li');li.innerHTML=(done[cur][i]?'<b style="color:var(--gfp)">통과 ✓</b> ':'<span class="note">도전 중</span> ')+m.t;ml.appendChild(li);});}
window.PRACTICE={open:open,set:function(k,st){if(cur!==k)open(k);Object.assign(SC[k].st,st);touched[k]=1;update();return SC[k].missions.map(function(m,i){return !!done[k][i];});},status:function(k){return SC[k].missions.map(function(m,i){return !!(done[k]||{})[i];});},calc:function(k){return SC[k].calc(SC[k].st);}};
var hh=(location.hash||'').slice(1);open(SC[hh]?hh:'sled');
})();
