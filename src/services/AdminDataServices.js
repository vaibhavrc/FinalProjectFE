// const baseURL = "https://localhost:44377";
const baseURL = "http://localhost:8081";
const axios = require("axios").default;

export const AdminDataServices = {
  ManupulateCustomerAccount,
  GetAllUserList,
  GetAllVenueDetails,
};

function ManupulateCustomerAccount(reqbody) {
  // debugger;
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Admin/ManupulateCustomerAccount`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetAllUserList(reqbody) {
  // debugger;
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Admin/GetAllUserList`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetAllVenueDetails() {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
    },
    body: null,
  };
  return fetch(baseURL + `/api/Vendor/GetAllVenueDetails`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
