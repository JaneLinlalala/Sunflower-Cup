const STORAGE_TOKEN_NAME = 'CURRENTUSERID';

/**
 * JWT的方案
 */
export default {
  get() {
    return sessionStorage.getItem(STORAGE_TOKEN_NAME);
  },
  save(currentUserId: string) {
    sessionStorage.setItem(STORAGE_TOKEN_NAME, currentUserId);
  },
  remove() {
    sessionStorage.removeItem(STORAGE_TOKEN_NAME);
  },
};
