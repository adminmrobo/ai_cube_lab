/* 실전 연습장: 큐브 사업장 시뮬레이터 (외부 라이브러리 없음, 기록은 현재 탭에만) */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,tx=U.tx,fmt=U.fmt;
var root=document.getElementById('sim');if(!root)return;
var SC={};
function kpi(cls,val,label){return '<div class="kpi '+cls+'"><b>'+val+'</b><span>'+label+'</span></div>';}
function sayH(who,mood,text){return '<div class="say" data-who="'+who+'"><img class="who" data-who="'+who+'" data-mood="'+mood+'" alt="" aria-hidden="true"><div><b class="name">'+Cast.names[who]+'</b><p>'+text+'</p></div></div>';}
function grp(title,cls,inner){return '<div class="cgrp '+cls+'"><div class="ct">'+title+'</div>'+inner+'</div>';}
function btns(id,opts,cur){return '<div class="ctrl" data-k="'+id+'">'+opts.map(function(o){return '<button type="button" class="bt" data-v="'+o[0]+'" aria-pressed="'+(String(o[0])===String(cur))+'">'+o[1]+'</button>';}).join('')+'</div>';}
function rng(id,label,min,max,step,val){return '<div class="ctrl"><span class="glabel">'+label+'</span><input type="range" data-k="'+id+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" aria-label="'+label+'"><span class="val" data-v="'+id+'"></span></div>';}
function dur(s){if(s<60)return s.toFixed(1)+'초';if(s<3600)return (s/60).toFixed(1)+'분';if(s<86400)return (s/3600).toFixed(1)+'시간';if(s<3.15e7)return (s/86400).toFixed(1)+'일';return fmt(Math.round(s/3.156e7))+'년';}

/* ① 스피드큐빙 학원 */
var METH={lbl:{name:'층마다 쌓기',algs:7,moves:110},cfop2:{name:'CFOP 4번 보기',algs:16,moves:70},cfop:{name:'CFOP 완전판',algs:78,moves:58},zz:{name:'ZZ + ZBLL',algs:493,moves:50}};
function acad(st,m){var M=METH[m],need=Math.ceil(M.algs/st.per),ready=need<=st.weeks,moves=M.moves+(ready?0:25),time=moves/st.tps;return {need:need,ready:ready,moves:moves,time:time};}
SC.academy={title:'스피드큐빙 학원',ch:'05_algorithm_ecosystem.html',chn:'05장 외울까, 생각할까',
  st:{weeks:26,tps:4,m:'lbl',per:10},
  intro:'대회를 앞둔 학생에게 풀이법과 연습 계획을 정해 주는 학원이에요. 대회까지 남은 주와 학생의 손 속도(초록)는 정해져 있고, <b>풀이법과 한 주에 외울 식 수(파랑)</b>는 여러분이 정해요. 외울 식을 대회 전에 다 못 외우면 헤매는 수가 25수 늘어요(예시값).',
  controls:function(st){return grp('시장 환경 · 학생 조건','env',rng('weeks','대회까지 남은 주',4,104,1,st.weeks)+rng('tps','손 속도 (초당 돌리기)',2,8,0.5,st.tps))+grp('내 결정 · 풀이법과 연습량','dec',btns('m',[['lbl','층마다 쌓기 (식 7)'],['cfop2','CFOP 4번 보기 (식 16)'],['cfop','CFOP 완전판 (식 78)'],['zz','ZZ + ZBLL (식 493)']],st.m)+rng('per','한 주에 외우는 식',2,30,1,st.per));},
  calc:function(st){var r=acad(st,st.m),all={},best=null;Object.keys(METH).forEach(function(k){all[k]=acad(st,k);if(!best||all[k].time<all[best].time)best=k;});r.all=all;r.best=best===st.m;r.bestK=best;return r;},
  scores:function(r,st){return kpi(r.ready?'g':'r',r.ready?'준비 완료':'준비 부족','외우는 데 '+r.need+'주 필요 (남은 '+st.weeks+'주)')+kpi('a',r.moves+'수','한 번 푸는 데 드는 수 (예시)')+kpi(r.best?'g':'a',r.time.toFixed(1)+'초','예상 기록 (수 ÷ 손 속도)')+kpi('m',METH[st.m].algs+'개','외울 식');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,220,'풀이법별 예상 기록');tx(s,8,16,'풀이법별 예상 기록 (초, 빨강 = 준비 부족)',{'font-size':12,fill:C.mu});var ks=Object.keys(METH),mx=Math.max.apply(null,ks.map(function(k){return r.all[k].time;}));
    ks.forEach(function(k,i){var v=r.all[k],y=30+i*45,w=v.time/mx*200;E('rect',{x:100,y:y,width:w,height:26,rx:4,fill:v.ready?C.g:C.r,stroke:k===st.m?C.k:'none','stroke-width':2},s);tx(s,6,y+18,METH[k].name,{'font-size':11});tx(s,104+w,y+18,v.time.toFixed(1)+'초',{'font-size':11});});
    var s2=svg(g2,320,220,'외울 식과 필요한 주');tx(s2,8,16,'외우는 데 필요한 주 vs 남은 주(점선)',{'font-size':12,fill:C.mu});var mw=Math.max(st.weeks,Math.max.apply(null,ks.map(function(k){return r.all[k].need;})));
    ks.forEach(function(k,i){var v=r.all[k],y=30+i*45,w=Math.min(1,v.need/mw)*200;E('rect',{x:100,y:y,width:Math.max(w,2),height:26,rx:4,fill:C.acc,'fill-opacity':k===st.m?1:0.45},s2);tx(s2,6,y+18,METH[k].name,{'font-size':11});tx(s2,104+w,y+18,v.need+'주',{'font-size':11});});
    var xw=100+Math.min(1,st.weeks/mw)*200;E('line',{x1:xw,y1:24,x2:xw,y2:210,stroke:C.k,'stroke-dasharray':'4 3'},s2);},
  talk:function(r,st){return [['doc',r.best&&r.ready?'judge':'think',r.best&&r.ready?'지금 조건에서 가장 빠른 계획이에요. 판정: 최적.':'더 빠른 계획이 있어요. 「준비 완료」인 방법 중 기록이 가장 좋은 것을 찾으세요.'],
    ['asst','report','외울 식 '+METH[st.m].algs+'개, '+r.need+'주 필요, 예상 기록 '+r.time.toFixed(1)+'초예요.'],['fly','magnify',st.m==='zz'&&!r.ready?'ZBLL을 다 못 외우면 오히려 헤매. 남은 주를 계산해 봐.':'남은 주가 늘면 최적 풀이법도 바뀔까? 초록 조건을 바꿔 봐.'],
    ['robo','calc',st.m==='zz'?'식이 제일 많은 게 제일 빠르죠!':'더 많이 외우면 무조건 빨라져요!']];},
  missions:[{t:'최적 찾기: 지금 조건에서 「준비 완료」이면서 예상 기록이 가장 좋은 풀이법 고르기',chk:function(st,r){return r.best&&r.ready;}},
    {t:'함정 관찰: ZZ + ZBLL을 골랐는데 대회 전에 다 못 외워 「준비 부족」이 되는 상황 보기',chk:function(st,r){return st.m==='zz'&&!r.ready;}},
    {t:'조건 바꾸기: 남은 주를 52주 이상으로 늘렸을 때 최적 풀이법이 ZZ + ZBLL로 바뀌는지 확인 (한 주 10개 이상)',chk:function(st,r){return st.weeks>=52&&st.per>=10&&st.m==='zz'&&r.best&&r.ready;}}]};

