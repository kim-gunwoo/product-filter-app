export const NO_INTERRESTED = 'no_Interested';
export const WATCH = 'watch';

export const setLocalStorageRecentItems = (watch, item) => {
  const initStorage = JSON.parse(localStorage[watch] || '[]');
  const storage = Array.isArray(initStorage) ? initStorage : [];
  const findItem = storage.some(el => el.id === item.id);
  const date = getFormatDate(new Date(), 'YYYYMMDDHHMISS');

  const data = {
    ...item,
    date,
  };

  const items = storage
    .map(el => (el.id === item.id ? data : el))
    .filter(el => el.date.slice(0, 8) === date.slice(0, 8));

  if (!findItem) {
    items.push(data);
  }

  localStorage[watch] = JSON.stringify(items);
};

export const getLocalStorageReCentItems = watch => {
  const initStorage = JSON.parse(localStorage[watch] || '[]');
  return Array.isArray(initStorage) ? initStorage : [];
};

export const getFormatDate = (date, format) => {
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

export const getInterestedItems = (totalItems, item) => {
  const noInterestedItems = getLocalStorageReCentItems(NO_INTERRESTED);
  if (item) noInterestedItems.push(item);

  return totalItems.filter(
    item =>
      noInterestedItems.findIndex(
        noInterestedItem => noInterestedItem.id === item.id
      ) === -1
  );
};

export const formatdigit = (number, digits) => {
  let zero = '';
  const strNum = number.toString();

  if (strNum.length < digits) {
    for (let i = 0; i < digits - strNum.length; i++) zero += '0';
  }
  return zero + strNum;
};
