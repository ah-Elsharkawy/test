const puppeteer = require("puppeteer");

const BASE_URL = "https://www.carrefouregypt.com";
const SMART_PHONES_SEARCH_URL = "/mafegy/en/c/NFEGY1220200";
(async () => {
  const carrefour = BASE_URL + SMART_PHONES_SEARCH_URL;

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36');
  await page.goto(carrefour, { waitUntil: "domcontentloaded" });

  let productsCards = await page.$$("ul[data-testid]");
  debugger;
  let products = await articlesIntoProducts(productsCards);
  console.log(products);
  // single product info
  async function ExtractProductInfo(productCard) {
    let href = await productCard.evaluate((ele) => ele.querySelector("a").href);
    let title = await productCard.evaluate(
      (ele) => ele.querySelector(".product-item-link").innerText
    );
    let price = await productCard.evaluate(
      (ele) =>
        ele.querySelector('[data-price-type="finalPrice"] span.price').innerText
    );
    let discount = await productCard.evaluate((ele) => {
      let discountElement = ele.querySelector(
        "[data-price-type='oldPrice'] span.price"
      );
      return discountElement ? discountElement.innerText : null;
    });
    let product = {
      href,
      title,
      price,
      discount,
    };

    return product;
  }
  // loop all products
  async function articlesIntoProducts(productsCards) {
    let products = [];
    for (let i = 0; i < productsCards.length; i++) {
      let product = await ExtractProductInfo(productsCards[i]);
      products.push(product);
    }
    return products;
  }
})();
