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
  await page.goto("https://gstudent.gitam.edu/Gpay.aspx").catch((e) => {
    console.log(e);
  });
  const element = await page.$("#MainContent_grdhostelpayment");
  await element.screenshot({ path: "tt.png" });
  await page
    .goto("https://login.gitam.edu/gitamsignon/Login.aspx")
    .catch((e) => {
      console.log(e);
    });
  await browser.close().catch((e) => {
    console.log(e);
  });
})();
