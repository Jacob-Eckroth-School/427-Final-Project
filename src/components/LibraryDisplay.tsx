import * as React from "react";
import { Container, Stack } from "react-bootstrap";
import { List} from 'react-movable';
import { LineOfCode } from "./LineOfCode";
import {Library} from "../classes/Library";
import {SubRoutineDisplay} from "./SubRoutineDisplay";


//displays a library
export class LibraryDisplay extends React.Component<{library:Library},{library:Library}>{
  
    constructor(props:any){
        super(props);
        
        this.state = 
        {
            library:this.props.library, //the library to be displayed
         
        }
        
    }


 
  render() {
    return (
      <Stack>
          <h1 className="libraryTitle">{this.state.library.name + " #" + this.state.library.versionNumber.toString()}</h1>
          <Container className="p-1 border border-dark">
            <List   //display a lit of all the code blocks NOT in the subroutines. Think key assignment, empty set initialization.
                //LIST is a draggable list :)
               values={this.state.library.code}
                onChange={({ oldIndex, newIndex }) =>{
                    this.state.library.updateItemOrder(oldIndex,newIndex)  
                        this.setState({
                            library: this.state.library
                        })
                    }}
                    renderList={({ children, props }) => <Stack {...props}>{children}</Stack>}
                    renderItem={({ value, props }) => <LineOfCode key={value.key} codeBlock={value} newProps={props}/>}
                />
                {this.state.library.subRoutines.map((subRoutine)=>  //displaying all the subroutines within the library
          

                <SubRoutineDisplay key={subRoutine.name} subRoutine={subRoutine} />
            
                )}
        </Container>
          
      
       
      </Stack>
    );
  }
}


