import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { variableAssignmentTypes } from "../constants/variableAssignmentTypes";

import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Stack } from "react-bootstrap";

//component that allows user to input a new thing and add it to a library
export class AddAFeature extends React.Component<{ libraryName:string,submitVariable: Function, submitSubRoutine: Function }, { subRoutineName: string, subRoutineVariableNames: Map<number, string>, amountOfParameters: number, variableName: string, variableAssignment: string, variableAssignmentType: number, addSubRoutineSelected: boolean, addVariableSelected: boolean }> {

  //constructor
  constructor(props: any) {
    super(props);
    this.state = {
      variableName: "",
      subRoutineName: "",
      addVariableSelected: true,
      addSubRoutineSelected: false,
      variableAssignment: "",
      variableAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING,
      amountOfParameters: 0,
      subRoutineVariableNames: new Map<number, string>()
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
    this.updateParameterAmount = this.updateParameterAmount.bind(this);
    this.displayParameterInputs = this.displayParameterInputs.bind(this);
    this.handleParameterNameChange = this.handleParameterNameChange.bind(this);
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


  //called whenever a subroutine name changes
  handleSubRoutineNameChange(event: any) {
    this.setState({ subRoutineName: event.target.value })
  }


  //called whenever the name to a parameter changes
  handleParameterNameChange(event: any) {

    this.state.subRoutineVariableNames.set(Number(event.target.id), event.target.value)
    this.setState({
      subRoutineVariableNames: this.state.subRoutineVariableNames
    })


  }

  //event handler for when variable VALUE is changed, i.e. A=123, 123 is the variable value
  handleVariableValueChange(event: any) {
    this.setState({ variableAssignment: event.target.value })
  }

  //event handler for when user presses submit variable, calls parent submit variable function
  submitVariable() {
    this.props.submitVariable(
      this.props.libraryName,
      this.state.variableName,
      this.state.variableAssignmentType,
      this.state.variableAssignment
    );
    (document.getElementById("variableForm") as HTMLFormElement).reset();   //clears the form
  }

  submitSubRoutine() {
    if (this.state.subRoutineName.length == 0) {
      alert("Your subroutine must have a name!");
      return;
    }
    var subRoutineNames: string[] = []
    for (let i: number = 0; i < this.state.amountOfParameters; i++) {
      for (let j: number = i + 1; j < this.state.amountOfParameters; j++) {

        if (this.state.subRoutineVariableNames.get(i) === this.state.subRoutineVariableNames.get(j)) {
          alert("You cannot have two parameter names that are identical.");
          return;
        }
      }
      if (this.state.subRoutineVariableNames.has(i) == false || this.state.subRoutineVariableNames.get(i).length == 0) {
        alert("You must name every parameter to your subroutine!");
        return;
      }
      subRoutineNames.push(this.state.subRoutineVariableNames.get(i))
    }
    this.props.submitSubRoutine(
      this.props.libraryName,
      this.state.subRoutineName,
      subRoutineNames
    )
      (document.getElementById("subRoutineForm") as HTMLFormElement).reset();   //clears the form

  }

  //triggered when the user pressed the {0,1}^lambda button, updates the type of variable the user is assigning
  lambdaStringChosen() {

    this.setState({
      variableAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING
    });

  }


  selectAddVariable() {
    this.setState({
      addVariableSelected: true,
      addSubRoutineSelected: false
    })

  }

  selectAddSubRoutine() {
    this.setState({
      addVariableSelected: false,
      addSubRoutineSelected: true
    })
  }

  //updates the amount of parameters when the user is attempting to submit a subroutine
  updateParameterAmount(amount: number) {
    this.setState({
      amountOfParameters: amount
    })
  }
  //returns a list of the input boxes where user can enter parameter names
  displayParameterInputs() {
    var allParameters: any = [];
    for (let i = 0; i < this.state.amountOfParameters; i++) {

      allParameters.push(<Form.Group className="mb-3" controlId="formParameterInput" key={i.toString()}>
        <Form.Label>Parameter #{i}</Form.Label>
        <Form.Control type="text" placeholder="Enter unique parameter name" id={i.toString()} onChange={this.handleParameterNameChange} />

      </Form.Group>);
    }

    return allParameters;


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
        Add Variable
      </Button>
    </Form>
  }
  createAddSubRoutineForm() {
    return <Form
      id="subRoutineForm"
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
        <Form.Label>Amount of Parameters</Form.Label>
        <Form.Select aria-label="Default select example"
          onChange={(e) => {
            this.updateParameterAmount(Number(e.target.value))
          }


          }>

          <option value="0">No Parameters</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
        </Form.Select>
      </Form.Group>
      {this.displayParameterInputs()}

      <Button variant="primary" type="button" onClick={this.submitSubRoutine}>
        Add SubRoutine
      </Button>
    </Form>
  }



  createDropDownSelector() {
    return (
      <DropdownButton className="mt-2" id="dropdown-basic-button" variant="info" title="Change Selection">
        <Dropdown.Item onClick={
          (e) => {
            this.selectAddVariable()
          }




        }>Add Variable</Dropdown.Item>
        <Dropdown.Item onClick={
          (e) => {
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


