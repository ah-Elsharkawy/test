const { convert2BPrice } = require("../utils/2b");

async function getFromProductsCard(productCard) {
  const id = await productCard.evaluate(
    (ele) => ele.querySelector("[data-product-id]")?.dataset.productId
  );
  let href = await productCard.evaluate((ele) => ele.querySelector("a")?.href);
  let title = await productCard.evaluate(
    (ele) => ele.querySelector(".product-item-link")?.innerText
  );
  let price = await productCard.evaluate(
    (ele) =>
      ele.querySelector('[data-price-type="finalPrice"] span.price')?.innerText
  );
  let oldPrice = await productCard.evaluate(
    (ele) =>
      ele.querySelector("[data-price-type='oldPrice'] span.price")?.innerText
  );

  let product = {
    productId: +id,
    href,
    title,
    price: convert2BPrice(price),
    oldPrice: convert2BPrice(oldPrice),
    website: "2b",
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
