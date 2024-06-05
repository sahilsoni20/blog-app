import { NavLink, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../lib/FireBase";
import { signOut } from "firebase/auth";

type NavBarProps = {
  isUserSignedIn: boolean;
};

export function NavBar({ isUserSignedIn }: NavBarProps) {
  const navigate = useNavigate();
  
  const userSignOut = () => {
    signOut(firebaseAuth).then(() => {
      navigate("/login");
    });
  };

  return (
    <nav className="flex w-full bg-white h-7">
      <NavLink to="/">Home</NavLink>
      {isUserSignedIn === true ? (
        <>
          <NavLink to="/createPost">Create Post</NavLink>
          <button onClick={userSignOut}>Log Out</button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
}