/* ② 솔버 공장 */
var PDBS={none:{name:'표 없음',mb:0},small:{name:'작은 표 (1 MB)',mb:1},medium:{name:'중간 표 (100 MB)',mb:100},large:{name:'큰 표 (1,000 MB)',mb:1000}};
function solver(st,p){var t=Math.pow(13.35,st.d),mb=PDBS[p].mb,fits=mb<=st.mem,m=mb?mb*1048576*2:1,n=t/m,time=n/(st.speed*1e6);return {t:t,n:n,time:time,fits:fits,ok:fits&&time<=3600};}
SC.solver={title:'솔버 공장',ch:'12_ida_star_pdb.html',chn:'12장 IDA*와 패턴 데이터베이스',
  st:{mem:2048,speed:50,pdb:'none',d:18},
  intro:'손님이 보낸 섞인 큐브의 <b>최단 해답</b>을 찾아 주는 공장이에요. 컴퓨터 메모리 예산과 계산 속도(초록)는 정해져 있고, <b>하한 표의 크기와 받을 주문의 섞기 깊이(파랑)</b>는 여러분이 정해요. 규칙(예시): 표 없이 확인할 상태 수 ≈ 13.35^깊이, 표가 있으면 「확인 수 × 표 항목 수 ≈ 일정」(코르프의 경험 법칙). 1시간 안에 풀면 납품 성공.',
  controls:function(st){return grp('시장 환경 · 컴퓨터','env',rng('mem','메모리 예산 (MB)',16,4096,16,st.mem)+rng('speed','계산 속도 (초당 백만 상태)',5,200,5,st.speed))+grp('내 결정 · 표와 주문','dec',btns('pdb',[['none','표 없음'],['small','작은 표 1 MB'],['medium','중간 표 100 MB'],['large','큰 표 1,000 MB']],st.pdb)+rng('d','받을 섞기 깊이',10,20,1,st.d));},
  calc:function(st){var r=solver(st,st.pdb);r.all={};Object.keys(PDBS).forEach(function(k){r.all[k]=solver(st,k);});return r;},
  scores:function(r,st){return kpi(r.fits?'g':'r',r.fits?'들어감':'안 들어감','표가 메모리 예산에 ('+PDBS[st.pdb].mb+' / '+st.mem+' MB)')+kpi('a',r.n>=1e15?r.n.toExponential(1):fmt(Math.round(r.n)),'확인할 상태 수 (예시 규칙)')+kpi(r.ok?'g':'r',r.fits?dur(r.time):'—','예상 계산 시간')+kpi(r.ok?'g':'r',r.ok?'납품 성공':'실패','1시간 안에 최단 해답');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,220,'표 크기별 계산 시간');tx(s,8,16,'표 크기별 계산 시간 (자릿수 눈금, 점선 = 1시간)',{'font-size':12,fill:C.mu});var ks=Object.keys(PDBS);
    function W(sec){return Math.max(2,Math.min(220,(Math.log10(Math.max(sec,0.01))+2)*14));}
    ks.forEach(function(k,i){var v=r.all[k],y=30+i*45,w=W(v.time);E('rect',{x:90,y:y,width:w,height:26,rx:4,fill:!v.fits?C.rule:v.ok?C.g:C.r,stroke:k===st.pdb?C.k:'none','stroke-width':2},s);tx(s,4,y+18,PDBS[k].name.split(' (')[0],{'font-size':11});tx(s,94+w,y+18,v.fits?dur(v.time):'메모리 초과',{'font-size':10});});
    var xh=90+W(3600);E('line',{x1:xh,y1:24,x2:xh,y2:210,stroke:C.k,'stroke-dasharray':'4 3'},s);
    var s2=svg(g2,320,220,'깊이별 계산 시간');tx(s2,8,16,'지금 표로 깊이 10~20의 계산 시간',{'font-size':12,fill:C.mu});
    for(var d=10;d<=20;d++){var v=solver({mem:st.mem,speed:st.speed,d:d},st.pdb),x=16+(d-10)*27,h=Math.max(2,Math.min(170,(Math.log10(Math.max(v.time,0.01))+2)*9));E('rect',{x:x,y:195-h,width:20,height:h,fill:d===st.d?C.r:(v.time<=3600?C.g:C.rule)},s2);tx(s2,x+2,212,String(d),{'font-size':10});}},
  talk:function(r,st){return [['doc',r.ok?'judge':'think',r.ok?'1시간 안에 최단 해답 납품! 표와 메모리의 균형이 좋아요.':'납품 실패예요. 표 크기와 메모리, 깊이를 함께 보세요.'],
    ['asst','report',r.fits?'확인할 상태 약 '+(r.n>=1e6?r.n.toExponential(1):fmt(Math.round(r.n)))+'개, 예상 '+dur(r.time)+'이에요.':'표가 메모리 예산보다 커서 올릴 수 없어요.'],['fly','magnify',st.pdb==='none'?'표 없이 깊이 18이면 몇 년이 나와? 숫자를 봐.':'메모리 예산을 줄이면 같은 깊이를 여전히 풀 수 있을까?'],
    ['robo','calc',st.pdb==='none'?'컴퓨터가 빠르니까 표 없이도 금방이죠!':'표는 클수록 무조건 좋아요!']];},
  missions:[{t:'최적 찾기: 18수 섞기 주문을 1시간 안에 납품하는 설정 찾기 (메모리 예산 안에서)',chk:function(st,r){return st.d>=18&&r.ok;}},
    {t:'함정 관찰: 표 없이 18수 섞기를 받으면 계산이 1년을 넘는 것 보기',chk:function(st,r){return st.pdb==='none'&&st.d>=18&&r.time>3.15e7;}},
    {t:'조건 바꾸기: 메모리 예산을 128 MB 이하로 줄이고도 15수 섞기를 1분 안에 푸는 설정 찾기',chk:function(st,r){return st.mem<=128&&st.d>=15&&r.fits&&r.time<=60;}}]};

