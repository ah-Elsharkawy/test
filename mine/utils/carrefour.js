/**
 * '3,620'
 * 3620
 * replace only comma with empty string
 * .replace(/,/g, "")
 * .replace(/[,\.].*|,/g, "")
 *
 */
exports.convertCarrefourPrice = (price) => {
  //prettier-ignore
  return +(price?.replace(/,/g, "") || 0) || null;
};

/**
 * '8,999.00EGP'
 *
 * 8999
 *
 * leave only the number and skip ther rest
 * .replace(/[,\.].*|,/g, "")// this return only 8
 * .replace(/[^0-9]/g, "")// this return 899900
 * return 8999
 *
 * .replace(/[^0-9]/g, "").slice(0, -2)// this return 8999
 *  */

exports.convertCarrefourOldPrice = (price) => {
  //prettier-ignore
  return +(price?.replace(/[^0-9]/g, "").slice(0, -2) || 0) || null;
};
