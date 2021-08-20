/**
 * Creates a pseudo-random id of a desired length (default is 5)
 * @param {Number} [length = 5] Length of the id
 * @return Returns an alpha id code
 */
export default function createId(length = 5) {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
}
