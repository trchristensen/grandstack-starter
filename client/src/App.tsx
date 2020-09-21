import React from "react"
import Navbar from "./components/Navbar/Navbar.component";
import Feed from "./components/Feed/Feed.component";
import Dashboard from "./components/Dashboard/Dashboard.component";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Box } from "@chakra-ui/core";
import Sandbox from "./components/Sandbox/Sandbox.component";

const App: React.FC = () => {


  return (
    <Router>
      <Box>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/sandbox" component={Sandbox} />
        </Switch>
      </Box>
    </Router>
  );
}

export default App