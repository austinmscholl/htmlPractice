import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
//No need for AuthContext here; authorization occurs in the parent

export default class ShiftEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      instructions: "",
      hospital: ""
    };
  }

  componentWillMount = () => {
    //will rather than did (no async in this component)
    this.setState({
      id: this.props.shift.id,
      title: this.props.shift.title,
      instructions: this.props.shift.instructions,
      hospital: this.props.shift.hospital
    });
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value }); //removes whitespace before and after

  handleSubmit = e => {
    e.preventDefault();
    this.props.edit(e, this.state); //calls the function in Index with the state as a parameter
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <br />
            <h1>Edit Shift</h1>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="title">Shift Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  maxLength="255"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="instructions">Instructions</Label>
                <Input
                  id="instructions"
                  type="textarea"
                  name="instructions"
                  value={this.state.instructions}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <div className="text-center">
                <Button type="submit">Submit</Button>{" "}
                <Button onClick={this.props.cancel}>Cancel</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
