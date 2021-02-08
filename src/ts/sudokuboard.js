// Class SudokuBoard from HW2 translated to TypeScript
// Translated by Michal Bodzianowski
/*
This is the main class we will implement for this problem.
# In this class, we will define the basic functionality of
# the sudoku board and functions for manipulating it.
# Please complete the missing functions below.
*/
export class SudokuBoard {
    constructor(filled_cells_dict) {
        this.contents = filled_cells_dict;
    }
    //TS-ONLY
    //Turns a tuple into a string
    tpl_to_str(given_tuple) {
        return given_tuple[0] + ',' + given_tuple[1];
    }
    //Turns a tpl string into a numbers
    str_to_tpl(given_string) {
        return [parseInt(given_string.split(',')[0]), parseInt(given_string.split(',')[1])];
    }
    //Gets contents of dictionary
    getCell(given_tuple) {
        return this.contents[this.tpl_to_str(given_tuple)];
    }
    //Sets the contents of dictionary
    setCell(given_tuple, value) {
        this.contents[this.tpl_to_str(given_tuple)] = value;
    }
    pretty_print() {
        let state = this.contents;
        //Iterate through each row
        let blk_sep = '|---------+---------+---------|';
        console.log(blk_sep);
        for (let row_id = 1; row_id < 10; row_id++) {
            //Iterate through each column
            let row_str = '|';
            for (let col_id = 1; col_id < 10; col_id++) {
                //If row is not empty
                let key = [row_id, col_id];
                let str_key = this.tpl_to_str(key);
                if (this.contents.hasOwnProperty(str_key)) {
                    row_str = row_str + ' ' + this.getCell(key) + ' ';
                }
                else {
                    row_str = row_str + '   ';
                }
                if (col_id % 3 == 0) {
                    row_str = row_str + ' | ';
                }
            }
            console.log(row_str);
            if (row_id % 3 == 0) {
                console.log(blk_sep);
            }
        }
    }
    /*
    Function: get_numbers_for_row
    # Return a list of all the numbers tha are currently
    # in row number j. Where 1 <= j <= 9
    # DO NOT MODIFY
    */
    get_numbers_for_row(j) {
        if (!(j >= 1 && j <= 9)) {
            let row_nums = [];
            let state = this.contents;
            for (let k = 1; k < 10; k++) {
                let str_key = this.tpl_to_str([j, k]);
                if (this.contents.hasOwnProperty(str_key)) {
                    row_nums.push(this.getCell([j, k]));
                }
            }
            return row_nums;
        }
        else {
            throw new Error("Out of Bounds Get Numbers For Row");
        }
    }
    get_numbers_for_col(j) {
        if (!(j >= 1 && j <= 9)) {
            let col_nums = [];
            let state = this.contents;
            for (let k = 1; k < 10; k++) {
                let str_key = this.tpl_to_str([k, j]);
                if (this.contents.hasOwnProperty(str_key)) {
                    col_nums.push(this.getCell([k, j]));
                }
            }
            return col_nums;
        }
        else {
            throw new Error("Out of Bounds Get Numbers For Row");
        }
    }
    get_numbers_for_block(blk_x, blk_y) {
        if (!(1 <= blk_x && blk_x <= 3)) {
            throw new Error("Out of range");
        }
        if (!(1 <= blk_y && blk_y <= 3)) {
            throw new Error("Out of range");
        }
        let state = this.contents;
        let blk_nums = [];
        for (let j = (blk_x * 3) - 2; j < (blk_x * 3) + 1; j++) {
            for (let k = (blk_y * 3) - 2; k < (blk_y * 3) + 1; k++) {
                let str_key = this.tpl_to_str([j, k]);
                if (this.contents.hasOwnProperty(str_key)) {
                    blk_nums.push(this.getCell([k, j]));
                }
            }
        }
        return blk_nums;
    }
    has_repeated_entries(lst_of_numbers) {
        if (lst_of_numbers.length == (new Set(lst_of_numbers)).size) {
            return true;
        }
        else {
            return false;
        }
    }
    is_valid(verbose = false) {
        for (let i = 1; i < 10; i++) {
            if (this.has_repeated_entries(this.get_numbers_for_row(i))) {
                return false;
            }
            if (this.has_repeated_entries(this.get_numbers_for_col(i))) {
                return false;
            }
            if (i <= 3) {
                for (let j = 1; j < 4; j++) {
                    if (this.has_repeated_entries(this.get_numbers_for_block(i, j))) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    get_block_numbers(i, j) {
        return [Math.floor((i - 1) / 3) + 1, Math.floor((j - 1) / 3) + 1];
    }
    get_possible_fills() {
        let state = this.contents;
        //Get a list of cells that are unfilled
        let lst_of_unfilled_cells = [];
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 10; j++) {
                let str_key = this.tpl_to_str([i, j]);
                if (!state.hasOwnProperty(str_key)) {
                    lst_of_unfilled_cells.push([i, j]);
                }
            }
        }
        let valid_actions = [];
        for (const stringKey in state) {
            let this_tuple = this.str_to_tpl(stringKey);
            let blk = this.get_block_numbers(this_tuple[0], this_tuple[1]);
            for (let k = 1; k < 10; k++) {
                if (!(this.get_numbers_for_row(this_tuple[0]).indexOf(k) !== -1)) {
                    if (!(this.get_numbers_for_col(this_tuple[1]).indexOf(k) !== -1)) {
                        if (!this.get_numbers_for_block(blk[0], blk[1])) {
                            valid_actions.push([this_tuple[0], this_tuple[1], k]);
                        }
                    }
                }
            }
        }
        return valid_actions;
    }
    fill_up(i, j, k) {
        let str_key = this.tpl_to_str([i, j]);
        if (this.contents.hasOwnProperty(str_key)) {
            throw new Error("Cell alrady filled");
        }
        else {
            if (1 <= i && i <= 9 && 1 <= j && j <= 9) {
                let new_state = {};
                //Deep Copy
                for (const stringKey in this.contents) {
                    new_state[stringKey] = this.contents[stringKey];
                }
                new_state[str_key] = k;
                return new SudokuBoard(new_state);
            }
            else {
                throw new Error("Index out of range");
            }
        }
    }
    goal_test() {
        let state = this.contents;
        if (!this.is_valid()) {
            return false;
        }
        for (let i = 1; i < 10; i++) {
            for (let j = 1; j < 10; j++) {
                let str_key = this.tpl_to_str([i, j]);
                if (!state.hasOwnProperty(str_key) || state[str_key] < 1 || state[str_key] > 9) {
                    return false;
                }
            }
        }
        return true;
    }
}
