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

/* 위젯 모음 2: 대수(군론) 실험 — 모서리 방향, 스티커 번호, 조립 검사, 잉여류, 깔때기 */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,ctrl=U.ctrl,btn=U.btn,radio=U.radio,slider=U.slider,out=U.out,tx=U.tx,fmt=U.fmt;
function cubeSvg(el,label){return window.cubeSvg(el,label);}

/* 모서리 방향: 뒤집힌 모서리 개수 세기 (ZZ의 EO) */
function badEdges(st){var n=0,L=[];CUBE.EDGE.forEach(function(a){var c0=st[a[0]],c1=st[a[1]];var ud0=c0===0||c0===3,ud1=c1===0||c1===3,ok;
  if(ud0||ud1)ok=ud0;else ok=(c0===2||c0===5);if(!ok){n++;L.push(a[0],a[1]);}});return {n:n,L:L};}
window.badEdges=badEdges;
W.eo=function(el,o){
  var st=CUBE.solved(),hist=[],set=o.set||'all',s=cubeSvg(el,'뒤집힌 모서리를 표시한 큐브');
  var c=ctrl(el);radio(c,'쓸 수 있는 움직임:',[['all','18가지 전부'],['zz','L·R·U·D만']],set,function(v){set=v;mk();});
  var c2=ctrl(el);function mk(){c2.innerHTML='';var ms=set==='zz'?['L',"L'",'R',"R'",'U',"U'",'D',"D'",'L2','R2','U2','D2']:CUBE.MOVES;
    ms.forEach(function(m){btn(c2,m,function(){st=CUBE.move(st,m);hist.push(m);draw();}).setAttribute('aria-label',moveKo(m));});
    btn(c2,'아무렇게나 30수',function(){var R=LAB.rng((Date.now()%997)+3);for(var i=0;i<30;i++){var m=ms[Math.floor(R()*ms.length)];st=CUBE.move(st,m);hist.push(m);}draw();});
    btn(c2,'처음으로',function(){st=CUBE.solved();hist=[];draw();});}
  mk();var ou=out(el);
  function draw(){var b=badEdges(st);drawCube(s,st,{mark:b.L});
    ou.innerHTML='<p>돌린 수: '+hist.length+'수 · <b class="'+(b.n?'a':'g')+'">뒤집힌 모서리 '+b.n+'개</b> (보라 테두리)</p><p class="note">'+(set==='zz'?'L·R·U·D만 쓰면 아무리 돌려도 뒤집힌 모서리가 생기지 않아요. 그래서 ZZ는 처음에 방향을 한 번 맞춰 두면 끝까지 유지돼요.':'F나 B를 90°로 돌릴 때마다 모서리 4개의 뒤집힘이 바뀌어요. 그래서 뒤집힌 개수는 늘 짝수예요.')+'</p>';}
  draw();
};

/* 스티커 번호와 순열 (가운데 6장을 뺀 48장, U L F R B D 순서로 번호) */
var NUM={},ORD='ULFRBD';(function(){var n=1;ORD.split('').forEach(function(f){var base='URFDLB'.indexOf(f)*9;for(var k=0;k<9;k++){if(k===4)continue;NUM[base+k]=n++;}});})();
window.STICKNUM=NUM;
W.facelets=function(el,o){
  var mv=o.seq||'R',s=svg(el,640,330,'번호를 붙인 스티커의 펼친 그림');
  var c=ctrl(el);radio(c,'움직임:',(o.list||[['R','R'],['U','U'],['F2','F2'],["R U R' U'","R U R' U'"]]),mv,function(v){mv=v;draw();});
  var ou=out(el);
  var NET={U:[3,0],L:[0,3],F:[3,3],R:[6,3],B:[9,3],D:[3,6]};
  function draw(){var p=CUBE.perm(mv),st=CUBE.solved(),num=[];for(var i=0;i<54;i++)num[p[i]]=i;
    s.innerHTML='';var u=50,ox=10,oy=10;
    CUBE.ST.forEach(function(t,i){var f=t.f,k=i%9,r=Math.floor(k/3),cc=k%3,x=ox+(NET[f][0]+cc)*u,y=oy+(NET[f][1]+r)*u,src=num[i],ch=src!==i;
      E('rect',{x:x+1,y:y+1,width:u-2,height:u-2,rx:3,fill:CUBE.COL[Math.floor(src/9)],stroke:ch?C.m:C.k,'stroke-width':ch?3:1},s);
      var lab=NUM[src]!=null?String(NUM[src]):f;tx(s,x+u/2,y+u/2+5,lab,{'text-anchor':'middle','font-size':15,'font-weight':700,fill:(Math.floor(src/9)===3||Math.floor(src/9)===0)?'#16212b':'#fff'});});
    /* 순환 표기 */
    var seen={},cyc=[];Object.keys(NUM).forEach(function(k){k=+k;if(seen[k]||p[k]===k)return;var c1=[],j=k;while(!seen[j]){seen[j]=1;c1.push(NUM[j]);j=p[j];}if(c1.length>1)cyc.push('('+c1.join(',')+')');});
    ou.innerHTML='<p><b>'+mv+'</b>를 돌리면 번호가 이렇게 자리를 옮겨요(→ 방향으로 읽기):</p><p style="font-variant-numeric:tabular-nums;word-break:break-all">'+cyc.join(' ')+'</p><p class="note">괄호 하나 = 한 바퀴 도는 번호 무리(순환). 괄호 '+cyc.length+'개, 움직인 스티커 '+cyc.reduce(function(a,c){return a+c.split(',').length;},0)+'장. 보라 테두리 = 자리가 바뀐 스티커.</p>';}
  draw();
};

