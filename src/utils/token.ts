const STORAGE_TOKEN_NAME = 'TOKEN';

/**
 * JWT的方案
 */
export default {
  get() {
    return sessionStorage.getItem(STORAGE_TOKEN_NAME);
  },
  save(token: string) {
    sessionStorage.setItem(STORAGE_TOKEN_NAME, token);
  },
  remove() {
    sessionStorage.removeItem(STORAGE_TOKEN_NAME);
  },
};
