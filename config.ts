// currently used to pick up just baseURLs for tests
// can be set up for environment as well

export const baseURLs = {
  siteBackendURL: "https://the-internet.herokuapp.com",
  siteB:          "https://siteB.example.com",
  siteC:          "https://siteC.example.com",
};

export const paths = {
  // siteBackendURL
  responseOK:          "/status_codes/200",
  responseMoved:       "/status_codes/301",
  responseNotFound:    "/status_codes/400",
  responseServerError: "/status_codes/500",

  // siteB (example future paths)
  // somePath: "/some/api/path",
};
