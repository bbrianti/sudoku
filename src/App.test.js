import React from 'react';
import ReactDOM from 'react-dom';
import App, { gameEnded } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('game correctly ended: empty array', () => {
  let squares = Array(81).fill(null);
  let done = gameEnded(squares);
  expect(done).toEqual(false);
});

it('game correctly ended: full invalid array lines', () => {
  let squares = [
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7, 7, 7,
    8, 8, 8, 8, 8, 8, 8, 8, 8,
    9, 9, 9, 9, 9, 9, 9, 9, 9
  ];

  let done = gameEnded(squares);
  expect(done).toEqual(false);
});

it('game correctly ended: full invalid array columns', () => {
  let squares = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9
  ];

  let done = gameEnded(squares);
  expect(done).toEqual(false);
});

it('game correctly ended: full invalid array squares', () => {
  let squares = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    2, 3, 4, 5, 6, 7, 8, 9, 1,
    3, 4, 5, 6, 7, 8, 9, 1, 2,
    4, 5, 6, 7, 8, 9, 1, 2, 3,
    5, 6, 7, 8, 9, 1, 2, 3, 4,
    6, 7, 8, 9, 1, 2, 3, 4, 5,
    7, 8, 9, 1, 2, 3, 4, 5, 6,
    8, 9, 1, 2, 3, 4, 5, 6, 7,
    9, 1, 2, 3, 4, 5, 6, 7, 8
  ];

  let done = gameEnded(squares);
  expect(done).toEqual(false);
});

it('game correctly ended: full valid array', () => {
  let squares = [
    1, 4, 6, 2, 3, 8, 5, 9, 7,
    3, 5, 2, 1, 7, 9, 4, 6, 8,
    7, 8, 9, 6, 5, 4, 1, 3, 2,
    2, 6, 1, 4, 9, 5, 8, 7, 3,
    4, 7, 3, 8, 1, 2, 6, 5, 9,
    5, 9, 8, 3, 6, 7, 2, 1, 4,
    6, 1, 4, 7, 2, 3, 9, 8, 5,
    9, 2, 7, 5, 8, 1, 3, 4, 6,
    8, 3 ,5, 9, 4, 6, 7, 2, 1
  ];

  let done = gameEnded(squares);
  expect(done).toEqual(true);
});
