import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Auth from "./components/Auth";
import GoogleLogin from "react-google-login";
import { prisma } from "@prisma/client";
import axios from "axios";

function App() {
  const responseGoogleRegister = (response: any) => {
    const nombre = response.dt.uU;
    const googleId = response.googleId;
    const username = nombre + "_" + googleId;
    const email = response.profileObj.email;
    //
    axios
      .post("http://localhost:3001/auth/signup", {
        username,
        email,
        googleId,
      })
      .then((e) => console.log(e.data));
  };
  const onFailureRegister = (response: any) => {
    console.log(response, "Fallorel registro!");
  };

  const responseGoogleLogin = (response: any) => {
    const nombre = response.dt.uU;
    const googleId = response.googleId;
    const username = nombre + "_" + googleId;

    axios
      .post("http://localhost:3001/auth/signin", {
        username,
        googleId,
      })
      .then((e) => console.log(e.data));
  };
  const onFailureLogin = (response: any) => {
    console.log(response, "Fallo el login!");
  };

  return (
    <div>
      <div className="App">
        <Auth />

        <div>Login</div>
        <GoogleLogin
          clientId="245898915217-ua966je7cjr0p2bhljcfukt493n832t6.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogleLogin}
          onFailure={onFailureLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <div>Register</div>
      <GoogleLogin
        clientId="245898915217-ua966je7cjr0p2bhljcfukt493n832t6.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogleRegister}
        onFailure={onFailureRegister}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default App;
