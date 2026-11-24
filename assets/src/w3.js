/* 위젯 모음 3: 기둥 4 (발산 · 회전 · 헤시안 · 라플라시안 · 좌표가 바뀌면) */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,ctrl=U.ctrl,btn=U.btn,radio=U.radio,slider=U.slider,out=U.out,tx=U.tx,f2=U.f2,arrow=U.arrow,view=U.view,mesh=U.mesh,axes3=U.axes3,drag=U.drag,polyline=U.polyline,contour=U.contour;

/* 벡터장(흐름) */
var VF={source:['샘 (x, y)',function(x,y){return [x,y];}],sink:['배수구 (−x, −y)',function(x,y){return [-x,-y];}],uniform:['한결같은 바람 (1, 0.5)',function(){return [1,0.5];}],
  vortex:['소용돌이 (−y, x)',function(x,y){return [-y,x];}],shear:['층층 흐름 (y, 0)',function(x,y){return [y,0];}],irrot:['가운데 빼고 도는 흐름 (−y, x)/(x² + y²)',function(x,y){var r=x*x+y*y;return r<1e-6?[0,0]:[-y/r,x/r];}],
  spiral:['소용돌이 샘 (x − y, x + y)',function(x,y){return [x-y,x+y];}]};
U.VF=VF;
function divcurl(F,x,y){var h=1e-4,a=F(x+h,y),b=F(x-h,y),c=F(x,y+h),d=F(x,y-h);return {div:(a[0]-b[0])/(2*h)+(c[1]-d[1])/(2*h),curl:(a[1]-b[1])/(2*h)-(c[0]-d[0])/(2*h),dxx:(a[0]-b[0])/(2*h),dyy:(c[1]-d[1])/(2*h),dyx:(a[1]-b[1])/(2*h),dxy:(c[0]-d[0])/(2*h)};}
U.divcurl=divcurl;
W.field=function(el,o){
  var mode=o.mode||'div',keys=o.keys||['source','sink','uniform','vortex'],st={f:o.f||keys[0],px:o.px!=null?o.px:1,py:o.py!=null?o.py:0.5,side:0.6,ang:0,run:!LAB.reduced},parts=[],R=LAB.rng(11);
  var s=svg(el,560,380,'화살표로 그린 흐름'),c=ctrl(el),c2=ctrl(el),ou;radio(c,'흐름:',keys.map(function(k){return [k,VF[k][0]];}),st.f,function(v){st.f=v;draw();});
  slider(c2,'상자 크기',0.2,1.2,0.1,st.side,function(v){st.side=v;draw();return f2(v,1);});btn(c2,'입자 움직임',function(b){st.run=!st.run;b.setAttribute('aria-pressed',st.run?'true':'false');},st.run);H('span','glabel','그림을 눌러 '+(mode==='div'?'상자':'바람개비')+' 옮기기',c2);ou=out(el);
  var S=60,X=function(v){return 280+v*S;},Y=function(v){return 190-v*S;};for(var i=0;i<140;i++)parts.push([R()*9-4.5,R()*6.2-3.1,R()*3]);
  s.addEventListener('pointerdown',function(e){var r=s.getBoundingClientRect();st.px=((e.clientX-r.left)*560/r.width-280)/S;st.py=-((e.clientY-r.top)*380/r.height-190)/S;draw();});
  var layer;function draw(){s.innerHTML='';var F=VF[st.f][1],mx=0,G=[];for(var a=-4.2;a<=4.2;a+=0.6)for(var b=-2.8;b<=2.8;b+=0.6){var v=F(a,b);G.push([a,b,v]);mx=Math.max(mx,Math.hypot(v[0],v[1]));}
    G.forEach(function(q){var L=Math.hypot(q[2][0],q[2][1]);if(L<1e-6)return;var sc=Math.min(0.5/mx*1.0,0.5/L);sc=0.45*Math.min(1,L/mx)/L;arrow(s,X(q[0]),Y(q[1]),X(q[0]+q[2][0]*sc),Y(q[1]+q[2][1]*sc),'rgba(22,33,43,.45)',1.3);});
    var d=divcurl(F,st.px,st.py),h=st.side/2,x0=st.px-h,x1=st.px+h,y0=st.py-h,y1=st.py+h,n=20,fl={r:0,l:0,t:0,b:0},circ=0;
    for(var k=0;k<n;k++){var t=(k+0.5)/n,yy=y0+t*(y1-y0),xx=x0+t*(x1-x0),ds=st.side/n;fl.r+=F(x1,yy)[0]*ds;fl.l+=-F(x0,yy)[0]*ds;fl.t+=F(xx,y1)[1]*ds;fl.b+=-F(xx,y0)[1]*ds;circ+=F(xx,y0)[0]*ds+F(x1,yy)[1]*ds-F(xx,y1)[0]*ds-F(x0,yy)[1]*ds;}
    var net=fl.r+fl.l+fl.t+fl.b,A=st.side*st.side;
    if(mode==='div'){E('rect',{x:X(x0),y:Y(y1),width:st.side*S,height:st.side*S,fill:d.div>0.05?'rgba(201,48,44,.15)':d.div<-0.05?'rgba(30,85,200,.15)':'rgba(19,115,58,.12)',stroke:C.k,'stroke-width':2},s);
      ou.innerHTML='<p>상자 가운데 ('+f2(st.px,2)+', '+f2(st.py,2)+'), 상자 넓이 '+f2(A,2)+'</p><p>오른쪽 벽으로 나감 '+f2(fl.r,3)+' · 왼쪽 벽 '+f2(fl.l,3)+' · 위쪽 벽 '+f2(fl.t,3)+' · 아래쪽 벽 '+f2(fl.b,3)+' (음수 = 들어옴)</p><p class="'+(d.div>0.05?'r':d.div<-0.05?'b':'g')+'" '+(d.div<-0.05?'style="color:#1e55c8"':'')+'>(나간 양 − 들어온 양) ÷ 넓이 = '+f2(net,3)+' ÷ '+f2(A,2)+' = <b>'+f2(net/A,3)+'</b></p><p class="a">공식 ∇·v = ∂v₁/∂x + ∂v₂/∂y = '+f2(d.dxx,2)+' + '+f2(d.dyy,2)+' = <b>'+f2(d.div,3)+'</b> → '+(d.div>0.05?'샘 (뿜어 나옴)':d.div<-0.05?'배수구 (빨려 들어감)':'들어온 만큼 나감 (발산 0)')+'</p>';}
    else{var cx=X(st.px),cy=Y(st.py),rr=st.side*S/2;layer=E('g',{},s);E('circle',{cx:cx,cy:cy,r:rr,fill:'none',stroke:C.k,'stroke-dasharray':'3 3'},s);
      ou.innerHTML='<p>바람개비 가운데 ('+f2(st.px,2)+', '+f2(st.py,2)+')</p><p>상자 둘레를 시계 반대 방향으로 한 바퀴 돌며 흐름을 더한 값(순환) = '+f2(circ,3)+', ÷ 넓이 '+f2(A,2)+' = <b>'+f2(circ/A,3)+'</b></p><p class="a">공식 (∇×v)의 세로 성분 = ∂v₂/∂x − ∂v₁/∂y = '+f2(d.dyx,2)+' − '+f2(d.dxy,2)+' = <b>'+f2(d.curl,3)+'</b> → '+(d.curl>0.05?'바람개비가 시계 반대 방향으로 돌아요':d.curl<-0.05?'바람개비가 시계 방향으로 돌아요':'바람개비가 돌지 않아요 (회전 0)')+'</p>';}
    var pl=E('g',{},s);parts.forEach(function(p){p.el=E('circle',{cx:X(p[0]),cy:Y(p[1]),r:2.6,fill:C.b,opacity:.7},pl);});draw.d=d;}
  draw();
  LAB.tick(s,function(dt){var F=VF[st.f][1];if(st.run)parts.forEach(function(p){var v=F(p[0],p[1]),L=Math.hypot(v[0],v[1]),k=L>3?3/L:1;p[0]+=v[0]*k*dt*0.6;p[1]+=v[1]*k*dt*0.6;p[2]+=dt;if(Math.abs(p[0])>4.6||Math.abs(p[1])>3.2||p[2]>4||(p[0]*p[0]+p[1]*p[1]<0.01)){p[0]=LAB.rng(Math.random()*1e9|0)()*9-4.5;p[1]=Math.random()*6.2-3.1;p[2]=0;}if(p.el){p.el.setAttribute('cx',X(p[0]));p.el.setAttribute('cy',Y(p[1]));}});
    if(mode==='curl'&&layer&&draw.d){st.ang+=(LAB.reduced?0:draw.d.curl/2*dt);layer.innerHTML='';var cx=X(st.px),cy=Y(st.py),rr=st.side*S/2;for(var k=0;k<4;k++){var a=st.ang+k*Math.PI/2;E('line',{x1:cx,y1:cy,x2:cx+rr*Math.cos(a),y2:cy-rr*Math.sin(a),stroke:[C.r,C.a,C.g,C.m][k],'stroke-width':4,'stroke-linecap':'round'},layer);}E('circle',{cx:cx,cy:cy,r:4,fill:C.k},layer);}});
};

