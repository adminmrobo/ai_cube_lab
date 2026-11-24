/* 위젯 모음 2: 기둥 2·3 (곡면 도감 · 편미분 · 그래디언트 · 경사 하강 · 야코비안) */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,ctrl=U.ctrl,btn=U.btn,radio=U.radio,slider=U.slider,out=U.out,tx=U.tx,f2=U.f2,arrow=U.arrow,view=U.view,mesh=U.mesh,axes3=U.axes3,drag=U.drag,polyline=U.polyline;
var ch=Math.cosh||function(x){return (Math.exp(x)+Math.exp(-x))/2;},sh=Math.sinh||function(x){return (Math.exp(x)-Math.exp(-x))/2;};

/* 등고선(마칭 스퀘어) */
function contour(s,f,x0,x1,y0,y1,X,Y,levels,col,n){n=n||60;var dx=(x1-x0)/n,dy=(y1-y0)/n,G=[];for(var i=0;i<=n;i++){G.push([]);for(var j=0;j<=n;j++)G[i].push(f(x0+i*dx,y0+j*dy));}
  levels.forEach(function(L,li){var d='';for(var i=0;i<n;i++)for(var j=0;j<n;j++){var v=[G[i][j],G[i+1][j],G[i+1][j+1],G[i][j+1]],P=[[i,j],[i+1,j],[i+1,j+1],[i,j+1]],pts=[];
    for(var k=0;k<4;k++){var a=v[k],b=v[(k+1)%4];if((a<L)!==(b<L)){var t=(L-a)/(b-a),pa=P[k],pb=P[(k+1)%4];pts.push([X(x0+(pa[0]+t*(pb[0]-pa[0]))*dx),Y(y0+(pa[1]+t*(pb[1]-pa[1]))*dy)]);}}
    if(pts.length>=2)d+='M'+pts[0][0].toFixed(1)+' '+pts[0][1].toFixed(1)+'L'+pts[1][0].toFixed(1)+' '+pts[1][1].toFixed(1);if(pts.length===4)d+='M'+pts[2][0].toFixed(1)+' '+pts[2][1].toFixed(1)+'L'+pts[3][0].toFixed(1)+' '+pts[3][1].toFixed(1);}
    if(d)E('path',{d:d,stroke:typeof col==='function'?col(li,levels.length):col,'stroke-width':1.3,fill:'none'},s);});}
U.contour=contour;
function grad(f,x,y){var h=1e-4;return [(f(x+h,y)-f(x-h,y))/(2*h),(f(x,y+h)-f(x,y-h))/(2*h)];}
U.grad=grad;

