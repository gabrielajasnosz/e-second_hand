import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import StartPage from './app/page/startPage/startPage.jsx';
import React from "react";

function App() {
    return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path="/" exact>
                      <StartPage />
                  </Route>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