/* 1차원 휨: 2차 미분의 부호 */
W.curv1d=function(el,o){
  var FN={sq:['y = x²',function(x){return x*x;},function(x){return 2*x;},function(){return 2;}],neg:['y = −x²',function(x){return -x*x;},function(x){return -2*x;},function(){return -2;}],cube:['y = x³',function(x){return x*x*x;},function(x){return 3*x*x;},function(x){return 6*x;}]};
  var st={f:'cube',a:1},s=svg(el,560,300,'곡선의 휨'),c=ctrl(el),c2=ctrl(el),ou;radio(c,'함수:',Object.keys(FN).map(function(k){return [k,FN[k][0]];}),st.f,function(v){st.f=v;draw();});slider(c2,'점 a',-1.8,1.8,0.1,st.a,function(v){st.a=v;draw();return f2(v,1);});ou=out(el);
  var X=function(v){return 280+v*120;},Y=function(v){return 150-v*24;};
  function draw(){s.innerHTML='';var F=FN[st.f];E('line',{x1:10,y1:Y(0),x2:550,y2:Y(0),stroke:C.rule},s);
    for(var x=-2.2;x<2.2;x+=0.04){var y1=F[1](x),y2=F[1](x+0.04),k=F[3](x+0.02);if(Math.abs(y1)<6&&Math.abs(y2)<6)E('line',{x1:X(x),y1:Y(y1),x2:X(x+0.04),y2:Y(y2),stroke:k>0.01?C.r:k<-0.01?C.b:C.g,'stroke-width':4},s);}
    var a=st.a,fa=F[1](a),s1=F[2](a),s2=F[3](a);polyline(s,[[X(a-0.8),Y(fa-0.8*s1)],[X(a+0.8),Y(fa+0.8*s1)]],{stroke:C.k,'stroke-width':1.5,'stroke-dasharray':'4 3'});E('circle',{cx:X(a),cy:Y(fa),r:6,fill:C.k},s);
    ou.innerHTML='<p>점 a = '+f2(a,1)+': 기울기 f′(a) = <b>'+f2(s1,2)+'</b>, 기울기의 기울기 f″(a) = <b>'+f2(s2,2)+'</b></p><p class="'+(s2>0.01?'r':s2<-0.01?'b':'g')+'"'+(s2<-0.01?' style="color:#1e55c8"':'')+'>'+(s2>0.01?'빨강: 위로 휨 (그릇처럼, 기울기가 점점 커짐)':s2<-0.01?'파랑: 아래로 휨 (돔처럼, 기울기가 점점 작아짐)':'초록: 휨이 바뀌는 곳 (변곡점)')+'</p>';}
  draw();
};

