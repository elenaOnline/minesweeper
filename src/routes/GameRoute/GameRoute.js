import React, { Component } from 'react';
import styles from './GameRoute.module.css';
import GameBoard from '../../components/GameBoard/GameBoard';
import WinScenario from '../../components/WinScenario/WinScenario';
import LoseScenario from '../../components/LoseScenario/LoseScenario';
class GameRoute extends Component {
  state = {
    isGameOver: false,
    cellClickCounter: 0,
    isPaused: true,
    startAppTime: undefined,
    startBoardTime: undefined,
    gameBoardId: 1,
    didWin: false,
    didLose: false,
    shouldShowIntro: true,
    totalWins: 0,
    totalLosses: 0,
    boardSize: 10,
    numberOfFlagsThatAreNotBeingUsed: 10,
  };
  constructor() {
    super();
    this.scoreboardTimerId = undefined;
  }

  /** INTERNALS */
  startScoreboardUpdate() {
    this.scoreboardTimerId = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }
  stopScoreboardUpdate() {
    clearInterval(this.scoreboardTimerId);
  }
  startStopWatch = () => {
    // reverse
    let isPaused = !this.state.isPaused;

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

  removeIntroButton = () => {
    this.setState({ shouldShowIntro: false });
  };
  createNumberOfFlagsUnused = () => {
    this.setState({ numberOfFlagsThatAreNotBeingUsed: this.state.boardSize });
    this.findNumberOfFlagsUnused();
  };
  findNumberOfFlagsUnused = () => {
    console.log(
      '[DX][GameRoute] this.state.numberOfFlagsThatAreNotBeingUsed',
      this.state.numberOfFlagsThatAreNotBeingUsed
    );
    this.setState({
      numberOfFlagsThatAreNotBeingUsed:
        this.state.numberOfFlagsThatAreNotBeingUsed - 1,
    });
  };

  dontShowNansBoard = () => {
    if (this.state.startBoardTime === undefined) {
      console.log('[DX][GameRoute] yikes');
    } else {
      return;
    }
  };

  numberOfFalgsOnBoard = () => {};

  /** HANDLERS */
  handleFullRestart = () => {
    this.setState({
      startBoardTime: new Date(),
      gameBoardId: this.state.gameBoardId + 1,
      didWin: false,
      didLose: false,
    });
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
      this.startStopWatch();
    }

    this.removeIntroButton();
  };

  handleOnWin = () => {
    console.log('[DX][GameRoute] hello');
    this.setState({ didWin: true, totalWins: this.state.totalWins + 1 });
  };
  handleOnLose = () => {
    this.setState({ didLose: true, totalLosses: this.state.totalLosses + 1 });
  };

  /** RENDERERS */
  render() {
    const {
      handleOnCellClick,
      handleFullRestart,
      handleOnWin,
      handleOnLose,
      createNumberOfFlagsUnused,
    } = this;
    const {
      startAppTime,
      startBoardTime,
      gameBoardId,
      totalWins,
      totalLosses,
      boardSize,
      numberOfFlagsThatAreNotBeingUsed,
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

        <div className={styles.hud}>
          <div className={styles.winCount}> Total Wins: {totalWins} </div>
          <div className={styles.lossCount}> Total Losses: {totalLosses} </div>
          <div className={styles.appTimer}> App Timer: {secondsInApp} </div>
          <div className={styles.boardTimer}>
            {' '}
            Board Timer: {secondsInBoard}{' '}
          </div>
          <div className={styles.numberOfFlags}>
            {' '}
            Number Of Flags Left: {numberOfFlagsThatAreNotBeingUsed}{' '}
          </div>
        </div>
        {this.renderGameIntro()}

        <GameBoard
          key={gameBoardId}
          onCellClick={handleOnCellClick}
          onFullRestart={handleFullRestart}
          boardSize={boardSize}
          timerstartAppTime={startAppTime}
          timerStartBoardTime={startBoardTime}
          onWin={handleOnWin}
          onLose={handleOnLose}
          howManyFlagsLeft={createNumberOfFlagsUnused}
        />
        {this.renderWin()}
        {this.renderLose()}
      </div>
    );
  }
  renderGameIntro() {
    if (this.state.shouldShowIntro === false) {
      return;
    }
    return (
      <div className={styles.gameIntro}>
        Shift Click Squares You Want To Flag!
        <button
          className={styles.introButton}
          type="button"
          onClick={this.removeIntroButton}
        >
          Got It!
        </button>
      </div>
    );
  }
  renderRestartButton() {
    return (
      <div>
        <button
          className={styles.restartButton}
          type="button"
          onClick={this.handleFullRestart}
        >
          Restart
        </button>
      </div>
    );
  }
  renderWin() {
    const { didWin } = this.state;
    if (!didWin) return null;
    return (
      <div>
        <WinScenario />
        {this.renderRestartButton()}
      </div>
    );
  }
  renderLose() {
    const { didLose } = this.state;
    if (!didLose) return null;
    return (
      <div>
        <LoseScenario />
        {this.renderRestartButton()}
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
