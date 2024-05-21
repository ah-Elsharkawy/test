const { convertCarrefourOldPrice } = require("../utils/carrefour");

exports.getFromProductDetailsPage = async (page) => {
  let brand = await page.$("[data-th='Brand']");

  // brand = brand ? await brand.evaluate((el) => el.innerText) : null;

  // using xpath to get display size  first //li[contains(text(), 'inch' )]
  //const element = await page.waitForSelector('::-p-xpath(h2)');
  let displaySize = await page.$("::-p-xpath(//li[contains(text(), 'inch' )])");

  let oldPrice = await page.$("::-p-xpath(//del[@class='css-1bdwabt'])");

  if (oldPrice) {
    oldPrice = await oldPrice.evaluate((el) => el.textContent);
  }
  displaySize = displaySize
    ? await displaySize.evaluate((el) => el.textContent)
    : null;

  return {
    displaySize,
    oldPrice: convertCarrefourOldPrice(oldPrice),
  };
};
