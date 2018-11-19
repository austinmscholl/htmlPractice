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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value.trim() });
    const alert = document.getElementById("alert");
    alert.innerText = "";
  };

  handleSubmit = e => {
    e.preventDefault();
    const alert = document.getElementById("alert");
    let email = this.state.email.toLowerCase();
    let password = this.state.password.trim();

    fetch(`${APIURL}/api/user/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          // I need to throw an rejection error when the username and password fail to match
          alert.innerText = "Username or password invalid";
        } else {
          this.props.auth.setToken(data.sessionToken);
          this.props.auth.setPermission(data.user.permission);
        }
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <br />
            <div className="text-center">
              <h1>Shift Manager</h1>
              <h3>Pickup shifts</h3>
              <hr />
              <p>
                Welcome to our full stack application where nurses can pickup shifts posted by hospitals.
              </p>{" "}
              <p>
                Feel free to check the readme file in my{" "}
                <a
                  href="https://github.com/austinmscholl/shiftmanager-client"
                  target="_blank"
                >
                  Github Repository
                </a>{" "}
                for features and sample login credentials!
              </p>{" "}
            </div>
            <hr />
            <h1>Log in</h1>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="li_email"
                  type="email"
                  name="email"
                  maxLength="255"
                  placeholder="enter email"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="li_password"
                  type="password"
                  name="password"
                  maxLength="255"
                  placeholder="enter password"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <div id="alert" />
              <hr />
              <Button type="submit" block>
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
    {auth => <Login {...props} auth={auth} />}
  </AuthContext.Consumer>
);
