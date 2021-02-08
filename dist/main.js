/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/search.ts":
/*!**************************!*\
  !*** ./src/ts/search.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Problem\": () => (/* binding */ Problem)\n/* harmony export */ });\n// This is adapted from search.py available in CSCI3022 Intro to AI - HW2\r\n// Translated into TypeScript by Michal Bodzianowski\r\nclass Problem {\r\n    // The constructor specifies the initial state, and possibly a goal state, \r\n    //if there is a unique goal. \r\n    //Your subclass's constructor can add other arguments.\r\n    constructor(initial, goal) {\r\n        this.initial = initial;\r\n        this.goal = goal;\r\n    }\r\n    /*\r\n    Return the actions that can be executed in the given\r\n        state. The result would typically be a list, but if there are\r\n        many actions, consider yielding them one at a time in an\r\n        iterator, rather than building them all at once.\r\n    */\r\n    actions(state) {\r\n        throw new Error(\"actions not yet implemented\");\r\n    }\r\n    /*\r\n    \"\"\"Return the state that results from executing the given\r\n        action in the given state. The action must be one of\r\n        self.actions(state).\"\"\"\r\n    */\r\n    result(state, actions) {\r\n        throw new Error(\"result not yet implemented\");\r\n    }\r\n    /*\r\n    * Return True if the state is a goal. The default method compares the\r\n        state to self.goal or checks for state in self.goal if it is a\r\n        list, as specified in the constructor. Override this method if\r\n        checking against a single self.goal is not enough.\r\n    */\r\n    goal_test(state) {\r\n        if (Array.isArray(this.goal)) {\r\n            let goalArray = this.goal;\r\n            return goalArray.indexOf(state) !== -1;\r\n        }\r\n        else {\r\n            return state == this.goal;\r\n        }\r\n    }\r\n    /*\r\n    Return the cost of a solution path that arrives at state2 from\r\n        state1 via action, assuming cost c to get up to state1. If the problem\r\n        is such that the path doesn't matter, this function will only look at\r\n        state2. If the path does matter, it will consider c and maybe state1\r\n        and action. The default method costs 1 for every step in the path.\r\n    */\r\n    path_cost(c, state1, action, state2) {\r\n        return c + 1;\r\n    }\r\n    /*\r\n    For optimization problems, each state has a value. Hill Climbing\r\n        and related algorithms try to maximize this value.\r\n    */\r\n    value(state) {\r\n        throw new Error(\"value not implemented\");\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://sudokusolver/./src/ts/search.ts?");

/***/ }),

/***/ "./src/ts/sudoku.ts":
/*!**************************!*\
  !*** ./src/ts/sudoku.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sudokuboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sudokuboard */ \"./src/ts/sudokuboard.ts\");\n/* harmony import */ var _sudoku_problem_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sudoku_problem_class */ \"./src/ts/sudoku_problem_class.ts\");\n\r\n\r\nlet firstProb = [\r\n    \"9**613284\",\r\n    \"48325*196\",\r\n    \"61284****\",\r\n    \"178364***\",\r\n    \"5249**368\",\r\n    \"369528741\",\r\n    \"**57*2613\",\r\n    \"***43687*\",\r\n    \"73*185*29\"\r\n];\r\nlet b = new _sudokuboard__WEBPACK_IMPORTED_MODULE_0__.SudokuBoard((0,_sudoku_problem_class__WEBPACK_IMPORTED_MODULE_1__.read_sudoku_problem)(firstProb));\r\nconsole.log(\"Test #1 : Valid Board\");\r\nb.pretty_print();\r\nconsole.log(b.is_valid());\r\n\n\n//# sourceURL=webpack://sudokusolver/./src/ts/sudoku.ts?");

/***/ }),

