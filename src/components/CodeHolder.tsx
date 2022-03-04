import * as React from "react";

import { LibraryDisplay } from "./LibraryDisplay";
import { AddAFeature } from "./AddAFeature";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col"
import { typeOfCodeLine } from "../constants/variableAssignmentTypes";
import { CodeBlock } from "../classes/CodeBlock";
import { Library } from "../classes/Library";
import { SubRoutine } from "../classes/SubRoutine";
import { variableAssignmentTypes } from "../constants/variableAssignmentTypes"
import { PreviousLibraries } from "../classes/PreviousLibraries";
import { PreviousLibrariesDisplay } from "./SavedComponents/PreviousLibrariesDisplay";
import { Button } from "react-bootstrap";
import { LatexGenerator } from "../classes/LatexGenerator";
import axios from "axios";

//the main holder for the library which holds all of the different components
export class CodeHolder extends React.Component<{}, { totalLines: number, libraries: Library[], previousLibraries: PreviousLibraries<[Library,string]> }> {
    constructor(props: any) {
        super(props);
        this.handleNewVariableSubmitted =
            this.handleNewVariableSubmitted.bind(this);
        this.handleNewSubRoutineSubmitted = this.handleNewSubRoutineSubmitted.bind(this);
        this.initializeTestLibraries = this.initializeTestLibraries.bind(this);
        this.saveCurrentLibrary = this.saveCurrentLibrary.bind(this);
        this.showLatex = this.showLatex.bind(this);

        this.state = {
            totalLines: 0,
            libraries: [],
            previousLibraries: new PreviousLibraries<[Library,string]>()
        };
        this.initializeTestLibraries();


    }

    //initializes the test libraries, eventually this will be deleted
    initializeTestLibraries() {
        let l1: Library = new Library("LibA", 1, []);
        this.state.libraries.push(l1);
      
        this.setState({
            libraries: this.state.libraries,
           

        });


    }

    //moves the current library into a list of saved libraries, and displays it on the left side of the screen
    saveCurrentLibrary() {
        var reasonForSaving:string = prompt("Please enter the motivation behind saving this library, i.e. `inlined subroutine into library`","No Reason Given");
        //push a tuple with reasonForSaving added so it can be displayed in latex.
        this.state.previousLibraries.push([JSON.parse(JSON.stringify(this.state.libraries[0])),reasonForSaving]);
        this.state.libraries[0].versionNumber = this.state.libraries[0].versionNumber + 1
        this.setState({

            previousLibraries: this.state.previousLibraries,
            libraries: this.state.libraries

        })
    }

    //Shows the latex code in a PDF format, note: not finished.
    showLatex() {

        let latex: string = LatexGenerator.createFullLatex("Test Title", "Test Author", this.state.previousLibraries)
        window.open("https://latexonline.cc/compile?text=" + latex);
        //this.sendLatexToServer(latex)
    }



    //function that is called whenever a new variable is submitted to a LIBRARY
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
        for (const lib of this.state.libraries) {   //looking for the library we will be submitting to
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

    handleNewSubRoutineSubmitted(
        libraryName: string,
        subRoutineName: string,
        subRoutineParameters: string[]
    ) {

        let s:SubRoutine = new SubRoutine(libraryName,subRoutineName,[],subRoutineParameters);
        var libraryFound = false;
        for (const lib of this.state.libraries) {   //looking for the library we will be submitting to
            if (lib.name === libraryName) {
                libraryFound = true;
                lib.addSubRoutine(s);
                this.setState({
                    libraries:this.state.libraries
                })
                break;
            }
        }
        if (libraryFound === false) {
            alert(`Did not find a library with name ${libraryName}`);
        }
    }

    //render function
    render() {
        return (
            <Container className="justify-content-between align-items-start">
                <Stack direction="horizontal" className="align-items-start">
                    <Col sm={4}>
                        <PreviousLibrariesDisplay previousLibraries={this.state.previousLibraries} />
                    </Col>
                    <Col sm={8} className="align-self-start" >
                        <h1>Current Library</h1>
                        <LibraryDisplay library={this.state.libraries[0]} />
                        <AddAFeature submitVariable={this.handleNewVariableSubmitted} submitSubRoutine={this.handleNewSubRoutineSubmitted} />
                    </Col>
                </Stack>
                <Button id="fabButton" variant="success" type="button" onClick={this.saveCurrentLibrary}>
                    Save Current Library
                </Button>
                <Button variant="success" id="fabButtonTwo" type="button" onClick={this.showLatex}>
                    Show Current Latex
                </Button>

            </Container>
        );
    }
}