/* ③ 조립 검수소 */
var CK=[['tw','① 비틀림 검사',1/3],['fl','② 뒤집힘 검사',1/2],['pa','③ 홀짝 검사',1/2]];
function qc(st,on){var pass=1,n=0;CK.forEach(function(c){if(on[c[0]]){pass*=c[2];n++;}});var bad=(pass-1/12),ship=Math.round(10000*st.p/100*bad),cost=n*st.cost*10000;return {pass:pass,ship:ship,cost:cost,n:n};}
SC.qc={title:'조립 검수소',ch:'08_solvability.html',chn:'08장 풀 수 있는 큐브의 세 조건',
  st:{p:10,cost:30,tw:'off',fl:'off',pa:'on'},
  intro:'큐브 공장의 출고 검수소예요. 일부 작업자가 큐브를 분해 후 아무렇게나 다시 끼워요(초록: 그런 큐브의 비율, 검사 1회 비용). 아무렇게나 끼운 큐브는 12개 중 11개가 풀 수 없는 불량이에요. 여러분은 <b>어떤 검사를 켤지(파랑)</b> 정해요. 목표: 큐브 10,000개 중 불량 출고 0개, 비용은 최소로.',
  controls:function(st){return grp('시장 환경 · 공장 조건','env',rng('p','아무렇게나 조립된 큐브 비율 (%)',1,30,1,st.p)+rng('cost','검사 1회 비용 (원)',10,100,5,st.cost))+grp('내 결정 · 켤 검사','dec',CK.map(function(c){return '<div><span class="glabel">'+c[1]+'</span>'+btns(c[0],[['on','켜기'],['off','끄기']],st[c[0]])+'</div>';}).join(''));},
  calc:function(st){var on={};CK.forEach(function(c){on[c[0]]=st[c[0]]==='on';});var r=qc(st,on);r.combos=[];for(var m=0;m<8;m++){var o2={tw:!!(m&1),fl:!!(m&2),pa:!!(m&4)};var q=qc(st,o2);q.m=m;q.on=o2;r.combos.push(q);}r.only=on.pa&&!on.tw&&!on.fl;r.all=on.tw&&on.fl&&on.pa;return r;},
  scores:function(r,st){var bad=Math.round(10000*st.p/100*11/12);return kpi('a',fmt(bad)+'개','10,000개 중 실제 불량')+kpi(r.ship?'r':'g',fmt(r.ship)+'개','검사를 통과해 나간 불량')+kpi('m',r.n+'가지','켠 검사')+kpi(r.ship?'a':'g',fmt(r.cost)+'원','검사 비용 (10,000개)');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,220,'검사 조합별 불량 출고');tx(s,8,16,'검사 조합 8가지의 불량 출고 수 (진한 테두리 = 지금)',{'font-size':12,fill:C.mu});var mx=Math.max.apply(null,r.combos.map(function(q){return q.ship;}))||1;
    r.combos.forEach(function(q,i){var x=12+i*38,h=q.ship/mx*150,lab=(q.on.tw?'①':'')+(q.on.fl?'②':'')+(q.on.pa?'③':'')||'없음';var cur=q.on.tw===(st.tw==='on')&&q.on.fl===(st.fl==='on')&&q.on.pa===(st.pa==='on');
      E('rect',{x:x,y:185-Math.max(h,2),width:28,height:Math.max(h,2),fill:q.ship?C.r:C.g,stroke:cur?C.k:'none','stroke-width':2.5},s);tx(s,x,205,lab,{'font-size':10});});
    var s2=svg(g2,320,220,'세 검사의 통과 확률');tx(s2,8,16,'아무렇게나 조립한 큐브가 검사를 통과할 확률',{'font-size':12,fill:C.mu});
    CK.forEach(function(c,i){var y=36+i*50,w=c[2]*260;E('rect',{x:10,y:y,width:w,height:24,rx:4,fill:st[c[0]]==='on'?C.acc:C.rule},s2);tx(s2,16+w,y+17,c[1].slice(2)+' '+(100*c[2]).toFixed(0)+'%',{'font-size':11});});
    tx(s2,10,196,'셋 다 통과 = 1/12 ≈ 8.3% (= 진짜 풀 수 있는 큐브)',{'font-size':12,fill:C.g,'font-weight':700});},
  talk:function(r,st){return [['doc',!r.ship?'judge':'think',!r.ship?'불량 출고 0개! 세 조건을 모두 검사해야 하는 이유가 바로 이거예요.':'불량이 새어 나가요. 어떤 조건을 검사하지 않았나요?'],
    ['asst','report','불량 출고 '+fmt(r.ship)+'개, 검사 비용 '+fmt(r.cost)+'원이에요.'],['fly','magnify',r.only?'홀짝 검사 하나로는 비틀린 큐브가 그대로 나가. 08장 조건 ①을 떠올려 봐.':'조립 불량 비율을 바꿔도 결론이 같은지 확인해 봐.'],
    ['robo','calc',r.n<3?'검사 하나만 해도 웬만한 불량은 다 잡겠죠!':'검사 세 개면 너무 비싼 거 아니에요?']];},
  missions:[{t:'최적 찾기: 불량 출고 0개를 만드는 가장 적은 검사 조합 찾기',chk:function(st,r){return r.ship===0&&r.n===3;}},
    {t:'함정 관찰: 홀짝 검사 하나만 켜면 불량이 새어 나가는 것 보기',chk:function(st,r){return r.only&&r.ship>0;}},
    {t:'조건 바꾸기: 조립 불량 비율을 기본값(10%)에서 바꾸고도 세 검사로 불량 출고 0개인지 확인',chk:function(st,r){return st.p!==10&&r.all&&r.ship===0;}}]};

