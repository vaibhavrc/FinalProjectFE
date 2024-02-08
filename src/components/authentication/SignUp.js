import React, { Component } from "react";
import "./SignUp.scss";
import { AuthenticationDataServices } from "../../services/AuthenticationDataServices";
import Logo from "./../../asserts/bg.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SportsIcon from "@material-ui/icons/Sports";
import { grey } from "@material-ui/core/colors";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      FirstName: "",
      LastName: "",
      SignInEmail: "",
      SignUpEmail: "",
      SignInPassword: "",
      SignUpPassword: "",
      SignUpConfirmPassword: "",
      MasterPassword: "",
      Role: "player",
      SportCompany: "",

      FirstNameFlag: false,
      LastNameFlag: false,
      SignInEmailFlag: false,
      SignUpEmailFlag: false,
      SignInPasswordFlag: false,
      SignUpPasswordFlag: false,
      SignUpConfirmPasswordFlag: false,
      MasterPasswordFlag: false,
      SportCompanyFlag: false,

      OpenLoader: false,
      OpenSnackBar: false,
      Message: "",
    };
  }

  ClearState = () => {
    console.log("Clear States Calling....");
    this.setState({
      FirstName: "",
      LastName: "",
      SignInEmail: "",
      SignUpEmail: "",
      SignInPassword: "",
      SignUpPassword: "",
      SignUpConfirmPassword: "",
      MasterPassword: "",
      SportCompany: "",

      FirstNameFlag: false,
      LastNameFlag: false,
      SignInEmailFlag: false,
      SignUpEmailFlag: false,
      SignInPasswordFlag: false,
      SignUpPasswordFlag: false,
      SignUpConfirmPasswordFlag: false,
      MasterPasswordFlag: false,
      SportCompanyFlag: false,
    });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log("Name : ", name, " Value : ", value);
  };

  CheckValidity = (operation) => {
    let state = this.state;
    let Value = true;
    this.setState({
      FirstNameFlag: false,
      LastNameFlag: false,
      SignInEmailFlag: false,
      SignUpEmailFlag: false,
      SignInPasswordFlag: false,
      SignUpPasswordFlag: false,
      SignUpConfirmPasswordFlag: false,
      MasterPasswordFlag: false,
      SportCompanyFlag: false,
    });

    if (operation === "signup") {
      if (state.FirstName === "") {
        this.setState({ FirstNameFlag: true });
        Value = false;
      }

      if (state.LastName === "") {
        this.setState({ LastNameFlag: true });
        Value = false;
      }

      if (state.SignUpEmail === "") {
        this.setState({ SignUpEmailFlag: true });
        Value = false;
      }

      if (state.SignUpPassword === "") {
        this.setState({ SignUpPasswordFlag: true });
        Value = false;
      }

      if (state.SignUpConfirmPassword === "") {
        this.setState({ SignUpConfirmPasswordFlag: true });
        Value = false;
      }

      if (state.Role === "admin" && state.MasterPassword === "") {
        this.setState({ MasterPasswordFlag: true });
        Value = false;
      }
    } else {
      //SignIn
      if (state.SignInEmail === "") {
        this.setState({ SignInEmailFlag: true });
        Value = false;
      }

      if (state.SignInPassword === "") {
        this.setState({ SignInPasswordFlag: true });
        Value = false;
      }
    }

    return Value;
  };

  handleSignUpSubmit = (e) => {
    let state = this.state;

    if (this.CheckValidity("signup")) {
      if (state.SignUpConfirmPassword !== state.SignUpPassword) {
        this.setState({
          OpenSnackBar: true,
          Message: "Password And Confirm Password Not Match",
        });
        return;
      }
      debugger;
      if (
        state.Role.toLocaleLowerCase() === "admin" &&
        this.state.MasterPassword !== "India@123"
      ) {
        this.setState({
          OpenSnackBar: true,
          Message: "Invalid Master Password",
        });
        return;
      }

      this.setState({ OpenLoader: true });
      let data = {
        firstName: state.FirstName,
        lastName: state.LastName,
        email: state.SignUpEmail,
        password: state.SignUpPassword,
        role: state.Role,
        masterPassword: state.MasterPassword,
        sportCompany: state.SportCompany.trim(),
      };

      AuthenticationDataServices.SignUp(data)
        .then((data) => {
          console.log("Data : ", data);
          if (data.isSuccess) {
            this.ClearState();
          }
          this.setState({
            OpenSnackBar: true,
            Message: data.message,
            OpenLoader: false,
          });
        })
        .catch((error) => {
          console.log("Error : ", error);
          this.setState({
            OpenSnackBar: true,
            Message: "Something went wrong",
            OpenLoader: false,
          });
        });
    } else {
      this.setState({
        OpenSnackBar: true,
        Message: "Please Enter Required Field",
      });
    }
  };

  handleSignInSubmit = (e) => {
    let state = this.state;
    if (this.CheckValidity("signin")) {
      this.setState({ OpenLoader: true });
      let data = {
        email: state.SignInEmail,
        password: state.SignInPassword,
      };

      AuthenticationDataServices.SignIn(data)
        .then((data) => {
          console.log("Data : ", data);
          this.setState({
            OpenSnackBar: true,
            Message: data.message,
            OpenLoader: false,
          });
          if (data.isSuccess) {
            this.ClearState();
            // debugger;
            if (data.data.role === "player") {
              localStorage.setItem("PlayerToken", data.token);
              localStorage.setItem("PlayerID", data.data.userID);
              localStorage.setItem("PlayerFirstName", data.data.firstName);
              localStorage.setItem("PlayerLastName", data.data.lastName);
              localStorage.setItem("PlayerEmail", data.data.email);
              //
              localStorage.setItem("PMenuHome", true);
              localStorage.setItem("PMenuMyPackages", false);
              //
              window.location = "/PlayerDashboard";
              //
            } else if (data.data.role === "admin") {
              debugger;
              console.log(
                "Venue Token : " + localStorage.getItem("VenueToken")
              );
              if (
                localStorage.getItem("VenueToken") === undefined ||
                localStorage.getItem("VenueToken") === "" ||
                localStorage.getItem("VenueToken") === null
              ) {
                localStorage.setItem("VenueToken", data.token);
              }
              localStorage.setItem("AdminToken", data.token);
              localStorage.setItem("AdminID", data.data.userID);
              localStorage.setItem("AdminFirstName", data.data.firstName);
              localStorage.setItem("AdminLastName", data.data.lastName);
              localStorage.setItem("AdminEmail", data.data.email);
              //
              localStorage.setItem("AMenuHome", true);
              localStorage.setItem("AMenuPackage", false);
              localStorage.setItem("AMenuComplaints", false);
              localStorage.setItem("AMenuFeedback", false);
              //
              window.location = "/AdminDashboard";
            } else if (data.data.role === "venue") {
              localStorage.setItem("VenueToken", data.token);
              localStorage.setItem("VenueID", data.data.userID);
              localStorage.setItem("VenueFirstName", data.data.firstName);
              localStorage.setItem("VenueLastName", data.data.lastName);
              localStorage.setItem("VenueEmail", data.data.email);

              localStorage.setItem("VMenuHome", true);
              //
              window.location = "/VenueDashboard";
            } else if (data.data.role === "coach") {
              localStorage.setItem("CoachToken", data.token);
              localStorage.setItem("CoachID", data.data.userID);
              localStorage.setItem("CoachFirstName", data.data.firstName);
              localStorage.setItem("CoachLastName", data.data.lastName);
              localStorage.setItem("CoachEmail", data.data.email);

              localStorage.setItem("CAMenuHome", true);

              window.location = "/CoachDashboard";
            }
          }
        })
        .catch((error) => {
          console.log("Error : ", error);
          this.setState({
            OpenSnackBar: true,
            Message: "Error Occur",
            OpenLoader: false,
          });
        });
    } else {
      this.setState({
        OpenSnackBar: true,
        Message: "Please Enter Required Field",
      });
    }
  };

  render() {
    let state = this.state;
    return (
      <div className="SignUp-Container">
        <div className="SignUp-SubContainer">
          <div className="Header">
            <AppBar position="static" style={{ backgroundColor: "#202020" }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  style={{
                    flexGrow: 3,
                    display: "flex",
                    padding: "5px 0 0 200px",
                    boxSizing: "border-box",
                  }}
                >
                  IndiaPlays Sports &nbsp;
                  <div style={{ margin: "0px 0 0 0" }}>
                    <SportsIcon />
                  </div>
                </Typography>
                <TextField
                  error={state.SignInEmailFlag}
                  className="TextField"
                  placeholder="Email"
                  name="SignInEmail"
                  variant="outlined"
                  size="small"
                  style={{
                    margin: "10px 10px",
                    width: 200,
                  }}
                  value={state.SignInEmail}
                  onChange={this.handleChange}
                />
                <TextField
                  error={state.SignInPasswordFlag}
                  className="TextField"
                  placeholder="Password"
                  variant="outlined"
                  type="password"
                  name="SignInPassword"
                  size="small"
                  style={{
                    margin: "10px 0px",
                    width: 200,
                  }}
                  value={state.SignInPassword}
                  onChange={this.handleChange}
                />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "green",
                    width: 100,
                    margin: "10px 10px",
                    color: "white",
                  }}
                  onClick={() => {
                    this.handleSignInSubmit();
                  }}
                >
                  Sign In
                </Button>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Body">
            <div className="Sub-Body1">
              <div className="Sub-Sub-Body1">
                <div className="Sub-Sub-Body1-Header">
                  <b>KHELEGA INDIA TO JITEGA INDIA</b>
                </div>
                <div className="Sub-Sub-Body1-Image">
                  <img src={Logo} alt="Home Icon" className="HomeImage" />
                </div>
              </div>
              <div className="Sub-Sub-Body2">
                <div className="Sub-Sub-Body2-Header">Sign Up</div>
                <div className="Sub-Sub-Body2-Form">
                  <div className="Sub-Form1">
                    <TextField
                      error={state.FirstNameFlag}
                      className="TextField"
                      placeholder="First Name"
                      variant="outlined"
                      size="small"
                      name="FirstName"
                      style={{ margin: "0px 10px 0px 0px" }}
                      value={state.FirstName}
                      onChange={this.handleChange}
                    />
                    <TextField
                      error={state.LastNameFlag}
                      className="TextField"
                      placeholder="Last Name"
                      variant="outlined"
                      size="small"
                      style={{ margin: "0px 10px 0px 0px" }}
                      name="LastName"
                      value={state.LastName}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="Sub-Form2">
                    <TextField
                      error={state.SignUpEmailFlag}
                      className="TextField"
                      placeholder="Your Email"
                      variant="outlined"
                      size="small"
                      name="SignUpEmail"
                      style={{ margin: "10px 0px", width: 430 }}
                      value={state.SignUpEmail}
                      onChange={this.handleChange}
                    />
                    <TextField
                      error={state.SignUpPasswordFlag}
                      className="TextField"
                      placeholder="Password"
                      variant="outlined"
                      size="small"
                      type="password"
                      name="SignUpPassword"
                      style={{ margin: "10px 0px", width: 430 }}
                      value={state.SignUpPassword}
                      onChange={this.handleChange}
                    />
                    <TextField
                      error={state.SignUpConfirmPasswordFlag}
                      className="TextField"
                      placeholder="Confirm Password"
                      variant="outlined"
                      size="small"
                      type="password"
                      name="SignUpConfirmPassword"
                      style={{ margin: "10px 0px", width: 430 }}
                      value={state.SignUpConfirmPassword}
                      onChange={this.handleChange}
                    />
                    {state.Role === "admin" ? (
                      <TextField
                        error={state.MasterPasswordFlag}
                        className="TextField"
                        placeholder="Master Password"
                        variant="outlined"
                        size="small"
                        name="MasterPassword"
                        type="password"
                        style={{ margin: "10px 0px", width: 430 }}
                        value={state.MasterPassword}
                        onChange={this.handleChange}
                      />
                    ) : null}
                    <RadioGroup
                      //   aria-label="gender"
                      name="Role"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        // border: "0.5px solid lightgrey",
                        padding: "0 0 0 18px",
                      }}
                      value={state.Role}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        value="player"
                        control={<Radio />}
                        label="Player"
                      />
                      <FormControlLabel
                        value="admin"
                        control={<Radio />}
                        label="Admin"
                      />
                    </RadioGroup>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#06C400",
                        width: 430,
                        margin: "10px 0 10px 0",
                        color: "white",
                      }}
                      onClick={() => {
                        this.handleSignUpSubmit();
                      }}
                    >
                      Sign Up
                    </Button>
                    {/* <Button
                      className="text-primary"
                      style={{ width: 430 }}
                      onClick={() => {
                        window.location.href = "/ForgetPassword";
                      }}
                    >
                      Forget Password
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="Sub-Body2">
              Contact IndiaPlays Sports Customer Care Number Anytime At
              1234567890
            </div> */}
            <div
              className="Sub-Body2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#202020",
              }}
            >
              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                Contact IndiaPlays Sports Customer Care Number Anytime At
                1234567890
              </div>

              <div style={{ margin: "auto" }}>
                <Button
                  className="text-light"
                  style={{ width: 430 }}
                  onClick={() => {
                    window.location.href = "/AboutUs";
                  }}
                >
                  About Us
                </Button>
                <Button
                  className="text-light"
                  style={{ width: 430 }}
                  onClick={() => {
                    window.location.href = "/ContactUs";
                  }}
                >
                  Contact Us
                </Button>
                  
              </div>
            </div>
          </div>
        </div>
        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={state.OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={state.Message}
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={this.handleSnackBarClose}
              >
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleSnackBarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}
