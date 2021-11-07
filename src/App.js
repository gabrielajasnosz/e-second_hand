import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import StartPage from './app/page/startPage/StartPage.jsx';
import React from "react";

function App() {
    return (
      <div className="App">
          <BrowserRouter>
                  <Switch>
                      <Route path="/">
                          <StartPage />
                      </Route>
                  </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