/* ④ 길 안내 센터 */
SC.route={title:'길 안내 센터',ch:'11_cayley_graph.html',chn:'11장 큐브를 그래프로',
  st:{g:'s4',g0:'on',g1:'on',g2:'off'},
  intro:'퍼즐 상태들 사이의 「최소 수」 길을 안내하는 센터예요. 어떤 퍼즐(무리)을 맡을지는 손님이 정하고(초록), <b>허용할 한 수의 종류(파랑)</b>는 여러분이 정해요. 허용한 한 수만으로 모든 상태에 갈 수 있어야 하고, 가장 먼 거리(지름)가 짧을수록 안내가 빨라요.',
  controls:function(st){var G=GROUPS[st.g];return grp('시장 환경 · 맡을 퍼즐','env',btns('g',[['clock','12시간 시계'],['square','정사각형 돌리기·뒤집기'],['s4','카드 4장 섞기']],st.g))+grp('내 결정 · 허용할 한 수','dec',G.gens.map(function(g,i){return '<div><span class="glabel">'+g[0]+'</span>'+btns('g'+i,[['on','허용'],['off','금지']],st['g'+i])+'</div>';}).join(''));},
  calc:function(st){var G=GROUPS[st.g],gens=G.gens.filter(function(g,i){return st['g'+i]==='on';}),tot={clock:12,square:8,s4:24}[st.g];if(!gens.length)return {reach:1,diam:0,avg:0,tot:tot,none:true,best:false};
    var B=bfsGroup(gens),d=B.V.map(function(k){return B.dist[k];}),diam=Math.max.apply(null,d),avg=d.reduce(function(a,b){return a+b;},0)/d.length,L=[];d.forEach(function(x){L[x]=(L[x]||0)+1;});
    var bestD=99;for(var m=1;m<(1<<G.gens.length);m++){var gs=G.gens.filter(function(g,i){return m>>i&1;}),b=bfsGroup(gs);if(b.V.length===tot){var dd=Math.max.apply(null,b.V.map(function(k){return b.dist[k];}));if(dd<bestD)bestD=dd;}}
    return {reach:B.V.length,diam:diam,avg:avg,tot:tot,L:L,bestD:bestD,best:B.V.length===tot&&diam===bestD};},
  scores:function(r){return kpi(r.reach===r.tot?'g':'r',r.reach+' / '+r.tot,'갈 수 있는 상태')+kpi(r.best?'g':'a',r.diam+'수','지름 (가장 먼 거리)')+kpi('m',r.avg.toFixed(2)+'수','평균 거리')+kpi('a',r.bestD+'수','이 퍼즐의 가장 짧은 지름');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,220,'거리별 상태 수');tx(s,8,16,'다 맞춘 상태에서 거리별 상태 수',{'font-size':12,fill:C.mu});var L=r.L||[1],mx=Math.max.apply(null,L);
    L.forEach(function(v,i){var x=14+i*40,h=v/mx*150;E('rect',{x:x,y:185-h,width:30,height:h,fill:C.acc},s);tx(s,x+8,180-h,String(v),{'font-size':11});tx(s,x+6,205,i+'수',{'font-size':10});});
    var s2=svg(g2,320,220,'갈 수 있는 상태 비율');var f=r.reach/r.tot;E('circle',{cx:160,cy:115,r:70,fill:C.rule},s2);
    var a=2*Math.PI*f;if(f>=0.999)E('circle',{cx:160,cy:115,r:70,fill:C.g},s2);else E('path',{d:'M160,115 L160,45 A70,70 0 '+(a>Math.PI?1:0)+',1 '+(160+70*Math.sin(a)).toFixed(1)+','+(115-70*Math.cos(a)).toFixed(1)+' Z',fill:C.r},s2);
    tx(s2,160,210,'갈 수 있는 상태 '+(100*f).toFixed(0)+'%',{'font-size':12,'text-anchor':'middle'});},
  talk:function(r,st){return [['doc',r.best?'judge':'think',r.best?'모든 상태에 갈 수 있고 지름도 가장 짧아요. 판정: 최적.':r.reach<r.tot?'갈 수 없는 상태가 있어요. 허용한 한 수가 무리 전체를 「만들어 내지」 못해요.':'모두 갈 수 있지만 더 짧은 지름이 가능해요.'],
    ['asst','report','갈 수 있는 상태 '+r.reach+'개, 지름 '+r.diam+'수, 평균 '+r.avg.toFixed(2)+'수예요.'],['fly','magnify',r.reach<r.tot?'한 수 하나만으로는 「한 바퀴」만 돌 수도 있어. 다른 종류를 섞어 봐.':'한 수를 하나 더 허용하면 지름이 줄까? 늘 줄까?'],
    ['robo','calc',r.reach<r.tot?'한 수가 적으면 오히려 깔끔하죠!':'한 수는 많을수록 무조건 좋아요!']];},
  missions:[{t:'최적 찾기: 카드 4장 섞기에서 모든 상태에 가면서 지름이 가장 짧은 한 수 조합 찾기',chk:function(st,r){return st.g==='s4'&&r.best;}},
    {t:'함정 관찰: 허용한 한 수만으로는 갈 수 없는 상태가 생기는 조합 보기',chk:function(st,r){return r.reach<r.tot&&!r.none;}},
    {t:'조건 바꾸기: 12시간 시계로 바꿔서 지름 4수 이하로 모든 시각을 안내하기',chk:function(st,r){return st.g==='clock'&&r.reach===12&&r.diam<=4;}}]};

