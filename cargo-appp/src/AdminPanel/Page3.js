import React, { useEffect, useState } from "react";
import "./All.css";
// import AiOutlineArrowLeft from 'react-icons/AiOutlineArrowLeft'
import { AiOutlineArrowLeft, AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import url from "../host";
import { AiOutlineClose } from "react-icons/ai";

export default function Page2() {
  const [data, setData] = useState([]);
  const [managers, setManagers] = useState([]);
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
  const [checkbox, setCheckbox] = useState(false);

  const [lengthh, setLengthh] = useState([1]);
  const [lengthh2, setLengthh2] = useState(
    document.querySelectorAll("textarea").length
  );

  useEffect(() => {
    var tokenUser = localStorage.getItem("token");
    axios
      .get(`${url}/api/zakaz`, {
        headers: { Authorization: "Bearer: " + tokenUser },
      })
      .then((res) => {
        console.log(res.data, "45678");
        setData(res.data);
      });
    axios
      .get(`${url}/auth/users`, {
        headers: { Authorization: "Bearer: " + tokenUser },
      })
      .then((res) => {
        var FilterM = res.data.filter((item) =>
          item.manager === true ? item : null
        );
        console.log(FilterM);
        setManagers(FilterM);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${url}/api/orders`, {
        headers: { Authorization: "Bearer: " + tokenUser },
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handlePress(key) {
    setSelectedId(key.id);
    document.querySelector("#textarea2").value = key.deckription;
    setSelectedPutDescription(key.deckription);
    setSelectedTrack(key.oreder.trek_id);
    document.querySelector(".MainS").style = "display: none";
    document.querySelector(".opacityDiv").style = "display: block";
  }
  function handlePress2() {
    document.querySelector(".MainS").style = "display: block";
    document.querySelector(".opacityDiv").style = "display: none";
  }
  function handlePress3() {
    document.querySelector(".addOrder").style = "display: block;";
  }
  function handlePress4() {
    document.querySelector(".addOrder").style = "display: none;";
  }
  function handlePress5() {
    // var tokenUser = localStorage.getItem("token");
    // console.log(tokenUser);
    // var data = new FormData();
    // data.append("trek_id", document.querySelector(".trackId").value);
    // data.append("sender", localStorage.getItem("id"));
    // axios
    //   .post(`${url}/api/orders`, data, {
    //     headers: { Authorization: "Bearer: " + tokenUser },
    //   })
    //   .then((res) => {
    //     document.querySelector(".addOrder").style = "opacity: 0;";
    //     alert("succes");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    var data = new FormData();
    data.append("menegerid", document.querySelector(".select1").value);
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
    if (!checkbox) {
      data.map((item) => {
        if (item.id == selectedId) {
          var data = new FormData();
          data.append("status", item.status);
          data.append("menegerid", document.querySelector(".select3").value);
          data.append(
            "deckription",
            document.querySelector(".textarea2").value
          );
          data.append("adressuser", target2);
          data.append("creator", item.creator);
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
      });
    } else {
      data.map((item) => {
        if (item.id == selectedId) {
          var data = new FormData();
          data.append("status", document.querySelector(".select5").value);
          data.append("menegerid", document.querySelector(".select3").value);
          data.append(
            "deckription",
            document.querySelector(".textarea2").value
          );
          data.append("adressuser", target2);
          data.append("creator", item.creator);
          data.append(
            "oredersid",
            JSON.parse(document.querySelector(".select4").value).id
          );
          axios
            .put(`${url}/api/zakaz/${selectedId}`, data, {
              headers: { Authorization: "Bearer: " + tokenUser },
            })
            .then((res) => {
              // window.location.reload()
              var formdata = new FormData();
              formdata.append(
                "status",
                document.querySelector(".select5").value
              );
              formdata.append("zakaz_id", selectedId);
              axios
                .post(`${url}/api/points`, formdata, {
                  headers: {
                    Authorization: "Bearer  " + localStorage.getItem("token"),
                  },
                })
                .then((res) => {
                  axios
                    .get(`${url}/api/zakaz`, {
                      headers: { Authorization: "Bearer: " + tokenUser },
                    })
                    .then((res) => {
                      console.log(res.data, "45678");
                      setData(res.data);
                    });
                })
                .catch((err) => {});
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  }

  function deleteOrder(item) {
    axios
      .delete(`${url}/api/points/${item.id}`, {
        headers: { Authorization: "Bearer  " + localStorage.getItem("token") },
      })
      .then((res) => {
        axios
          .get(`${url}/api/zakaz`, {
            headers: {
              Authorization: "Bearer: " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            console.log(res.data, "45678");
            setData(res.data);
          });
      })
      .catch((err) => {
        alert("bo'lmadi");
      });
  }
  function handlePress33() {
    document.querySelector(".addOrder2").style = "display: block;";
  }
  function handlePress44() {
    document.querySelector(".addOrder2").style = "display: none;";
  }
  function handlePress55() {
    var data = new FormData();
    data.append("trek_id", document.querySelector(".trekInp").value);
    data.append("sender", 0);
    
    axios
      .post(`${url}/api/orders`, data, {
        headers: { Authorization: "Bearer: " + localStorage.getItem("token") },
      })
      .then((res) => {
        var a = document.querySelectorAll("#selectAdrs")
        // alert("zor")
        
      console.log(document.querySelector("#selectAdrs").value, 'asd')
      console.log(a,"jonibekss")
        for (let i = 0; i < a.length; i++) {
          // var data2 = {
          //   orders_id: res.data[0].id,
          //   sender: document.querySelectorAll(".flesh")[i].value,
          // };
          var data2=new FormData()
          data2.append("orders_id",res.data.id)
          data2.append("sender", a[i].value)

          axios
            .post(`${url}/api/ordersaddress`, data2, {
              headers: {
                Authorization: "Bearer: " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              // alert('success')
              window.location.reload();
            }).catch(err => {
              alert("salom")
            })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handlePress8() {
    setLengthh([lengthh, +lengthh]);
    setLengthh2(document.querySelectorAll("textarea").length);
  }

  return (
    <div
      style={{ width: "100%", overflow: "hidden", height: "100vh", zIndex: 10 }}
    >
      <div className="addOrder2">
        <AiFillCloseCircle
          className="iconCLose"
          onClick={() => handlePress44()}
        />
        <input
          style={{ width: "95%", marginTop: 10 }}
          placeholder="trek_id"
          className="trekInp"
        />
        <div className="addIput"></div>
        <button
          onClick={() => {
            var ddd = `<select id="selectAdrs" class="flesh">`;
            managers.map((item, key) => {
              ddd = ddd + `<option value="${item.id}" >${item.address}</option>`;
            });
            ddd = ddd + `</select>`;
            document.querySelector(".addIput").innerHTML += ddd;
          }}
        >
          add address this order
        </button>
        <button onClick={() => handlePress55()}>Add</button>
      </div>
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
        {lengthh.map((item) => {
          return (
            <div style={{ marginTop: 10 }}>
              <select
                className="select1"
                style={{ width: "100%", height: 35, marginTop: 10 }}
              >
                {managers.map((item) => {
                  return <option value={item.id}>{item.firstname}</option>;
                })}
              </select>
              <textarea
                style={{ maxWidth: "98%", minWidth: "98%", marginTop: 10 }}
                placeholder="desckription"
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
                  return (
                    <option value={JSON.stringify(item)}>{item.trek_id}</option>
                  );
                })}
              </select>
            </div>
          );
        })}
        <h1>{selectedAddress.map((item) => item.sender)}</h1>
        <button onClick={() => handlePress8()}>plus</button>
        <button onClick={() => handlePress5()}>Add</button>
      </div>
      <div className="opacityDiv">
        <h4 onClick={() => handlePress2()}>
          <AiOutlineArrowLeft style={{ fontSize: 30, cursor: "pointer" }} />
        </h4>
        <h1 style={{ marginLeft: "10%" }}>Обновить заказ: {selectedTrack}</h1>
        <div style={{ width: "60%", margin: "auto" }}>
          <p style={{ height: 3, marginTop: 5 }}>выбрать менеджера</p>
          <select
            className="select3"
            style={{ width: "100%", height: 35, marginTop: 10 }}
          >
            {managers.map((item) => {
              return <option value={item.id}>{item.firstname}</option>;
            })}
          </select>
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
          <br />
          <br />
          <input
            onClick={(e) => {
              setCheckbox(e.target.checked);
            }}
            type="checkbox"
          />
          Status
          <br />
          <br />
          {checkbox ? (
            <div>
              {data.map((item) => {
                if (item.id == selectedId) {
                  return (
                    <div
                      style={{
                        padding: "2px",
                        background: "rgb(128, 0, 0)",
                        color: "black",
                        display: "block",
                      }}
                    >
                      {item.ponts.map((item1) =>
                        item1.status == 1 ? (
                          <p
                            style={{
                              background: "white",
                              padding: "5px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            Дабавлен{" "}
                            <span>
                              <AiOutlineClose
                                onClick={() => deleteOrder(item1)}
                              />
                            </span>
                          </p>
                        ) : item1.status == 2 ? (
                          <p
                            style={{
                              background: "white",
                              padding: "5px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            На рассмотрении{" "}
                            <span>
                              <AiOutlineClose
                                onClick={() => deleteOrder(item1)}
                              />
                            </span>
                          </p>
                        ) : item1.status == 3 ? (
                          <p
                            style={{
                              background: "white",
                              padding: "5px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            Законченный{" "}
                            <span>
                              <AiOutlineClose
                                onClick={() => deleteOrder(item1)}
                              />
                            </span>
                          </p>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  );
                }
              })}
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
            </div>
          ) : (
            ""
          )}
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
            onClick={() => handlePress33()}
          >
            Новый трек
          </button>
        </div>
        <div className="bigOrder">
          <div className="mainOrder">
            {/*<div className="minOrder" onClick={() => handlePress()}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "30%",
                }}
              >
                <img src="https://github.com/twbs.png" alt="" />
                <div>
                  <h1 style={{ height: "7px" }}>YT8929328214977</h1>
                  <p style={{ marginLeft: 7, fontSize: "15px" }}>
                    Санкт-Петербург, ул. Рубинштейна 17
                  </p>
                </div>
              </div>
              <p style={{ marginRight: 7 }}>Доставлено</p>
              </div>*/}
            {order.map((item) => {
              return (
                <div className="minOrder">
                  <div
                    style={{
                      display: "flex",
                      // alignItems: "center",
                      // justifyContent: "space-between",
                      width: "40%",
                    }}
                  >
                    <img src="https://github.com/twbs.png" alt="" />
                    <div>
                      <h1 style={{ height: "7px" }}>{item.trek_id}</h1>
                    </div>
                    <h1 style={{ height: "7px", fontSize: 15, marginTop: 15 }}>
                      {item.time_create.slice(0, 10)}
                    </h1>
                  </div>
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