/* 곡면 도감 */
var SURF={
 sphere:{name:'구 (공)',eq:function(p){return 'x² + y² + z² = '+f2(p.a*p.a,2);},par:['a'],lab:{a:'반지름 r'},P:function(p){return [function(u,v){return [p.a*Math.sin(u)*Math.cos(v),p.a*Math.sin(u)*Math.sin(v),p.a*Math.cos(u)];},0,Math.PI,0,2*Math.PI];},F:function(p,x,y,z){return x*x+y*y+z*z-p.a*p.a;},sl:'원'},
 ellipsoid:{name:'타원면 (럭비공)',eq:function(p){return 'x²/'+f2(p.a*p.a,2)+' + y²/'+f2(p.b*p.b,2)+' + z²/'+f2(p.c*p.c,2)+' = 1';},par:['a','b','c'],P:function(p){return [function(u,v){return [p.a*Math.sin(u)*Math.cos(v),p.b*Math.sin(u)*Math.sin(v),p.c*Math.cos(u)];},0,Math.PI,0,2*Math.PI];},F:function(p,x,y,z){return x*x/(p.a*p.a)+y*y/(p.b*p.b)+z*z/(p.c*p.c)-1;},sl:'타원'},
 ellparab:{name:'타원포물면 (그릇)',eq:function(p){return 'z = x²/'+f2(p.a*p.a,2)+' + y²/'+f2(p.b*p.b,2);},par:['a','b'],P:function(p){return [function(u,v){return [p.a*u*Math.cos(v),p.b*u*Math.sin(v),u*u];},0,1.4,0,2*Math.PI];},F:function(p,x,y,z){return x*x/(p.a*p.a)+y*y/(p.b*p.b)-z;},sl:'타원 (높이가 0보다 클 때)'},
 hypparab:{name:'쌍곡포물면 (말안장)',eq:function(p){return 'z = y²/'+f2(p.b*p.b,2)+' − x²/'+f2(p.a*p.a,2);},par:['a','b'],P:function(p){return [function(u,v){return [u,v,v*v/(p.b*p.b)-u*u/(p.a*p.a)];},-1.6,1.6,-1.6,1.6];},F:function(p,x,y,z){return y*y/(p.b*p.b)-x*x/(p.a*p.a)-z;},sl:'쌍곡선 (높이 0이면 엇갈린 두 직선)'},
 parcyl:{name:'포물기둥 (반으로 접은 종이)',eq:function(p){return 'x² = '+f2(2*p.a,2)+'y';},par:['a'],lab:{a:'p'},P:function(p){return [function(u,v){return [u,u*u/(2*p.a),v];},-1.8,1.8,-1.2,1.2];},F:function(p,x,y,z){return x*x-2*p.a*y;},sl:'모든 높이에서 같은 포물선'},
 hyp1:{name:'일엽쌍곡면 (모래시계 한 장)',eq:function(p){return 'x²/'+f2(p.a*p.a,2)+' + y²/'+f2(p.b*p.b,2)+' − z²/'+f2(p.c*p.c,2)+' = 1';},par:['a','b','c'],P:function(p){return [function(u,v){return [p.a*ch(u)*Math.cos(v),p.b*ch(u)*Math.sin(v),p.c*sh(u)];},-1.1,1.1,0,2*Math.PI];},F:function(p,x,y,z){return x*x/(p.a*p.a)+y*y/(p.b*p.b)-z*z/(p.c*p.c)-1;},sl:'타원 (허리가 가장 작음)'},
 hyp2:{name:'이엽쌍곡면 (마주 본 두 그릇)',eq:function(p){return 'z²/'+f2(p.c*p.c,2)+' − x²/'+f2(p.a*p.a,2)+' − y²/'+f2(p.b*p.b,2)+' = 1';},par:['a','b','c'],P:function(p){return [function(u,v){var sg=u<0?-1:1,w=Math.abs(u);return [p.a*sh(w)*Math.cos(v),p.b*sh(w)*Math.sin(v),sg*p.c*ch(w)];},-1.2,1.2,0,2*Math.PI];},F:function(p,x,y,z){return z*z/(p.c*p.c)-x*x/(p.a*p.a)-y*y/(p.b*p.b)-1;},sl:'타원 (|z| < c 사이에는 아무것도 없음)'},
 cone:{name:'타원뿔 (원뿔)',eq:function(p){return 'z²/'+f2(p.c*p.c,2)+' = x²/'+f2(p.a*p.a,2)+' + y²/'+f2(p.b*p.b,2);},par:['a','b','c'],P:function(p){return [function(u,v){return [p.a*u*Math.cos(v),p.b*u*Math.sin(v),p.c*u];},-1.4,1.4,0,2*Math.PI];},F:function(p,x,y,z){return x*x/(p.a*p.a)+y*y/(p.b*p.b)-z*z/(p.c*p.c);},sl:'타원 (높이 0이면 한 점)'},
 torus:{name:'토러스 (도넛) — 이차곡면 아님',eq:function(p){return '(R − √(x² + y²))² + z² = r²  (R = '+f2(p.a,2)+', r = '+f2(p.c,2)+')';},par:['a','c'],lab:{a:'R (큰 반지름)',c:'r (작은 반지름)'},P:function(p){return [function(u,v){return [(p.a+p.c*Math.cos(u))*Math.cos(v),(p.a+p.c*Math.cos(u))*Math.sin(v),p.c*Math.sin(u)];},0,2*Math.PI,0,2*Math.PI];},F:function(p,x,y,z){var q=p.a-Math.sqrt(x*x+y*y);return q*q+z*z-p.c*p.c;},sl:'고리 두 개(또는 하나)'},
 monkey:{name:'원숭이 안장 — 3차식',eq:function(){return 'z = x³ − 3xy²';},par:[],P:function(){return [function(u,v){return [u*Math.cos(v),u*Math.sin(v),Math.pow(u,3)*Math.cos(3*v)*0.7];},0,1.5,0,2*Math.PI];},F:function(p,x,y,z){return 0.7*(x*x*x-3*x*y*y)-z;},sl:'세 갈래로 갈라지는 곡선'},
 gauss:{name:'가우스 곡면 (종 모양)',eq:function(){return 'z = exp(−(x² + y²))';},par:[],P:function(){return [function(u,v){return [u*Math.cos(v),u*Math.sin(v),1.6*Math.exp(-u*u)];},0,2.4,0,2*Math.PI];},F:function(p,x,y,z){return 1.6*Math.exp(-(x*x+y*y))-z;},sl:'원 (높이가 높을수록 작아짐)'}
};
W.surf=function(el,o){
  var keys=o.keys||['sphere','ellipsoid','ellparab'],st={k:o.k||keys[0],a:o.a||1.5,b:o.b||1.5,c:o.c||1.5,h:o.h!=null?o.h:0.5,az:-0.7,el:0.45,sl:!!o.sl};
  var s=svg(el,560,380,'3차원 곡면'),c=ctrl(el);radio(c,'모양:',keys.map(function(k){return [k,SURF[k].name];}),st.k,function(v){st.k=v;mk();draw();});
  var pc=ctrl(el),c3=ctrl(el);btn(c3,'수평으로 자른 단면 보기',function(b){st.sl=!st.sl;b.setAttribute('aria-pressed',st.sl?'true':'false');draw();},st.sl);
  slider(c3,'자르는 높이 z',-2,2,0.1,st.h,function(v){st.h=v;draw();return f2(v,1);});
  var ou=out(el);drag(s,function(){return [st.az,st.el];},function(a,e){st.az=a;st.el=e;},draw);
  function mk(){pc.innerHTML='';var S=SURF[st.k],L=S.lab||{};S.par.forEach(function(k){slider(pc,(L[k]||k)+' 값',0.5,2.5,0.1,st[k],function(v){st[k]=v;draw();return f2(v,1);});});if(!S.par.length)H('span','glabel','이 모양은 정해진 식이라 조절할 값이 없어요.',pc);}
  function draw(){s.innerHTML='';var S=SURF[st.k],A=S.P(st),V=U.fit(A[0],A[1],A[2],A[3],A[4],st.az,st.el,st.sl?20:60,30,st.sl?360:440,330,[[0,0,0],[2.2,0,0],[0,2.2,0],[0,0,2.2]]);axes3(s,V,2.2);mesh(s,V,A[0],A[1],A[2],A[3],A[4],22,30);
    var h='<p>식: <b>'+S.eq(st)+'</b></p>';
    if(st.sl){var pts=[],box=[-3,3];var P=function(x,y){return V.p(x,y,st.h);};var q=[[box[0],box[0]],[box[1],box[0]],[box[1],box[1]],[box[0],box[1]]].map(function(a){return P(a[0],a[1]);});
      E('polygon',{points:q.map(function(a){return a[0].toFixed(1)+','+a[1].toFixed(1);}).join(' '),fill:'rgba(30,85,200,.08)',stroke:C.b,'stroke-dasharray':'4 3'},s);
      var X=function(v){return 470+v*24;},Y=function(v){return 270-v*24;};E('rect',{x:398,y:198,width:144,height:144,fill:'#fff',stroke:C.rule},s);tx(s,402,192,'위에서 본 단면',{'font-size':12,fill:C.mu});
      E('line',{x1:400,y1:270,x2:540,y2:270,stroke:C.rule},s);E('line',{x1:470,y1:200,x2:470,y2:340,stroke:C.rule},s);
      var n=90,cnt=0;for(var i=0;i<n;i++)for(var j=0;j<n;j++){var x=-2.9+5.8*i/n,y=-2.9+5.8*j/n,dd=5.8/n,f0=S.F(st,x,y,st.h);if(f0*S.F(st,x+dd,y,st.h)<=0||f0*S.F(st,x,y+dd,st.h)<=0){cnt++;E('rect',{x:X(x)-1,y:Y(y)-1,width:2,height:2,fill:C.r},s);var P3=V.p(x,y,st.h);E('rect',{x:P3[0]-1,y:P3[1]-1,width:2,height:2,fill:C.r},s);}}
      h+='<p class="r">높이 z = '+f2(st.h,1)+'에서 자르면: '+(cnt?'<b>'+S.sl+'</b>':'<b>아무것도 없어요</b> (이 높이에는 곡면이 지나가지 않음)')+'</p>';}
    h+='<p class="note">그림을 끌어서 돌려 보세요. 색은 높이(파랑 낮음 → 빨강 높음)예요.</p>';ou.innerHTML=h;}
  mk();draw();
};
/* 부호 놀이: ±x² ±y² ±z² = 1 또는 0 */
W.signs=function(el,o){
  var st={sx:1,sy:1,sz:-1,rhs:1,az:-0.7,el:0.4},s=svg(el,560,360,'부호에 따라 바뀌는 곡면'),c=ctrl(el),ou;
  [['sx','x²'],['sy','y²'],['sz','z²']].forEach(function(t){var cc=ctrl(el);radio(cc,t[1]+' 앞 부호:',[[1,'+'],[-1,'−']],st[t[0]],function(v){st[t[0]]=v;draw();});});
  radio(c,'오른쪽:',[[1,'= 1'],[0,'= 0']],st.rhs,function(v){st.rhs=v;draw();});ou=out(el);drag(s,function(){return [st.az,st.el];},function(a,e){st.az=a;st.el=e;},draw);
  function draw(){s.innerHTML='';var V=U.fit(function(u,v){return [1.6*Math.cos(v)*u,1.6*Math.sin(v)*u,1.6*(u-0.5)*2];},0,1,0,6.3,st.az,st.el,60,20,440,320);axes3(s,V,2.4);var neg=(st.sx<0)+(st.sy<0)+(st.sz<0),name,key=null,ax='z';
    var sg=[st.sx,st.sy,st.sz];if(st.rhs===1){if(neg===0){name='타원면 (공·럭비공)';key='ellipsoid';}else if(neg===1){name='일엽쌍곡면 (모래시계)';key='hyp1';}else if(neg===2){name='이엽쌍곡면 (마주 본 두 그릇)';key='hyp2';}else name='아무 점도 없음 (음수의 합이 1이 될 수 없음)';
      ax=['x','y','z'][neg===1?sg.indexOf(-1):neg===2?sg.indexOf(1):2];}
    else{if(neg===0||neg===3)name='원점 한 점뿐 (모두 0일 때만 성립)';else{name='원뿔';key='cone';ax=['x','y','z'][neg===1?sg.indexOf(-1):sg.indexOf(1)];}}
    if(key){var A=SURF[key].P({a:1,b:1,c:1});var rot=function(f){return function(u,v){var q=f(u,v);return ax==='z'?q:ax==='x'?[q[2],q[0],q[1]]:[q[1],q[2],q[0]];};};mesh(s,V,rot(A[0]),A[1],A[2],A[3],A[4],20,28);}
    var eq=(st.sx<0?'−':'')+'x² '+(st.sy<0?'−':'+')+' y² '+(st.sz<0?'−':'+')+' z² = '+st.rhs;
    ou.innerHTML='<p>식: <b>'+eq+'</b> → <b>'+name+'</b>'+(key&&key!=='ellipsoid'?' (축은 '+ax+' 방향)':'')+'</p><p class="g">빼기 부호가 몇 개인지와 오른쪽이 1인지 0인지만 보면 모양 이름이 정해져요.</p>';}
  draw();
};

