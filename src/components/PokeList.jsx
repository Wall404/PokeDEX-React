import { useEffect, useState, memo } from "react";
import PokeCard from "./PokeCard";
import axios from "axios";

import { CardDeck } from "react-bootstrap";
import "./Poke.css";

const PokeList = () => {
  const [pokemons, setPokemonList] = useState([]);
  let PAGE_LIMIT = 6;

  const apiURL = "https://pokeapi.co/api/v2/pokemon/";

  const getPkmnList = async () => {
    try {
      let response = await axios(`${apiURL}?limit=${PAGE_LIMIT}`);
      setPokemonList(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPkmnList();
    // return console.log("ok");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   console.log(pokemons);

  return (
    <div className="container">
      <div className="list-group">
        {pokemons.length ? (
          pokemons.map((pkmn) => (
            <PokeCard key={pkmn.name} pokeURL={pkmn.url} />
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default memo(PokeList);
