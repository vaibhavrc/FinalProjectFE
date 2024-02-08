import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/authentication/SignUp";
import AdminDashboard from "./components/admin/AdminDashboard";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import VendorDashboard from "./components/vendor/VendorDashboard";
import ForgetPassword from "./components/authentication/ForgetPassword";
import CoachDashboard from "./components/coach/CoachDashboard";
import AboutUs from "./components/utils/AboutUs";
import ContactUs from "./components/utils/ContactUs";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/AdminDashboard" component={AdminDashboard} />
          <Route exact path="/VenueDashboard" component={VendorDashboard} />
          <Route exact path="/ForgetPassword" component={ForgetPassword} />
          <Route exact path="/AboutUs" component={AboutUs} />
          <Route exact path="/ContactUs" component={ContactUs} />
          <Route exact path="/PlayerDashboard" component={CustomerDashboard} />
          <Route exact path="/CoachDashboard" component={CoachDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
