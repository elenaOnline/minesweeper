import React, { Component } from 'react';
import styles from './GameBoard.module.css';
import Cell from '../Cell/Cell';
import getRandomInt from '../../routes/utils/getRandomInt';
class GameBoard extends Component {
  static defaultProps = {
    boardSize: 3,
  };

  /** LIFECYCLE */
  constructor(props) {
    super(props);
    this.state = {
      allCellsData: this.getAllCellData(props.boardSize),
      totalNumberOfFlags: 0,
    };
    console.log('[DX][GameBoard] this.props', this.props);
  }

  /** HANDLERS */
  handleCellClick = payload => {
    const { index, isShift } = payload;
    const { allCellsData } = this.state;
    const { onCellClick, onCellExpanded } = this.props;
    const clickedCellData = allCellsData[index];

    onCellClick && onCellClick();

    if (isShift) {
      this.flagCell(index);
    }

    // WAS BOMB
    else if (clickedCellData.isBomb) {
      this.uncoverAllBombs();
      clickedCellData.isCovered = false;
      this.loseScenario();
    }

    // NOT BOMB
    else {
      this.numberAndUncoverEmptyNeighbors(index);
      clickedCellData.isCovered = false;
      onCellExpanded && onCellExpanded();
    }

    // update state so it renders
    this.setState({ allCellsData });
  };

  /** CELL WORKERS */
  numberAndUncoverEmptyNeighbors(index) {
    const { allCellsData } = this.state;
    const cellData = allCellsData[index];
    if (!cellData) return;
    this.setNumberNear(index);

    if (cellData.isBomb || !cellData.isCovered) return;

    cellData.isCovered = false;

    // NUMBERED CELL
    if (cellData.numberNear > 0) return;

    // get neighboring cells
    const surroundingCells = this.getSurroundingCells(index);
    if (!surroundingCells || surroundingCells.length === 0) return null;

    const surroundingCoveredCells = surroundingCells.filter(
      cell => cell.isCovered
    );
    if (!surroundingCoveredCells || surroundingCoveredCells.length === 0)
      return null;

    // call this function with each
    surroundingCoveredCells.forEach(cell => {
      this.numberAndUncoverEmptyNeighbors(cell.index);
    });
  }
  uncoverAllBombs() {
    const { allCellsData } = this.state;
    allCellsData.forEach(aCellData => {
      aCellData.isCovered = false;
    });
  }
  loseScenario() {
    const { onGameloss } = this.props;
    document.body.style.backgroundColor = 'navy';
    document.body.style.transform = 'skewY(20deg)';
    onGameloss && onGameloss();
  }
  flagCell(index) {
    const { allCellsData, totalNumberOfFlags } = this.state;
    const cellData = allCellsData[index];
    let numberOfBombs = allCellsData.filter(data => data.isBomb).length;
    if (!cellData) return;
    if (!cellData.isCovered || totalNumberOfFlags >= numberOfBombs) return;

    cellData.isFlagged = !cellData.isFlagged;
    this.setState({ totalNumberOfFlags: totalNumberOfFlags + 1 });
    console.log('[DX][GameBoard] totalNumberOfFlags', totalNumberOfFlags);
    // this.limitFlags(cellData);
  }

  /** IS-ERS */
  isTopRow(index) {
    const { boardSize } = this.props;
    return index < boardSize;
  }
  isBottomRow(index) {
    const { boardSize } = this.props;
    return index >= boardSize * (boardSize - 1);
  }
  isLeftColumn(index) {
    const { boardSize } = this.props;
    return index % boardSize === 0;
  }
  isRightColumn(index) {
    const { boardSize } = this.props;
    return index % boardSize === 9;
  }

