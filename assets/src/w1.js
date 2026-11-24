/* 위젯 모음 1: 공용 도우미 + 3D 그리기 + 기둥 1 (좌표 · 벡터 · 행렬 · 원기둥 · 구면) */
var W={},DUELS={};
(function(){
'use strict';
var NS='http://www.w3.org/2000/svg';
function E(tag,at,par){var e=document.createElementNS(NS,tag);for(var k in at)e.setAttribute(k,at[k]);if(par)par.appendChild(e);return e;}
function H(tag,cls,html,par){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;if(par)par.appendChild(e);return e;}
function svg(el,w,h,label){var s=E('svg',{viewBox:'0 0 '+w+' '+h,width:'100%',role:'img','aria-label':label||'설명 그림'});s.style.maxWidth=w+'px';s.style.touchAction='pan-y';el.appendChild(s);return s;}
function ctrl(el){return H('div','ctrl',null,el);}
function btn(par,label,on,pressed){var b=H('button','bt',label,par);b.type='button';if(pressed!=null)b.setAttribute('aria-pressed',pressed?'true':'false');b.onclick=function(){on(b);};return b;}
function radio(par,label,opts,cur,on){if(label)H('span','glabel',label,par);var bs=opts.map(function(o){return btn(par,o[1],function(b){bs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});on(o[0]);},o[0]===cur);});return bs;}
function slider(par,label,min,max,step,val,on){H('span','glabel',label,par);var r=H('input',null,null,par);r.type='range';r.min=min;r.max=max;r.step=step;r.value=val;r.setAttribute('aria-label',label);var v=H('span','val','',par);function u(){v.textContent=on(+r.value)||'';}r.oninput=u;Promise.resolve().then(u);return r;}
function out(el){var o=H('div','insight',null,el);o.setAttribute('aria-live','polite');return o;}
function tx(s,x,y,t,at){var e=E('text',Object.assign({x:x,y:y,'font-size':13,fill:'#16212b','font-family':'inherit'},at||{}),s);e.textContent=t;return e;}
function f2(v,d){d=d==null?2:d;var r=(+v).toFixed(d);if(/^-0\.?0*$/.test(r))r=r.replace('-','');return r;}
function arrow(s,x1,y1,x2,y2,col,w,dash){var g=E('g',{},s);E('line',{x1:x1,y1:y1,x2:x2,y2:y2,stroke:col,'stroke-width':w||2.5,'stroke-dasharray':dash||'none'},g);
  var a=Math.atan2(y2-y1,x2-x1),L=Math.min(11,Math.hypot(x2-x1,y2-y1)*0.5+2);
  E('polygon',{points:[x2,y2,x2-L*Math.cos(a-0.4),y2-L*Math.sin(a-0.4),x2-L*Math.cos(a+0.4),y2-L*Math.sin(a+0.4)].map(function(v){return v.toFixed(1);}).join(' '),fill:col},g);return g;}
var C={g:'#13733a',m:'#9b3fb5',r:'#c9302c',a:'#a35c00',b:'#1e55c8',k:'#16212b',mu:'#5b6874',rule:'#d5dbe2',acc:'#2f6f8f'};
/* 3D 시점: 수평 회전 az, 내려다보는 각 el */
function view(cx,cy,S,az,el){var ca=Math.cos(az),sa=Math.sin(az),ce=Math.cos(el),se=Math.sin(el);
  return {p:function(x,y,z){var xr=x*ca-y*sa,yr=x*sa+y*ca;return [cx+S*xr,cy-S*(z*ce+yr*se),yr*ce-z*se];},az:az,el:el};}
function heat(t){t=Math.max(0,Math.min(1,t));var st=[[0,[48,110,200]],[0.35,[40,170,190]],[0.6,[120,190,80]],[0.8,[240,190,40]],[1,[220,70,50]]];
  for(var i=1;i<st.length;i++)if(t<=st[i][0]){var a=st[i-1],b=st[i],u=(t-a[0])/(b[0]-a[0]);return 'rgb('+[0,1,2].map(function(k){return Math.round(a[1][k]+u*(b[1][k]-a[1][k]));}).join(',')+')';}return 'rgb(220,70,50)';}
/* 곡면 그리기: P(u,v) → [x,y,z], 칠한 사각형을 깊이 순으로 */
function mesh(s,V,P,u0,u1,v0,v1,nu,nv,opt){opt=opt||{};var pts=[],zmin=1e9,zmax=-1e9;
  for(var i=0;i<=nu;i++){pts.push([]);for(var j=0;j<=nv;j++){var q=P(u0+(u1-u0)*i/nu,v0+(v1-v0)*j/nv);pts[i].push(q);if(q&&isFinite(q[2])){zmin=Math.min(zmin,q[2]);zmax=Math.max(zmax,q[2]);}}}
  var polys=[];for(i=0;i<nu;i++)for(j=0;j<nv;j++){var a=pts[i][j],b=pts[i+1][j],c=pts[i+1][j+1],d=pts[i][j+1];if(!a||!b||!c||!d)continue;
    var pp=[a,b,c,d].map(function(q){return V.p(q[0],q[1],q[2]);}),dep=(pp[0][2]+pp[1][2]+pp[2][2]+pp[3][2])/4,zc=(a[2]+b[2]+c[2]+d[2])/4;polys.push([dep,pp,zc]);}
  polys.sort(function(x,y){return y[0]-x[0];});
  polys.forEach(function(q){E('polygon',{points:q[1].map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' '),fill:opt.color||heat((q[2]-zmin)/((zmax-zmin)||1)),'fill-opacity':opt.op||0.82,stroke:'rgba(22,33,43,.35)','stroke-width':0.6},s);});
  return {zmin:zmin,zmax:zmax};}
