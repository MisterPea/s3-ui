/**
 * This method modifies or removes queries:
 * A query used on its own will remove the entire query reference.
 * A query tied to a modifier will modify the query
 * @param {string} query Query to remove/modify
 * @param {string} modifier Change to be made to `query`
 * @param {Object[]} parsedQuery Key/values of query string (derived from useParseQuery)
 */
export default function removeQuery(query, modifier = null, parsedQuery) {
  const queryKeys = Object.keys(parsedQuery);
  let output = '';
  let newQueryKeys = [];
  if (modifier === null) {
    newQueryKeys = queryKeys.filter((key) => key !== query);
  } else {
    newQueryKeys = queryKeys;
  }
  newQueryKeys.forEach((key, index) => {
    if (index === 0) {
      output += '?';
    } else {
      output += '&';
    }
    let value;
    if (modifier !== null && key === query) {
      value = modifier;
    } else {
      value = parsedQuery[key];
    }
    output += `${key}=${value}`;
  });
  return output;
}
