import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { AuthContext } from "./AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import "./Auth.css";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      hospitalSignup: false
    };
  }

  toggleHidden = () => this.setState({ visible: !this.state.visible });
  toggleInstructions = () =>
    this.setState({ hospitalSignup: !this.state.hospitalSignup });

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {!this.state.visible && ( // The accompanying component's default state is visible
              <div>
                <Signup />
                <p className="center">
                  Existing user? <b onClick={this.toggleHidden}>Log in</b>
                </p>
              </div>
            )}
            {this.state.visible && ( // The accompanying component's default state is hidden
              <div>
                <Login />
                <p className="center">
                  New user? <b onClick={this.toggleHidden}>Register here</b>
                </p>
              </div>
            )}
            {!this.state.hospitalSignup && ( // The accompanying component's default state is visible
              <p className="center">
                <Button id="newHospital" onClick={this.toggleInstructions}>
                  New hospital?
                </Button>
              </p>
            )}
            {this.state.hospitalSignup && ( // The accompanying component's default state is hidden
              <div className="text-center">
                <hr />
                <p onClick={this.toggleInstructions}>
                  To receive credentials as a hospital, create an account as
                  a nurse and then contact your administrator using the
                  support link below. Make sure to give the admin your name,
                  username, and the institution you represent. Once the
                  administrator has adjusted your role, you will automatically
                  see the hospital interface upon login.
                </p>
                <hr />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Auth {...props} auth={auth} />}
  </AuthContext.Consumer>
);
