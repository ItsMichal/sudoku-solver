// Followed this guide https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2

import  { SudokuBoard } from '../src/ts/sudokuboard';
import { read_sudoku_problem } from '../src/ts/sudoku_problem_class'
import { expect } from 'chai';
import 'mocha';

describe('SudokuBoard Class', function(){
    it('calling is_valid() should return true with valid Sudoku Puzzle', () => {
        let testProb : Array<string> = [
            "9**613284",
            "48325*196",
            "61284****",
            "178364***",
            "5249**368",
            "369528741",
            "**57*2613",
            "***43687*",
            "73*185*29"
        ];

        let testBoard : SudokuBoard = new SudokuBoard(read_sudoku_problem(testProb))

        const result : boolean = testBoard.is_valid();

        expect(result).to.equal(true);

    });
});