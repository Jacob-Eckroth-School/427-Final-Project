import React from "react";
import { Stack } from "react-bootstrap";
import { typeOfCodeLine, variableAssignmentTypes } from "../constants/variableAssignmentTypes";

class CodeDisplay extends React.Component {
 
    constructor(props){
        super(props);
        this.constructCodeRenderObject = this.constructCodeRenderObject.bind(this);
    }

    constructCodeRenderObject(codeObject){
        if(codeObject.type === typeOfCodeLine.VARIABLE_ASSIGNMENT){ //if the line is a variable assignment line
            if(codeObject.variableAssignmentType ===variableAssignmentTypes.LAMBDA_LENGTH_STRING){
                return <p className="codeText">{codeObject.variableName} =  &#123;0,1&#125;
                <sup>λ</sup></p>
            }else if(codeObject.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE){
                return <p className="codeText">{codeObject.variableName} = {codeObject.variableAssignment}</p>
            }   //only 2 options for now.
        }   //this is the only thing we know how to parse for now
      
    }



  render() {
    return (
      <Stack>
          <h1>Code Display</h1>
       <ul>
          {this.props.code.map((codeObject) => (
              
              <li key={codeObject.key}>{this.constructCodeRenderObject(codeObject)}</li>
        
        ))}
        </ul>

       
      </Stack>
    );
  }
}

export default CodeDisplay;
