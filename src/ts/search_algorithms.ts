import { Node } from './node';
import { Problem } from './search';

export function depth_limited_search(problem : Problem, limit : number = 50) : undefined | string | Node{
    function recursive_dls(node : Node, problem : Problem, limit : number) : undefined | string | Node{
        if(problem.goal_test(node.state)){
            return node;
        }else if(limit == 0){
            return 'cutoff'
        }else{
            let cutoff_occured : boolean = false;
            let node_expand : Array<Node> = node.expand(problem);

            for(let i = 0; i < node_expand.length; i++){
                let child : Node = node_expand[i];

                let result : undefined | string | Node = recursive_dls(child, problem, limit - 1);
                if(result == 'cutoff'){
                    cutoff_occured = true;
                }else if(result != undefined){
                    return result;
                }
            }
            if(cutoff_occured){
                return 'cutoff';
            }else{
                return undefined;
            }
        }
    }

    return recursive_dls(problem.initial, problem, limit);
}

export function iterative_deepening_search(problem : Problem) : Node | undefined{
    for(let depth = 0; depth < Number.MAX_SAFE_INTEGER; depth++){
        let result : undefined | string | Node = depth_limited_search(problem, depth);
        if (typeof(result) != 'string'){
            return result;
        }
    }
    return undefined
}