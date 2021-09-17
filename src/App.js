import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import StartPage from './app/page/startPage/StartPage.jsx';
import React from "react";
import LoginPage from "./app/page/loginPage/LoginPage";
import {AnimatePresence} from "framer-motion";

function App() {
    return (
      <div className="App">
          <BrowserRouter>
              <AnimatePresence initial={false} exitBeforeEnter>
                  <Switch>
                      <Route path="/" exact>
                          <StartPage />
                      </Route>
                      <Route path="/login">
                          <LoginPage />
                      </Route>
                  </Switch>
              </AnimatePresence>
          </BrowserRouter>
      </div>
  );
}

export default App;
