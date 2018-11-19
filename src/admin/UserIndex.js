import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { AuthContext } from "../auth/AuthContext";
import UserTable from "./UserTable";
import UserEdit from "./UserEdit";
import "./User.css";
import APIURL from "../helpers/environment";

class UserIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userToUpdate: [],
      showEditMenu: false
    };
  }

  componentDidMount = () => this.fetchUsers();

  fetchUsers = () => {
    fetch(`${APIURL}/api/user`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(userData => this.setState({ users: userData })); //load results to state
  };

  // DELETING USERS WITHOUT DELETING SHIFTS WILL CURRENTLY CRASH THE GRADING TABLE
  // deleteUser = e => {
  //   fetch(`/${APIURL}/api/user/${e.target.id}`, {
  //     method: "DELETE",
  //     body: JSON.stringify({ user: { id: e.target.id } }),
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: this.props.auth.sessionToken
  //     })
  //   }).then(res => this.fetchUsers()); //refresh after deleting
  // };

  editUser = (e, user) => {
    console.log(user);
    fetch(`${APIURL}/api/user/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({ user: user }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    }).then(res => {
      this.setState({ showEditMenu: false });
      this.fetchUsers();
    });
  };

  setUpdatedUser = (e, user) =>
    this.setState({ userToUpdate: user, showEditMenu: true }); // select the id to edit and bring up the edit modal

  cancelEdit = e => {
    this.setState({ showEditMenu: false });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.showEditMenu ? ( //Edit menu will only appear if true
              <UserEdit
                edit={this.editUser}
                user={this.state.userToUpdate}
                cancel={this.cancelEdit}
              />
            ) : (
              <div />
            )}
          </Col>
        </Row>

        <hr />

        <Row>
          <Col>
            <UserTable
              users={this.state.users}
              // delete={this.deleteUser}
              edit={this.setUpdatedUser}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <UserIndex {...props} auth={auth} />}
  </AuthContext.Consumer>
);
