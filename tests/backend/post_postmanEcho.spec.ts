import { test, expect } from "@playwright/test";
import { getURL } from "../../utils/urlBuilder";

test("POST request with auth header and body example validation - 200", async ({ request }) => {
  // Define the API endpoint
  const apiEndpoint = getURL("postmanEchoURL", "postmanEchoPost");
  // console.log(apiEndpoint)

  // Define the request payload
  const payload = {
    title: "foo",
    body: "bar",
    userId: 1,
  };

  // Define the headers
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`, // Replace with your actual token
  };

  // Make the POST request with headers
  const response = await request.post(apiEndpoint, {
    headers,
    data: payload,
  });

  // Validate the status code
  expect(response.status()).toBe(200);

  // Optionally, validate the response body
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("data");
    //data nested under a data{} array, so accessing it directly for validation from the responseBody
    // console.log(`Form Data: ${JSON.stringify(responseBody)}`);
  expect(responseBody.data).toHaveProperty("title", "foo");
  expect(responseBody.data).toHaveProperty("body", "bar");
  expect(responseBody.data).toHaveProperty("userId", 1);

  // Log the response for debugging
  // console.log(`Response received: ${JSON.stringify(responseBody, null, 2)}`);
});
