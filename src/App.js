import React, { Component } from 'react';
import './App.css';

function Square(props) {
  return (
    <button className='square'>
    </button>
  );
}

class Board extends Component {
  renderSquare(i, col) {
    return <Square key={i} test={i} value={this.props.squares[i]} onClick={() => this.props.onClick(col)} />;
  }

  renderRow(cols, startIndex) {
    let name = 'board-row';
    let squares = [];
    for(let i = 0; i < cols; i++) {
      squares.push(this.renderSquare(startIndex + i, i));
    }
    return (
      <div key={startIndex + 100} className={name}>
      {squares}
      </div>
    );
  }

  render() {
    let squares = [];
    const rows = this.props.rows;
    const cols = this.props.cols;
    for(let i = 0; i < rows; i++) {
      squares.push(this.renderRow(cols, i * cols));
    }
    return (
      <div>{squares}</div>
    )
  }
}

class Game extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(42).fill(null)
    }
  }
  handleClick(i) {

  }

  render() {
    return <Board cols={9} rows={9} squares={this.state.squares} onClick={(i) => this.handleClick(i)} />
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>SUDOKU</h1>
      <Game />
      </div>
    );
  }
}

export default App;