/* 접선의 기울기: 할선이 접선이 되는 과정 */
W.tangent=function(el,o){
  var FN={sq:['x²',function(x){return x*x;},function(x){return 2*x;}],cube:['x³ − 3x',function(x){return x*x*x-3*x;},function(x){return 3*x*x-3;}]};
  var st={f:o.f||'sq',a:1,h:1},s=svg(el,560,330,'곡선과 접선'),c=ctrl(el),ou;radio(c,'함수:',[['sq','y = x²'],['cube','y = x³ − 3x']],st.f,function(v){st.f=v;draw();});
  var c2=ctrl(el);slider(c2,'점 a',-2,2,0.1,st.a,function(v){st.a=v;draw();return f2(v,1);});slider(c2,'간격 h',0.01,1.5,0.01,st.h,function(v){st.h=v;draw();return f2(v,2);});ou=out(el);
  var X=function(v){return 280+v*85;},Y=function(v){return 200-v*28;};
  function draw(){s.innerHTML='';var F=FN[st.f];E('line',{x1:10,y1:Y(0),x2:550,y2:Y(0),stroke:C.rule},s);E('line',{x1:X(0),y1:5,x2:X(0),y2:325,stroke:C.rule},s);
    var pts=[];for(var x=-3.2;x<=3.2;x+=0.04){var y=F[1](x);if(y>-5&&y<7.2)pts.push([X(x),Y(y)]);}polyline(s,pts,{stroke:C.k,'stroke-width':2.5});
    var a=st.a,h=st.h,fa=F[1](a),fb=F[1](a+h),sec=(fb-fa)/h,tan=F[2](a);
    polyline(s,[[X(a-3),Y(fa-3*sec)],[X(a+3),Y(fa+3*sec)]],{stroke:C.a,'stroke-width':2,'stroke-dasharray':'6 4'});polyline(s,[[X(a-3),Y(fa-3*tan)],[X(a+3),Y(fa+3*tan)]],{stroke:C.r,'stroke-width':2});
    E('circle',{cx:X(a),cy:Y(fa),r:6,fill:C.b},s);E('circle',{cx:X(a+h),cy:Y(fb),r:5,fill:C.a},s);
    ou.innerHTML='<p class="a">주황 점선(두 점을 잇는 선)의 기울기 = (f(a + h) − f(a)) / h = ('+f2(fb,3)+' − '+f2(fa,3)+') / '+f2(h,2)+' = <b>'+f2(sec,3)+'</b></p><p class="r">빨강(접선)의 기울기 f′(a) = <b>'+f2(tan,3)+'</b> — h를 0 가까이 줄이면 주황이 빨강에 붙어요.</p><p class="note">기울기가 양수면 오르막, 음수면 내리막, 0이면 꼭대기나 바닥(평평한 곳)이에요.</p>';}
  draw();
};

/* 편미분: 언덕을 한 방향으로만 자르기 */
var HILLS={hill:['f = 6 − x² − y²/2',function(x,y){return 6-x*x-y*y/2;},function(x,y){return [-2*x,-y];}],
           xy:['f = x²·y',function(x,y){return x*x*y;},function(x,y){return [2*x*y,x*x];}],
           bowl:['f = x² + 2y²',function(x,y){return x*x+2*y*y;},function(x,y){return [2*x,4*y];}]};
