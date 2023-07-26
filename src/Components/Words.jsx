import {collection, query, where, orderBy, getDocs,deleteDoc,doc  } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useState, useEffect } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import {AiOutlineDelete} from 'react-icons/ai'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'



const Words = ({ meanings, setMeanings, loading,setLoading,setWord }) => {

  const user = auth.currentUser;
  const userId = user?.uid;
  const [userLogged] = useAuthState(auth)
const [deleting,setDeleting] = useState(false)

  const delDoc = async (docID) =>{
    setDeleting(true)
    try {
      await deleteDoc(doc(db,"vocab", docID));
      setDeleting(false)

    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
   
        setWord("")
        if (userId) {
          const messagesRef = collection(db, 'vocab');
          const sortedQuery = query(messagesRef, orderBy('timestamp', 'asc'), where('uid', '==', userId));

          const querySnapshot = await getDocs(sortedQuery);
          const updatedMeanings = querySnapshot.docs.map((doc) => doc.data());
          setMeanings(updatedMeanings);
        }
        setLoading(false)

      } catch (error) {
        console.error('Error getting documents:', error);
      }
    };

    fetchData();
  }, [loading,user,deleting]);


  return (
    <>
        {
           userLogged && <div className='mt-12 text-3xl md:text-4xl lg:text-5xl font-bold text-[#ffbe19] flex mx-auto justify-center'>
            {user.displayName.split(" ")[0]}'s Vokab
          </div>
        }
        {
          loading && <AiOutlineLoading3Quarters className='animate-spin  mt-20 text-3xl md:text-4xl lg:text-5xl text-[#ffbe19] flex mx-auto justify-center'/>
        }
      <div className='flex flex-wrap mx-auto justify-center gap-4 mt-6 p-4  max-w-[1080px]'>
        {!loading && userLogged && meanings!=404 && meanings.map((w) => (
          <div className='border border-[#ffbe19] w-[512px] sm:w-[40%] md:w-[35%] lg:w-[30%] text-white p-2' key={w.timestamp}>
            <div className="flex items-center justify-between flex-wrap break-words gap-4">
              
            <p className='font-extrabold underline-offset-1 overflow-hidden underline lg:text-2xl md:text-xl text-lg break-words'>{w.word[0].toUpperCase() + w.word.slice(1)}</p>
            <button onClick={()=>{delDoc(w.documentId)}}><AiOutlineDelete size={25} className='hover:text-red-600'/></button>
            </div>

            <p className='text-sm md:text-md lg:text-lg '>{w.definition}</p>
          </div>
        ))}
      
         {
          !loading && userLogged && meanings?.length==0 &&  <p className="border border-[#ffbe19] flex mx-auto justify-center text-white text-xl p-12 ">Your Added Words Will Appear Here </p>
        }
      </div>
    </>
  );
};

export default Words;