/***/ "./src/ts/sudoku_problem_class.ts":
/*!****************************************!*\
  !*** ./src/ts/sudoku_problem_class.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SudokuProblemClass\": () => (/* binding */ SudokuProblemClass),\n/* harmony export */   \"read_sudoku_problem\": () => (/* binding */ read_sudoku_problem)\n/* harmony export */ });\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search */ \"./src/ts/search.ts\");\n/* harmony import */ var _sudokuboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sudokuboard */ \"./src/ts/sudokuboard.ts\");\n// Class SudokuProblemClass from HW2 translated to TypeScript\r\n// Translated by Michal Bodzianowski\r\n\r\n\r\nclass SudokuProblemClass extends _search__WEBPACK_IMPORTED_MODULE_0__.Problem {\r\n    constructor(filled_initial_cells) {\r\n        super(new _sudokuboard__WEBPACK_IMPORTED_MODULE_1__.SudokuBoard(filled_initial_cells));\r\n    }\r\n    actions(state) {\r\n        if (!state.is_valid()) {\r\n            return [];\r\n        }\r\n        else {\r\n            return state.get_possible_fills();\r\n        }\r\n    }\r\n    result(state, action) {\r\n        return state.fill_up(action[0], action[1], action[2]);\r\n    }\r\n    goal_test(state) {\r\n        return state.goal_test();\r\n    }\r\n    path_cost(c, state1, action, state2) {\r\n        return 1;\r\n    }\r\n}\r\nfunction read_sudoku_problem(init_arr) {\r\n    let state = {};\r\n    for (let i = 0; i < init_arr.length; i++) {\r\n        let sdku_string = init_arr[i];\r\n        for (let j = 0; j < sdku_string.length; j++) {\r\n            let sdku_char = sdku_string[j];\r\n            if (sdku_char >= '1' && sdku_char <= '9') {\r\n                let str_key = (i + 1) + ',' + (j + 1);\r\n                state[str_key] = parseInt(sdku_char + \"\");\r\n            }\r\n        }\r\n    }\r\n    return state;\r\n}\r\n\n\n//# sourceURL=webpack://sudokusolver/./src/ts/sudoku_problem_class.ts?");

/***/ }),

