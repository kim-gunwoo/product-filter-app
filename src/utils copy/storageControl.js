export const setLocalStorage = (watch, item) => {
  const initStorage = JSON.parse(localStorage[watch] || '[]');

  const storage = Array.isArray(initStorage) ? initStorage : [];

  const findIndex = storage.findIndex(el => el.idx === item.idx);

  const date = returnFormatDate(new Date(), 'YYYYMMDDHHMISS');

  const data = {
    ...item,
    date,
  };

  const items = storage
    .map(el => (el.idx === item.idx ? data : el))
    .filter(el => el.date.slice(0, 8) === date.slice(0, 8));

  if (findIndex < 0) {
    items.push(data);
  }

  localStorage[watch] = JSON.stringify(items);
};

export const getLocalStorage = watch => {
  const initStorage = JSON.parse(localStorage[watch] || '[]');
  return Array.isArray(initStorage) ? initStorage : [];
};

export const returnFormatDate = (date, format) => {
  const yy = date.getFullYear();
  const mm = formatdigit(date.getMonth() + 1, 2);
  const dd = formatdigit(date.getDate(), 2);
  const hh = formatdigit(date.getHours(), 2);
  const mi = formatdigit(date.getMinutes(), 2);
  const ss = formatdigit(date.getSeconds(), 2);

  if (format.toUpperCase() === 'YYYY-MM-DD') {
    return `${yy}-${mm}-${dd}`;
  }
  if (format.toUpperCase() === 'YYYYMMDDHHMISS') {
    return `${yy}${mm}${dd}${hh}${mi}${ss}`;
  }
};

export const formatdigit = (number, digits) => {
  let zero = '';
  const strNum = number.toString();

  if (strNum.length < digits) {
    for (let i = 0; i < digits - strNum.length; i++) zero += '0';
  }
  return zero + strNum;
};
