// import { Revenue } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

/*
  timestamp: 13位时间戳 | new Date() | Date()
  console.log(dateFormat(1714528800000, 'YY-MM-DD HH:mm:ss'))
  format => YY：年，M：月，D：日，H：时，m：分钟，s：秒，SSS：毫秒
*/
export const dateFormat = (timestamp: number|string|Date, format = 'YYYY-MM-DD HH:mm:ss') => {
  var date = new Date(timestamp)
  
  // function fixedTwo (value: number): string {
  //   return value < 10 ? '0' + value : String(value)
  // }
  // var showTime = format
  // if (showTime.includes('SSS')) {
  //   const S = date.getMilliseconds()
  //   showTime = showTime.replace('SSS', '0'.repeat(3 - String(S).length) + S)
  // }
  // if (showTime.includes('YY')) {
  //   const Y = date.getFullYear()
  //   showTime = showTime.includes('YYYY') ? showTime.replace('YYYY', String(Y)) : showTime.replace('YY', String(Y).slice(2, 4))
  // }
  // if (showTime.includes('M')) {
  //   const M = date.getMonth() + 1
  //   showTime = showTime.includes('MM') ? showTime.replace('MM', fixedTwo(M)) : showTime.replace('M', String(M))
  // }
  // if (showTime.includes('D')) {
  //   const D = date.getDate()
  //   showTime = showTime.includes('DD') ? showTime.replace('DD', fixedTwo(D)) : showTime.replace('D', String(D))
  // }
  // if (showTime.includes('H')) {
  //   const H = date.getHours()
  //   showTime = showTime.includes('HH') ? showTime.replace('HH', fixedTwo(H)) : showTime.replace('H', String(H))
  // }
  // if (showTime.includes('m')) {
  //   var m = date.getMinutes()
  //   showTime = showTime.includes('mm') ? showTime.replace('mm', fixedTwo(m)) : showTime.replace('m', String(m))
  // }
  // if (showTime.includes('s')) {
  //   var s = date.getSeconds()
  //   showTime = showTime.includes('ss') ? showTime.replace('ss', fixedTwo(s)) : showTime.replace('s', String(s))
  // }
  // return showTime
  date.setTime(date.getTime() + (8 * 60 * 60 * 1000));
  return date.toLocaleString('zh-CN');
}

// export const generateYAxis = (revenue: Revenue[]) => {
//   // Calculate what labels we need to display on the y-axis
//   // based on highest record and in 1000s
//   const yAxisLabels = [];
//   const highestRecord = Math.max(...revenue.map((month) => month.revenue));
//   const topLabel = Math.ceil(highestRecord / 1000) * 1000;

//   for (let i = topLabel; i >= 0; i -= 1000) {
//     yAxisLabels.push(`$${i / 1000}K`);
//   }

//   return { yAxisLabels, topLabel };
// };

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
