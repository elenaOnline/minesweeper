import React, { Component } from 'react';
import styles from './Cell.module.css';
import cx from 'classnames';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUncovered: false,
      color: 0,
    };
  }
  handleClick = () => {
    this.setState({
      isUncovered: true,
      color: this.state.color + 1,
    });
  };
  render() {
    const { color } = this.state;
    let colorStyle;

    switch (color) {
      case 1:
        colorStyle = styles.color1;
        break;
      case 2:
        colorStyle = styles.color2;
        break;
      case 3:
        colorStyle = styles.color3;
        break;

      default:
        break;
    }
    return (
      <div className={cx(styles.root, colorStyle)} onClick={this.handleClick} />
    );
  }
}

export default Cell;
//TODO: covered or uncovered when clicked
