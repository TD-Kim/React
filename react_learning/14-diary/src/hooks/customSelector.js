export default function customSelector(state, ...args) {
  const tempObj = args.reduce((acc, key) => {
    return acc[key];
  }, state);
  return tempObj;
}