var ORDER=['academy','solver','qc','route'],cur=null,touched={},done={},hist={};
var tabs=H('div','ctrl',null,root);tabs.setAttribute('role','tablist');
ORDER.forEach(function(k){var b=H('button','bt',SC[k].title,tabs);b.type='button';b.setAttribute('role','tab');b.dataset.t=k;b.onclick=function(){open(k);};});
var body=H('div',null,null,root);
function open(k){cur=k;[].forEach.call(tabs.children,function(b){b.setAttribute('aria-pressed',b.dataset.t===k);b.setAttribute('aria-selected',b.dataset.t===k);});
  try{history.replaceState(null,'','#'+k);}catch(e){}
  var S=SC[k];body.innerHTML='<h2>'+S.title+'</h2><div class="sitbox">'+S.intro+'</div><div class="simgrid"><div class="simctl">'+S.controls(S.st)+'</div><div class="simout"><div class="kpis"></div><div class="graphs"><div class="g1"></div><div class="g2"></div></div></div></div><div class="talkbox"></div><h3>미션</h3><ol class="missions"></ol><p class="note">배운 곳 다시 보기 → <a href="../'+S.ch+'">'+S.chn+'</a></p>';
  bind();update();}
function bind(){var S=SC[cur];
  [].forEach.call(body.querySelectorAll('[data-k] button'),function(b){b.onclick=function(){var key=b.parentNode.dataset.k;S.st[key]=b.dataset.v;[].forEach.call(b.parentNode.children,function(x){x.setAttribute('aria-pressed',x===b);});touched[cur]=1;
    if(key==='g'){/* 퍼즐을 바꾸면 한 수 목록이 바뀌므로 조작판을 다시 그림 */S.st.g0='on';S.st.g1='on';S.st.g2='off';body.querySelector('.simctl').innerHTML=S.controls(S.st);bind();}update();};});
  [].forEach.call(body.querySelectorAll('input[data-k]'),function(r){r.oninput=function(){S.st[r.dataset.k]=+r.value;touched[cur]=1;update();};});}
