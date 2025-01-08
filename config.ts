// currently used to pick up just baseURLs for tests
// can be set up for environment as well

export const baseURLs = {
  siteBackendURL: "https://the-internet.herokuapp.com",
  postmanEchoURL:  "https://postman-echo.com",
  siteC:          "https://siteC.example.com",
};

export const paths = {
  // siteBackendURL
  responseOK:          "/status_codes/200",
  responseMoved:       "/status_codes/301",
  responseNotFound:    "/status_codes/400",
  responseServerError: "/status_codes/500",
  // postmanEchoURL
  postmanEchoPost:     "/post",
  postmanEchoPut:      "/put",
  postmanEchoDelete:   "/delete"

  // somePath: "/some/api/path",
};
