
import * as React from "react";
import { CodeBlock } from "../classes/CodeBlock";
import { typeOfCodeLine, variableAssignmentTypes } from "../constants/variableAssignmentTypes";
import { Button } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../css/LineOfCode.css";
//displays a line of code
//only prop passed in is "codeString, and key"


export class LineOfCode extends React.Component<{newProps:any,codeBlock:CodeBlock, deleteLineOfCode: Function,refactorLineOfCode: Function},{}>{

    constructor(props:any){
        super(props);
        this.constructCodeRenderObject = this.constructCodeRenderObject.bind(this);
        this.deleteLineOfCode = this.deleteLineOfCode.bind(this);
        this.refactorLineOfCode = this.refactorLineOfCode.bind(this);
        
    }

    deleteLineOfCode(){
        this.props.deleteLineOfCode(
            this.props.codeBlock.variableName,
            this.props.codeBlock.type,
            this.props.codeBlock.variableAssignmentType,
            this.props.codeBlock.variableAssignment
        )
    }
    refactorLineOfCode(){
        this.props.refactorLineOfCode(this.props.codeBlock)
    }

    constructCodeRenderObject() {

        let codeParagraph:any;  //any because it becomes a big mess of html
    
        if (this.props.codeBlock.type === typeOfCodeLine.VARIABLE_ASSIGNMENT) { //if the line is a variable assignment line
            if (this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.LAMBDA_LENGTH_STRING) {
                codeParagraph = <p className="codeText">{this.props.codeBlock.variableName} :=  &#123;0,1&#125;
                    <sup>λ</sup></p>
            } else if (this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE) {
                codeParagraph = <p className="codeText">{this.props.codeBlock.variableName} := {this.props.codeBlock.variableAssignment}</p>
                   
            }else if(this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.VARIABLE){
                codeParagraph = <p className="codeText">{this.props.codeBlock.variableName} = {this.props.codeBlock.variableAssignment}</p>
            }
                //only 2 options for now.
        }else if(this.props.codeBlock.type=== typeOfCodeLine.RETURN_STATEMENT){
    
            if (this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.LAMBDA_LENGTH_STRING) {
                codeParagraph = <p className="codeText">return &#123;0,1&#125;
                    <sup>λ</sup></p>
            } else if (this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE) {
                codeParagraph = <p className="codeText">return {this.props.codeBlock.variableAssignment}</p>
                   
            }else if(this.props.codeBlock.variableAssignmentType === variableAssignmentTypes.VARIABLE){
               
                codeParagraph = <p className="codeText">return {`(${this.props.codeBlock.returnVariables?.join(',')})`}</p>
            }  
        }   //this is the only thing we know how to parse for now
        return (<Stack direction="horizontal" gap={3}>{codeParagraph} <Button type="button" variant="info" onClick = {()=>this.refactorLineOfCode()}><FontAwesomeIcon icon={faShuffle} /></Button>  <Button type="button" variant="danger" onClick = {()=>this.deleteLineOfCode()}><FontAwesomeIcon icon={faTrash} /></Button> </Stack>);
    }
    render() {
        return (<div key={this.props.codeBlock.key} className="bg-light border codeLineHolder" {...this.props.newProps } >{this.constructCodeRenderObject()}</div>);
    }
   
}


