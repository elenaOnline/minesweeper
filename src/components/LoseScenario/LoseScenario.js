/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';
import styles from './LoseScenario.module.css';
// import cx from 'classnames';

class LoseScenario extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div>FAILURE</div>
      </div>
    );
  }
}

export default LoseScenario;
