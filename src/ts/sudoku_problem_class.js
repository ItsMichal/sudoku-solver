// Class SudokuProblemClass from HW2 translated to TypeScript
// Translated by Michal Bodzianowski
import { Problem } from "./search";
import { SudokuBoard } from "./sudokuboard";
export class SudokuProblemClass extends Problem {
    constructor(filled_initial_cells) {
        super(new SudokuBoard(filled_initial_cells));
    }
    actions(state) {
        if (!state.is_valid()) {
            return [];
        }
        else {
            return state.get_possible_fills();
        }
    }
    result(state, action) {
        return state.fill_up(action[0], action[1], action[2]);
    }
    goal_test(state) {
        return state.goal_test();
    }
    path_cost(c, state1, action, state2) {
        return 1;
    }
}
export function read_sudoku_problem(init_arr) {
    let state = {};
    for (let i = 1; i <= init_arr.length; i++) {
        let sdku_string = init_arr[i];
        for (let j = 1; j <= sdku_string.length; j++) {
            let sdku_char = sdku_string[j];
            if (sdku_char >= '1' && sdku_char <= '9') {
                let str_key = i + ',' + j;
                state[str_key] = parseInt(sdku_char + "");
            }
        }
    }
    return state;
}
