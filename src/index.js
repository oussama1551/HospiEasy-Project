
import React from "react";
import ReactDOM from "react-dom";

import { registerLicense } from '@syncfusion/ej2-base';

//import "assets/vendor/nucleo/css/nucleo.css";
//import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import "./index.css"

import App from "components/App"

registerLicense('ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Xd0BjWnxdcHRVQ2lb');

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
