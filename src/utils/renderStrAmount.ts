/**
 * Return str with  amount
 *
 * @param {number} amount -  amount
 * @param {string[]} words - array with words
 * @returns {string} - string with amount
 */
export const renderStrAmount = (amount: number, words: string[]): string => {
  const value = Math.abs(amount) % 100;
  const num = value % 10;

  if (value > 10 && value < 20) return `${amount} ${words[2]}`;
  if (num > 1 && num < 5) return `${amount} ${words[1]}`;
  if (num == 1) return `${amount} ${words[0]}`;
  return `${amount} ${words[2]}`;
};
