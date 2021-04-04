export default function checkCurrentElementCount(currentElements) {
  let count = -1;
  Object.values(currentElements).forEach((item) => {
    if (item !== "") count++;
  });

  return count;
}
