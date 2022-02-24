import * as React from "react";

import { LibraryDisplay } from "./LibraryDisplay";
import { AddVariable } from "./AddVariable";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import  Col from "react-bootstrap/Col"
import { typeOfCodeLine } from "../constants/variableAssignmentTypes";
import { CodeBlock } from "../classes/CodeBlock";
import { Library } from "../classes/Library";
import { SubRoutine } from "../classes/SubRoutine";
import { variableAssignmentTypes } from "../constants/variableAssignmentTypes"
import { PreviousLibraries } from "../classes/PreviousLibraries";
import { PreviousLibrariesDisplay } from "./PreviousLibrariesDisplay";
import { Button } from "react-bootstrap";

export class CodeHolder extends React.Component<{}, { totalLines: number, libraries: Library[], previousLibraries: PreviousLibraries<Library> }> {
    constructor(props: any) {
        super(props);
        this.handleNewVariableSubmitted =
            this.handleNewVariableSubmitted.bind(this);
        this.initializeTestLibraries = this.initializeTestLibraries.bind(this);
        this.saveCurrentLibrary = this.saveCurrentLibrary.bind(this);
        this.state = {
            totalLines: 0,
            libraries: [],
            previousLibraries: new PreviousLibraries<Library>()
        };
        this.initializeTestLibraries();
    }

    initializeTestLibraries() {
        let l1: Library = new Library("LibA",1, []);
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

        this.state.libraries.push(l1);
        this.saveCurrentLibrary();
        this.saveCurrentLibrary();
        this.setState({
            libraries: this.state.libraries,
            previousLibraries: this.state.previousLibraries

        });


    }

    saveCurrentLibrary(){
        this.state.previousLibraries.push(JSON.parse(JSON.stringify(this.state.libraries[0])));
        this.state.libraries[0].versionNumber = this.state.libraries[0].versionNumber + 1
        this.setState({
            previousLibraries : this.state.previousLibraries,
            libraries:this.state.libraries
            
        })
    }

    handleNewVariableSubmitted(
        libraryName: string,
        newVariableName: string,
        newVariableAssignmentType: number,
        newVariableAssignment: string
    ) {
        let c = new CodeBlock(
            typeOfCodeLine.VARIABLE_ASSIGNMENT,
            newVariableName,
            newVariableAssignmentType,
            newVariableAssignment,
            this.state.totalLines.toString()
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
            <Container className="justify-content-between align-items-start">
                <Stack direction="horizontal">
                    <Col sm={4}>
                        <PreviousLibrariesDisplay previousLibraries={this.state.previousLibraries} />
                    </Col>
                    <Col sm={8} className="align-self-start" >
                        <h1>Current Library</h1>
                        <LibraryDisplay library={this.state.libraries[0]} />
                        <AddVariable submitVariable={this.handleNewVariableSubmitted} />
                    </Col>
                </Stack>
                <Button id="fabButton" variant="success" type="button" onClick={this.saveCurrentLibrary}>
                    Save Current Library
                </Button>

            </Container>
        );
    }
}
