import React from "react";

import LibraryDisplay from "./LibraryDisplay";
import AddVariable from "./AddVariable";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import { typeOfCodeLine } from "../constants/variableAssignmentTypes";
import { CodeBlock } from ".";
import { Library } from ".";
import SubRoutine from "../classes/SubRoutine";
import {variableAssignmentTypes} from "../constants/variableAssignmentTypes"

class CodeHolder extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewVariableSubmitted =
      this.handleNewVariableSubmitted.bind(this);
    this.initializeTestLibraries = this.initializeTestLibraries.bind(this);
    this.state = {
      totalLines: 0,
      libraries: [],
    };
    this.initializeTestLibraries();
  }

  initializeTestLibraries() {
    let l1 = new Library("LibA", []);
    l1.addSubRoutine(new SubRoutine("LibA", "TestSubRoutine", []));
    l1.addSubRoutine(new SubRoutine("LibA", "TestSubRoutine2", []));
    l1.addCodeBlockToSubRoutine(
      new CodeBlock(
        typeOfCodeLine.VARIABLE_ASSIGNMENT,
        "a",
        variableAssignmentTypes.LAMBDA_LENGTH_STRING,
        '',
        'KEY1'
      ),
      "TestSubRoutine"
    );
    this.setState({
        totalLines: this.state.totalLines + 1,  //TODO: get a beter way of assigning keys lol
    });
    
      l1.addCodeBlockToSubRoutine(
        new CodeBlock(
          typeOfCodeLine.VARIABLE_ASSIGNMENT,
          "b",
          variableAssignmentTypes.USER_INPUTED_VALUE,
          '25',
          'KEY2'
        ),
        "TestSubRoutine"
      );
      this.setState({
        totalLines: this.state.totalLines + 1,  //TODO: get a beter way of assigning keys lol
    });

    l1.addCodeBlockToSubRoutine(
        new CodeBlock(
          typeOfCodeLine.VARIABLE_ASSIGNMENT,
          "c",
          variableAssignmentTypes.USER_INPUTED_VALUE,
          "Hello World",
          'KEY2'
        ),
        "TestSubRoutine2"
      );
      this.setState({
        totalLines: this.state.totalLines + 1,  //TODO: get a beter way of assigning keys lol
    });


    this.setState({
      libraries: this.state.libraries.push(l1),
      
    });
  }

  handleNewVariableSubmitted(
    libraryName,
    newVariableName,
    newVariableAssignmentType,
    newVariableAssignment
  ) {
    let c = new CodeBlock(
      typeOfCodeLine.VARIABLE_ASSIGNMENT,
      newVariableName,
      newVariableAssignmentType,
      newVariableAssignment,
      this.state.totalLines
    );
    var libraryFound = false;
    for (const lib of this.state.libraries) {
      if (lib.name === libraryName) {
        libraryFound = true;
        lib.addNewCodeBlock(c);
        this.setState({
          totalLines: this.state.totalLines + 1,
        });
        break;
      }
    }
    if (libraryFound === false) {
      alert(`Did not find a library with name ${libraryName}`);
    }
  }

  render() {
    return (
      <Container type="sm">
        <Stack>
          <LibraryDisplay library={this.state.libraries[0]} />
          <AddVariable submitVariable={this.handleNewVariableSubmitted} />
        </Stack>
      </Container>
    );
  }
}

export default CodeHolder;
