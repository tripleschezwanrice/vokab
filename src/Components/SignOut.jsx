import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

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
   
        <Link to="/"><button onClick={signOutGoogle} className="min-w-[75px] font-semibold md:border text-sm sm:text-base md:text-lg lg:text-xl px-2 py-1 md:border-[#ffbe19] text-[#ffbe19] flex justify-center text-center mx-auto hover:bg-[#1d201f] md:hover:bg-[#1d1c1a] w-32 m-1 p-1">
            Log Out
        </button></Link >
     

  )
}

export default SignOut
