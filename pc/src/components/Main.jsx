import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import LogIn from './components/LogIn'; 

function Main() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={LogIn} /> {/* ruta pentru LogIn.jsx */}
      </Switch>
    </Router>
  );
}

export default Main;