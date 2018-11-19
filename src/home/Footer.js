import React, { Component } from "react";
import { Nav } from "reactstrap";
import "../App.css";
import Contact from "./Contact";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggleHidden = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <footer>
        <div id="phantomFooter" />
        <div className="footer">
          <Nav className="textWidth">
            <li>{"\u00A9"} Austin Scholl 2018.</li>
            <li>
              <span onClick={this.toggleHidden}>Support</span>
            </li>

            {this.state.modal ? (
              <Contact cancel={this.toggleHidden} />
            ) : (
              <div />
            )}
          </Nav>
        </div>
      </footer>
    );
  }
}
