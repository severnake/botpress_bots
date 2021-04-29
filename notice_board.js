const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://login.gitam.edu/Login.aspx").catch((e) => {
    console.log(e);
  });

  await page.type("#txtusername", "121710313059").catch((e) => {
    console.log(e);
  });
  await page.type("#password", "Shrey@1999").catch((e) => {
    console.log(e);
  });
  await page.screenshot({ path: "log.jpg" });
  console.log("reached");
  await page.click('input[id="Submit"]');
  console.log("navigated");
  console.log("New Page URL:", page.url());
  await page.screenshot({ path: "ex1.jpg" });
  await page
    .goto("https://login.gitam.edu/route.aspx?id=STUDENT&type=S")
    .catch((e) => {
      console.log(e);
    });
  console.log("New Page URL:", page.url());
  await page.screenshot({ path: "ex2.jpg" });
  await page.goto("https://gstudent.gitam.edu/N-board.aspx").catch((e) => {
    console.log(e);
  });
  const buttons = await page.$x("//*[@id='MainContent_less']/div/div/ul/li/p");
  var i=0;
  for (let button of buttons) {
    var date= await page.$eval("#MainContent_GridView1_Label2_"+i, elem => elem.innerText);
    var paragraph = await page.$eval("#MainContent_GridView1_Label4_"+i, elem => elem.innerText);
    var pdf_link=await page.$eval("#MainContent_GridView1_linkhide_"+i, elem => elem.href);
    console.log(date+" "+paragraph+" "+pdf_link);
    i++;
  }

  await page
    .goto("https://login.gitam.edu/gitamsignon/Login.aspx")
    .catch((e) => {
      console.log(e);
    });
  await browser.close().catch((e) => {
    console.log(e);
  });
})();
