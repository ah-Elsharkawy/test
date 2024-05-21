const puppeteer = require("puppeteer");
const { getFromProductsCards } = require("./carrefour/getFromProductsCards");
const { carrefourConfig } = require("./config/url");
const {
  getFromProductDetailsPage,
} = require("./carrefour/getFromProductDetailsPage");
const { timeout } = require("puppeteer");

(async () => {
  const carrefourURL =
    carrefourConfig.BASE_URL +
    carrefourConfig.SMART_PHONES_TABLETS_WEARABLES_ENDPOINT;
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const products = [];
  try {
    const page = await browser.newPage();
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36');
    await page.goto(carrefourURL, { waitUntil: "domcontentloaded" });

    while (true) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      const loadMoreButton = await page.$(
        "::-p-xpath(//button[contains(text(), 'Load More')])",
        { timeout: 10000 }
      );

      //scroll to the load more button

      console.log("\n\n\n\n\n\n loadMoreButton", loadMoreButton);
      if (!loadMoreButton) {
        console.log("No more products to load...");
        break;
      }
      await loadMoreButton.scrollIntoView();

      await loadMoreButton.evaluate((btn) => btn.click());
      // wait for the button to be added again

      try {
        await page.waitForSelector(
          "::-p-xpath(//button[contains(text(), 'Load More')])",
          { timeout: 10000 }
        );
        //scroll to the bottom of the page
      } catch (error) {
        console.log("No more products to load...");
        break;
      }
    }
    // await page.waitForSelector("ul[data-testid]", { timeout: 0 });
    //wait for the products to be loaded in the page before getting them using wait

    let productsCards = await page.$$(".css-1omnv59");
    console.log("productsCards.length :>> ", productsCards.length);
    
    const productsObjects = await getFromProductsCards(productsCards);
    products.push(...productsObjects);
    console.log("products.length :>> ", products.length);
    // console.log(products);
    return;
    for (let i = 0; i < products.length; i++) {
      await page.goto(products[i].href, {
        waitUntil: "domcontentloaded",
        timeout: 0, // to avoid timeout error
      });
      const productDetails = await getFromProductDetailsPage(page);
      products[i] = { ...products[i], ...productDetails };
    }
    // console.log(products);
    console.log(products[0]);
    console.log(products[1]);
    console.log(products.length);
    browser.close();
  } catch (error) {
    console.log(error);
  } finally {
    console.log(products);
    browser.close();
  }
})();
