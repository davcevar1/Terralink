export const environment = {
  production: true,
  mocks: true,
  namespace: "mainstreet-marketplace",
  oauth: {
    clientId: "",
    clientSecret: "",
    tokenEndpoint: "http://52.6.182.196:5000/oauth/v2/token"
  },
  configurationPath: "http://52.6.182.196:5000/users/me?channel=admin",
  apiPath: "http://52.6.182.196:5000",
  filesPath: "//localhost:4200",
  pusher: {
    key: 'e9ce90ef5b4bb61e5c1b',
    cluster: 'us2',
  },
  firebase: {
    apiKey: 'AIzaSyCbNwjKVO2920QSKjWuFThiSF2OdBmr2oQ',
    authDomain: 'mainstreet-demo.firebaseapp.com',
    databaseURL: 'https://mainstreet-demo.firebaseio.com',
    projectId: 'mainstreet-demo',
    storageBucket: 'mainstreet-demo.appspot.com',
    messagingSenderId: '1043020897973'
  }
};
