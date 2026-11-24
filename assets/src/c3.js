/* 위젯 모음 3: 기계(탐색과 AI) 실험 — 케일리 그래프, 층 세기, 탐색, 패턴 데이터베이스, 연대표, 부분 목표 */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,ctrl=U.ctrl,btn=U.btn,radio=U.radio,slider=U.slider,out=U.out,tx=U.tx,fmt=U.fmt;

/* ───── 작은 군의 케일리 그래프 ───── */
function pcomp(a,b){return a.map(function(x){return b[x];});}
var GROUPS={
 clock:{name:'12시간 시계',gens:[['+1시간',[1,2,3,4,5,6,7,8,9,10,11,0]],['+5시간',[5,6,7,8,9,10,11,0,1,2,3,4]],['−1시간',[11,0,1,2,3,4,5,6,7,8,9,10]]]},
 square:{name:'정사각형 돌리기·뒤집기',gens:[['90° 돌리기',[1,2,3,0]],['좌우 뒤집기',[1,0,3,2]],['대각 뒤집기',[0,3,2,1]]]},
 s4:{name:'카드 4장 섞기',gens:[['앞 두 장 바꾸기',[1,0,2,3]],['한 장씩 밀기',[1,2,3,0]],['가운데 두 장 바꾸기',[0,2,1,3]]]}
};
function bfsGroup(gens){var n=gens[0][1].length,id=[];for(var i=0;i<n;i++)id.push(i);var key=function(p){return p.join(',');};
  var V=[id],dist={},par={},via={},Ed=[];dist[key(id)]=0;var q=[id];
  while(q.length){var p=q.shift(),kp=key(p);gens.forEach(function(g,gi){var r=pcomp(p,g[1]),kr=key(r);if(dist[kr]==null){dist[kr]=dist[kp]+1;par[kr]=kp;via[kr]=gi;V.push(r);q.push(r);}Ed.push([kp,kr,gi]);});}
  return {V:V.map(key),dist:dist,par:par,via:via,E:Ed};}