W.partial=function(el,o){
  var st={f:o.f||'hill',x:1,y:1},s=svg(el,620,330,'언덕의 등고선과 두 방향 단면'),c=ctrl(el),ou;
  radio(c,'언덕:',Object.keys(HILLS).filter(function(k){return !o.only||o.only.indexOf(k)>=0;}).map(function(k){return [k,HILLS[k][0]];}),st.f,function(v){st.f=v;draw();});
  var c2=ctrl(el);slider(c2,'x',-2,2,0.5,st.x,function(v){st.x=v;draw();return f2(v,1);});slider(c2,'y',-2,2,0.5,st.y,function(v){st.y=v;draw();return f2(v,1);});ou=out(el);
  function draw(){s.innerHTML='';var F=HILLS[st.f],f=F[1],g=F[2](st.x,st.y),X=function(v){return 160+v*55;},Y=function(v){return 165-v*55;};
    var lv=[];for(var k=-12;k<=12;k++)lv.push(k);contour(s,f,-2.6,2.6,-2.6,2.6,X,Y,lv,function(i,n){return U.heat(i/n);});
    E('line',{x1:X(-2.6),y1:Y(st.y),x2:X(2.6),y2:Y(st.y),stroke:C.r,'stroke-width':2,'stroke-dasharray':'5 3'},s);E('line',{x1:X(st.x),y1:Y(-2.6),x2:X(st.x),y2:Y(2.6),stroke:C.b,'stroke-width':2,'stroke-dasharray':'5 3'},s);
    E('circle',{cx:X(st.x),cy:Y(st.y),r:6,fill:C.k},s);tx(s,20,20,'위에서 본 지도 (등고선)',{'font-size':12,fill:C.mu});
    function panel(y0,col,lab,fn,a,slope){var X2=function(v){return 470+v*45;},vals=[];for(var t=-2.6;t<=2.6;t+=0.05)vals.push(fn(t));var mn=Math.min.apply(0,vals),mx=Math.max.apply(0,vals),Y2=function(v){return y0+60-(v-mn)/((mx-mn)||1)*55;};
      var pts=[];for(var i=0;i<vals.length;i++)pts.push([X2(-2.6+i*0.05),Y2(vals[i])]);polyline(s,pts,{stroke:col,'stroke-width':2.2});
      var fa=fn(a),k2=(55/((mx-mn)||1))/45;polyline(s,[[X2(a-0.8),Y2(fa-0.8*slope)],[X2(a+0.8),Y2(fa+0.8*slope)]],{stroke:C.k,'stroke-width':2});E('circle',{cx:X2(a),cy:Y2(fa),r:5,fill:C.k},s);tx(s,350,y0,lab,{'font-size':12,fill:col,'font-weight':700});}
    panel(20,C.r,'빨간 선 따라 (y = '+f2(st.y,1)+' 고정)',function(t){return f(t,st.y);},st.x,g[0]);panel(185,C.b,'파란 선 따라 (x = '+f2(st.x,1)+' 고정)',function(t){return f(st.x,t);},st.y,g[1]);
    ou.innerHTML='<p>점 ('+f2(st.x,1)+', '+f2(st.y,1)+')의 높이 f = <b>'+f2(f(st.x,st.y),2)+'</b></p><p class="r">x 방향으로만 걸을 때 기울기 ∂f/∂x = <b>'+f2(g[0],2)+'</b></p><p style="color:#1e55c8">y 방향으로만 걸을 때 기울기 ∂f/∂y = <b>'+f2(g[1],2)+'</b></p><p class="note">한 방향만 움직이고 다른 쪽은 멈춰 둔 채 잰 기울기가 「편미분」이에요.</p>';}
  draw();
};

/* 편미분 손계산 확인기 */
W.pdcalc=function(el,o){
  var FS=[['x²y','x²·y',function(x,y){return x*x*y;},'2x·y','x²'],['p2','x² + 3xy + y²',function(x,y){return x*x+3*x*y+y*y;},'2x + 3y','3x + 2y'],['p3','5x − 2y + 7',function(x,y){return 5*x-2*y+7;},'5','−2'],['p4','x³y²',function(x,y){return x*x*x*y*y;},'3x²·y²','2x³·y']];
  var st={k:0,x:1,y:2},c=ctrl(el),c2=ctrl(el),ou;radio(c,'함수:',FS.map(function(f,i){return [i,'f = '+f[1]];}),0,function(v){st.k=v;draw();});
  slider(c2,'x',-3,3,1,st.x,function(v){st.x=v;draw();return v;});slider(c2,'y',-3,3,1,st.y,function(v){st.y=v;draw();return v;});ou=out(el);
  function draw(){var F=FS[st.k],f=F[2],h=1e-4,gx=(f(st.x+h,st.y)-f(st.x-h,st.y))/(2*h),gy=(f(st.x,st.y+h)-f(st.x,st.y-h))/(2*h),d=0.01,nx=(f(st.x+d,st.y)-f(st.x,st.y))/d;
    ou.innerHTML='<p>f(x, y) = <b>'+F[1]+'</b>, 점 ('+st.x+', '+st.y+')</p><p class="r">∂f/∂x: y를 숫자처럼 두고 x로만 미분 → <b>'+F[3]+'</b> → 값 <b>'+f2(gx,2)+'</b></p><p style="color:#1e55c8">∂f/∂y: x를 숫자처럼 두고 y로만 미분 → <b>'+F[4]+'</b> → 값 <b>'+f2(gy,2)+'</b></p><p class="g">검산 (x만 0.01 늘려 보기): (f('+f2(st.x+d,2)+', '+st.y+') − f('+st.x+', '+st.y+')) / 0.01 = '+f2(nx,3)+' ≈ '+f2(gx,2)+'</p>';}
  draw();
};

/* 그래디언트 화살표 밭 */
var GF={bowl:['f = x² + 2y²',function(x,y){return x*x+2*y*y;}],hill:['f = 6 − x² − y²/2',function(x,y){return 6-x*x-y*y/2;}],tilt:['f = x + 2y',function(x,y){return x+2*y;}],two:['봉우리 두 개',function(x,y){return 3*Math.exp(-((x-1.2)*(x-1.2)+y*y))+2*Math.exp(-((x+1.3)*(x+1.3)+(y-0.8)*(y-0.8)));}]};
W.gfield=function(el,o){
  var st={f:o.f||'bowl',x:1,y:1,arr:true},s=svg(el,560,400,'등고선과 그래디언트 화살표'),c=ctrl(el),ou;
  radio(c,'지형:',Object.keys(GF).map(function(k){return [k,GF[k][0]];}),st.f,function(v){st.f=v;draw();});var c2=ctrl(el);btn(c2,'화살표 밭 보이기',function(b){st.arr=!st.arr;b.setAttribute('aria-pressed',st.arr?'true':'false');draw();},true);
  H('span','glabel','지도를 누르면 그 점의 그래디언트를 봐요',c2);ou=out(el);
  var X=function(v){return 280+v*70;},Y=function(v){return 200-v*70;};
  s.addEventListener('pointerdown',function(e){var r=s.getBoundingClientRect();st.x=((e.clientX-r.left)*560/r.width-280)/70;st.y=-((e.clientY-r.top)*400/r.height-200)/70;draw();});
  function draw(){s.innerHTML='';var f=GF[st.f][1],lv=[];var mn=1e9,mx=-1e9;for(var i=-3.8;i<=3.8;i+=0.2)for(var j=-2.8;j<=2.8;j+=0.2){var v=f(i,j);mn=Math.min(mn,v);mx=Math.max(mx,v);}
    for(var k=1;k<16;k++)lv.push(mn+(mx-mn)*k/16);contour(s,f,-3.9,3.9,-2.85,2.85,X,Y,lv,function(i,n){return U.heat(i/n);},70);
    if(st.arr){var gm=0,G=[];for(var a=-3.5;a<=3.5;a+=0.7)for(var b=-2.45;b<=2.45;b+=0.7){var g=grad(f,a,b);G.push([a,b,g]);gm=Math.max(gm,Math.hypot(g[0],g[1]));}
      G.forEach(function(q){var L=Math.hypot(q[2][0],q[2][1]);if(L<1e-6)return;var sc=0.55/gm;arrow(s,X(q[0]),Y(q[1]),X(q[0]+q[2][0]*sc),Y(q[1]+q[2][1]*sc),'rgba(22,33,43,.55)',1.4);});}
    var g0=grad(f,st.x,st.y),L0=Math.hypot(g0[0],g0[1]),sc0=L0?Math.min(1.2,0.9/L0*Math.max(1,L0/3)):0;
    if(L0>1e-6)arrow(s,X(st.x),Y(st.y),X(st.x+g0[0]/L0*1.1),Y(st.y+g0[1]/L0*1.1),C.r,4);E('circle',{cx:X(st.x),cy:Y(st.y),r:6,fill:C.b,stroke:'#fff','stroke-width':2},s);
    ou.innerHTML='<p>점 ('+f2(st.x,2)+', '+f2(st.y,2)+'): 높이 '+f2(f(st.x,st.y),2)+'</p><p class="r">∇f = (∂f/∂x, ∂f/∂y) = (<b>'+f2(g0[0],2)+'</b>, <b>'+f2(g0[1],2)+'</b>), 길이 |∇f| = <b>'+f2(L0,2)+'</b></p><p class="g">빨간 화살표(방향만 표시)는 등고선과 직각이고, 가장 가파른 오르막을 가리켜요. 길이가 클수록 그 자리가 가팔라요.</p>';}
  draw();
};

