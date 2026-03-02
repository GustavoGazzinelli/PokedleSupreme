// scripts/generate-canonical-pokemons-ptbr.cjs
const fs = require("fs");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const API = "https://pokeapi.co/api/v2/pokemon-species?limit=10000";

function getGen(id) {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 905) return 8;
  if (id <= 1025) return 9;
  return 10;
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro ao buscar ${url}`);
  return res.json();
}

async function getPokemon(species) {
  const defaultVar = species.varieties.find(v => v.is_default);
  if (!defaultVar) return null;

  const pokemon = await fetchJSON(defaultVar.pokemon.url);

  const bst = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);

  // Nome em português
  const nome_ptbr_obj = species.names.find(n => n.language.name === "pt-BR");
  const nome_ptbr = nome_ptbr_obj ? nome_ptbr_obj.name : pokemon.name;

  return {
    id: pokemon.id,
    nome: nome_ptbr,
    tipo1: pokemon.types[0].type.name,
    tipo2: pokemon.types[1]?.type.name ?? "None",
    gen: getGen(pokemon.id),
    fase: species.evolves_from_species ? 2 : 1,
    cores: [species.color.name],
    altura: pokemon.height / 10,
    peso: pokemon.weight / 10,
    bst,
    sprite: pokemon.sprites.front_default
  };
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

(async () => {
  console.log("Buscando lista de todas as espécies...");
  const listData = await fetchJSON(API);
  const speciesList = listData.results;

  const pokemons = [];
  for (let i = 0; i < speciesList.length; i++) {
    const s = speciesList[i];
    console.log(`Buscando ${i + 1}/${speciesList.length}: ${s.name}`);
    try {
      const speciesData = await fetchJSON(s.url);
      const p = await getPokemon(speciesData);
      if (p) pokemons.push(p);
    } catch (e) {
      console.error(`Erro em ${s.name}: ${e}`);
    }
  }

  shuffle(pokemons);

  fs.writeFileSync("pokemon.json", JSON.stringify(pokemons, null, 2), "utf-8");
  console.log("✅ pokemon.json gerado!");
})();