import React, { Component } from "react";
import { Container, Row, Col, Form, Label, Input, Button } from "reactstrap";
import { AuthContext } from "../auth/AuthContext";
import "./Nurse.css";
import APIURL from "../helpers/environment";

class NurseIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // instructors: [],
      hospitals: [],
      // assignments: [],
      shifts: [],
      submission: {},
      // currentAssignment: {},
      currentShift: {},
      // instructorId: "",
      hospitalId: "",
      content: "",
      grade: ""
    };
  }

  componentDidMount = () => {
    this.fetchHospitals();
  };

  fetchHospitals = () => {
    fetch(`${APIURL}/api/user/hospitals`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(hospitalData => this.setState({ hospitals: hospitalData }));
  };

  displayShifts = e => {
    //take the selected hospital's id and fetch all shifts
    this.setState({ hospitalId: e.target.value });
    fetch(`${APIURL}/api/shift/${e.target.value}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(shiftData => this.setState({ shifts: shiftData }));
  };

  displayInstructions = e => {
    if (e.target.value !== "unselected") {
      fetch(`${APIURL}/api/shift/item/${e.target.value}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.auth.sessionToken
        })
      })
        .then(res => res.json())
        .then(currentShift =>
          this.setState({ currentShift: currentShift })
        );
      this.fetchSubmission(e.target.value); //I have to feed the shiftId value directly into the fetch
    }
  };

  fetchSubmission = shiftId => {
    fetch(
      `${APIURL}/api/submission/${this.state.hospitalId}/${shiftId}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.auth.sessionToken
        })
      }
    )
      .then(res => res.json())
      .then(
        submissionData =>
          submissionData === null
            ? this.createSubmission(shiftId)
            : this.setState({
                submission: submissionData,
                content: submissionData.content,
                grade: submissionData.grade
              })
      );
  };

  createSubmission = shiftId => {
    fetch(`${APIURL}/api/submission`, {
      method: "POST",
      body: JSON.stringify({
        submission: {
          hospitalId: this.state.hospitalId,
          shiftId: shiftId,
          content: "",
          grade: ""
        }
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(submissionData =>
        this.setState({
          submission: submissionData.submission,
          content: ""
        })
      );
  };

  updateSubmission = () => {
    fetch(`${APIURL}/api/submission/${this.state.submission.id}`, {
      method: "PUT",
      body: JSON.stringify({
        submission: {
          content: this.state.content
        }
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(submissionData => this.setState.submissionData);

    alert("Successfully submitted.");
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    this.state.hospitalId === "" ||
    this.state.currentShift.id === undefined
      ? alert("You must select a shift first.")
      : this.updateSubmission();
    e.preventDefault();
  };

  render() {
    const hospitalRoster = //populate the dropdown list with results from the fetch
      this.state.hospitals.length >= 1 ? (
        this.state.hospitals.map(hospital => {
          return (
            <option key={hospital.id} value={hospital.id}>
              {hospital.name}
            </option>
          );
        })
      ) : (
        <option>No hospitals found</option>
      );

    const shiftRoster = //only show a dropdown menu if there are shifts to display
      this.state.shifts.length >= 1 ? (
        <Form onChange={this.displayInstructions}>
          <Label for="selectShift">Select your shift:</Label>
          <Input type="select" name="selectShift" id="selectShift">
            <option value="unselected" />
            {this.state.shifts.map((shift, index) => {
              return (
                <option key={index} id={shift.id} value={shift.id}>
                  {shift.title}
                </option>
              );
            })}
          </Input>
        </Form>
      ) : (
        <div />
      );

    const inCaseItsUngraded =
      this.state.grade === "" ? (
        <div />
      ) : (
        <p>
          Current grade: <b>{this.state.grade}</b>
        </p>
      );

    return (
      <Container>
        <Row>
          <Col md="4">
            <div className="shiftWindow">
              <br />
              <h1>Shift</h1>
              <hr />
              <Form onChange={this.displayShifts}>
                <Label for="selectHospital">Select your hospital:</Label>
                <Input
                  type="select"
                  name="selectHospital"
                  id="selectHospital"
                >
                  <option />
                  {hospitalRoster}
                </Input>
              </Form>
              {shiftRoster}
            </div>
          </Col>
          <Col md="8">
            <div className="submissionWindow">
              <h1>{this.state.currentShift.title}</h1>
              <hr />
              <h4>{this.state.currentShift.instructions}</h4>
              <div id="alert" />
              <Form onSubmit={this.handleSubmit}>
                <Input
                  id="content"
                  type="textarea"
                  rows="9"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
                <Button type="submit" style={{ float: "right" }}>
                  Submit
                </Button>
              </Form>
              <Button id="ungraded">{inCaseItsUngraded}</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <NurseIndex {...props} auth={auth} />}
  </AuthContext.Consumer>
);
