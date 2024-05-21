const { convertCarrefourPrice } = require("../utils/carrefour");

async function getFromProductsCard(productCard) {
  let id = await productCard.evaluate((ele) =>
    ele.querySelector("a")?.getAttribute("id")
  );
  let href = await productCard.evaluate((ele) => ele.querySelector("a")?.href);
  let imageURL = await productCard.evaluate((ele) =>
    ele.querySelector("img")?.getAttribute("src")
  );
  let title = await productCard.evaluate((ele) =>
    ele.querySelector("[data-qa='product-name']")?.getAttribute("title")
  );
  let price = await productCard.evaluate(
    (ele) => ele.querySelector(".amount")?.innerText
  );
  let oldPrice = await productCard.evaluate(
    (ele) => ele.querySelector(".oldPrice")?.innerText
  );
  let discount = await productCard.evaluate(
    (ele) => ele.querySelector(".discount")?.innerText
  );
  let product = {
    productId: id,
    imageURL,
    href,
    title,
    price: convertCarrefourPrice(price),
    oldPrice: convertCarrefourPrice(oldPrice),
    website: "noon",
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
