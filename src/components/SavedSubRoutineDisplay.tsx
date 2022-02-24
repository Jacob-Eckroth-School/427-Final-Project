import * as React from "react";
import { Stack } from "react-bootstrap";

import Container from "react-bootstrap/Container";
import {SubRoutine} from "../classes/SubRoutine";

import { SavedLineOfCode } from "./SavedLineOfCode";


//displays a library?
export class SavedSubRoutineDisplay extends React.Component<{subRoutine:SubRoutine},{subRoutine:SubRoutine}> {

    constructor(props:any) {
        super(props);
      
        this.state =
        {
            subRoutine: this.props.subRoutine
        }

    }

   
    /*  {this.props.code.map((codeObject) => (
                
          <li key={codeObject.key}>{this.constructCodeRenderObject(codeObject)}</li>
    
    ))}*/


    render() {
        return (
            <Stack>
                <h4 className="savedSubRoutineTitle">{this.state.subRoutine.name + '():'}</h4>
                <Container className="px-3">
                    <Stack>
                    {this.state.subRoutine.codeBlocks.map((codeBlock)=>(
                    <SavedLineOfCode key={codeBlock.key} codeBlock={codeBlock} newProps={[]}/>
                  ))}

                    </Stack>
           
                </Container>



            </Stack>
        );
    }
}

