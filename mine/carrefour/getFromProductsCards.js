const { carrefourConfig } = require("../config/url");
const { convert2BPrice } = require("../utils/2b");
const {
  convertCarrefourPrice,
  convertCarrefourOldPrice,
} = require("../utils/carrefour");

async function getFromProductsCard(productCard) {
  // const id = await productCard.evaluate(
  //   (ele) => ele.querySelector("[data-product-id]")?.dataset.productId
  // );
  let href = await productCard.evaluate((ele) => ele.querySelector("a")?.href);
  let price = await productCard.evaluate(
    (ele) =>
      ele.querySelector(
        // "[data-testid='product-card-original-price'] .css-14zpref"
        ".css-14zpref"
      )?.innerText
  );
  /**
   * css-1edki26
   * css-14zpref
   */
  const imageURL = await productCard.evaluate((ele) =>
    ele.querySelector("img")?.getAttribute("src")
  );

  let title = await productCard.evaluate((ele) =>
    ele.querySelector("a[title]").getAttribute("title")
  );
  let oldPrice = await productCard.evaluate((ele) => {
    ele.querySelector(".css-1edki26")?.textContent;
  });

  let product = {
    //  productId: +id,
    brand: title.split(" ")[0],
    imageURL,
    href,
    title,
    price: convertCarrefourPrice(price),
    // oldPrice:
    //   convertCarrefourOldPrice(oldPrice) || convertCarrefourPrice(price),
    website: "carrefour",
    // rating,
    // brand,
    // isAvailable,
  };

  return product;
}

exports.getFromProductsCards = async (productshtml) => {
  let products = [];
  for (let i = 0; i < productshtml.length; i++) {
    let product = await getFromProductsCard(productshtml[i]);
    products.push(product);
  }
  return products;
};
