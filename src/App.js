import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./routes/navbar/navbar";
import HomePage from './routes/homepage/homepage';
import SignUp from './routes/signup/signup';
import LogIn from './routes/login/login';
import Search from './routes/search/search';
import FootBar from './routes/footer/footbar';
import SingleApartment from './routes/singleApartment/singleApartment';
import AddApartment from './routes/addApartment/addApartments';

import './routes/general.scss';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={LogIn}/>
        <Route path="/search" component={Search}/>
        <Route path="/addApartment" component={AddApartment}/>
        <Route path="/apartment/:id" component={SingleApartment}/>
        <Route path="/" component={HomePage}/>
      </Switch>
      <FootBar/>
    </Router>
  );
}

export default App;
