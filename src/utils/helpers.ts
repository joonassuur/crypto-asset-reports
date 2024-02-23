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

function getTableValueArrow(value: number) {
  return {
    content: '""',
    display: 'inline-block',
    width: 0,
    height: 0,
    borderBottom:
      value <= 0.5
        ? '4px solid transparent'
        : `4px solid ${getTableValueColor(value)}`,
    borderRight: '4px solid transparent',
    borderLeft: '4px solid transparent',
    borderTop:
      value <= 0.5
        ? `4px solid ${getTableValueColor(value)}`
        : '4px solid transparent',
    marginRight: '8px',
    position: 'relative',
    top: value <= 0.5 ? '2px' : '-2px',
  };
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
  getTableValueArrow,
};
