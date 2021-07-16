import axios from "axios";
import React from "react";
import { useState } from "react";

const instance = axios.create({
  headers: { "X-Custom-Header": "foobar" },
});

interface ILogin {
  username: string;
  password: string;
}

interface IRegister {
  username: string;
  password: string;
  email: string;
}

const Auth = () => {
  /////LOGIN/////////////////////////////////////////////////////////
  const [dataLogin, setDataLogin] = useState<ILogin>({
    username: "snm_7c9",
    password: "Ezequiel_7c9",
  });

  const handleOnChangeLogin = (e: any) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
    console.log(dataLogin);
  };

  const handleOnSubmitLogin = (e: any) => {
    e.preventDefault();
    console.log("submit");
    axios
      .post("http://localhost:3001/auth/signin", { ...dataLogin })
      .then((res) => console.log(res));
  };
  ///////////////////////////////////////////////////////////////////////

  ////REGISTER//////////////////////////////////////////////////////////
  const [dataRegister, setDataRegister] = useState<IRegister>({
    username: "snm_7c9",
    password: "Ezequiel_7c9",
    email: "ezeagui@mail.com",
  });

  const handleOnChangeRegister = (e: any) => {
    setDataRegister({ ...dataRegister, [e.target.name]: e.target.value });

    console.log(dataRegister);
  };
  const handleOnSubmitRegister = (e: any) => {
    e.preventDefault();
    console.log("Register pulsado");
    axios
      .post("http://localhost:3001/auth/signup", { ...dataRegister })
      .then((res) => console.log(res));
  };

  const wipe = () =>
    axios.get("http://localhost:3001/auth/wipe").then((res) => alert(res.data));

  const profile = () =>
    axios.get("localhost:3001/auth/profile").then((res) => alert(res.data));

  const adminPanel = () =>
    axios.get("localhost:3001/auth/adminPanel").then((res) => alert(res.data));
  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <button onClick={wipe}>Wipear database</button>

      <p>LOGIN</p>
      <form onSubmit={handleOnSubmitLogin}>
        <input
          placeholder="username"
          name="username"
          value={dataLogin.username}
          onChange={handleOnChangeLogin}
        />
        <input
          placeholder="password"
          name="password"
          value={dataLogin.password}
          onChange={handleOnChangeLogin}
        />
        <button>SUBMIT</button>
      </form>

      <br></br>
      <br></br>

      <p>REGISTER</p>
      <form onSubmit={handleOnSubmitRegister}>
        <input
          placeholder="username"
          name="username"
          value={dataRegister.username}
          onChange={handleOnChangeRegister}
        />

        <input
          placeholder="password"
          name="password"
          value={dataRegister.password}
          onChange={handleOnChangeRegister}
        />
        <input
          placeholder="email"
          name="email"
          value={dataRegister.email}
          onChange={handleOnChangeRegister}
        />
        <button>SUBMIT</button>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          alignItems: "center",
          margin: "auto",
          marginTop: "22px",
        }}
      >
        <button onClick={profile}>ENTRAR A PERFIL PERSONAL</button>
        <button>CERRAR CESION (tocar luego de entrar al panel)</button>{" "}
        {/* Elimina token? */}
        <button>UNREGISTER (tocar luego de entrar al panel)</button>
        {/* Cambia bool a unregister */}
        <button
          style={{
            marginTop: "22px",
          }}
          onClick={adminPanel}
        >
          ENTRAR A PANEL DE ADMIN
        </button>
        <button>
          CERRAR CESION (tocar luego de entrar al panel)(tocar luego del de
          arriba)(tocar luego de entrar al panel)
        </button>
        <button>UNREGISTER (tocar luego de entrar al panel)</button>
      </div>
    </>
  );
};

export default Auth;
