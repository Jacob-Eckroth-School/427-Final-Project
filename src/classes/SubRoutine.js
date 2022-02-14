import { arrayMove } from "react-movable";
import { typeOfCodeLine} from "../constants/variableAssignmentTypes";

//Class that contains a single function.
class SubRoutine{

    /*
    @param libraryName lists what library the subroutine is in
    @param subRoutineName is the name of this library.
    @param subRoutineCodeBlocks is a list of type CodeBlock
    */
    constructor(libraryName,subRoutineName,subRoutineCodeBlocks){
        this.libraryName = libraryName;
        this.name=subRoutineName;
        this.codeBlocks = subRoutineCodeBlocks;
        this.variables = {}
    }


    get code(){
        return this.codeBlocks;
    }

    //updates the item order
    updateItemOrder(oldIndex,newIndex){
        this.codeBlocks = arrayMove(this.codeBlocks,oldIndex,newIndex);
    }

    //adds a new block of code to the subroutine.
    addNewCodeBlock(newCodeBlock){
        //if the line of code is a variable assignment, we want to add it to our list of variables
        if(newCodeBlock.type === typeOfCodeLine.VARIABLE_ASSIGNMENT){
            this.variables[newCodeBlock.variableName] = 1//TODO: make it so you can't overwrite an existing variable
        }
        this.codeBlocks.push(newCodeBlock);
        
    }
}


export default SubRoutine