/* 헤시안: f = ½(ax² + 2bxy + cy²) */
W.hess=function(el,o){
  var st={a:o.a!=null?o.a:2,b:o.b!=null?o.b:0,c:o.c!=null?o.c:1,az:-0.7,el:0.45},mode=o.mode||'hess';
  var s=svg(el,600,360,'헤시안에 따라 바뀌는 곡면'),c=ctrl(el),ou;
  slider(c,'a = ∂²f/∂x²',-3,3,0.5,st.a,function(v){st.a=v;draw();return f2(v,1);});slider(c,'b = ∂²f/∂x∂y',-3,3,0.5,st.b,function(v){st.b=v;draw();return f2(v,1);});slider(c,'c = ∂²f/∂y²',-3,3,0.5,st.c,function(v){st.c=v;draw();return f2(v,1);});
  ou=out(el);drag(s,function(){return [st.az,st.el];},function(a,e){st.az=a;st.el=e;},draw);
  function draw(){s.innerHTML='';var f=function(x,y){return 0.5*(st.a*x*x+2*st.b*x*y+st.c*y*y);},V=view(220,190,62,st.az,st.el);axes3(s,V,1.9);
    mesh(s,V,function(u,v){return [u,v,Math.max(-2.5,Math.min(2.5,f(u,v)/2))];},-1.5,1.5,-1.5,1.5,18,18);
    var X=function(v){return 500+v*30;},Y=function(v){return 180-v*30;};E('rect',{x:410,y:90,width:180,height:180,fill:'#fff',stroke:C.rule},s);tx(s,412,84,'위에서 본 등고선',{'font-size':12,fill:C.mu});
    contour(s,f,-2.9,2.9,-2.9,2.9,X,Y,[-4,-2.5,-1.2,-0.4,0.4,1.2,2.5,4],function(i,n){return U.heat(i/(n-1));},50);
    var det=st.a*st.c-st.b*st.b,tr=st.a+st.c,m=tr/2,q=Math.sqrt(Math.pow((st.a-st.c)/2,2)+st.b*st.b),l1=m+q,l2=m-q;
    var kind=det>0&&st.a>0?['그릇 (가운데가 가장 낮은 점, 극소)','g']:det>0&&st.a<0?['돔 (가운데가 가장 높은 점, 극대)','b']:det<0?['말안장 (안장점)','r']:['판정 보류 (어느 한 방향이 평평함)','a'];
    var h='<p>헤시안 H = [['+f2(st.a,1)+', '+f2(st.b,1)+'], ['+f2(st.b,1)+', '+f2(st.c,1)+']] — 대각선을 기준으로 좌우가 같은 「대칭」 표</p>';
    if(mode==='hess')h+='<p>판정값 det H = ac − b² = '+f2(st.a,1)+'×'+f2(st.c,1)+' − '+f2(st.b,1)+'² = <b>'+f2(det,2)+'</b>, 고유값(가장 많이·적게 휘는 정도) λ₁ = '+f2(l1,2)+', λ₂ = '+f2(l2,2)+'</p><p class="'+kind[1]+'"'+(kind[1]==='b'?' style="color:#1e55c8"':'')+'>모양: <b>'+kind[0]+'</b></p><p class="note">고유값이 둘 다 양수면 그릇, 둘 다 음수면 돔, 부호가 다르면 말안장이에요.</p>';
    else h+='<p class="a">라플라시안 ∇²f = ∂²f/∂x² + ∂²f/∂y² = a + c = '+f2(st.a,1)+' + '+f2(st.c,1)+' = <b>'+f2(tr,1)+'</b> (헤시안의 대각선 합)</p><p>모양: <b>'+kind[0]+'</b></p><p class="note">'+(tr>0&&det<0?'라플라시안이 양수인데도 말안장이에요. 평균으로는 위로 휘었지만 한 방향은 아래로 휘어 있어요.':tr===0?'라플라시안 0: 위로 휜 만큼 아래로 휘어 평균이 0이에요.':'라플라시안은 두 방향 휨의 「합」이에요.')+'</p>';
    ou.innerHTML=h;}
  draw();
};

