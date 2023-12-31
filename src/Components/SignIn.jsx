import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
const SignIn = ({setLoading}) => {
 
    function signInWithGoogle(){
      
      const provider = new GoogleAuthProvider();
      
      setLoading(true)
      signInWithPopup(auth, provider)
      .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            setLoading(false)
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
    }

  return ( 
        <button onClick={signInWithGoogle} className="min-w-[70px] font-semibold border text-sm sm:text-base md:text-lg lg:text-xl px-2 py-1 border-[#ffbe19] text-[#ffbe19] flex">
          Sign In 
        </button>
  );
};

export default SignIn;
