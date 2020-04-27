const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "tasks-app-2-api-dev-attachmentsbucket-1emxwx4yorais"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://nl4ftbn88k.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_AGfeWCwDh",
    APP_CLIENT_ID: "116id59j3sj0ngu4bq0m3ou19g",
    IDENTITY_POOL_ID: "us-east-1:8ac7952a-4150-4d84-a893-db152dcd1d8c"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "tasks-app-2-api-prod-attachmentsbucket-rhjgh9yal6l5"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://6lbbbq23ug.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_yjmjOgRMe",
    APP_CLIENT_ID: "32s7brf2ficppj0sft3omu5kdl",
    IDENTITY_POOL_ID: "us-east-1:badcea45-d9f1-4a10-bf33-a1c6583c13b3"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};