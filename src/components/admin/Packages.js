import React, { Component } from "react";
import "./Packages.scss";
import { AdminDataServices } from "../../services/AdminDataServices";
import TextField from "@material-ui/core/TextField";
import { AuthenticationDataServices } from "../../services/AuthenticationDataServices";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Pagination from "@material-ui/lab/Pagination";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ReactFileReader from "react-file-reader";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

export default class Packages extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      //
      PageNumber: 1,
      TotalPages: 0,

      Image: null,
      File: new FormData(),
      FileName: "",
      FileExist: false,
      //
      ProductID: 0,
      ProductName: "",
      ProductPrice: "",
      ProductType: "",
      ProductDescription: "",
      PublicID: "",
      PlanType: "all",
      //
      ProductImageFlag: false,
      ProductNameFlag: false,
      ProductPriceFlag: false,
      ProductTypeFlag: false,
      ProductDescriptionFlag: false,
      //
      OpenSnackBar: false,
      Message: "",
      OpenLoader: false,
      Update: false,
      //
      FirstName: "",
      LastName: "",
      SignInEmail: "",
      SignUpEmail: "",
      SignInPassword: "",
      SignUpPassword: "",
      SignUpConfirmPassword: "",
      MasterPassword: "",
      Role: "venue",
      SportCompany: "",
      //
      FirstNameFlag: false,
      LastNameFlag: false,
      SignInEmailFlag: false,
      SignUpEmailFlag: false,
      SignInPasswordFlag: false,
      SignUpPasswordFlag: false,
      SignUpConfirmPasswordFlag: false,
      MasterPasswordFlag: false,
      SportCompanyFlag: false,
      //
      IsEdit: false,
    };
  }

  componentWillMount() {
    console.log("Package componentWillMount Calling ....");
    this.GetAllUserList(this.state.PageNumber);
  }

  GetAllUserList = (PageNumber) => {
    let data = {
      pageNumber: PageNumber,
      numberOfRecordPerPage: 100,
    };
    AdminDataServices.GetAllUserList(data)
      .then((data) => {
        console.log("GetAllUserList Data : ", data);
        this.setState({
          rows: data.data.reverse(),
          TotalPages: data.TotalPage,
        });
      })
      .catch((error) => {
        console.log("GetAllUserList Error : ", error);
      });
  };

  handlePaging = async (e, value) => {
    console.log("Current Page : ", value);
    this.GetAllUserList(value);
  };

  handleActiveAndDeactiveAccount = (UserID, Flag1, Flag2) => {
    // debugger;
    this.setState({ OpenLoader: true });
    let data = {
      userID: UserID,
      block: Flag1,
      unblock: Flag2,
    };
    AdminDataServices.ManupulateCustomerAccount(data)
      .then((data) => {
        console.log("ManupulateCustomerAccount Data : ", data);
        this.setState({
          OpenSnackBar: true,
          Message: data.message,
          OpenLoader: false,
        });
        this.GetAllUserList(this.state.PageNumber);
      })
      .catch((error) => {
        console.log("ManupulateCustomerAccount Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something Went Wrong",
          OpenLoader: false,
        });
        this.GetAllUserList(this.state.PageNumber);
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
      ProductNameFlag: false,
      ProductPriceFlag: false,
      ProductTypeFlag: false,
      ProductDescriptionFlag: false,
      ProductImageFlag: false,
    });

    if (State.ProductName === "") {
      this.setState({ ProductNameFlag: true });
      Value = true;
    }

    if (State.ProductPrice === "") {
      this.setState({ ProductPriceFlag: true });
      Value = true;
    }

    if (State.ProductType === "") {
      this.setState({ ProductTypeFlag: true });
      Value = true;
    }

    if (State.Image === null) {
      this.setState({ ProductImageFlag: true });
      Value = true;
    }

    return Value;
  };

  CheckValidity1 = () => {
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

    return Value;
  };

  handleSignUpSubmit = (e) => {
    let state = this.state;

    if (this.CheckValidity1("signup")) {
      if (state.SignUpConfirmPassword !== state.SignUpPassword) {
        this.setState({
          OpenSnackBar: true,
          Message: "Password And Confirm Password Not Match",
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
        SportCompany: state.SportCompany.trim(),
      };

      AuthenticationDataServices.SignUp(data)
        .then((data) => {
          debugger;
          console.log("Data : ", data);
          if (data.isSuccess) {
            this.ClearState();
          }
          this.setState({
            OpenSnackBar: true,
            Message: data.message,
            OpenLoader: false,
          });
          this.GetAllUserList(1);
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

  handleSignUpUpdate = (e) => {
    let state = this.state;

    if (this.CheckValidity1("signup")) {
      if (state.SignUpConfirmPassword !== state.SignUpPassword) {
        this.setState({
          OpenSnackBar: true,
          Message: "Password And Confirm Password Not Match",
        });
        return;
      }
      this.setState({ OpenLoader: true });
      let data = {
        firstName: state.FirstName,
        lastName: state.LastName,
        email: state.SignUpEmail,
        password: state.SignUpPassword,
      };

      AuthenticationDataServices.UpdateCrediatial(data)
        .then((data) => {
          debugger;
          console.log("Data : ", data);
          if (data.isSuccess) {
            this.ClearState();
          }
          this.setState({
            OpenSnackBar: true,
            Message: data.message,
            OpenLoader: false,
            IsEdit: false,
          });
          this.GetAllUserList(1);
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

  handleEdit = (data) => {
    this.setState({
      FirstName: data.firstName,
      LastName: data.lastName,
      SignInEmail: data.email,
      SignUpEmail: data.email,
      IsEdit: true,
    });
  };

  render() {
    let state = this.state;
    let self = this;
    console.log("State : ", state);
    return (
      <div className="Packages-Container">
        <div className="Admin-Packages-Header">Account Setting</div>
        <div className="Admin-Packages-Body">
          <div className="Admin-Packages-SubBody1">
            <div className="Sub-Form1">
              <TextField
                error={state.FirstNameFlag}
                className="TextField"
                label="First Name"
                variant="outlined"
                size="small"
                name="FirstName"
                style={{ width: "40%", marginRight: 10 }}
                value={state.FirstName}
                onChange={this.handleChange}
              />
              <TextField
                error={state.LastNameFlag}
                className="TextField"
                label="Last Name"
                variant="outlined"
                size="small"
                name="LastName"
                style={{ width: "40%" }}
                value={state.LastName}
                onChange={this.handleChange}
              />
            </div>
            <div className="Sub-Form2">
              <TextField
                disabled={this.state.IsEdit}
                error={state.SignUpEmailFlag}
                className="TextField"
                label="Your Email"
                variant="outlined"
                size="small"
                name="SignUpEmail"
                style={{ margin: "10px 0px", width: "80%" }}
                value={state.SignUpEmail}
                onChange={this.handleChange}
              />
              <TextField
                error={state.SignUpPasswordFlag}
                className="TextField"
                label="Password"
                variant="outlined"
                size="small"
                type="password"
                name="SignUpPassword"
                style={{ margin: "10px 0px", width: "80%" }}
                value={state.SignUpPassword}
                onChange={this.handleChange}
              />
              <TextField
                error={state.SignUpConfirmPasswordFlag}
                className="TextField"
                label="Confirm Password"
                variant="outlined"
                size="small"
                type="password"
                name="SignUpConfirmPassword"
                style={{ margin: "10px 0px", width: "80%" }}
                value={state.SignUpConfirmPassword}
                onChange={this.handleChange}
              />

              <RadioGroup
                name="Role"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "80%",
                }}
                value={state.Role}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  disabled={this.state.IsEdit}
                  value="venue"
                  control={<Radio />}
                  label="Venue"
                />
                <FormControlLabel
                  disabled={this.state.IsEdit}
                  value="coach"
                  control={<Radio />}
                  label="Coach"
                />
              </RadioGroup>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#06C400",
                  width: "80%",
                  margin: "10px 0 10px 0",
                  color: "white",
                }}
                onClick={() => {
                  this.state.IsEdit
                    ? this.handleSignUpUpdate()
                    : this.handleSignUpSubmit();
                }}
              >
                {this.state.IsEdit ? <>Update</> : <>Registration</>}
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
          <div className="Admin-Packages-SubBody2">
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
                      UserID
                    </TableCell>
                    <TableCell align="left" style={{ flex: 2, color: "white" }}>
                      Name
                    </TableCell>
                    <TableCell align="left" style={{ flex: 2, color: "white" }}>
                      Role
                    </TableCell>
                    <TableCell align="left" style={{ flex: 2, color: "white" }}>
                      EmailID
                    </TableCell>
                    <TableCell align="left" style={{ flex: 2, color: "white" }}>
                      Status
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
                      <TableRow key={row.userID} style={{ flex: 10 }}>
                        <TableCell align="left" scope="row" style={{ flex: 2 }}>
                          {row.userID}
                        </TableCell>
                        <TableCell align="left" scope="row" style={{ flex: 2 }}>
                          {row.firstName + " " + row.lastName}
                        </TableCell>
                        <TableCell align="left" style={{ flex: 2 }}>
                          {row.role}
                        </TableCell>
                        <TableCell align="left" style={{ flex: 2 }}>
                          {row.email}&nbsp;
                        </TableCell>
                        <TableCell align="left" style={{ flex: 2 }}>
                          {row.count > 4 ? <>DeActivate</> : <>Activate</>}
                          &nbsp;
                        </TableCell>
                        <TableCell align="center" style={{ flex: 2 }}>
                          <>
                            {row.count > 4 ? (
                              <Button
                                variant="outlined"
                                color="primary"
                                style={{ margin: "0 5px" }}
                                onClick={() => {
                                  self.handleActiveAndDeactiveAccount(
                                    row.userID,
                                    false,
                                    true
                                  );
                                }}
                              >
                                Activate
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                style={{ color: "black" }}
                                onClick={() => {
                                  self.handleActiveAndDeactiveAccount(
                                    row.userID,
                                    true,
                                    false
                                  );
                                }}
                              >
                                Deactivate
                              </Button>
                            )}
                            <Button
                              variant="outlined"
                              color="primary"
                              style={{ margin: "0 5px" }}
                              onClick={() => {
                                this.handleEdit(row);
                              }}
                            >
                              <EditIcon />
                            </Button>
                          </>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="Admin-Packages-Footer">
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
