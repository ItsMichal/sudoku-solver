//Translated by Michal Bodzianowski
import { Problem } from './search'

export class Node{
    state: any;
    parent: any;
    action: any;
    path_cost: number = 0;
    depth : number = 0;

    constructor(state: any, parent: Node | undefined = undefined, action: any = undefined, path_cost: number = 0){
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.path_cost = path_cost

        if (parent === undefined){
            this.depth = 0
        }else{
            this.depth = parent.depth
        }
    }

    lessThan(otherNode: Node) : boolean{
        return this.state < otherNode.state;
    }

    child_node(problem: Problem, action: any) : Node{
        let next_state = problem.result(this.state, action);
        let next_node = new Node(next_state, this, action, problem.path_cost(this.path_cost, this.state, action, next_state))

        return next_node
    }

    expand(problem: Problem) : Array<Node> {
        let expList : Array<any> = []
        for(let action in problem.actions(this.state)){
            expList.push(this.child_node(problem, action));
        }
        return expList 
    }

    path() : Array<Node>{
        //Return a list of nodes forming the path from the root to this node
        let node : Node = this;
        let path_back : Array<Node> = []

        while(node !== undefined){
            path_back.push(node)
            node = node.parent;
        }

        let reverse_array: Array<Node> = path_back.reverse();
        return reverse_array;
    }

    solution() : Array<any> {
        let eqList : Array<any> = [];
        let firstElementSkipped : boolean = false;
        let path_list : Array<Node> = this.path()


        for(let i = 0; i < path_list.length; i++){
            if(!firstElementSkipped){
                eqList.push(path_list[i].action);
            }
        }

        return eqList;

    }

    equals(otherNode : Node) : boolean{
        return(this.state == otherNode.state)
    }

}