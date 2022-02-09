import React from "react";

import CodeDisplay from "./CodeDisplay";
import AddVariable from "./AddVariable";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
class CodeHolder extends React.Component{

    

    constructor(props){
        super(props);
        this.handleNewVariableSubmitted = this.handleNewVariableSubmitted.bind(this);
        this.state={
            codeBlocks:[]  //empty list to start with
        }
    }

    handleNewVariableSubmitted(newVariableName,newVariableAssignment){

        this.setState({
            codeBlocks: [...this.state.codeBlocks,`${newVariableName} = ${newVariableAssignment}`]//...turns it into a list of items
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