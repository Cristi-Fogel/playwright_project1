import { test, expect } from "@playwright/test";
import { getURL } from "../../utils/urlBuilder";
import { fetchData } from "../../utils/apiUtils"; // adjust path as needed


test("GET request with auth header and body example validation - 200", async () => {
  const apiEndpoint = getURL("siteBackendURL", "responseOK");

  const { data, status } = await fetchData(apiEndpoint, {
    method: "GET",
    expectedStatuses: [200], // You can change this to [404, 500] etc. for negative scenarios
    log: true
  });

  // Assertions
  expect(status).toBe(200);
  expect(data).toBeDefined();
});


test("POST request with auth header and body example validation - 200", async () => {
  const apiEndpoint = getURL("postmanEchoURL", "postmanEchoPost");

  const payload = {
    title: "foo",
    body: "bar",
    userId: 1,
  };

  const responseBody = await fetchData(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
    expectedStatuses: [200],
  });

  expect(responseBody.data).toHaveProperty("json");

  const responseData = responseBody.data.data;
  expect(responseData).toHaveProperty("title", "foo");
  expect(responseData).toHaveProperty("body", "bar");
  expect(responseData).toHaveProperty("userId", 1);
});


test("PUT request with auth header and body example validation - 200", async () => {
  const apiEndpoint = getURL("postmanEchoURL", "postmanEchoPut");

  const payload = "blabla";

  const responseBody = await fetchData(apiEndpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${yourToken}`,
    },
    body: payload,
    expectedStatuses: [200],
  });

  expect(responseBody).toHaveProperty("data");
  expect(responseBody.data.data).toBe("\"blabla\"");
});

test("DELETE request with auth header and body example validation - 200", async () => {
  const apiEndpoint = getURL("postmanEchoURL", "postmanEchoDelete");

  const payload = "blabla";

  const responseBody = await fetchData(apiEndpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${yourToken}`,
    },
    body: payload,
    expectedStatuses: [200],
  });

  expect(responseBody).toHaveProperty("data");
  expect(responseBody.data.data).toBe("\"blabla\"");
});

