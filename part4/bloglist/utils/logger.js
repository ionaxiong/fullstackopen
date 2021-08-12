const info = (...param) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...param);
  }
};

const error = (...param) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...param);
  }
};

module.exports = {
  info,
  error,
};
