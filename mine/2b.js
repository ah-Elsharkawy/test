const puppeteer = require("puppeteer");

const twoBLinks = [
  "https://2b.com.eg/en/mobile-and-tablet/mobiles.html",
  "https://2b.com.eg/en/mobile-and-tablet/mobile-tablet.html",
  "https://2b.com.eg/en/computers/laptops.html",
];

(async () => {
  let twoB = "https://2b.com.eg/en/mobile-and-tablet/mobiles.html";
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();

  await page.goto(twoB, { waitUntil: "domcontentloaded" });

  let products = [];
  while (true) {
    let productshtml = await page.$$(".item.product.product-item");
    let products2 = await articlesIntoProducts(productshtml);
    products = products.concat(products2);

    let nextLink = await page.$(".item.pages-item-next");
    if (!nextLink) {
      console.log("no next page");
      break;
    }
    const nextLinkHref = await nextLink.evaluate(
      (el) => el.querySelector("a").href
    );
    break;
    await page.goto(nextLinkHref, { waitUntil: "domcontentloaded" });
  }
  // console.log(products);
  for (let i = 0; i < products.length; i++) {
    console.log("products[i].href :>> ", products[i].href);
    await page.goto(products[i].href, { waitUntil: "domcontentloaded" });
    // await page.goto(products[i].href, { waitUntil: "domcontentloaded" });
    let brand = await page.$("[data-th='Brand']");
    if (brand) {
      brand = await brand.evaluate((el) => el.innerText);
    }

    console.log("brand :>> ", brand);
    let displaySize = await page.$("[data-th='Display Size']");
    if (displaySize) {
      displaySize = await displaySize.evaluate((el) => el.innerText);
    }
    console.log("displaySize :>> ", displaySize);
    products[i].brand = brand;
    products[i].displaySize = displaySize;
  }
  console.log(products);
  // const productsAll = await Promise.all(
  //   products.map(async (product) => {
  //     await page.goto(product.href, { waitUntil: "domcontentloaded" });
  //     let displaySize = await page.evaluate(() => {
  //       let brand = document.querySelector(
  //         "data-th='Display Size']"
  //       )?.innerText;
  //       return brand;
  //     });
  //     let brand = await page.evaluate(() => {
  //       let brand = document.querySelector("[data-th='Brand']")?.innerText;
  //       return brand;
  //     });

  //     return {
  //       ...product,
  //       displaySize,
  //       brand,
  //     };
  //   })
  // );
  // console.log(productsAll);
  //   let productshtml = await page.$$(".item.product.product-item");

  //   let products = await articlesIntoProducts(productshtml);
  //   console.log("products>\n\n\n\n\na", products);

  //   let nextLink = await page.$(".item.pages-item-next");
  //   if (!nextLink) {
  //     console.log("no next page");
  //     return;
  //   }
  //   const nextLinkHref = await nextLink.evaluate(
  //     (el) => el.querySelector("a").href
  //   );
  //   console.log(nextLinkHref, ">> nextLinkHref");

  //   await page.goto(nextLinkHref, { waitUntil: "domcontentloaded" });
  //   productshtml = await page.$$(".item.product.product-item");
  //   let products2 = await articlesIntoProducts(productshtml);
  //   products = products.concat(products2);
  //   console.log("products2>\n\n\n\n\na", products2);

  //   await nextLink.click();
  //   await page.waitForTimeout(2000);
  //   productshtml = await page.$$(".item.product.product-item");
  //   let products2 = await articlesIntoProducts(productshtml);
  //   products = products.concat(products2);
  //   console.log("products2>\n\n\n\n\na", products2);

  //   await page.waitForSelector("a.action.next", { visible: true });
  //   const nextLink = await page.$("a.action.next");
  //   console.log(nextLink,">> nextLink");
  //   await nextLink.evaluate((el) =>
  //     el.scrollIntoView({ behavior: "smooth", block: "center" })
  //   );
  //   await nextLink.click();
  // await page.click("a.action.next", { force: true });

  //   productshtml = await page.$$(".item.product.product-item");
  //   let products2 = await articlesIntoProducts(productshtml);
  //   products = products.concat(products2);
  //   console.log("products2>\n\n\n\n\na", products2);
  browser.close();

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
    let oldPrice = await productCard.evaluate((ele) => {
      let discountElement = ele.querySelector(
        "[data-price-type='oldPrice'] span.price"
      );
      return discountElement ? discountElement.innerText : null;
    });
    let product = {
      href,
      title,
      price,
      oldPrice,
      website: "2b",
      // rating,
      // brand,
      // isAvailable,
    };

    return product;
  }
  // loop all products
  async function articlesIntoProducts(productshtml) {
    let products = [];
    for (let i = 0; i < productshtml.length; i++) {
      let product = await ExtractProductInfo(productshtml[i]);
      products.push(product);
    }
    return products;
  }
})();
