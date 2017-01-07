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

  render() {
    return (
    <div>
    <Board cols={9} rows={9} squares={this.state.squares} onClick={(i) => this.handleClick(i)} />
    <p></p>
    <NumberSelection onClick={(i) => this.handleNumberSelectionClick(i)}/>
    </div>
  );
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
