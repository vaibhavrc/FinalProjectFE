import React, { Component } from "react";
import "./VendorDashboard.css";
import { CustomerDataServices } from "../../services/CustomerDataServices";
import History from "./History";
import ActiveComplaints from "./ActiveComplaints";
import TechnicianHome from "./VendorHome.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SportsIcon from "@material-ui/icons/Sports";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import Paper from "@material-ui/core/Paper";

import Popper from "@material-ui/core/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";

export default class VendorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserID: Number(localStorage.getItem("VenueID")),
      FirstName: localStorage.getItem("VenueFirstName"),
      LastName: localStorage.getItem("VenueLastName"),
      Address: "",
      City: "",
      State: "",
      ZipCode: "",
      PersonalNumber: "",
      AlternatePhoneNumber: "",
      Email: localStorage.getItem("VenueEmail"),
      //
      FirstNameFlag: false,
      LastNameFlag: false,
      AddressFlag: false,
      CityFlag: false,
      StateFlag: false,
      ZipCodeFlag: false,
      PersonalNumberFlag: false,
      AlternatePhoneNumberFlag: false,
      EmailFlag: false,
      //
      Message: "",
      //
      NumberOfRecordPerPage: 6,
      //
      PageNumber: 1,
      JobPageNumber: 1,
      ApplicationPageNumber: 1,
      FeedbackPageNumber: 1,
      //
      TotalPages: 0,
      TotalRecords: 0,

      open: false,
      open1: false,
      MenuOpen: false,
      OpenLoader: false,
      OpenSnackBar: false,
      IsUpdate: false,

      OpenHome: true,

      OpenAddressModel: false,
    };
  }

  componentWillMount() {
    console.log("Component will mount calling ... ");
    this.setState({
      OpenHome: localStorage.getItem("VMenuHome") === "true" ? true : false,
    });
    this.GetProfileDetailsByID();
  }

  GetProfileDetailsByID = async () => {
    let state = this.state;
    await CustomerDataServices.GetProfileDetailsByID(this.state.UserID)
      .then((data) => {
        console.log("GetProfileDetailsByID Data : ", data);
        if (data.isSuccess) {
          localStorage.setItem("PlayerFirstName", data.data.firstName);
          localStorage.setItem("PlayerLastName", data.data.lastName);
          this.setState({
            UserID: data.data.userID,
            FirstName: data.data.firstName,
            LastName: data.data.lastName,
            Address: data.data.address,
            City: data.data.city,
            State: data.data.state,
            ZipCode: data.data.zipCode,
            PersonalNumber: data.data.personalNumber,
            Email: data.data.emailAddress,
            AlternatePhoneNumber: data.data.alternatePhoneNumber,
            IsUpdate: true,
          });
        }
      })
      .catch((error) => {
        console.log("GetCustomerInfomation Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something went wrong",
        });
      });
  };

  AddProfileDetails = async () => {
    if (this.Validation()) {
      console.log("Validation Successfully");
      let data = {
        userID: this.state.UserID,
        firstName: this.state.FirstName,
        lastName: this.state.LastName,
        address: this.state.Address,
        city: this.state.City,
        state: this.state.State,
        zipCode: this.state.ZipCode,
        personalNumber: this.state.PersonalNumber,
        alternatePhoneNumber: this.state.AlternatePhoneNumber,
        emailAddress: this.state.Email,
      };

      await CustomerDataServices.AddProfileDetails(data)
        .then((data) => {
          console.log("AddProfileDetails Data : ", data);
          this.setState({
            OpenSnackBar: true,
            Message: data.message,
            OpenAddressModel: false,
          });
        })
        .catch((error) => {
          console.log("AddProfileDetails Error : ", error);
          this.setState({
            OpenSnackBar: true,
            Message: "Something went wrong",
          });
        });
    } else {
      console.log("Validation Failed");
    }
  };

  UpdateProfileDetails = async () => {
    if (this.Validation()) {
      console.log("Validation Successfully");
      let data = {
        userID: this.state.UserID,
        firstName: this.state.FirstName,
        lastName: this.state.LastName,
        address: this.state.Address,
        city: this.state.City,
        state: this.state.State,
        zipCode: this.state.ZipCode,
        personalNumber: this.state.PersonalNumber,
        alternatePhoneNumber: this.state.AlternatePhoneNumber,
        emailAddress: this.state.Email,
      };

      await CustomerDataServices.UpdateProfileDetails(data)
        .then((data) => {
          console.log("AddProfileDetails Data : ", data);
          this.setState({
            OpenSnackBar: true,
            Message: data.message,
            OpenAddressModel: false,
          });
          this.GetProfileDetailsByID();
        })
        .catch((error) => {
          console.log("AddProfileDetails Error : ", error);
          this.setState({
            OpenSnackBar: true,
            Message: "Something went wrong",
          });
        });
    } else {
      console.log("Validation Failed");
    }
  };

  Validation = () => {
    let State = this.state;
    this.setState({
      FirstNameFlag: false,
      LastNameFlag: false,
      AddressFlag: false,
      CityFlag: false,
      StateFlag: false,
      ZipCodeFlag: false,
      PersonalNumberFlag: false,
      AlternatePhoneNumberFlag: false,
      EmailFlag: false,
    });

    let Value = true;
    if (State.FirstName === "") {
      this.setState({ FirstNameFlag: true });
      Value = false;
    }
    if (State.LastName === "") {
      this.setState({ LastNameFlag: true });
      Value = false;
    }
    if (State.Address === "") {
      this.setState({ AddressFlag: true });
      Value = false;
    }
    if (State.City === "") {
      this.setState({ CityFlag: true });
      Value = false;
    }
    if (State.State === "") {
      this.setState({ StateFlag: true });
      Value = false;
    }
    if (State.ZipCode === "") {
      this.setState({ ZipCodeFlag: true });
      Value = false;
    }
    if (State.PersonalNumber === "") {
      this.setState({ PersonalNumberFlag: true });
      Value = false;
    }
    if (State.AlternatePhoneNumber === "") {
      this.setState({ AlternatePhoneNumberFlag: true });
      Value = false;
    }

    return Value;
  };

  handleMenuButton = (e) => {
    console.log("Handle Menu Button Calling ... ");
    this.setState({
      MenuOpen: !this.state.MenuOpen,
    });
  };

  handleOpenHome = async () => {
    console.log("Handle Open Calling ... ");
    localStorage.setItem("TMenuHome", true);
    localStorage.setItem("TMenuActiveComplaints", false);
    localStorage.setItem("TMenuHistory", false);
    await this.setState({
      open: false,
      OpenHome: true,
      OpenActiveComplaints: false,
      OpenHistory: false,
    });
  };

  handleOpenActiveComplaints = async () => {
    console.log("Handle Open Calling ... ");
    localStorage.setItem("TMenuHome", false);
    localStorage.setItem("TMenuActiveComplaints", true);
    localStorage.setItem("TMenuHistory", false);
    await this.setState({
      open: false,
      OpenHome: false,
      OpenActiveComplaints: true,
      OpenHistory: false,
    });
  };

  handleOpenHistory = async () => {
    console.log("Handle Open Calling ... ");
    localStorage.setItem("TMenuHome", false);
    localStorage.setItem("TMenuActiveComplaints", false);
    localStorage.setItem("TMenuHistory", true);
    await this.setState({
      open: false,
      OpenHome: false,
      OpenActiveComplaints: false,
      OpenHistory: true,
    });
  };

  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      open: false,
      OpenHome: false,
      OpenActiveComplaints: false,
      OpenHistory: false,
    });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handleRadioChange = (event) => {
    console.log("Handle Redio Change Calling...");
    this.setState({ ProjectStatus: event.target.value });
  };

  handleChanges = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, "Value : ", value)
    );
  };

  handleActiveChange = (e) => {
    console.log(" Checked Status : ", e.target.checked);
    this.setState({ IsActive: e.target.checked });
  };

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
  };

  handleField = (event) => {
    console.log("Selected Job Field : ", event.target.value);
    this.setState({ JobField: event.target.value });
  };

  SignOut = async () => {
    //
    localStorage.removeItem("TechnicianID");
    localStorage.removeItem("TechnicianFullName");
    localStorage.removeItem("TechnicianEmail");
    localStorage.removeItem("TechnicianToken");
    //
    localStorage.removeItem("TMenuHome");
    localStorage.removeItem("TMenuActiveComplaints");
    localStorage.removeItem("TMenuHistory");
    //
    this.props.history.push("/");
  };

  handleOpenHomeBody = () => {
    let state = this.state;
    return (
      <div className="Technician-Home-Container">
        <div className="Technician-Home-SubContainer">
          <TechnicianHome />
        </div>
      </div>
    );
  };

  handleOpenActiveComplaintsBody = () => {
    let state = this.state;
    return (
      <div className="Technician-ActiveComplaints-Container">
        <ActiveComplaints />
      </div>
    );
  };

  handleOpenHistoryBody = () => {
    let state = this.state;
    return (
      <div className="Technician-History-Container">
        <History />
      </div>
    );
  };

  handleOpenFeedbackModel = () => {
    this.setState({ OpenAddressModel: true });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, "Value : ", value)
    );
  };

  render() {
    let state = this.state;
    let self = this;
    console.log("state : ", state);
    return (
      <div className="VenueDashboard-Container">
        <div className="Sub-Container">
          <div className="Header">
            <AppBar position="static" style={{ backgroundColor: "#0000ff" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  className=""
                  color="inherit"
                  onClick={this.handleMenuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  style={{ flex: 1.5, margin: "0 0 0 100px" }}
                >
                  Venue DashBoard
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    flexGrow: 3,
                    display: "flex",
                    padding: "5px 0 0 190px",
                    boxSizing: "border-box",
                  }}
                >
                  IndiaPlays Sports &nbsp;
                  <div style={{ margin: "0px 0 0 0" }}>
                    <SportsIcon />
                  </div>
                </Typography>
                <Button
                  variant="outlined"
                  style={{
                    color: "white",
                    border: "1px solid white",
                    margin: "0 50px 0 0",
                  }}
                  onClick={() => {
                    this.handleOpenFeedbackModel();
                  }}
                >
                  <PersonIcon />
                </Button>
                <PopupState variant="popper" popupId="demo-popup-popper">
                  {(popupState) => (
                    <div>
                      <IconButton
                        edge="start"
                        color="inherit"
                        {...bindToggle(popupState)}
                      >
                        <AccountCircleIcon fontSize="large" />
                      </IconButton>

                      <Popper
                        {...bindPopper(popupState)}
                        transition
                        style={{ zIndex: 1234 }}
                      >
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper
                              style={{
                                padding: 15,
                                width: "fit-content",
                                height: "fit-content",
                                textAlign: "center",
                                fontFamily: "Roboto",
                                backgroundColor: "#202020",
                                color: "white",
                              }}
                            >
                              <IconButton edge="start" color="inherit">
                                <AccountBoxIcon fontSize="large" />
                              </IconButton>
                              <Typography style={{ padding: 5 }}>
                                Venue ID : {localStorage.getItem("VenueID")}
                              </Typography>
                              <Typography style={{ padding: 5 }}>
                                {localStorage.getItem("VenueFirstName") +
                                  " " +
                                  localStorage.getItem("VenueLastName")}
                              </Typography>
                              <Typography style={{ padding: 5 }}>
                                {localStorage.getItem("VenueEmail")}
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  this.SignOut();
                                }}
                              >
                                <IconButton edge="start" color="inherit">
                                  <ExitToAppIcon fontSize="small" />
                                </IconButton>
                                <div>Sign Out</div>
                              </div>
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </div>
                  )}
                </PopupState>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Body">
            <div className="Sub-Body">
              <div className={state.MenuOpen ? "SubBody111" : "SubBody122"}>
                <div
                  className={state.OpenHome ? "NavButton11" : "NavButton22"}
                  onClick={this.handleOpenHome}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">Home</div>
                  ) : null}
                </div>
              </div>
              <div className={state.MenuOpen ? "SubBody211" : "SubBody222"}>
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {state.OpenHome
                      ? this.handleOpenHomeBody()
                      : state.OpenActiveComplaints
                      ? this.handleOpenActiveComplaintsBody()
                      : state.OpenHistory
                      ? this.handleOpenHistoryBody()
                      : null}
                  </div>
                </div>

                <Modal
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  open={this.state.open}
                  onClose={this.handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={this.state.open}>
                    <div
                      style={{
                        backgroundColor: "white",
                        boxShadow: "5",
                        padding: "2px 4px 3px",
                        width: "1000px",
                        height: "630px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Roboto",
                          fontWeight: 500,
                          fontSize: 20,
                          color: "red",
                          margin: "0 0 20px 0",
                        }}
                      >
                        Application ID : {state.ApplicationID}
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div>
                          <div className="Input-Field">
                            <div className="Text">Job ID</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.JobID}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Job Name</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.JobName}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Name</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Name}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Contact</div>

                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Contact}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">EmailID</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.EmailID}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Address</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Address}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Work Experience</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.WorkExperience}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Date Of Birth</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.DateOfBirth}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Passing Year</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.PassingYear}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">PinCode</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Pincode}
                            </div>
                          </div>
                        </div>
                        <div>
                          {/* <div
                              className="Input-Field"
                              style={{ margin: "46px 0" }}
                            ></div> */}
                          <div className="Input-Field">
                            <div className="Text">10th Percentage</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Percentage10}%
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">12th Percentage</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Percentage12}%
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Grad. Aggregation</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.GradAggregation}%
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">College Name</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.CollegeName}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Degree</div>

                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Degree}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Current Status</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.CurrentStatus}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Skill</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Skill}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Age</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Age}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Gender</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.Gender}
                            </div>
                          </div>
                          <div className="Input-Field">
                            <div className="Text">Stream</div>
                            <div
                              style={{
                                color: "blue",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {state.StreamName}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="Input-Field"
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          component="span"
                          style={{ margin: "10px 10px 0 0" }}
                          onClick={() => {
                            this.handleDeleteApplication(state.ApplicationID);
                          }}
                        >
                          Reject Application
                        </Button>
                        <Button
                          variant="outlined"
                          style={{ margin: "10px 0 0 10px" }}
                          onClick={this.handleClose1}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Fade>
                </Modal>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={this.state.OpenAddressModel}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="Model-Create-Ticket"
        >
          <Fade in={this.state.OpenAddressModel}>
            <div className="Model-Create-Ticket-Main">
              <div className="Model-Create-Ticket-Header">
                <div className="Model-Create-Ticket-Header-Text">
                  User Details
                </div>
              </div>
              <div className="Model-Create-Ticket-Body">
                <div>
                  <TextField
                    label="User ID"
                    type="number"
                    name="UserID"
                    style={{ margin: "0 20px 5px 0" }}
                    value={state.UserID}
                  />
                  <TextField
                    label="First Name"
                    type="text"
                    style={{ margin: "0 20px 5px 0" }}
                    name="FirstName"
                    error={state.FirstNameFlag}
                    onChange={this.handleChange}
                    value={state.FirstName}
                  />
                  <TextField
                    label="Last Name"
                    type="text"
                    style={{ margin: "0 20px 5px 0" }}
                    name="LastName"
                    onChange={this.handleChange}
                    value={state.LastName}
                    error={state.LastNameFlag}
                  />
                </div>
                <TextField
                  label="Address"
                  type="text"
                  fullWidth
                  style={{ margin: "0 0 5px 0" }}
                  name="Address"
                  error={state.AddressFlag}
                  value={state.Address}
                  onChange={this.handleChange}
                />
                <div>
                  <TextField
                    label="City"
                    type="text"
                    style={{ margin: "0 20px 5px 0" }}
                    name="City"
                    error={state.CityFlag}
                    value={state.City}
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="State"
                    type="text"
                    style={{ margin: "0 20px 5px 0" }}
                    name="State"
                    error={state.StateFlag}
                    value={state.State}
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Zip Code"
                    type="number"
                    style={{ margin: "0 20px 5px 0" }}
                    name="ZipCode"
                    error={state.ZipCodeFlag}
                    value={state.ZipCode}
                    onChange={this.handleChange}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    label="Personal Number"
                    type="number"
                    style={{ margin: "0 20px 5px 0" }}
                    name="PersonalNumber"
                    error={state.PersonalNumberFlag}
                    value={state.PersonalNumber}
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Alternate Phone Number"
                    type="number"
                    style={{ margin: "0 20px 5px 0", width: 250 }}
                    name="AlternatePhoneNumber"
                    error={state.AlternatePhoneNumberFlag}
                    value={state.AlternatePhoneNumber}
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    style={{ margin: "0 20px 5px 0" }}
                    name="Email"
                    error={state.EmailFlag}
                    value={state.Email}
                    // onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="Model-Create-Ticket-Footer">
                <Button
                  variant="contained"
                  style={{ margin: "10px" }}
                  onClick={() => {
                    this.setState({ OpenAddressModel: false });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#21007F",
                    width: 100,
                    margin: "0px 0 0 10px",
                    color: "white",
                  }}
                  onClick={() => {
                    this.state.IsUpdate
                      ? this.UpdateProfileDetails()
                      : this.AddProfileDetails();
                  }}
                >
                  {this.state.IsUpdate ? <>Update</> : <>Save</>}
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>

        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
          onClick={() => {
            this.setState({ OpenLoader: false });
          }}
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
