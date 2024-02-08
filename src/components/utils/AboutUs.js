import React, { Component } from "react";
import ProfileCard from "./ProfileCard";
import image1 from "../utils/images/vaibhav.jpg";
import image2 from "../utils/images/aniket.jpg";
import image3 from "../utils/images/jeet.jpg";
import image4 from "../utils/images/vipul.jpg";
import image5 from "../utils/images/abraham.jpg";
import image6 from "../utils/images/bhagyashri.png";
import { ImageFilter1 } from "material-ui/svg-icons";
import Button from "@material-ui/core/Button";
import "./AboutUs.scss";

class AboutUs extends Component {
  render() {
    return (
      <>
        <div className="main1">
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
          <div className="text-center m-5">
            <p>
              <h2>
                {" "}
                " Welcome to IndiaPlays! We're dedicated to revolutionizing the
                way sports enthusiasts connect with their favorite sports venues
                and experienced coaches. Our platform is designed to bring
                convenience, efficiency, and joy to the world of sports
                booking."
              </h2>
            </p>
            <h1 className="text-center">Our Team</h1>
          </div>
          <div className="container my-5">
            <div className="row g-4 justify-content-center">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <ProfileCard
                  id="name"
                  name="Vaibhavkumar Chavan"
                  image={image1}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <ProfileCard name="Aniket Ghatage" image={image2} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <ProfileCard name="Jeet Patel" image={image3} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <ProfileCard name="Vipul Verma" image={image4} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <ProfileCard name="Abraham Kativarapu " image={image5} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <ProfileCard name="Bhagyashri Giri" image={image6} />
              </div>
            </div>
            <p className="text-center">
              <h1 className="text-center">What We Offer</h1>
              <h3>
                <p>
                  <b>Venue Booking:</b> Explore a diverse range of sports venues
                  including indoor and outdoor facilities. From pristine soccer
                  fields to well-equipped basketball courts, our platform gives
                  you access to the best venues in town.
                </p>
                <p>
                  <b>Coach Booking:</b> Connect with experienced and certified
                  coaches across various sports disciplines. Whether you're a
                  beginner looking for guidance or an advanced player seeking to
                  hone your skills, our roster of coaches has you covered.
                </p>
                <p>
                  <b>Convenience:</b> Say goodbye to the hassle of manual
                  bookings and inquiries. With our user-friendly interface, you
                  can easily browse available venues and coaches, check their
                  availability, and make instant bookings.
                </p>
                <p>
                  <b>Flexible Scheduling:</b> We understand that busy schedules
                  can be a challenge. Our platform lets you choose the most
                  convenient time slots for your activities, ensuring that your
                  sports journey fits seamlessly into your routine.
                </p>
              </h3>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default AboutUs;
// import React, { Component } from "react";
// import ProfileCard from "./ProfileCard";
// import image1 from "../utils/images/vaibhav.jpg";
// import image2 from "../utils/images/vaibhav.jpg";
// import image3 from "../utils/images/vaibhav.jpg";
// import image4 from "../utils/images/vaibhav.jpg";
// import image5 from "../utils/images/vaibhav.jpg";
// import image6 from "../utils/images/vaibhav.jpg";

// class AboutUs extends Component {
//   render() {
//     return (
//       <>
//         <div className="text-center m-5">
//           <p>
//             <h2>
//               {" "}
//               " <strong>Welcome To Our WebSite</strong>, your trusted partner in
//               efficient airline management. With our state-of-the-art system, we
//               are dedicated to streamlining operations, enhancing passenger
//               experience, and ensuring optimal safety and performance. We are
//               more than an airline management system – we are a catalyst for
//               excellence in aviation. Our robust platform empowers airlines to
//               achieve peak efficiency, superior customer service, and unmatched
//               operational prowess. Our comprehensive airline management system
//               redefines operational efficiency, optimizing resources, enhancing
//               safety measures, and ultimately delivering an exceptional travel
//               experience for passengers worldwide"
//             </h2>
//           </p>
//           <h1 className="text-center">Our Team</h1>
//         </div>
//         <div className="container my-5">
//           <div className="row g-4 justify-content-center">
//             <div className="col-lg-4 col-md-6 col-sm-6">
//               <ProfileCard id="name" name="Vrushali Chamatkar" image={image1} />
//             </div>
//             <div className="col-lg-4 col-md-6 col-sm-6">
//               <ProfileCard name="Umesh Tambat" image={image2} />
//             </div>
//             <div className="col-lg-4 col-md-6 col-sm-6">
//               <ProfileCard name="Dhanashri Gosavi" image={image3} />
//             </div>
//             <div className="col-lg-4 col-md-6 col-sm-6">
//               <ProfileCard name="Vasim Kurane" image={image4} />
//             </div>
//             <div className="col-lg-4 col-md-6 col-sm-6">
//               <ProfileCard name="Sapana Rakh" image={image5} />
//             </div>
//             <div className="col-lg-4 col-md-6 col-sm-6">
//               <ProfileCard name="Dattatray Ghodekar" image={image6} />
//             </div>
//           </div>
//           <p className="text-center">
//             <h2>
//               With our advanced airline management system, we're dedicated to
//               creating harmony between innovation and reliability, ensuring
//               airlines can confidently navigate the challenges of the modern
//               industry." "As the backbone of airlines' success, We brings a new
//               dimension to airline management. Our technology-driven solutions
//               optimize operations, elevate passenger experiences, and position
//               airlines at the forefront of the aviation landscape.
//             </h2>
//           </p>
//         </div>
//       </>
//     );
//   }
// }

// export default AboutUs;
