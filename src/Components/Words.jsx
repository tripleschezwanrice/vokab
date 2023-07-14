import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth'


const Words = ({ meanings, setMeanings, loading,setLoading }) => {
  console.log(loading)
  const user = auth.currentUser;
  const userId = user?.uid;
  const [userLogged] = useAuthState(auth)


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const messagesRef = collection(db, 'vocab');
          const sortedQuery = query(messagesRef, orderBy('timestamp', 'asc'), where('uid', '==', userId));

          const querySnapshot = await getDocs(sortedQuery);
          const updatedMeanings = querySnapshot.docs.map((doc) => doc.data());
          setMeanings(updatedMeanings);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error getting documents:', error);
      }
    };

    fetchData();
  }, [loading,userLogged]);

  if (loading) {
    return <div>Loading...</div>;
  } 
  console.log(meanings)
  return (
    <>
      <div className='flex flex-wrap mx-auto justify-center gap-4 mt-6 p-2'>
        {userLogged && meanings!=404 && meanings.map((w) => (
          <div className='border border-[#ffbe19] w-[216px] text-white p-2' key={w.timestamp}>
            <p className='font-extrabold underline-offset-1 underline text-2xl'>{w.word}</p>
            <p>{w.definiton}</p>
          </div>
        ))}
        {
          !userLogged && <div className='border border-[#ffbe19] w-[216px] text-white flex flex-wrap mx-auto justify-center gap-4 mt-6 p-2'>
            Log in to See your words
          </div>
        }
      </div>
    </>
  );
};

export default Words;
