const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function checkIfOverGame(xElements, oElements) {
  const xPlayer = [...xElements].sort();
  const oPlayer = [...oElements].sort();
  let includedElementsX = [];
  let includedElementsO = [];
  const boolXWin = lines.some((item) => {
    if (item.every((item2) => xPlayer.includes(item2)))
      includedElementsX = item;
    return item.every((item2) => xPlayer.includes(item2));
  });
  const boolOWin = lines.some((item) => {
    if (item.every((item2) => oPlayer.includes(item2)))
      includedElementsO = item;
    return item.every((item2) => oPlayer.includes(item2));
  });

  if (boolXWin) return [true, "X", includedElementsX];
  if (boolOWin) return [true, "O", includedElementsO];

  return [false, ""];
}
