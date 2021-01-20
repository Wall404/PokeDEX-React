const PokeCard = ({ pokemon }) => {
  return (
    <div
      className="btn card poke-card flip-card list-group-item"
      style={{ width: "18rem" }}
      key={pokemon.name}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2 className="card-title">
            #{pokemon.id} <strong>{pokemon.name}</strong>
          </h2>
          <img
            className="card-img-top"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          <div className="card-text">
            <div className="separator"></div>
            <h5>Types</h5>
            <ul className="attr-list types-items">
              {pokemon.types.map((item, index) => (
                <li key={`${pokemon.name}${item}${index}`}>{item.type.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card flip-card-back">
          <div className="">
            <h2 className="card-title">
              #{pokemon.id} <strong>{pokemon.name}</strong>
            </h2>
            <img
              className="card-img-top"
              src={pokemon.sprites.back_default}
              alt={pokemon.name}
            />
            <div className="card-text">
              <h5>Stats</h5>
              <ul className="attr-list">
                {pokemon.stats.map((item) => (
                  <li>
                    <strong>{item.stat.name}</strong>: {item.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
