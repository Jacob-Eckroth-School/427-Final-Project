import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class AddCode extends React.Component {


    constructor(props){
        super(props);
        this.state={
            val:""
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        
    }

   handleKeyDown(e, callback){
        if (e.key === 'Enter' && e.shiftKey === false) {
          e.preventDefault();
          callback();
        }
      }

    handleFormChange(event){
        this.setState({val:event.target.value})
    }


    submitCode(){
        this.props.submitCode(this.state.val);
    }

  render() {
    return (
      
        <Form onKeyDown={e => { this.handleKeyDown(e, this.submitCode) }}>
          <Form.Group className="mb-3">
            <Form.Label>Code</Form.Label>
            <Form.Control type="text" placeholder="Code" onChange={this.handleFormChange} />
            <Form.Text className="text-muted">
              We'll never share your code with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="button" onClick={this.submitCode}>
            Submit
          </Button>
        </Form>
   
    );
  }
}

export default AddCode;
