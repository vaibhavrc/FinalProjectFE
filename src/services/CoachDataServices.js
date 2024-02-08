const baseURL = "http://localhost:8081";
export const CoachDataServices = {
  GetBookingCoachVenueDetailsByID,
};

function GetBookingCoachVenueDetailsByID(reqbody) {
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
    baseURL + `/api/Vendor/GetBookingCoachVenueDetailsByID?UserID=` + reqbody,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
