import * as React from "react";
import { Container, Stack } from "react-bootstrap";
import { List } from 'react-movable';
import { LineOfCode } from "./LineOfCode";
import { Library } from "../classes/Library";
import { SubRoutineDisplay } from "./SubRoutineDisplay";
import { Button } from "react-bootstrap";
import { variableAssignmentTypes } from "../constants/variableAssignmentTypes";


//displays a library
export class LibraryDisplay extends React.Component<{ library: Library, notifyNewLibraryName: Function, deleteVariable: Function, libraryName: string }, { 
  library: Library, 
  addVariableDestination: string, 
  variableAssignmentType: number,  
  variableName: string,
  variableAssignment: string 
}>{

  constructor(props: any) {
    super(props);

    this.state =
    {
      library: this.props.library, //the library to be displayed
      addVariableDestination: this.props.libraryName,
      variableAssignmentType: variableAssignmentTypes.LAMBDA_LENGTH_STRING,
      variableName: "",
      variableAssignment: "",

    }
    this.enterNewLibraryName = this.enterNewLibraryName.bind(this);
    this.deleteVariable = this.deleteVariable.bind(this);
  }


  enterNewLibraryName() {
    var newName: string = prompt("Please enter new library name", this.state.library.name)
    this.state.library.name = newName;
    this.setState({
      library: this.state.library
    })
    this.props.notifyNewLibraryName();
  }
  deleteVariable(
    variableName: string,
  ) {
    this.props.deleteVariable(
      variableName,
      1,
      "re",
      this.props.libraryName
    )
    this.setState({ library: this.state.library }) 
  }
  render() {
    return (
      <Stack>
        <Stack direction="horizontal" gap={5}>
          <h1 className="libraryTitle">{this.state.library.name}</h1>
         
            <Button variant="secondary" onClick={(e) => { this.enterNewLibraryName() }}>

              Edit Library Name <i className="fa fa-pencil"></i>
            </Button>
         
        </Stack>

        <Container className="p-1 border border-dark">
          <List   //display a lit of all the code blocks NOT in the subroutines. Think key assignment, empty set initialization.
            //LIST is a draggable list :)
            values={this.state.library.code}
            onChange={({ oldIndex, newIndex }) => {
              this.state.library.updateItemOrder(oldIndex, newIndex)
              this.setState({
                library: this.state.library
              })
            }}
            renderList={({ children, props }) => <Stack {...props}>{children}</Stack>}
            renderItem={({ value, props }) => <LineOfCode key={value.key} codeBlock={value} newProps={props} deleteLineOfCode = {this.deleteVariable}/>}
          />
          {this.state.library.subRoutines.map((subRoutine) =>  //displaying all the subroutines within the library


            <SubRoutineDisplay key={subRoutine.name} subRoutine={subRoutine} />

          )}
        </Container>



      </Stack >
    );
  }
}


