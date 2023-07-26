import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { collection,  doc, setDoc, query, where, orderBy, getDocs  } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'





const Search = ({ word, setWord, searched, setLoading, loading, wordSearching }) => {

  const user = auth.currentUser;
  const userId = user?.uid;
  const [userLogged] = useAuthState(auth)
  const [recent, setRecent] = useState([])

  const messagesRef = collection(db, "vocab");

  function handleSubmit(e) {
    e.preventDefault();
    setWord(e.target.text.value);
  }

  function generateCustomId() {
    const timestamp = new Date().getTime();
    const uniqueId = Math.random().toString(36).substring(2, 10); 

    return `${timestamp}-${uniqueId}`;
  }


  function handleClick(word, definition, pof) {
    setLoading(true)

    const documentId = generateCustomId(); 
    const newDocRef = doc(messagesRef, documentId);

    setDoc(newDocRef, {
      word: word,
      definition: definition,
      timestamp: new Date(),
      uid: userId,
      name: user.displayName,
      documentId: documentId
    })
    
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error adding document:', error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {

      try {
        if (userId) {
          const messagesRef = collection(db, 'vocab');
          const sortedQuery = query(messagesRef, orderBy('timestamp', 'asc'), where('uid', '==', userId));

          const querySnapshot = await getDocs(sortedQuery);
          const updatedMeanings = querySnapshot.docs.map((doc) => doc.data());
          setRecent(updatedMeanings);
        }
        
     
setLoading(false)
      } catch (error) {
        console.error('Error getting documents:', error);
      }
    };

    fetchData();
  }, [loading,user]);

  return (
    <div className="grid mx-auto max-w-[1080px] mt-12 z-0">
      <form action="" className="text-sm md:text-base  lg:text-xl " onSubmit={handleSubmit}>
        <input
          name="text"
          className="outline-none w-[75%] flex mx-auto p-2 border-2 border-[#ffbe19] capitalize"
          type="text"
          placeholder="Search For Words..."
        />
      </form>

      <div className="w-[75%] grid mx-auto mt-2 h-60 overflow-y-auto hide-scrollbar z-0">
        {searched !== 404 &&
          word?.length >= 1 && searched.length != 0 &&
          searched.map((meaning, index) => {
            return meaning.meanings?.map((meaning, index1) => {
              return meaning.definitions.map((definition, index2) => (
                <div
                  key={`${index}-${index1}-${index2}`}
                  className="text-md md:text-lg lg:text-xl gap-1 items-center text-white flex my-1 w-[99%]  "
                >

                  <div className={`gap-2 p-2  border-[#ffbe19] border ${user ? "lg:w-[94%] md:w-[92%] w-[83%]" : "w-[1000%]"} h-[100%]`}>
                    <p className="w-full font-thin italic text-slate-400 text-sm ">
                      {meaning.partOfSpeech}
                    </p>
                    {definition.definition}
                  </div>
                  {user && <button onClick={() => { handleClick(word, definition.definition, meaning.partOfSpeech) }} className="text-4xl text-[#ffbe19] border-[#ffbe19] grid mx-auto lg:w-[6%] md:w-[8%] w-[17%] h-[100%] border font-thin text-center items-center hover:bg-[#ffbe19] hover:text-[#1d1c1a] duration-100">
                    +
                  </button>}
                </div>
              ));
            });
          })}
        {!wordSearching && searched === 404 && word.length !== 0 && (
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

        {wordSearching && word.length !== 0 && (
          <div className="text-xl w-full text-[#ffbe19] font-light border border-[#ffbe19]">
            <div className="flex items-center justify-center -mt-4 h-[100%]">
              <AiOutlineLoading3Quarters className="animate-spin" size={25} />

            </div>

          </div>
        )}
      </div>

      <div className='w-full mt-24'>
        <div className='max-w-[1080px]  mx-auto'>

          {userLogged && <div className='grid mx-auto text-2xl md:text-4xl lg:text-6xl font-bold max-w-[1080px] text-center text-[#ffbe19] '>
            Recently Added
          </div>}
          {!userLogged && <div className='grid mx-auto text-md md:text-lg lg:text-xl font-thin italic max-w-[1080px] text-center text-slate-500 p-4' >
            Sign In With Your Google Account To Save Words
          </div>}
          <div className='flex flex-wrap mx-auto justify-center gap-4 mt-6 p-2'>
            {
              user && recent != undefined && recent.length > 3 && recent.slice(recent.length - 4, recent.length).map(w => (
                <div className='border border-[#ffbe19] w-[216px] text-white p-2' key={w.documentId}>
                  <p className='font-extrabold underline-offset-1 underline text-lg md:text-xl lg:text-2xl'>{w.word[0].toUpperCase() + w.word.slice(1)}</p>
                  <p className="text-md md:text-lg lg:text-xl">{w.definition}</p>
                </div>
              ))
            }
            {
              user && recent != undefined && recent.length <= 3 && recent.slice(0, recent.length).map(w => (
                <div className='border border-[#ffbe19] w-[216px] text-white p-2'>
                  <p className='font-extrabold underline-offset-1 underline text-2xl'>{w.word}</p>
                  <p>{w.definition}</p>
                </div>
              ))
            }
            {
              !loading && user && recent != undefined && recent.length == 0 &&
              <div className='border border-[#ffbe19] w-[75%] h-full text-white p-2 '>
                <p className="flex mx-auto justify-center p-2 text-sm md:text-md lg:text-lg">Your Added Words Will Appear Here </p>
              </div>
            }
          </div>
          {user && recent.length > 3 && <Link to="/vokab/words" className='bg-[#ffbe19] text-[#1d1b1e] m-3 font-bold w-[30%] mt-6 p-2  text-base md:text-lg lg:text-xl flex mx-auto justify-center'>
            See All
          </Link>}

        </div>

      </div>
    </div>
  );
};

export default Search;
