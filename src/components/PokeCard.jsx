// import { Card } from "react-bootstrap";
import { useEffect, useState, memo } from "react";
// import axios from "axios";

const PokeCard = ({ pokeURL }) => {
  const [pokemon, setPoke] = useState({
    abilities: [{}],
    base_experience: null,
    forms: [{}],
    id: null,
    moves: [{}],
    name: "",
    sprites: {},
    stats: [{}],
    types: [{}],
    weight: null,
  });

  const poke = pokemon;

  const getPkmn = async () => {
    await fetch(pokeURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (pokemon) {
        setPoke({
          abilities: pokemon.abilities,
          base_experience: pokemon.base_experience,
          forms: pokemon.forms,
          id: pokemon.id,
          moves: pokemon.moves,
          name: pokemon.name,
          sprites: pokemon.sprites,
          stats: pokemon.stats,
          types: pokemon.types,
          weight: pokemon.weight,
        });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getPkmn();
    return () => {
      localStorage.setItem("state", poke);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        className="btn card poke-card flip-card list-group-item"
        data-toggle="modal"
        data-target="#exampleModal"
        style={{ width: "18rem" }}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              className="card-img-top"
              src={poke.sprites.front_default}
              alt={poke.name}
            />

            <div className="card-text">
              <h5 className="card-title">
                #{poke.id} <strong>{poke.name}</strong>
              </h5>
            </div>

            <div className="w-100 justify-content-between">
              <h6>Types</h6>
              {poke.types.map((item, index) => (
                <ul className="attr-list">
                  <li key={`${poke.name}${item}${index}`}>{item.type.name}</li>
                </ul>
              ))}
            </div>
          </div>
          <div className="card flip-card-back">
            <div className="">
              <img
                className="card-img-top"
                src={poke.sprites.back_default}
                alt={poke.name}
              />
              <div className="card-text">
                <h3>Stats</h3>
                {poke.stats.map((item) => (
                  <ul className="attr-list">
                    <li>
                      <strong>{item.stat.name}:</strong> {item.base_stat}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(PokeCard);
