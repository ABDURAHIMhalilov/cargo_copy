import React, { useEffect, useState } from "react";
import "./All.css";
// import AiOutlineArrowLeft from 'react-icons/AiOutlineArrowLeft'
import { AiOutlineArrowLeft, AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import url from "../host";

export default function Page2() {
  const [data, setData] = useState([]);
  const [order, setOrders] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [selectedAddress2, setSelectedAddress2] = useState([]);

  const [selectedPutManagerId, setSelectedPutManagerId] = useState(null);
  const [selectedPutDescription, setSelectedPutDescription] = useState("");
  const [selectedPutOrder, setSelectedPutOrder] = useState(null);

  const [target, setTarget] = useState(0);
  const [target2, setTarget2] = useState(0);
  useEffect(() => {
    var tokenUser = localStorage.getItem("token");
    axios
      .get(`${url}/api/myzakaz`, {
        headers: { Authorization: "Bearer: " + tokenUser },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    axios
      .get(`${url}/api/myorders`, {
        headers: { Authorization: "Bearer: " + tokenUser },
      })
      .then((res) => {
        setOrders(res.data);
        console.log(res.data, "asd");
      })
      .catch((err) => {
        console.log(err, "reer");
      });
  }, []);
  function handlePress(key) {
    if (key.adressuser==localStorage.getItem("id")) {
    setSelectedId(key.id);
    document.querySelector("#textarea2").value = key.deckription;
    setSelectedPutDescription(key.deckription);
    setSelectedTrack(key.oreder.trek_id);
    document.querySelector(".MainS").style = "display: none";
    document.querySelector(".opacityDiv").style = "display: block";
    }
  }
  function handlePress2() {
    document.querySelector(".MainS").style = "display: block";
    document.querySelector(".opacityDiv").style = "display: none";
  }
  function handlePress3() {
    document.querySelector(".addOrder").style = "display: block;";
  }
  function handlePress33() {
    document.querySelector(".addOrder2").style = "display: block;";
  }

  function handlePress44() {
    document.querySelector(".addOrder2").style = "display: none;";
  }
  function handlePress4() {
    document.querySelector(".addOrder").style = "display: none;";
  }
  function handlePress5() {
    var data = new FormData();
    data.append("menegerid", localStorage.getItem("id"));
    data.append("deckription", document.querySelector(".textarea").value);
    data.append("creator", localStorage.getItem("id"));
    data.append(
      "oredersid",
      JSON.parse(document.querySelector(".select2").value).id
    );
    data.append("status", 1);
    data.append("adressuser", target);

    axios
      .post(`${url}/api/zakaz`, data, {
        headers: { Authorization: "Bearer: " + localStorage.getItem("token") },
      })
      .then((res) => {
        alert("succes");
        // window.location.reload();
        axios
          .post(
            `${url}/api/points`,
            {
              status: 1,
              zakaz_id: res.data.id,
            },
            {
              headers: {
                Authorization: "Bearer: " + localStorage.getItem("token"),
              },
            }
          )
          .then((res2) => {
            console.log(res2.data);
          })
          .catch((err) => {
            console.log(err);
          });
        // document.querySelector(".addOrder").style = "opacity: 0;";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handlePress55() {
    var data = new FormData();
    data.append("trek_id", document.querySelector(".trekInp").value);
    data.append("sender", localStorage.getItem("id"));
    axios
      .post(`${url}/api/orders`, data, {
        headers: { Authorization: "Bearer: " + localStorage.getItem("token") },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handlePress6() {
    var tokenUser = localStorage.getItem("token");
    axios
      .delete(`${url}/api/zakaz/${selectedId}`, {
        headers: { Authorization: "Bearer: " + tokenUser },
      })
      .then((res) => {
        alert("Zakaz uspeshnyy udalyon!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handlePress7() {
    var tokenUser = localStorage.getItem("token");
    var data = new FormData();
    data.append("status", document.querySelector(".select5").value);
    data.append("menegerid", localStorage.getItem('id'));
    data.append("deckription", document.querySelector(".textarea2").value);
    data.append("adressuser", target2);
    data.append("creator", localStorage.getItem("id"));
    data.append(
      "oredersid",
      JSON.parse(document.querySelector(".select4").value).id
    );
    axios
      .put(`${url}/api/zakaz/${selectedId}`, data, {
        headers: { Authorization: "Bearer: " + tokenUser },
      })
      .then((res) => {
        window.location.reload();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div
      style={{ width: "100%", overflow: "hidden", height: "100vh", zIndex: 10 }}
    >
      <div className="addOrder">
        {/*<AiFillCloseCircle
          className="iconCLose"
          onClick={() => handlePress4()}
        />
        <input type="text" placeholder="track id" className="trackId" />
        <button onClick={() => handlePress5()}>Add order</button>
  */}
        <AiFillCloseCircle
          className="iconCLose"
          onClick={() => handlePress4()}
        />
        <textarea
          style={{ maxWidth: "98%", minWidth: "98%", marginTop: 10 }}
          placeholder="desckrSiption"
          className="textarea"
        />
        <select
          onChange={(e) => {
            console.log(JSON.parse(e.target.value));
            setTarget(JSON.parse(e.target.value).sender);
            setSelectedAddress(JSON.parse(e.target.value).insender);
          }}
          className="select2"
          style={{ width: "100%", height: 35, marginTop: 10 }}
        >
          {order.map((item) => {
            return <option value={JSON.stringify(item)}>{item.trek_id}</option>;
          })}
        </select>
        <h1>{selectedAddress.map((item) => item.sender)}</h1>
        <button onClick={() => handlePress5()}>Add</button>
      </div>
      <div className="addOrder2">
        {/*<AiFillCloseCircle
          className="iconCLose"
          onClick={() => handlePress4()}
        />
        <input type="text" placeholder="track id" className="trackId" />
        <button onClick={() => handlePress5()}>Add order</button>
  */}
        <AiFillCloseCircle
          className="iconCLose"
          onClick={() => handlePress44()}
        />
        <input
          style={{ width: "95%", marginTop: 10 }}
          placeholder="trek_id"
          className="trekInp"
        />
        <button onClick={() => handlePress55()}>Add</button>
      </div>
      <div className="opacityDiv">
        <h4 onClick={() => handlePress2()}>
          <AiOutlineArrowLeft style={{ fontSize: 30, cursor: "pointer" }} />
        </h4>
        <h1 style={{ marginLeft: "10%" }}>Обновить заказ: {selectedTrack}</h1>
        <div style={{ width: "60%", margin: "auto" }}>
          <p style={{ height: 3, marginTop: 5 }}>
            исправьте комментарий(desckription)
          </p>
          <textarea
            style={{ maxWidth: "98.4%", minWidth: "98.4%", marginTop: 10 }}
            placeholder="desckription"
            id="textarea2"
            className="textarea2"
          />
          <p style={{ height: 3, marginTop: 5 }}>выбрать трек</p>
          <select
            onChange={(e) => {
              console.log(JSON.parse(e.target.value));
              setTarget2(JSON.parse(e.target.value).sender);
              setSelectedAddress2(JSON.parse(e.target.value).insender);
            }}
            className="select4"
            style={{ width: "100%", height: 35, marginTop: 10 }}
          >
            {order.map((item) => {
              return (
                <option value={JSON.stringify(item)}>{item.trek_id}</option>
              );
            })}
          </select>
          <p style={{ height: 3, marginTop: 5 }}>Введите статус</p>
          <select
            // onChange={(e) => e}
            className="select5"
            style={{ width: "100%", height: 35, marginTop: 10 }}
          >
            <option value="1">Дабавлен</option>
            <option value="2">На рассмотрении</option>
            <option value="3">Законченный</option>
          </select>
          <button
            style={{
              background: "#800000",
              border: "none",
              height: 40,
              borderRadius: 5,
              color: "white",
              fontWeight: "400",
              fontSize: 17,
              marginLeft: 50,
              marginTop: 10,
            }}
            onClick={() => handlePress7()}
          >
            Обновить заказ
          </button>
          <button
            style={{
              background: "red",
              border: "none",
              height: 40,
              borderRadius: 5,
              color: "white",
              fontWeight: "400",
              fontSize: 17,
              marginLeft: 20,
              marginTop: 10,
            }}
            onClick={() => handlePress6()}
          >
            Удалит заказ
          </button>
        </div>
      </div>
      <div className="MainS" style={{ width: "100%" }}>
        <div className="adminPage1">
          <h1>Все заказы</h1>
          <div className="inpForm1">
            {/*<input type="file" />
            <div>
              <h2>Choose file</h2>
              <h2>No file choosen</h2>
              </div>
            <button>Загрузить</button>
          */}
          </div>
          <button
            style={{ width: 120, height: 35, borderRadius: 5, border: "none" }}
            onClick={() => handlePress3()}
          >
            Новый заказ
          </button>
          <button
            style={{ width: 120, height: 35, borderRadius: 5, border: "none" }}
            onClick={() => handlePress33()}
          >
            Новый order
          </button>
        </div>
        <div className="bigOrder">
          <div className="mainOrder">
            {data.map((item) => {
              return (
                <div className="minOrder" onClick={() => handlePress(item)}>
                  <div
                    style={{
                      display: "flex",
                      // alignItems: "center",
                      // justifyContent: "space-between",
                      width: "30%",
                    }}
                  >
                    <img src="https://github.com/twbs.png" alt="" />
                    <div>
                      <h1 style={{ height: "7px" }}>{item.oreder.trek_id}</h1>
                    </div>
                    <h1 style={{ height: "7px", fontSize: 15, marginTop: 15 }}>
                      {item.time_create.slice(0, 10)}
                    </h1>
                  </div>
                  <h1 style={{ height: "7px", marginRight: 10 }}>
                    {item.status === 1
                      ? "Дабавлен"
                      : item.status === 2
                      ? "На рассмотрении"
                      : "Законченный"}
                  </h1>
                </div>
              );
            })}{" "}
            {/* <div className="minOrder">
            <img src="https://github.com/twbs.png" alt="" />
            <h1>YT8929328214977</h1>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