/* 뉴턴 방법 vs 경사 하강 */
W.newton=function(el,o){
  var FN={quad:['f = (x − 2)² + 1',function(x){return (x-2)*(x-2)+1;},function(x){return 2*(x-2);},function(){return 2;},2],quart:['f = x⁴/4 − x + 1',function(x){return x*x*x*x/4-x+1;},function(x){return x*x*x-1;},function(x){return 3*x*x;},1]};
  var st={f:'quad',g:[],n:[],eta:0.1},s=svg(el,560,300,'경사 하강과 뉴턴 방법의 걸음'),c=ctrl(el),c2=ctrl(el),ou;radio(c,'함수:',Object.keys(FN).map(function(k){return [k,FN[k][0]];}),st.f,function(v){st.f=v;reset();});
  btn(c2,'둘 다 한 걸음',function(){stp();});btn(c2,'처음으로 (출발 x = −1)',function(){reset();});ou=out(el);
  var X=function(v){return 200+v*80;},Y=function(v){return 270-v*30;};
  function reset(){st.g=[-1];st.n=[-1];draw();}
  function stp(){var F=FN[st.f],g=st.g[st.g.length-1],n=st.n[st.n.length-1];st.g.push(g-st.eta*F[2](g));var d2=F[3](n);st.n.push(Math.abs(d2)<1e-9?n:n-F[2](n)/d2);draw();}
  function draw(){s.innerHTML='';var F=FN[st.f],pts=[];for(var x=-2.4;x<=4.4;x+=0.03){var y=F[1](x);if(y<8.8)pts.push([X(x),Y(y)]);}polyline(s,pts,{stroke:C.k,'stroke-width':2.2});
    function path(P,col,dy){P.forEach(function(x,i){var xx=Math.max(-2.4,Math.min(4.4,x));E('circle',{cx:X(xx),cy:Y(Math.min(8.8,F[1](xx)))+dy,r:i===P.length-1?6:3.5,fill:col},s);});}
    path(st.g,C.b,0);path(st.n,C.r,0);var g=st.g[st.g.length-1],n=st.n[st.n.length-1];
    ou.innerHTML='<p style="color:#1e55c8">경사 하강 (η = 0.1): x = <b>'+f2(g,4)+'</b>, 걸음 '+(st.g.length-1)+'번 — 새 x = x − 0.1 × f′(x)</p><p class="r">뉴턴 방법: x = <b>'+f2(n,4)+'</b>, 걸음 '+(st.n.length-1)+'번 — 새 x = x − f′(x) ÷ f″(x)</p><p class="g">목표(바닥) x = '+F[4]+'</p><p class="note">'+(st.f==='quad'?'그릇 모양(2차식)이면 뉴턴 방법은 한 걸음에 바닥으로 가요. 휨(f″)을 알면 「얼마나 멀리 가야 할지」를 알 수 있으니까요.':'휨 f″가 작은 곳(x = 0 근처)에서는 뉴턴 걸음이 너무 커져 반대편으로 멀리 튀었다가 돌아와요. 휨 정보도 늘 믿을 수는 없어요.')+'</p>';}
  reset();
};

/* 이웃 평균과 라플라시안: 숫자 격자 */
W.gridlap=function(el,o){
  var N=7,G=[],st={sign:1};for(var i=0;i<N;i++){G.push([]);for(var j=0;j<N;j++)G[i].push(0);}G[3][3]=4;
  var box=H('div',null,null,el),c=ctrl(el),ou;radio(c,'누르면:',[[1,'+1 올리기'],[-1,'−1 내리기']],1,function(v){st.sign=v;});btn(c,'모두 0으로',function(){G.forEach(function(r){for(var j=0;j<N;j++)r[j]=0;});draw();});btn(c,'그릇 모양 (x² + y²)',function(){for(var i=0;i<N;i++)for(var j=0;j<N;j++)G[i][j]=(i-3)*(i-3)+(j-3)*(j-3);draw();});btn(c,'안장 모양 (x² − y²)',function(){for(var i=0;i<N;i++)for(var j=0;j<N;j++)G[i][j]=(j-3)*(j-3)-(i-3)*(i-3);draw();});ou=out(el);
  function L(i,j){return G[i-1][j]+G[i+1][j]+G[i][j-1]+G[i][j+1]-4*G[i][j];}
  var sel=[3,3];
  function draw(){var h='<div class="tw"><table class="tb" style="max-width:460px;text-align:center"><tbody>';for(var i=0;i<N;i++){h+='<tr>';for(var j=0;j<N;j++){var on=(i===sel[0]&&j===sel[1]),nb=(Math.abs(i-sel[0])+Math.abs(j-sel[1])===1);h+='<td style="padding:2px"><button type="button" class="bt" data-i="'+i+'" data-j="'+j+'" style="min-width:38px;'+(on?'background:#fde296;':nb?'background:#e6eefb;':'')+'">'+G[i][j]+'</button></td>';}h+='</tr>';}
    box.innerHTML=h+'</tbody></table></div>';[].forEach.call(box.querySelectorAll('button'),function(b){b.onclick=function(){var i=+b.dataset.i,j=+b.dataset.j;if(i===sel[0]&&j===sel[1])G[i][j]+=st.sign;sel=[i,j];draw();};});
    var i=sel[0],j=sel[1];if(i===0||j===0||i===N-1||j===N-1){ou.innerHTML='<p class="a">가장자리 수는 이웃 넷이 다 있지 않아 계산하지 않아요. 안쪽 수를 눌러 보세요. (같은 수를 한 번 더 누르면 값이 바뀌어요)</p>';return;}
    var nb=[G[i-1][j],G[i+1][j],G[i][j-1],G[i][j+1]],avg=(nb[0]+nb[1]+nb[2]+nb[3])/4,l=L(i,j);
    ou.innerHTML='<p>노란 수(가운데) = <b>'+G[i][j]+'</b>, 파란 이웃 넷 = '+nb.join(', ')+' → 이웃 평균 '+f2(avg,2)+'</p><p class="a">이산 라플라시안 = 이웃 합 − 4 × 가운데 = '+(nb[0]+nb[1]+nb[2]+nb[3])+' − '+(4*G[i][j])+' = <b>'+l+'</b> ( = 4 × (이웃 평균 − 가운데))</p><p class="'+(l>0?'r':l<0?'b':'g')+'"'+(l<0?' style="color:#1e55c8"':'')+'>'+(l>0?'가운데가 이웃보다 낮아요 → 그릇의 바닥처럼 위로 휨':l<0?'가운데가 이웃보다 높아요 → 봉우리처럼 아래로 휨':'가운데가 이웃 평균과 같아요 → 평균 휨 0')+'</p>';}
  draw();
};

