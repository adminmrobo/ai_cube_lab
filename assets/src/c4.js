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
