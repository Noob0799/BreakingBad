import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home/Home';
import CharacterInfo from './components/characterinfo/CharacterInfo';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Route path="/character" component={CharacterInfo}/>
          <Route exact path="/" component={Home}/>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
