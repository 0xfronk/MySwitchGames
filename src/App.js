import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Landing } from "./pages/Landing";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const { userAuth } = useContext(AuthContext);
  const isReady = userAuth.isReady;
  return (
    <div className="App font-Raleway bg-background-900 min-h-screen">
      {isReady && (
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/gamelist/:id" element={<Home />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
