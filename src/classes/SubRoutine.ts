import { arrayMove } from "react-movable";
import { typeOfCodeLine } from "../constants/variableAssignmentTypes";
import { CodeBlock } from "./CodeBlock";
//Class that contains a single function.
export class SubRoutine {
    libraryName: string;
    name: string;
    codeBlocks: CodeBlock[];
    variables: Map<string, number>;
    parameters: string[];
    hasReturnStatement:boolean = false;

    /*
    @param libraryName lists what library the subroutine is in
    @param subRoutineName is the name of this library.
    @param subRoutineCodeBlocks is a list of type CodeBlock
    */
    constructor(libraryName: string, subRoutineName: string, subRoutineCodeBlocks: CodeBlock[], parameters: string[]) {
        this.libraryName = libraryName;
        this.name = subRoutineName;
        this.codeBlocks = subRoutineCodeBlocks;
        this.variables = new Map<string, number>()
        this.parameters = parameters;
  
    }


    get code() {
        return this.codeBlocks;
    }

    //updates the item order
    updateItemOrder(oldIndex: number, newIndex: number) {
        this.codeBlocks = arrayMove(this.codeBlocks, oldIndex, newIndex);
    }

    public static generateParametersString(parameters: string[]) {
        let i: number = 0;
        var parametersString: string = "";

        for (i; i < parameters.length - 1; i++) {
            parametersString += parameters[i] + ", ";
        }
        if (parameters.length != 0) {

            parametersString += parameters[i];
        }
        return parametersString
    }

    //adds a new block of code to the subroutine.
    addNewCodeBlock(newCodeBlock: CodeBlock) {
        //if the line of code is a variable assignment, we want to add it to our list of variables
        if (newCodeBlock.type === typeOfCodeLine.VARIABLE_ASSIGNMENT && !this.variables.has(newCodeBlock.variableName)) {
            this.variables.set(newCodeBlock.variableName, 1);
            this.codeBlocks.push(newCodeBlock);
        }else if(newCodeBlock.type === typeOfCodeLine.RETURN_STATEMENT){
           
                this.hasReturnStatement = true;
        
            this.codeBlocks.push(newCodeBlock);
      
        }
        else if (this.variables.has(newCodeBlock.variableName))
            alert("This variable has already been used. Please pick another name")


    }
    
    deleteCodeBlock(blockToDelete: CodeBlock){
        //Add check for referenced in other variables
        if (blockToDelete.type === typeOfCodeLine.VARIABLE_ASSIGNMENT) {
            let i = 0
            let index = -2
            while(i < this.codeBlocks.length){
                if(blockToDelete.variableName === this.codeBlocks[i].variableName){
                    index = i
                }
                i++
            }
            if (index > -1) {
                this.variables.delete(this.codeBlocks[index].variableName)
                this.codeBlocks.splice(index, 1); // 2nd parameter means remove one item only
            }   
        }
    }
}

