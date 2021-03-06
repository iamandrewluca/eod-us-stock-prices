import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app.component";
import * as serviceWorker from "./service-worker";
// TODO: add node-sass import partial bootstrap
import "bootstrap/scss/bootstrap.scss";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