/* 나침반: 방향마다의 기울기 */
W.compass=function(el,o){
  var st={ang:0,x:1,y:1},f=function(x,y){return x*x+2*y*y;},s=svg(el,600,300,'방향에 따른 기울기'),c=ctrl(el),ou;
  slider(c,'걷는 방향 각도',0,360,5,st.ang,function(v){st.ang=v;draw();return v+'°';});ou=out(el);
  function draw(){s.innerHTML='';var g=grad(f,st.x,st.y),L=Math.hypot(g[0],g[1]),gA=(Math.atan2(g[1],g[0])*180/Math.PI+360)%360,a=st.ang*Math.PI/180,sl=g[0]*Math.cos(a)+g[1]*Math.sin(a);
    var cx=140,cy=150,R=100;E('circle',{cx:cx,cy:cy,r:R,fill:'#f6f8fa',stroke:C.rule},s);for(var d=0;d<360;d+=10){var aa=d*Math.PI/180,v=g[0]*Math.cos(aa)+g[1]*Math.sin(aa);E('line',{x1:cx,y1:cy,x2:cx+Math.cos(aa)*R*Math.abs(v)/L,y2:cy-Math.sin(aa)*R*Math.abs(v)/L,stroke:v>0?'rgba(201,48,44,.35)':'rgba(30,85,200,.35)','stroke-width':3},s);}
    arrow(s,cx,cy,cx+Math.cos(gA*Math.PI/180)*R,cy-Math.sin(gA*Math.PI/180)*R,C.r,2,'5 3');arrow(s,cx,cy,cx+Math.cos(a)*R*0.9,cy-Math.sin(a)*R*0.9,C.k,4);tx(s,10,20,'점 (1, 1)에서 걷는 방향',{'font-size':12,fill:C.mu});
    var X=function(v){return 300+v*0.78;},Y=function(v){return 150-v*25;};E('line',{x1:X(0),y1:Y(0),x2:X(360),y2:Y(0),stroke:C.rule},s);var pts=[];for(var t=0;t<=360;t+=3){var tt=t*Math.PI/180;pts.push([X(t),Y(g[0]*Math.cos(tt)+g[1]*Math.sin(tt))]);}
    polyline(s,pts,{stroke:C.b,'stroke-width':2.2});E('circle',{cx:X(st.ang),cy:Y(sl),r:6,fill:C.k},s);E('circle',{cx:X(gA),cy:Y(L),r:6,fill:'none',stroke:C.r,'stroke-width':2},s);tx(s,X(gA)-20,Y(L)-10,'최대',{fill:C.r,'font-size':12});tx(s,300,290,'방향 각도 0° → 360°',{'font-size':12,fill:C.mu});
    ou.innerHTML='<p>f = x² + 2y², 점 (1, 1), ∇f = (2, 4)</p><p>지금 방향 '+st.ang+'°로 걸을 때 기울기 = 2·cos '+st.ang+'° + 4·sin '+st.ang+'° = <b>'+f2(sl,2)+'</b></p><p class="r">가장 큰 기울기는 그래디언트 방향 '+f2(gA,1)+'°에서 <b>'+f2(L,3)+'</b> = |∇f| = √(2² + 4²). 정반대 방향이면 '+f2(-L,3)+'(가장 가파른 내리막).</p>';}
  draw();
};

