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
    onPress: undefined,
  };
  handleClick = ev => {
    const { index } = this.props;
    this.props.onPress &&
      this.props.onPress({
        index,
        isAlt: ev.altKey,
        isControl: ev.ctrlKey,
        isShift: ev.shiftKey,
      });
    ev.stopPropogation && ev.stopPropogation();
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
    const { isCovered, isBomb, numberNear, isFlagged } = this.props;

    // COVER ITEMS
    if (isCovered && isFlagged) return this.renderFlag();
    if (isCovered) return null;

    // INSIDE ITEMS
    if (isBomb) return this.renderBomb();
    if (numberNear) return this.renderNumber();

    return null;
  }
  renderBomb() {
    return <div>💣</div>;
  }
  renderFlag() {
    return <div>🏁</div>;
    // return <div>🚩</div>;
  }
  renderNumber() {
    const { numberNear } = this.props;
    return <div>{numberNear}</div>;
  }
}

export default Cell;
