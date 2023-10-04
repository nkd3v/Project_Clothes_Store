const isGetter = (x, name) => (Object.getOwnPropertyDescriptor(x, name) || {}).get
const isFunction = (x, name) => typeof x[name] === "function";
const deepFunctions = x =>
  x && x !== Object.prototype &&
  Object.getOwnPropertyNames(x)
    .filter(name => isGetter(x, name) || isFunction(x, name))
    .concat(deepFunctions(Object.getPrototypeOf(x)) || []);
const distinctDeepFunctions = x => Array.from(new Set(deepFunctions(x)));
const getMethods = (obj) => distinctDeepFunctions(obj).filter(
    name => name !== "constructor" && !~name.indexOf("__"));

module.exports = { getMethods }