//const baseURL = "https://localhost:44377/";
const baseURL = "http://localhost:8081/";
const axios = require("axios").default;

export const CustomerDataServices = {
  GetAllVenueDetails,
  GetProfileDetailsByID,
  AddProfileDetails,
  UpdateProfileDetails,
  GetCoachList,
  AddVenueBooking,
  GetVenueBooking,
  GetVenueBookingByID,
  UpdateBookingStatus,
};

function UpdateBookingStatus(reqbody) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("PlayerToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `api/Customer/UpdateBookingStatus`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function AddVenueBooking(reqbody) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("PlayerToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `api/Customer/AddVenueBooking`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetVenueBooking() {
  // debugger;
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("PlayerToken")}`,
    },
    body: null,
  };
  return fetch(baseURL + `api/Vendor/GetVenueBooking`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetVenueBookingByID(reqbody) {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("PlayerToken")}`,
    },
    body: null,
  };
  return fetch(
    baseURL + `api/Customer/GetVenueBookingByID?UserID=` + reqbody,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetAllVenueDetails() {
  // debugger;
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("PlayerToken")}`,
    },
    body: null,
  };
  return fetch(baseURL + `api/Vendor/GetAllVenueDetails`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetProfileDetailsByID(reqbody) {
  // debugger;
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("PlayerToken")}`,
    },
    body: null,
  };
  return fetch(
    baseURL + `api/Customer/GetProfileDetailsByID?UserID=` + reqbody,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function AddProfileDetails(reqbody) {
  // debugger;
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("PlayerToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `api/Customer/AddProfileDetails`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function UpdateProfileDetails(reqbody) {
  // debugger;
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("PlayerToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `api/Customer/UpdateProfileDetails`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetCoachList() {
  // debugger;
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("PlayerToken")}`,
    },
    body: null,
  };
  return fetch(baseURL + `api/Customer/GetCoachList`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
