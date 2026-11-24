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
