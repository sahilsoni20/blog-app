import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./lib/FireBase";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { CreatePost } from "./pages/CreatePost"

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser)=> {
      if (currentUser) {
        return setIsUserSignedIn(true);
      } else {
        return setIsUserSignedIn(false)
      }
    })
  },[])

  return (
    <Router>
      <NavBar isUserSignedIn={isUserSignedIn} />

      {isUserSignedIn === true ? (
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
