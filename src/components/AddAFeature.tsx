import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { variableAssignmentTypes } from "../constants/variableAssignmentTypes";

import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import { truncate } from "fs";
//component that allows user to input a new thing and add it to a library
export class AddAFeature extends React.Component<{ submitVariable: Function }, { variableName: string, variableAssignment: string, variableAssignmentType: number,addSubRoutineSelected:boolean,addVariableSelected:boolean }> {

  //constructor
  constructor(props: any) {
    super(props);
    this.state = {
      variableName: "",
      addVariableSelected:true,
      addSubRoutineSelected:false,
      variableAssignment: "",
      variableAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING,
    };
    this.handleVariableNameChange = this.handleVariableNameChange.bind(this);
    this.submitVariable = this.submitVariable.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.lambdaStringChosen = this.lambdaStringChosen.bind(this);
    this.userEnteredVariableChosen = this.userEnteredVariableChosen.bind(this);
    this.handleVariableValueChange = this.handleVariableValueChange.bind(this);
    this.createAddVariableForm = this.createAddVariableForm.bind(this);
    this.createAddSubRoutineForm = this.createAddSubRoutineForm.bind(this);
    this.selectAddVariable = this.selectAddVariable.bind(this);
    this.selectAddSubRoutine = this.selectAddSubRoutine.bind(this);
    this.handleSubRoutineNameChange = this.handleSubRoutineNameChange.bind(this)
    this.submitSubRoutine = this.submitSubRoutine.bind(this);
  }


  //handles keydowns for the form
  handleKeyDown(e: any, callback: Function) {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      callback();
    }
  }


  //handles when the variable NAMe is changed, i.e A = 123, A is the variable name
  handleVariableNameChange(event: any) {

    this.setState({ variableName: event.target.value });
  }

  handleSubRoutineNameChange(){

  }

  //event handler for when variable VALUE is changed, i.e. A=123, 123 is the variable value
  handleVariableValueChange(event: any) {
    this.setState({ variableAssignment: event.target.value })
  }

  //event handler for when user presses submit variable, calls parent submit variable function
  submitVariable() {
    this.props.submitVariable(
      "LibA",
      this.state.variableName,
      this.state.variableAssignmentType,
      this.state.variableAssignment
    );
    (document.getElementById("variableForm") as HTMLFormElement).reset();   //clears the form
  }

  submitSubRoutine(){
    
  }

  //triggered when the user pressed the {0,1}^lambda button, updates the type of variable the user is assigning
  lambdaStringChosen() {

    this.setState({
      variableAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING
    });

  }


  selectAddVariable(){
    this.setState({
      addVariableSelected:true,
      addSubRoutineSelected:false
    })

  }

  selectAddSubRoutine(){
    this.setState({
      addVariableSelected:false,
      addSubRoutineSelected:true
    })
  }

  //triggered when user chooses to enter their own variable value.
  userEnteredVariableChosen() {

    this.setState({
      variableAssignmentType: variableAssignmentTypes.USER_INPUTED_VALUE
    })
  }


  createAddVariableForm() {
    return <Form
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

        <Form.Control //we only show this control if the user assignment type is USER_INPUTTED_VALUE
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
  }
  createAddSubRoutineForm() {
    return <Form
      id="variableForm"
      onKeyDown={(e) => {
        this.handleKeyDown(e, this.submitSubRoutine);
      }}
    >

      <Form.Group className="mb-3">
        <Form.Label>Add a subroutine</Form.Label>
        <Form.Control
          type="text"
          placeholder="Subroutine Name"
          onChange={this.handleSubRoutineNameChange}
        />
        <Form.Text className="text-muted">
          This must be a unique subroutine name
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

        <Form.Control //we only show this control if the user assignment type is USER_INPUTTED_VALUE
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
  }

  createDropDownSelector() {
    return (
      <DropdownButton className="mt-2" id="dropdown-basic-button" variant="info" title="Change Selection">
        <Dropdown.Item onClick={
         (e)=>{
          this.selectAddVariable()
         }
            
          
       
       
        }>Add Variable</Dropdown.Item>
        <Dropdown.Item onClick={
        (e)=>{
          this.selectAddSubRoutine()
        }
          
          
        
       
        }>Add SubRoutine</Dropdown.Item>
      </DropdownButton>
    )
  }


  render() {
    return (
      <Stack>
        {this.createDropDownSelector()}
        {this.state.addVariableSelected ? this.createAddVariableForm() : this.createAddSubRoutineForm()}
      </Stack>
    )

  }
}


