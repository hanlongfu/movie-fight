const debounce = (callback, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    //make a request only after typing completed
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      //equivalent to callback(arg1, arg2, arg3, arg4)
      callback.apply(null, args);
    }, delay);
  };
};