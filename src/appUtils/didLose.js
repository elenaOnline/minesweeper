export default function didLose(allCellData) {
  if (!allCellData) return false;

  let howManyCovered;
  // CHECK FOR WIN

  for (let c = 0; c < allCellData.length; c++) {
    howManyCovered = allCellData.filter(cellInfo => cellInfo.isCovered);
  }

  if (howManyCovered.length === 0) {
    return true;
  }

  return false;
}
