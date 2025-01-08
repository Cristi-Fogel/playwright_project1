import { test, expect } from "@playwright/test";
import { getURL } from "../../utils/urlBuilder";

test("Response validation on heroku - 200", async ({ request }) => {
    // Define the API endpoint and parameters
    const apiEndpoint = getURL("siteBackendURL", "responseOK");
  
    // Make the API request
    const response = await request.get(apiEndpoint);
  
    // Validate the status code
    expect(response.status()).toBe(200);
     
    // // Optionally, log the response for debugging
    // console.log(`Response received: ${await response.text()}`);
});

test("Response validation on heroku - 301", async ({ request }) => {
    const apiEndpoint = getURL("siteBackendURL", "responseMoved");
    const response = await request.get(apiEndpoint);
    expect(response.status()).toBe(301);
});

test("Response validation on heroku - 400", async ({ request }) => {
    const apiEndpoint = getURL("siteBackendURL", "responseNotFound");
    const response = await request.get(apiEndpoint);
    expect(response.status()).toBe(400);
});

test("Response validation on heroku - 500", async ({ request }) => {
    const apiEndpoint = getURL("siteBackendURL", "responseServerError");
    const response = await request.get(apiEndpoint);
    expect(response.status()).toBe(500);
});