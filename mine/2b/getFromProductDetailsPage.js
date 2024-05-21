exports.getFromProductDetailsPage = async (page) => {
  let brand = await page.$("[data-th='Brand']");

  brand = brand ? await brand.evaluate((el) => el.innerText) : null;

  let displaySize = await page.$("[data-th='Display Size']");

  displaySize = displaySize
    ? await displaySize.evaluate((el) => el.innerText)
    : null;

  return {
    brand,
    displaySize,
  };
};
