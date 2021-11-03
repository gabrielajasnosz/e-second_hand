import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import StartPage from './app/page/startPage/StartPage.jsx';
import React from "react";
import LoginPage from "./app/page/loginPage/LoginPage";
import RegisterPage from "./app/page/registerPage/RegisterPage"
import Item from "./app/page/itemPage/Item";

function App() {
    return (
      <div className="App">
          <BrowserRouter>
                  <Switch>
                      <Route path="/" exact>
                          <StartPage />
                      </Route>
                      <Route path="/login">
                          <LoginPage />
                      </Route>
                      <Route path="/register">
                          <RegisterPage />
                      </Route>
                      <Route path="/confirmRegistration/:token" render={(props) => <LoginPage isAccountConfirmation={true} {...props} /> }  />

                      <Route path="/item/:id" component={Item} />
                  </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
