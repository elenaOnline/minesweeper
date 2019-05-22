import React, { Component } from 'react';
import styles from './GameBoard.module.css';
import Cell from '../Cell/Cell';
import getRandomInt from '../../routes/utils/getRandomInt';
class GameBoard extends Component {
  static defaultProps = {
    boardSize: 3,
  };
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

  uncoverAllBombs() {
    const { allCellsData } = this.state;
    allCellsData.forEach(aCellData => {
      aCellData.isCovered = false;
    });
  }

  checkSurroundingCells = payload => {
    const { index } = payload;
    const { allCellsData } = this.state;
    let howManySurroundingBombs = 0;
    if (allCellsData[index + 1].isBomb) {
      howManySurroundingBombs++;
      this.setState = { howManySurroundingBombs };
    }
    if (allCellsData[index - 1].isBomb) {
      howManySurroundingBombs++;
      this.setState = { howManySurroundingBombs };
    }
    if (allCellsData[index + this.boardSize].isBomb) {
      howManySurroundingBombs++;
      this.setState = { howManySurroundingBombs };
    }
    if (allCellsData[index + this.boardSize + 1].isBomb) {
      howManySurroundingBombs++;
      this.setState = { howManySurroundingBombs };
    }
    if (allCellsData[index + this.boardSize - 1].isBomb) {
      howManySurroundingBombs++;
      this.setState = { howManySurroundingBombs };
    }
    if (allCellsData[index - this.boardSize].isBomb) {
      howManySurroundingBombs++;
      this.setState = { howManySurroundingBombs };
    }
    if (allCellsData[index - this.boardSize + 1].isBomb) {
      howManySurroundingBombs++;
      this.setState = { howManySurroundingBombs };
    }
    if (allCellsData[index - this.boardSize - 1].isBomb) {
      howManySurroundingBombs++;
      this.setState = { howManySurroundingBombs };
    }
  };

  handleCellClick = payload => {
    const { index } = payload;
    const { allCellsData, howManySurroundingBombs } = this.state;
    const clickedCellData = allCellsData[index];
    let isThisNumbered = false;

    // uncover this cell
    clickedCellData.isCovered = false;

    // WAS BOMB
    if (clickedCellData.isBomb) {
      this.uncoverAllBombs();
    }

    // NOT BOMB
    else {
      isThisNumbered = true;
      this.checkSurroundingCells();
      // allCellsData.filter(data => data.isBomb).length

      // WAS NUMBERED
      if (isThisNumbered) {
        // update cell data with number
        clickedCellData.numberNear = howManySurroundingBombs;
      }

      // WAS EMPTY
      else {
      }
    }

    // update state so it renders
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
