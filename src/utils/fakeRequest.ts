/**
 * Some fake request
 *
 * @returns {Promise<boolean>} - promise with response
 */
export const fakeRequest = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