window.bfsGroup=bfsGroup;window.GROUPS=GROUPS;
W.cayley=function(el,o){
  var gk=o.g||'clock',on=o.on||[0],sel=null,s=svg(el,640,380,'케일리 그래프: 점 = 상태, 선 = 한 수');
  var c=ctrl(el);radio(c,'무리:',Object.keys(GROUPS).map(function(k){return [k,GROUPS[k].name];}),gk,function(v){gk=v;on=[0];sel=null;mk();draw();});
  var c2=ctrl(el),bs=[];function mk(){c2.innerHTML='';H('span','glabel','쓸 수 있는 한 수:',c2);bs=GROUPS[gk].gens.map(function(g,i){return btn(c2,g[0],function(){var k=on.indexOf(i);if(k>=0){if(on.length>1)on.splice(k,1);}else on.push(i);sel=null;draw();},on.indexOf(i)>=0);});}mk();
  var ou=out(el),gc=[C.b,C.r,C.g];
  function draw(){bs.forEach(function(b,i){b.setAttribute('aria-pressed',on.indexOf(i)>=0?'true':'false');});
    var G=GROUPS[gk],gens=on.map(function(i){return G.gens[i];}),B=bfsGroup(gens),n=G.gens[0][1].length,tot={clock:12,square:8,s4:24}[gk];
    var layers=[];B.V.forEach(function(k){var d=B.dist[k];(layers[d]=layers[d]||[]).push(k);});
    var pos={},cx=200,cy=190;layers.forEach(function(L,d){L.forEach(function(k,i){var r=d*(160/Math.max(1,layers.length-1)),a=-Math.PI/2+(i+0.5*(d%2))*2*Math.PI/L.length;pos[k]=d===0?[cx,cy]:[cx+r*Math.cos(a),cy+r*Math.sin(a)];});});
    s.innerHTML='';layers.forEach(function(L,d){if(d)E('circle',{cx:cx,cy:cy,r:d*(160/Math.max(1,layers.length-1)),fill:'none',stroke:C.rule,'stroke-dasharray':'3 4'},s);});
    var path={};if(sel){var k=sel;while(B.par[k]){path[B.par[k]+'>'+k]=1;k=B.par[k];}}
    B.E.forEach(function(e){if(e[0]===e[1])return;var a=pos[e[0]],b=pos[e[1]],hot=path[e[0]+'>'+e[1]];E('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:hot?C.m:gc[on[e[2]]],'stroke-width':hot?4:1.4,'stroke-opacity':hot?1:0.55},s);});
    B.V.forEach(function(k){var p=pos[k],d=B.dist[k],ci=E('circle',{cx:p[0],cy:p[1],r:k===B.V[0]?11:8,fill:k===B.V[0]?C.g:(k===sel?C.m:'#fff'),stroke:C.k,'stroke-width':1.5,tabindex:0,role:'button','aria-label':'상태 '+k+', 거리 '+d},s);ci.style.cursor='pointer';ci.onclick=function(){sel=k;draw();};});
    var x0=420;tx(s,x0,24,'층(거리)마다 상태 수',{'font-weight':700});layers.forEach(function(L,d){tx(s,x0,48+d*22,d+'수: '+L.length+'개',{'font-size':13});});
    var diam=layers.length-1,reach=B.V.length;
    ou.innerHTML='<p>찾은 상태 <b>'+reach+'</b>개 / 전체 '+tot+'개 · <b>지름(가장 먼 거리) = '+diam+'</b>수 · 초록 점 = 다 맞춘 상태</p>'+(reach<tot?'<p class="r">고른 한 수만으로는 닿지 않는 상태가 '+(tot-reach)+'개 있어요. 이 한 수들은 무리 전체를 「만들어 내지」 못해요.</p>':'')+
      (sel?'<p class="m">고른 점까지 가장 짧은 길: '+B.dist[sel]+'수 (보라 선)</p>':'<p class="note">점을 눌러 보세요. 가장 짧은 길이 보라색으로 보여요.</p>');}
  draw();
};

/* ───── 실제 큐브의 층 세기 (너비 우선 탐색) ───── */
W.layers=function(el,o){
  var KNOWN=[1,18,243,3240,43239,574908,7618438,100803036,1332343288];
  var s=svg(el,640,250,'거리별 큐브 상태 수 막대'),c=ctrl(el),got=[1],busy=false;
  var b3=btn(c,'컴퓨터로 3수까지 세기',function(){run(3);}),b4=btn(c,'4수까지 세기 (몇 초 걸려요)',function(){run(4);});
  var ou=out(el);
  function key(st){return String.fromCharCode.apply(null,st);}
  function run(D){if(busy)return;busy=true;ou.innerHTML='<p>세는 중…</p>';setTimeout(function(){var t0=Date.now(),start=CUBE.solved(),seen=new Set([key(start)]),fr=[start];got=[1];
    for(var d=1;d<=D;d++){var nf=[];fr.forEach(function(st){CUBE.MOVES.forEach(function(m){var r=CUBE.apply(st,CUBE.M[m]),k=key(r);if(!seen.has(k)){seen.add(k);nf.push(r);}});});fr=nf;got.push(nf.length);}
    busy=false;draw('<p class="g">'+D+'수까지 직접 셌어요 ('+((Date.now()-t0)/1000).toFixed(1)+'초). 결과가 알려진 값과 같아요.</p>');},30);}
  function draw(msg){s.innerHTML='';tx(s,10,16,'거리 d에 있는 상태 수 (막대는 자릿수 눈금, 진한 막대 = 이 페이지에서 직접 센 값)',{'font-size':12,fill:C.mu});
    KNOWN.forEach(function(v,d){var x=20+d*68,h=String(v).length*17;E('rect',{x:x,y:230-h,width:50,height:h,rx:4,fill:d<got.length?C.acc:C.rule},s);tx(s,x+25,224-h,d+'수',{'text-anchor':'middle','font-size':12,'font-weight':700});tx(s,x+25,245,v>=1e6?(v/1e6).toFixed(1)+'백만':fmt(v),{'text-anchor':'middle','font-size':10});});
    var rows=got.map(function(v,d){return d+'수: '+fmt(v)+'개'+(d?' (앞 층의 '+(v/got[d-1]).toFixed(1)+'배)':'');}).join(' · ');
    ou.innerHTML=(msg||'')+'<p>'+rows+'</p><p class="note">한 층 갈 때마다 약 13배씩 늘어요(18가지 수 중 같은 면을 연달아 돌리는 낭비 등을 빼면). 5수 이후 값은 알려진 계산 결과예요.</p>';}
  draw();
};

/* ───── 탐색: 그냥 깊이 우선 vs 하한 가지치기(IDA*) ───── */
var PDB=null;
function buildPDB(){if(PDB)return PDB;var M=CUBE.MOVES.map(function(m){return CUBE.M[m];});
  function table(refs){var n=refs.length,T=new Int8Array(Math.pow(54,n)).fill(-1),idx=function(a){var k=0;for(var i=0;i<n;i++)k=k*54+a[i];return k;};
    var q=[refs.slice()];T[idx(refs)]=0;var head=0;while(head<q.length){var a=q[head++],d=T[idx(a)];for(var m=0;m<18;m++){var b=a.map(function(x){return M[m][x];}),k=idx(b);if(T[k]<0){T[k]=d+1;q.push(b);}}}
    return {refs:refs,T:T,size:q.length,idx:idx};}
  var co=CUBE.CORN.map(function(a){return a[0];}),ed=CUBE.EDGE.map(function(a){return a[0];}),L=[];
  for(var i=0;i<8;i+=2)L.push(table([co[i],co[i+1]]));for(var j=0;j<12;j+=2)L.push(table([ed[j],ed[j+1]]));
  PDB=L;return L;}
window.buildPDB=buildPDB;
function hval(p,L){var h=0;for(var i=0;i<L.length;i++){var t=L[i],k=0;for(var j=0;j<t.refs.length;j++)k=k*54+p[t.refs[j]];var v=t.T[k];if(v>h)h=v;}return h;}
window.hval=hval;
function solve(scr,useH,limit){var M=CUBE.MOVES.map(function(m){return CUBE.M[m];}),L=useH?buildPDB():null,nodes=0,path=[],cap=limit||3e6;
  var p0=CUBE.perm(scr);function goal(p){for(var i=0;i<54;i++)if(p[i]!==i)return false;return true;}
  function dfs(p,g,bound,lastF){nodes++;if(nodes>cap)return 'cap';var h=useH?hval(p,L):0;if(g+h>bound)return g+h;if(goal(p))return 'ok';var min=99;
    for(var m=0;m<18;m++){var f=Math.floor(m/3);if(f===lastF)continue;if(lastF>=0&&(f===lastF+3))continue;/* 마주 보는 면은 한 순서만 */
      var q=new Array(54);for(var i=0;i<54;i++)q[i]=M[m][p[i]];path.push(CUBE.MOVES[m]);var r=dfs(q,g+1,bound,f);if(r==='ok'||r==='cap')return r;if(r<min)min=r;path.pop();}
    return min;}
  var bound=useH?hval(p0,L):0,t0=Date.now();
  while(true){var r=dfs(p0,0,bound,-1);if(r==='ok')return {ok:true,nodes:nodes,sol:path.slice(),ms:Date.now()-t0,h0:useH?hval(p0,L):0};if(r==='cap'||bound>12)return {ok:false,nodes:nodes,ms:Date.now()-t0};bound=r;}
}
window.cubeSolve=solve;
W.search=function(el,o){
  var d=o.d||4,seed=o.seed||3,s=svg(el,640,200,'두 탐색 방법의 확인한 상태 수 비교'),c=ctrl(el);
  slider(c,'섞는 수',1,6,1,d,function(v){d=v;res=null;draw();return v+'수';});
  var c2=ctrl(el);btn(c2,'다른 섞기',function(){seed++;res=null;draw();});var rb=btn(c2,'두 방법으로 풀어 보기',function(){go();});rb.classList.add('primary');
  var ou=out(el),res=null;
  function scr(){return CUBE.scramble(d,seed*31+d);}
  function go(){ou.innerHTML='<p>찾는 중… (처음 한 번은 표를 만드느라 1~2초 더 걸려요)</p>';setTimeout(function(){var t=scr();var a=d<=5?solve(t,false,4e6):{ok:false,nodes:null},b=solve(t,true,4e6);res={a:a,b:b,t:t};draw();},30);}
  function draw(){s.innerHTML='';var t=scr();
    if(!res){ou.innerHTML='<p>섞은 식: <b>'+t.join(' ')+'</b> ('+d+'수). 「두 방법으로 풀어 보기」를 누르세요.</p>'+(d>5?'<p class="note">6수는 그냥 깊이 우선으로 하면 수백만 개를 확인해야 해서, 가지치기 방법만 돌려요.</p>':'');return;}
    var a=res.a,b=res.b,mx=Math.max(a.nodes||1,b.nodes||1);
    [[a,'그냥 깊이 우선 (같은 면 연속만 금지)',C.r],[b,'하한 가지치기 (IDA*)',C.g]].forEach(function(x,i){var y=40+i*70,w=x[0].nodes?Math.max(4,Math.log10(x[0].nodes)/Math.log10(mx*1.2)*420):0;tx(s,10,y-6,x[1],{'font-size':13,'font-weight':700});
      if(x[0].nodes){E('rect',{x:10,y:y,width:w,height:26,rx:4,fill:x[2]},s);tx(s,16+w,y+18,fmt(x[0].nodes)+'개 확인'+(x[0].ok?'':' (여기서 멈춤)'),{'font-size':13});}else tx(s,10,y+18,'(너무 많아서 돌리지 않음)',{'font-size':13,fill:C.mu});});
    tx(s,10,190,'막대는 자릿수 눈금',{'font-size':11,fill:C.mu});
    ou.innerHTML='<p>섞은 식: '+res.t.join(' ')+' · 찾은 해답: <b>'+(b.ok?b.sol.join(' ')+' ('+b.sol.length+'수)':'못 찾음')+'</b></p>'+
      '<p>처음 상태의 하한 h = <b>'+b.h0+'</b>수 (「적어도 이만큼은 더 돌려야 한다」는 보장) · '+(a.nodes?'확인한 상태 수 비율: 약 <b>'+Math.max(1,Math.round(a.nodes/b.nodes))+'배</b> 적게':'')+'</p>';}
  draw();
};

/* ───── 패턴 데이터베이스 들여다보기 ───── */
W.pdb=function(el,o){
  var seed=o.seed||5,d=o.d||8,s=svg(el,640,230,'작은 패턴 표의 거리별 개수'),c=ctrl(el);
  slider(c,'섞는 수',1,20,1,d,function(v){d=v;draw();return v+'수';});btn(c,'다른 섞기',function(){seed++;draw();});
  var ou=out(el);
  function draw(){var L=buildPDB(),t=L[0],hist=[];for(var k=0;k<t.T.length;k++){var v=t.T[k];if(v>=0)hist[v]=(hist[v]||0)+1;}
    s.innerHTML='';tx(s,10,16,'꼭짓점 2개짜리 작은 문제: 504가지 배치를 「몇 수면 제자리?」로 미리 센 표',{'font-size':12,fill:C.mu});
    var mx=Math.max.apply(null,hist);hist.forEach(function(v,i){var h=v/mx*150;E('rect',{x:20+i*70,y:190-h,width:50,height:h,rx:4,fill:C.acc},s);tx(s,45+i*70,184-h,String(v),{'text-anchor':'middle','font-size':12});tx(s,45+i*70,208,i+'수',{'text-anchor':'middle','font-size':12});});
    var p=CUBE.perm(CUBE.scramble(d,seed*7+d)),vals=L.map(function(t){var k=0;t.refs.forEach(function(r){k=k*54+p[r];});return t.T[k];});
    ou.innerHTML='<p>지금 섞은 큐브를 표 10개(꼭짓점 2개씩 4표, 모서리 2개씩 6표)에서 찾아본 값: <b>'+vals.join(', ')+'</b></p><p>그중 가장 큰 값 <b>'+Math.max.apply(null,vals)+'수</b>가 하한이에요. 실제로는 '+d+'수 이하로 섞었으니 진짜 거리는 그 이하이고, 하한은 절대 진짜 거리보다 크지 않아요.</p><p class="note">코르프(1997)는 같은 생각을 크게 써서, 꼭짓점 8개 표(88,179,840개 항목)와 모서리 6개짜리 표 두 개(각 42,577,920개 항목)를 썼어요.</p>';}
  draw();
};

/* ───── 신의 수 연대표 ───── */
var TL=[[1981,18,52,'티슬스웨이트: 52수면 충분 (아래 경계 18은 1980년 무렵 세기로 확인)'],[1990,18,42,'클로스터만: 42수'],[1992,18,39,'리드: 39수'],[1992.4,18,37,'빈터: 하루 뒤 37수'],[1995,18,29,'리드: 2단계 알고리즘 분석으로 29수'],[1995.1,20,29,'리드: 슈퍼플립은 20수가 꼭 필요 → 아래 경계 20'],[2005,20,28,'라두: 28수'],[2006,20,27,'라두: 27수'],[2007,20,26,'쿤클·쿠퍼먼: 26수 (디스크 병렬 계산)'],[2008,20,25,'로키키: 25수'],[2008.3,20,23,'로키키: 23수'],[2008.6,20,22,'로키키: 22수'],[2010,20,20,'로키키·코시엠바·데이비드슨·데스리지: 20수 — 신의 수 확정']];
window.TL=TL;
W.timeline=function(el,o){
  var i=o.i!=null?o.i:0,s=svg(el,640,280,'신의 수 위·아래 경계 변화 그래프'),c=ctrl(el);
  slider(c,'기록 번호',0,TL.length-1,1,i,function(v){i=v;draw();return String(Math.floor(TL[v][0]))+'년';});
  var ou=out(el);
  function X(y){return 50+(y-1981)/(2010-1981)*560;}function Y(v){return 250-(v-15)/(55-15)*220;}
  function draw(){s.innerHTML='';[20,30,40,50].forEach(function(v){E('line',{x1:45,y1:Y(v),x2:615,y2:Y(v),stroke:C.rule},s);tx(s,10,Y(v)+4,String(v),{'font-size':11,fill:C.mu});});
    [1981,1990,2000,2010].forEach(function(y){tx(s,X(y)-14,272,String(y),{'font-size':11,fill:C.mu});});
    var up=[],lo=[];for(var k=0;k<=i;k++){up.push(X(TL[k][0])+','+Y(TL[k][2]));lo.push(X(TL[k][0])+','+Y(TL[k][1]));}
    if(i>0)E('polygon',{points:up.concat(lo.slice().reverse()).join(' '),fill:'rgba(155,63,181,.12)'},s);
    E('polyline',{points:up.join(' '),fill:'none',stroke:C.r,'stroke-width':2.5},s);E('polyline',{points:lo.join(' '),fill:'none',stroke:C.b,'stroke-width':2.5},s);
    var t=TL[i];E('circle',{cx:X(t[0]),cy:Y(t[2]),r:6,fill:C.r},s);E('circle',{cx:X(t[0]),cy:Y(t[1]),r:6,fill:C.b},s);
    tx(s,400,40,'빨강 = 위 경계 (이만큼이면 충분)',{'font-size':12,fill:C.r});tx(s,400,58,'파랑 = 아래 경계 (적어도 이만큼)',{'font-size':12,fill:C.b});tx(s,400,76,'보라 = 아직 모르는 틈',{'font-size':12,fill:C.m});
    ou.innerHTML='<p><b>'+Math.floor(t[0])+'년</b> · '+t[3]+'</p><p>아래 경계 <b>'+t[1]+'</b> ≤ 신의 수 ≤ 위 경계 <b>'+t[2]+'</b> · 틈 '+(t[2]-t[1])+'수</p>';}
  draw();
};

/* ───── 무작위 큐브의 최단 거리 분포 ───── */
W.distance=function(el,o){
  var P=[[15,0.2],[16,2.6],[17,26.7],[18,67.0],[19,3.4],[20,0.0000000011]],s=svg(el,640,240,'무작위 큐브 최단 거리 분포'),c=ctrl(el),n=0,cnt={};
  btn(c,'무작위 큐브 100개 뽑기',function(){var R=LAB.rng((Date.now()%997)+1);for(var t=0;t<100;t++){var r=R()*100,acc=0;for(var k=0;k<P.length;k++){acc+=P[k][1];if(r<acc){cnt[P[k][0]]=(cnt[P[k][0]]||0)+1;break;}}}n+=100;draw();});
  btn(c,'지우기',function(){n=0;cnt={};draw();});
  var ou=out(el);
  function draw(){s.innerHTML='';tx(s,10,16,'최단 해답 길이별 비율 (막대 = 알려진 비율, 점 = 내가 뽑은 결과)',{'font-size':12,fill:C.mu});
    P.forEach(function(p,i){var x=40+i*96,h=p[1]*2.6;E('rect',{x:x,y:210-h,width:60,height:Math.max(h,1),rx:4,fill:p[0]===18?C.acc:C.rule},s);tx(s,x+30,228,p[0]+'수',{'text-anchor':'middle','font-size':12});tx(s,x+30,204-h,p[0]===20?'거의 0':p[1]+'%',{'text-anchor':'middle','font-size':12});
      if(n){var v=100*(cnt[p[0]]||0)/n;E('circle',{cx:x+30,cy:210-v*2.6,r:6,fill:C.r},s);}});
    var avg=0;if(n){for(var k in cnt)avg+=k*cnt[k];avg/=n;}
    ou.innerHTML='<p>무작위로 섞은 큐브의 최단 해답은 <b>18수가 약 3분의 2</b>예요. 20수가 필요한 상태는 약 4.9억 개뿐이라 무작위로 만날 일은 거의 없어요.</p>'+(n?'<p>뽑은 '+n+'개의 평균: <b>'+avg.toFixed(2)+'수</b></p>':'');}
  draw();
};

/* ───── 부분 목표 탐색: 1에서 목표 수까지 (+1, ×2) ───── */
function bfsNum(a,b,cap){if(a===b)return {ok:true,n:0,path:[a],len:0};var par={},q=[a],seen={},n=0;seen[a]=1;while(q.length){var x=q.shift();n++;if(n>cap)return {ok:false,n:n};
  var nx=[x+1,x*2];for(var i=0;i<2;i++){var y=nx[i];if(y>b||seen[y])continue;seen[y]=1;par[y]=x;if(y===b){var p=[y];while(p[0]!==a)p.unshift(par[p[0]]);return {ok:true,n:n,path:p,len:p.length-1};}q.push(y);}}return {ok:false,n:n};}
window.bfsNum=bfsNum;
function subgoals(T,bad){var s=[],x=T;while(x>8){x=Math.floor(x/2);s.unshift(x);}if(bad)s.splice(Math.floor(s.length/2),0,T+7);return s;}
window.subgoalsNum=subgoals;
W.subgoal=function(el,o){
  var T=o.T||1000,bad=false,s=svg(el,640,210,'직접 찾기와 부분 목표 찾기의 확인 수 비교'),c=ctrl(el);
  slider(c,'목표 수',50,5000,50,T,function(v){T=v;draw();return String(v);});
  var c2=ctrl(el);radio(c2,'부분 목표를 내는 생성기:',[['good','성실한 생성기'],['bad','가끔 엉뚱한 목표를 내는 생성기']],'good',function(v){bad=v==='bad';draw();});
  var ou=out(el);
  function draw(){var d=bfsNum(1,T,2e5),sg=subgoals(T,bad),cur=1,tot=0,ok=true,steps=[],len=0;
    sg.concat([T]).forEach(function(g){if(!ok)return;var r=bfsNum(cur,g,2e5);tot+=r.n;if(!r.ok){ok=false;steps.push('<span class="r">'+cur+' → '+g+' 실패</span>');return;}len+=r.len;steps.push(cur+'→'+g);cur=g;});
    s.innerHTML='';[[d.n,'직접 찾기 (너비 우선)',C.r],[tot,'부분 목표로 끊어 찾기',ok?C.g:C.a]].forEach(function(x,i){var y=40+i*70,w=Math.max(4,Math.log10(x[0]+1)/Math.log10(Math.max(d.n,tot)*1.3+1)*440);tx(s,10,y-6,x[1],{'font-size':13,'font-weight':700});E('rect',{x:10,y:y,width:w,height:26,rx:4,fill:x[2]},s);tx(s,16+w,y+18,fmt(x[0])+'개 확인',{'font-size':13});});
    ou.innerHTML='<p>규칙: 1에서 시작해 「+1」 또는 「×2」만으로 '+fmt(T)+' 만들기. 직접 찾으면 '+fmt(d.n)+'개 확인, 최단 '+d.len+'수.</p><p>생성기가 낸 부분 목표: '+sg.join(' → ')+' → '+T+'</p><p>'+steps.join(' · ')+'</p>'+
      (ok?'<p class="g">부분 목표로 끊으니 확인 수가 '+fmt(tot)+'개로 줄었어요 (해답 '+len+'수).</p>':'<p class="r">엉뚱한 부분 목표('+(T+7)+')는 목표보다 커서 다시 돌아올 수 없어요. 「+1, ×2」는 줄이는 수가 없으니까요. 생성기를 믿기 전에 목표가 닿을 수 있는지 확인해야 해요.</p>');}
  draw();
};

/* ───── 무작위 굴려 보기(MCTS의 재료): 첫 수 고르기 ───── */
W.rollout=function(el,o){
  var T=o.T||45,N=o.N||30,S=3,s=svg(el,640,200,'첫 수별 무작위 시도 성공률'),c=ctrl(el),seed=1;
  slider(c,'목표 수',12,90,1,T,function(v){T=v;draw();return String(v);});slider(c,'첫 수마다 굴려 볼 횟수',10,1000,10,N,function(v){N=v;draw();return v+'번';});
  btn(c,'다시 굴리기',function(){seed++;draw();});
  var ou=out(el);
  function play(x,R){for(var k=0;k<10;k++){if(x===T)return 1;var y=R()<0.5?x+1:x*2;if(y>T)y=x+1;if(y>T)return 0;x=y;}return x===T?1:0;}
  function draw(){var R=LAB.rng(T*131+N*7+seed),firsts=[['첫 수 +1 (3 → 4)',4],['첫 수 ×2 (3 → 6)',6]];
    var res=firsts.map(function(f){var w=0;for(var i=0;i<N;i++)w+=play(f[1],R);return w/N;}),opt=firsts.map(function(f){var r=bfsNum(f[1],T,1e5);return r.ok?r.len+1:null;});
    s.innerHTML='';tx(s,10,16,'3에서 첫 수를 둔 뒤 무작위로 10수까지 굴려 '+T+'에 닿은 비율',{'font-size':12,fill:C.mu});
    firsts.forEach(function(f,i){var y=44+i*64,w=res[i]*420;tx(s,10,y-6,f[0]+' · 진짜 최단 '+opt[i]+'수',{'font-size':13,'font-weight':700});E('rect',{x:10,y:y,width:Math.max(w,3),height:24,rx:4,fill:i?C.b:C.g},s);tx(s,16+Math.max(w,3),y+17,(100*res[i]).toFixed(1)+'%',{'font-size':13});});
    var pick=res[0]>res[1]?0:res[1]>res[0]?1:-1,best=opt[0]<opt[1]?0:opt[1]<opt[0]?1:-1;
    ou.innerHTML='<p>굴려 보기로 고른 첫 수: <b>'+(pick<0?'비김':firsts[pick][0])+'</b> · 진짜로 더 짧은 쪽: <b>'+(best<0?'둘 다 같음':firsts[best][0])+'</b> '+(pick===best?'<span class="g">(맞힘)</span>':'<span class="a">(어긋남 — 굴린 횟수를 늘려 보세요)</span>')+'</p><p class="note">몬테카를로 트리 탐색(MCTS)은 이런 「무작위로 끝까지 굴려 보기」 결과를 많이 모아, 성공률이 높아 보이는 가지를 더 자주 파고들어요. 굴린 횟수가 적으면 운에 크게 흔들려요.</p>';}
  draw();
};
})();
