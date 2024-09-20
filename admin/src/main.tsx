import ReactDOM from "react-dom/client";
import Admin from "./Admin.tsx";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store";
import { TC } from "./utils/libs.ts";

ReactDOM.createRoot(document.getElementById("nestage-admin")!).render(
  <Provider store={store}>
    <Router>
      <TC />
      <Admin />
    </Router>
  </Provider>
);
