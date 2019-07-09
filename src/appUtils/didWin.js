export default function didWin(allCellData) {
  if (!allCellData) return false;

  let bombsInFullBoard, howManyCovered;
  // CHECK FOR WIN
  for (let c = 0; c < allCellData.length; c++) {
    bombsInFullBoard = allCellData.filter(cellInfo => cellInfo.isBomb);

    console.log('[DX][GameBoard] bombsInFullBoard', bombsInFullBoard.length);
  }

  for (let c = 0; c < allCellData.length; c++) {
    howManyCovered = allCellData.filter(cellInfo => cellInfo.isCovered);
    console.log('[DX][GameBoard] howManyCovered', howManyCovered.length);
  }

  if (bombsInFullBoard.length === howManyCovered.length) {
    console.log('[DX][GameBoard] SUCCESS');
    return true;
  }

  return false;
}
