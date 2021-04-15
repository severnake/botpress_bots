const cors = require("cors");
const express = require("express");
const puppeteer = require("puppeteer");

// Globals

const port = 5000;
var browser;

// Initializing Express and Puppeteer Browser

const app = express();

(async () => {
  browser = await puppeteer.launch({args:['--proxy-server=proxy1.gitam.edu:3128' ]});
  console.log("Puppeteer Browser Initiated");
})();

// Middleware

app.use(cors());

// REST Endpoint

app.get("/fetchStudent", (req, res) => {
  try {
    if (!req.query.regno) {
      throw new Error("regno is required");
    }

    if (!req.query.sem_no) {
      throw new Error("sem_no is required");
    }

    fetchStudentData(req.query.regno, req.query.sem_no, (err, student) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error_message: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        student: student,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error_message: err.message,
    });
  }
});

// Student Fetcher Function

async function fetchStudentData(regno, sem_no, callback) {
  try {
    const page = await browser.newPage();

    let student = {
      name: null,
      cgpa: null,
    };

    await page
      .goto(
        "https://doeresults.gitam.edu/onlineresults/pages/newgrdcrdinput1.aspx"
      )
      .catch((e) => {
        return callback(e);
      });
    
    await page.waitForSelector('#cbosem')
    
    await page.select("#cbosem", sem_no).catch((e) => {
      return callback(e);
    });

    var roll = await page.$("#txtreg").catch((e) => {
      return callback(e);
    });

    await roll.click({ clickCount: 3 }).catch((e) => {
      return callback(e);
    });

    await roll.type(regno).catch((e) => {
      return callback(e);
    });

    console.log("reached");

    await page.click("#Button1");

    console.log("navigated");

    await page.waitForSelector("#lblname");

    // await page.screenshot({ path: `ex.jpg` });

    student.cgpa =
      (await page.$eval("#lblcgpa", (elem) => elem.innerText)) || null;

    student.name =
      (await page.$eval("#lblname", (elem) => elem.innerText)) || null;

    console.log("New Page URL:", page.url());

    await page.close();

    return callback(null, student);
  } catch (err) {
    return callback(err);
  }
}

process.on("exit", async function () {
  await browser.close();
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

