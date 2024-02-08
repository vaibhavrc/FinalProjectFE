import React, { Component } from "react";
import "./AboutUs.css";

class ProfileCard extends Component {
  render() {
    const { name, image } = this.props;

    return (
      <div className="main ">
        <div className="profile-card">
          <div className="img">
            <img src={image} alt="mem-img" />
          </div>
          <div className="caption">
            <h3>{name}</h3>
            <p>Full Stack Developer</p>
            <div className="social-links">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCard;
