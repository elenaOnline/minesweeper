import React, { Component } from 'react';
import styles from './GameRoute.module.css';
import GameBoard from '../../components/GameBoard/GameBoard';
class GameRoute extends Component {
  state = {
    isGameOver: false,
    cellClickCounter: 0,
  };
  handleOnClick = () => {
    console.log('[DX][GameRoute] ouch');
  };
  handleOnCellClick = () => {
    this.setState({ cellClickCounter: this.state.cellClickCounter + 1 });
  };
  render() {
    const { handleOnClick, handleOnCellClick } = this;
    const { cellClickCounter } = this.state;
    return (
      <div className={styles.root}>
        {this.renderGameOver()}
        <button>Restart Game</button>
        <div onClick={handleOnClick}>{cellClickCounter}</div>
        <GameBoard onCellClick={handleOnCellClick} boardSize={10} />
      </div>
    );
  }
  renderGameOver() {
    const { isGameOver } = this.state;
    if (!isGameOver) return null;
    return <div className={styles.gameOverArea}>over</div>;
  }
}

export default GameRoute;
