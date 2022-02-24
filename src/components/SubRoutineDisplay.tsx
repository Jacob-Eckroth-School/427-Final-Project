import * as React from "react";
import { Stack } from "react-bootstrap";
import { List } from 'react-movable';
import { LineOfCode } from "./LineOfCode";
import Container from "react-bootstrap/Container";
import {SubRoutine} from "../classes/SubRoutine";


//displays a library?
export class SubRoutineDisplay extends React.Component<{subRoutine:SubRoutine},{subRoutine:SubRoutine}> {

    constructor(props:any) {
        super(props);
       
        this.state =
        {
            subRoutine: this.props.subRoutine
        }

    }



    render() {
        return (
            <Stack>
                <h2 className="subRoutineTitle">{this.state.subRoutine.name + '():'}</h2>
                <Container className="px-3">
                    <List
                        values={this.state.subRoutine.code}
                        onChange={({ oldIndex, newIndex }) => {
                            this.state.subRoutine.updateItemOrder(oldIndex, newIndex)
                            this.setState({
                                subRoutine: this.state.subRoutine
                            })
                        }}
                        renderList={({ children, props }) => <Stack {...props}>{children}</Stack>}
                        renderItem={({ value, props }) => <LineOfCode key={value.key} codeBlock={value} newProps={props}/>}
                    />
                </Container>



            </Stack>
        );
    }
}

