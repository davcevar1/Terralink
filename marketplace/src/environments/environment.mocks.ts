export const environment = {
  production: false,
  mocks: true,
  namespace: "mainstreet-marketplace",
  oauth: {
    clientId: "",
    clientSecret: "",
    tokenEndpoint: "//localhost:3001/oauth/v2/token"
  },
  configurationPath: "//localhost:3001/users/me?channel=admin",
  apiPath: "//localhost:3001",
  filesPath: "//localhost:4200",
  pusher: {
    key: 'e9ce90ef5b4bb61e5c1b',
    cluster: 'us2',
  }
};
