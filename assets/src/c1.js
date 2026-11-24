/* 위젯 모음 1: 공용 도우미 + 큐브 엔진 + 손(사람의 풀이법) 실험 */
var W={},DUELS={};
(function(){
'use strict';
var NS='http://www.w3.org/2000/svg';
function E(tag,at,par){var e=document.createElementNS(NS,tag);for(var k in at)e.setAttribute(k,at[k]);if(par)par.appendChild(e);return e;}
function H(tag,cls,html,par){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;if(par)par.appendChild(e);return e;}
function svg(el,w,h,label){var s=E('svg',{viewBox:'0 0 '+w+' '+h,width:'100%',role:'img','aria-label':label||'설명 그림'});s.style.maxWidth=w+'px';el.appendChild(s);return s;}
function ctrl(el){return H('div','ctrl',null,el);}
function btn(par,label,on,pressed){var b=H('button','bt',label,par);b.type='button';if(pressed!=null)b.setAttribute('aria-pressed',pressed?'true':'false');b.onclick=function(){on(b);};return b;}
function radio(par,label,opts,cur,on){if(label)H('span','glabel',label,par);var bs=opts.map(function(o){return btn(par,o[1],function(b){bs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});on(o[0]);},o[0]===cur);});return bs;}
function slider(par,label,min,max,step,val,on){H('span','glabel',label,par);var r=H('input',null,null,par);r.type='range';r.min=min;r.max=max;r.step=step;r.value=val;r.setAttribute('aria-label',label);var v=H('span','val','',par);function u(){v.textContent=on(+r.value)||'';}r.oninput=u;Promise.resolve().then(u);return r;}
function out(el){var o=H('div','insight',null,el);o.setAttribute('aria-live','polite');return o;}
function tx(s,x,y,t,at){var e=E('text',Object.assign({x:x,y:y,'font-size':13,fill:'#16212b','font-family':'inherit'},at||{}),s);e.textContent=t;return e;}
function fmt(n){return (typeof n==='bigint'?n:Number(n)).toLocaleString('ko-KR');}
window.WU={E:E,H:H,svg:svg,ctrl:ctrl,btn:btn,radio:radio,slider:slider,out:out,tx:tx,fmt:fmt};
var C={g:'#13733a',m:'#9b3fb5',r:'#c9302c',a:'#a35c00',b:'#1e55c8',k:'#16212b',mu:'#5b6874',rule:'#d5dbe2',acc:'#3b4fb8',grey:'#c9ced5'};
window.WC=C;

