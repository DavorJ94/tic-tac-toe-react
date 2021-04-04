export default function buttonStateXandO(XElements, OElements, allElements) {
  let modifiedXElements = [];
  XElements.forEach((element) => {
    if (Object.values(allElements)[element] === "X")
      modifiedXElements.push(element);
  });
  modifiedXElements = modifiedXElements.filter(
    (element) => element !== undefined
  );

  let modifiedOElements = [];
  OElements.forEach((element) => {
    if (Object.values(allElements)[element] === "O")
      modifiedOElements.push(element);
  });
  modifiedOElements = modifiedOElements.filter(
    (element) => element !== undefined
  );

  return [modifiedXElements, modifiedOElements];
}
