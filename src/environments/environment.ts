// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBv_HRhNF42gGVYqS3ZQNHT5z26sCWrel0",
    authDomain: "youthstat-8675309.firebaseapp.com",
    databaseURL: "https://youthstat-8675309.firebaseio.com",
    projectId: "youthstat-8675309",
    storageBucket: "youthstat-8675309.appspot.com",
    messagingSenderId: "1076316369658"
  },
  apiBaseUrl: "http://localhost:54485"
};