/***/ "./src/ts/sudokuboard.ts":
/*!*******************************!*\
  !*** ./src/ts/sudokuboard.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SudokuBoard\": () => (/* binding */ SudokuBoard)\n/* harmony export */ });\n// Class SudokuBoard from HW2 translated to TypeScript\r\n// Translated by Michal Bodzianowski\r\n/*\r\nThis is the main class we will implement for this problem.\r\n# In this class, we will define the basic functionality of\r\n# the sudoku board and functions for manipulating it.\r\n# Please complete the missing functions below.\r\n*/\r\nclass SudokuBoard {\r\n    constructor(filled_cells_dict) {\r\n        this.contents = filled_cells_dict;\r\n    }\r\n    //TS-ONLY\r\n    //Turns a tuple into a string\r\n    tpl_to_str(given_tuple) {\r\n        return given_tuple[0] + ',' + given_tuple[1];\r\n    }\r\n    //Turns a tpl string into a numbers\r\n    str_to_tpl(given_string) {\r\n        return [parseInt(given_string.split(',')[0]), parseInt(given_string.split(',')[1])];\r\n    }\r\n    //Gets contents of dictionary\r\n    getCell(given_tuple) {\r\n        return this.contents[this.tpl_to_str(given_tuple)];\r\n    }\r\n    //Sets the contents of dictionary\r\n    setCell(given_tuple, value) {\r\n        this.contents[this.tpl_to_str(given_tuple)] = value;\r\n    }\r\n    pretty_print() {\r\n        let state = this.contents;\r\n        //Iterate through each row\r\n        let blk_sep = '|----------+-----------+-----------|';\r\n        console.log(blk_sep);\r\n        for (let row_id = 1; row_id < 10; row_id++) {\r\n            //Iterate through each column\r\n            let row_str = '|';\r\n            for (let col_id = 1; col_id < 10; col_id++) {\r\n                //If row is not empty\r\n                let key = [row_id, col_id];\r\n                let str_key = this.tpl_to_str(key);\r\n                if (this.contents.hasOwnProperty(str_key)) {\r\n                    row_str = row_str + ' ' + this.getCell(key) + ' ';\r\n                }\r\n                else {\r\n                    row_str = row_str + '   ';\r\n                }\r\n                if (col_id % 3 == 0) {\r\n                    row_str = row_str + ' | ';\r\n                }\r\n            }\r\n            console.log(row_str);\r\n            if (row_id % 3 == 0) {\r\n                console.log(blk_sep);\r\n            }\r\n        }\r\n    }\r\n    /*\r\n    Function: get_numbers_for_row\r\n    # Return a list of all the numbers tha are currently\r\n    # in row number j. Where 1 <= j <= 9\r\n    # DO NOT MODIFY\r\n    */\r\n    get_numbers_for_row(j) {\r\n        if (j >= 1 && j <= 9) {\r\n            let row_nums = [];\r\n            let state = this.contents;\r\n            for (let k = 1; k < 10; k++) {\r\n                let str_key = this.tpl_to_str([j, k]);\r\n                if (this.contents.hasOwnProperty(str_key)) {\r\n                    row_nums.push(this.getCell([j, k]));\r\n                }\r\n            }\r\n            return row_nums;\r\n        }\r\n        else {\r\n            throw new Error(\"Out of Bounds Get Numbers For Row\");\r\n        }\r\n    }\r\n    get_numbers_for_col(j) {\r\n        if (j >= 1 && j <= 9) {\r\n            let col_nums = [];\r\n            let state = this.contents;\r\n            for (let k = 1; k < 10; k++) {\r\n                let str_key = this.tpl_to_str([k, j]);\r\n                if (this.contents.hasOwnProperty(str_key)) {\r\n                    col_nums.push(this.getCell([k, j]));\r\n                }\r\n            }\r\n            return col_nums;\r\n        }\r\n        else {\r\n            throw new Error(\"Out of Bounds Get Numbers For Row\");\r\n        }\r\n    }\r\n    get_numbers_for_block(blk_x, blk_y) {\r\n        if (!(1 <= blk_x && blk_x <= 3)) {\r\n            throw new Error(\"Out of range\");\r\n        }\r\n        if (!(1 <= blk_y && blk_y <= 3)) {\r\n            throw new Error(\"Out of range\");\r\n        }\r\n        let state = this.contents;\r\n        let blk_nums = [];\r\n        for (let j = (blk_x * 3) - 2; j < (blk_x * 3) + 1; j++) {\r\n            for (let k = (blk_y * 3) - 2; k < (blk_y * 3) + 1; k++) {\r\n                let str_key = this.tpl_to_str([j, k]);\r\n                if (this.contents.hasOwnProperty(str_key)) {\r\n                    blk_nums.push(this.getCell([j, k]));\r\n                }\r\n            }\r\n        }\r\n        return blk_nums;\r\n    }\r\n    has_repeated_entries(lst_of_numbers) {\r\n        if (lst_of_numbers.length == (new Set(lst_of_numbers)).size) {\r\n            return false;\r\n        }\r\n        else {\r\n            return true;\r\n        }\r\n    }\r\n    is_valid(verbose = false) {\r\n        for (let i = 1; i < 10; i++) {\r\n            if (this.has_repeated_entries(this.get_numbers_for_row(i))) {\r\n                return false;\r\n            }\r\n            if (this.has_repeated_entries(this.get_numbers_for_col(i))) {\r\n                return false;\r\n            }\r\n            if (i <= 3) {\r\n                for (let j = 1; j < 4; j++) {\r\n                    if (this.has_repeated_entries(this.get_numbers_for_block(i, j))) {\r\n                        return false;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n    get_block_numbers(i, j) {\r\n        return [Math.floor((i - 1) / 3) + 1, Math.floor((j - 1) / 3) + 1];\r\n    }\r\n    get_possible_fills() {\r\n        let state = this.contents;\r\n        //Get a list of cells that are unfilled\r\n        let lst_of_unfilled_cells = [];\r\n        for (let i = 1; i < 10; i++) {\r\n            for (let j = 1; j < 10; j++) {\r\n                let str_key = this.tpl_to_str([i, j]);\r\n                if (!state.hasOwnProperty(str_key)) {\r\n                    lst_of_unfilled_cells.push([i, j]);\r\n                }\r\n            }\r\n        }\r\n        let valid_actions = [];\r\n        for (const stringKey in state) {\r\n            let this_tuple = this.str_to_tpl(stringKey);\r\n            let blk = this.get_block_numbers(this_tuple[0], this_tuple[1]);\r\n            for (let k = 1; k < 10; k++) {\r\n                if (!(this.get_numbers_for_row(this_tuple[0]).indexOf(k) !== -1)) {\r\n                    if (!(this.get_numbers_for_col(this_tuple[1]).indexOf(k) !== -1)) {\r\n                        if (!this.get_numbers_for_block(blk[0], blk[1])) {\r\n                            valid_actions.push([this_tuple[0], this_tuple[1], k]);\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        return valid_actions;\r\n    }\r\n    fill_up(i, j, k) {\r\n        let str_key = this.tpl_to_str([i, j]);\r\n        if (this.contents.hasOwnProperty(str_key)) {\r\n            throw new Error(\"Cell alrady filled\");\r\n        }\r\n        else {\r\n            if (1 <= i && i <= 9 && 1 <= j && j <= 9) {\r\n                let new_state = {};\r\n                //Deep Copy\r\n                for (const stringKey in this.contents) {\r\n                    new_state[stringKey] = this.contents[stringKey];\r\n                }\r\n                new_state[str_key] = k;\r\n                return new SudokuBoard(new_state);\r\n            }\r\n            else {\r\n                throw new Error(\"Index out of range\");\r\n            }\r\n        }\r\n    }\r\n    goal_test() {\r\n        let state = this.contents;\r\n        if (!this.is_valid()) {\r\n            return false;\r\n        }\r\n        for (let i = 1; i < 10; i++) {\r\n            for (let j = 1; j < 10; j++) {\r\n                let str_key = this.tpl_to_str([i, j]);\r\n                if (!state.hasOwnProperty(str_key) || state[str_key] < 1 || state[str_key] > 9) {\r\n                    return false;\r\n                }\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://sudokusolver/./src/ts/sudokuboard.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/ts/sudoku.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;