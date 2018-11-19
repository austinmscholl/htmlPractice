import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./home/Header";
import Footer from "./home/Footer";
import { AuthContext } from "./auth/AuthContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faSignOutAlt, faTimes);

export default class App extends Component {
  constructor() {
    super();
    this.setToken = token => {
      //using context to store the tokens
      localStorage.setItem("token", token);
      this.setState({ sessionToken: token });
    };
    this.setPermission = permission => {
      localStorage.setItem("permission", permission);
      this.setState({ sessionPermission: permission });
    };
    this.state = {
      sessionToken: "",
      sessionPermission: "",
      setToken: this.setToken,
      setPermission: this.setPermission
    };
  }

  componentWillMount = () => {
    //grabbing the token from local storage and setting to state if empty
    const token = localStorage.getItem("token");
    const permission = localStorage.getItem("permission");
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token, sessionPermission: permission });
    }
  };

  logout = () => {
    this.setState({ sessionToken: "" });
    this.setState({ sessionPermission: "" });
    localStorage.clear();
  };

  render() {
    return (
      <Router>
        <AuthContext.Provider value={this.state}>
          <Header clickLogout={this.logout} />
          <Footer />
        </AuthContext.Provider>
      </Router>
    );
  }
}
