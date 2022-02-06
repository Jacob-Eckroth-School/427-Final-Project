import React from "react";
import { Stack } from "react-bootstrap";

class CodeDisplay extends React.Component {
 
  render() {
    return (
      <Stack>
          <h1>Code Display</h1>
          <ul>
          {this.props.code.map((codeBlock) => (
          <li key={codeBlock}>{codeBlock}</li>
        ))}
          </ul>
        
       
      </Stack>
    );
  }
}

export default CodeDisplay;
