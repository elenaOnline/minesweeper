export default function didWin(allCellData) {
  if (!allCellData) return false;

  let bombsInFullBoard, howManyCovered;
  // CHECK FOR WIN
  for (let c = 0; c < allCellData.length; c++) {
    bombsInFullBoard = allCellData.filter(cellInfo => cellInfo.isBomb);
  }

  for (let c = 0; c < allCellData.length; c++) {
    howManyCovered = allCellData.filter(cellInfo => cellInfo.isCovered);
  }

  if (bombsInFullBoard.length === howManyCovered.length) {
    return true;
  }

  return false;
}
