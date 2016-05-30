export const localStorageManager = {
  save: (key, data) => {
    localStorage[key] = JSON.stringify(data);
  },

  get: (key)=> {
    const data = localStorage[key];
    if (data !== undefined) {
      return JSON.parse(data);
    }
  },

  has: (key) => {
    const data = localStorage[key];
    return data !== undefined;
  },

  clear: (key)=> {
    localStorage.removeItem(key);
  }
};