/* 조립 검사기: 세 조건 (비틀림 합, 뒤집힘 합, 자리 바꿈 짝) */
function randomAssembly(R){var st=new Array(54),cp=[0,1,2,3,4,5,6,7],ep=[0,1,2,3,4,5,6,7,8,9,10,11],S=CUBE.solved();
  function sh(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(R()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}}sh(cp);sh(ep);
  for(var i=0;i<54;i++)st[i]=S[i];
  CUBE.CORN.forEach(function(slot,i){var pc=CUBE.CORN[cp[i]].map(function(x){return S[x];}),r=Math.floor(R()*3);for(var k=0;k<3;k++)st[slot[k]]=pc[(k+r)%3];});
  CUBE.EDGE.forEach(function(slot,i){var pc=CUBE.EDGE[ep[i]].map(function(x){return S[x];}),r=Math.floor(R()*2);for(var k=0;k<2;k++)st[slot[k]]=pc[(k+r)%2];});
  return st;}
window.randomAssembly=randomAssembly;
W.valid=function(el,o){
  var st=CUBE.solved(),log=[],s=cubeSvg(el,'조립 상태를 검사하는 큐브'),R=LAB.rng(11);
  function rotC(i){var a=CUBE.CORN[i],x=st[a[0]];st[a[0]]=st[a[2]];st[a[2]]=st[a[1]];st[a[1]]=x;}
  function flipE(i){var a=CUBE.EDGE[i],x=st[a[0]];st[a[0]]=st[a[1]];st[a[1]]=x;}
  function swapP(L,i,j){var a=L[i],b=L[j];for(var k=0;k<a.length;k++){var x=st[a[k]];st[a[k]]=st[b[k]];st[b[k]]=x;}}
  var c=ctrl(el);H('span','glabel','분해해서 손대기:',c);
  btn(c,'꼭짓점 하나 비틀기',function(){rotC(Math.floor(R()*8));log.push('꼭짓점 비틀기');draw();});
  btn(c,'모서리 하나 뒤집기',function(){flipE(Math.floor(R()*12));log.push('모서리 뒤집기');draw();});
  btn(c,'모서리 둘 맞바꾸기',function(){var i=Math.floor(R()*12),j=(i+1+Math.floor(R()*11))%12;swapP(CUBE.EDGE,i,j);log.push('모서리 맞바꾸기');draw();});
  btn(c,'꼭짓점 둘 맞바꾸기',function(){var i=Math.floor(R()*8),j=(i+1+Math.floor(R()*7))%8;swapP(CUBE.CORN,i,j);log.push('꼭짓점 맞바꾸기');draw();});
  var c2=ctrl(el);H('span','glabel','규칙대로:',c2);
  btn(c2,'정상적으로 20수 돌리기',function(){st=CUBE.move(st,CUBE.scramble(20,Math.floor(R()*9999)+1));log.push('정상 20수');draw();});
  btn(c2,'아무렇게나 다시 조립',function(){st=randomAssembly(R);log=['무작위 조립'];draw();});
  btn(c2,'새 큐브',function(){st=CUBE.solved();log=[];draw();});
  var ou=out(el);
  function meter(ok,label,val){return '<p class="'+(ok?'g':'r')+'">'+(ok?'통과':'실패')+' · '+label+' — '+val+'</p>';}
  function draw(){drawCube(s,st,{});var a=CUBE.analyze(st);
    ou.innerHTML='<p>한 일: '+(log.length?log.slice(-6).join(' → '):'(아직 없음)')+'</p>'+
      meter(a.twist===0,'① 꼭짓점 비틀림의 합을 3으로 나눈 나머지가 0','나머지 '+a.twist)+
      meter(a.flip===0,'② 뒤집힌 모서리 수가 짝수','나머지 '+a.flip+(a.flip?' (홀수)':' (짝수)'))+
      meter(a.pc===a.pe,'③ 꼭짓점 자리 바꿈과 모서리 자리 바꿈의 홀짝이 같음','꼭짓점 '+(a.pc?'홀':'짝')+' · 모서리 '+(a.pe?'홀':'짝'))+
      '<p><b class="'+(a.ok?'g':'r')+'">'+(a.ok?'판정: 돌려서 풀 수 있는 큐브':'판정: 아무리 돌려도 풀 수 없는 큐브')+'</b></p>';}
  draw();
  if(o.trial){var c3=ctrl(el),o3=out(el);btn(c3,'아무렇게나 조립 1,200번 실험',function(){var R2=LAB.rng((Date.now()%991)+5),ok=0,tw=0,fl=0,pa=0;for(var t=0;t<1200;t++){var a=CUBE.analyze(randomAssembly(R2));if(a.ok)ok++;if(a.twist===0)tw++;if(a.flip===0)fl++;if(a.pc===a.pe)pa++;}
    o3.innerHTML='<p>1,200번 중 풀 수 있는 조립: <b>'+ok+'번 ('+(100*ok/1200).toFixed(1)+'%)</b> — 이론값 1/12 ≈ 8.3%</p><p class="note">조건별 통과: ① '+(100*tw/1200).toFixed(1)+'% (이론 33.3%) · ② '+(100*fl/1200).toFixed(1)+'% (이론 50%) · ③ '+(100*pa/1200).toFixed(1)+'% (이론 50%)</p>';});}
};

