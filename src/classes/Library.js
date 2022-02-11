import { arrayMove } from "react-movable";

class Library{
    constructor(libraryName,libraryCodeBlocks){
        this.name = libraryName;
        this.codeBlocks = libraryCodeBlocks;
    }
    updateItemOrder(oldIndex,newIndex){
        this.codeBlocks = arrayMove(this.codeBlocks,oldIndex,newIndex);
    }
    get code(){
        return this.codeBlocks;
    }
  
   
    addNewCodeBlock(newCodeBlock){
      
        this.codeBlocks.push(newCodeBlock)
    }
}

export default Library