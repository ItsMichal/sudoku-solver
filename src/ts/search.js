// This is adapted from search.py available in CSCI3022 Intro to AI - HW2
// Translated into TypeScript by Michal Bodzianowski
export class Problem {
    // The constructor specifies the initial state, and possibly a goal state, 
    //if there is a unique goal. 
    //Your subclass's constructor can add other arguments.
    constructor(initial, goal) {
        this.initial = initial;
        this.goal = goal;
    }
    /*
    Return the actions that can be executed in the given
        state. The result would typically be a list, but if there are
        many actions, consider yielding them one at a time in an
        iterator, rather than building them all at once.
    */
    actions(state) {
        throw new Error("actions not yet implemented");
    }
    /*
    """Return the state that results from executing the given
        action in the given state. The action must be one of
        self.actions(state)."""
    */
    result(state, actions) {
        throw new Error("result not yet implemented");
    }
    /*
    * Return True if the state is a goal. The default method compares the
        state to self.goal or checks for state in self.goal if it is a
        list, as specified in the constructor. Override this method if
        checking against a single self.goal is not enough.
    */
    goal_test(state) {
        if (Array.isArray(this.goal)) {
            let goalArray = this.goal;
            return goalArray.indexOf(state) !== -1;
        }
        else {
            return state == this.goal;
        }
    }
    /*
    Return the cost of a solution path that arrives at state2 from
        state1 via action, assuming cost c to get up to state1. If the problem
        is such that the path doesn't matter, this function will only look at
        state2. If the path does matter, it will consider c and maybe state1
        and action. The default method costs 1 for every step in the path.
    */
    path_cost(c, state1, action, state2) {
        return c + 1;
    }
    /*
    For optimization problems, each state has a value. Hill Climbing
        and related algorithms try to maximize this value.
    */
    value(state) {
        throw new Error("value not implemented");
    }
}