/* 12시간 시계로 보는 부분군과 잉여류 */
W.cosets=function(el,o){
  var d=o.d||4,g=o.g||7,mode=o.mode||'coset',s=svg(el,640,300,'12시간 시계의 잉여류');
  var c=ctrl(el);radio(c,'부분군 H (d의 배수):',[[2,'2의 배수'],[3,'3의 배수'],[4,'4의 배수'],[6,'6의 배수']],d,function(v){d=+v;draw();});
  var c2=ctrl(el);slider(c2,'찾을 시각 g',0,11,1,g,function(v){g=v;draw();return v+'시';});
  var ou=out(el),cols=['#1e55c8','#c9302c','#13733a','#a35c00','#9b3fb5','#0b7a86'];
  function draw(){s.innerHTML='';var cx=150,cy=150,R=110,k=12/d;
    for(var i=0;i<12;i++){var a=-Math.PI/2+i*Math.PI/6,x=cx+R*Math.cos(a),y=cy+R*Math.sin(a),r=i%d;
      E('circle',{cx:x,cy:y,r:i===g?19:15,fill:cols[r],'fill-opacity':r===0?1:0.75,stroke:i===g?C.k:'#fff','stroke-width':i===g?3:1},s);tx(s,x,y+5,String(i),{'text-anchor':'middle',fill:'#fff','font-weight':700});}
    tx(s,cx,cy-6,'H = '+d+'의 배수',{'text-anchor':'middle','font-size':13,'font-weight':700});tx(s,cx,cy+14,'(파란 점 '+k+'개)',{'text-anchor':'middle','font-size':12,fill:C.mu});
    var x0=320;tx(s,x0,26,'잉여류 = H를 통째로 옮긴 무리',{'font-size':13,'font-weight':700});
    for(var r=0;r<d;r++){var mem=[];for(var j=r;j<12;j+=d)mem.push(j);E('rect',{x:x0,y:40+r*40,width:16,height:16,rx:3,fill:cols[r]},s);tx(s,x0+24,53+r*40,(r?r+' + H':'H 자신')+' = {'+mem.join(', ')+'}',{'font-size':13,'font-weight':r===g%d?700:400});}
    var rr=g%d;ou.innerHTML='<p>12개를 '+k+'개씩 <b>'+d+'개 무리</b>로 나눴어요: 12 ÷ '+k+' = '+d+' (|G| ÷ |H|). 무리끼리 겹치지도, 빠지지도 않아요.</p>'+
      '<p><b>두 단계로 '+g+'시 맞추기</b> — ① 먼저 '+rr+'시간 되돌려 H(파란 무리)에 들어가기: '+g+' → '+(g-rr)+'시 ② 그다음 H 안에서 '+d+'시간씩만 움직여 0시로: '+(g-rr)/d+'번.</p>'+'<p class="note">큐브 풀이 프로그램도 똑같이 해요. ① 먼저 「작은 무리 H」에 들어가고 ② H 안에서만 마무리.</p>';}
  draw();
};

