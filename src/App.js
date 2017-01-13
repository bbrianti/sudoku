import React, { Component } from 'react';

import './App.css';

function Square(props) {
  return (
    <button className='square' onClick={() => props.onClick()}>
    {props.value}
    </button>
  );
}

class NumberSelection extends Component {
  renderSquare(i) {
    return <Square key={i} value={i} onClick={() => this.props.onClick(i)} />;
  }

  renderSquares() {
    let squares = [];

    for(let i = 1; i <= 9; i++) {
      squares.push(this.renderSquare(i));
    }

    squares.push(<Square key={10} value={'C'} onClick={() => this.props.onClick('C')} />);

    return <div>{squares}</div>;
  }

  render() {
    return (
      <div>
      {this.renderSquares()}
      </div>
    );
  }
}

class Board extends Component {
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  renderRow(cols, startIndex) {
    let name = 'board-row';
    let squares = [];
    for(let i = 0; i < cols; i++) {
      squares.push(this.renderSquare(startIndex + i));
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
      squaresStart: Array(81).fill(null),
      squares: Array(81).fill(null),
      currentSelection: -1
    }
  }

  handleClick(i) {
    console.log('handleClick:' + i);
    this.setState( {currentSelection: i});
  }

  handleNumberSelectionClick(i) {
    console.log('handleNumberSelectionClick:' + i + ' currentSelection' + this.state.currentSelection);

    let squares = this.state.squares.slice();
    if(i !== 'C') {
      squares[this.state.currentSelection] = i;
    } else {
      squares[this.state.currentSelection] = null;
    }


    this.setState({squares: squares});
  }

  handleStartGameClick() {
    this.setState({squaresStart: this.state.squares});
  }

  handleRestartGameClick() {
    this.setState({squares: this.state.squaresStart});
  }

  handleClearGameClick() {
    this.setState({
      squaresStart: Array(81).fill(null),
      squares: Array(81).fill(null),
      currentSelection: -1
    });
  }

  render() {
    gameEnded(this.state.squares);
    return (
    <div>
    <Board cols={9} rows={9} squares={this.state.squares} onClick={(i) => this.handleClick(i)} />
    <p></p>
    <NumberSelection onClick={(i) => this.handleNumberSelectionClick(i)}/>
    <p></p>
    <button onClick={() => this.handleStartGameClick()}>
    Start
    </button>
    <button onClick={() => this.handleRestartGameClick()}>
    Restart
    </button>
    <button onClick={() => this.handleClearGameClick()}>
    Clear board
    </button>
    </div>
  );
  }
}

function isLineDone(line) {
  //console.log(line);
  const total = line.reduce((a, b) => a + b, 0);
  const unique = [...new Set(line)];
  /*console.log(total);
  console.log(unique);*/
  return total === 45 && unique.length === 9;
}

function getSquareArray(squareIndex, squares) {
  let startIndex = 0;
  switch(squareIndex) {
      case 0:
      case 1:
      case 2:
        startIndex = squareIndex * 3;
      break;
      case 3:
      case 4:
      case 5:
        startIndex = squareIndex * 3 + 18;
      break;
      case 6:
      case 7:
      case 8:
        startIndex = squareIndex * 3 + 36;
      break;
  }

  let square = [];
  square = square.concat(squares.slice(startIndex, startIndex + 3), squares.slice(startIndex + 9, startIndex + 12), squares.slice(startIndex + 18, startIndex + 21));

  return square;
}

export function gameEnded(squares) {
  let done = true;

  for(let i = 0; i < 9; i++) {
    if(isLineDone(squares.slice(i * 9, i * 9 + 9)) === false) {
      done = false;
    }

    let column = [squares[i], squares[i + 9], squares[i + 18], squares[i + 27], squares[i + 36], squares[i + 45], squares[i + 54], squares[i + 63], squares[i + 72]];
    if(isLineDone(column) === false) {
      done = false;
    }

    let square = getSquareArray(0, squares);
    if(isLineDone(square) === false) {
      done = false;
    }
  }

  return done;
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
