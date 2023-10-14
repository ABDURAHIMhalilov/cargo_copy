import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import url from "../host";
export default function Page4() {
  const [state, setState] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userID, setUserID] = useState(null);
  const [chkbox, setChkbox] = useState(false);
  const [firstName, setFirstName] = useState('no');
  const [lastName, setLastName] = useState('no');
  const [patronimic, setPatronimic] = useState('no');

  useEffect(() => {
    axios
      .get(`${url}/auth/users`, {
        headers: { Authorization: "Bearer: " + localStorage.getItem("token") },
      })
      .then((res) => {
        var Filterr = res.data.filter((item) =>
          item.id === localStorage.getItem("id") ? item : item
        );
        setState(Filterr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handlePress(key) {
    setUserID(key.id);
    setUserEmail(key.email);
    setUserAddress(key.address);
    setChkbox(key.manager);
    setUserPassword(key.password);
    setFirstName(key.firstname)
    setLastName(key.lastname)
    setPatronimic(key.setPatronimic)
    document.querySelector("#emailInput").value = key.email;
    document.querySelector("#addressInput").value = key.address;
    document.querySelector('#firstnameInput').value = key.firstname
    document.querySelector('#patronimicInput').value = key.patronimic
    document.querySelector('#lastnameInput').value = key.lastname
    document.querySelector(".MainS").style = "display: none";
    document.querySelector(".opacityDiv").style = "display: block";
  }

  function handlePress2() {
    document.querySelector(".MainS").style = "display: block";
    document.querySelector(".opacityDiv").style = "display: none";
  }

  function putUser() {
    var address = document.querySelector(".addressInput").value;
    var email = document.querySelector(".emailInput").value;
    console.log(address, email, chkbox, localStorage.getItem("password"));
    var data = new FormData();
    data.append("email", email);
    data.append("address", address);
    data.append("manager", chkbox);
    data.append("admin", false);
    data.append("password", userPassword);
    data.append("patronimic", document.querySelector('#patronimicInput').value);
    data.append("firstname", document.querySelector('#firstnameInput').value);
    data.append("lastname", document.querySelector('#lastnameInput').value);
    axios
      .put(`${url}/auth/admin/${userID}`, data, {
        headers: { Authorization: "Bearer: " + localStorage.getItem("token") },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        console.log(userID)
      });
  }
  return (
    <div>
      <div className="opacityDiv">
        <h4 onClick={() => handlePress2()}>
          <AiOutlineArrowLeft style={{ fontSize: 30, cursor: "pointer" }} />
        </h4>
        <div style={{ width: "50%", margin: "auto" }}>
          <h2>Пользователь</h2>
          <div>
            <div style={{}}>
              <p style={{ height: 7 }}>Введите email</p>
              <input
                type="text"
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 4,
                  border: "1px solid gray",
                }}
                id="emailInput"
                className="emailInput"
              />
            </div>
            <div style={{}}>
              <p style={{ height: 7 }}>Введите имя</p>
              <input
                type="text"
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 4,
                  border: "1px solid gray",
                }}
                id="firstnameInput"
                className="firstnameInput"
              />
            </div>
            <div style={{}}>
              <p style={{ height: 7 }}>Введите patronimic</p>
              <input
                type="text"
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 4,
                  border: "1px solid gray",
                }}
                id="patronimicInput"
                className="patronimicInput"
              />
            </div>
            <div style={{}}>
              <p style={{ height: 7 }}>Введите фамилия</p>
              <input
                type="text"
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 4,
                  border: "1px solid gray",
                }}
                id="lastnameInput"
                className="lastnameInput"
              />
            </div>

            <div style={{}}>
              <p style={{ height: 7 }}>
                Адрес {userAddress === null ? "null" : userAddress}
              </p>
              <input
                type="text"
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 4,
                  border: "1px solid gray",
                }}
                id="addressInput"
                className="addressInput"
              />
              <div style={{ marginTop: 10, marginBottom: 10 }}>
                <input
                  type="checkbox"
                  defaultChecked={chkbox}
                  onChange={() => setChkbox(true)}
                />
                Сделать менеджером
              </div>
            </div>
          </div>
          <button
            style={{
              background: "#800000",
              height: 40,
              width: 150,
              border: "none",
              borderRadius: 5,
              color: "white",
              fontSize: 17,
            }}
            onClick={() => putUser()}
          >
            Обновить
          </button>
        </div>
      </div>
      <div
        className="MainS"
        style={{ width: "100%", height: "100vh", overflow: "hidden" }}
      >
        <div className="adminPage1">
          <h1>Все пользователи</h1>
        </div>
        <div className="bigOrder">
          <div className="mainOrder">
            {state.map((item) => {
              return (
                <div className="minOrder" onClick={() => handlePress(item)}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "30%",
                    }}
                  >
                    <img src="https://github.com/twbs.png" alt="" />
                    <h1 style={{ width: "90%" }}>{item.email}</h1>
                  </div>
                  <p>{item.manager === true ? "Менеджер" : ""}</p>
                  <p style={{ marginRight: 7 }}>Редактировать</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
