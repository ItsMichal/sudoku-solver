// Followed this guide https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2

import  { SudokuBoard } from '../src/ts/sudokuboard';
import { read_sudoku_problem } from '../src/ts/sudoku_problem_class'
import { expect } from 'chai';
import 'mocha';

describe('read_sudoku_problem Function', function(){
    it('should parse a valid string array correctly', () => {
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

        let testRecord : Record<string, number> = read_sudoku_problem(testProb);

        // This is too tedious to write out...
        // let expectedRecord : Record<string, number> = {
        //     "1,1":9,
        //     "1,4":6,
        //     "1,5":1,
        //     "1,6":3,
        //     "1,7":2,
        //     "1,8":8,
        //     "2,1":4,
        //     "2,2":8,
        //     "2,3":3,
        //     "2,4":2,
        //     "2,5":5,
        //     "2,7":1,
        //     "2,8":9,
        //     "2,9":6,
        //     "3,1":6,
        //     "3,2"
        // }

        expect(testRecord.hasOwnProperty("1,1")).to.equal(true);
        expect(testRecord.hasOwnProperty("1,2")).to.equal(false);
        expect(testRecord.hasOwnProperty("9,9")).to.equal(true);
        expect(testRecord["1,1"]).to.equal(9);
        expect(testRecord["9,9"]).to.equal(9);

    });

    it("should thow an error on an array of invalid length", () => {
        let testArr : Array<string> = ["019324956"];

        expect(()=>{read_sudoku_problem(testArr)}).to.throw(Error);
    });

    it("should throw an error on a string of invalid length", ()=>{
        let testArr : Array<string> = [
            "9**613284",
            "48325*196",
            "61284****",
            "178364***",
            "5249**368",
            "3695287412",
            "**57*2613",
            "***43687*",
            "73*185*29"
        ];

        expect(()=>{read_sudoku_problem(testArr)}).to.throw(Error);
    })
})

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

    it('calling is_valid() with repeated entry in row 8 should return false', () => {
        let testProb : Array<string> = [
            "9**613284",
            "48325*196",
            "61284****",
            "178364***",
            "5249**368",
            "369528741",
            "**57*2613",
            "8**43687*",
            "73*185*29"
        ];

        let testBoard : SudokuBoard = new SudokuBoard(read_sudoku_problem(testProb));

        const result : boolean = testBoard.is_valid();

        expect(result).to.equal(false);
    });


});