import React, { Component } from "react";
import "./VendorHome.scss";
import { VendorDataServices } from "../../services/VendorDataServices";
import { AdminDataServices } from "../../services/AdminDataServices";
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
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";

export default class VendorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VendorID: 0,
      VenueName: "",
      Location: "",
      OpenTime: "",
      CloseTime: "",
      //
      VenueNameFlag: false,
      LocationFlag: false,
      OpenTimeFlag: false,
      CloseTimeFlag: false,
      //
      IsUpdate: false,
      //
      Message: "",
      OpenSnackBar: false,
      OpenLoader: false,
      OpenInsertVenue: false,
      //
      PageNumber: 1,
      TotalPage: 0,
      Type: "Nall",
      rows: [],
    };
  }

  componentWillMount() {
    console.log("Component will mount calling ... ");
    this.GetVenueDetailsByID();
    this.GetBookingVenueDetailsByID();
  }

  GetVenueDetailsByID = async () => {
    await VendorDataServices.GetVenueDetailsByID(
      Number(localStorage.getItem("VenueID"))
    )
      .then((data) => {
        // debugger;
        console.log("GetVenueDetailsByID Data : ", data);
        if (data.isSuccess) {
          this.setState({
            IsUpdate: true,
            VenueName: data.data[0].venueName,
            Location: data.data[0].location,
            OpenTime: data.data[0].openTime,
            CloseTime: data.data[0].closeTime,
          });
        }
        this.setState({
          rows: data.data,
          Message: data.message,
          OpenSnackBar: true,
        });
      })
      .catch((error) => {
        console.log("GetVenueDetailsByID Error : ", error);
        this.setState({
          Message: "Something Went Wrong",
          OpenSnackBar: true,
        });
      });
  };

  GetBookingVenueDetailsByID = async () => {
    await VendorDataServices.GetBookingVenueDetailsByID(
      Number(localStorage.getItem("VenueID"))
    )
      .then((data) => {
        // debugger;
        console.log("GetVenueDetailsByID Data : ", data);
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
        console.log("GetVenueDetailsByID Error : ", error);
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

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    this.GetSportDetails(value);
  };

  handleOpenModel = () => {
    this.setState({ OpenInsertVenue: true });
  };

  Validation = () => {
    this.setState({
      VenueNameFlag: false,
      LocationFlag: false,
      OpenTimeFlag: false,
      CloseTimeFlag: false,
    });

    let Value = true;

    if (this.state.VenueName === "") {
      this.setState({ VenueNameFlag: true });
      Value = false;
    }
    if (this.state.Location === "") {
      this.setState({ LocationFlag: true });
      Value = false;
    }
    if (this.state.OpenTime === "") {
      this.setState({ OpenTimeFlag: true });
      Value = false;
    }
    if (this.state.CloseTime === "") {
      this.setState({ CloseTimeFlag: true });
      Value = false;
    }

    return Value;
  };

  handleInfoSubmit = () => {
    if (this.Validation()) {
      let data = {
        venueUserID: Number(localStorage.getItem("VenueID")),
        venueName: this.state.VenueName,
        location: this.state.Location,
        openTime: this.state.OpenTime,
        closeTime: this.state.CloseTime,
      };
      VendorDataServices.InsertVenueDetails(data)
        .then((data) => {
          debugger;
          console.log("InsertVenueDetails Data : ", data);
          this.setState({
            Message: data.message,
            OpenSnackBar: true,
            OpenInsertVenue: false,
          });
          this.GetVenueDetailsByID();
        })
        .catch((error) => {
          console.log("InsertVenueDetails Error : ", error);
          this.setState({
            Message: "Something Went Wrong",
            OpenSnackBar: true,
          });
        });
    } else {
      this.setState({ Message: "Enter Required Field", OpenSnackBar: true });
    }
  };

  UpdateVenueDetails = () => {
    if (this.Validation()) {
      let data = {
        venueUserID: Number(localStorage.getItem("VenueID")),
        venueName: this.state.VenueName,
        location: this.state.Location,
        openTime: this.state.OpenTime,
        closeTime: this.state.CloseTime,
      };
      VendorDataServices.UpdateVenueDetails(data)
        .then((data) => {
          debugger;
          console.log("UpdateVenueDetails Data : ", data);
          this.setState({
            Message: data.message,
            OpenSnackBar: true,
            OpenInsertVenue: false,
          });
          this.GetVenueDetailsByID();
        })
        .catch((error) => {
          console.log("UpdateVenueDetails Error : ", error);
          this.setState({
            Message: "Something Went Wrong",
            OpenSnackBar: true,
          });
        });
    } else {
      this.setState({ Message: "Enter Required Field", OpenSnackBar: true });
    }
  };

  UpdateBookingStatus = (_bookingID, _status) => {
    let data = {
      bookingID: _bookingID,
      status: _status,
      coachStatus: false,
      venueStatus: true,
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
        this.GetBookingVenueDetailsByID();
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
      <div className="Venue-Container">
        <div className="Venue-Container-Header">
          <div>Venue Booking</div>
          <div
            className="btn btn-primary"
            onClick={() => {
              this.handleOpenModel();
            }}
          >
            {this.state.IsUpdate ? <>Update Venue</> : <>Add Venue</>}
          </div>
        </div>
        <div className="Venue-Container-Body">
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
                        {row.venueStatus === "CANCELLED" ||
                        row.venueStatus === "PENDING" ? (
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
                        {row.venueStatus === "CONFIRM" ||
                        row.venueStatus === "PENDING" ? (
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
        <div className="Venue-Container-Footer">
          {/* <Pagination
            count={this.state.TotalPage}
            Page={this.state.PageNumber}
            onChange={this.handlePaging}
            variant="outlined"
            shape="rounded"
            color="secondary"
          /> */}
        </div>

        <Modal
          open={this.state.OpenInsertVenue}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className="Model-Create-Ticket"
        >
          <Fade in={this.state.OpenInsertVenue}>
            <div className="Model-Create-Ticket-Main">
              <div className="Model-Create-Ticket-Header">
                <div className="Model-Create-Ticket-Header-Text">
                  Insert Venue Details
                </div>
              </div>
              <div className="Model-Create-Ticket-Body">
                <div>
                  <TextField
                    label="Venue Name"
                    type="text"
                    style={{ margin: "0 20px 5px 0" }}
                    name="VenueName"
                    onChange={this.handleChange}
                    value={state.VenueName}
                    error={state.VenueNameFlag}
                  />
                </div>
                <TextField
                  label="Location"
                  type="text"
                  fullWidth
                  style={{ margin: "0 0 5px 0" }}
                  name="Location"
                  error={state.LocationFlag}
                  value={state.Location}
                  onChange={this.handleChange}
                />
                <div>
                  <div>
                    <label style={{ margin: "18px 20px 5px 0" }}>
                      Open Time
                    </label>
                    <TextField
                      label=""
                      type="time"
                      style={{ margin: "18px 20px 5px 0", width: 200 }}
                      name="OpenTime"
                      error={state.OpenTimeFlag}
                      value={state.OpenTime}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label style={{ margin: "18px 20px 5px 0" }}>
                      Close Time
                    </label>
                    <TextField
                      label=""
                      type="time"
                      style={{ margin: "18px 20px 5px 0", width: 200 }}
                      name="CloseTime"
                      error={state.CloseTimeFlag}
                      value={state.CloseTime}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="Model-Create-Ticket-Footer">
                <Button
                  variant="contained"
                  style={{ margin: "10px" }}
                  onClick={() => {
                    this.setState({ OpenInsertVenue: false });
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
                      ? this.UpdateVenueDetails()
                      : this.handleInfoSubmit();
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
