//const baseURL = "https://localhost:44377";
const baseURL = "http://localhost:8081";
export const VendorDataServices = {
  InsertVenueDetails,
  UpdateVenueDetails,
  GetAllVenueDetails,
  GetVenueDetailsByID,
  DeleteSportDetails,
  GetAllCompanyVendorList,
  GetBookingVenueDetailsByID,
  UpdateBookingStatus,
};

function GetBookingVenueDetailsByID(reqbody) {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("VenueToken")}`,
    },
    body: null,
  };
  return fetch(
    baseURL + `/api/Vendor/GetBookingVenueDetailsByID?UserID=` + reqbody,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function UpdateBookingStatus(reqbody) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("VenueToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Customer/UpdateBookingStatus`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function InsertVenueDetails(reqbody) {
  // debugger;
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("VenueToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Vendor/InsertVenueDetails`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function UpdateVenueDetails(reqbody) {
  // debugger;
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("VenueToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Vendor/UpdateVenueDetails`, requestOptions)
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
      Authorization: `Bearer ${localStorage.getItem("VenueToken")}`,
    },
    body: null,
  };
  return fetch(baseURL + `/api/Vendor/GetAllVenueDetails`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetVenueDetailsByID(reqbody) {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("VenueToken")}`,
    },
    body: null,
  };
  return fetch(
    baseURL + `/api/Vendor/GetVenueDetailsByID?UserID=` + reqbody,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function DeleteSportDetails(reqbody) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("VenueToken")}`,
    },
    body: JSON.stringify(reqbody),
  };
  return fetch(baseURL + `/api/Vendor/DeleteSportDetails`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function GetAllCompanyVendorList() {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("VenueToken")}`,
    },
    body: null,
  };
  return fetch(baseURL + `/api/Admin/GetAllCompanyVendorList`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
