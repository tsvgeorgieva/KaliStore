export class LocalStorageManager {
  save(key, data) {
    localStorage[key] = JSON.stringify(data);
  }

  get(key) {
    const data = localStorage[key];
    if (data !== undefined) {
      return JSON.parse(data);
    }
  }
}
