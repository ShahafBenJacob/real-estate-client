import React from "react";
import "./scss/index.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./routes/navbar/navbar";
import HomePage from './routes/homepage/homepage';
import SignUp from './routes/signup';
import LogIn from './routes/login';
import Search from './routes/search/search';
import FootBar from './routes/footbar';
import SingleApartment from './routes/singleApartment/singleApartment';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={LogIn}/>
        <Route path="/search" component={Search}/>
        <Route path="/apartment/:id" component={SingleApartment}/>
        <Route path="/" component={HomePage}/>
      </Switch>
      <FootBar/>
    </Router>
  );
}

export default App;
