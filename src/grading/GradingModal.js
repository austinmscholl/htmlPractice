import React, { Component } from "react";
import { Modal, Button, Input, Form } from "reactstrap";
import { AuthContext } from "../auth/AuthContext";
import StudentName from "./StudentName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Grading.css";
import APIURL from "../helpers/environment";

class GradingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      instructions: "",
      grade: "",
      submissionToGrade: {
        content: "",
        grade: ""
      }
    };
  }

  componentDidMount = () => this.fetchAssignmentToGrade();

  fetchAssignmentToGrade = () => {
    fetch(`${APIURL}/api/assignment/item/${this.props.assignmentIdToGrade}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(assignmentData =>
        this.setState({
          title: assignmentData.title,
          instructions: assignmentData.instructions
        })
      );
  };

  displaySubmission = e => {
    e.target.value === ""
      ? this.setState({
          submissionToGrade: {
            content: "",
            grade: ""
          }
        })
      : fetch(`${APIURL}/api/submission/item/${e.target.value}`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.auth.sessionToken
          })
        })
          .then(res => res.json())
          .then(submissionData =>
            this.setState({
              submissionToGrade: submissionData,
              grade: submissionData.grade
            })
          );
  };

  updateGrade = e => {
    e.preventDefault();
    console.log(e.target.value);
    this.state.submissionToGrade.id === undefined
      ? alert("Select an assignment first")
      : fetch(`${APIURL}/api/submission/${this.state.submissionToGrade.id}`, {
          method: "PUT",
          body: JSON.stringify({ submission: { grade: this.state.grade } }),
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.auth.sessionToken
          })
        })
          .then(res => res.json())
          .then(this.fetchAssignmentToGrade())
          .then(alert("Grade updated."));
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const studentRoster =
      this.props.submissions.length >= 1 ? (
        this.props.submissions.map(submission => {
          return <StudentName key={submission.id} submission={submission} />;
        })
      ) : (
        <option value="">No submissions to grade</option>
      );

    return (
      <div className="wrapper">
        <Modal isOpen={true} id="grading">
          <Form onSubmit={this.updateGrade}>
            <Button onClick={this.props.close} id="close">
              <FontAwesomeIcon icon="times" />
            </Button>
            <h4>{this.state.title}</h4>
            <hr />
            <b>{this.state.instructions}</b>
            <hr />
            <Input
              type="select"
              name="selectStudent"
              id="selectStudent"
              onChange={this.displaySubmission}
            >
              <option>Select a student</option>
              {studentRoster}
            </Input>
            <textarea
              lines="5"
              id="contentToGrade"
              value={this.state.submissionToGrade.content}
              readOnly={true}
            />
            <div className="update">
              <Button type="submit" id="submit">
                Grade
              </Button>
              <Input
                type="number"
                name="grade"
                id="grade"
                step="0.1"
                className="text-center"
                placeholder="enter grade"
                value={this.state.grade}
                onChange={this.handleChange}
              />
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <GradingModal {...props} auth={auth} />}
  </AuthContext.Consumer>
);
