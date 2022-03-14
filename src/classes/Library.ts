import { arrayMove } from "react-movable";
import { CodeBlock } from "./CodeBlock";
import { typeOfCodeLine } from "../constants/variableAssignmentTypes"
import { SubRoutine } from "./SubRoutine";
export class Library {
    name: string;
    codeBlocks: CodeBlock[];
    subRoutines: SubRoutine[];
    subRoutineNames: Map<string, number>;
    variables: Map<string, number>;
    versionNumber:number;
    /*
    @param libraryName lists the library name
    @param codeBlocks contains the codeblocks not included in any subroutines, i.e. at the top of the library.
    @param subRoutines is a list of subroutines in the library, initialized to be empty
    @param subRoutineNames is a dictionary of all the current subroutine names in the library
    @param variables is a dictionary of all the variables within the library.

    */
    constructor(libraryName: string, versionNumber:number,libraryCodeBlocks: CodeBlock[]) {
        this.name = libraryName;
        this.codeBlocks = libraryCodeBlocks;
        this.versionNumber=versionNumber;
        this.subRoutines = [];
        this.subRoutineNames = new Map<string, number>();
        this.variables = new Map<string, number>();
    }
    updateItemOrder(oldIndex: number, newIndex: number) {
        this.codeBlocks = arrayMove(this.codeBlocks, oldIndex, newIndex);
    }
    get code() {
        return this.codeBlocks;
    }

    //add a code block to a subroutine in the library
    addCodeBlockToSubRoutine(codeBlock: CodeBlock, subRoutineName: string) {
        let subRoutineFound = false;
        for (var i = 0; i < this.subRoutines.length; i++) {
            if (this.subRoutines[i].name === subRoutineName) {
                subRoutineFound = true;
                this.subRoutines[i].addNewCodeBlock(codeBlock);
                break;
            }
        }
        if (!subRoutineFound) {
            alert(`Sub Routine in library: ${this.name} with name ${subRoutineName}, not found! Code block not added.`);
        }
    }

    addSubRoutine(newSubRoutine: SubRoutine) {
      
        if(!this.subRoutineNames.has(newSubRoutine.name)){
            this.subRoutineNames.set(newSubRoutine.name,1);//set it to 1 if it exists
            this.subRoutines.push(newSubRoutine);
            
        }else{
            alert("This subroutine name has already been used. Please pick another name.")
        }
    }

    addNewCodeBlock(newCodeBlock: CodeBlock) {
        if (newCodeBlock.type === typeOfCodeLine.VARIABLE_ASSIGNMENT && !this.variables.has(newCodeBlock.variableName)) {
            this.variables.set(newCodeBlock.variableName,1);
           
          
            this.codeBlocks.push(newCodeBlock)
           
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

