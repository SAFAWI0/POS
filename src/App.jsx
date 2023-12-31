import "./App.css";
import AppContainer from "./components/Contaner/container";
import Header from "./components/Header/header";
import { Items } from "./components/Items/item";

function App() {
  return (
    <>
      <Header />
      <AppContainer>
        <Items />
      </AppContainer>
    </>
  );
}

export default App;
