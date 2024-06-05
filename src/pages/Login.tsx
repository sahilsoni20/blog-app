import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "../lib/FireBase";
import { useNavigate } from "react-router-dom";

export function Login() {
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
        <div className="min-h-screen items-center flex flex-col justify-center text-center">
          <h1 className="flex flex-col text-3xl mb-5">
            Want to Create a Post ?
            <span className="text-2xl m-8">Sign in First</span>
          </h1>
          <button
            onClick={signInWithGoogle}
            className="flex text-2xl max-w-full max-h-full p-2.5 rounded-full bg-[#e6d1b4] shadow-xl"
          >
            <FcGoogle size={32} className="mr-3" /> Sign in with Google
          </button>
        </div>
      )}
    </>
  ); 
}
