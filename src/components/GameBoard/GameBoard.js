import React, { Component } from 'react';
import styles from './GameBoard.module.css';
import Cell from '../Cell/Cell';
class GameBoard extends Component {
  render() {
    return <div className={styles.root}>{this.renderCells()}</div>;
  }
  renderCells() {
    const { numberOfCells } = this.props;
    let cells = [];
    for (let c = 0; c < numberOfCells; c++) {
      cells.push(this.renderCell(c));
    }
    return cells;
  }
  renderCell(idx) {
    return <Cell key={idx} />;
  }
}

export default GameBoard;
