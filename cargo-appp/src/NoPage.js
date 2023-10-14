import React from "react";

export default function NoPage() {
  return (
    <div>
      <div style={{ width: "40%", height: 600, margin: "auto" }}>
        <img
          src="https://img.freepik.com/premium-vector/error-404-vector-concept-illustration_26551-285.jpg"
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <center>
        <h1>404 Page not found</h1>
        <a href="/">
          <button style={{ width: 200, height: 40, border: 'none', borderRadius: 3, color: 'white', background: '#800000' }}>Go Home!</button>
        </a>
      </center>
    </div>
  );
}
