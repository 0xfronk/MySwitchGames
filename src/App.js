import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Landing } from "./pages/Landing";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <Route path="*" element={<Error />} />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Router>
      )}
    </div>
  );
}

export default App;
