const BASE_URL = '';

export const fetchApiData = async () => {
  const res = await fetch(`${BASE_URL}/data/product.json`);
  const items = await res.json();
  return items.map((el, index) => ({ ...el, id: index }));
};
