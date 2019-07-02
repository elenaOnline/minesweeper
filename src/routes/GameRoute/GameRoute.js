import React, { Component } from 'react';
import styles from './GameRoute.module.css';
import GameBoard from '../../components/GameBoard/GameBoard';
class GameRoute extends Component {
  state = {
    isGameOver: false,
    cellClickCounter: 0,
    shouldCount : false,
  };
  handleOnClick = () => {
    console.log('[DX][GameRoute] ouch');
  };
  handleOnCellClick = () => {
    this.setState({ cellClickCounter: this.state.cellClickCounter + 1 });
    if (this.state.cellClickCounter > 0) {
      return
    }else{
      this.stopWatch();
    }
  };

  stopWatch=()=>{
    const {shouldCount} = this.state;
    // let shouldCount = false;
    this.setState({shouldCount: !shouldCount})
    console.log('[DX][GameRoute] shouldCount', shouldCount);
    if (shouldCount) {
      this.startCount();  
    }else{
      return;
    }
    
  }
  
  startCount=()=>{
    const startTime = Date.now();
    setTimeout(() => {console.log('[DX][GameRoute] Date.now() - startTime', Date.now() - startTime)}, 3000)

  }


  render() {
    const { handleOnClick, handleOnCellClick } = this;
    const { cellClickCounter } = this.state;
    return (
      <div className={styles.root}>
        {this.renderGameOver()}
        <button onClick={this.stopWatch}>PAUSE / PLAY</button>
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
