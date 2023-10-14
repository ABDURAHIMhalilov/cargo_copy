import { useEffect, useState } from "react";
import "../App.css";
import logoImg from "../img/logo.jpg";
import axios from "axios";
import url from "../host";
import { AiOutlineArrowLeft, AiFillCloseCircle } from "react-icons/ai";

function Home() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTrek, setSelectedTrek] = useState("");
  const [selectedTrekId, setSelectedTrekId] = useState("");
  useEffect(() => {
    var tokenUser = localStorage.getItem("token");
    var userId = localStorage.getItem('id')
    axios
      .get(`${url}/auth/users`, {
        headers: { Authorization: "Bearer: " + tokenUser },
      })
      .then((res) => {
        const Filter=res.data.filter(item=>item.manager)
        setUsers(Filter);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handlePress() {
    localStorage.clear();
    window.location = "/";
    // window.reload();
  }
  function handlePress2() {
    console.log("key");
    document.querySelector(".Main02").style = "display: block";
    var textt = document.querySelector(".inpp").value;
    setText(textt);
    axios
      .get(`${url}/api/orders/search?trek_id=${textt}`)
      .then((res) => {
        setData(res.data);
        // if (res.data.length === 0) {
        //   console.log("aasdfu231234");
        //   setData(null);
        // } else {
        //   setData(res.data);
        //   console.log(res.data);
        //   res.data.map((item) => {
        //     console.log(item.id);
        //   });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handlePress3(key) {
    setSelectedTrekId(key.id);
    setSelectedTrek(key.trek_id);
    document.querySelector(".MainProject").style = "right: 0;";
  }
  function handlePress4() {
    document.querySelector(".MainProject").style = "right: -100%;";
  }
  function handlePress5() {
    var tokenUser = localStorage.getItem('token')
    var data = new FormData();
    data.append("status", 1);
    data.append("menegerid", document.querySelector(".managerId").value);
    data.append(
      "deckription",
      document.querySelector(".textDesckription").value
    );
    data.append("adressuser", document.querySelector(".selectAddress").value);
    data.append("creator", localStorage.getItem("id"));
    data.append("oredersid", selectedTrekId);
    axios.post(`${url}/api/zakaz`, data, {
      headers: { Authorization: 'Bearer: ' + tokenUser }
    }).then(res => {
      alert('succes')
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div className="App">
      <div className="MainProject">
        <div
          className="addProject"
          style={{
            width: 300,
            background: "white",
            padding: 10,
            borderRadius: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 3,
              paddingRight: 3,
              alignItems: "center",
              // height: 10
            }}
          >
            <p>
              Добавить новый проект: <br /> {selectedTrek}
            </p>
            <AiFillCloseCircle
              onClick={() => handlePress4()}
              style={{ cursor: "pointer" }}
              size={24}
            />
          </div>
          <p style={{ height: 10, marginTop: 10 }}>Введите адрес (отправителя)</p>
          <select
            style={{ width: "100%", height: 30 }}
            className="selectAddress"
          >
            {data.map((item) => {
              return item.insender.map((item2) => {
                return (
                  <option value={item2.id}>
                    {item2.address + `(${item2.email})`}
                  </option>
                );
              });
            })}
          </select>
          <p style={{ height: 10, marginTop: 10 }}>описание</p>
          <textarea
            style={{
              maxWidth: "98%",
              minWidth: "98%",
              minHeight: 27,
              maxHeight: 300,
            }}
            className="textDesckription"
          />
          <p style={{ height: 10, marginTop: 10 }}>Введите адрес (получателя)</p>
          <select style={{ width: "100%", height: 30 }} className="managerId">
            {users.map((item) => {
              return <option value={item.id}>{item.firstname}({item.address})</option>;
            })}
          </select>
          {localStorage.getItem("id") ? (
            <button
              style={{
                width: "100%",
                height: 30,
                marginTop: 10,
                border: "none",
                background: "#800000",
                color: "white",
                borderRadius: 3,
              }}
              onClick={() => handlePress5()}
            >
            Добавить
            </button>
          ) : (
            <button
              style={{
                width: "100%",
                height: 30,
                marginTop: 10,
                border: "none",
                background: "#800000",
                color: "white",
                borderRadius: 3,
              }}
              onClick={() => {
                window.location = "/login";
              }}
            >
            Добавить
            </button>
          )}
        </div>
      </div>
      <div className="navbar">
        <div className="minNav">
          <img src={logoImg} alt="" />
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
      <div className="header">
        <div className="shadowDiv" />
        <div className="inputForm">
          <input
            type="text"
            placeholder="Введите трек-код (номер отслеживания)"
            className="inpp"
          />
          <button onClick={() => handlePress2()}>Найти</button>
        </div>
      </div>
      <div className="Main02" style={{ display: "none" }}>
        {data.length === 0 ? (
          <div>
            <center>
              <h1>No results!</h1>
            </center>
          </div>
        ) : (
          data.map((item) => {
            return (
              <div
                style={{
                  width: "70%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: 40,
                  // backgroundColor: "red",
                  padding: 10,
                  margin: "auto",
                  marginTop: 10,
                  border: "1px solid",
                  borderRadius: 3,
                }}
              >
                <h1>{item.trek_id}</h1>
                <p>{item.time_create.slice(0, 10)}</p>
                <button
                  style={{
                    width: 100,
                    height: 40,
                    borderRadius: 3,
                    background: "#800000",
                    border: "none",
                    color: "white",
                  }}
                  onClick={() => handlePress3(item)}
                >
                  Заказать
                </button>
              </div>
            );
          })
        )}
      </div>
      <div className="footer">
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

export default Home;
