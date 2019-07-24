import React, { Component } from 'react';
import styles from './GameRoute.module.css';
import GameBoard from '../../components/GameBoard/GameBoard';
class GameRoute extends Component {
  state = {
    isGameOver: false,
    cellClickCounter: 0,
    isPaused: true,
    startAppTime: undefined,
    startBoardTime: undefined,
    gameBoardId: 1,
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

  handleFullRestart = () => {
    this.setState({
      // allCellsData: this.getAllCellData(this.props.boardSize),
      // totalNumberOfFlags: 0,
      // gameIsVictory: false,
      startBoardTime: new Date(),
      gameBoardId: this.state.gameBoardId + 1,
    });
    // this.getAllCellData(this.props.boardSize);
  };

  handleOnClick = () => {};
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
      startAppTime: new Date(),
      startBoardTime: new Date(),
      isPaused,
    });
  };

  render() {
    const {
      handleOnClick,
      handleOnCellClick,
      handlePauseButtonPress,
      handleFullRestart,
    } = this;
    const {
      cellClickCounter,
      startAppTime,
      startBoardTime,
      gameBoardId,
    } = this.state;
    // display current elapsed time + previous elapsed time
    const secondsInApp = parseInt(
      (new Date() - this.state.startAppTime) / 1000
    );
    const secondsInBoard = parseInt(
      (new Date() - this.state.startBoardTime) / 1000
    );
    return (
      <div className={styles.root}>
        {this.renderGameOver()}
        <button onClick={handlePauseButtonPress}> PAUSE / PLAY </button>
        <div onClick={handleOnClick}> {cellClickCounter} </div>
        <div> {secondsInApp} </div>
        <div> {secondsInBoard} </div>

        <GameBoard
          key={gameBoardId}
          onCellClick={handleOnCellClick}
          onFullRestart={handleFullRestart}
          boardSize={10}
          timerstartAppTime={startAppTime}
          timerStartBoardTime={startBoardTime}
        />
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