function axes3(s,V,L,lab){lab=lab||['x','y','z'];[[L,0,0],[0,L,0],[0,0,L]].forEach(function(e,i){var o=V.p(0,0,0),p=V.p(e[0],e[1],e[2]);arrow(s,o[0],o[1],p[0],p[1],C.mu,1.6);tx(s,p[0]+4,p[1]-4,lab[i],{fill:C.mu,'font-weight':700});});}
function drag(s,get,set,redraw){var on=false,lx=0,ly=0;s.style.cursor='grab';
  s.addEventListener('pointerdown',function(e){on=true;lx=e.clientX;ly=e.clientY;try{s.setPointerCapture(e.pointerId);}catch(er){}});
  s.addEventListener('pointermove',function(e){if(!on)return;var g=get();set(g[0]+(e.clientX-lx)*0.01,Math.max(-0.2,Math.min(1.45,g[1]+(e.clientY-ly)*0.01)));lx=e.clientX;ly=e.clientY;redraw();});
  ['pointerup','pointercancel','pointerleave'].forEach(function(k){s.addEventListener(k,function(){on=false;});});}
function fit(P,u0,u1,v0,v1,az,el,x0,y0,w,h,extra){var V=view(0,0,1,az,el),mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;function add(q){if(!q||!isFinite(q[2]))return;var r=V.p(q[0],q[1],q[2]);mnx=Math.min(mnx,r[0]);mxx=Math.max(mxx,r[0]);mny=Math.min(mny,r[1]);mxy=Math.max(mxy,r[1]);}
  for(var i=0;i<=16;i++)for(var j=0;j<=16;j++)add(P(u0+(u1-u0)*i/16,v0+(v1-v0)*j/16));(extra||[]).forEach(add);
  var S=Math.min(w/((mxx-mnx)||1),h/((mxy-mny)||1),90);return view(x0+w/2-S*(mnx+mxx)/2,y0+h/2-S*(mny+mxy)/2,S,az,el);}
window.WU={fit:fit,E:E,H:H,svg:svg,ctrl:ctrl,btn:btn,radio:radio,slider:slider,out:out,tx:tx,f2:f2,arrow:arrow,view:view,heat:heat,mesh:mesh,axes3:axes3,drag:drag};
window.WC=C;
function polyline(s,pts,at){return E('polyline',Object.assign({points:pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' '),fill:'none'},at),s);}
WU.polyline=polyline;