/* 사진 경계 찾기: 라플라시안 필터 */
W.edge=function(el,o){
  var N=14,I=[],st={show:'in'};for(var i=0;i<N;i++){I.push([]);for(var j=0;j<N;j++){var v=(i>=4&&i<=9&&j>=3&&j<=8)?9:((i-7)*(i-7)+(j-11)*(j-11)<=4?6:1);I[i].push(v);}}
  var s=svg(el,560,280,'작은 흑백 사진과 라플라시안 결과'),ou=out(el);
  function draw(){s.innerHTML='';var cs=18,cnt=0;for(var i=0;i<N;i++)for(var j=0;j<N;j++){var g=Math.round(255-I[i][j]*24);E('rect',{x:10+j*cs,y:20+i*cs,width:cs-1,height:cs-1,fill:'rgb('+g+','+g+','+g+')'},s);
      var l=(i>0&&j>0&&i<N-1&&j<N-1)?I[i-1][j]+I[i+1][j]+I[i][j-1]+I[i][j+1]-4*I[i][j]:0;if(Math.abs(l)>0)cnt++;var col=l>0?'rgba(201,48,44,'+Math.min(1,Math.abs(l)/16)+')':l<0?'rgba(30,85,200,'+Math.min(1,Math.abs(l)/16)+')':'#fff';
      E('rect',{x:290+j*cs,y:20+i*cs,width:cs-1,height:cs-1,fill:col,stroke:'#eef2f6'},s);}
    tx(s,10,14,'원래 사진 (숫자가 클수록 진함)',{'font-size':12,fill:C.mu});tx(s,290,14,'라플라시안 결과 (빨강 +, 파랑 −)',{'font-size':12,fill:C.mu});
    ou.innerHTML='<p class="g">밝기가 고른 안쪽은 라플라시안이 0(흰색)이고, 밝기가 바뀌는 경계에서만 값이 생겨요. 0이 아닌 곳 '+cnt+'개 = 물체의 테두리.</p><p class="note">사진 앱의 「선명하게」 기능과 AI의 경계 찾기 첫 단계에 이 계산이 쓰여요.</p>';}
  draw();
};

/* 열이 퍼지는 막대 */
W.heat=function(el,o){
  var N=41,u=[],st={k:0.25,run:false,t:0};function init(){u=[];for(var i=0;i<N;i++)u.push((Math.abs(i-12)<=2?9:0)+(Math.abs(i-30)<=1?6:0));st.t=0;}init();
  var s=svg(el,560,240,'막대 위 온도 분포'),c=ctrl(el),ou;slider(c,'퍼지는 빠르기 k',0.05,0.6,0.05,st.k,function(v){st.k=v;return f2(v,2);});
  var bp=btn(c,'시간 흐르게',function(b){st.run=!st.run;b.setAttribute('aria-pressed',st.run?'true':'false');},false);btn(c,'한 걸음',function(){step();draw();});btn(c,'처음으로',function(){init();draw();});ou=out(el);
  function step(){var v=u.slice();for(var i=1;i<N-1;i++)v[i]=u[i]+st.k*(u[i-1]-2*u[i]+u[i+1]);v[0]=v[1];v[N-1]=v[N-2];u=v;st.t++;}
  function draw(){s.innerHTML='';var X=function(i){return 20+i*13;},Y=function(v){return 200-v*18;};E('line',{x1:20,y1:200,x2:540,y2:200,stroke:C.rule},s);
    for(var i=0;i<N;i++){E('rect',{x:X(i)-5,y:212,width:11,height:16,fill:U.heat(Math.max(0,Math.min(1,u[i]/9)))},s);}polyline(s,u.map(function(v,i){return [X(i),Y(Math.max(-1,Math.min(10.5,v)))];}),{stroke:C.r,'stroke-width':2.5});
    var mx=Math.max.apply(0,u),sum=u.reduce(function(a,b){return a+b;},0),bad=st.k>0.5&&st.t>5;
    ou.innerHTML='<p>시간 '+st.t+'걸음, 가장 뜨거운 곳 '+f2(mx,2)+'°, 전체 열의 합 '+f2(sum,1)+'</p><p class="a">규칙: 다음 온도 = 지금 온도 + k × (왼쪽 + 오른쪽 − 2 × 나) — 1차원 라플라시안만큼 바뀌어요.</p>'+(bad?'<p class="r">k가 0.5를 넘으면 계산이 들쭉날쭉 튀어요(수치가 불안정). 실제 열이 아니라 계산 방법의 한계예요.</p>':'<p class="g">봉우리(라플라시안 음수)는 내려가고 골짜기(양수)는 올라가서 고르게 퍼져요.</p>');}
  draw();LAB.tick(s,function(dt){st.acc=(st.acc||0)+dt;if(st.run&&st.acc>0.08){st.acc=0;step();draw();}});
};

