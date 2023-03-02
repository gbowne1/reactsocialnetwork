export const loadFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};