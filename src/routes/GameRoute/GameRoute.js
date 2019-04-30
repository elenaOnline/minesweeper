import React, { Component } from 'react';
import styles from './GameRoute.module.css';
import GameBoard from '../../components/GameBoard/GameBoard';
class GameRoute extends Component {
  render() {
    return (
      <div className={styles.root}>
        <GameBoard numberOfCells={100} />
      </div>
    );
  }
}

export default GameRoute;