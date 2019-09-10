/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';
import styles from './WinScenario.module.css';
// import cx from 'classnames';

class WinScenario extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div>SUCCESS</div>
        <img
          className={styles.partyParrot}
          src="https://railsgirlssummerofcode.org/img/blog/2016/l1ghtsab3r-partyparrot.gif"
          alt=""
        />
      </div>
    );
  }
}

export default WinScenario;
