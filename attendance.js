const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage();

  await page.goto('https://login.gitam.edu/Login.aspx').catch(e => { console.log(e) });

  await page.type('#txtusername', "121710307047").catch(e => { console.log(e) });
  await page.type("#password","trolls").catch(e => { console.log(e) });
  await page.screenshot({path:'log.jpg'});
  console.log("reached");
  await page.click('input[id="Submit"]');
  console.log("navigated");
  console.log('New Page URL:', page.url());
  await page.screenshot({path:'ex1.jpg'});
  await page.goto('https://login.gitam.edu/route.aspx?id=STUDENT&type=S').catch(e => { console.log(e) });
  console.log('New Page URL:', page.url());
  await page.screenshot({path:'ex2.jpg'});
  await page.goto('https://gstudent.gitam.edu/Attendance_new.aspx').catch(e => { console.log(e) });
  await page.screenshot({path:'ex3.jpg'});
  console.log('New Page URL:', page.url());
  var cgpa = await page.$eval("#MainContent_lbltotal", elem => elem.innerText);
  console.log(cgpa);
  console.log('New Page URL:', page.url());
  await page.goto('https://login.gitam.edu/gitamsignon/Login.aspx').catch(e => { console.log(e) });
  
  await browser.close().catch(e => { console.log(e) });
})();