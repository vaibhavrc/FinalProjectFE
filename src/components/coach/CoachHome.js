import React, { Component } from "react";
import "./CoachHome.scss";
import { VendorDataServices } from "../../services/VendorDataServices";
import { CoachDataServices } from "../../services/CoachDataServices";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Pagination from "@material-ui/lab/Pagination";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

export default class CoachHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VendorID: 0,
      FirstName: "",
      LastName: "",
      Address: "",
      City: "",
      State: "",
      ZipCode: "",
      HomePhone: "",
      PersonalNumber: "",
      Email: "",
      Gender: "male",
      DateOfBirth: "",
      Position: "",
      //
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
      //
      sportID: 0,
      sportName: "",
      To: "",
      Destination: "",
      sportPrice: "",
      Company: "",
      Time: "",
      sportDescription: "",
      //
      sportNameFlag: false,
      ToFlag: false,
      DestinationFlag: false,
      sportPriceFlag: false,
      CompanyFlag: false,
      TimeFlag: false,
      sportDescriptionFlag: false,
      //
      Message: "",
      OpenSnackBar: false,
      OpenLoader: false,
      //
      PageNumber: 1,
      TotalPage: 0,
      Type: "Nall",
      rows: [],
    };
  }

  componentWillMount() {
    console.log("Component will mount calling ... ");
    this.GetBookingCoachVenueDetailsByID();
  }
  GetBookingCoachVenueDetailsByID = () => {
    CoachDataServices.GetBookingCoachVenueDetailsByID(
      Number(localStorage.getItem("CoachID"))
    )
      .then((data) => {
        // debugger;
        console.log("GetBookingCoachVenueDetailsByID Data : ", data);
        if (data.isSuccess) {
          this.setState({
            rows: data.data,
          });
        }
        this.setState({
          rows: data.data,
          Message: data.message,
          OpenSnackBar: true,
        });
      })
      .catch((error) => {
        console.log("GetBookingCoachVenueDetailsByID Error : ", error);
        this.setState({
          Message: "Something Went Wrong",
          OpenSnackBar: true,
        });
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, "Value : ", value)
    );
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

  handleInfoSubmit = async () => {
    console.log("handleInfoSubmit Calling .... ");
    if (await this.CheckValidity()) {
      this.setState({ Message: "Enter Required Filled", OpenSnackBar: true });
      return;
    }
    let state = this.state;
    // let data = {
    //   userID: state.TechnicianID,
    //   firstName: state.FirstName,
    //   lastName: state.LastName,
    //   address: state.Address,
    //   city: state.City,
    //   state: state.State,
    //   zipCode: state.ZipCode,
    //   homePhone: state.HomePhone,
    //   personalNumber: state.PersonalNumber,
    //   email: state.Email,
    //   gender: state.Gender,
    //   dob: state.DateOfBirth,
    //   position: state.Position,
    // };
    // TechnicianDataServices.UpdateTechnicianAddress(data)
    //   .then((data) => {
    //     // debugger;
    //     console.log("UpdateTechnicianAddress Data : ", data);
    //     this.setState({
    //       Message: data.message,
    //       OpenSnackBar: true,
    //     });
    //   })
    //   .then((error) => {
    //     // debugger;
    //     console.log("UpdateTechnicianAddress Error : ", error);
    //     // this.setState({
    //     //   Message: "Something Went Wrong",
    //     //   OpenSnackBar: true,
    //     // });
    //   });
  };

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    this.GetsportDetails(value);
  };

  UpdateBookingStatus = (_bookingID, _status) => {
    let data = {
      bookingID: _bookingID,
      status: _status,
      coachStatus: true,
      venueStatus: false,
    };

    VendorDataServices.UpdateBookingStatus(data)
      .then((data) => {
        debugger;
        console.log("UpdateBookingStatus data : ", data);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: false,
          Message: data.message,
        });
        this.GetBookingCoachVenueDetailsByID();
      })
      .catch((error) => {
        debugger;
        console.log("UpdateBookingStatus Error : ", error);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: false,
          Message: "Something went wrong",
        });
      });
  };

  render() {
    let state = this.state;
    let self = this;
    console.log("State : ", state);
    return (
      <div className="Vendor-Container">
        <div className="Vendor-Container-Header">Coach Booking</div>
        <div className="Vendor-Container-Body">
          <TableContainer component={Paper}>
            <Table className="" aria-label="simple table">
              <TableHead
                style={{
                  width: "100%",
                  backgroundColor: "#202020",
                }}
              >
                <TableRow>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    Booking ID
                  </TableCell>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    Full Name
                  </TableCell>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    Start Time
                  </TableCell>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    End Time
                  </TableCell>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    Coach Name
                  </TableCell>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    Venue Status
                  </TableCell>
                  <TableCell align="left" style={{ flex: 2, color: "white" }}>
                    Coach Status
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ flex: 2, color: "white" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(state.rows) &&
                  state.rows.length > 0 &&
                  state.rows.map((row) => (
                    <TableRow key={row.bookingID}>
                      <TableCell align="left" scope="row" style={{ flex: 2 }}>
                        {row.bookingID}
                      </TableCell>
                      <TableCell align="left" scope="row" style={{ flex: 2 }}>
                        {row.customerFullName}
                      </TableCell>
                      <TableCell align="left" style={{ flex: 2 }}>
                        {row.startTime}
                      </TableCell>
                      <TableCell align="left" style={{ flex: 2 }}>
                        {row.endTime}&nbsp;
                      </TableCell>
                      <TableCell align="left" style={{ flex: 2 }}>
                        {row.coachName}
                      </TableCell>
                      <TableCell align="left" style={{ flex: 2 }}>
                        {row.venueStatus}
                      </TableCell>
                      <TableCell align="left" style={{ flex: 2 }}>
                        {row.coachStatus}
                      </TableCell>
                      <TableCell align="center" style={{ flex: 2 }}>
                        {row.coachStatus === "CANCELLED" ||
                        row.coachStatus === "PENDING" ? (
                          <div
                            className="btn btn-success mx-2"
                            onClick={() => {
                              self.UpdateBookingStatus(
                                row.bookingID,
                                "CONFIRM"
                              );
                            }}
                          >
                            CONFIRM
                          </div>
                        ) : null}
                        {row.coachStatus === "CONFIRM" ||
                        row.coachStatus === "PENDING" ? (
                          <div
                            className="btn btn-danger mx-2"
                            onClick={() => {
                              self.UpdateBookingStatus(
                                row.bookingID,
                                "CANCELLED"
                              );
                            }}
                          >
                            CANCELLED
                          </div>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="Vendor-Container-Footer">
          {/* <Pagination
            count={this.state.TotalPage}
            Page={this.state.PageNumber}
            onChange={this.handlePaging}
            variant="outlined"
            shape="rounded"
            color="secondary"
          /> */}
        </div>

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