/* 같은 각도 걸음, 다른 실제 거리 (척도 인자) */
W.scale=function(el,o){
  var st={sys:o.sys||'cyl',s:2,th:60},s=svg(el,560,300,'각도 한 걸음의 실제 길이'),c=ctrl(el),c2=ctrl(el),ou;radio(c,'좌표:',[['cyl','원기둥 (s, φ, z)'],['sph','구면 (r, θ, φ)']],st.sys,function(v){st.sys=v;draw();});
  slider(c2,'s 또는 r',0.5,3,0.25,st.s,function(v){st.s=v;draw();return f2(v,2);});slider(c2,'θ (구면일 때)',5,175,5,st.th,function(v){st.th=v;draw();return v+'°';});ou=out(el);
  function draw(){s.innerHTML='';var cx=160,cy=150,S=40,d=Math.PI/9;E('circle',{cx:cx,cy:cy,r:3,fill:C.k},s);
    var rad=st.sys==='cyl'?st.s:st.s*Math.sin(st.th*Math.PI/180);[1,2,3].forEach(function(r){E('circle',{cx:cx,cy:cy,r:r*S,fill:'none',stroke:C.rule},s);});
    E('circle',{cx:cx,cy:cy,r:rad*S,fill:'none',stroke:C.b,'stroke-width':2},s);var a=[];for(var k=0;k<=20;k++){var t=d*k/20;a.push([cx+rad*S*Math.cos(t),cy-rad*S*Math.sin(t)]);}polyline(s,a,{stroke:C.r,'stroke-width':5});
    E('line',{x1:cx,y1:cy,x2:cx+rad*S,y2:cy,stroke:C.mu},s);E('line',{x1:cx,y1:cy,x2:cx+rad*S*Math.cos(d),y2:cy-rad*S*Math.sin(d),stroke:C.mu},s);tx(s,10,20,'위에서 본 모습: φ로 20° 한 걸음',{'font-size':12,fill:C.mu});
    var rows=[];[0.5,1,2,3].forEach(function(r){var rr=st.sys==='cyl'?r:r*Math.sin(st.th*Math.PI/180);rows.push([r,rr*d]);});
    var X=function(v){return 340+v*60;},Y=function(v){return 260-v*90;};E('line',{x1:340,y1:260,x2:540,y2:260,stroke:C.rule},s);rows.forEach(function(q){E('rect',{x:X(q[0])-10,y:Y(q[1]),width:20,height:q[1]*90,fill:'rgba(201,48,44,.35)'},s);tx(s,X(q[0])-8,276,f2(q[0],1),{'font-size':11,fill:C.mu});});tx(s,340,40,(st.sys==='cyl'?'s':'r')+'에 따른 실제 길이',{'font-size':12,fill:C.mu});
    var fac=st.sys==='cyl'?'s':'r·sin θ';ou.innerHTML='<p>φ를 20°(= 0.349 라디안) 돌리면 실제로 움직인 길이 = <b>'+fac+' × 0.349 = '+f2(rad,3)+' × 0.349 = '+f2(rad*d,3)+'</b></p><p class="g">같은 각도 걸음이라도 중심(축)에서 멀수록 실제 거리가 길어요. 이 「늘이는 수」('+fac+')가 척도 인자예요.</p><p class="a">그래서 φ 방향 기울기는 「각도당 변화」를 「거리당 변화」로 바꾸려고 1/('+fac+')를 곱해요.'+(st.sys==='sph'?' θ가 0°나 180°(극) 근처면 r·sin θ가 0에 가까워져요.':'')+'</p>';}
  draw();
};

/* 원기둥 좌표의 그래디언트 */
W.cgrad=function(el,o){
  var FS={phi:['f = φ (방향 각 자체)',function(x,y){return Math.atan2(y,x);},function(s){return [0,1];}],s2:['f = s² (= x² + y²)',function(x,y){return x*x+y*y;},function(s){return [2*s,0];}],mix:['f = s·φ',function(x,y){return Math.hypot(x,y)*Math.atan2(y,x);},function(s,p){return [p,s];}]};
  var st={f:'phi',s:2,phi:45},s=svg(el,560,320,'원기둥 좌표의 그래디언트'),c=ctrl(el),c2=ctrl(el),ou;radio(c,'함수:',Object.keys(FS).map(function(k){return [k,FS[k][0]];}),st.f,function(v){st.f=v;draw();});
  slider(c2,'s',0.5,3,0.25,st.s,function(v){st.s=v;draw();return f2(v,2);});slider(c2,'φ',15,165,15,st.phi,function(v){st.phi=v;draw();return v+'°';});ou=out(el);
  function draw(){s.innerHTML='';var F=FS[st.f],ph=st.phi*Math.PI/180,x=st.s*Math.cos(ph),y=st.s*Math.sin(ph),h=1e-5,gx=(F[1](x+h,y)-F[1](x-h,y))/(2*h),gy=(F[1](x,y+h)-F[1](x,y-h))/(2*h);
    var d=F[2](st.s,ph),gs=d[0],gp=d[1]/st.s,shat=[Math.cos(ph),Math.sin(ph)],phat=[-Math.sin(ph),Math.cos(ph)],cg=[gs*shat[0]+gp*phat[0],gs*shat[1]+gp*phat[1]],wrong=[gs*shat[0]+d[1]*phat[0],gs*shat[1]+d[1]*phat[1]];
    var X=function(v){return 200+v*50;},Y=function(v){return 270-v*50;};E('line',{x1:20,y1:Y(0),x2:380,y2:Y(0),stroke:C.rule},s);E('line',{x1:X(0),y1:10,x2:X(0),y2:300,stroke:C.rule},s);
    E('circle',{cx:X(0),cy:Y(0),r:st.s*50,fill:'none',stroke:'#dbe9ef'},s);E('circle',{cx:X(x),cy:Y(y),r:5,fill:C.k},s);var sc=1.8/Math.max(0.5,Math.hypot(gx,gy),Math.hypot(wrong[0],wrong[1]));
    arrow(s,X(x),Y(y),X(x+gx*sc),Y(y+gy*sc),C.g,6);arrow(s,X(x),Y(y),X(x+cg[0]*sc),Y(y+cg[1]*sc),C.r,2.5);if(Math.abs(d[1])>1e-9)arrow(s,X(x),Y(y),X(x+wrong[0]*sc),Y(y+wrong[1]*sc),C.a,2,'4 3');
    tx(s,390,60,'초록 굵게: 상자 좌표로 계산',{'font-size':12,fill:C.g});tx(s,390,80,'빨강: 원기둥 공식 (1/s 포함)',{'font-size':12,fill:C.r});tx(s,390,100,'주황 점선: 1/s를 빼먹은 경우',{'font-size':12,fill:C.a});
    ou.innerHTML='<p>점 (s, φ) = ('+f2(st.s,2)+', '+st.phi+'°) = (x, y) = ('+f2(x,2)+', '+f2(y,2)+')</p><p class="g">상자 좌표: ∇f = ('+f2(gx,3)+', '+f2(gy,3)+'), 길이 <b>'+f2(Math.hypot(gx,gy),3)+'</b></p><p class="r">원기둥 공식: ∂f/∂s = '+f2(gs,3)+', (1/s)·∂f/∂φ = (1/'+f2(st.s,2)+') × '+f2(d[1],3)+' = '+f2(gp,3)+' → 길이 <b>'+f2(Math.hypot(gs,gp),3)+'</b> (같아요)</p>'+(Math.abs(d[1])>1e-9?'<p class="a">1/s를 빼면 길이 '+f2(Math.hypot(gs,d[1]),3)+' — 틀려요.</p>':'<p class="note">이 함수는 φ에 따라 변하지 않아서 1/s 항이 0이에요. 다른 함수도 골라 보세요.</p>');}
  draw();
};

