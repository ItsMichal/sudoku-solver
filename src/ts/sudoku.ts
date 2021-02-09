import { SudokuBoard } from "./sudokuboard";
import { read_sudoku_problem } from "./sudoku_problem_class";

let firstProb : Array<string> = [
    "9**613284",
    "48325*196",
    "61284****",
    "178364***",
    "5249**368",
    "369528741",
    "**57*2613",
    "***43687*",
    "73*185*29"
]

let b : SudokuBoard = new SudokuBoard(read_sudoku_problem(firstProb))
console.log("Test #1 : Valid Board");
b.pretty_print();
console.log(b.is_valid());