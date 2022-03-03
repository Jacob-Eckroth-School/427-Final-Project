import { arrayMove } from "react-movable";
import { typeOfCodeLine} from "../constants/variableAssignmentTypes";
import {CodeBlock} from "./CodeBlock";
//Class that contains a single function.
export class SubRoutine{
    libraryName: string;
    name: string;
    codeBlocks: CodeBlock[];
    variables: Map<string,number>;

    /*
    @param libraryName lists what library the subroutine is in
    @param subRoutineName is the name of this library.
    @param subRoutineCodeBlocks is a list of type CodeBlock
    */
    constructor(libraryName:string,subRoutineName:string,subRoutineCodeBlocks:CodeBlock[]){
        this.libraryName = libraryName;
        this.name=subRoutineName;
        this.codeBlocks = subRoutineCodeBlocks;
        this.variables = new Map<string,number>()
    }


    get code(){
        return this.codeBlocks;
    }

    //updates the item order
    updateItemOrder(oldIndex:number,newIndex:number){
        this.codeBlocks = arrayMove(this.codeBlocks,oldIndex,newIndex);
    }

    //adds a new block of code to the subroutine.
    addNewCodeBlock(newCodeBlock:CodeBlock){
        //if the line of code is a variable assignment, we want to add it to our list of variables
        if(newCodeBlock.type === typeOfCodeLine.VARIABLE_ASSIGNMENT && !this.variables.has(newCodeBlock.variableName)){
            this.variables.set(newCodeBlock.variableName,1);
            this.codeBlocks.push(newCodeBlock);
        }
        else if (this.variables.has(newCodeBlock.variableName))
            alert("This variable has already been used. Please pick another name")
       
        
    }
}

