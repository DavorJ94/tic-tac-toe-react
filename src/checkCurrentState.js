export default function firstStateExists(allElements) {
  const isFirstState = Object.values(allElements).find((item) => item !== "");

  return isFirstState;
}
