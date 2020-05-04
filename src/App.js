import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Toolbar from "./components/navbar/Toolbar";
import { SelectionTabs, Footer } from './components';

const MessageNotification = React.lazy(() =>
  import("./components/Notification")
);
const Loading = () => {
  return <div className="text-center">Please Wailt While Loading...</div>;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Loading></Loading>}>
          <Toolbar />
          <MessageNotification />
          <SelectionTabs />
          <Footer />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
