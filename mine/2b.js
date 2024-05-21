const puppeteer = require("puppeteer");
const { getFromProductDetailsPage } = require("./2b/getFromProductDetailsPage");
const { getFromProductsCards } = require("./2b/getFromProductsCards");

const twoBLinks = [
  "https://2b.com.eg/en/mobile-and-tablet/mobiles.html",
  "https://2b.com.eg/en/mobile-and-tablet/mobile-tablet.html",
  "https://2b.com.eg/en/computers/laptops.html",
];

(async () => {
  let products = [];
  try {
    let twoB = twoBLinks[0];
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    const page = await browser.newPage();

    await page.goto(twoB, { waitUntil: "domcontentloaded" });

    while (true) {
      let productshtml = await page.$$(".item.product.product-item");
      let productObjects = await getFromProductsCards(productshtml);
      products = products.concat(productObjects);

      let nextLink = await page.$(".item.pages-item-next");
      if (!nextLink) {
        console.log("no next page");
        break;
      }
      const nextLinkHref = await nextLink.evaluate(
        (el) => el.querySelector("a").href
      );
      await page.goto(nextLinkHref, { waitUntil: "domcontentloaded" });
    }
    for (let i = 0; i < products.length; i++) {
      await page.goto(products[i].href, {
        waitUntil: "domcontentloaded",
        timeout: 0, // to avoid timeout error
      });
      const productDetails = await getFromProductDetailsPage(page);
      products[i] = { ...products[i], ...productDetails };
    }
    console.log(products);

    browser.close();
  } catch (error) {
    console.log("error: ", products);
    console.log(error);
  }
})();