/* 깔때기: 티슬스웨이트 4단계 / 코시엠바 2단계 */
var FUN={
 thistle:{name:'티슬스웨이트 (1981)',rows:[['G₀ → G₁','⟨L, R, F, B, U², D²⟩','모서리 방향 맞추기',2048n,7,7],['G₁ → G₂','⟨L, R, F², B², U², D²⟩','꼭짓점 방향 + 가운데 층 모서리 모으기',1082565n,13,10],['G₂ → G₃','⟨L², R², F², B², U², D²⟩','조각을 맞는 궤도로',29400n,15,13],['G₃ → G₄','{I} (다 맞춘 상태)','반 바퀴만으로 완성',663552n,17,15]]},
 kociemba:{name:'코시엠바 2단계 (1992)',rows:[['G → H','⟨U, D, R², L², F², B²⟩','모서리·꼭짓점 방향 + 가운데 층 모서리',2217093120n,12,12],['H → {I}','10가지 움직임만 사용','H 안에서 완성',19508428800n,18,18]]}};
W.funnel=function(el,o){
  var a=o.alg||'thistle',best=false,s=svg(el,640,250,'단계별 잉여류 크기 막대');
  var c=ctrl(el);radio(c,'알고리즘:',[['thistle','티슬스웨이트 4단계'],['kociemba','코시엠바 2단계']],a,function(v){a=v;draw();});
  var c2=ctrl(el);var bb=btn(c2,'단계별 최대 수: 처음 발표값',function(){best=!best;bb.textContent=best?'단계별 최대 수: 나중에 전수 조사한 값':'단계별 최대 수: 처음 발표값';draw();});
  var ou=out(el);
  function draw(){var F=FUN[a],prod=1n,tot=0;s.innerHTML='';tx(s,10,16,'단계마다 찾아야 하는 상태 수 (막대는 자릿수 눈금)',{'font-size':12,fill:C.mu});
    F.rows.forEach(function(r,i){prod*=r[3];var mm=best?r[5]:r[4];tot+=mm;var dg=r[3].toString().length,w=dg*44,y=30+i*52;
      E('rect',{x:110,y:y,width:w,height:30,rx:5,fill:C.acc,'fill-opacity':0.35+0.15*i},s);tx(s,8,y+20,r[0],{'font-weight':700});tx(s,116+w,y+14,fmt(r[3])+'가지',{'font-size':12});tx(s,116+w,y+30,'최대 '+mm+'수 · '+r[2],{'font-size':11,fill:C.mu});});
    var G=43252003274489856000n;
    ou.innerHTML='<p><b>'+F.name+'</b>: 단계별 상태 수를 모두 곱하면 <b>'+fmt(prod)+'</b> '+(prod===G?'<span class="g">= 큐브 전체 상태 수 |G|와 정확히 같아요.</span>':'')+'</p>'+
      '<p>단계별 최대 수를 더하면 <b>'+tot+'수</b>'+(a==='thistle'?(best?' (나중에 컴퓨터로 단계마다 전부 조사해 알아낸 최댓값 7 + 10 + 13 + 15)':' (1981년 발표: 7 + 13 + 15 + 17)'):(best?'':''))+'.</p>'+
      (a==='kociemba'?'<p class="note">코시엠바 방식은 「최단」을 보장하지 않지만, 두 단계를 함께 조금 더 찾아보면 대개 20~22수 해답을 1초 안에 내요.</p>':'');}
  draw();
};
})();

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

