import React, { useState } from "react";
import "./css/Register.css";
import logoImg from "../img/logo.jpg";
import axios from "axios";
import url from "../host";
export default function Register() {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [chkbox, setChkbox] = useState(false);
  function handlePress() {
    var Values = document.querySelectorAll(".Salom");
    console.log(chkbox);
    var emailNum = false
    var Passwo = false
    if (!Values[0].value.includes("@")) {
      // alert("password warn");
      setEmail(true);
    } else {
      console.log("suc1");
      setEmail(false);
      emailNum=true
    }
    if (Values[1].value !== Values[2].value) {
      // alert("password warn");
      setPassword(true);
    } else {
      setPassword(false);
      console.log("suc3");
      Passwo = true
    }
    if (emailNum === true && Passwo === true && chkbox === true) {
      const data = new FormData()
      data.append('email', Values[0].value)
      data.append('password', Values[1].value)
        axios.post(`${url}/auth/register`, data).then(res => {
        alert('succes')
        localStorage.setItem('key', 2)
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('password', res.data.password)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.id)
        window.location = '/'
        }).catch(err => {
          alert("This user is registered!")
        })
    } else {
        alert('error');
    }
    // if (Values[1].value !== Values[2].value || !Values[0].value.includes("@")) {
    //   // alert("password warn");
    //   setPassword(true);
    //   setEmail(true);
    // } else if (!Values[0].value.includes("@")) {
    //   setEmail(true);
    // } else if (Values[1].value !== Values[2].value) {
    //   // alert("password warn");
    //   setPassword(true);
    // } else {
    //   console.log("success");
    // }
    // localStorage.setItem('key')
    // window.location = '/'
  }
  return (
    <div className="bigDiv">
      <div className="bigCard">
        <img src={logoImg} alt="" />
        <h2>Войдите учетную запись</h2>
        {/* {email == true ? (
          <p style={{ fontSize: "12px", color: "red" }}>
            error email type
            {password == true ? (
              <p style={{ fontSize: "12px", color: "red" }}>& password type</p>
            ) : (
              ""
            )}
          </p>
        ) : (
          ""
        )} */}

        {password == true ? (
          <p style={{ fontSize: "12px", color: "red" }}>password</p>
        ) : (
          ""
        )}
        {email == true ? (
          <p style={{ fontSize: "12px", color: "red" }}>email</p>
        ) : (
          ""
        )}
        <div>
          <input className="Salom" type="email" placeholder="Email" />
          <input className="Salom" type="password" placeholder="Пароль" />
          <input
            className="Salom"
            type="password"
            placeholder="Повторите пароль"
          />
          <div className="checBox">
            {/* <input className="cheacks" type="checkbox" /> */}
            <input type="checkbox" defaultChecked={chkbox} onChange={() => setChkbox(true)} />
            <p>
              Я ознакомился с
              <a href="/register">Политикой конфиденциальности</a>
            </p>
          </div>
          <button onClick={() => handlePress()}>Создать учетную запись</button>
        </div>
        <div className="aForm">
          <a href="/">На главную</a>
          <br />
          <br />
          <a href="/login">Авторизация</a>
        </div>
      </div>
    </div>
  );
}
