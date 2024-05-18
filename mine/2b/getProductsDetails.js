module.exports = async (productCard) => {
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
};
