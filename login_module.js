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
  console.log("🔹 logged in ✅");
  await browser.close().catch((e) => {
    console.log(e);
  });
})();