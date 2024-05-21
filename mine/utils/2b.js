/**
 * 'EGP11,129.00'
 * 11129
 */

exports.convert2BPrice = (price) => {
  //prettier-ignore
  return +(price.replace(/[^\d.]/g, ""));
};
