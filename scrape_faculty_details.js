const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //main page URL
  var department = "https://blrgssam.gitam.edu/Faculty"
  await page.goto(department).catch((e) => {
    console.log(e);
  });
  //search for anchor tags and take their href value
  const hrefs1 = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"), (a) =>
      a.getAttribute("href")
    )
  );
  //Search for names in .inner class and prepare array
  var h3Text = await page.$$eval(".inner h3", (elements) =>
    elements.map((item) => item.textContent)
  );
  var emails=await page.$$eval(".inner h4:nth-child(3)", (elements) =>
    elements.map((item) => item.textContent.trim())
  );
  var fin_ids = [];
  for (const href in hrefs1) {
    if (hrefs1[href].startsWith("javascript:showprofile")) {
      
      fin_ids.push(parseInt(hrefs1[href].split('"')[1]));
    }
  }
  var dept = department.split('.')[0].split('https://')[1];
  console.log(fin_ids.length)
  for(var i=0;i<fin_ids.length;i++) {
        var eid=fin_ids[i];
        var name = h3Text[i];
        var email=emails[i];
        console.log(eid,name,email,dept)
        await fetch('http://192.168.201.214/crportal/employee_create/', {
            method: 'POST',
            body: JSON.stringify({
                "eid":eid,
                "ename":name,
                "email":email,
                "dept":dept,
                }),
            headers: {
                'Content-type': 'application/json' // The type of data you're sending
            }
        });
        console.log("committed ✅");
  }
  await browser.close().catch((e) => {
    console.log(e);
  });
})();
