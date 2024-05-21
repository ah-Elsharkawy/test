const puppeteer = require("puppeteer");
const { noonConfig } = require("../config/url");
const { getFromProductsCards } = require("./getFromProductsCards");
const { getFromProductDetailsPage } = require("./getFromProductDetailsPage");

(async () => {
  const products = [];
  let noonURL =
    noonConfig.BASE_URL + noonConfig.SMART_PHONES_TABLETS_WEARABLES_ENDPOINT;
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--disable-http2"],
  });
  try {
    const page = await browser.newPage();

    await page.goto(noonURL, { waitUntil: "domcontentloaded" });
    let i = 0;
    while (true && i < 3) {
      let productshtml = await page.$$("span.productContainer");
      console.log(productshtml.length);
      let productsObjects = await getFromProductsCards(productshtml);
      // console.log(productsObjects);
      products.push(...productsObjects);

      await page.waitForSelector("li.next", { timeout: 0 });
      let nextButton = await page.$("li.next");
      console.log("\n\n\n\n\n\n nextButton", nextButton);
      //check if class disabled added to the next button
      if (
        await nextButton.evaluate((btn) => btn.classList.contains("disabled"))
      ) {
        console.log("Next button is disabled...");
        break;
      }
      nextButton.scrollIntoView();
      i++;
      //app is spa so we need to click the next button to get the next products
      await nextButton?.click();
      //wait for the page to load the products
      await page.waitForSelector("span.productContainer", { timeout: 0 });
    }
    for (let i = 0; i < 2; i++) {
      await page.goto(products[i].href, {
        waitUntil: "domcontentloaded",
        timeout: 0, // to avoid timeout error
      });
      const productDetails = await getFromProductDetailsPage(page);
      getFromProductDetailsPage;
      products[i] = { ...products[i], ...productDetails };
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log(products.length);
    console.log(products[0]);
    console.log(products[products.length - 1]);
    await browser.close();
  }
})();
