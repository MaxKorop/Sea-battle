import React, { useState, useEffect } from "react";
import Title from "./Title/Title";
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const [code, setCode] = useState("");
  const [connected, setConnected] = useState(false);

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleConnectClick = () => {
    setConnected(true);
  };

  const handleCreateClick = () => {
    setCode("");
    setConnected(false);
    navigate('/game')
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ margin: "0 auto" }}>
        <Title /> {/* Title у окремому диві */}
      </div>
      <div
        style={{
          marginTop: 200, /* Відступ 200px між Title і інпутом з кнопками */
          width: 500,
          height: 300,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", /* Вирівнювання по центру */
        }}
      >
        <h1 style={{ fontFamily: "Roboto", fontSize: 24, fontWeight: "bold" }}>
          Введіть код сеансу
        </h1>
        <input
          type="text"
          value={code}
          onChange={handleInputChange}
          style={{
            width: "100%",
            height: 40,
            backgroundColor: "#ffffff",
            borderColor: "#000000",
            borderRadius: 5,
            margin: "0 auto",
            marginBottom: 25, /* Відступ 25px між інпутом і кнопками */
          }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleConnectClick}
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              width: "50%",
              height: 40,
              borderRadius: 5,
            }}
          >
            Connect
          </button>
          <button
            onClick={handleCreateClick}
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              width: "50%",
              height: 40,
              borderRadius: 5,
            }}
          >
            Start Game Now!
          </button>
        </div>
        {connected && (
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: 16,
              fontWeight: "normal",
              color: "#000000",
            }}
          >
            Підключено до сеансу з кодом: {code}
          </p>
        )}
      </div>
    </div>
  );
};

export default StartPage;


