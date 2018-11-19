let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:5000";
    break;
  case "fastback-mobile-feedback.herokuapp.com":
    APIURL = "https://fastback-mobile-server.herokuapp.com";
    break;
  default:
    console.log("Error in environment.js");
}

export default APIURL;
