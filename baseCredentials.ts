export const credentials = {
    users: {
      admin: {
        username: process.env.ADMIN_USERNAME || "tomsmith", // Default to "tomsmith"
        password: process.env.ADMIN_PASSWORD || "SuperSecretPassword!", // Default to "SuperSecretPassword!"
      },
      invalidUser: {  
        username: process.env.INVALID_USERNAME || "regular_user",
        password: process.env.INVALID_PASSWORD || "regular_pass123",
      },
    },
    apiKeys: {
      serviceA: process.env.SERVICE_A_API_KEY || "defaultServiceAKey",
      serviceB: process.env.SERVICE_B_API_KEY || "defaultServiceBKey",
    },
    tokens: {
      authToken: process.env.AUTH_TOKEN || "defaultAuthToken",
    },
};