function update(){var S=SC[cur],st=S.st,r=S.calc(st);hist[cur]=hist[cur]||{};
  [].forEach.call(body.querySelectorAll('.val[data-v]'),function(v){v.textContent=st[v.dataset.v];});
  body.querySelector('.kpis').innerHTML=S.scores(r,st);var g1=body.querySelector('.g1'),g2=body.querySelector('.g2');g1.innerHTML='';g2.innerHTML='';S.graphs(r,st,g1,g2);
  body.querySelector('.talkbox').innerHTML=S.talk(r,st).map(function(t){return sayH(t[0],t[1],t[2]);}).join('');Cast.fill(body);
  done[cur]=done[cur]||{};var ml=body.querySelector('.missions');ml.innerHTML='';
  S.missions.forEach(function(m,i){var ok=touched[cur]&&m.chk(st,r,hist[cur]);if(ok)done[cur][i]=1;var li=document.createElement('li');li.innerHTML=(done[cur][i]?'<b style="color:var(--gfp)">통과 ✓</b> ':'<span class="note">도전 중</span> ')+m.t;ml.appendChild(li);});}
window.PRACTICE={open:open,set:function(k,st){if(cur!==k)open(k);Object.assign(SC[k].st,st);touched[k]=1;body.querySelector('.simctl').innerHTML=SC[k].controls(SC[k].st);bind();update();return SC[k].missions.map(function(m,i){return !!done[k][i];});},status:function(k){return SC[k].missions.map(function(m,i){return !!(done[k]||{})[i];});},calc:function(k){return SC[k].calc(SC[k].st);}};
var h=(location.hash||'').slice(1);open(SC[h]?h:'academy');
})();
