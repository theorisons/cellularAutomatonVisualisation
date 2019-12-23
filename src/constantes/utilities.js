export const initCells = (nbRows, nbColumns) => {
  // Init all the cells at 0 in the matrix
  let matrix = [];
  let tmpRow = [];

  for (let r = 0; r < nbRows; r++) {
    // iterate over the rows and columns of the matrix
    tmpRow = [];
    for (let c = 0; c < nbColumns; c++) {
      tmpRow.push(0); // set value to 0
    }
    matrix.push(tmpRow);
  }
  return matrix;
};