/* 공식 두 길로 검산 */
var CASES={
 divcyl:{t:'발산: v = (x, y, 0) — 원기둥으로는 v_s = s',sys:'원기둥',cart:'∂x/∂x + ∂y/∂y + ∂0/∂z = 1 + 1 + 0 = 2',curv:'(1/s)·∂(s·v_s)/∂s = (1/s)·∂(s²)/∂s = (1/s)·2s = 2',v:2,num:function(){return nd3(function(x,y,z){return [x,y,0];},0.7,1.1,0.4,'div');}},
 divsph:{t:'발산: v = (x, y, z) — 구면으로는 v_r = r',sys:'구면',cart:'1 + 1 + 1 = 3',curv:'(1/r²)·∂(r²·v_r)/∂r = (1/r²)·∂(r³)/∂r = (1/r²)·3r² = 3',v:3,num:function(){return nd3(function(x,y,z){return [x,y,z];},0.7,1.1,0.4,'div');}},
 lapsph:{t:'라플라시안: f = x² + y² + z² — 구면으로는 r²',sys:'구면',cart:'2 + 2 + 2 = 6',curv:'(1/r²)·∂(r²·∂f/∂r)/∂r = (1/r²)·∂(r²·2r)/∂r = (1/r²)·6r² = 6',v:6,num:function(){return lap3(function(x,y,z){return x*x+y*y+z*z;},0.7,1.1,0.4);}},
 lapcyl:{t:'라플라시안: f = x² + y² — 원기둥으로는 s²',sys:'원기둥',cart:'2 + 2 + 0 = 4',curv:'(1/s)·∂(s·∂f/∂s)/∂s = (1/s)·∂(s·2s)/∂s = (1/s)·4s = 4',v:4,num:function(){return lap3(function(x,y,z){return x*x+y*y;},0.7,1.1,0.4);}},
 curlcyl:{t:'회전: v = (−y, x, 0) — 원기둥으로는 v_φ = s',sys:'원기둥',cart:'ẑ 성분: ∂v_y/∂x − ∂v_x/∂y = 1 − (−1) = 2',curv:'ẑ 성분: (1/s)·(∂(s·v_φ)/∂s − ∂v_s/∂φ) = (1/s)·(2s − 0) = 2',v:2,num:function(){return nd3(function(x,y,z){return [-y,x,0];},0.7,1.1,0.4,'curlz');}},
 lapinv:{t:'라플라시안: f = 1/r (중력·전기의 퍼텐셜, r ≠ 0)',sys:'구면',cart:'상자 좌표로는 계산이 길어요 (세 항이 서로 지워짐)',curv:'(1/r²)·∂(r²·(−1/r²))/∂r = (1/r²)·∂(−1)/∂r = 0',v:0,num:function(){return lap3(function(x,y,z){return 1/Math.sqrt(x*x+y*y+z*z);},0.7,1.1,0.4);}},
 curlgrad:{t:'기울기의 회전: f = x²y → ∇f = (2xy, x², 0)',sys:'상자',cart:'ẑ 성분: ∂(x²)/∂x − ∂(2xy)/∂y = 2x − 2x = 0',curv:'어떤 매끄러운 f든 ∇×(∇f) = 0 — 오르막 화살표만 모아서는 소용돌이를 만들 수 없어요',v:0,num:function(){return nd3(function(x,y,z){return [2*x*y,x*x,0];},0.7,1.1,0.4,'curlz');}},
 divgrad:{t:'기울기의 발산: f = x² + y² → ∇f = (2x, 2y)',sys:'상자',cart:'∂(2x)/∂x + ∂(2y)/∂y = 2 + 2 = 4',curv:'∇·(∇f) = ∇²f — 라플라시안과 같아요 (2 + 2 = 4)',v:4,num:function(){return nd3(function(x,y,z){return [2*x,2*y,0];},0.7,1.1,0.4,'div');}}
};
function nd3(F,x,y,z,what){var h=1e-4,dx=function(i){return (F(x+h,y,z)[i]-F(x-h,y,z)[i])/(2*h);},dy=function(i){return (F(x,y+h,z)[i]-F(x,y-h,z)[i])/(2*h);},dz=function(i){return (F(x,y,z+h)[i]-F(x,y,z-h)[i])/(2*h);};return what==='div'?dx(0)+dy(1)+dz(2):dx(1)-dy(0);}
function lap3(f,x,y,z){var h=1e-3,c=f(x,y,z);return (f(x+h,y,z)+f(x-h,y,z)+f(x,y+h,z)+f(x,y-h,z)+f(x,y,z+h)+f(x,y,z-h)-6*c)/(h*h);}
U.CASES=CASES;
W.formcheck=function(el,o){
  var keys=o.keys||Object.keys(CASES),cur=keys[0],c=ctrl(el),ou;radio(c,'',keys.map(function(k){return [k,CASES[k].t.split(':')[0]+': '+CASES[k].t.split('—')[0].split(': ')[1]];}),cur,function(v){cur=v;draw();});ou=out(el);
  function draw(){var K=CASES[cur],n=K.num();ou.innerHTML='<p><b>'+K.t+'</b></p><p class="g">상자 좌표 길: '+K.cart+'</p><p class="r">'+K.sys+' 좌표 길: '+K.curv+'</p><p class="a">숫자로 검산 (점 (0.7, 1.1, 0.4)에서 아주 작은 걸음으로 계산): <b>'+f2(n,3)+'</b> → 공식 값 '+K.v+'과 '+(Math.abs(n-K.v)<0.01?'일치':'다름')+'</p>';}
  draw();
};

