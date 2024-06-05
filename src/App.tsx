import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./lib/FireBase";

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
    </Router>
  );
}

export default App;
