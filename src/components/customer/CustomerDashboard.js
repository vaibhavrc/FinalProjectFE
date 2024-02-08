import React, { Component } from "react";
import "./CustomerDashboard.css";
import { CustomerDataServices } from "../../services/CustomerDataServices";
import { FeedbackDataServices } from "../../services/FeedbackDataServices";
import Default from "./../../asserts/Default.png";
import CustomerHome from "./CustomerHome.js";
import MyPackages from "./MyPackages";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import SportsIcon from "@material-ui/icons/Sports";
import Popper from "@material-ui/core/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserID: Number(localStorage.getItem("PlayerID")),
      FirstName: localStorage.getItem("PlayerFirstName"),
      LastName: localStorage.getItem("PlayerLastName"),
      Address: "",
      City: "",
      State: "",
      ZipCode: "",
      PersonalNumber: "",
      AlternatePhoneNumber: "",
      Email: localStorage.getItem("PlayerEmail"),
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
      //
      TotalPages: 0,
      TotalRecords: 0,
      //
      MenuOpen: false,
      OpenLoader: false,
      OpenSnackBar: false,
      OpenAddressModel: false,
      OpenFeedback: false,
      IsUpdate: false,

      OpenHome: true,
      OpenMyPackages: false,
      //
      rows: [],
    };
  }

  componentWillMount() {
    console.log("Component will mount calling ... ");

    this.setState({
      OpenHome: localStorage.getItem("PMenuHome") === "true" ? true : false,
      OpenMyPackages:
        localStorage.getItem("PMenuMyPackages") === "true" ? true : false,
    });

    this.GetProfileDetailsByID();
  }

  GetProfileDetailsByID = () => {
    let state = this.state;
    CustomerDataServices.GetProfileDetailsByID(this.state.UserID)
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

  AddProfileDetails = () => {
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

      CustomerDataServices.AddProfileDetails(data)
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

  UpdateProfileDetails = () => {
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

      CustomerDataServices.UpdateProfileDetails(data)
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

  CreateTicketValidity = () => {
    console.log("CreateTicketValidity Calling...");
    let state = this.state;
    let Value = false;
    this.setState({
      PlanTypeFlag: false,
      RaiseTypeFlag: false,
      SummaryFlag: false,
      DescriptionFlag: false,
    });

    if (state.Summary === "") {
      this.setState({ SummaryFlag: true });
      Value = true;
    }

    if (state.Description === "") {
      this.setState({ DescriptionFlag: true });
      Value = true;
    }

    return Value;
  };

  CheckValidity = () => {
    let state = this.state;
    let Value = false;
    this.setState({
      FirstNameFlag: false,
      LastNameFlag: false,
      AddressFlag: false,
      CityFlag: false,
      StateFlag: false,
      ZipCodeFlag: false,
      PersonalNumberFlag: false,
      PersonalNumberFlag: false,
      EmailFlag: false,
      DateOfBirthFlag: false,
      ProductImageFlag: false,
    });

    if (state.DateOfBirth === "" || state.DateOfBirth === null) {
      this.setState({ DateOfBirthFlag: true });
      Value = true;
    }

    if (state.Email === "" || state.Email === null) {
      this.setState({ EmailFlag: true });
      Value = true;
    }

    if (state.PersonalNumber === "" || state.PersonalNumber === null) {
      this.setState({ PersonalNumberFlag: true });
      Value = true;
    }

    if (state.PersonalNumber === "" || state.PersonalNumber === null) {
      this.setState({ PersonalNumberFlag: true });
      Value = true;
    }

    if (state.ZipCode === "" || state.ZipCode === null) {
      this.setState({ ZipCodeFlag: true });
      Value = true;
    }

    if (state.State === "" || state.State === null) {
      this.setState({ StateFlag: true });
      Value = true;
    }

    if (state.City === "" || state.City === null) {
      this.setState({ CityFlag: true });
      Value = true;
    }

    if (state.Address === "" || state.Address === null) {
      this.setState({ AddressFlag: true });
      Value = true;
    }

    if (state.LastName === "" || state.LastName === null) {
      this.setState({ LastNameFlag: true });
      Value = true;
    }

    if (state.FirstName === "" || state.FirstName === null) {
      this.setState({ FirstNameFlag: true });
      Value = true;
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
    console.log("Handle Open Home Calling ... ");
    localStorage.setItem("PMenuHome", true);
    localStorage.setItem("PMenuMyPackages", false);
    await this.setState({
      OpenHome: true,
      OpenMyPackages: false,
    });
  };

  handleOpenMyPackages = async () => {
    console.log("Handle Open Home Calling ... ");
    localStorage.setItem("PMenuHome", false);
    localStorage.setItem("PMenuMyPackages", true);
    
    await this.setState({
      OpenHome: false,
      OpenMyPackages: true,
    });
  };

  handleOpenFeedbackModel = () => {
    this.setState({ OpenAddressModel: true });
  };

  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      open: false,
      OpenAddressModel: false,
      OpenFeedback: false,
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, "Value : ", value)
    );
  };

  handleCapture = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ Image: reader.result });
    };
    reader.readAsDataURL(event.target.files[0]);
    this.setState({ File: event.target.files[0] });
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
    localStorage.removeItem("CustomerToken");
    localStorage.removeItem("CustomerID");
    localStorage.removeItem("CustomerFullName");
    localStorage.removeItem("CustomerEmail");
    //
    localStorage.removeItem("PMenuHome");
    localStorage.removeItem("PMenuMyPackages");
    //
    this.props.history.push("/");
  };

  handleOpenAddressModelModel = async () => {
    this.setState({ OpenAddressModel: true });
  };

  handleOpenHomeBody = () => {
    let state = this.state;
    return (
      <div className="Customer-Home-Container">
        <div className="Customer-Home-SubContainer">
          <CustomerHome parentCallback={this.handleCallback} />
        </div>
      </div>
    );
  };

  handleOpenMyPackagesBody = () => {
    let state = this.state;
    return (
      <div className="Customer-MyPackages-Container">
        <MyPackages />
      </div>
    );
  };

  handleChangeRating = (e) => {
    const { value } = e.target;
    this.setState({ Rating: value }, console.log("Value : ", value));
  };

  render() {
    let state = this.state;
    let self = this;
    console.log("state : ", state);
    return (
      <div className="CustomerDashboard-Container">
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
                  style={{ flex: 4, margin: "0 0 0 100px" }}
                >
                  Player DashBoard
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    flexGrow: 2,
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
                                User ID : {localStorage.getItem("PlayerID")}
                              </Typography>
                              <Typography style={{ padding: 5 }}>
                                {localStorage.getItem("PlayerFirstName") +
                                  " " +
                                  localStorage.getItem("PlayerLastName")}
                              </Typography>
                              <Typography style={{ padding: 5 }}>
                                {localStorage.getItem("PlayerEmail")}
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
              <div className={state.MenuOpen ? "SubBody11" : "SubBody12"}>
                <div
                  className={state.OpenHome ? "NavButton1" : "NavButton2"}
                  onClick={this.handleOpenHome}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">Home</div>
                  ) : null}
                </div>

                <div
                  className={state.OpenMyPackages ? "NavButton1" : "NavButton2"}
                  onClick={this.handleOpenMyPackages}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <BookmarkIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">My Booking</div>
                  ) : null}
                </div>
              </div>
              <div className={state.MenuOpen ? "SubBody21" : "SubBody22"}>
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      // height: state.OpenHome ? "100%" : "92%",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {state.OpenHome
                      ? this.handleOpenHomeBody()
                      :  state.OpenMyPackages
                      ? this.handleOpenMyPackagesBody()
                      : null}
                  </div>
                </div>
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
                    error={state.LastNameFlag}
                    onChange={this.handleChange}
                    value={state.LastName}
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
                    this.handleClose();
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
