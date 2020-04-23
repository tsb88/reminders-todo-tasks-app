export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-1",
      BUCKET: "reminders-todo-tasks-app"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://gn1hy07fpi.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_GVpnPuULV",
      APP_CLIENT_ID: "2lh6t0hbttl9t4ib2qgmj1d8mo",
      IDENTITY_POOL_ID: "us-east-1:7bc5268c-1e7b-413e-9cc4-683c54c2ac85"
    }
  };