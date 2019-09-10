/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';
import styles from './LoseScenario.module.css';
// import cx from 'classnames';

class LoseScenario extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div>FAILURE</div>
        <img
          className={styles.sadPartyParrot}
          src="https://i.kym-cdn.com/photos/images/original/001/240/445/552.gif"
          alt="sadPartyParrot"
        />
      </div>
    );
  }
}

export default LoseScenario;
