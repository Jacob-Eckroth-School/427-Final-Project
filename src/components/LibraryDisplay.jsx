import React from "react";
import { Stack } from "react-bootstrap";
import { typeOfCodeLine, variableAssignmentTypes } from "../constants/variableAssignmentTypes";
import { List} from 'react-movable';
import { LineOfCode } from ".";

//displays a library?
class LibraryDisplay extends React.Component {
  
    constructor(props){
        super(props);
        this.constructCodeRenderObject = this.constructCodeRenderObject.bind(this);
        this.state = 
        {
            library:this.props.library
        }
        
    }

    constructCodeRenderObject(codeBlock,newProps){

        var codeParagraph;
       
        if(codeBlock.type === typeOfCodeLine.VARIABLE_ASSIGNMENT){ //if the line is a variable assignment line
            if(codeBlock.variableAssignmentType ===variableAssignmentTypes.LAMBDA_LENGTH_STRING){
                codeParagraph= <p className="codeText">{codeBlock.variableName} =  &#123;0,1&#125;
                <sup>λ</sup></p>
            }else if(codeBlock.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE){
                codeParagraph= <p className="codeText">{codeBlock.variableName} = {codeBlock.variableAssignment}</p>
            }   //only 2 options for now.
        }   //this is the only thing we know how to parse for now
      return <LineOfCode code={codeParagraph} key={codeBlock.key} newProps = {newProps}/>;
    }
  /*  {this.props.code.map((codeObject) => (
              
        <li key={codeObject.key}>{this.constructCodeRenderObject(codeObject)}</li>
  
  ))}*/

 
  render() {
    return (
      <Stack>
          <h1>{this.state.library.name}</h1>
       <List
           values={this.state.library.code}
           onChange={({ oldIndex, newIndex }) =>{
               this.state.library.updateItemOrder(oldIndex,newIndex)  
                this.setState({
                    library: this.state.library
                })
            }}
            renderList={({ children, props }) => <Stack {...props}>{children}</Stack>}
            renderItem={({ value, props }) => this.constructCodeRenderObject(value,props)}
        />
          
      
       
      </Stack>
    );
  }
}

export default LibraryDisplay;
