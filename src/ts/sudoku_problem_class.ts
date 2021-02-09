// Class SudokuProblemClass from HW2 translated to TypeScript
// Translated by Michal Bodzianowski

import { Problem } from "./search";
import { SudokuBoard } from "./sudokuboard";

export class SudokuProblemClass extends Problem{
    constructor(filled_initial_cells : Record<string, number>){
        super(new SudokuBoard(filled_initial_cells))
    }

    actions(state : SudokuBoard) : Array<[number, number, number]> {
        if (!state.is_valid()){
            return []
        }else{
            return state.get_possible_fills()
        }
    }

    result(state : SudokuBoard, action : [number, number, number]){
        return state.fill_up(action[0], action[1], action[2]);
    }

    goal_test(state : SudokuBoard){
        return state.goal_test();
    }

    path_cost(c : number, state1 : SudokuBoard, action: [number, number, number], state2: SudokuBoard){
        return 1
    }
}

export function read_sudoku_problem(init_arr : Array<string>) : Record<string, number>{
    let state : Record<string, number> = {}

    if(init_arr.length != 9){
        throw new Error("String array not of length 9.");
    }

    for(let i = 0; i < init_arr.length; i++){
        let sdku_string : string = init_arr[i];
        if(sdku_string.length != 9){
            throw new Error("String at index " + i + " not of length 9.");
        }

        for(let j = 0; j < sdku_string.length; j++){
            

            let sdku_char = sdku_string[j];

            if(sdku_char >= '1' && sdku_char <= '9'){
                let str_key : string = (i+1) + ',' + (j+1);

                state[str_key] = parseInt(sdku_char+"");
            }
        }
    }

    return state;
}