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
import { AuthContext } from "../auth/AuthContext";
import APIURL from "../helpers/environment";

class ShiftCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitalId: "",
      hospitalName: "",
      department: "",
      startDate: new Date(),
      endDate: "",
      startTime: "",
      endTime: "",
      pay: "",
      pickedUp: false
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const alert = document.getElementById("alert");

    fetch(`${APIURL}/api/shift/new`, {
      method: "POST",
      body: JSON.stringify({ shift: this.state }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      // .then(res => res.json())
      .then(shiftData => {
        shiftData.error
          ? (alert.innerText = "An error has occurred")
          : this.props.updateShiftsArray();
        this.setState({ 
          hospitalId: "", 
          hospitalName: "",
          department: "",
          startDate: new Date(),
          endDate: "",
          startTime: "",
          endTime: "",
          pay: "",
          pickedUp: false
        }); // No need to clear the problem set value
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <br />
            <h1>Create Shift</h1>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="hospitalId">Hospital Id</Label>
                <Input
                  id="hospitalId"
                  type="number"
                  name="hospitalId"
                  value={this.state.hospitalId}
                  placeholder="enter hospital id"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="hospitalName">Hospital Name</Label>
                <Input
                  id="hospitalName"
                  type="text"
                  name="hospitalName"
                  maxLength="255"
                  value={this.state.hospitalName}
                  placeholder="enter hospital name"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="department">Department</Label>
                <Input
                  id="department"
                  type="text"
                  name="department"
                  maxLength="255"
                  value={this.state.department}
                  placeholder="enter department"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  name="endDate"
                  value={this.state.endDate}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  name="startTime"
                  value={this.state.startTime}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="endTime">End time</Label>
                <Input
                  id="endtime"
                  type="time"
                  name="endtime"
                  value={this.state.endtime}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="pay">Pay</Label>
                <Input
                  id="pay"
                  type="text"
                  name="pay"
                  maxLength="255"
                  value={this.state.pay}
                  placeholder="enter pay"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <div id="alert" />
              <div className="text-center">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <ShiftCreate {...props} auth={auth} />}
  </AuthContext.Consumer>
);
