import React from "react";
import "./css/Login.css";
import logoImg from "../img/logo.jpg";
import axios from "axios";
import url from "../host";
export default function Login() {
  function handlePress() {
    const email = document.querySelector(".email");
    const password = document.querySelector(".password");
    const data = new FormData();
    data.append("email", email.value);
    data.append("password", password.value);
    axios
      .post(`${url}/auth/login`, data)
      .then((res) => {
        alert("succes");
        window.location = "/";
        if (res.data.admin === true) {
          localStorage.setItem("key", 1);
        } else if(res.data.manager === true) {
          localStorage.setItem("key", 3);
        } else {
          localStorage.setItem("key", 2);
        }
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("password", res.data.password);
        localStorage.setItem("admin", res.data.admin);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("address", res.data.address);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        // console.log(err);
        alert("No user!");
      });
    // if (value[0].value === 'admin@mail.com' && value[1].value === '123321') {
    //     window.location = '/'
    //     localStorage.setItem('key', 1)
    //     localStorage.setItem('email', value[0].value)
    //     localStorage.setItem('password', value[1].value)
    //     localStorage.setItem('admin', true)
    // } else {
    //     alert('No User!')
    // }
  }
  return (
    <div className="bigDiv">
      <div className="bigCard">
        <img src={logoImg} alt="" />
        <h2>Войдите учетную запись</h2>
        <div>
          <input type="text" className="email" placeholder="Email" />
          <input type="text" className="password" placeholder="Пароль" />
          <button onClick={() => handlePress()}>Войти в учетную запись</button>
        </div>
        <div className="aForm">
          <a href="/">На главную</a>
          <br />
          <br />
          <a href="/register">Регистрация</a>
        </div>
      </div>
    </div>
  );
}
