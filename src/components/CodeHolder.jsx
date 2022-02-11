import React from "react";

import LibraryDisplay from "./LibraryDisplay";
import AddVariable from "./AddVariable";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import { typeOfCodeLine} from "../constants/variableAssignmentTypes";
import { CodeBlock } from ".";
import {Library} from ".";

class CodeHolder extends React.Component{


    
    

    constructor(props){
        super(props);
        this.handleNewVariableSubmitted = this.handleNewVariableSubmitted.bind(this);
        this.state={
            totalLines:0,
            libraries:[]
        }
        let l1 = new Library("LibA",[]);
        
        this.setState({
            libraries: this.state.libraries.push(l1)
        });
      
    }

    handleNewVariableSubmitted(libraryName,newVariableName,newVariableAssignmentType,newVariableAssignment){
    
        let c = new CodeBlock(
            typeOfCodeLine.VARIABLE_ASSIGNMENT,newVariableName,newVariableAssignmentType,newVariableAssignment,this.state.totalLines
            
        )
        var libraryFound = false;
        for(const lib of this.state.libraries){
            if(lib.name === libraryName){
                libraryFound = true;
                lib.addNewCodeBlock(c)
                this.setState({
                    
                    totalLines: this.state.totalLines + 1
                })
                break;
            }
        }
        if(libraryFound === false){
            alert(`Did not find a library with name ${libraryName}`)
        }
       

      
    }


    render(){
        return(
            <Container type="sm">
                <Stack>
                <LibraryDisplay library={this.state.libraries[0]}/>
                <AddVariable  submitVariable={this.handleNewVariableSubmitted}/>
            </Stack>
            </Container>
        );
    }
}


export default CodeHolder