/* 경사 하강 */
var DF={round:['둥근 그릇 f = x² + y²',function(x,y){return x*x+y*y;}],long:['길쭉한 골짜기 f = x² + 10y²',function(x,y){return x*x+10*y*y;}],saddle:['말안장 f = x² − y²',function(x,y){return x*x-y*y;}]};
W.descent=function(el,o){
  var st={f:o.f||'round',eta:o.eta||0.1,path:[]},s=svg(el,560,380,'등고선 위의 경사 하강 경로'),c=ctrl(el),c2=ctrl(el),ou;
  radio(c,'지형:',(o.keys||Object.keys(DF)).map(function(k){return [k,DF[k][0]];}),st.f,function(v){st.f=v;reset();});
  slider(c2,'학습률 η (걸음 크기)',0.01,1.2,0.01,st.eta,function(v){st.eta=v;reset();return f2(v,2);});
  var c3=ctrl(el);btn(c3,'한 걸음',function(){step(1);});btn(c3,'열 걸음',function(){step(10);});btn(c3,'처음으로',function(){reset();});ou=out(el);
  var X=function(v){return 280+v*62;},Y=function(v){return 190-v*62;};
  function reset(){st.path=[[-3.5,st.f==='saddle'?0.05:2]];draw();}
  function step(n){var f=DF[st.f][1];for(var i=0;i<n;i++){var p=st.path[st.path.length-1],g=grad(f,p[0],p[1]);var q=[p[0]-st.eta*g[0],p[1]-st.eta*g[1]];if(!isFinite(q[0])||Math.abs(q[0])>1e6||Math.abs(q[1])>1e6)break;st.path.push(q);}draw();}
  function draw(){s.innerHTML='';var f=DF[st.f][1],lv=[];for(var k=1;k<=14;k++)lv.push(st.f==='saddle'?(k-7)*1.4:k*k*0.35);contour(s,f,-4.4,4.4,-2.95,2.95,X,Y,lv,function(i,n){return U.heat(i/n);},70);
    E('circle',{cx:X(0),cy:Y(0),r:5,fill:'none',stroke:C.g,'stroke-width':2},s);
    var pts=st.path.map(function(p){return [X(Math.max(-4.5,Math.min(4.5,p[0]))),Y(Math.max(-3,Math.min(3,p[1])))];});polyline(s,pts,{stroke:C.k,'stroke-width':2});pts.forEach(function(p,i){E('circle',{cx:p[0],cy:p[1],r:i===pts.length-1?6:3,fill:i===pts.length-1?C.r:C.k},s);});
    var p=st.path[st.path.length-1],v=f(p[0],p[1]),g=grad(f,p[0],p[1]),L=Math.hypot(g[0],g[1]),n=st.path.length-1,far=Math.abs(p[0])>4.5||Math.abs(p[1])>3;
    var msg=far||L>200?'<p class="r"><b>튕겨 나갔어요.</b> 걸음이 너무 커서 골짜기를 넘어 반대편 더 높은 곳에 떨어지기를 반복해요.</p>':L<0.01?'<p class="g"><b>바닥 도착!</b> 기울기가 거의 0이에요.</p>':'<p class="a">아직 내려가는 중이에요.</p>';
    ou.innerHTML='<p>걸음 '+n+'번, 지금 위치 ('+f2(p[0],3)+', '+f2(p[1],3)+'), 높이(손실) <b>'+f2(v,4)+'</b>, 기울기 길이 '+f2(L,3)+'</p>'+msg+'<p class="note">규칙: 새 위치 = 지금 위치 − η × ∇f. 그래디언트의 반대쪽(가장 가파른 내리막)으로 걸어요.</p>';}
  reset();
};

/* 직선 맞추기: 손실을 경사 하강으로 줄이기 */
W.fitline=function(el,o){
  var D=[[1,2.1],[2,3.9],[3,6.2],[4,7.8],[5,10.1]],st={w:0.2,eta:0.02,hist:[]},s=svg(el,600,300,'점들과 직선, 손실 곡선'),c=ctrl(el),c2=ctrl(el),ou;
  slider(c,'학습률 η',0.005,0.1,0.005,st.eta,function(v){st.eta=v;return f2(v,3);});btn(c2,'한 걸음 학습',function(){stp(1);});btn(c2,'열 걸음',function(){stp(10);});btn(c2,'처음으로',function(){st.w=0.2;st.hist=[];draw();});ou=out(el);
  function loss(w){var s=0;D.forEach(function(d){s+=(w*d[0]-d[1])*(w*d[0]-d[1]);});return s/D.length;}
  function dl(w){var s=0;D.forEach(function(d){s+=2*(w*d[0]-d[1])*d[0];});return s/D.length;}
  function stp(n){for(var i=0;i<n;i++){st.hist.push(st.w);st.w=st.w-st.eta*dl(st.w);if(!isFinite(st.w)||Math.abs(st.w)>1e4)break;}draw();}
  function draw(){s.innerHTML='';var X=function(v){return 30+v*45;},Y=function(v){return 270-v*22;};E('line',{x1:X(0),y1:Y(0),x2:X(5.8),y2:Y(0),stroke:C.rule},s);E('line',{x1:X(0),y1:Y(0),x2:X(0),y2:Y(11.5),stroke:C.rule},s);
    var w=Math.max(-2,Math.min(4,st.w));polyline(s,[[X(0),Y(0)],[X(5.6),Y(Math.max(-0.5,Math.min(11.5,w*5.6)))]],{stroke:C.b,'stroke-width':2.5});D.forEach(function(d){E('circle',{cx:X(d[0]),cy:Y(d[1]),r:5,fill:C.k},s);E('line',{x1:X(d[0]),y1:Y(d[1]),x2:X(d[0]),y2:Y(Math.max(-0.5,Math.min(11.5,w*d[0]))),stroke:C.r,'stroke-dasharray':'3 2'},s);});
    tx(s,30,16,'공부 시간 x → 점수 y (예시)',{'font-size':12,fill:C.mu});
    var X2=function(v){return 340+v*60;},Y2=function(v){return 270-Math.sqrt(v)*24;};tx(s,340,16,'기울기 w에 따른 손실',{'font-size':12,fill:C.mu});var pts=[];for(var t=0;t<=4;t+=0.05)pts.push([X2(t),Y2(loss(t))]);polyline(s,pts,{stroke:C.m,'stroke-width':2});
    st.hist.forEach(function(h){if(h>=0&&h<=4)E('circle',{cx:X2(h),cy:Y2(loss(h)),r:3,fill:C.mu},s);});if(st.w>=0&&st.w<=4)E('circle',{cx:X2(st.w),cy:Y2(loss(st.w)),r:6,fill:C.r},s);
    E('line',{x1:X2(0),y1:270,x2:X2(4),y2:270,stroke:C.rule},s);[0,1,2,3,4].forEach(function(t){tx(s,X2(t)-4,286,String(t),{'font-size':11,fill:C.mu});});
    var ok=Math.abs(dl(st.w))<0.05,bad=!isFinite(st.w)||Math.abs(st.w)>50;
    ou.innerHTML='<p>모델: 점수 ≈ w × 시간. 지금 w = <b>'+(bad?'발산':f2(st.w,4))+'</b>, 학습 '+st.hist.length+'번</p><p>손실(빗나간 거리 제곱의 평균) = <b>'+(bad?'∞':f2(loss(st.w),4))+'</b>, 손실의 기울기 dL/dw = '+(bad?'—':f2(dl(st.w),4))+'</p>'+(bad?'<p class="r">학습률이 너무 커서 w가 튕겨 나갔어요. η를 줄이고 처음으로 돌아가세요.</p>':ok?'<p class="g">손실 곡선의 바닥에 도착했어요. w ≈ '+f2(st.w,3)+' → 「한 시간 더 공부하면 약 '+f2(st.w,1)+'점 오른다」는 해석.</p>':'<p class="a">빨간 점선(빗나간 거리)이 줄어드는 쪽으로 w가 움직여요.</p>');}
  draw();
};

