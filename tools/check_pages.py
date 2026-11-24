import sys, asyncio, glob, os, json
from playwright.async_api import async_playwright
ROOT=sys.argv[1]; pages=sys.argv[2:] or sorted([os.path.basename(p) for p in glob.glob(ROOT+'/*.html')])+['practice/index.html']
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox','--allow-file-access-from-files'])
        for w in (390,1280):
            pg=await b.new_page(viewport={'width':w,'height':900})
            for name in pages:
                errs=[]
                pg.on('pageerror',lambda e,errs=errs:errs.append(str(e)))
                pg.on('console',lambda m,errs=errs:errs.append('console:'+m.text) if m.type=='error' and 'fonts.g' not in m.text and 'ERR_' not in m.text else None)
                await pg.goto('file://'+os.path.join(ROOT,name)); await pg.wait_for_timeout(500)
                r=await pg.evaluate('''()=>{const o=document.documentElement.scrollWidth-window.innerWidth;const empty=[...document.querySelectorAll('img[data-who]')].filter(i=>!i.getAttribute('src')).length;
                  const bad=[...document.querySelectorAll('[data-w]')].filter(e=>/그리지 못했어요/.test(e.textContent)).map(e=>e.dataset.w);
                  const wide=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>window.innerWidth+2 && getComputedStyle(e).position!=='fixed' && !e.closest('.tw,nav,.ctrl,svg')}).slice(0,3).map(e=>e.tagName+'.'+e.className);
                  return {o,empty,bad,wide}}''')
                # duel
                if await pg.query_selector('.duel-run'):
                    await pg.click('.duel-run'); await pg.wait_for_timeout(300)
                    v=await pg.inner_text('.verdict'); r['duel']=v[:60].replace('\n',' ')
                pg.remove_listener('pageerror',lambda e:None) if False else None
                print(w,name,json.dumps(r,ensure_ascii=False),errs[:3])
            await pg.close()
        await b.close()
asyncio.run(main())
