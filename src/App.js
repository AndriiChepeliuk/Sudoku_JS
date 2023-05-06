import logo from './logo.svg';
import { Input, Button } from 'antd';
import './App.css';
import { getValue } from '@testing-library/user-event/dist/utils';

const { TextArea } = Input;

// // Test value - Empty values
var textAreaDefaultValue =
  '[5, 3, 6, 4, 7, 8, 9, 1, 2],' +
  '[6, 7, 1, 2, 9, 0, 3, 4, 8],' +
  '[1, 0, 0, 8, 4, 2, 5, 6, 0],' +
  '[8, 5, 7, 9, 6, 1, 0, 2, 0],' +
  '[4, 2, 8, 6, 5, 3, 7, 9, 1],' +
  '[7, 1, 9, 3, 2, 4, 8, 5, 6],' +
  '[9, 0, 5, 1, 3, 7, 2, 8, 4],' +
  '[2, 8, 4, 7, 1, 9, 6, 3, 5],' +
  '[3, 0, 0, 5, 8, 6, 1, 7, 9]';

// // Test value - Error in block
// var textAreaDefaultValue =
//   '[5, 3, 6, 4, 7, 8, 9, 1, 2],' +
//   '[6, 7, 1, 2, 9, 5, 3, 4, 8],' +
//   '[1, 9, 3, 8, 4, 2, 5, 6, 7],' +
//   '[8, 5, 7, 9, 6, 1, 4, 2, 3],' +
//   '[4, 2, 8, 6, 5, 3, 7, 9, 1],' +
//   '[7, 1, 9, 3, 2, 4, 8, 5, 6],' +
//   '[9, 6, 5, 1, 3, 7, 2, 8, 4],' +
//   '[2, 8, 4, 7, 1, 9, 6, 3, 5],' +
//   '[3, 4, 2, 5, 8, 6, 1, 7, 9]';

// // Test value - Correct  
// var textAreaDefaultValue =
//   '[5, 3, 4, 6, 7, 8, 9, 1, 2],' +
//   '[6, 7, 2, 1, 9, 5, 3, 4, 8],' +
//   '[1, 9, 8, 3, 4, 2, 5, 6, 7],' +
//   '[8, 5, 9, 7, 6, 1, 4, 2, 3],' +
//   '[4, 2, 6, 8, 5, 3, 7, 9, 1],' +
//   '[7, 1, 3, 9, 2, 4, 8, 5, 6],' +
//   '[9, 6, 1, 5, 3, 7, 2, 8, 4],' +
//   '[2, 8, 7, 4, 1, 9, 6, 3, 5],' +
//   '[3, 4, 5, 2, 8, 6, 1, 7, 9]';

var sudoku;

function SetTextAreaColor() {
  sudoku = GetSudocuArray();

  if (IsAvailable()) {
    if (CheckSudoku()) {
      document.getElementById("sudoku_in").style.backgroundColor = '#56ad82';
    }
    else {
      document.getElementById("sudoku_in").style.backgroundColor = '#ca6767';
    }
  }
  else {
    document.getElementById("sudoku_in").style.backgroundColor = '#ca6767';
  }
}

function CheckSudoku() {
  var result = true;

  // Horizontal check
  for (let i = 0; i < 9; i++) {
    var sortedArray = sudoku[i].map((x) => x);
    sortedArray.sort();

    for (let j = 0; j < 9; j++) {
      if (sortedArray[j] != j + 1) {
        result = false;
      }
    }
  }

  //Vertical check
  for (let i = 0; i < 9; i++) {
    var sortedArray = [];

    for (let j = 0; j < 9; j++) {
      sortedArray.push(sudoku[j][i])
    }

    sortedArray.sort();

    for (let j = 0; j < 9; j++) {
      if (sortedArray[j] != j + 1) {
        result = false;
      }
    }
  }
  
  //Block check
  let tempI = 0;
  let tempJ = 0;

  for (let s = 0; s < 3; s++) {
    for (let k = 0; k < 3; k++) {
      var sortedArray = [];

      for (let i = tempI; i < tempI + 3; i++) {
        for (let j = tempJ; j < tempJ + 3; j++) {
          sortedArray.push(sudoku[i][j]);
        }
      }
      tempJ = tempJ + 3;

      sortedArray.sort();

      for (let a = 0; a < 9; a++) {
        if (sortedArray[a] != a + 1) {
          result = false;
        }
      }
    }

    if (tempJ >= 9) {
      tempJ = 0;
    }
    tempI = tempI + 3;
  }

  return result;
}

function GetSudocuArray() {
  var sudokuArray = [];

  var sudokuString = document.getElementById("sudoku_in").value;
  sudokuString = sudokuString.replaceAll('[', '');

  var sudokuStringArray = sudokuString.split("],");

  sudokuStringArray.forEach(function (item) {
    var sudokuArrayStringItem = item.split(",");
    var sudokuArrayIntItem = [];

    sudokuArrayStringItem.forEach(function (arrayItem) {
      sudokuArrayIntItem.push(parseInt(arrayItem));
    });

    sudokuArray.push(sudokuArrayIntItem);
  });

  return sudokuArray;
}

function IsAvailable() {
  var result = true;

  if (sudoku.length != 9) {
    return result = false;
  }

  for (let i = 0; i < sudoku.length; i++) {
    if (sudoku[i].length != 9) {
      return result = false;
    }

    sudoku[i].forEach(function (item) {
      if (item <= 0 || item > 9 || isNaN(item)) {
        return result = false;
      }
    });
  }

  return result;
}

function App() {
  return (
    <div className="App">
      <div className="title">
        Sudoku
      </div>
      <header className="App-header">
        <div>
          <TextArea className='Sudoku_Input' id='sudoku_in' defaultValue={textAreaDefaultValue}/>
        </div>
        <div>
          <Button type="primary" onClick={SetTextAreaColor}>Check sudoku</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
