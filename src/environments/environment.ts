import { FirebaseApp } from "angularfire2";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA9kUkrEucVy8WNof5P6wNX5kc4ya0usvk",
    authDomain: "ngtest-31723.firebaseapp.com",
    databaseURL: "https://ngtest-31723.firebaseio.com",
    projectId: "ngtest-31723",
    storageBucket: "ngtest-31723.appspot.com",
    messagingSenderId: "940897389379"
  }
};
