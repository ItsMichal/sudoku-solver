// Class SudokuBoard from HW2 translated to TypeScript
// Translated by Michal Bodzianowski


/*
This is the main class we will implement for this problem.
# In this class, we will define the basic functionality of 
# the sudoku board and functions for manipulating it.
# Please complete the missing functions below.
*/


export class SudokuBoard{
    /*# The class SudokuBoard has a single field 
    #  self.contents : A dictionary from (i,j) -> k
    #     the dictionary indicates that cell (i,j) has number k
    #     Empty cells are not present in the self.contents field.
    */
    
    //Due to ts limitations tuple (i,j) is stored as string i,j
    contents: Record<string, number>

    constructor(filled_cells_dict: Record<string, number>){
        this.contents = filled_cells_dict
    }

    //TS-ONLY

    //Turns a tuple into a string
    tpl_to_str(given_tuple: [number, number]) : string{
        return given_tuple[0]+','+given_tuple[1] 
    }

    //Turns a tpl string into a numbers
    str_to_tpl(given_string : string) : [number, number] {
        return [parseInt(given_string.split(',')[0]), parseInt(given_string.split(',')[1])]
    }

    //Gets contents of dictionary
    getCell(given_tuple: [number, number]) : number{
        return this.contents[this.tpl_to_str(given_tuple)]
    }

    //Sets the contents of dictionary
    setCell(given_tuple: [number,number], value: number){
        this.contents[this.tpl_to_str(given_tuple)] = value
    }

    pretty_print(){
        let state: Record<string, number> = this.contents
        //Iterate through each row
        let blk_sep: string = '|----------+-----------+-----------|';
        console.log(blk_sep);
        for(let row_id:number = 1; row_id < 10; row_id++){
            //Iterate through each column
            let row_str:string = '|';
            for(let col_id:number = 1; col_id < 10; col_id++){
                //If row is not empty

                let key : [number, number] = [row_id, col_id];
                let str_key : string = this.tpl_to_str(key);

                if(this.contents.hasOwnProperty(str_key)){
                    row_str = row_str + ' ' + this.getCell(key) + ' ';
                }else{
                    row_str = row_str + '   '
                }
                if(col_id % 3 == 0){
                    row_str = row_str + ' | '
                }
            }
            console.log(row_str);
            if(row_id % 3==0){
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
    get_numbers_for_row(j:number) : Array<number>{
        if(j >= 1 && j<=9){
            let row_nums : Array<number> = [];
            let state : Record<string,number> = this.contents;
            for(let k : number = 1; k < 10; k++){
                let str_key : string = this.tpl_to_str([j,k]);
                if(this.contents.hasOwnProperty(str_key)){
                    row_nums.push(this.getCell([j,k]));
                }
            }
            return row_nums;

        }else{
            throw new Error("Out of Bounds Get Numbers For Row");
        }
    }

    
    get_numbers_for_col(j:number) : Array<number> {
        if(j >= 1 && j<=9){
            let col_nums : Array<number> = [];
            let state : Record<string,number> = this.contents;
            for(let k : number = 1; k < 10; k++){
                let str_key : string = this.tpl_to_str([k,j]);
                if(this.contents.hasOwnProperty(str_key)){
                    col_nums.push(this.getCell([k,j]));
                }
            }
            return col_nums;

        }else{
            throw new Error("Out of Bounds Get Numbers For Row");
        }
    }

    get_numbers_for_block(blk_x : number, blk_y : number) : Array<number> {
        if(!(1<= blk_x && blk_x <= 3)){
            throw new Error("Out of range")
        }
        if(!(1<= blk_y && blk_y <= 3)){
            throw new Error("Out of range")
        }

        let state : Record<string,number> = this.contents;
        let blk_nums : Array<number> = []

        for(let j : number = (blk_x*3)-2; j < (blk_x*3)+1; j++){
            for(let k : number = (blk_y*3)-2; k < (blk_y*3)+1; k++){
                let str_key : string = this.tpl_to_str([j,k]);

                if(this.contents.hasOwnProperty(str_key)){
                    blk_nums.push(this.getCell([j,k]));
                }
            }
        }

        return blk_nums;
    }

    has_repeated_entries(lst_of_numbers: Array<number>) : boolean{
        if(lst_of_numbers.length == (new Set(lst_of_numbers)).size){
            return false;
        }else{
            return true;
        }
    }

    is_valid(verbose : boolean = false) : boolean{
        for(let i : number = 1; i < 10; i++){
            if(this.has_repeated_entries(this.get_numbers_for_row(i))){
                return false;
            }
            if(this.has_repeated_entries(this.get_numbers_for_col(i))){
                return false;
            }
            if(i <= 3){
                for(let j : number = 1; j < 4; j++){
                    if(this.has_repeated_entries(this.get_numbers_for_block(i,j))){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    get_block_numbers(i : number, j : number) : [number, number] {
        return [Math.floor((i-1)/3) + 1, Math.floor((j-1)/3) + 1]
    }

    get_possible_fills() : Array<[number,number,number]> {
        let state : Record<string,number> = this.contents;

        //Get a list of cells that are unfilled
        let lst_of_unfilled_cells : Array<[number, number]> = [];

        for(let i = 1; i < 10; i++){
            for(let j = 1; j < 10; j++){
                let str_key : string = this.tpl_to_str([i,j]);
                if(!state.hasOwnProperty(str_key)){
                    lst_of_unfilled_cells.push([i,j])
                }
            }
        }

        let valid_actions : Array<[number, number, number]> = [];

        for (const stringKey in state){
            let this_tuple : [number, number] = this.str_to_tpl(stringKey);

            let blk : [number, number] = this.get_block_numbers(this_tuple[0], this_tuple[1]);

            for(let k = 1; k <10; k++){
                if(!(this.get_numbers_for_row(this_tuple[0]).indexOf(k) !== -1)){
                    if(!(this.get_numbers_for_col(this_tuple[1]).indexOf(k) !== -1)){
                        if(!this.get_numbers_for_block(blk[0], blk[1])){
                            valid_actions.push([this_tuple[0],this_tuple[1],k]);
                        }
                    }
                }
            }
        }

        return valid_actions;
    }

    fill_up(i : number, j : number, k : number) : SudokuBoard {
        let str_key : string = this.tpl_to_str([i,j]);

        if(this.contents.hasOwnProperty(str_key)){
            throw new Error("Cell alrady filled");
        }else{
            if(1 <= i && i <= 9 && 1<=j && j<=9){
                let new_state : Record<string, number> = {}

                //Deep Copy
                for (const stringKey in this.contents){
                    new_state[stringKey] = this.contents[stringKey]
                }

                new_state[str_key] = k;

                return new SudokuBoard(new_state);
            }else{
                throw new Error("Index out of range")
            }
        }
    }


    goal_test() : boolean {
        let state : Record<string,number> = this.contents;
        
        if(!this.is_valid()){
            return false;
        }

        for(let i = 1; i < 10; i++){
            for(let j = 1; j < 10; j++){
                let str_key : string = this.tpl_to_str([i,j]);

                if(!state.hasOwnProperty(str_key) || state[str_key] < 1 || state[str_key] > 9){
                    return false;
                }
            }
        }

        return true;
    }
}