import React from "react";

import CodeDisplay from "./CodeDisplay";
import AddCode from "./AddCode";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
class CodeHolder extends React.Component{

    

    constructor(props){
        super(props);
        this.handleNewCodeSubmitted = this.handleNewCodeSubmitted.bind(this);
        this.state={
            codeBlocks:[]  //empty list to start with
        }
    }

    handleNewCodeSubmitted(newCode){

        this.setState({
            codeBlocks: [...this.state.codeBlocks,newCode]//...turns it into a list of items
        })
      
    }


    render(){
        return(
            <Container type="sm">
                <Stack>
                <CodeDisplay code={this.state.codeBlocks}/>
                <AddCode  submitCode={this.handleNewCodeSubmitted}/>
            </Stack>
            </Container>
        );
    }
}


export default CodeHolder