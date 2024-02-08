import React, { Component } from "react";
import "./CustomerHome.scss";
import { CustomerDataServices } from "../../services/CustomerDataServices";
import { VendorDataServices } from "../../services/VendorDataServices";
import Pagination from "@material-ui/lab/Pagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";

export default class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserID: Number(localStorage.getItem("PlayerID")),
      VenueID: 0,
      VenueOwnerID: 0,
      VenueName: "",
      Location: "",
      OpenTime: "",
      Closetime: "",
      Date: "",
      StartTime: "",
      EndTime: "",
      CoachID: 0,
      CoachName: "",
      //
      DateFlag: false,
      StartTimeFlag: false,
      EndTimeFlag: false,
      CoachNameFlag: false,
      //
      Message: "",
      OpenSnackBar: false,
      OpenLoader: false,
      //
      PageNumber: 1,
      TotalPages: 0,
      Type: "all",
      //
      rows: [],
      coachList: [],
    };
  }

  componentWillMount() {
    console.log("Component will mount calling ... ");
    this.GetAllVenueDetails();
    this.GetCoachList();
  }

  GetAllVenueDetails = () => {
    CustomerDataServices.GetAllVenueDetails()
      .then((data) => {
        console.log("GetAllVenueDetails Data : ", data);
        this.setState({
          rows: data.data.reverse(),
        });
      })
      .catch((error) => {
        console.log("GetAllVenueDetails Error : ", error);
        this.state({ OpenSnackBar: true, Message: "Something went wrong" });
      });
  };

  GetCoachList = () => {
    CustomerDataServices.GetCoachList()
      .then((data) => {
        console.log("GetCoachList Data : ", data);
        this.setState({
          coachList: data.data.reverse(),
        });
      })
      .catch((error) => {
        console.log("GetCoachList Error : ", error);
        this.state({ OpenSnackBar: true, Message: "Something went wrong" });
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, "Value : ", value)
    );

    if (name === "SeatClass") {
      if (value === "business") {
        this.setState({
          SportPriceOperational:
            Number(this.state.SportPriceOperational) + 1000,
        });
      } else {
        this.setState({ SportPriceOperational: this.state.SportPrice });
      }
    }
  };

  handleSelectDate = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, "Value : ", value)
    );

    this.AvailableSeat(value);
  };

  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      OpenTicketBookingModel: false,
    });
  };

  handleClose1 = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      OpenGetwayModel: false,
    });
  };

  Validation = () => {
    this.setState({
      DateFlag: false,
      StartTimeFlag: false,
      EndTimeFlag: false,
    });

    let Value = true;

    if (this.state.Date === "") {
      this.setState({ DateFlag: true });
      Value = false;
    }
    if (this.state.StartTime === "") {
      this.setState({ StartTimeFlag: true });
      Value = false;
    }
    if (this.state.EndTime === "") {
      this.setState({ EndTimeFlag: true });
      Value = false;
    }

    return Value;
  };

  handleAddBooking = () => {
    if (this.Validation()) {
      console.log("Validation Validation");
      let data = {
        userID: this.state.UserID,
        venueID: this.state.VenueID,
        venueOwnerID: this.state.VenueOwnerID,
        venueName: this.state.VenueName,
        location: this.state.Location,
        openTime: this.state.OpenTime,
        closeTime: this.state.Closetime,
        bookingDate: this.state.Date,
        startTime: this.state.StartTime,
        endTime: this.state.EndTime,
        coachID: this.state.CoachID,
        coachName: this.state.CoachID === 0 ? "NA" : this.state.CoachName,
        venueStatus: "PENDING",
        coachStatus: this.state.CoachID === 0 ? "NA" : "PENDING",
      };
      CustomerDataServices.AddVenueBooking(data)
        .then((data) => {
          console.log("AddVenueBooking Data : ", data);
          this.setState({
            OpenTicketBookingModel: false,
            Message: data.message,
            OpenSnackBar: true,
          });
        })
        .catch((error) => {
          console.log("AddVenueBooking Error : ", error);
          this.setState({
            Message: "Something went wrong",
            OpenSnackBar: true,
          });
        });
    } else {
      console.log("Validation Failed");
      this.setState({
        OpenSnackBar: true,
        Message: "Please Enter Required Field",
      });
    }
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  CheckValidity = () => {
    console.log("CheckValidity Calling....");
    let value = false;
    let state = this.state;
    this.setState({
      FirstNameFlag: false,
      LastNameFlag: false,
      AddressFlag: false,
      CityFlag: false,
      StateFlag: false,
      ZipCodeFlag: false,
      HomePhoneFlag: false,
      PersonalNumberFlag: false,
      EmailFlag: false,
      DateOfBirthFlag: false,
    });

    if (state.FirstName === "" || state.FirstName === null) {
      this.setState({ FirstNameFlag: true });
      value = true;
    }

    if (state.LastName === "" || state.LastName === null) {
      this.setState({ LastNameFlag: true });
      value = true;
    }

    if (state.Address === "" || state.Address === null) {
      this.setState({ AddressFlag: true });
      value = true;
    }

    if (state.City === "" || state.City === null) {
      this.setState({ CityFlag: true });
      value = true;
    }

    if (state.State === "" || state.State === null) {
      this.setState({ StateFlag: true });
      value = true;
    }

    if (state.ZipCode === "" || state.ZipCode === null) {
      this.setState({ ZipCodeFlag: true });
      value = true;
    }

    if (state.HomePhone === "" || state.HomePhone === null) {
      this.setState({ HomePhoneFlag: true });
      value = true;
    }

    if (state.PersonalNumber === "" || state.PersonalNumber === null) {
      this.setState({ PersonalNumberFlag: true });
      value = true;
    }

    if (state.Email === "" || state.Email === null) {
      this.setState({ EmailFlag: true });
      value = true;
    }

    if (state.DateOfBirth === "" || state.DateOfBirth === null) {
      this.setState({ DateOfBirthFlag: true });
      value = true;
    }

    return value;
  };

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    this.GetSportDetails(value);
  };

  handleEditBooking = (data) => {
    debugger;
    console.log("Venue Data : ", data);
    this.setState({
      VenueID: data.venueID,
      VenueOwnerID: data.venueUserID,
      VenueName: data.venueName,
      Location: data.location,
      OpenTime: data.openTime,
      Closetime: data.closeTime,
      OpenTicketBookingModel: true,
    });
  };

  handleSelectCoach = () => {
    var e = document.getElementById("chooseCoach");
    console.log("handleSelectCoach value : ", e.value);
    console.log("handleSelectCoach Data : ", e.options[e.selectedIndex].text);
    this.setState({
      CoachID: e.value,
      CoachName: e.options[e.selectedIndex].text,
    });
  };

  render() {
    let state = this.state;
    let self = this;
    console.log("State : ", state);
    return (
      <div className="Customer-Container">
        <div className="Customer-Container-Header">Home</div>
        <div className="Customer-Container-Body">
          <TableContainer component={Paper}>
            <Table className="" aria-label="simple table">
              <TableHead
                style={{
                  width: "100%",
                  backgroundColor: "#202020",
                }}
              >
                <TableRow style={{ flex: 10 }}>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    Venue ID
                  </TableCell>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    Venue Name
                  </TableCell>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    Location
                  </TableCell>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    Open Time
                  </TableCell>
                  <TableCell align="left" style={{ flex: 1, color: "white" }}>
                    Close Time
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ flex: 1, color: "white" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(state.rows) &&
                  state.rows.length > 0 &&
                  state.rows.map((row) => (
                    <TableRow
                      key={row.venueID}
                      style={{ flex: 10, margin: 8, boxSizing: "border-box" }}
                    >
                      <TableCell align="left" scope="row" style={{ flex: 2 }}>
                        {row.venueID}
                      </TableCell>
                      <TableCell align="left" scope="row" style={{ flex: 2 }}>
                        {row.venueName}
                      </TableCell>
                      <TableCell align="left" scope="row" style={{ flex: 2 }}>
                        {row.location}
                      </TableCell>
                      <TableCell align="left" style={{ flex: 2 }}>
                        {row.openTime}
                      </TableCell>
                      <TableCell align="left" style={{ flex: 2 }}>
                        {row.closeTime}&nbsp;
                      </TableCell>
                      <TableCell align="left" style={{ flex: 2 }}>
                        <div
                          className="btn btn-primary"
                          onClick={() => {
                            this.handleEditBooking(row);
                          }}
                        >
                          Book
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="Customer-Container-Footer">
          {/* <Pagination
            count={this.state.TotalPages}
            Page={this.state.PageNumber}
            onChange={this.handlePaging}
            variant="outlined"
            shape="rounded"
            color="secondary"
          /> */}
        </div>

        <Modal
          open={this.state.OpenTicketBookingModel}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="Model-Create-Ticket"
        >
          <Fade in={this.state.OpenTicketBookingModel}>
            <div className="Model-Create-Book-Main">
              <div className="Model-Create-Ticket-Header">
                <div className="Model-Create-Ticket-Header-Text">
                  Add Booking
                </div>
              </div>
              <div className="Model-Create-Ticket-Body">
                <div className="Model-Create-Ticket-Body-Row">
                  Venue ID :
                  <div style={{ color: "red", fontSize: 18 }}>
                    &nbsp;{state.VenueID}
                  </div>
                </div>
                <div className="Model-Create-Ticket-Body-Row">
                  Venue Name :{" "}
                  <div style={{ color: "red", fontSize: 18 }}>
                    &nbsp;{state.VenueName}
                  </div>
                </div>
                <div className="Model-Create-Ticket-Body-Row">
                  Location
                  <div style={{ color: "red", fontSize: 18 }}>
                    &nbsp;{state.Location}
                  </div>
                </div>
                <div className="Model-Create-Ticket-Body-Row">
                  Open Time
                  <div style={{ color: "red", fontSize: 18 }}>
                    &nbsp;
                    {state.OpenTime}
                  </div>
                </div>
                <div className="Model-Create-Ticket-Body-Row">
                  Close Time{" "}
                  <div style={{ color: "red", fontSize: 18 }}>
                    &nbsp;{state.Closetime}
                  </div>
                </div>
                <div className="Model-Create-Ticket-Body-Row">
                  <div style={{ width: 100 }}>Date :</div>
                  <TextField
                    variant="outlined"
                    // label=""
                    name="Date"
                    type="date"
                    style={{ margin: "15px 10px 15px 10px", width: "60%" }}
                    size="small"
                    error={state.DateFlag}
                    value={state.Date}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="Model-Create-Ticket-Body-Row">
                  <div style={{ width: 100 }}>Start Time :</div>
                  <TextField
                    variant="outlined"
                    // label=""
                    name="StartTime"
                    type="time"
                    style={{ margin: "15px 10px 15px 10px", width: "60%" }}
                    size="small"
                    error={state.StartTimeFlag}
                    value={state.StartTime}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="Model-Create-Ticket-Body-Row">
                  <div style={{ width: 100 }}>End Time :</div>
                  <TextField
                    variant="outlined"
                    // label=""
                    name="EndTime"
                    type="time"
                    style={{ margin: "15px 10px 15px 10px", width: "60%" }}
                    size="small"
                    error={state.EndTimeFlag}
                    value={state.EndTime}
                    onChange={this.handleSelectDate}
                  />
                </div>
                <div className="Model-Create-Ticket-Body-Row">
                  <div style={{ width: 100 }}>Select Coach</div>
                  <div
                    className="dropdown"
                    style={{ margin: "15px 10px 15px 10px", width: "60%" }}
                  >
                    <select
                      className="form-control"
                      id="chooseCoach"
                      value={state.CoachID}
                      onChange={(e) => {
                        this.handleSelectCoach(e);
                      }}
                    >
                      <option value={0}>Select coach</option>
                      {Array.isArray(state.coachList) &&
                      state.coachList.length > 0
                        ? state.coachList.map(function (data, index) {
                            return (
                              <option value={data.userID}>
                                {data.fullName}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                </div>
              </div>
              <div className="Model-Create-Ticket-Footer">
                <Button
                  // variant="contained"
                  style={{
                    backgroundColor: "red",
                    width: 100,
                    margin: "0px 0 0 2px",
                    color: "white",
                  }}
                  onClick={() => {
                    this.handleClose();
                  }}
                >
                  Cancel Booking
                </Button>
                <Button
                  // disabled={!state.IsPayment}
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "green",
                    width: 100,
                    margin: "0px 0 0 2px",
                    color: "white",
                  }}
                  onClick={() => {
                    this.handleAddBooking();
                  }}
                >
                  Add Booking
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
