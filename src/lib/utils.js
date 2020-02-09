export const classList = function(map, fixed = "") {
  const fixedList = fixed.split(" ").filter(token => token !== "");
  const dynamicList = Object.keys(map).filter(key => map[key]);
  return [...fixedList, ...dynamicList].join(" ");
};

export const onEnter = function(handler) {
  return e => e.key === "Enter" && handler();
};
