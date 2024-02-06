import React, { useContext, useRef } from "react";
import Title from "./components/Title/Title";
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { v4 } from "uuid";
import RulesButton from "./components/Rules/RulesButton";
import ProfileButton from "./components/Profile/ProfileButton";

const StartPage = observer(() => {
  const codeRef = useRef(null);
  const navigate = useNavigate();
  const { game } = useContext(Context);

  const handleInputChange = () => {
    game.setGameCode(codeRef.current.value);
  };

  const handleConnectClick = () => {
    if (!game.gameCode) {
      alert('You cannot connect without code');
      return;
    }
    const socket = io('ws://localhost:5000', { query: { id: game.gameCode } });
    game.setSocket(socket);
    navigate('/game');
  };

  const handleCreateClick = () => {
    game.setGameCode(v4());
    const socket = io('ws://localhost:5000', { query: { id: game.gameCode } });
    game.setSocket(socket);
    navigate('/game');
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center" }}>
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
          ref={codeRef}
          onChange={() => handleInputChange()}
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
            onClick={() => handleConnectClick()}
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              width: "50%",
              height: 40,
              borderRadius: 5,
              marginRight: 5,
            }}
          >
            Connect
          </button>
          <button
            onClick={() => handleCreateClick()}
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              width: "50%",
              height: 40,
              borderRadius: 5,
              marginLeft: 5,
            }}
          >
            Start Game Now!
          </button>
        </div>
      </div>
      <div style={{ marginTop: 10, width: "100px"}}>
        <RulesButton />
        <ProfileButton />
      </div>
    </div>
  );
});

export default StartPage;