  /** HELPERS */
  getAllCellData(boardSize) {
    if (!boardSize) return;
    const allCellsData = [];
    const numberOfCells = Math.pow(boardSize, 2);

    //: CREATE DEFAULT DATA FOR ALL CELLS
    for (let c = 0; c < numberOfCells; c++) {
      allCellsData.push({
        isBomb: false,
        isCovered: true,
        isFlagged: false,
        numberNear: undefined,
        index: c,
      });
    }

    //: ASSIGN BOMBS
    let bombsNeeded = Math.ceil(numberOfCells / 10);
    while (bombsNeeded > 0) {
      // ROLL a random cell to try to put a bomb in
      const randomCellIndex = getRandomInt(numberOfCells) - 1;
      const currentCell = allCellsData[randomCellIndex];

      // MAKE IT A BOMB -- if cell not a bomb already
      if (!currentCell.isBomb) {
        currentCell.isBomb = true;
        bombsNeeded--;
      }
    }
    return allCellsData;
  }
  getSurroundingCells(fromCellIndex, includeDiags = true) {
    // return an array of cellData items
    // ex: starting with 5
    // [{index:1...}, {index:2...}, {index:3...},
    // [{index:4...},               {index:6...},
    // [{index:7...}, {index:8...}, {index:9...}, ]
    const { boardSize } = this.props;
    const surroundCells = [];
    const isLeft = this.isLeftColumn(fromCellIndex);
    const isRight = this.isRightColumn(fromCellIndex);
    const isTop = this.isTopRow(fromCellIndex);
    const isBottom = this.isBottomRow(fromCellIndex);

    // TL
    !isLeft &&
      !isTop &&
      this._addIfFound(
        surroundCells,
        fromCellIndex,
        fromCellIndex - boardSize - 1
      );
    //TC
    !isTop &&
      this._addIfFound(surroundCells, fromCellIndex, fromCellIndex - boardSize);
    // TR
    !isTop &&
      !isRight &&
      this._addIfFound(
        surroundCells,
        fromCellIndex,
        fromCellIndex - boardSize + 1
      );

    // L
    !isLeft &&
      this._addIfFound(surroundCells, fromCellIndex, fromCellIndex - 1);
    //R
    !isRight &&
      this._addIfFound(surroundCells, fromCellIndex, fromCellIndex + 1);

    // BL
    !isBottom &&
      !isLeft &&
      this._addIfFound(
        surroundCells,
        fromCellIndex,
        fromCellIndex + boardSize - 1
      );
    // BC
    !isBottom &&
      this._addIfFound(surroundCells, fromCellIndex, fromCellIndex + boardSize);
    // BR
    !isBottom &&
      !isRight &&
      this._addIfFound(
        surroundCells,
        fromCellIndex,
        fromCellIndex + boardSize + 1
      );
    return surroundCells;
  }
  _addIfFound(surroundCells, fromCellIndex, indexToCheck) {
    const { allCellsData } = this.state;

    // should I check this one
    // using isTop...

    if (allCellsData[indexToCheck]) {
      surroundCells.push(allCellsData[indexToCheck]);
    }
  }
  getNumberOfBombs(cellDataArray) {
    if (!cellDataArray) return 0;
    const totalNumberOfBombs = cellDataArray.filter(data => data.isBomb).length;
    return totalNumberOfBombs;
  }
  limitFlags(cellDataArray) {
    if (this.totalNumberOfBombs.filter(total => total.isFlagged) >= 10) {
      console.log('[DX][GameBoard] too many!');
    }
  }
  setNumberNear(index) {
    const { allCellsData } = this.state;
    const clickedCellData = allCellsData[index];
    if (!clickedCellData) return;

    const surroundingCellsData = this.getSurroundingCells(index);
    const bombCount = this.getNumberOfBombs(surroundingCellsData);
    if (bombCount) {
      clickedCellData.numberNear = bombCount;
    }
    return bombCount;
  }

  /** RENDERERS */
  render() {
    return <div className={styles.root}>{this.renderCells()}</div>;
  }
  renderCells() {
    const { allCellsData } = this.state;

    if (!allCellsData) return null;

    let cells = [];
    for (let c = 0; c < allCellsData.length; c++) {
      let data = allCellsData[c];
      cells.push(this.renderCell(c, data));
    }

    return cells;
  }
  renderCell(idx, data) {
    return <Cell key={idx} {...data} onPress={this.handleCellClick} />;
  }
}

export default GameBoard;
