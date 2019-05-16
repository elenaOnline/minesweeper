/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';
import styles from './Cell.module.css';
import cx from 'classnames';

class Cell extends Component {
  static defaultProps = {
    isBomb: false,
    isCovered: true,
    isFlagged: false,
    numberNear: undefined,
    index: undefined,
  };
  handleClick = ev => {
    const { index } = this.props;
    this.props.onClick && this.props.onClick({ index });
    ev.stopPropogation && ev.stopPropogation();
    console.log('[DX][Cell] awdawd');
  };
  render() {
    const { isCovered } = this.props;
    return (
      <div
        className={cx(styles.root, isCovered && styles.isCovered)}
        onClick={this.handleClick}
      >
        {this.renderInnards()}
      </div>
    );
  }
  renderInnards() {
    const { isCovered, isBomb } = this.props;

    // show cover
    if (isCovered) return null;

    // show 'b' for bomb
    if (isBomb) return this.renderBomb();

    return null;
  }
  renderBomb() {
    return <div>💣</div>;
  }
}

export default Cell;
