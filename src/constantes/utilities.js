/* Functions use to handle the Map */
export const getKeyFromCoordinates = (r, c) => {
  // Return the value of the key for a cell at coordinates (c,r)
  return `R${r}C${c}`;
};

export const getCoordinatesFromKey = key => {
  // Return the value of the coordinates (c,r) from a key
  // Return is an object
  // The key is a string

  let i = 1; // The first value is 'R'
  let indR = "";
  let indC = "";

  while (key[i] !== "C") {
    indR = indR + key[i];
    i++;
  }

  i += 1; // Skip 'C"

  for (; i < key.length; i++) {
    indC = indC + key[i];
  }

  //Conver the strig value into integer
  indR = parseInt(indR, 10);
  indC = parseInt(indC, 10);

  return { indR: indR, indC: indC };
};

export const getValueCell = (indR, indC, map) => {
  // Return the value that correspond to the coordinates
  const value = map.get(getKeyFromCoordinates(indR, indC));

  if (value === undefined) {
    // The value is not set so the cell is dead
    return 0;
  }
  return value;
};
