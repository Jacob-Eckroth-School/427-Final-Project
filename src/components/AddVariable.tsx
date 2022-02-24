import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { variableAssignmentTypes } from "../constants/variableAssignmentTypes";

export class AddVariable extends React.Component<{submitVariable:Function},{variableName:string,variableAssignment:string,variableAssignmentType:number}> {

  constructor(props:any) {
    super(props);
    this.state = {
      variableName: "",
      variableAssignment: "",
      variableAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING,
    };
    this.handleVariableNameChange = this.handleVariableNameChange.bind(this);
    this.submitVariable = this.submitVariable.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.lambdaStringChosen = this.lambdaStringChosen.bind(this);
    this.userEnteredVariableChosen = this.userEnteredVariableChosen.bind(this);
    this.handleVariableValueChange = this.handleVariableValueChange.bind(this);
  }

  handleKeyDown(e:any, callback:Function) {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      callback();
    }
  }

  handleVariableNameChange(event:any) {
   
    this.setState({ variableName: event.target.value });
  }
  handleVariableValueChange(event:any){
      this.setState({variableAssignment:event.target.value})
  }
 

  submitVariable() {
    this.props.submitVariable(
        "LibA",
        this.state.variableName,
        this.state.variableAssignmentType,
        this.state.variableAssignment
    );
    (document.getElementById("variableForm") as HTMLFormElement).reset();
  }

  lambdaStringChosen() {
   
      this.setState({
          variableAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING
      });
      
  }
  userEnteredVariableChosen() {
   
    this.setState({
        variableAssignmentType: variableAssignmentTypes.USER_INPUTED_VALUE
    })
  }

  render() {
    return (
      <Form
        id="variableForm"
        onKeyDown={(e) => {
          this.handleKeyDown(e, this.submitVariable);
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Add a variable</Form.Label>
          <Form.Control
            type="text"
            placeholder="Variable Name"
            onChange={this.handleVariableNameChange}
          />
          <Form.Text className="text-muted">
            This must be a unique variable name.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton
              id="tbg-radio-1"
              value={1}
              onClick={this.lambdaStringChosen}
            >
              &#123;0,1&#125;
              <sup>λ</sup>
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-2"
              value={2}
              onClick={this.userEnteredVariableChosen}
            >
              Input Value:
            </ToggleButton>
            
          </ToggleButtonGroup>
         
          <Form.Control
            type="text"
            placeholder="Variable Value"
            onChange={this.handleVariableValueChange}
            hidden={this.state.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE ? false : true}
          />
          <Form.Text className="text-muted"
          hidden={this.state.variableAssignmentType === variableAssignmentTypes.USER_INPUTED_VALUE ? false : true}>
          Assign a value to this variable.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="button" onClick={this.submitVariable}>
          Submit
        </Button>
      </Form>
    );
  }
}


