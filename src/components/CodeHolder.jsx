import React from "react";

import CodeDisplay from "./CodeDisplay";
import AddVariable from "./AddVariable";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import { typeOfCodeLine, variableAssignmentTypes } from "../constants/variableAssignmentTypes";
class CodeHolder extends React.Component{

    

    constructor(props){
        super(props);
        this.handleNewVariableSubmitted = this.handleNewVariableSubmitted.bind(this);
        this.state={
            codeBlocks:[],  //empty list to start with
            totalLines:0
        }
        
    }

    handleNewVariableSubmitted(newVariableName,newVariableAssignmentType,newVariableAssignment){
        

        this.setState({
            codeBlocks: [...this.state.codeBlocks,{ //creating a new type of object
                type: typeOfCodeLine.VARIABLE_ASSIGNMENT,
                variableName: newVariableName,
                variableAssignmentType: newVariableAssignmentType,
                variableAssignment: newVariableAssignment,
                key: this.state.totalLines
            }],                 //...turns it into a list of items
            totalLines: this.state.totalLines + 1
        })
      
    }


    render(){
        return(
            <Container type="sm">
                <Stack>
                <CodeDisplay code={this.state.codeBlocks}/>
                <AddVariable  submitVariable={this.handleNewVariableSubmitted}/>
            </Stack>
            </Container>
        );
    }
}


export default CodeHolder