/* 야코비안: 작은 원이 타원으로 */
var JF={linear:['직선 변환 (2x + y, x + y)',function(x,y){return [2*x+y,x+y];},[-1.5,1.5,-1.5,1.5]],
        bend:['휘는 변환 (x + 0.3y², y − 0.3x²)',function(x,y){return [x+0.3*y*y,y-0.3*x*x];},[-1.8,1.8,-1.8,1.8]],
        polar:['극좌표 (r, θ) → (r·cos θ, r·sin θ)',function(r,t){return [r*Math.cos(t),r*Math.sin(t)];},[0.3,3,0,Math.PI]]};
W.jac=function(el,o){
  var st={f:o.f||'bend',u:o.u!=null?o.u:1,v:o.v!=null?o.v:0.8,eps:0.25,du:0.3,dv:0.3},mode=o.mode||'circle';
  var s=svg(el,640,320,'입력 평면과 출력 평면'),c=ctrl(el),c2=ctrl(el),ou;radio(c,'함수 F:',(o.keys||Object.keys(JF)).map(function(k){return [k,JF[k][0]];}),st.f,function(v){st.f=v;var R=JF[v][2];st.u=(R[0]+R[1])/2;st.v=(R[2]+R[3])/2;draw();});
  if(mode==='circle')slider(c2,'원 반지름',0.05,0.6,0.05,st.eps,function(v){st.eps=v;draw();return f2(v,2);});
  else{slider(c2,'Δ₁',-0.6,0.6,0.05,st.du,function(v){st.du=v;draw();return f2(v,2);});slider(c2,'Δ₂',-0.6,0.6,0.05,st.dv,function(v){st.dv=v;draw();return f2(v,2);});}
  H('span','glabel','왼쪽 그림을 눌러 점 고르기',c2);ou=out(el);
  s.addEventListener('pointerdown',function(e){var r=s.getBoundingClientRect(),px=(e.clientX-r.left)*640/r.width,py=(e.clientY-r.top)*320/r.height;if(px>310)return;var R=JF[st.f][2];st.u=R[0]+(px-20)/280*(R[1]-R[0]);st.v=R[2]+(300-py)/280*(R[3]-R[2]);st.u=Math.max(R[0],Math.min(R[1],st.u));st.v=Math.max(R[2],Math.min(R[3],st.v));draw();});
  function draw(){s.innerHTML='';var F=JF[st.f][1],R=JF[st.f][2];var IX=function(u){return 20+(u-R[0])/(R[1]-R[0])*280;},IY=function(v){return 300-(v-R[2])/(R[3]-R[2])*280;};
    var OX=function(x){return 480+x*45;},OY=function(y){return 160-y*45;};if(st.f==='polar'){OY=function(y){return 270-y*45;};OX=function(x){return 480+x*48;};}
    E('rect',{x:20,y:20,width:280,height:280,fill:'#fafbfc',stroke:C.rule},s);E('rect',{x:330,y:10,width:300,height:300,fill:'#fafbfc',stroke:C.rule},s);tx(s,24,16,st.f==='polar'?'입력 (r, θ)':'입력 (x, y)',{'font-size':12,fill:C.mu});tx(s,334,26,'출력 F',{'font-size':12,fill:C.mu});
    for(var i=0;i<=8;i++){var a=R[0]+(R[1]-R[0])*i/8,b=R[2]+(R[3]-R[2])*i/8,p1=[],p2=[],q1=[],q2=[];for(var t=0;t<=40;t++){var tt=R[2]+(R[3]-R[2])*t/40,t2=R[0]+(R[1]-R[0])*t/40;p1.push([IX(a),IY(tt)]);p2.push([IX(t2),IY(b)]);var m1=F(a,tt),m2=F(t2,b);q1.push([OX(m1[0]),OY(m1[1])]);q2.push([OX(m2[0]),OY(m2[1])]);}
      polyline(s,p1,{stroke:'rgba(30,85,200,.25)'});polyline(s,p2,{stroke:'rgba(155,63,181,.25)'});polyline(s,q1,{stroke:'rgba(30,85,200,.35)'});polyline(s,q2,{stroke:'rgba(155,63,181,.35)'});}
    var h=1e-4,P=F(st.u,st.v),Fu=F(st.u+h,st.v),Fv=F(st.u,st.v+h),Fu2=F(st.u-h,st.v),Fv2=F(st.u,st.v-h),J=[[(Fu[0]-Fu2[0])/(2*h),(Fv[0]-Fv2[0])/(2*h)],[(Fu[1]-Fu2[1])/(2*h),(Fv[1]-Fv2[1])/(2*h)]],det=J[0][0]*J[1][1]-J[0][1]*J[1][0];
    E('circle',{cx:IX(st.u),cy:IY(st.v),r:5,fill:C.k},s);E('circle',{cx:OX(P[0]),cy:OY(P[1]),r:5,fill:C.k},s);var sx=280/(R[1]-R[0]),sy=280/(R[3]-R[2]);
    var hh='<p>점 '+(st.f==='polar'?'(r, θ) = ('+f2(st.u,2)+', '+f2(st.v*180/Math.PI,0)+'°)':'('+f2(st.u,2)+', '+f2(st.v,2)+')')+' → F = ('+f2(P[0],2)+', '+f2(P[1],2)+')</p><p class="r">야코비안 J = [['+f2(J[0][0],2)+', '+f2(J[0][1],2)+'], ['+f2(J[1][0],2)+', '+f2(J[1][1],2)+']] — 1열은 첫 입력을 조금 늘렸을 때, 2열은 둘째 입력을 조금 늘렸을 때 출력이 움직이는 화살표</p>';
    if(mode==='circle'){var e=st.eps,ci=[],co=[],ce=[];for(var k=0;k<=48;k++){var th=k/48*2*Math.PI,du=e*Math.cos(th)/sx*40,dv=e*Math.sin(th)/sy*40,q=F(st.u+du,st.v+dv);ci.push([IX(st.u+du),IY(st.v+dv)]);co.push([OX(q[0]),OY(q[1])]);ce.push([OX(P[0]+J[0][0]*du+J[0][1]*dv),OY(P[1]+J[1][0]*du+J[1][1]*dv)]);}
      polyline(s,ci,{stroke:C.g,'stroke-width':2.5});polyline(s,co,{stroke:C.g,'stroke-width':2.5});polyline(s,ce,{stroke:C.r,'stroke-width':1.8,'stroke-dasharray':'4 3'});
      hh+='<p class="g">초록: 작은 원과 그 실제 모습. 빨간 점선: J로 예측한 타원. 원이 작을수록 둘이 딱 붙어요.</p><p class="a">넓이 배율 = |det J| = |'+f2(J[0][0],2)+'×'+f2(J[1][1],2)+' − '+f2(J[0][1],2)+'×'+f2(J[1][0],2)+'| = <b>'+f2(Math.abs(det),3)+'</b>'+(st.f==='polar'?' = r. 중심에서 멀수록 같은 각도 걸음이 더 넓게 퍼져요.':'')+'</p>';}
    else{var d=[st.du,st.dv],Q=F(st.u+d[0],st.v+d[1]),A=[P[0]+J[0][0]*d[0]+J[0][1]*d[1],P[1]+J[1][0]*d[0]+J[1][1]*d[1]],err=Math.hypot(Q[0]-A[0],Q[1]-A[1]);
      arrow(s,IX(st.u),IY(st.v),IX(st.u+d[0]),IY(st.v+d[1]),C.b,2.5);arrow(s,OX(P[0]),OY(P[1]),OX(Q[0]),OY(Q[1]),C.g,2.5);arrow(s,OX(P[0]),OY(P[1]),OX(A[0]),OY(A[1]),C.r,2,'4 3');
      hh+='<p class="g">실제: F(점 + Δ) = ('+f2(Q[0],3)+', '+f2(Q[1],3)+')</p><p class="r">예측: F(점) + J·Δ = ('+f2(A[0],3)+', '+f2(A[1],3)+')</p><p class="a">차이 <b>'+f2(err,4)+'</b> — Δ를 반으로 줄이면 차이는 약 4분의 1로 줄어요.</p>';}
    ou.innerHTML=hh;}
  draw();
};

