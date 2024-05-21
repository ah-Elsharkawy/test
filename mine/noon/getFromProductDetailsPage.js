exports.getFromProductDetailsPage = async (page) => {
  let brand = await page.$(".sc-869d045a-15");

  brand = brand ? await brand.evaluate((el) => el.innerText) : null;

  // using xpath to get display size  first //li[contains(text(), 'inch' )]
  //const element = await page.waitForSelector('::-p-xpath(h2)');
  let displaySize = await page.$(
    "::-p-xpath(//*[contains(text(), 'Screen Size' )])"
  );
  displaySize = displaySize
    ? await displaySize.evaluate((el) => el.nextElementSibling.textContent)
    : null;

  return {
    displaySize,
    brand,
  };
};
