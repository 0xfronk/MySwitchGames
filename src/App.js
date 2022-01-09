import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";

function App() {
  const { userAuth } = useContext(AuthContext);
  const isReady = userAuth.isReady;
  return <div className="App font-Raleway">{isReady && <Navbar />}</div>;
}

export default App;
