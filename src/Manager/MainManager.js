import React, { useState } from "react";
import Manager from "./Manager";
import Myzakaz from "./ManagerMyzakaz"
import MyOrders from "./MyOrders"

export default function MainManager() {
  const [page,setPage]=useState(0)



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#343a40",
          width: "12%",
          textAlign: "center",
          height: "100vh",
          color: "white",
          padding: 10,
        }}
      >
        <a href="/" style={{ cursor: "pointer", color: 'white' }}>
          <h1>Go home</h1>
        </a>
        <hr />
        <h1
          onClick={()=>{setPage(0)}}
          style={
            page!==0?
            {
              fontWeight: 100,
              fontSize: 20,
              // background: "#0a58ca",
              padding: 5,
              borderRadius: 5,
              cursor:"pointer"
            }
            :
            {
            fontWeight: 100,
            fontSize: 20,
            background: "#0a58ca",
            padding: 5,
            borderRadius: 5,
            cursor:"pointer"
            }
        }
        >
        Мои заказы
        </h1>
        <h1
          onClick={()=>{setPage(1)}}
          style={
            page!==1?
            {
              fontWeight: 100,
              fontSize: 20,
              // background: "#0a58ca",
              padding: 5,
              borderRadius: 5,
              cursor:"pointer"
            }
            :
            {
            fontWeight: 100,
            fontSize: 20,
            background: "#0a58ca",
            padding: 5,
            borderRadius: 5,
            cursor:"pointer"
            }
          }
        >
        Заказы, полученные мной
        </h1>
        <h1
          onClick={()=>{setPage(2)}}
          style={
            page!==2?
            {
              fontWeight: 100,
              fontSize: 20,
              // background: "#0a58ca",
              padding: 5,
              borderRadius: 5,
              cursor:"pointer"
            }
            :
            {
            fontWeight: 100,
            fontSize: 20,
            background: "#0a58ca",
            padding: 5,
            borderRadius: 5,
            cursor:"pointer"
            }
          }
        >
        Заказы, полученные мной
        </h1>

        <div
          style={
            {
            position: "absolute",
            bottom: 10,
            left: 10,
            fontSize: 12,
            }
        }
        >
          <h1
            style={{
              fontWeight: 400,
            }}
          >
            Manager
          </h1>
        </div>
      </div>
      {page==0?
      <div style={{ width: "80%" }}>
        <Manager />
      </div>:
      page==1?
      <div style={{ width: "80%" }}>
       <Myzakaz />
      </div>:
      page==2?
      <div style={{ width: "80%" }}>
      <MyOrders />
      </div>:"" 
      }
      
    </div>
  );
}
