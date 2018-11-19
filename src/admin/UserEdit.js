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

export default class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      passwordhash: "",
      permission: ""
    };
  }

  componentWillMount = () => {
    //will rather than did (no async in this component)
    this.setState({
      id: this.props.user.id,
      firstName: this.props.user.firstName.trim(),
      lastName: this.props.user.lastName.trim(),
      email: this.props.user.email.trim(),
      passwordhash: this.props.user.passwordhash,
      permission: this.props.user.permission
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
            <h1>Edit User</h1>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="permission">Edit user role</Label>
                <Input
                  type="select"
                  name="permission"
                  id="permission"
                  defaultValue={this.state.permission}
                  onChange={this.handleChange}
                >
                  <option value="nurse">Nurse</option>
                  <option value="hospital">Hospital</option>
                  <option value="admin">Admin</option>
                </Input>
              </FormGroup>
              <hr />
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="enter first name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="enter last name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="enter email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
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
