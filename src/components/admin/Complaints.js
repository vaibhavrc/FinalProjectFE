import React, { Component } from "react";
import "./Complaints.scss";
import { VendorDataServices } from "../../services/VendorDataServices";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

export default class Complaints extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      vendorList: [],
      //
      PageNumber: 1,
      TotalPage: 0,
      //
      SportID: 0,
      SportName: "",
      To: "",
      Destination: "",
      SportPrice: "",
      Company: "",
      Time: "",
      SportDescription: "",
      TotalSeat: 0,

      PlanType: "all",
      //
      //SportImageFlag: false,
      SportNameFlag: false,
      ToFlag: false,
      DestinationFlag: false,
      SportPriceFlag: false,
      CompanyFlag: false,
      TimeFlag: false,
      SportDescriptionFlag: false,
      TotalSeatFlag: false,
      //
      OpenSnackBar: false,
      Message: "",
      OpenLoader: false,
      Update: false,
      Type: "all",
    };
  }

  componentWillMount() {
    console.log("Package componentWillMount Calling ....");
    this.GetSportDetails(this.state.PageNumber);
    this.GetAllCompanyVendorList();
  }

  GetAllCompanyVendorList() {
    VendorDataServices.GetAllCompanyVendorList()
      .then((data) => {
        console.log("GetAllCompanyVendorList Data : ", data);
        if (data.isSuccess && data.data) {
          console.log(
            "Vendor List : ",
            data.data.filter(function (element) {
              return element !== "";
            })
          );
          this.setState({
            vendorList: data.data.filter(function (element) {
              return element !== "" || element !== null;
            }),
          });
        }
      })
      .catch((error) => {
        console.error("GetAllCompanyVendorList Error : ", error);
      });
  }

  GetSportDetails = (PageNumber) => {
    let data = {
      pageNumber: PageNumber,
      numberOfRecordPerPage: 5,
      type: this.state.Type,
    };

    VendorDataServices.GetSportDetails(data)
      .then((data) => {
        console.log("GetSportDetails Data : ", data);
        this.setState({ rows: data.data, TotalPage: data.totalPage });
      })
      .catch((error) => {
        console.log("GetSportDetails Error : ", error);
      });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handleCapture = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ Image: reader.result });
    };
    reader.readAsDataURL(event.target.files[0]);
    this.setState({ File: event.target.files[0] });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, "Value : ", value)
    );
  };

  CheckValidity = () => {
    console.log("Check Validity Calling....");
    let State = this.state;
    let Value = false;
    this.setState({
      SportNameFlag: false,
      ToFlag: false,
      DestinationFlag: false,
      SportPriceFlag: false,
      CompanyFlag: false,
      TimeFlag: false,
      SportDescriptionFlag: false,
      TotalSeatFlag: false,
    });
    if (State.SportName === "") {
      this.setState({ SportNameFlag: true });
      Value = true;
    }

    if (State.To === "") {
      this.setState({ ToFlag: true });
      Value = true;
    }

    if (State.Destination === "") {
      this.setState({ DestinationFlag: true });
      Value = true;
    }

    if (State.SportPrice === "") {
      this.setState({ SportPriceFlag: true });
      Value = true;
    }

    if (State.Company === "") {
      this.setState({ CompanyFlag: true });
      Value = true;
    }

    if (State.Time === "") {
      this.setState({ TimeFlag: true });
      Value = true;
    }

    if (State.TotalSeat === 0) {
      this.setState({ TotalSeatFlag: true });
      Value = true;
    }

    return Value;
  };

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    this.GetSportDetails(value);
  };

  handleAddProduct = async (e) => {
    e.preventDefault();
    console.log("handle Add Product Calling ....");
    if (await this.CheckValidity()) {
      this.setState({ Message: "Enter Required Filled", OpenSnackBar: true });
      return;
    }
    // ;
    this.setState({ OpenLoader: true });
    let state = this.state;
    let data = null;
    // ;
    if (state.Update) {
      //Update
      data = {
        sportID: state.SportID,
        sportName: state.SportName,
        to: state.To,
        destination: state.Destination,
        time: state.Time,
        price: state.SportPrice,
        company: state.Company,
        description: state.SportDescription,
      };
    } else {
      //Insert
      data = {
        sportName: state.SportName,
        to: state.To,
        destination: state.Destination,
        time: state.Time,
        price: state.SportPrice,
        company: state.Company,
        description: state.SportDescription,
        seat: state.TotalSeat,
        userID: -1,
      };
    }

    {
      state.Update
        ? await VendorDataServices.UpdateSportDetails(data)
            .then((data) => {
              console.log("Data : ", data);
              this.setState({
                OpenLoader: false,
                OpenSnackBar: true,
                Message: data.message,
                SportID: 0,
                SportName: "",
                To: "",
                Destination: "",
                SportPrice: "",
                Company: "",
                Time: "",
                SportDescription: "",
                TotalSeat: 0,
                Update: false,
              });
              this.GetSportDetails(this.state.PageNumber);
            })
            .catch((error) => {
              console.log("Error : ", error);
              this.setState({
                OpenLoader: false,
                OpenSnackBar: true,
                Message: "Something Went Wrong",
              });
              this.GetSportDetails(this.state.PageNumber);
            })
        : await VendorDataServices.InsertSportDetails(data)
            .then((data) => {
              console.log("Data : ", data);
              this.setState({
                OpenLoader: false,
                OpenSnackBar: true,
                Message: data.message,
                SportID: 0,
                SportName: "",
                To: "",
                Destination: "",
                SportPrice: "",
                Company: "",
                Time: "",
                SportDescription: "",
                TotalSeat: 0,
                Update: false,
              });
              this.GetSportDetails(this.state.PageNumber);
            })
            .catch((error) => {
              console.log("Error : ", error);
              this.setState({
                OpenLoader: false,
                OpenSnackBar: true,
                Message: "Something Went Wrong",
              });
              this.GetSportDetails(this.state.PageNumber);
            });
    }
  };

  handleCopyData = (data) => {
    console.log("handleCopyData Calling...");
    this.setState({
      Update: true,
      SportID: data.sportID,
      SportName: data.sportName,
      To: data.to,
      Destination: data.destination,
      SportPrice: data.price,
      Company: data.company,
      Time: data.time,
      SportDescription: data.description,
      TotalSeat: data.seat,
    });
  };

  DeleteSportDetails = (SportID) => {
    console.log("DeleteSportDetails Sport ID : ", SportID);
    this.setState({ OpenLoader: true });
    let data = {
      sportID: SportID,
    };
    VendorDataServices.DeleteSportDetails(data)
      .then((data) => {
        console.log("DeleteSportDetails Data : ", data);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: true,
          Message: data.message,
        });
        this.GetSportDetails(this.state.PageNumber);
      })
      .catch((error) => {
        console.log("DeleteSportDetails Error : ", error);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: true,
          Message: "Something Went Wrong",
        });
        this.GetSportDetails(this.state.PageNumber);
      });
  };

  render() {
    let state = this.state;
    let self = this;
    console.log("Complaints State : ", state);
    return (
      <div className="Packages-Container">
        <div className="Admin-Packages-Header">Sports Management</div>
        <div className="Admin-Packages-Body">
          <div className="Admin-Packages-Body-Box1">
            <div className="Admin-Packages-Body-Box1-Sub1">
              <div className="Admin-Packages-Body-Box1-Sub1-Type">
                <TextField
                  variant="outlined"
                  label="Sport Name"
                  type="text"
                  name="SportName"
                  style={{ margin: "0 10px 15px 0", width: "60%" }}
                  size="small"
                  error={state.SportNameFlag}
                  value={state.SportName}
                  onChange={this.handleChange}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TextField
                    variant="outlined"
                    label="Source"
                    name="To"
                    type="text"
                    style={{ margin: "0 10px 15px 0", width: "60%" }}
                    size="small"
                    error={state.ToFlag}
                    value={state.To}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    label="Destination"
                    name="Destination"
                    type="text"
                    style={{ margin: "0 10px 15px 0", width: "60%" }}
                    size="small"
                    error={state.DestinationFlag}
                    value={state.Destination}
                    onChange={this.handleChange}
                  />
                </div>
                <TextField
                  variant="outlined"
                  name="Time"
                  type="time"
                  style={{ margin: "0px 10px 15px 0", width: "60%" }}
                  size="small"
                  error={state.TimeFlag}
                  value={state.Time}
                  onChange={this.handleChange}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TextField
                    variant="outlined"
                    label="Sport Price"
                    name="SportPrice"
                    type="number"
                    style={{ margin: "0 10px 15px 0", width: "60%" }}
                    size="small"
                    error={state.SportPriceFlag}
                    value={state.SportPrice}
                    onChange={this.handleChange}
                  />
                  <TextField
                    disabled={state.Update}
                    variant="outlined"
                    label="Total Seat"
                    name="TotalSeat"
                    type="number"
                    style={{ margin: "0 10px 15px 0", width: "60%" }}
                    size="small"
                    error={state.TotalSeatFlag}
                    value={state.TotalSeat}
                    onChange={this.handleChange}
                  />
                </div>
                <FormControl
                  className=""
                  style={{ margin: "0px 10px 15px 0", width: "60%" }}
                  size="small"
                >
                  <Select
                    variant="outlined"
                    name="Company"
                    size="small"
                    value={state.Company}
                    onChange={this.handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    error={state.CompanyFlag}
                  >
                    <MenuItem value="" disabled></MenuItem>
                    {state.vendorList?.map((option) => {
                      return <MenuItem value={option}>{option}</MenuItem>;
                    })}
                    {/* <MenuItem value="Indigo Airlines">Indigo Airlines</MenuItem>
                    <MenuItem value="Air India">Air India</MenuItem>
                    <MenuItem value="AirAsia India">AirAsia India</MenuItem>
                    <MenuItem value="Vistara">Vistara</MenuItem>
                    <MenuItem value="SpiceJet">SpiceJet</MenuItem> */}
                  </Select>
                  <FormHelperText>Sport Company</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="Admin-Packages-Body-Box1-Sub2">
              <TextField
                style={{ margin: "20px 0 0 0", width: "100%" }}
                id="outlined-multiline-static"
                label="Sport Description"
                multiline
                rows={4}
                name="SportDescription"
                variant="outlined"
                value={state.SportDescription}
                onChange={this.handleChange}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "10px 0 0 0",
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#06C400", color: "white" }}
                  onClick={this.handleAddProduct}
                >
                  {state.Update ? <>Update</> : <>Add</>} Sport
                </Button>
              </div>
            </div>
          </div>
          <div className="Admin-Packages-Body-Box2">
            <div className="Admin-Packages-Body-Box2-Header">
              {/* <RadioGroup
                name="sort"
                // value={value}
                // onChange={handleChange}
              >
                <FormControlLabel
                  value="asc"
                  control={<Radio style={{ color: "white" }} />}
                  label="Asc"
                />
                <FormControlLabel
                  value="desc"
                  control={<Radio style={{ color: "white" }} />}
                  label="Desc"
                />
              </RadioGroup> */}
            </div>
            <div className="Admin-Packages-Body-Box2-Body">
              <TableContainer component={Paper}>
                <Table className="" aria-label="simple table">
                  <TableHead style={{ width: "100%" }}>
                    <TableRow style={{ flex: 8 }}>
                      <TableCell align="left" style={{ flex: 2 }}>
                        Sport Name
                      </TableCell>
                      <TableCell align="left" style={{ flex: 2 }}>
                        Source
                      </TableCell>
                      <TableCell align="left" style={{ flex: 2 }}>
                        Destination
                      </TableCell>
                      <TableCell align="left" style={{ flex: 1 }}>
                        Price
                      </TableCell>
                      <TableCell align="left" style={{ flex: 1 }}>
                        Time
                      </TableCell>
                      <TableCell align="left" style={{ flex: 1 }}>
                        Seat
                      </TableCell>
                      <TableCell align="center" style={{ flex: 1 }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(state.rows) &&
                      state.rows.length > 0 &&
                      state.rows.map((row) => (
                        <TableRow key={row.sportID} style={{ flex: 8 }}>
                          <TableCell
                            align="left"
                            scope="row"
                            style={{ flex: 2 }}
                          >
                            {row.sportName}
                          </TableCell>
                          <TableCell align="left" style={{ flex: 2 }}>
                            {row.to}
                          </TableCell>
                          <TableCell align="left" style={{ flex: 2 }}>
                            {row.destination}&nbsp;
                          </TableCell>
                          <TableCell align="left" style={{ flex: 1 }}>
                            {row.price}
                          </TableCell>
                          <TableCell align="left" style={{ flex: 1 }}>
                            {row.time}
                          </TableCell>
                          <TableCell align="left" style={{ flex: 1 }}>
                            {row.seat}
                          </TableCell>
                          <TableCell align="center" style={{ flex: 1 }}>
                            <IconButton
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() => {
                                self.handleCopyData(row);
                              }}
                            >
                              <EditIcon size="small" />
                            </IconButton>
                            <IconButton
                              variant="outlined"
                              size="small"
                              style={{ color: "black", margin: "0 0 0 10px" }}
                              onClick={() => {
                                self.DeleteSportDetails(row.sportID);
                              }}
                            >
                              <DeleteIcon size="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="Admin-Packages-Body-Box2-Footer">
              <Pagination
                count={this.state.TotalPage}
                Page={this.state.PageNumber}
                onChange={this.handlePaging}
                variant="outlined"
                shape="rounded"
                color="secondary"
              />
            </div>
          </div>
        </div>
        <div className="Admin-Packages-Footer"></div>
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
