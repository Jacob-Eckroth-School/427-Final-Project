import * as React from "react";
import { Container, Stack } from "react-bootstrap";

import { Library } from "../classes/Library";


import { SavedSubRoutineDisplay } from "./SavedSubRoutineDisplay";
import { SavedLineOfCode } from "./SavedLineOfCode";
//displays a library?
export class SavedLibraryDisplay extends React.Component<{ library: Library }, { library: Library }>{

    constructor(props: any) {
        super(props);
    
        this.state =
        {
            library: this.props.library,

        }

    }


    render() {
        return (
            <Stack>
                <h4 className="savedLibraryTitle">{this.state.library.name + " #" + this.state.library.versionNumber.toString()}</h4>
                <Container className="p-1 border border-dark">
                    <Stack>
                        {this.state.library.codeBlocks.map((codeBlock) => (
                            <SavedLineOfCode key={codeBlock.key} codeBlock={codeBlock} newProps={[]}/>
                        ))}
                    </Stack>

                    {this.state.library.subRoutines.map((subRoutine) =>
                       

                            <SavedSubRoutineDisplay key={subRoutine.name} subRoutine={subRoutine} />
                        
                    )}
                </Container>



            </Stack>
        );
    }
}