/* 위젯 모음 4: 막대 정리 + 조교 대결 판정 (계산으로만 판정) */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,out=U.out,tx=U.tx,fmt=U.fmt;

W.bars=function(el,o){
  var R=o.rows||[],mx=Math.max.apply(null,R.map(function(r){return r[1];})),s=svg(el,640,40+R.length*40,o.title||'막대 그래프');
  tx(s,10,18,o.title||'',{'font-size':12,fill:C.mu});
  R.forEach(function(r,i){var y=32+i*40,w=r[1]/mx*330;tx(s,10,y+17,r[0],{'font-size':13});E('rect',{x:250,y:y,width:w,height:24,rx:4,fill:r[2]||C.acc},s);tx(s,256+w,y+17,(r[3]||'약 ')+r[1]+'수',{'font-size':13,'font-weight':700});});
  if(o.note)H('p','note',o.note,el);
};

function rep(s){return s;}
DUELS.count_years=function(){var sec=43252003274489856000/1,yr=sec/31557600,age=1.38e10,ratio=yr/age;
  return {fly:ratio>50&&ratio<200,robo:ratio<1,report:'4.3 × 10¹⁹초 ÷ 1년(약 3,156만 초) ≈ <b>'+(yr/1e12).toFixed(2)+'조 년</b>. 우주 나이 138억 년의 약 <b>'+Math.round(ratio)+'배</b>예요.'};};
DUELS.inverse=function(){var base=CUBE.tok("R U R' U'"),f=CUBE.tok("U R U' R'"),r=CUBE.tok("R' U' R U");
  var okF=CUBE.isSolved(CUBE.move(CUBE.solved(),base.concat(f))),okR=CUBE.isSolved(CUBE.move(CUBE.solved(),base.concat(r)));
  var mv=CUBE.moved(CUBE.perm(base.concat(r))).length;
  return {fly:okF,robo:okR,report:'R U R′ U′ 뒤에 붙여 돌려 봤어요. 초파리 식(U R U′ R′): <b>'+(okF?'제자리':'제자리 아님')+'</b>. 주판봇 식(R′ U′ R U): <b>'+(okR?'제자리':'제자리 아님 — 스티커 '+mv+'장이 어긋남')+'</b>.'};};
DUELS.ll_ratio=function(){var r=3915/78;return {fly:Math.abs(r-50)<5,robo:Math.abs(r-10)<5,report:'3,915 ÷ (57 + 21) = 3,915 ÷ 78 ≈ <b>'+r.toFixed(1)+'배</b>예요.'};};
DUELS.eo_keep=function(){var R=LAB.rng(2024),ms=['L',"L'",'L2','R',"R'",'R2','U',"U'",'U2','D',"D'",'D2'],st=CUBE.solved(),mx=0;
  for(var i=0;i<100;i++){st=CUBE.move(st,ms[Math.floor(R()*ms.length)]);mx=Math.max(mx,badEdges(st).n);}
  var n=badEdges(st).n;return {fly:n===0&&mx===0,robo:n>0,report:'L·R·U·D만 무작위 100수를 돌렸어요. 도중 최대 뒤집힌 모서리 <b>'+mx+'개</b>, 끝났을 때 <b>'+n+'개</b>.'};};
DUELS.zbll_weeks=function(){var w=Math.ceil(493/10);return {fly:w>=104,robo:w<=52,report:'493 ÷ 10 = 49.3 → <b>'+w+'주</b>. 1년(52주) 안이에요. (복습 시간은 빠진 계산)'};};
DUELS.ru_order=function(){var k=CUBE.order(CUBE.perm('R U'));return {fly:k===105,robo:k===4,report:'R U를 처음 상태에서 반복해 처음으로 제자리가 된 횟수: <b>'+k+'번</b>.'};};
DUELS.comm3=function(){var pc=CUBE.piecesMoved(CUBE.perm("R U R' D R U' R' D'"));var n=pc.corner+pc.edge;return {fly:pc.corner===3&&pc.edge===0,robo:n>=8,report:'[R U R′, D]를 실제로 돌려 움직인 조각을 셌어요: 꼭짓점 <b>'+pc.corner+'개</b>, 모서리 <b>'+pc.edge+'개</b>.'};};
DUELS.assembly=function(){var R=LAB.rng(777),ok=0;for(var i=0;i<1200;i++)if(CUBE.analyze(randomAssembly(R)).ok)ok++;var p=100*ok/1200;
  return {fly:Math.abs(p-8.33)<3,robo:Math.abs(p-50)<3,report:'무작위 조립 1,200번 중 풀 수 있는 큐브: <b>'+ok+'번 ('+p.toFixed(1)+'%)</b>. 이론값 1/12 ≈ 8.3%.'};};
