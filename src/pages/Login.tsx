import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "../lib/FireBase";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleAuthProvider).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      {firebaseAuth.currentUser ? (
        ""
      ) : (
        <div>
          <h1>
            Want to Create a Post ?<span>Sign in First</span>
          </h1>
          <button onClick={signInWithGoogle}>
            <FcGoogle /> Sign in with Google
          </button>
        </div>
      )}
    </>
  );
}
