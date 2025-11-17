import { useState, useEffect, useRef } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonHistory, setPokemonHistory] = useState([]);
  const intervalRef = useRef(null);

  // Carregar histórico do localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("pokemonHistory") || "[]");
    setPokemonHistory(history);
  }, []);

  // Timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev > 0) return prev - 1;
          clearInterval(intervalRef.current);
          timerComplete();
          return 0;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function startTimer() {
    if (!isPaused) {
      setCurrentTime(workTime * 60);
    }
    setIsRunning(true);
    setIsPaused(false);
  }

  function pauseTimer() {
    setIsRunning(false);
    setIsPaused(true);
  }

  function resetTimer() {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentTime(workTime * 60);
  }

  async function timerComplete() {
    setIsRunning(false);
    setIsPaused(false);
    await showRandomPokemon();
    setTimeout(() => {
      setCurrentTime(workTime * 60);
    }, 3000);
  }

  function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  async function showRandomPokemon() {
    try {
      const id = Math.floor(Math.random() * 898) + 1;
      const res = await fetch("http://localhost:3001/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pokemonId: id }),
      });
      const data = await res.json();
      setPokemon(data);

      const newHistory = [...pokemonHistory, data];
      setPokemonHistory(newHistory);
      localStorage.setItem("pokemonHistory", JSON.stringify(newHistory));
    } catch (err) {
      console.error("Erro ao capturar Pokémon:", err);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🍅 Focus Timer</h1>
        <p>Técnica Pomodoro</p>
      </div>

      <div className="timer-display">
        <div className="time">{formatTime(currentTime)}</div>
        <div className="status">
          {isRunning ? "🔥 Focando..." : isPaused ? "⏸️ Pausado" : "Pronto para começar"}
        </div>
      </div>

      <div className="controls">
        <button onClick={startTimer} disabled={isRunning}>
          Iniciar
        </button>
        <button onClick={pauseTimer} disabled={!isRunning}>
          Pausar
        </button>
        <button onClick={resetTimer} disabled={!isPaused && !isRunning}>
          Reset
        </button>
      </div>

      <div className="settings">
        <label>
          Trabalho (min):
          <input
            type="number"
            min="1"
            max="60"
            value={workTime}
            onChange={e => setWorkTime(Number(e.target.value))}
            disabled={isRunning || isPaused}
          />
        </label>
      </div>

      <div id="pokemon-container">
        {pokemon && (
          <div>
            <h3>{pokemon.name.toUpperCase()}</h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        )}
      </div>

      <div id="pokemon-history">
        <h3>Histórico de Pokémons</h3>
        {pokemonHistory.map(p => (
          <div key={p.id}>
            <strong>{p.name.toUpperCase()}</strong>
            <img src={p.sprites.front_default} style={{ height: 50 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