/* 연쇄: 역전파는 국소 기울기 곱하기 */
W.chain=function(el,o){
  var st={x:1},c=ctrl(el),box=H('div',null,null,el),ou;slider(c,'입력 x',-2,2,0.1,st.x,function(v){st.x=v;draw();return f2(v,1);});ou=out(el);
  function draw(){var x=st.x,u=3*x,v=u*u,y=0.5*v+1,d1=3,d2=2*u,d3=0.5,prod=d1*d2*d3,h=1e-4,num=((0.5*Math.pow(3*(x+h),2)+1)-(0.5*Math.pow(3*(x-h),2)+1))/(2*h);
    box.innerHTML='<div class="map3"><div><small>입력</small>x = '+f2(x,2)+'</div><i>→ ×3 →</i><div><small>층 1</small>u = '+f2(u,2)+'</div><i>→ 제곱 →</i><div><small>층 2</small>v = '+f2(v,2)+'</div><i>→ ×0.5 + 1 →</i><div class="now"><small>출력</small>y = '+f2(y,2)+'</div></div>';
    ou.innerHTML='<p>뒤에서부터 국소 기울기: dy/dv = <b>0.5</b>, dv/du = 2u = <b>'+f2(d2,2)+'</b>, du/dx = <b>3</b></p><p class="r">곱하기: dy/dx = 0.5 × '+f2(d2,2)+' × 3 = <b>'+f2(prod,3)+'</b></p><p class="g">검산 (x를 아주 조금 움직여 보기): '+f2(num,3)+'</p><p class="note">입력과 출력이 여러 개면 각 층의 국소 기울기가 숫자 하나가 아니라 야코비안(표)이 되고, 「곱하기」가 행렬 곱이 돼요. 역전파는 이 곱을 출력 쪽부터 차례로 계산합니다.</p>';}
  draw();
};

/* ── 조교 대결 판정 (기둥 2·3) ── */
DUELS.ellaxis=function(){var semi=[2,3,1],L=2*Math.max.apply(0,semi);return {fly:L===6,robo:false,report:'x²/4 + y²/9 + z² = 1: 축과 만나는 곳은 x = ±2, y = ±3, z = ±1. 가장 긴 지름 = 3 × 2 = <b>'+L+'</b>. 분모 9는 「반지름의 제곱」이라 지름은 √9 × 2예요.'};};
DUELS.saddlemin=function(){var f=function(x,y){return y*y-x*x;},mn=1e9;for(var k=0;k<36;k++){var t=k*Math.PI/18;mn=Math.min(mn,f(0.1*Math.cos(t),0.1*Math.sin(t)));}return {fly:mn<0,robo:false,report:'원점 높이 0. 원점에서 0.1 떨어진 둘레를 한 바퀴 돌며 재 보니 가장 낮은 값 <b>'+f2(mn,4)+'</b> (x 방향). 원점보다 낮은 곳이 바로 옆에 있으니 최저점이 아니라 「안장점」이에요.'};};
DUELS.pdx=function(){var f=function(x,y){return x*x*y;},h=1e-4,g=(f(1+h,2)-f(1-h,2))/(2*h);return {fly:Math.abs(g-4)<1e-6,robo:false,report:'f = x²y에서 y = 2는 「숫자 2」처럼 둬요. ∂f/∂x = 2x·y = 2 × 1 × 2 = <b>'+f2(g,3)+'</b>. 검산: x를 아주 조금 움직였을 때 변화율도 '+f2(g,3)+'. y를 빼먹으면 2가 나와요.'};};
DUELS.maxslope=function(){var mx=0;for(var k=0;k<3600;k++){var a=k*Math.PI/1800;mx=Math.max(mx,2*Math.cos(a)+4*Math.sin(a));}return {fly:Math.abs(mx-Math.sqrt(20))<1e-3,robo:false,report:'f = x² + 2y², 점 (1, 1), ∇f = (2, 4). 방향을 0.1°씩 3600개 돌려 기울기를 재 보니 최댓값 <b>'+f2(mx,3)+'</b> = √(2² + 4²) = √20. 2 + 4 = 6은 두 방향으로 동시에 한 걸음씩(대각선 길이 √2) 걸은 셈이라 과대 계산이에요.'};};
DUELS.lrate=function(){var x=1,eta=1.1;for(var i=0;i<10;i++)x=x-eta*2*x;return {fly:Math.abs(x)>1,robo:false,report:'f = x², 출발 x = 1, η = 1.1: 한 걸음마다 x ← x − 1.1 × 2x = −1.2x. 열 걸음 뒤 x = (−1.2)¹⁰ ≈ <b>'+f2(x,2)+'</b>. 바닥(0)에서 오히려 멀어졌어요. 이 그릇에서는 η가 1을 넘으면 발산해요.'};};
DUELS.polardet=function(){var r=2,t=0.7,h=1e-3,F=function(r,t){return [r*Math.cos(t),r*Math.sin(t)];},A=F(r,t),B=F(r+h,t),Cc=F(r,t+h),area=Math.abs((B[0]-A[0])*(Cc[1]-A[1])-(B[1]-A[1])*(Cc[0]-A[0]))/(h*h);return {fly:Math.abs(area-2)<0.01,robo:false,report:'r = 2에서 Δr × Δθ = 0.001 × 0.001짜리 작은 사각형을 보냈더니 출력 넓이가 입력의 <b>'+f2(area,3)+'배</b>. det J = cos²θ·r + r·sin²θ = r = 2와 맞아요. 회전만 하는 게 아니라 「멀리 갈수록 퍼지는」 변환이에요.'};};
})();
