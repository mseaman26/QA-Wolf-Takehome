// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  //create an array to store the dates
  const dates = [];
  //while our array is less than 100 dates
  while(dates.length < 100){
    //get the span elements with the class 'age' and the attribute 'title'
    const spans = await page.$$('span.age[title]');
    for (let span of spans) {
      //if we have 100 dates, break the loop
      if (dates.length >= 100) {
        break
      }
      //get the title attribute of the span element
      const title = await span.getAttribute("title");
      //push a new Date object into the dates array
      dates.push(new Date(title));
    }
    //if we have 100 dates, break the loop (no need to click 'more')
    if (dates.length >= 100) {
      break
    }
    //click the a element class 'morelink' to load more articles
    await page.waitForSelector('a.morelink');
    await page.click('a.morelink');
    //wait for the page to load
    await page.waitForLoadState('load');
  }

  //verify that the dates are sorted in descending order 
  let sorted = true;
  for (let i = 0; i < dates.length - 1; i++) {
    if (dates[i] < dates[i + 1]) {
      sorted = false;
      break;
    }
  }
  if (sorted) {
    console.log(`the first ${dates.length} dates are sorted in descending order`);
  }else{
    console.log(`the first ${dates.length} dates are NOT sorted in descending order`);
  }

  return sorted;

}

(async () => {
  await sortHackerNewsArticles();
})();
