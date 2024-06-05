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
    <nav className="flex justify-around text-center items-center w-full bg-white h-20 text-2xl">
      <NavLink to="/" className="hover:text-blue-400 hover:underline ">Home</NavLink>
      {isUserSignedIn === true ? (
        <>
          <NavLink to="/createPost">Create Post</NavLink>
          <button onClick={userSignOut} className="hover:text-blue-300 hover:underline ">Log Out</button>
        </>
      ) : (
        <NavLink to="/login" className="hover:text-blue-300 hover:underline ">Login</NavLink>
      )}
    </nav>
  );
}