/* ───────── 큐브 엔진: 스티커 54장 (면 순서 U R F D L B, 면마다 왼쪽 위부터 9장) ───────── */
var CUBE=(function(){
  var F='URFDLB';
  var N={U:[0,1,0],R:[1,0,0],F:[0,0,1],D:[0,-1,0],L:[-1,0,0],B:[0,0,-1]};
  var RT={U:[1,0,0],R:[0,0,-1],F:[1,0,0],D:[1,0,0],L:[0,0,1],B:[-1,0,0]};
  var DN={U:[0,0,1],R:[0,-1,0],F:[0,-1,0],D:[0,0,-1],L:[0,-1,0],B:[0,-1,0]};
  var COL=['#f5d90a','#f08a1c','#1f9d4a','#ffffff','#d42b2b','#2a62d4'];
  var CNAME=['노랑','주황','초록','흰색','빨강','파랑'];
  var ST=[],IDX={};
  function add(a,b,k){return [a[0]+k*b[0],a[1]+k*b[1],a[2]+k*b[2]];}
  function key(p,n){return p.join(',')+'|'+n.join(',');}
  F.split('').forEach(function(f){for(var i=0;i<3;i++)for(var j=0;j<3;j++){var p=add(add(N[f],RT[f],j-1),DN[f],i-1);ST.push({p:p,n:N[f],f:f});IDX[key(p,N[f])]=ST.length-1;}});
  function r90(v,ax){var x=v[0],y=v[1],z=v[2];return ax===0?[x,-z,y]:ax===1?[z,y,-x]:[-y,x,z];}
  function rot(v,axis,s){var ax=axis[0]?0:axis[1]?1:2,t=((axis[ax]*s)%4+4)%4,r=v;for(var i=0;i<t;i++)r=r90(r,ax);return r;}
  var M={};
  F.split('').forEach(function(f){var n=N[f],p=[];ST.forEach(function(s,k){var d=s.p[0]*n[0]+s.p[1]*n[1]+s.p[2]*n[2];p[k]=d===1?IDX[key(rot(s.p,n,-1),rot(s.n,n,-1))]:k;});M[f]=p;});
  function comp(a,b){var r=[];for(var i=0;i<54;i++)r[i]=b[a[i]];return r;}
  var ID=[];for(var i=0;i<54;i++)ID.push(i);
  F.split('').forEach(function(f){M[f+'2']=comp(M[f],M[f]);M[f+"'"]=comp(M[f+'2'],M[f]);});
  var MOVES=[];F.split('').forEach(function(f){MOVES.push(f,f+"'",f+'2');});
  function tok(s){return String(s||'').replace(/[’‘`´]/g,"'").replace(/([URFDLB])(2'|'2)/g,'$12').match(/[URFDLB](2|')?/g)||[];}
  function perm(s){var p=ID,t=Array.isArray(s)?s:tok(s);t.forEach(function(m){p=comp(p,M[m]);});return p;}
  function inv(m){return m.length===1?m+"'":m[1]==="'"?m[0]:m;}
  function invSeq(s){var t=Array.isArray(s)?s:tok(s);return t.slice().reverse().map(inv);}
  function solved(){var s=[];for(var i=0;i<54;i++)s.push(Math.floor(i/9));return s;}
  function apply(st,p){var r=[];for(var i=0;i<54;i++)r[p[i]]=st[i];return r;}
  function move(st,s){return apply(st,perm(s));}
  function isSolved(st){for(var i=0;i<54;i++)if(st[i]!==Math.floor(i/9))return false;return true;}
  function same(a,b){for(var i=0;i<54;i++)if(a[i]!==b[i])return false;return true;}
  function order(p){var q=p,k=1;while(!same(q,ID)&&k<2000){q=comp(q,p);k++;}return k;}
  function moved(p){var r=[];for(var i=0;i<54;i++)if(p[i]!==i)r.push(i);return r;}
  function kind(i){var s=ST[i],c=Math.abs(s.p[0])+Math.abs(s.p[1])+Math.abs(s.p[2]);return c===3?'corner':c===2?'edge':'center';}
  /* 조각(큐비) 묶음: 같은 위치의 스티커들 */
  var CUB={};ST.forEach(function(s,i){var k=s.p.join(',');(CUB[k]=CUB[k]||[]).push(i);});
  function piecesMoved(p){var m={},c={corner:0,edge:0,center:0};moved(p).forEach(function(i){m[ST[i].p.join(',')]=kind(i);});for(var k in m)c[m[k]]++;return c;}
  var OPP={U:'D',D:'U',R:'L',L:'R',F:'B',B:'F'};
  function scramble(n,seed){var R=LAB.rng(seed||7),t=[];for(var w=0;w<5;w++)R();var guard=0;while(t.length<n&&guard++<5000){var m=MOVES[Math.floor(R()*18)],f=m[0],a=t.length?t[t.length-1][0]:'',b=t.length>1?t[t.length-2][0]:'';
    if(f===a)continue;if(OPP[f]===a&&(f===b||'URF'.indexOf(f)<0))continue;t.push(m);}return t;}
  /* 조립 상태 분석: 꼭짓점·모서리 조각과 방향, 세 불변량 */
  var CORN=[],EDGE=[];
  Object.keys(CUB).forEach(function(k){var a=CUB[k];if(a.length===3)CORN.push(a);else if(a.length===2)EDGE.push(a);});
  function orderCorner(a){/* 위아래(y축) 스티커를 먼저, 그다음 시계 방향 */
    var y=a.filter(function(i){return ST[i].n[1]!==0;})[0],o=a.filter(function(i){return i!==y;});
    var n0=ST[y].n,n1=ST[o[0]].n,n2=ST[o[1]].n;var det=n0[0]*(n1[1]*n2[2]-n1[2]*n2[1])-n0[1]*(n1[0]*n2[2]-n1[2]*n2[0])+n0[2]*(n1[0]*n2[1]-n1[1]*n2[0]);
    return det>0?[y,o[0],o[1]]:[y,o[1],o[0]];}
  function primEdge(a){/* 위아래 스티커, 없으면 앞뒤 스티커가 기준 */
    var y=a.filter(function(i){return ST[i].n[1]!==0;});if(y.length)return [y[0],a[0]===y[0]?a[1]:a[0]];
    var z=a.filter(function(i){return ST[i].n[2]!==0;});return [z[0],a[0]===z[0]?a[1]:a[0]];}
  CORN=CORN.map(orderCorner);EDGE=EDGE.map(primEdge);
  var SOL=solved();
  function idOf(cols){return cols.slice().sort().join('');}
  var CID={},EID={};CORN.forEach(function(a,i){CID[idOf(a.map(function(x){return SOL[x];}))]=i;});EDGE.forEach(function(a,i){EID[idOf(a.map(function(x){return SOL[x];}))]=i;});
  function isUD(c){return c===0||c===3;}function isFB(c){return c===2||c===5;}
  function parity(p){var n=p.length,seen=[],sw=0;for(var i=0;i<n;i++){if(seen[i])continue;var j=i,len=0;while(!seen[j]){seen[j]=1;j=p[j];len++;}sw+=len-1;}return sw%2;}
  function analyze(st){
    var cp=[],co=0,ep=[],eo=0,bad=false;
    CORN.forEach(function(a,i){var cols=a.map(function(x){return st[x];}),id=CID[idOf(cols)];if(id==null)bad=true;cp.push(id);var t=cols.findIndex(isUD);co+=t<0?0:t;});
    EDGE.forEach(function(a,i){var cols=a.map(function(x){return st[x];}),id=EID[idOf(cols)];if(id==null)bad=true;ep.push(id);
      var pc=isUD(cols[0])||isUD(cols[1])?(isUD(cols[0])?0:1):(isFB(cols[0])?0:1);eo+=pc;});
    if(bad||new Set(cp).size<8||new Set(ep).size<12)return {bad:true};
    var pc=parity(cp),pe=parity(ep);
    return {twist:co%3,flip:eo%2,pc:pc,pe:pe,ok:co%3===0&&eo%2===0&&pc===pe};}
  return {ST:ST,M:M,ID:ID,COL:COL,CNAME:CNAME,MOVES:MOVES,CUB:CUB,CORN:CORN,EDGE:EDGE,tok:tok,perm:perm,comp:comp,inv:inv,invSeq:invSeq,solved:solved,apply:apply,move:move,
    isSolved:isSolved,same:same,order:order,moved:moved,kind:kind,piecesMoved:piecesMoved,scramble:scramble,analyze:analyze};
})();
window.CUBE=CUBE;

/* 큐브 그리기: 왼쪽 입체(윗면·앞면·오른면), 오른쪽 펼친 그림. o.mask(i)→true면 회색, o.mark: 테두리 강조할 스티커 */
var NET={U:[3,0],L:[0,3],F:[3,3],R:[6,3],B:[9,3],D:[3,6]};
function drawCube(s,st,o){
  o=o||{};s.innerHTML='';var W0=o.w||640,mark={};(o.mark||[]).forEach(function(i){mark[i]=1;});
  function col(i){return o.mask&&o.mask(i)?C.grey:CUBE.COL[st[i]];}
  function op(i){return o.dim&&o.dim(i)?0.45:1;}
  var showIso=o.iso!==false,showNet=o.net!==false;
  var stack=s.getAttribute('data-stack')==='1'&&showIso&&showNet;
  var isoW=showIso?(showNet&&!stack?250:W0):0,sc=showNet&&showIso&&!stack?34:52,cx=isoW/2,cy=150;
  if(showIso){
    function P(v){return [cx+(v[0]-v[2])*0.866*sc,cy+(v[0]+v[2])*0.5*sc-v[1]*sc];}
    CUBE.ST.forEach(function(t,i){if(!(t.f==='U'||t.f==='F'||t.f==='R'))return;
      var c=add3(t.p,t.n,0.5),R=RTv[t.f],D=DNv[t.f],pts=[[-.45,-.45],[.45,-.45],[.45,.45],[-.45,.45]].map(function(q){return P(add3(add3(c,R,q[0]),D,q[1]));});
      E('polygon',{points:pts.map(function(q){return q[0].toFixed(1)+','+q[1].toFixed(1);}).join(' '),fill:col(i),'fill-opacity':op(i),stroke:mark[i]?C.m:'#16212b','stroke-width':mark[i]?3.2:1.2,'stroke-linejoin':'round'},s);});
  }
  if(showNet){
    var u=stack?W0/12.4:showIso?(W0-isoW-10)/12.4:W0/12.4,ox=stack?u*0.2:isoW+(showIso?10:0)+u*0.2,oy=stack?318:showIso?40:10;
    CUBE.ST.forEach(function(t,i){var f=t.f,k=i%9,r=Math.floor(k/3),c=k%3,x=ox+(NET[f][0]+c)*u,y=oy+(NET[f][1]+r)*u;
      E('rect',{x:x+1,y:y+1,width:u-2,height:u-2,rx:2,fill:col(i),'fill-opacity':op(i),stroke:mark[i]?C.m:'#16212b','stroke-width':mark[i]?3:1},s);
      if(k===4&&o.labels!==false)tx(s,x+u/2,y+u/2+4,f,{'font-size':Math.max(9,u*0.42),'text-anchor':'middle','font-weight':700,fill:st[i]===3||st[i]===0?'#5b6874':'#fff'});});
  }
}
var RTv={U:[1,0,0],R:[0,0,-1],F:[1,0,0],D:[1,0,0],L:[0,0,1],B:[-1,0,0]},DNv={U:[0,0,1],R:[0,-1,0],F:[0,-1,0],D:[0,0,-1],L:[0,-1,0],B:[0,-1,0]};
function add3(a,b,k){return [a[0]+k*b[0],a[1]+k*b[1],a[2]+k*b[2]];}
window.drawCube=drawCube;
function cubeSvg(el,label,h){var narrow=(el.clientWidth||640)<520,sv=svg(el,640,narrow?790:(h||330),label||'큐브의 입체 그림과 펼친 그림');if(narrow)sv.setAttribute('data-stack','1');return sv;}
window.cubeSvg=cubeSvg;

var MOVE_KO={U:'윗면',D:'아랫면',R:'오른면',L:'왼면',F:'앞면',B:'뒷면'};
function moveKo(m){var f=MOVE_KO[m[0]];return m.length===1?f+' 시계 방향 90°':m[1]==="'"?f+' 반시계 방향 90°':f+' 180°';}
window.moveKo=moveKo;

/* 큐브 시뮬레이터: 돌리기·되돌리기·섞기·식 입력·반복 횟수 */
W.cube=function(el,o){
  var st=CUBE.solved(),hist=[],s=cubeSvg(el,'돌릴 수 있는 큐브'),moves=o.moves||CUBE.MOVES;
  var c=ctrl(el);H('span','glabel','돌리기:',c);
  moves.forEach(function(m){btn(c,m,function(){doMove([m]);}).setAttribute('aria-label',moveKo(m));});
  var c2=ctrl(el);
  btn(c2,'한 수 되돌리기',function(){if(!hist.length)return;var m=hist.pop();st=CUBE.move(st,CUBE.inv(m));last=[];draw();});
  btn(c2,'처음으로',function(){st=CUBE.solved();hist=[];last=[];draw();});
  if(o.scramble!==false)btn(c2,'섞기 (20수)',function(){var t=CUBE.scramble(20,(Date.now()%9973)+1);st=CUBE.move(CUBE.solved(),t);hist=[];last=[];note='섞은 식: '+t.join(' ');draw();});
  var c3=ctrl(el),inp=null,note='';
  if(o.input!==false){H('span','glabel','식 입력:',c3);inp=H('input',null,null,c3);inp.type='text';inp.value=o.seq||"R U R' U'";inp.setAttribute('aria-label','돌리기 식');inp.style.cssText='font:inherit;padding:4px 8px;border:1px solid var(--rule);border-radius:8px;min-width:150px;flex:1';
    btn(c3,'식대로 돌리기',function(){doMove(CUBE.tok(inp.value));});
    if(o.order!==false)btn(c3,'제자리까지 몇 번?',function(){var t=CUBE.tok(inp.value);if(!t.length)return;var k=CUBE.order(CUBE.perm(t));note='식 「'+t.join(' ')+'」('+t.length+'수)을 처음 상태에서 <b>'+k+'번</b> 반복하면 제자리로 돌아와요. (모두 '+fmt(k*t.length)+'수)';draw();});}
  if(o.presets){var c4=ctrl(el);H('span','glabel','미리 정한 식:',c4);o.presets.forEach(function(p){btn(c4,p[0],function(){if(inp)inp.value=p[1];st=CUBE.solved();hist=[];doMove(CUBE.tok(p[1]));note=p[2]||'';draw();});});}
  var ou=out(el),last=[];
  function doMove(t){var before=st.slice();t.forEach(function(m){st=CUBE.move(st,m);hist.push(m);});last=[];for(var i=0;i<54;i++)if(before[i]!==st[i])last.push(i);note=note&&t.length>1?note:'';draw();}
  function draw(){drawCube(s,st,{mark:o.diff===false?[]:last});
    var h='<p>지금까지 돌린 수: <b>'+hist.length+'</b>수 '+(hist.length?'('+hist.slice(-12).join(' ')+(hist.length>12?' …':'')+')':'')+'</p>';
    h+=CUBE.isSolved(st)?'<p class="g">다 맞춘 상태예요.</p>':'<p class="a">섞인 상태예요.'+(last.length?' 보라 테두리 = 방금 바뀐 스티커 '+last.length+'장':'')+'</p>';
    if(note)h+='<p>'+note+'</p>';ou.innerHTML=h;}
  draw();
};

/* 해부: 조각 종류별로 보기 */
W.anatomy=function(el,o){
  var s=cubeSvg(el,'조각 종류별로 색을 남긴 큐브'),cur='corner';
  var c=ctrl(el);radio(c,'남겨서 볼 조각:',[['center','가운데 조각'],['edge','모서리 조각'],['corner','꼭짓점 조각'],['all','전부']],cur,function(v){cur=v;draw();});
  var ou=out(el);
  function draw(){drawCube(s,CUBE.solved(),{mask:function(i){return cur!=='all'&&CUBE.kind(i)!==cur;}});
    var T={center:['가운데 조각','6개','스티커 1장씩. 돌려도 서로 자리가 바뀌지 않아요(축에 고정). 그래서 각 면의 색을 정해 줘요.'],
           edge:['모서리 조각','12개','스티커 2장씩. 자리는 12곳, 놓는 방향은 2가지(뒤집힘).'],
           corner:['꼭짓점 조각','8개','스티커 3장씩. 자리는 8곳, 놓는 방향은 3가지(비틀림).'],
           all:['전부','26개','6 + 12 + 8 = 26개 조각, 스티커 54장 (6 + 24 + 24).']}[cur];
    ou.innerHTML='<p><b>'+T[0]+' '+T[1]+'</b> — '+T[2]+'</p>';}
  draw();
};

/* 경우의 수 세기: 곱셈 원리를 한 단계씩 */
W.count=function(el,o){
  var steps=[['꼭짓점 8개를 자리 8곳에 놓기','8! = 40,320',40320n],['꼭짓점 방향 (마지막 하나는 저절로 정해짐)','× 3⁷ = 2,187',2187n],['모서리 12개를 자리 12곳에 놓기','× 12! = 479,001,600',479001600n],['모서리 뒤집힘 (마지막 하나는 저절로 정해짐)','× 2¹¹ = 2,048',2048n],['꼭짓점과 모서리의 자리 바꿈 짝 맞추기','÷ 2',null]];
  var k=o.k||0,c=ctrl(el);btn(c,'한 단계 더',function(){if(k<steps.length){k++;draw();}});btn(c,'처음부터',function(){k=0;draw();});btn(c,'끝까지',function(){k=steps.length;draw();});
  var ou=out(el),s=svg(el,640,170,'단계별 경우의 수 막대(자릿수)');
  function draw(){var v=1n,h='',digs=[];for(var i=0;i<k;i++){v=steps[i][2]?v*steps[i][2]:v/2n;digs.push(v.toString().length);h+='<p>'+(i+1)+'. '+steps[i][0]+' <b>'+steps[i][1]+'</b> → 지금까지 <b>'+fmt(v)+'</b></p>';}
    if(k===steps.length)h+='<p class="g">결과: 43,252,003,274,489,856,000 (약 4.3 × 10¹⁹, 4천3백경)가지 — 원자료 숫자와 같아요.</p><p class="note">큐브를 분해해 아무렇게나 끼우면 그 12배(약 5.2 × 10²⁰)가 생기는데, 그중 1/12만 돌려서 풀 수 있어요(08장).</p>';
    ou.innerHTML=h||'<p class="note">「한 단계 더」를 눌러 곱셈을 하나씩 해 보세요.</p>';
    s.innerHTML='';tx(s,10,18,'자릿수로 본 크기 (막대 하나 = 한 단계 뒤의 자릿수)',{'font-size':12,fill:C.mu});
    digs.forEach(function(d,i){E('rect',{x:20+i*120,y:150-d*5.5,width:80,height:d*5.5,fill:i===digs.length-1?C.acc:C.rule},s);tx(s,60+i*120,145-d*5.5,d+'자리',{'text-anchor':'middle','font-size':12});});}
  draw();
};

/* 순서가 중요한가: A 다음 B vs B 다음 A */
W.compare=function(el,o){
  var a=o.a||'R',b=o.b||'U',s=cubeSvg(el,'두 순서로 돌린 큐브 비교',600);
  var c=ctrl(el);H('span','glabel','A:',c);var ia=H('input',null,null,c);ia.value=a;var lb=H('span','glabel','B:',c);var ib=H('input',null,null,c);ib.value=b;
  [ia,ib].forEach(function(x){x.style.cssText='font:inherit;width:110px;padding:4px 8px;border:1px solid var(--rule);border-radius:8px';x.oninput=draw;});
  var c2=ctrl(el);(o.presets||[['R, U','R','U'],['R, L','R','L'],['U, D2','U','D2'],['R U, R','R U','R']]).forEach(function(p){btn(c2,p[0],function(){ia.value=p[1];ib.value=p[2];draw();});});
  var ou=out(el);
  function draw(){var A=CUBE.tok(ia.value),B=CUBE.tok(ib.value),s1=CUBE.move(CUBE.solved(),A.concat(B)),s2=CUBE.move(CUBE.solved(),B.concat(A)),diff=[];for(var i=0;i<54;i++)if(s1[i]!==s2[i])diff.push(i);
    s.innerHTML='';var g1=E('g',{},s),g2=E('g',{transform:'translate(0,300)'},s);
    var t1=E('svg',{x:0,y:20,width:640,height:270,viewBox:'0 0 640 330'},s),t2=E('svg',{x:0,y:310,width:640,height:270,viewBox:'0 0 640 330'},s);
    drawCube(t1,s1,{mark:diff});drawCube(t2,s2,{mark:diff});tx(s,8,16,'① A 다음 B: '+A.concat(B).join(' '),{'font-weight':700});tx(s,8,306,'② B 다음 A: '+B.concat(A).join(' '),{'font-weight':700});
    ou.innerHTML=diff.length?'<p class="a">두 결과가 <b>스티커 '+diff.length+'장</b>에서 달라요(보라 테두리). 순서를 바꾸면 결과가 달라지는 「비가환」이에요.</p>':'<p class="g">두 결과가 완전히 같아요. 이 두 움직임은 순서를 바꿔도 되는 「가환」 짝이에요.</p>';}
  draw();
};

/* 켤레와 교환자 만들기 */
W.conj=function(el,o){
  var A=o.a||"R U R'",B=o.b||'D',mode=o.mode||'comm',s=cubeSvg(el,'켤레·교환자로 바뀐 스티커');
  var As=o.as||[["R U R'","R U R'"],['F','F'],['R','R'],["R U","R U"],['U','U']],Bs=o.bs||[['D','D'],['U','U'],['D2','D2'],['R2','R2']];
  var c=ctrl(el);radio(c,'식 모양:',[['conj','켤레 A B A⁻¹'],['comm','교환자 A B A⁻¹ B⁻¹']],mode,function(v){mode=v;draw();});
  var c1=ctrl(el);radio(c1,'A (준비):',As,A,function(v){A=v;draw();});
  var c2=ctrl(el);radio(c2,'B (작업):',Bs,B,function(v){B=v;draw();});
  var ou=out(el);
  function draw(){var a=CUBE.tok(A),b=CUBE.tok(B),t=mode==='conj'?a.concat(b,CUBE.invSeq(a)):a.concat(b,CUBE.invSeq(a),CUBE.invSeq(b));
    var p=CUBE.perm(t),mv=CUBE.moved(p),pc=CUBE.piecesMoved(p),pb=CUBE.piecesMoved(CUBE.perm(b));
    drawCube(s,CUBE.apply(CUBE.solved(),p),{mark:mv,dim:function(i){return mv.indexOf(i)<0;}});
    ou.innerHTML='<p>식: <b>'+t.join(' ')+'</b> ('+t.length+'수)</p><p>B 하나만 돌리면 움직이는 조각: 꼭짓점 '+pb.corner+'개 · 모서리 '+pb.edge+'개</p>'+
      '<p class="'+(pc.corner+pc.edge<=3?'g':'a')+'">이 식이 움직이는 조각: <b>꼭짓점 '+pc.corner+'개 · 모서리 '+pc.edge+'개</b> (스티커 '+mv.length+'장, 반복 '+CUBE.order(p)+'번이면 제자리)</p>'+
      (mode==='comm'&&pc.corner+pc.edge===3?'<p class="g">딱 3개만 도는 「3-순환」이에요. 나머지는 흐리게 칠한 대로 전부 제자리!</p>':'');}
  draw();
};

/* 반복 횟수(차수) 비교 */
W.order=function(el,o){
  var L=o.list||[['R','R'],["R U R' U'","R U R' U' (섹시 무브)"],["R U R' U R U2 R'",'수네 (Sune)'],['R U','R U'],['R2 U2','R2 U2'],["F R U R' U' F'",'노란 십자 식']];
  var s=svg(el,640,230,'식마다 제자리까지 반복 횟수 막대'),ou=out(el);
  var data=L.map(function(x){var t=CUBE.tok(x[0]);return {lab:x[1],n:t.length,k:CUBE.order(CUBE.perm(t))};});
  var mx=Math.log10(Math.max.apply(null,data.map(function(d){return d.k;}))+1);
  tx(s,10,16,'반복 횟수 (막대 길이는 자릿수 눈금)',{'font-size':12,fill:C.mu});
  data.forEach(function(d,i){var y=30+i*32,w=40+520*Math.log10(d.k+1)/mx;E('rect',{x:150,y:y,width:w*0.8,height:22,rx:4,fill:d.k>50?C.r:C.acc},s);tx(s,8,y+16,d.lab,{'font-size':12});tx(s,156+w*0.8,y+16,d.k+'번',{'font-size':13,'font-weight':700});});
  ou.innerHTML='<p>같은 식을 계속 반복하면 <b>언젠가 반드시</b> 처음 상태로 돌아와요. 큐브의 상태 수가 유한하기 때문이에요. 「R U」처럼 짧은 식도 105번이 걸릴 수 있어요.</p>';
};

/* 풀이법 단계별로 맞춰진 스티커 보기 */
function sel(fn){var r={};CUBE.ST.forEach(function(t,i){if(fn(t.p,t.n,i))r[i]=1;});return r;}
function isC(p){return Math.abs(p[0])+Math.abs(p[1])+Math.abs(p[2])===3;}function isE(p){return Math.abs(p[0])+Math.abs(p[1])+Math.abs(p[2])===2;}function isCtr(p){return Math.abs(p[0])+Math.abs(p[1])+Math.abs(p[2])===1;}
var METHODS={
 lbl:{name:'층마다 쌓기 (LBL)',steps:[
   ['흰 십자','아랫면(흰색)의 모서리 4개를 옆 색까지 맞춰요.',function(p){return isCtr(p)||(isE(p)&&p[1]===-1);}],
   ['흰 꼭짓점','아랫면 꼭짓점 4개 → 첫째 층 완성. 「R U R′ U′」를 몇 번 반복.',function(p){return isCtr(p)||p[1]===-1;}],
   ['가운데 층','가운데 층 모서리 4개 → 두 층(F2L) 완성.',function(p){return isCtr(p)||p[1]<=0;}],
   ['노란 십자','윗면 모서리 4개의 노란 스티커를 위로. 「F R U R′ U′ F′」',function(p,n){return isCtr(p)||p[1]<=0||(isE(p)&&p[1]===1&&n[1]===1);}],
   ['노란 모서리 옆면','윗면 모서리를 옆 색까지 맞춰요.',function(p){return isCtr(p)||p[1]<=0||(isE(p)&&p[1]===1);}],
   ['노란 꼭짓점 자리','꼭짓점을 맞는 자리로(방향은 아직). 흐린 스티커 = 자리만 맞음.',function(p){return isCtr(p)||p[1]<=0||(isE(p)&&p[1]===1);},function(p){return isC(p)&&p[1]===1;}],
   ['노란 꼭짓점 방향','「R′ D′ R D」 반복으로 꼭짓점을 비틀어 맞춰요.',function(){return true;}],
   ['완성','여덟 단계 끝. 대개 100수 이상 걸려요.',function(){return true;}]]},
 cfop:{name:'CFOP',steps:[
   ['Cross (십자)','아랫면 모서리 4개. 잘하면 8수 안에.',function(p){return isCtr(p)||(isE(p)&&p[1]===-1);}],
   ['F2L 1쌍','꼭짓점+모서리 한 쌍을 함께 끼워요.',function(p){return isCtr(p)||(isE(p)&&p[1]===-1)||(p[1]<=0&&p[0]===1&&p[2]===1);}],
   ['F2L 4쌍','네 쌍 → 두 층 완성. 경우 41가지.',function(p){return isCtr(p)||p[1]<=0;}],
   ['OLL (윗면 방향)','윗면을 모두 노랗게. 57가지 중 하나를 알아보고 해당 식.',function(p,n){return isCtr(p)||p[1]<=0||(p[1]===1&&n[1]===1);}],
   ['PLL (윗면 자리)','옆면까지 완성. 21가지 중 하나.',function(){return true;}]]},
 roux:{name:'Roux',steps:[
   ['첫 블록 (왼쪽 1×2×3)','왼쪽 아래 두 층 덩어리를 자유롭게 만들어요.',function(p){return (p[0]===-1&&p[1]<=0)||(isCtr(p)&&p[0]===-1);}],
   ['둘째 블록 (오른쪽 1×2×3)','가운데 세로줄(M)은 비워 두고 오른쪽 덩어리.',function(p){return (p[0]!==0&&p[1]<=0)||(isCtr(p)&&p[0]!==0);}],
   ['CMLL (윗면 꼭짓점)','남은 꼭짓점 4개를 42가지 식 중 하나로.',function(p){return (p[0]!==0&&p[1]<=0)||isCtr(p)&&p[0]!==0||(isC(p)&&p[1]===1);}],
   ['LSE (마지막 6모서리)','M(가운데 세로줄)과 U만 돌려 모서리 6개 정리.',function(){return true;}]]},
 zz:{name:'ZZ',steps:[
   ['EOLine','모서리 12개의 방향을 모두 맞추고(흐린 노랑 표시) 아래 앞·뒤 모서리 두 개를 제자리에.',function(p){return isCtr(p)||(isE(p)&&p[1]===-1&&p[0]===0);},function(p){return isE(p);}],
   ['F2L (L·R·U만)','이제 L, R, U만 돌려 두 층 완성. 큐브를 손에서 돌려 쥘 필요 없음.',function(p){return isCtr(p)||p[1]<=0;},function(p){return isE(p)&&p[1]===1;}],
   ['ZBLL (마지막 층 한 번에)','모서리 방향이 이미 맞아 OLL을 건너뛰고 493가지 중 하나로 끝.',function(){return true;}]]}
};
W.stages=function(el,o){
  var m=o.method||'lbl',k=0,s=cubeSvg(el,'풀이 단계별로 맞춰진 부분');
  var c0=ctrl(el);if(o.choose)radio(c0,'풀이법:',[['lbl','LBL'],['cfop','CFOP'],['roux','Roux'],['zz','ZZ']],m,function(v){m=v;k=0;mk();draw();});
  var c=ctrl(el),bs=[];function mk(){c.innerHTML='';bs=METHODS[m].steps.map(function(x,i){return btn(c,(i+1)+'. '+x[0],function(){k=i;draw();},i===k);});}mk();
  var ou=out(el);
  function draw(){var S=METHODS[m].steps[k],done=sel(S[2]),half=S[3]?sel(S[3]):{};bs.forEach(function(b,i){b.setAttribute('aria-pressed',i===k?'true':'false');});
    drawCube(s,CUBE.solved(),{mask:function(i){return !done[i]&&!half[i];},dim:function(i){return half[i]&&!done[i];}});
    var n=Object.keys(done).length;ou.innerHTML='<p><b>'+METHODS[m].name+' '+(k+1)+'단계 · '+S[0]+'</b> — '+S[1]+'</p><p class="note">색이 있는 스티커 = 이 단계까지 맞춘 곳 ('+n+'/54장). 회색 = 아직. 흐린 색 = 일부만 맞음.</p>';}
  draw();
};

/* 윗면 경우 모양 (OLL/PLL) */
W.llcases=function(el,o){
  var OLL=[['점 (dot)',[4]],['줄 (line)',[3,4,5]],['L 모양',[1,4,5]],['십자 (cross)',[1,3,4,5,7]],['물고기 (fish)',[1,3,4,5,7,8]],['완성',[0,1,2,3,4,5,6,7,8]]];
  var PLL=[['T-perm','인접한 꼭짓점 둘 + 모서리 둘 맞바꿈',[[0,2],[3,5]]],['Y-perm','대각선 꼭짓점 둘 + 모서리 둘 맞바꿈',[[0,8],[1,3]]],['H-perm','마주 보는 모서리끼리 두 쌍',[[1,7],[3,5]]],['Ua-perm','모서리 셋이 한 바퀴',[[1,5,7]]],['Aa-perm','꼭짓점 셋이 한 바퀴',[[0,2,8]]]];
  var mode='oll',s=svg(el,640,240,'윗면 3×3 무늬'),c=ctrl(el);radio(c,'보기:',[['oll','OLL 무늬 (방향)'],['pll','PLL 화살표 (자리)']],mode,function(v){mode=v;draw();});
  var ou=out(el);
  function grid(x,y,on,sz){for(var i=0;i<9;i++)E('rect',{x:x+(i%3)*sz,y:y+Math.floor(i/3)*sz,width:sz-3,height:sz-3,rx:3,fill:on.indexOf(i)>=0?'#f5d90a':'#8d959e',stroke:C.k},s);}
  function ctr(x,y,i,sz){return [x+(i%3)*sz+sz/2-1.5,y+Math.floor(i/3)*sz+sz/2-1.5];}
  function draw(){s.innerHTML='';
    if(mode==='oll'){OLL.forEach(function(d,i){var x=12+i*104;grid(x,40,d[1],28);tx(s,x+42,150,d[0],{'text-anchor':'middle','font-size':12});});ou.innerHTML='<p>OLL은 윗면 「노란색 무늬」만 보고 57가지 중 어느 경우인지 알아봐요. 무늬 이름(점·줄·L·물고기…)으로 묶어 외워요. (완성 무늬는 OLL을 건너뜀)</p>';}
    else{var mk=E('defs',{},s);var m=E('marker',{id:'arw'+el.id,viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:6,markerHeight:6,orient:'auto-start-reverse'},mk);E('path',{d:'M0,0 L10,5 L0,10 z',fill:C.k},m);
      PLL.forEach(function(d,i){var x=12+i*126,sz=34;grid(x,30,[0,1,2,3,4,5,6,7,8],sz);d[2].forEach(function(cy){for(var j=0;j<cy.length;j++){var a=ctr(x,30,cy[j],sz),b=ctr(x,30,cy[(j+1)%cy.length],sz);if(cy.length===2&&j===1)break;
        E('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:C.k,'stroke-width':2.5,'marker-end':'url(#arw'+el.id+')','marker-start':cy.length===2?'url(#arw'+el.id+')':''},s);}});
        tx(s,x+51,160,d[0],{'text-anchor':'middle','font-size':12,'font-weight':700});tx(s,x+51,178,d[1].slice(0,12),{'text-anchor':'middle','font-size':10,fill:C.mu});tx(s,x+51,192,d[1].slice(12),{'text-anchor':'middle','font-size':10,fill:C.mu});});
      ou.innerHTML='<p>PLL은 윗면이 다 노란 뒤, 조각들이 <b>어디로 자리를 바꿔야 하는지</b>를 화살표로 알아봐요. 21가지. 화살표 끝이 양쪽이면 맞바꿈, 한쪽이면 한 바퀴 돌기.</p>';}}
  draw();if(el.id==='')el.id='ll'+Math.floor(Math.random()*1e6);
};

/* 외울 식의 양 (원자료 표, 바로잡은 값) */
W.memo=function(el,o){
  var D=[['PLL',21],['WV',27],['ELL',29],['COLL',40],['CLL',42],['OLL',57],['VLS',216],['ZBLL',493],['1LLL',3915]],pick={PLL:1,OLL:1};
  var s=svg(el,640,300,'식 묶음별 외울 개수 막대'),c=ctrl(el);H('span','glabel','배울 묶음 고르기:',c);
  var bs=D.map(function(d){return btn(c,d[0],function(b){pick[d[0]]=!pick[d[0]];draw();},!!pick[d[0]]);});
  var c2=ctrl(el),per=10;slider(c2,'한 주에 외우는 식',2,30,1,per,function(v){per=v;draw();return v+'개';});
  var ou=out(el);
  function draw(){s.innerHTML='';var tot=0;bs.forEach(function(b,i){b.setAttribute('aria-pressed',pick[D[i][0]]?'true':'false');});
    tx(s,10,16,'외울 식의 수 (막대는 자릿수 눈금, 1LLL은 약 3,915)',{'font-size':12,fill:C.mu});
    D.forEach(function(d,i){var y=28+i*29,w=Math.log10(d[1])*150;if(pick[d[0]])tot+=d[1];E('rect',{x:80,y:y,width:w,height:21,rx:4,fill:pick[d[0]]?C.acc:C.rule},s);tx(s,8,y+15,d[0],{'font-size':13,'font-weight':700});tx(s,86+w,y+15,fmt(d[1]),{'font-size':12});});
    var wk=Math.ceil(tot/per);ou.innerHTML='<p>고른 묶음의 식: <b>'+fmt(tot)+'개</b> → 한 주에 '+per+'개씩이면 약 <b>'+wk+'주</b>('+(wk/52).toFixed(1)+'년). 실제로는 복습 시간이 더 들어요.</p><p class="note">개수는 대칭을 어떻게 세느냐에 따라 자료마다 조금씩 달라요.</p>';}
  draw();
};

/* 카드 펼치기 */
W.cards=function(el,o){
  (o.cards||[]).forEach(function(c,i){var d=H('details',null,'<summary>'+c[0]+'</summary>'+c[1],el);if(i===0&&o.open0)d.open=true;});
};
})();
