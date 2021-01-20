import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PokeList from "./components/PokeList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Pokemon info</h1>
        <PokeList />
      </header>
    </div>
  );
}

export default App;
