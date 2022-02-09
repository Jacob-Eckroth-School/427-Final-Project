import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class AddVariable extends React.Component {


    constructor(props){
        super(props);
        this.state={
            variableName:"",
            variableAssignment:""
        }
        this.handleVariableNameChange = this.handleVariableNameChange.bind(this);
        this.submitVariable = this.submitVariable.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleVariableAssignmentChange = this.handleVariableAssignmentChange.bind(this);
        
    }

   handleKeyDown(e, callback){
        if (e.key === 'Enter' && e.shiftKey === false) {
          e.preventDefault();
          callback();
        }
      }

    handleVariableNameChange(event){
        this.setState({variableName:event.target.value})
    }
    handleVariableAssignmentChange(event){
      this.setState({variableAssignment:event.target.value})
    }


    submitVariable(){ 
        this.props.submitVariable(this.state.variableName,this.state.variableAssignment);
        document.getElementById("variableForm").reset();
    }

  render() {
    return (
      
        <Form id="variableForm" onKeyDown={e => { this.handleKeyDown(e, this.submitVariable) }}>
          <Form.Group className="mb-3">
            <Form.Label>Add a variable</Form.Label>
            <Form.Control type="text" placeholder="Variable Name" onChange={this.handleVariableNameChange} />
            <Form.Text className="text-muted">
              This must be a unique variable name.
            </Form.Text>
           
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assign variable to</Form.Label>
            <Form.Control type="text" placeholder="variable assignment" onChange = {this.handleVariableAssignmentChange}/>
            <Form.Text className="text-muted">
              Can be assigned to output of another function
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="button" onClick={this.submitVariable}>
            Submit
          </Button>
        </Form>
   
    );
  }
}

export default AddVariable;
