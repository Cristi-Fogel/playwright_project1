import { test, expect } from "@playwright/test";
import { getURL } from "../../utils/urlBuilder";

test("PUT request with auth header and body example validation - 200", async ({ request }) => {
  // Define the API endpoint
  const apiEndpoint = getURL("postmanEchoURL", "postmanEchoPut");
  console.log(apiEndpoint)

  // Define the request payload
  const payload =  "blabla";

  // Define the headers
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`, // Replace with your actual token
  };

  // Make the POST request with headers
  const response = await request.put(apiEndpoint, {
    headers,
    data: payload,
  });

  // Validate the status code
  expect(response.status()).toBe(200);

  // Optionally, validate the response body
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("data");
    console.log(`Form Data: ${JSON.stringify(responseBody)}`);
    expect(responseBody.data).toBe("\"blabla\""); //this server returns value in quotes so we double them for proper evaluation
  // Log the response for debugging
  console.log(`Response received: ${JSON.stringify(responseBody, null, 2)}`);
});
