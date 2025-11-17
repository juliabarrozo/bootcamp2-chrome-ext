const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());

let lastCapturedPokemon = null;

app.post("/capture", async (req, res) => {
  try {
    const id = Math.floor(Math.random() * 898) + 1; // pokédex até 898
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    lastCapturedPokemon = response.data;
    return res.json(lastCapturedPokemon);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao capturar Pokémon" });
  }
});

app.get("/capture", (req, res) => {
  if (!lastCapturedPokemon) {
    return res.status(404).json({ error: "Nenhum Pokémon capturado ainda" });
  }
  return res.json(lastCapturedPokemon);
});

app.listen(PORT, () => console.log("API rodando na porta 3001"));
