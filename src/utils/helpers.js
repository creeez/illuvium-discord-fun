const sortIlluvials = (a, b) => {
  if (a.affinity < b.affinity) {
    return -1;
  }
  if (a.affinity > b.affinity) {
    return 1;
  }
  if (a.stage < b.stage) {
    return -1;
  }
  if (a.stage > b.stage) {
    return 1;
  }
  return 0;
};

export const filterIlluvials = (illuvials, filters) => {
  const filterKeys = Object.keys(filters);
  return illuvials
    .filter((illuvial) =>
      filterKeys.every((key) => {
        if (!filters[key].length) return true;
        if (Array.isArray(illuvial[key])) {
          return illuvial[key].some((keyEle) => filters[key].includes(keyEle));
        }
        return filters[key].includes(illuvial[key]);
      })
    )
    .sort(sortIlluvials);
};
