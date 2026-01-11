const CLOTHES_KEY = 'stylemate_clothes';
const OUTFITS_KEY = 'stylemate_outfits';
const THEME_KEY = 'stylemate_theme';

const safeParse = (value, fallback) => {
  try {
    if (!value) return fallback;
    return JSON.parse(value);
  } catch (err) {
    console.warn('Falling back after parse error', err);
    return fallback;
  }
};

export const getClothes = () => {
  const data = safeParse(localStorage.getItem(CLOTHES_KEY), []);
  if (!Array.isArray(data)) {
    localStorage.setItem(CLOTHES_KEY, JSON.stringify([]));
    return [];
  }
  localStorage.setItem(CLOTHES_KEY, JSON.stringify(data));
  return data;
};

export const saveClothes = (items) => {
  localStorage.setItem(CLOTHES_KEY, JSON.stringify(items));
};

export const getOutfits = () => {
  const data = safeParse(localStorage.getItem(OUTFITS_KEY), []);
  if (!Array.isArray(data)) {
    localStorage.setItem(OUTFITS_KEY, JSON.stringify([]));
    return [];
  }
  localStorage.setItem(OUTFITS_KEY, JSON.stringify(data));
  return data;
};

export const saveOutfits = (items) => {
  localStorage.setItem(OUTFITS_KEY, JSON.stringify(items));
};

export const getTheme = () => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  localStorage.setItem(THEME_KEY, 'light');
  return 'light';
};

export const saveTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const findClothingById = (clothes, id) => clothes.find((item) => item.id === id);
