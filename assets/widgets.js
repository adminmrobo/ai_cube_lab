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

