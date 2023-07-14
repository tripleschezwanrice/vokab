import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { auth } from '../firebase';

const SignOut = ({setLoading}) => {
        function signOutGoogle(){
      setLoading(true);


    
        const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      setLoading(false);
    }).catch((error) => {
      // An error happened.
    });
}

  return (
   
        <button onClick={signOutGoogle} className="font-semibold border text-xl px-2 py-1 border-[#ffbe19] text-[#ffbe19]">
            Log Out
        </button>
     

  )
}

export default SignOut
