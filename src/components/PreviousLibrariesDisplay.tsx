import * as React from "react";
import { Container} from "react-bootstrap";
import { Library } from "../classes/Library";
import { PreviousLibraries } from "../classes/PreviousLibraries";

import { SavedLibraryDisplay } from "./SavedLibraryDisplay";



export class PreviousLibrariesDisplay extends React.Component<{previousLibraries:PreviousLibraries<Library>},{previousLibraries:PreviousLibraries<Library>}> {


    constructor(props:any){
        super(props);
        this.state={
            previousLibraries:this.props.previousLibraries
        }
    }

    createLibrariesRenderObject():any{
        
        var smallLibraryDisplays:any = []
        for(let i = this.state.previousLibraries.size()-1; i >=0; i--){
            smallLibraryDisplays.push(
                <SavedLibraryDisplay key={this.state.previousLibraries.at(i).name + this.state.previousLibraries.at(i).versionNumber.toString()}
                library={this.state.previousLibraries.at(i)}/>
               
                
            )
        }
        return smallLibraryDisplays;

    }

    render(): React.ReactNode {
        return(
           <Container>
               <h1>Previous Libraries</h1>
               <h2>Most Recent First</h2>
               {this.createLibrariesRenderObject()}
           </Container>
        )
    }
}