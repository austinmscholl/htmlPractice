import React, { Component } from "react";
import { Table, Button, Row, Col } from "reactstrap";
import GradingModal from "../grading/GradingModal";
import { AuthContext } from "../auth/AuthContext";
import APIURL from "../helpers/environment";

class ShiftTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      shiftIdToGrade: "",
      gradingWindow: false
    };
  }

  fetchSubmissions = e => {
    this.setState({ gradingWindow: true, shiftIdToGrade: e.target.id });
    fetch(`${APIURL}/api/submission/grading/${e.target.id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(submissionsData => this.setState({ submissions: submissionsData }));
  };

  closeSubmissions = () => {
    this.setState({
      submissions: [],
      shiftIdToGrade: "",
      gradingWindow: false
    });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="text-center">
          <hr />
          <h3>Shifts</h3>
          <hr />
          <p>Click on any row below to bring up a grading window</p>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Title</th>
              <th scope="col">Instructions</th>
              <th scope="col" style={{ width: "10%" }}>
                Modify
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.shifts.map(shift => {
              return (
                <tr key={shift.id}>
                  <th
                    className="pointer"
                    id={shift.id}
                    onClick={this.fetchSubmissions}
                  >
                    {shift.title}
                  </th>
                  <td
                    className="pointer"
                    id={shift.id}
                    onClick={this.fetchSubmissions}
                  >
                    {shift.instructions}
                  </td>
                  <td className="buttons align-middle">
                    <Button
                      id={shift.id}
                      onClick={e => this.props.edit(e, shift)}
                    >
                      Edit
                    </Button>
                    <Button
                      id={shift.id}
                      onClick={e => this.props.delete(e, shift.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Row>
          <Col>
            {this.state.gradingWindow ? (
              <GradingModal
                submissions={this.state.submissions}
                close={this.closeSubmissions}
                shiftIdToGrade={this.state.shiftIdToGrade}
              />
            ) : (
              <div />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <ShiftTable {...props} auth={auth} />}
  </AuthContext.Consumer>
);