/* 큐브 좌표: mode point(점의 주소) · dist(두 점 거리) · data(데이터 점) · grad(온도 큐브의 기울기) */
W.cube=function(el,o){
  var mode=o.mode||'point',st={x:o.x!=null?o.x:3,y:o.y!=null?o.y:2,z:o.z!=null?o.z:1,az:-0.6,el:0.42,bx:1,by:4,bz:3,pick:0};st.az=-2.2;
  var s=svg(el,560,380,'0부터 4까지의 큐브 안에 놓인 점과 좌표축'),c=ctrl(el),ou;
  slider(c,'x (앞뒤)',0,4,0.5,st.x,function(v){st.x=v;draw();return f2(v,1);});
  slider(c,'y (좌우)',0,4,0.5,st.y,function(v){st.y=v;draw();return f2(v,1);});
  slider(c,'z (위아래)',0,4,0.5,st.z,function(v){st.z=v;draw();return f2(v,1);});
  var c2=ctrl(el);slider(c2,'보는 방향 돌리기',-3.1,3.1,0.05,st.az,function(v){st.az=v;draw();return '';});
  var DATA=[['민수',3.2,1.4,2.0],['지아',1.0,3.5,1.2],['도윤',2.8,1.8,2.4],['서연',0.8,0.6,3.6]];
  if(mode==='data'){var c3=ctrl(el);radio(c3,'비교할 사람:',DATA.map(function(d,i){return [i,d[0]];}),0,function(v){st.pick=v;draw();});}
  ou=out(el);drag(s,function(){return [st.az,st.el];},function(a,e){st.az=a;st.el=e;},draw);
  function T(x,y,z){return x+y*2+z*z/4;}
  function draw(){s.innerHTML='';var V=view(280,250,46,st.az,st.el),p=V.p;
    for(var k=0;k<=4;k++){[[k,0,0,k,4,0],[0,k,0,4,k,0]].forEach(function(e){var a=p(e[0],e[1],e[2]),b=p(e[3],e[4],e[5]);E('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:C.rule},s);});}
    var cube=[[0,0,0,4,0,0],[0,4,0,4,4,0],[0,0,4,4,0,4],[0,4,4,4,4,4],[0,0,0,0,4,0],[4,0,0,4,4,0],[0,0,4,0,4,4],[4,0,4,4,4,4],[0,0,0,0,0,4],[4,0,0,4,0,4],[0,4,0,0,4,4],[4,4,0,4,4,4]];
    cube.forEach(function(e){var a=p(e[0],e[1],e[2]),b=p(e[3],e[4],e[5]);E('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:'#c9a77a','stroke-width':1.4},s);});
    axes3(s,V,5);
    function dot(x,y,z,col,lab,r){var P=p(x,y,z),F=p(x,y,0);E('line',{x1:P[0],y1:P[1],x2:F[0],y2:F[1],stroke:col,'stroke-dasharray':'4 3'},s);
      var Ax=p(x,0,0),Ay=p(0,y,0);E('line',{x1:F[0],y1:F[1],x2:Ax[0],y2:Ax[1],stroke:col,'stroke-dasharray':'2 3',opacity:.6},s);E('line',{x1:F[0],y1:F[1],x2:Ay[0],y2:Ay[1],stroke:col,'stroke-dasharray':'2 3',opacity:.6},s);
      E('circle',{cx:F[0],cy:F[1],r:3,fill:col,opacity:.5},s);E('circle',{cx:P[0],cy:P[1],r:r||7,fill:col,stroke:'#fff','stroke-width':2},s);if(lab)tx(s,P[0]+9,P[1]-8,lab,{fill:col,'font-weight':700});return P;}
    if(mode==='point'){dot(st.x,st.y,st.z,C.b,'P');
      ou.innerHTML='<p>점 P의 주소는 <b>('+f2(st.x,1)+', '+f2(st.y,1)+', '+f2(st.z,1)+')</b>예요. 바닥 그림자는 ('+f2(st.x,1)+', '+f2(st.y,1)+', 0).</p><p class="g">출발점(원점)에서 x 방향으로 '+f2(st.x,1)+', y 방향으로 '+f2(st.y,1)+', 위로 '+f2(st.z,1)+'만큼 가면 P에 닿아요. 숫자 세 개면 큐브 안 어디든 하나로 정해집니다.</p>';}
    if(mode==='dist'){var A=dot(st.x,st.y,st.z,C.b,'A'),B=dot(st.bx,st.by,st.bz,C.m,'B'),Fa=p(st.x,st.y,st.bz),dx=st.bx-st.x,dy=st.by-st.y,dz=st.bz-st.z;
      var Mid=p(st.bx,st.by,st.z);E('line',{x1:A[0],y1:A[1],x2:Mid[0],y2:Mid[1],stroke:C.a,'stroke-width':2.5},s);E('line',{x1:Mid[0],y1:Mid[1],x2:B[0],y2:B[1],stroke:C.g,'stroke-width':2.5},s);E('line',{x1:A[0],y1:A[1],x2:B[0],y2:B[1],stroke:C.r,'stroke-width':3},s);
      var fl=Math.hypot(dx,dy),d=Math.hypot(dx,dy,dz);
      ou.innerHTML='<p>A('+f2(st.x,1)+', '+f2(st.y,1)+', '+f2(st.z,1)+') → B(1, 4, 3): 차이 Δx = '+f2(dx,1)+', Δy = '+f2(dy,1)+', Δz = '+f2(dz,1)+'</p>'+
        '<p class="a">① 같은 높이에서 바닥 방향 거리(주황): √('+f2(dx*dx,2)+' + '+f2(dy*dy,2)+') = <b>'+f2(fl)+'</b></p><p class="g">② 그 끝에서 위로(초록): '+f2(Math.abs(dz),1)+'</p><p class="r">③ 직선 거리(빨강) = √('+f2(fl*fl,2)+' + '+f2(dz*dz,2)+') = <b>'+f2(d)+'</b> — 피타고라스를 두 번 쓴 것</p>';}
    if(mode==='data'){var q=DATA[st.pick],best=null,bd=1e9;DATA.forEach(function(d,i){dot(d[1],d[2],d[3],i===st.pick?C.b:C.mu,d[0],i===st.pick?8:6);if(i!==st.pick){var dd=Math.hypot(d[1]-q[1],d[2]-q[2],d[3]-q[3]);if(dd<bd){bd=dd;best=d;}}});
      var A2=p(q[1],q[2],q[3]),B2=p(best[1],best[2],best[3]);E('line',{x1:A2[0],y1:A2[1],x2:B2[0],y2:B2[1],stroke:C.g,'stroke-width':3,'stroke-dasharray':'6 4'},s);
      ou.innerHTML='<p>'+q[0]+'의 점: (운동 '+q[1]+', 독서 '+q[2]+', 게임 '+q[3]+') 시간/주</p><p class="g">가장 가까운 점은 <b>'+best[0]+'</b> (거리 '+f2(bd)+'). 추천 AI는 「가까운 점 = 취향이 비슷한 사람」으로 봐요.</p>';}
    if(mode==='grad'){var P0=dot(st.x,st.y,st.z,C.b,'P'),g=[1,2,st.z/2],L=0.8,Q=p(st.x+g[0]*L,st.y+g[1]*L,st.z+g[2]*L);arrow(s,P0[0],P0[1],Q[0],Q[1],C.r,3.5);
      ou.innerHTML='<p>방 안 온도 T(x, y, z) = x + 2y + z²/4 (예시). P에서 T = <b>'+f2(T(st.x,st.y,st.z))+'</b>℃</p><p class="r">기울기 화살표 ∇T = (∂T/∂x, ∂T/∂y, ∂T/∂z) = (1, 2, '+f2(st.z/2)+'), 길이 '+f2(Math.hypot(1,2,st.z/2))+'</p><p class="g">빨간 화살표 쪽으로 가면 온도가 가장 빨리 올라요. 높이 z가 클수록 위쪽 성분이 커집니다.</p>';}
  }
  draw();
};

/* 화살표(벡터): mode one · add · unit */
W.vec=function(el,o){
  var mode=o.mode||'one',st={ax:3,ay:2,bx:-1,by:2,k:2};
  var s=svg(el,520,360,'모눈 위의 화살표'),c=ctrl(el),ou;
  slider(c,'가로 성분 a₁',-4,4,1,st.ax,function(v){st.ax=v;draw();return v;});slider(c,'세로 성분 a₂',-4,4,1,st.ay,function(v){st.ay=v;draw();return v;});
  if(mode==='add'){var c2=ctrl(el);slider(c2,'b₁',-4,4,1,st.bx,function(v){st.bx=v;draw();return v;});slider(c2,'b₂',-4,4,1,st.by,function(v){st.by=v;draw();return v;});}
  if(mode==='unit'){var c3=ctrl(el);slider(c3,'몇 배 k',-2,3,0.5,st.k,function(v){st.k=v;draw();return f2(v,1)+'배';});}
  ou=out(el);var S=34,X=function(v){return 260+v*S;},Y=function(v){return 180-v*S;};
  function grid(){for(var i=-7;i<=7;i++){E('line',{x1:X(i),y1:10,x2:X(i),y2:350,stroke:C.rule,'stroke-width':i?1:2},s);}for(var j=-5;j<=5;j++){E('line',{x1:10,y1:Y(j),x2:510,y2:Y(j),stroke:C.rule,'stroke-width':j?1:2},s);}}
  function draw(){s.innerHTML='';grid();var a=[st.ax,st.ay],L=Math.hypot(a[0],a[1]);
    if(mode==='one'){if(L)arrow(s,X(0),Y(0),X(a[0]),Y(a[1]),C.b,3.5);E('line',{x1:X(0),y1:Y(0),x2:X(a[0]),y2:Y(0),stroke:C.a,'stroke-width':2,'stroke-dasharray':'5 3'},s);E('line',{x1:X(a[0]),y1:Y(0),x2:X(a[0]),y2:Y(a[1]),stroke:C.g,'stroke-width':2,'stroke-dasharray':'5 3'},s);
      var ang=Math.atan2(a[1],a[0])*180/Math.PI;ou.innerHTML='<p>화살표 a = <b>('+a[0]+', '+a[1]+')</b> — 오른쪽으로 '+a[0]+', 위로 '+a[1]+'</p><p class="g">길이(크기) |a| = √('+a[0]+'² + '+a[1]+'²) = √'+(a[0]*a[0]+a[1]*a[1])+' = <b>'+f2(L)+'</b></p><p>방향: 오른쪽 가로선에서 '+(L?f2(ang,0)+'° 돌아간 쪽':'없음 (길이 0인 화살표)')+'</p>';}
    if(mode==='add'){var b=[st.bx,st.by],sm=[a[0]+b[0],a[1]+b[1]];arrow(s,X(0),Y(0),X(a[0]),Y(a[1]),C.b,3);arrow(s,X(a[0]),Y(a[1]),X(sm[0]),Y(sm[1]),C.m,3);arrow(s,X(0),Y(0),X(sm[0]),Y(sm[1]),C.r,3.5,'6 3');
      var la=L,lb=Math.hypot(b[0],b[1]),ls=Math.hypot(sm[0],sm[1]);
      ou.innerHTML='<p><span style="color:#1e55c8">a = ('+a+')</span> 끝에 <span style="color:#9b3fb5">b = ('+b+')</span>를 이어 붙이면, <b style="color:#c9302c">a + b = ('+sm[0]+', '+sm[1]+')</b> — 성분끼리 더해요.</p><p class="a">길이: |a| + |b| = '+f2(la)+' + '+f2(lb)+' = '+f2(la+lb)+', 하지만 |a + b| = <b>'+f2(ls)+'</b>. 방향이 다르면 길이는 그냥 더해지지 않아요.</p>';}
    if(mode==='unit'){var k=st.k,ka=[k*a[0],k*a[1]];if(L){var u=[a[0]/L,a[1]/L];arrow(s,X(0),Y(0),X(ka[0]),Y(ka[1]),C.m,6);arrow(s,X(0),Y(0),X(a[0]),Y(a[1]),C.b,3);arrow(s,X(0),Y(0),X(u[0]),Y(u[1]),C.r,3.5);
      E('circle',{cx:X(0),cy:Y(0),r:S,fill:'none',stroke:C.r,'stroke-dasharray':'3 3'},s);
      ou.innerHTML='<p><span style="color:#1e55c8">a = ('+a+')</span>, 길이 '+f2(L)+'. <span style="color:#9b3fb5">'+f2(k,1)+'a = ('+f2(ka[0],1)+', '+f2(ka[1],1)+')</span> — '+(k<0?'방향이 뒤집히고 ':'')+'길이가 '+f2(Math.abs(k),1)+'배.</p><p class="r">길이 1로 줄인 단위 화살표 â = a / |a| = ('+f2(u[0])+', '+f2(u[1])+') — 빨간 점선 원(반지름 1) 위에 끝이 닿아요. 「방향만」 담은 화살표예요.</p><p>표준 단위 화살표: x̂ = (1, 0), ŷ = (0, 1). 그래서 a = '+a[0]+'x̂ + '+a[1]+'ŷ 로도 써요.</p>';}
      else ou.innerHTML='<p class="a">길이 0인 화살표는 방향이 없어서 단위 화살표로 만들 수 없어요(0으로 나눌 수 없음).</p>';}
  }
  draw();
};

/* 숫자 표(행렬) 읽기: 행·열·전치 */
W.mtable=function(el,o){
  var M=o.M||[[80,95],[70,60],[90,85]],rn=o.rows||['시아','모아','하루'],cn=o.cols||['수학','과학'],T=false,sel=[0,0];
  var box=H('div',null,null,el),c=ctrl(el),ou;btn(c,'행과 열 바꾸기 (전치)',function(b){T=!T;b.setAttribute('aria-pressed',T?'true':'false');sel=[0,0];draw();},false);ou=out(el);
  function draw(){var A=T?M[0].map(function(_,j){return M.map(function(r){return r[j];});}):M,R=T?cn:rn,Cn=T?rn:cn;
    var h='<div class="tw"><table class="tb" style="max-width:420px"><thead><tr><th></th>'+Cn.map(function(x,j){return '<th>'+(j+1)+'열<br><small>'+x+'</small></th>';}).join('')+'</tr></thead><tbody>';
    A.forEach(function(r,i){h+='<tr><th>'+(i+1)+'행 <small>'+R[i]+'</small></th>'+r.map(function(v,j){var on=i===sel[0]&&j===sel[1];return '<td><button type="button" class="bt" data-i="'+i+'" data-j="'+j+'" aria-pressed="'+on+'">'+v+'</button></td>';}).join('')+'</tr>';});
    box.innerHTML=h+'</tbody></table></div>';[].forEach.call(box.querySelectorAll('button'),function(b){b.onclick=function(){sel=[+b.dataset.i,+b.dataset.j];draw();};});
    var v=A[sel[0]][sel[1]];ou.innerHTML='<p>고른 수 <b>'+v+'</b> = '+(sel[0]+1)+'행 '+(sel[1]+1)+'열 → 기호로 a<sub>'+(sel[0]+1)+(sel[1]+1)+'</sub> = '+v+' ('+R[sel[0]]+'의 '+Cn[sel[1]]+')</p><p class="g">이 표의 모양: <b>'+A.length+' × '+A[0].length+'</b> (행 '+A.length+'개, 열 '+A[0].length+'개)'+(T?' — 전치하면 행과 열이 서로 바뀌어요.':'')+'</p>';}
  draw();
};

/* 행렬 × 벡터, 행렬 = 변환 기계 */
W.mat=function(el,o){
  var st={a:o.a!=null?o.a:2,b:o.b!=null?o.b:1,c:o.c!=null?o.c:0,d:o.d!=null?o.d:1,vx:1,vy:2},mode=o.mode||'mv';
  var s=svg(el,560,360,'행렬이 모눈과 원을 바꾸는 모습'),c=ctrl(el),c2=ctrl(el),ou;
  slider(c,'a (1행 1열)',-2,3,0.5,st.a,function(v){st.a=v;draw();return f2(v,1);});slider(c,'b (1행 2열)',-2,3,0.5,st.b,function(v){st.b=v;draw();return f2(v,1);});
  slider(c2,'c (2행 1열)',-2,3,0.5,st.c,function(v){st.c=v;draw();return f2(v,1);});slider(c2,'d (2행 2열)',-2,3,0.5,st.d,function(v){st.d=v;draw();return f2(v,1);});
  if(mode==='mv'){var c3=ctrl(el);slider(c3,'v₁',-2,2,1,st.vx,function(v){st.vx=v;draw();return v;});slider(c3,'v₂',-2,2,1,st.vy,function(v){st.vy=v;draw();return v;});}
  ou=out(el);var S=28,X=function(v){return 280+v*S;},Y=function(v){return 180-v*S;};
  function M(x,y){return [st.a*x+st.b*y,st.c*x+st.d*y];}
  function draw(){s.innerHTML='';for(var i=-9;i<=9;i++)E('line',{x1:X(i),y1:5,x2:X(i),y2:355,stroke:'#eef2f6'},s);for(var j=-6;j<=6;j++)E('line',{x1:5,y1:Y(j),x2:555,y2:Y(j),stroke:'#eef2f6'},s);
    for(i=-4;i<=4;i++){var p1=[],p2=[];for(var t=-4;t<=4;t+=0.5){var q=M(i,t),r=M(t,i);p1.push([X(q[0]),Y(q[1])]);p2.push([X(r[0]),Y(r[1])]);}polyline(s,p1,{stroke:'rgba(30,85,200,.28)'});polyline(s,p2,{stroke:'rgba(30,85,200,.28)'});}
    var sq=[[0,0],[1,0],[1,1],[0,1]].map(function(p){var q=M(p[0],p[1]);return X(q[0]).toFixed(1)+','+Y(q[1]).toFixed(1);});E('polygon',{points:sq.join(' '),fill:'rgba(253,226,150,.7)',stroke:C.a,'stroke-width':2},s);
    var ci=[],cc=[];for(var k=0;k<=60;k++){var th=k/60*2*Math.PI,cx=Math.cos(th),cy=Math.sin(th),m=M(cx,cy);ci.push([X(cx),Y(cy)]);cc.push([X(m[0]),Y(m[1])]);}
    polyline(s,ci,{stroke:C.mu,'stroke-dasharray':'4 3'});polyline(s,cc,{stroke:C.g,'stroke-width':2.5});
    var e1=M(1,0),e2=M(0,1);arrow(s,X(0),Y(0),X(e1[0]),Y(e1[1]),C.r,3);arrow(s,X(0),Y(0),X(e2[0]),Y(e2[1]),C.m,3);
    var det=st.a*st.d-st.b*st.c,h='<p>행렬 A = [['+f2(st.a,1)+', '+f2(st.b,1)+'], ['+f2(st.c,1)+', '+f2(st.d,1)+']] — 빨강은 x̂ = (1, 0)이 간 곳 (1열), 보라는 ŷ = (0, 1)이 간 곳 (2열).</p>';
    if(mode==='mv'){var v=[st.vx,st.vy],Av=M(v[0],v[1]);arrow(s,X(0),Y(0),X(v[0]),Y(v[1]),C.mu,2.5,'5 3');arrow(s,X(0),Y(0),X(Av[0]),Y(Av[1]),C.b,4);
      h+='<p class="b" style="color:#1e55c8">A·v: 1행 → '+f2(st.a,1)+'×'+v[0]+' + '+f2(st.b,1)+'×'+v[1]+' = <b>'+f2(Av[0],1)+'</b>, 2행 → '+f2(st.c,1)+'×'+v[0]+' + '+f2(st.d,1)+'×'+v[1]+' = <b>'+f2(Av[1],1)+'</b> → A·v = ('+f2(Av[0],1)+', '+f2(Av[1],1)+')</p>';}
    h+='<p class="'+(det<0?'r':det===0?'a':'g')+'">노란 넓이 1의 정사각형 → 넓이 |ad − bc| = |'+f2(det,2)+'| 인 평행사변형. 점선 원은 초록 '+(det===0?'선분으로 납작해져요(넓이 0).':'타원이 돼요.')+(det<0?' (부호가 음수라 앞뒤가 뒤집힘)':'')+'</p>';ou.innerHTML=h;}
  draw();
};

/* 원기둥 좌표 (s, φ, z) */
W.cyl=function(el,o){
  var st={s:2,phi:60,z:1.5,az:-2.2,el:0.38},s=svg(el,560,380,'원기둥 좌표의 점'),c=ctrl(el),ou;
  slider(c,'s (중심에서 거리)',0,3,0.25,st.s,function(v){st.s=v;draw();return f2(v,2);});slider(c,'φ (도는 각)',0,360,15,st.phi,function(v){st.phi=v;draw();return v+'°';});slider(c,'z (높이)',0,3,0.25,st.z,function(v){st.z=v;draw();return f2(v,2);});
  ou=out(el);drag(s,function(){return [st.az,st.el];},function(a,e){st.az=a;st.el=e;},draw);
  function draw(){s.innerHTML='';var V=view(280,260,52,st.az,st.el),p=V.p,R=3;
    [0,3].forEach(function(h){var pts=[];for(var k=0;k<=72;k++){var t=k/72*2*Math.PI;pts.push(p(R*Math.cos(t),R*Math.sin(t),h));}polyline(s,pts,{stroke:'#9fc7d6','stroke-width':1.5});});
    [0,1,2,3].forEach(function(k){var t=k*Math.PI/2,a=p(R*Math.cos(t),R*Math.sin(t),0),b=p(R*Math.cos(t),R*Math.sin(t),3);E('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:'#cfe3ea'},s);});
    axes3(s,V,3.8);var ph=st.phi*Math.PI/180,x=st.s*Math.cos(ph),y=st.s*Math.sin(ph);
    var arc=[];for(var k2=0;k2<=30;k2++){var t2=ph*k2/30;arc.push(p(0.8*Math.cos(t2),0.8*Math.sin(t2),0));}polyline(s,arc,{stroke:C.m,'stroke-width':2.5});var am=p(1.05*Math.cos(ph/2),1.05*Math.sin(ph/2),0);tx(s,am[0],am[1],'φ',{fill:C.m,'font-weight':700});
    var O=p(0,0,0),F=p(x,y,0),P=p(x,y,st.z);E('line',{x1:O[0],y1:O[1],x2:F[0],y2:F[1],stroke:C.r,'stroke-width':3},s);tx(s,(O[0]+F[0])/2,(O[1]+F[1])/2+16,'s',{fill:C.r,'font-weight':700});
    E('line',{x1:F[0],y1:F[1],x2:P[0],y2:P[1],stroke:C.g,'stroke-width':3},s);E('circle',{cx:P[0],cy:P[1],r:7,fill:C.b,stroke:'#fff','stroke-width':2},s);tx(s,P[0]+9,P[1]-6,'P',{fill:C.b,'font-weight':700});
    ou.innerHTML='<p>원기둥 주소 <b>(s, φ, z) = ('+f2(st.s,2)+', '+st.phi+'°, '+f2(st.z,2)+')</b></p><p class="g">상자 주소로 바꾸면: x = s·cos φ = '+f2(st.s,2)+' × '+f2(Math.cos(ph),3)+' = <b>'+f2(x)+'</b>, y = s·sin φ = '+f2(st.s,2)+' × '+f2(Math.sin(ph),3)+' = <b>'+f2(y)+'</b>, z = <b>'+f2(st.z,2)+'</b></p><p class="note">s가 같은 점을 모두 모으면 원기둥 벽, z가 같은 점을 모으면 둥근 판이 돼요.</p>';}
  draw();
};

/* 구면 좌표 (r, θ, φ) — θ는 북극에서 내려온 각 */
W.sph=function(el,o){
  var st={r:2.5,th:60,phi:45,az:-2.2,el:0.35},s=svg(el,560,400,'구면 좌표의 점'),c=ctrl(el),ou;
  slider(c,'r (중심에서 거리)',0,3,0.25,st.r,function(v){st.r=v;draw();return f2(v,2);});slider(c,'θ (북극에서 내려온 각)',0,180,15,st.th,function(v){st.th=v;draw();return v+'°';});slider(c,'φ (가로로 도는 각)',0,360,15,st.phi,function(v){st.phi=v;draw();return v+'°';});
  ou=out(el);drag(s,function(){return [st.az,st.el];},function(a,e){st.az=a;st.el=e;},draw);
  function draw(){s.innerHTML='';var V=view(280,210,56,st.az,st.el),p=V.p,R=st.r||0.01;
    [30,60,90,120,150].forEach(function(lat){var t=lat*Math.PI/180,pts=[];for(var k=0;k<=72;k++){var f=k/72*2*Math.PI;pts.push(p(R*Math.sin(t)*Math.cos(f),R*Math.sin(t)*Math.sin(f),R*Math.cos(t)));}polyline(s,pts,{stroke:lat===90?'#9fc7d6':'#dbe9ef','stroke-width':lat===90?1.8:1});});
    for(var m=0;m<12;m++){var f0=m*Math.PI/6,pts2=[];for(var k3=0;k3<=36;k3++){var t3=k3/36*Math.PI;pts2.push(p(R*Math.sin(t3)*Math.cos(f0),R*Math.sin(t3)*Math.sin(f0),R*Math.cos(t3)));}polyline(s,pts2,{stroke:'#e6eef2'});}
    axes3(s,V,3.6);var th=st.th*Math.PI/180,ph=st.phi*Math.PI/180,x=st.r*Math.sin(th)*Math.cos(ph),y=st.r*Math.sin(th)*Math.sin(ph),z=st.r*Math.cos(th);
    var O=p(0,0,0),P=p(x,y,z),F=p(x,y,0);E('line',{x1:O[0],y1:O[1],x2:P[0],y2:P[1],stroke:C.r,'stroke-width':3},s);tx(s,(O[0]+P[0])/2-12,(O[1]+P[1])/2,'r',{fill:C.r,'font-weight':700});
    E('line',{x1:P[0],y1:P[1],x2:F[0],y2:F[1],stroke:C.mu,'stroke-dasharray':'4 3'},s);E('line',{x1:O[0],y1:O[1],x2:F[0],y2:F[1],stroke:C.mu,'stroke-dasharray':'4 3'},s);
    var a1=[];for(var k4=0;k4<=20;k4++){var tt=th*k4/20;a1.push(p(0.7*Math.sin(tt)*Math.cos(ph),0.7*Math.sin(tt)*Math.sin(ph),0.7*Math.cos(tt)));}polyline(s,a1,{stroke:C.g,'stroke-width':2.5});var tm=p(0.95*Math.sin(th/2)*Math.cos(ph),0.95*Math.sin(th/2)*Math.sin(ph),0.95*Math.cos(th/2));tx(s,tm[0],tm[1],'θ',{fill:C.g,'font-weight':700});
    var a2=[];for(var k5=0;k5<=20;k5++){var ff=ph*k5/20;a2.push(p(0.6*Math.cos(ff),0.6*Math.sin(ff),0));}polyline(s,a2,{stroke:C.m,'stroke-width':2.5});var fm=p(0.85*Math.cos(ph/2),0.85*Math.sin(ph/2),0);tx(s,fm[0],fm[1],'φ',{fill:C.m,'font-weight':700});
    E('circle',{cx:P[0],cy:P[1],r:7,fill:C.b,stroke:'#fff','stroke-width':2},s);tx(s,P[0]+9,P[1]-6,'P',{fill:C.b,'font-weight':700});
    var lat=90-st.th;ou.innerHTML='<p>구면 주소 <b>(r, θ, φ) = ('+f2(st.r,2)+', '+st.th+'°, '+st.phi+'°)</b> — 지구본으로 치면 '+(lat>0?'북위 '+lat+'°':lat<0?'남위 '+(-lat)+'°':'적도')+', 경도 '+st.phi+'°</p>'+
      '<p class="g">x = r·sin θ·cos φ = <b>'+f2(x)+'</b>, y = r·sin θ·sin φ = <b>'+f2(y)+'</b>, z = r·cos θ = <b>'+f2(z)+'</b></p><p class="note">바닥 그림자까지의 거리(원기둥의 s)는 r·sin θ = '+f2(st.r*Math.sin(th))+'. θ = 0°(북극)이면 φ를 아무리 돌려도 같은 점이에요.</p>';}
  draw();
};

/* 같은 모양, 세 가지 주소 식 */
W.shapeeq=function(el,o){
  var SH=o.shapes||[['wall','원기둥 벽 (반지름 2)','x² + y² = 4','s = 2','r·sin θ = 2'],['floor','높이 1의 바닥판','z = 1','z = 1','r·cos θ = 1'],['ball','공 껍질 (반지름 2)','x² + y² + z² = 4','s² + z² = 4','r = 2'],['cone','45° 원뿔','z² = x² + y²','z = s (위쪽)','θ = 45°'],['half','반 평면 (φ = 90° 쪽 벽)','x = 0, y ≥ 0','φ = 90°','φ = 90°']];
  var cur=0,s=svg(el,540,300,'고른 모양'),c=ctrl(el),ou;radio(c,'모양:',SH.map(function(x,i){return [i,x[1]];}),0,function(v){cur=v;draw();});ou=out(el);
  function draw(){s.innerHTML='';var V=view(270,200,40,-2.2,0.4),p=V.p,k=SH[cur][0];axes3(s,V,3.4);
    if(k==='wall')mesh(s,V,function(u,v){return [2*Math.cos(v),2*Math.sin(v),u];},0,2.5,0,2*Math.PI,4,28,{color:'#7fb7d0'});
    if(k==='floor')mesh(s,V,function(u,v){return [u,v,1];},-2.5,2.5,-2.5,2.5,6,6,{color:'#f2c96b'});
    if(k==='ball')mesh(s,V,function(u,v){return [2*Math.sin(u)*Math.cos(v),2*Math.sin(u)*Math.sin(v),2*Math.cos(u)];},0,Math.PI,0,2*Math.PI,14,24,{color:'#8fc9a0'});
    if(k==='cone')mesh(s,V,function(u,v){return [u*Math.cos(v),u*Math.sin(v),u];},0,2.4,0,2*Math.PI,5,28,{color:'#e8a67a'});
    if(k==='half')mesh(s,V,function(u,v){return [0,u,v];},0,2.6,0,2.6,4,4,{color:'#c3a6e0'});
    var r=SH[cur];ou.innerHTML='<div class="tw"><table class="tb"><thead><tr><th>상자 좌표 (x, y, z)</th><th>원기둥 좌표 (s, φ, z)</th><th>구면 좌표 (r, θ, φ)</th></tr></thead><tbody><tr><td>'+r[2]+'</td><td>'+r[3]+'</td><td>'+r[4]+'</td></tr></tbody></table></div><p class="g">모양에 맞는 좌표를 고르면 식이 짧아져요. 가장 짧은 식이 그 모양의 「제집」 좌표입니다.</p>';}
  draw();
};

/* 카드 묶음: o.cards=[[제목, 내용], ...] */
W.cards=function(el,o){
  var c=ctrl(el),box=H('div','insight',null,el),bs;box.setAttribute('aria-live','polite');
  bs=o.cards.map(function(cd,i){return btn(c,cd[0],function(b){bs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});box.innerHTML=cd[1];},i===0);});
  box.innerHTML=o.cards[0][1];
};

/* ── 조교 대결 판정 (기둥 1) ── */
DUELS.cubediag=function(){var d=Math.sqrt(16+16+16);return {fly:Math.abs(d-6.93)<0.01,robo:false,report:'한 변 4인 큐브의 대각선: 바닥 대각선 √(4² + 4²) = √32 ≈ 5.66, 다시 위로 4 → √(32 + 16) = √48 ≈ <b>'+f2(d)+'</b>. 걸어서 가는 길(4 + 4 + 4 = 12)과 날아가는 직선은 달라요.'};};
DUELS.vecadd=function(){var L=Math.hypot(3,4);return {fly:L===5,robo:false,report:'a = (3, 0), b = (0, 4) → a + b = (3, 4), 길이 √(9 + 16) = <b>'+L+'</b>. |a| + |b| = 7은 두 화살표가 같은 방향일 때만 맞아요.'};};
DUELS.matvec=function(){var A=[[2,1],[0,3]],v=[1,2],Av=[A[0][0]*v[0]+A[0][1]*v[1],A[1][0]*v[0]+A[1][1]*v[1]];return {fly:false,robo:Av[0]===4&&Av[1]===6,report:'A·v의 1행: 2×1 + 1×2 = <b>'+Av[0]+'</b>, 2행: 0×1 + 3×2 = <b>'+Av[1]+'</b> → (4, 6). 행렬 × 벡터는 「행 하나와 벡터를 짝지어 곱해 더하기」로 정해진 순서가 있어요. 초파리의 (2, 7)은 순서를 바꿔 v를 왼쪽에 둔 다른 계산이에요.'};};
DUELS.cylx=function(){var ph=Math.PI/2,x=2*Math.cos(ph),y=2*Math.sin(ph);return {fly:Math.abs(x)<1e-9&&Math.abs(y-2)<1e-9,robo:false,report:'(s, φ, z) = (2, 90°, 3): x = 2·cos 90° = 2 × 0 = <b>0</b>, y = 2·sin 90° = 2 × 1 = <b>2</b>, z = 3. s는 x가 아니라 「중심에서의 거리」예요.'};};
DUELS.sphpole=function(){var th=Math.PI/2,z=Math.cos(th),x=Math.sin(th);return {fly:Math.abs(z)<1e-9&&Math.abs(x-1)<1e-9,robo:false,report:'(r, θ, φ) = (1, 90°, 0°): z = 1·cos 90° = <b>0</b>, x = 1·sin 90°·cos 0° = <b>1</b> → (1, 0, 0). θ는 북극에서 내려온 각이라 90°는 적도예요. 북극은 θ = 0°.'};};
})();
