const logger = (store) => (next) => (action) => {
  console.group(action.type);
  const result = next(action);
  const state = store.getState();
  console.log('The new state is:', state);
  console.groupEnd();
  return result;
};

export default logger;
