import React, { Component } from 'react';
import styles from './GameBoard.module.css';
import Cell from '../Cell/Cell';
import getRandomInt from '../../routes/utils/getRandomInt';
class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCellsData: this.getAllCellData(props.boardSize),
    };
  }
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

  handleCellClick = payload => {
    const { index } = payload;
    const { allCellsData } = this.state;
    const oneCellData = allCellsData[index];
    oneCellData.isCovered = false;
    if (oneCellData.isBomb) {
      allCellsData.forEach(aCellData => {
        aCellData.isCovered = false;
      });
    }
    this.setState({ allCellsData });
  };

  /** D-UTILS */

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
    return <Cell key={idx} {...data} onClick={this.handleCellClick} />;
  }
}

export default GameBoard;
