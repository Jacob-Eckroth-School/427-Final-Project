
import * as React from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { CodeBlock } from "../classes/CodeBlock";
import { typeOfCodeLine, variableAssignmentTypes } from "../constants/variableAssignmentTypes";
import "../css/LineOfCode.css"
//displays a line of code
//only prop passed in is "codeString, and key"


export class LineOfCode extends React.Component<{newProps:any,codeBlock:CodeBlock},{}>{
    constructor(props:any){
        super(props);
        this.constructCodeRenderObject = this.constructCodeRenderObject.bind(this);
        
    }
    constructCodeRenderObject() {

        let codeParagraph:any;  //any because it becomes a big mess of html
    
        if (this.props.codeBlock.type === typeOfCodeLine.VARIABLE_ASSIGNMENT) { //if the line is a variable assignment line
            if (this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.LAMBDA_LENGTH_STRING) {
                codeParagraph = <p className="codeText">{this.props.codeBlock.variableName} :=  &#123;0,1&#125;
                    <sup>λ</sup></p>
            } else if (this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE) {
                codeParagraph = <Stack direction="horizontal">
                    <p className="codeText">{this.props.codeBlock.variableName} := {this.props.codeBlock.variableAssignment}</p>
                    <Button id="fabButton" type="button">
                            SSSSSSSSSS
                    </Button>
                </Stack>
                
            }   //only 2 options for now.
        }   //this is the only thing we know how to parse for now
        return codeParagraph;
    }
    render() {
        return (
                <div className="savedCodeLineHolder" key={this.props.codeBlock.key} {...this.props.newProps } >{this.constructCodeRenderObject()}</div>      
        );
    }
   
}


