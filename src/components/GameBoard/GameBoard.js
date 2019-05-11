import React, { Component } from 'react';
import styles from './GameBoard.module.css';
import Cell from '../Cell/Cell';
class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCellsData: this.getAllCellData(props.boardSize),
      name: 'bob',
    };
  }
  getAllCellData(boardSize) {
    if (!boardSize) return;
    const allCellsData = [];
    for (let c = 0; c < Math.pow(boardSize, 2); c++) {
      if (c % 2 === 0) {
        allCellsData.push({
          isBomb: true,
          isCovered: true,
          isFlagged: false,
          numberNear: undefined,
          index: c,
        });
      } else {
        allCellsData.push({
          isBomb: false,
          isCovered: true,
          isFlagged: false,
          numberNear: undefined,
          index: c,
        });
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
      console.warn('[DX][GameBoard] BBOOOMM');

      allCellsData.forEach(aCellData => {
        aCellData.isCovered = false;
      });
    }

    this.setState({ allCellsData });
  };
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
