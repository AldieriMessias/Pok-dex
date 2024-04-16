const pokemonName = document.getElementById("pokemonName");
const pokemonNumber = document.getElementById("pokemonNumber");
const pokemonImg = document.getElementById("pokemonImg");
const form = document.getElementById("form");
const inputSearch = document.getElementById("inputSearch");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let searchPokemon = 1;

const clearDisplays = () => {
  pokemonName.innerHTML = "";
  pokemonNumber.innerHTML = "";
  pokemonImg.src = "";
};

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    //console.log(APIResponse);
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";
  pokemonImg.src = "";

  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    //pokemonImg.src = data["sprites"]["version"]["generation-v"]["black-white"]["animated"]["front_default"];
    pokemonImg.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
    //console.log(data);
    inputSearch.value = "";
    searchPokemon = data.id;
  } else {
    inputSearch.value = "";
    //console.log("Pokemon não existe!");
    pokemonName.innerHTML = "Pokémon don't exist";
    pokemonNumber.innerHTML = "";
    pokemonImg.src = "";
    setTimeout(clearDisplays, 5000);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //console.log(inputSearch.value);
  renderPokemon(inputSearch.value.toLowerCase());
});

prevBtn.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
nextBtn.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
