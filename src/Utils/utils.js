let makeEnum = function (arr) {
  let obj = {};
  for (let value of arr) {
    obj[value] = Symbol(value);
  }
  return Object.freeze(obj);
};

export const Utils = {
  newEnum: makeEnum,
  isObject: function (o) {
    return typeof o === 'object' && o !== null
  },
  isArray: function (arr) {
    return Array.isArray(arr)
  },
  getType: function (o) {
    return typeof o
  }
}
