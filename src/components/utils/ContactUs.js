import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./ContactUs.scss";

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      message: "",
      nameError: "",
      emailError: "",
      mobileError: "",
    };
  }

  handleNameChange = (event) => {
    const newName = event.target.value;
    this.setState({ name: newName });
    if (newName.length < 3 || /[^a-zA-Z ]/.test(newName)) {
      this.setState({
        nameError:
          "Name must be at least 3 characters and contain no numbers or special characters.",
      });
    } else {
      this.setState({ nameError: "" });
    }
  };

  handleEmailChange = (event) => {
    const newEmail = event.target.value;
    this.setState({ email: newEmail });
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(newEmail)) {
      this.setState({ emailError: "Invalid email address." });
    } else {
      this.setState({ emailError: "" });
    }
  };

  handleMobileChange = (event) => {
    const newMobile = event.target.value;
    this.setState({ mobile: newMobile });
    if (
      newMobile.length !== 10 ||
      !/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(newMobile)
    ) {
      this.setState({ mobileError: "Invalid Indian mobile number." });
    } else {
      this.setState({ mobileError: "" });
    }
  };

  handleMessageChange = (event) => {
    const newMessage = event.target.value;
    this.setState({ message: newMessage });
  };

  handleSubmit = (event) => {
    const { nameError, emailError, mobileError } = this.state;
    if (!nameError && !emailError && !mobileError) {
      // Formspree submission logic here
    } else {
      event.preventDefault(); // Prevent submission if there are errors
    }
  };

  render() {
    const { name, email, mobile, message, nameError, emailError, mobileError } =
      this.state;

    return (
      <>
        <div className="main">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              className="text-dark"
              variant="contained"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                minWidth: 0,
              }}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Home
            </Button>
          </div>

          <div className="container d-flex align-items-center justify-content-center vh-100">
            <form
              className="bg-white p-5 w-50 rounded-3"
              action="https://formspree.io/f/mleyndya"
              method="POST"
              onSubmit={this.handleSubmit}
            >
              {/* ... input and textarea fields ... */}
              <h3 className="mb-4 text-center">Get In Touch</h3>
              <label>
                <b>Name</b>
              </label>
              <input
                type="text"
                className="form-control mb-2"
                name="name"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={this.handleNameChange}
                required
              />
              <div className="error" style={{ color: "red" }}>
                {nameError}
              </div>
              <label>
                <b>Email</b>
              </label>
              <input
                type="email"
                className="form-control mb-2"
                name="email"
                id="email"
                placeholder="Your Email Id"
                value={email}
                onChange={this.handleEmailChange}
                required
              />
              <div className="error" style={{ color: "red" }}>
                {emailError}
              </div>
              <label>
                <b>Mobile Number</b>
              </label>
              <input
                type="tel"
                className="form-control mb-2"
                name="mobile_no"
                id="phone"
                placeholder="Mobile Number"
                value={mobile}
                onChange={this.handleMobileChange}
                required
              />
              <div className="error" style={{ color: "red" }}>
                {mobileError}
              </div>
              <label>
                <b>Your Message</b>
              </label>
              <textarea
                className="form-control mb-2"
                name="message"
                id="message"
                rows="4"
                placeholder="How can we help you."
                value={message}
                onChange={this.handleMessageChange}
                required
              ></textarea>

              {/* <button type="submit" className="btn btn-success">
            Send
          </button> */}

              <button
                type="submit"
                className="btn btn-success"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(143, 28, 207, 1) 0%, rgba(25, 36, 158, 1) 100%)",
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ContactUs;
