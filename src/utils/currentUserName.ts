const STORAGE_TOKEN_NAME = 'CURRENTUSERNAME';

/**
 * JWT的方案
 */
export default {
  get() {
    return sessionStorage.getItem(STORAGE_TOKEN_NAME);
  },
  save(currentUserName: string) {
    sessionStorage.setItem(STORAGE_TOKEN_NAME, currentUserName);
  },
  remove() {
    sessionStorage.removeItem(STORAGE_TOKEN_NAME);
  },
};
