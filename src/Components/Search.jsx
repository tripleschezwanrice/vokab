import React, { useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import {Link} from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db,auth } from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth'



const Search = ({word, setWord, meanings, recent, setRecent}) => {

  const user = auth.currentUser;
const userId = user?.uid;
const [userLogged] = useAuthState(auth)



  const messagesRef = collection(db, "vocab");

  function handleSubmit(e) {
    e.preventDefault();
    setWord(e.target.text.value);
  }
console.log(meanings)
  
 function handleClick(word, definition, pof) {
    addDoc(messagesRef, {word:word,definiton:definition,timestamp: new Date(),uid:userId})
    .then((docRef) => {
      console.log('Document written with ID:', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document:', error);
    })
  }

  return (
    <div className="grid mx-auto max-w-[1080px] mt-12">
      <form action="" className="text-xl " onSubmit={handleSubmit}>
        <input
          name="text"
          className="outline-none w-[75%] flex mx-auto p-2 border-2 border-[#ffbe19] "
          type="text"
          placeholder="Search For Words..."
        />
      </form>

      <div className="w-[75%] grid mx-auto mt-2 h-60 overflow-y-auto hide-scrollbar">
        {meanings !== 404 &&    
          word.length >= 1 && meanings.length!=0 &&
          meanings.map((meaning,index) => {
            return meaning.meanings?.map((meaning,index1) => {
              return meaning.definitions.map((definition, index2) => (
                <div
                  key={`${index}-${index1}-${index2}`}
                  className="text-xl gap-1 items-center text-white flex my-1 w-[99%]  "
                >
                  
                  <div className="gap-2 p-2  border-[#ffbe19] border w-[94%] h-[100%]">
                    <p className="w-full font-thin italic text-slate-400 text-sm ">
                      {meaning.partOfSpeech}
                    </p>
                    {definition.definition}
                  </div>
                  <button onClick={()=>{handleClick(word,definition.definition,meaning.partOfSpeech)}} className="text-4xl text-[#ffbe19] border-[#ffbe19] grid mx-auto w-[7%] h-[100%] border font-thin text-center items-center hover:bg-[#ffbe19] hover:text-[#1d1c1a] duration-100">
  +
</button>

              
                </div>
              ));
            });
          })}
        {meanings === 404 && word.length !== 0 && (
          <div className="text-xl w-full text-[#ffbe19] font-light border border-[#ffbe19]">
            <p className="flex items-center justify-center -mt-4 h-[100%]">
  No Meanings Found!
</p>

          </div>
        )}
        {word.length === 0 && (
          <div className="text-xl w-full text-[#ffbe19] font-light border border-[#ffbe19]">
            <p className="flex items-center justify-center -mt-4 h-[100%]">
              Enter a Word Above
            </p>
          </div>
        )}
      </div>

      <div className='w-full mt-24'>
        <div className='max-w-[1080px]  mx-auto'>

        {userLogged && <div className='grid mx-auto text-6xl font-bold max-w-[1080px] text-center text-[#ffbe19] '>
            Recently Added 
        </div>}
        {!userLogged && <div className='grid mx-auto text-6xl font-bold max-w-[1080px] text-center text-[#ffbe19] '>
            Login To Save Words
        </div>}
        <div className='flex flex-wrap mx-auto justify-center gap-4 mt-6 p-2'>
            {
recent!=undefined && recent.length>3 && recent.slice(recent.length-4,recent.length).map(w=>(
    <div className='border border-[#ffbe19] w-[216px] text-white p-2'>
    <p className='font-extrabold underline-offset-1 underline text-2xl'>{w.word}</p>
    <p>{w.definition}</p>
</div>
))
            }
             {
recent!=undefined && recent.length<=3 && recent.slice(0,recent.length).map(w=>(
    <div className='border border-[#ffbe19] w-[216px] text-white p-2'>
    <p className='font-extrabold underline-offset-1 underline text-2xl'>{w.word}</p>
    <p>{w.definition}</p>
</div>
))
            }
            </div>
           { recent.length>3 && <Link to="/words" className='bg-[#ffbe19] text-[#1d1b1e] m-3 font-bold w-[30%] mt-6 p-2 text-xl flex mx-auto justify-center'>
               See All Words
            </Link>}
            
        </div>

        </div>
    </div>
  );
};

export default Search;
