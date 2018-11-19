import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { AuthContext } from "../auth/AuthContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ShiftTable from "./ShiftTable";
import ShiftCreate from "./ShiftCreate";
import ShiftEdit from "./ShiftEdit";
import "./Shift.css";
import APIURL from "../helpers/environment";

class ShiftIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: [],
      shiftToUpdate: {},
      showEditMenu: false
    };
  }

  componentDidMount = () => this.fetchShifts();

  fetchShifts = () => {
    // console.log(APIURL);
    fetch(`${APIURL}/api/shift`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(shiftData => this.setState({ shifts: shiftData }));
  };

  deleteShift = (e, shiftId) => {
    // console.log(shiftId);
    confirmAlert({
      title: "Are you sure you want to delete this shift?",
      message: "All submissions will be lost.",
      buttons: [
        {
          label: "Yes, delete.",
          onClick: () =>
            fetch(`${APIURL}/api/shift/${shiftId}`, {
              method: "DELETE",
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.auth.sessionToken
              })
            }).then(res => this.fetchShifts())
        },
        {
          label: "No, cancel.",
          onClick: () => this.fetchShifts()
        }
      ]
    });
  };

  editShift = (e, shift) => {
    fetch(`${APIURL}/api/shift/${shift.id}`, {
      method: "PUT",
      body: JSON.stringify({ shift: shift }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    }).then(res => {
      this.setState({ showEditMenu: false });
      this.fetchShifts();
    });
  };

  setUpdatedShift = (e, shift) =>
    this.setState({ shiftToUpdate: shift, showEditMenu: true }); // select the id to edit and bring up the edit modal

  cancelEdit = e => {
    this.setState({ showEditMenu: false });
  };

  render() {
    const shifts =
      this.state.shifts.length >= 1 ? (
        <ShiftTable
          shifts={this.state.shifts}
          delete={this.deleteShift}
          edit={this.setUpdatedShift}
        />
      ) : (
        <p>Welcome! Create an shift!</p>
      );

    return (
      <Container>
        <Row>
          {!this.state.showEditMenu ? (
            <ShiftCreate updateShiftsArray={this.fetchShifts} />
          ) : (
            <div />
          )}
        </Row>
        <Row>
          {this.state.showEditMenu ? ( //Edit menu will only appear if true
            <ShiftEdit
              edit={this.editShift}
              shift={this.state.shiftToUpdate}
              cancel={this.cancelEdit}
            />
          ) : (
            <div />
          )}
        </Row>

        <Row>
          <Col id="shifts">{shifts}</Col>
        </Row>
      </Container>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <ShiftIndex {...props} auth={auth} />}
  </AuthContext.Consumer>
);
