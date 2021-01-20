import { useEffect, useState, memo } from "react";
import PokeCard from "./PokeCard";

import Pagination from "react-js-pagination";
import "./Poke.css";

const PokeList = () => {
  const [result, setResult] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [load, setLoad] = useState(true);

  let PAGE_LIMIT = 101;
  let OFFSET = 20;

  const apiURL = "https://pokeapi.co/api/v2/pokemon/";

  const pokeArr = [];

  useEffect(() => {
    // getPkmnList();

    fetch(`${apiURL}?limit=${PAGE_LIMIT}&${OFFSET}`)
      .then((response) => response.json())
      .then((data) =>
        setResult(
          data.results.map((item) => {
            fetch(item.url)
              .then((response) => response.json())
              .then((allPokemon) => pokeArr.push(allPokemon));
            setPokemons(pokeArr);
          })
        )
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  setTimeout(() => {
    setLoad(false);
  }, 5000);

  pokemons.sort(function (a, b) {
    return a.id - b.id;
  });
  console.log(pokemons);

  // pagination

  const pokePerPage = 6;
  const [activePage, setCurrentPage] = useState(1);

  // Logic for displaying current pokemons
  const indexOfLastPokemon = activePage * pokePerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokePerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="list-group">
        {currentPokemons.length ? (
          currentPokemons.map((pkmn) => (
            <PokeCard key={pkmn.name} pokemon={pkmn} />
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <div className="pagination justify-content-center">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={5}
          totalItemsCount={pokemons.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link btn btn-dark"
        />
      </div>
    </div>
  );
};

export default memo(PokeList);
