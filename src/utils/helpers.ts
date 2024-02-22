const roundToTwoDecimals = (number: number) => {
  return Math.round(number * 100) / 100;
};
const roundToOneDecimal = (number: number) => {
  return Math.round(number * 10) / 10;
};
function convertRange(number: number) {
  number = Math.max(0, Math.min(1, number));
  return number * 10;
}
function convertRangeAndRound(number: number) {
  const converted = convertRange(number);
  return roundToOneDecimal(converted);
}

function getTableValueColor(value: number) {
  return value <= 0.5 ? '#ea3943' : '#16c784';
}

const yearAgo = new Date();
const monthAgo = new Date();
const sevenDaysAgo = new Date();
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
monthAgo.setDate(monthAgo.getDate() - 31);
yearAgo.setDate(monthAgo.getDate() - 365);

const development = process.env.NODE_ENV === 'development';
const rootURL = development ? '/' : '/crypto-asset-reports/';

export {
  roundToTwoDecimals,
  roundToOneDecimal,
  convertRange,
  convertRangeAndRound,
  monthAgo,
  yearAgo,
  sevenDaysAgo,
  yesterday,
  getTableValueColor,
  development,
  rootURL,
};
