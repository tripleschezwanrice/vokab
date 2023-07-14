import React, { useEffect } from 'react'

const RecentlyAdded = ({recent}) => {
 
  return (
    <div className='w-full mt-24'>
        <div className='max-w-[1080px]  mx-auto'>

        <div className='grid mx-auto text-6xl font-bold max-w-[1080px] text-center text-[#ffbe19] '>
            Recently Added 
        </div>
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
           { recent.length>3 && <button className='bg-[#ffbe19] text-[#1d1b1e] m-3 font-bold w-[30%] mt-6 p-2 text-xl flex mx-auto justify-center'>
               See All Words
            </button>}
            
        </div>

        </div>

  )
}

export default RecentlyAdded
