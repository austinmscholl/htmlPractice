import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import { AuthContext } from "./AuthContext";
import APIURL from "../helpers/environment";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      permission: "hospital"
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    const alert = document.getElementById("alert");
    alert.innerText = "";
  };

  handleSubmit = e => {
    e.preventDefault();

    const alert = document.getElementById("alert");
    let email = this.state.email.trim().toLowerCase();
    let password = this.state.password.trim();
    let confirmPassword = this.state.confirmPassword.trim();
    let firstName = this.state.firstName.trim();
    let lastName = this.state.lastName.trim();

    switch (true) {
      case this.state.password.length < 5:
        alert.innerText = `Your password must contain 5 or more characters.`;
        break;
      case password !== confirmPassword:
        alert.innerText = `Passwords must match.`;
        break;
      default:
        let newUser = {
          user: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            permission: this.state.permission
          }
        };

        fetch(`${APIURL}/api/user/signup`, {
          method: "POST",
          body: JSON.stringify(newUser), //server must expect an object with key value 'instructor'
          headers: new Headers({
            "Content-Type": "application/json"
          })
        })
          .then(res => res.json())
          .then(data => {
            if (!data.sessionToken) {
              // I need to throw an rejection error when the username and password fail to match
              alert.innerText = "Username or password invalid";
            } else {
              this.props.auth.setToken(data.sessionToken);
              this.props.auth.setPermission(data.user.permission);
            }
          })
          .catch(
            err =>
              (alert.innerText = `An error has occurred. Please try a different e-mail or contact the system admin for support.`)
          );
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <br />
            <h1>New Nurse</h1>

            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  maxLength="255"
                  placeholder="enter first name"
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
                  maxLength="255"
                  placeholder="enter last name"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  maxLength="255"
                  placeholder="enter email"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="su_password"
                  type="password"
                  name="password"
                  maxLength="255"
                  placeholder="enter password"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  id="su_confirmPassword"
                  type="password"
                  name="confirmPassword"
                  maxLength="255"
                  placeholder="confirm password"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <div id="alert" />
              <hr />
              <Button type="submit" className="align-self-center" block>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Signup {...props} auth={auth} />}
  </AuthContext.Consumer>
);
