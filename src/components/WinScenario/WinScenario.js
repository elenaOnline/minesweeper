/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';
import styles from './WinScenario.module.css';
// import cx from 'classnames';

class WinScenario extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div>SUCCESS</div>
      </div>
    );
  }
}

export default WinScenario;
