import { arrayMove } from "react-movable";
import {typeOfCodeLine} from "../constants/variableAssignmentTypes"
class Library{

    /*
    @param libraryName lists the library name
    @param codeBlocks contains the codeblocks not included in any subroutines, i.e. at the top of the library.
    @param subRoutines is a list of subroutines in the library, initialized to be empty
    @param subRoutineNames is a dictionary of all the current subroutine names in the library
    @param variables is a dictionary of all the variables within the library.

    */
    constructor(libraryName,libraryCodeBlocks){
        this.name = libraryName;
        this.codeBlocks = libraryCodeBlocks;
        this.subRoutines = [];
        this.subRoutineNames = {};  
        this.variables = {};
    }
    updateItemOrder(oldIndex,newIndex){
        this.codeBlocks = arrayMove(this.codeBlocks,oldIndex,newIndex);
    }
    get code(){
        return this.codeBlocks;
    }

    //add a code block to a subroutine in the library
    addCodeBlockToSubRoutine(codeBlock,subRoutineName){
        let subRoutineFound = false;
        for(var i = 0; i < this.subRoutines.length; i++){
            if(this.subRoutines[i].name === subRoutineName){
                subRoutineFound = true;
                this.subRoutines[i].addNewCodeBlock(codeBlock);
                break;
            }
        }
        if(!subRoutineFound){
            alert(`Sub Routine in library: ${this.name} with name ${subRoutineName}, not found! Code block not added.`);
        }
    }

    addSubRoutine(newSubRoutine){
        this.subRoutineNames[newSubRoutine.subRoutineName] = 1;//set it to 1 if it exists
        this.subRoutines.push(newSubRoutine);
    }
   
    addNewCodeBlock(newCodeBlock){
        if(newCodeBlock.type === typeOfCodeLine.VARIABLE_ASSIGNMENT){
            this.variables[newCodeBlock.variableName] = 1//TODO: make it so you can't overwrite an existing variable
        }
        this.codeBlocks.push(newCodeBlock)
    }
}

export default Library