/* ── 조교 대결 판정 (기둥 4) ── */
DUELS.sheardiv=function(){var F=VF.shear[1],mx=0;[[0.5,1],[-1,2],[2,-1.5]].forEach(function(p){mx=Math.max(mx,Math.abs(divcurl(F,p[0],p[1]).div));});return {fly:mx<1e-6,robo:false,report:'v = (y, 0): ∂v₁/∂x = ∂y/∂x = 0, ∂v₂/∂y = 0 → 발산 <b>0</b>. 세 점에서 상자 계산으로도 가장 큰 값이 '+f2(mx,6)+'. 흐름이 빠르든 느리든, 들어온 만큼 나가면 발산은 0이에요.'};};
DUELS.irrotcurl=function(){var d=divcurl(VF.irrot[1],1,0);return {fly:Math.abs(d.curl)<1e-6,robo:false,report:'v = (−y, x)/(x² + y²)의 점 (1, 0): ∂v₂/∂x − ∂v₁/∂y = '+f2(d.dyx,4)+' − '+f2(d.dxy,4)+' = <b>'+f2(d.curl,4)+'</b>. 물은 원을 따라 돌지만, 그 자리에 둔 작은 바람개비는 돌지 않아요(가운데 한 점만 예외).'};};
DUELS.hesssym=function(){var f=function(x,y){return x*x*x*y*y;},h=1e-3,fxy=(f(1+h,1+h)-f(1+h,1-h)-f(1-h,1+h)+f(1-h,1-h))/(4*h*h);return {fly:false,robo:Math.abs(fxy-6)<1e-3,report:'f = x³y²: x로 먼저 → 3x²y², 다시 y로 → 6x²y. y로 먼저 → 2x³y, 다시 x로 → 6x²y. 점 (1, 1)에서 둘 다 <b>6</b> (숫자 검산 '+f2(fxy,3)+'). 매끄러운 함수에서는 순서를 바꿔도 같아서 헤시안이 대칭이에요.'};};
DUELS.lapsaddle=function(){var f=function(x,y){return x*x-y*y;},h=1e-3,l=(f(1+h,0.5)+f(1-h,0.5)+f(1,0.5+h)+f(1,0.5-h)-4*f(1,0.5))/(h*h);return {fly:false,robo:Math.abs(l)<1e-3,report:'f = x² − y²: ∂²f/∂x² = 2, ∂²f/∂y² = −2 → 합 <b>'+f2(l,3)+'</b>. 휘어 있지 않은 게 아니라, 위로 휜 만큼 아래로 휘어 「평균 휨」이 0이에요.'};};
DUELS.sphdiv=function(){var v=nd3(function(x,y,z){return [x,y,z];},0.7,1.1,0.4,'div');return {fly:false,robo:Math.abs(v-3)<1e-6,report:'v = r r̂ = (x, y, z). 구면 공식: (1/r²)·∂(r³)/∂r = 3. 상자 좌표 검산: 1 + 1 + 1 = <b>'+f2(v,3)+'</b>. ∂v_r/∂r = 1만 보면 안 되고, 공식의 r² 「늘이는 수」까지 넣어야 해요.'};};
DUELS.final=function(){var v=nd3(function(x,y,z){return [2*x,2*y,0];},0.7,1.1,0.4,'div'),l=lap3(function(x,y,z){return x*x+y*y;},0.7,1.1,0.4);return {fly:Math.abs(v-4)<1e-3,robo:Math.abs(l-4)<0.01,report:'f = x² + y². 주판봇 길: ∇²f = 2 + 2 = <b>'+f2(l,2)+'</b>. 초파리 길: ∇f = (2x, 2y), 그 발산 = 2 + 2 = <b>'+f2(v,2)+'</b>. 같은 값 — 「기울기의 발산 = 라플라시안」이에요.'};};
})();