DUELS.coset_count=function(){var q=43252003274489856000n/19508428800n;var v=Number(q);return {fly:Math.abs(v-2.2e9)<2e8,robo:Math.abs(v-2.2e8)<2e7,report:'43,252,003,274,489,856,000 ÷ 19,508,428,800 = <b>'+fmt(q)+'</b> (약 22억)'};};
DUELS.funnel_product=function(){var P=2048n*1082565n*29400n*663552n,S=2048+1082565+29400+663552,G=43252003274489856000n;
  return {fly:P===G,robo:BigInt(S)===G,report:'곱: <b>'+fmt(P)+'</b> '+(P===G?'= |G₀| ✓':'')+' · 합: '+fmt(S)+' (|G₀|와 전혀 다름)'};};
DUELS.layers3=function(){var start=CUBE.solved(),key=function(s){return s.join('');},seen=new Set([key(start)]),fr=[start],tot=1;
  for(var d=1;d<=3;d++){var nf=[];fr.forEach(function(st){CUBE.MOVES.forEach(function(m){var r=CUBE.apply(st,CUBE.M[m]),k=key(r);if(!seen.has(k)){seen.add(k);nf.push(r);}});});fr=nf;tot+=nf.length;}
  return {fly:tot===3502,robo:tot===6175,report:'컴퓨터가 0~3수 거리의 서로 다른 상태를 직접 셌어요: 합 <b>'+fmt(tot)+'개</b>.'};};
DUELS.ida_vs_dfs=function(){var t=CUBE.scramble(5,3*31+5),a=cubeSolve(t,false,4e6),b=cubeSolve(t,true,4e6),r=a.nodes/b.nodes;
  return {fly:r>=10,robo:r<2,report:'섞기 '+t.join(' ')+' · 그냥 깊이 우선 <b>'+fmt(a.nodes)+'개</b>'+(a.ok?'':'(멈춤)')+' vs IDA* <b>'+fmt(b.nodes)+'개</b> → 약 <b>'+fmt(Math.round(r))+'배</b> 차이. 찾은 해답 '+(b.ok?b.sol.length+'수':'없음')+'.'};};
DUELS.mode18=function(){var P=[[15,0.2],[16,2.6],[17,26.7],[18,67.0],[19,3.4]],R=LAB.rng(1818),cnt={};for(var t=0;t<1000;t++){var r=R()*99.9,acc=0;for(var k=0;k<P.length;k++){acc+=P[k][1];if(r<acc){cnt[P[k][0]]=(cnt[P[k][0]]||0)+1;break;}}}
  var best=Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a];})[0];return {fly:+best===18,robo:+best===20,report:'1,000개 중 가장 많은 길이: <b>'+best+'수 ('+cnt[best]+'개)</b>, 20수는 '+(cnt[20]||0)+'개.'};};
DUELS.bad_subgoal=function(){var T=1000,sg=subgoalsNum(T,true),cur=1,ok=true,fail='';sg.concat([T]).forEach(function(g){if(!ok)return;var r=bfsNum(cur,g,2e5);if(!r.ok){ok=false;fail=cur+' → '+g;}else cur=g;});
  return {fly:!ok,robo:ok,report:'생성기 목표: '+sg.join(' → ')+' → '+T+'. 결과: <b>'+(ok?'성공':'실패 ('+fail+' 구간에서 닿을 수 없음)')+'</b>.'};};
DUELS.qtm26=function(){return {fly:true,robo:false,report:'cube20.org 기록: 반 바퀴도 한 수(HTM) 기준 <b>20</b>, 4분의 1 바퀴만 한 수(QTM) 기준 <b>26</b>. 질문은 QTM이에요.'};};
})();

