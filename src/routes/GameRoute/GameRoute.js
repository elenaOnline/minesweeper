import React, { Component } from 'react';
import styles from './GameRoute.module.css';
import GameBoard from '../../components/GameBoard/GameBoard';
class GameRoute extends Component {
  state = {
    isGameOver: false,
    cellClickCounter: 0,
    isPaused: true,
  };
  constructor() {
    super();
    this.scoreboardTimerId = undefined;
  }
  startScoreboardUpdate() {
    this.scoreboardTimerId = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  stopScoreboardUpdate() {
    clearInterval(this.scoreboardTimerId);
  }

  handleOnClick = () => {
    console.log('[DX][GameRoute] ouch');
  };
  handleOnCellClick = () => {
    const origCellClickCount = this.state.cellClickCounter;
    const cellClickCount = origCellClickCount + 1;

    // SAVE NEW COUNT TO STATE
    this.setState({
      cellClickCounter: cellClickCount,
    });

    // ONLY start stopwatch on first click
    if (cellClickCount === 1) {
      this.stopWatch();
    }
  };
  handlePauseButtonPress = () => {
    this.stopWatch();
  };
  stopWatch = () => {
    // reverse
    const isPaused = !this.state.isPaused;

    console.log('[DX][GameRoute] isPaused', isPaused);

    // do we start a stopwatch
    if (!isPaused) {
      this.startScoreboardUpdate();
    }

    // paused
    else {
      this.stopScoreboardUpdate();
    }

    // save to state and re-render
    this.setState({
      startTime: new Date(),
      isPaused,
    });
  };

  startCount = () => {
    setTimeout(() => {
      console.log(
        '[DX][GameRoute] Date.now() - startTime',
        Date.now() - this.state.startTime
      );
    }, 3000);
  };

  render() {
    const { handleOnClick, handleOnCellClick, handlePauseButtonPress } = this;
    const { cellClickCounter } = this.state;
    // display current elapsed time + previous elapsed time
    const secondsPlayed = parseInt((new Date() - this.state.startTime) / 1000);
    return (
      <div className={styles.root}>
        {this.renderGameOver()}
        <button onClick={handlePauseButtonPress}> PAUSE / PLAY </button>
        <div onClick={handleOnClick}> {cellClickCounter} </div>
        <div> {secondsPlayed} </div>
        <GameBoard onCellClick={handleOnCellClick} boardSize={10} />
      </div>
    );
  }
  renderGameOver() {
    const { isGameOver } = this.state;
    if (!isGameOver) return null;
    return <div className={styles.gameOverArea}> over </div>;
  }
}

export default GameRoute;
