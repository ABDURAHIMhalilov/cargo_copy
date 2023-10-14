import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import "../App.css";
import logoImg from "../img/logo.jpg";
import axios from "axios";
import url from "../host";
export default function Profile() {
  const [myProject, setMyProject] = useState([]);
  const [Korish1, setKorish1] = useState();

  function handlePress() {
    localStorage.clear();
    window.location = "/";
  }
  function handleDelete() {
    var userId = localStorage.getItem("id");
    localStorage.clear();
    axios
      .delete(`${url}/auth/users/${userId}`)
      .then((res) => {
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    axios
      .get(`${url}/auth/user/`, {
        headers: { Authorization: "Bearer  " + localStorage.getItem("token") },
      })
      .then((res) => {
        res.data.map((item) => {
          document.querySelector("#firstname").value = item.firstname;
          document.querySelector("#patronimic").value = item.patronimic;
          document.querySelector("#lastname").value = item.lastname;
          document.querySelector("#passwoed").value = item.password;
        });
      });
    var emaill = localStorage.getItem("email");
    var address = localStorage.getItem("address");

    var tokenUser = localStorage.getItem("token");
    var add = address == null ? "" : address;
    document.querySelector("#email").value = emaill;
    document.querySelector("#adres").value = add;
    axios
      .get(`${url}/api/zakaz`, {
        headers: { Authorization: "Bearer: " + tokenUser },
      })
      .then((res) => {
        var aa = [];
        res.data.map((item) => {
          console.log(item.creator, "all");
          if (item.creator == localStorage.getItem("id")) {
            console.log(item);
            aa.push(item);
          }
        });
        setMyProject(aa);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function putData() {
    var userId = localStorage.getItem("id");
    var password = localStorage.getItem("password");
    var data = new FormData();
    data.append("email", document.querySelector("#email").value);
    data.append("address", document.querySelector("#adres").value);
    data.append("password", document.querySelector("#passwoed").value);
    data.append("firstname", document.querySelector("#firstname").value);
    data.append("patronimic", document.querySelector("#patronimic").value);
    data.append("lastname", document.querySelector("#lastname").value);
    console.log(userId);
    axios
      .put(`${url}/auth/users/${userId}`, data, {
        headers: { Authorization: "Bearer  " + localStorage.getItem("token") },
      })
      .then((res) => {
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("address", res.data.address);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="headd">
      <div className="navbar">
        <div className="minNav">
          <img
            onClick={() => {
              window.location = "/";
            }}
            src={logoImg}
            alt=""
          />
          {localStorage.getItem("key") ? (
            localStorage.getItem("key") == 1 ? (
              <div
                className="bgasc"
                style={{
                  width: "27%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <a href="/profile">
                  <button>Профиль</button>
                </a>
                <a href="/admin">
                  <button>Админ панел</button>
                </a>

                <button onClick={() => handlePress()}>Выйти</button>
              </div>
            ) : localStorage.getItem("key") == 2 ? (
              <div
                style={{
                  width: "15%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                className="navClass"
              >
                <a href="/profile">
                  <button>Профиль</button>
                </a>
                <button onClick={() => handlePress()}>Выйти</button>
              </div>
            ) : localStorage.getItem("key") == 3 ? (
              <div
                className="bgasc"
                style={{
                  width: "27%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <a href="/profile">
                  <button>Профиль</button>
                </a>
                <a href="/manager">
                  <button>Админ панел</button>
                </a>

                <button onClick={() => handlePress()}>Выйти</button>
              </div>
            ) : (
              <a href="/login">
                <button>Войти</button>
              </a>
            )
          ) : (
            <a href="/login">
              <button>Войти</button>
            </a>
          )}
          {/* {localStorage.getItem("key") ? (
        <a href="/profile">
          <button>Профиль</button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => handlePress()}
          >
            Выйти
          </button>
        </a>
      ) : (
        <a href="/login">
          <button>Войти</button>
        </a>
      )} */}
        </div>
      </div>

      <center>
        <h1>Профиль</h1>
      </center>
      <div className="bigCard2">
        <h1>Пользователь</h1>
        <div>
          <p>Введите email</p>
          <input
            style={{ paddingLeft: 10 }}
            placeholder="email"
            id="email"
            type="text"
          />
        </div>
        <div>
          <p>Введите Адрес</p>
          <input
            style={{ paddingLeft: 10 }}
            placeholder="Адрес"
            id="adres"
            type="text"
          />
        </div>
        <div>
          <p>Введите имя</p>
          <input
            style={{ paddingLeft: 10 }}
            placeholder="имя"
            id="firstname"
            type="text"
          />
        </div>
        <div>
          <p>Введите patronimic</p>
          <input
            style={{ paddingLeft: 10 }}
            placeholder="patronimic"
            id="patronimic"
            type="text"
          />
        </div>
        <div>
          <p>Введите фамилия</p>
          <input
            style={{ paddingLeft: 10 }}
            placeholder="фамилия"
            id="lastname"
            type="text"
          />
        </div>
        <div>
          <p>Введите пароль</p>
          <input
            style={{ paddingLeft: 10 }}
            placeholder="пароль"
            id="passwoed"
            type="text"
          />
        </div>
        <div className="btn-group">
          <button onClick={() => putData()}>Обновить</button>
          <button onClick={() => handleDelete()}>Удалить аккаунт</button>
        </div>
      </div>
      <div style={{ marginTop: 100 }}>
        <center>
          <h1>Мои заказы</h1>
        </center>
        {myProject.map((item) => {
          return (
            // <div className="projectDiv">
            //   <p>{item.oreder.trek_id}</p>
            //   <p>{item.time_create.slice(0, 10)}</p>
            //   <p>Редактировать</p>
            // </div>
            <div
              className="Main"
              style={{
                backgroundColor: "#0d6dfd0a",
              }}
            >
              <center>
                <h1>Статус заказ: {item.oreder.trek_id}</h1>
              </center>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "60%",
                  margin: "auto",
                }}
              >
                <h1>Отправ</h1>
                <h1>Кому</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "60%",
                  margin: "auto",
                }}
              >
                <h1
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-between",
                  }}
                >
                  Отправитель:
                  {/*<p
                    style={{
                      fontSize: 16,
                      fontWeight: "lighter",
                      marginLeft: 10,
                      marginBottom: 10,
                    }}
                  >
                    {item.address.lastname.slice(0, 1).toUpperCase()}.
                    {item.address.patronimic.slice(0, 1).toUpperCase()}
                    {" " + item.address.firstname}
                  </p>*/}
                </h1>
                <h1
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-between",
                  }}
                >
                  Получатель:
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "lighter",
                      marginLeft: 10,
                      marginBottom: 10,
                    }}
                  >
                    {item.meneger.lastname.slice(0, 1).toUpperCase()}.
                    {item.meneger.patronimic.slice(0, 1).toUpperCase()}
                    {" " + item.meneger.firstname}
                  </p>
                </h1>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "60%",
                  margin: "auto",
                }}
              >
                <h1>Откуда</h1>
                <h1>Куда</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "60%",
                  margin: "auto",
                  marginTop: -20,
                }}
              >
                <p>
                  {item.address.address === null
                    ? "no address"
                    : item.address.address}
                </p>
                <p>
                  {item.meneger.address === null
                    ? "no address"
                    : item.meneger.address}
                </p>
              </div>
              <div
                style={{
                  background: "#fff",
                  width: "65%",
                  margin: "auto",
                  padding: 10,
                }}
              >
                {Korish1 !== item.id ? (
                  <p
                    style={{ color: "rgb(128, 0, 0)", cursor: "pointer" }}
                    onClick={() => {
                      setKorish1(item.id);
                    }}
                  >
                    читать далее
                  </p>
                ) : (
                  <p
                    style={{ color: "rgb(128, 0, 0)", cursor: "pointer" }}
                    onClick={() => {
                      setKorish1(0);
                    }}
                  >
                    закрыть
                  </p>
                )}
                {Korish1 == item.id ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        borderBottom: "1px solid",
                      }}
                    >
                      <h1
                        style={{ width: "30%", fontWeight: "400", height: 15 }}
                      >
                        Дата
                      </h1>
                      <h1
                        style={{ width: "30%", fontWeight: "400", height: 15 }}
                      >
                        Статус
                      </h1>
                      <h1
                        style={{ width: "40%", fontWeight: "400", height: 15 }}
                      >
                        Место
                      </h1>
                    </div>
                    {item.ponts == "" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          borderBottom: "1px solid",
                          paddingRight: 5,
                          paddingLeft: 5,
                        }}
                      >
                        <p style={{ width: "30%", fontWeight: "400" }}>
                          {item.time_create.slice(0, 10)}
                        </p>
                        <p style={{ width: "30%", fontWeight: "400" }}>
                          {item.status === 1
                            ? "Заказ создан"
                            : item.status === 2
                            ? "Просмотра"
                            : "Заказ выполнен"}
                        </p>
                        <p style={{ width: "40%", fontWeight: "400" }}>
                          {item.status == 2
                            ? ""
                            : item.status == 3
                            ? item.meneger.address === null
                              ? "no address"
                              : item.meneger.address
                            : item.address.address === null
                            ? "no address"
                            : item.address.address}
                        </p>
                      </div>
                    ) : (
                      item.ponts.map((item1) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              borderBottom: "1px solid",
                              paddingRight: 5,
                              paddingLeft: 5,
                            }}
                          >
                            <p style={{ width: "30%", fontWeight: "400" }}>
                              {item1.time_create.slice(0, 10)}
                            </p>
                            <p style={{ width: "30%", fontWeight: "400" }}>
                              {item1.status === 1
                                ? "Заказ создан"
                                : item1.status === 2
                                ? "Просмотра"
                                : "Заказ выполнен"}
                            </p>
                            <p style={{ width: "40%", fontWeight: "400" }}>
                              {item1.status == 2
                                ? ""
                                : item1.status == 3
                                ? item.meneger.address === null
                                  ? "no address"
                                  : item.meneger.address
                                : item.address.address === null
                                ? "no address"
                                : item.address.address}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer" style={{ paddingTop: "140px" }}>
        <div style={{ marginLeft: "10%" }}>
          <a href="" style={{ color: "#800000" }}>
            ⋅ Политика конфиденциальности
          </a>
          <p style={{ color: "gray" }}>© 2B LOGISCTIC EXPRESS CARGO</p>
        </div>
      </div>
    </div>
  );
}
