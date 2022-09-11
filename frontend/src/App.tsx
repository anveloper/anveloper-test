import React from "react";
import { Counter } from "./features/counter/Counter";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import GameRoomList from "./components/GameRoomList";
import Game from "./features/game/Game";

function App() {
  return (
    <div className="App">
      <nav className="App-nav">
        <Link to={"/counter"}>
          <li>카운터</li>
        </Link>
        <Link to={"/game"}>
          <li>게임룸</li>
        </Link>
      </nav>
      <header className="App-body">
        <Routes>
          <Route path="/" element={<h1>Anveloper Test Web</h1>} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/game" element={<GameRoomList />} />
          <Route path="/game/:roomName" element={<Game />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
