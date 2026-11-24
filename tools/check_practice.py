import asyncio,json
from playwright.async_api import async_playwright
STEPS={'sled':[{'terr':'long','eta':0.08,'N':30},{'terr':'long','eta':0.11,'N':30},{'terr':'round','eta':0.08,'N':30}],
 'drone':[{'cust':'A','x':1.5,'y':2.6,'z':2},{'cust':'B','x':1.7,'y':1,'z':4},{'cust':'C','x':-3,'y':-1.7,'z':2}],
 'fountain':[{'w':0,'p':1,'om':0},{'w':2},{'p':1,'om':1}],
 'bowl':[{'ord':'water','a':2,'b':1,'c':2},{'ord':'water','a':2,'b':2.5,'c':2},{'ord':'dome','a':-2,'b':1,'c':-2}]}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file://'+__import__('os').path.dirname(__import__('os').path.dirname(__import__('os').path.abspath(__file__)))+'/practice/index.html');await pg.wait_for_timeout(400)
        for k,steps in STEPS.items():
            await pg.evaluate("k=>PRACTICE.open(k)",k)
            before=await pg.evaluate("k=>PRACTICE.status(k)",k)
            res=[]
            for s in steps: res.append(await pg.evaluate("([k,s])=>PRACTICE.set(k,s)",[k,s]))
            print(k,'before',before,'after',res[-1])
        print('errors',errs)
        await b.close()
asyncio.run(main())
