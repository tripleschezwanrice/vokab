import React, { useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import SignOut from './SignOut'
import SignIn from './SignIn'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RxCross2} from 'react-icons/rx'

const Navbar = ({setLoading,setMeanings,meanings}) => {


  const [sidebar,setSidebar] = useState(false)
  const [user] = useAuthState(auth)
  return (
    <div className='w-full p-4'>
        <div className='max-w-[1080px] flex  justify-center gap-12 mx-auto items-center'>
            <div className='flex items-center '>
            {user? 
            <div className='text-[#ffbe19] flex gap-24 font-semibold text-sm sm:text-base md:text-lg lg:text-xl items-center'>
             <Link to='/vokab/words' className='md:grid hidden'>Saved</Link>
            <Link to="/vokab" className='font-custom text-lg md:text-2xl lg:text-3xl '>Vokab</Link>

<div className='md:flex hidden'>
        <SignOut setLoading={setLoading} setMeanings={setMeanings} size={25}/>
</div>

<div className="relative inline-block text-left md:hidden">
   
          <button className="px-4 py-2  font-semibold" onClick={()=>{setSidebar(!sidebar)}}>
            {
              sidebar?
              <RxCross2 className= "font-extrabold" size={25}/>
              :
          <GiHamburgerMenu size={25}/>
            }
          </button>
        
      <div className={`${sidebar?"flex duration-200":"hidden duration-200"}  z-40 origin-top-right absolute right-0  border border-[#ffbe19] bg-[#1d1c1a] shadow-[#ffbe19]`}>
        <div className=" flex flex-col  " role="menu"  aria-labelledby="options-menu">
          <Link to="/vokab" className="w-32 text-[#ffbe19] px-2 py-1 justify-center text-center text-sm sm:text-base md:text-lg  m-1 p-1  hover:bg-[#1d201f]">Home</Link>
          <Link to="/vokab/words"><p href="#" className="w-32 text-[#ffbe19] justify-center text-center text-sm sm:text-base md:text-lg hover:bg-[#1d201f]  px-2 py-1 m-1 p-1" role="menuitem">Saved</p></Link>
          <SignOut setLoading={setLoading} setMeanings={setMeanings} size={25}/>
        </div>
      </div>
    </div>
        </div>
              :
              <div className='text-[#ffbe19] flex gap-12 font-semibold text-xl items-center '>
            <Link to="/vokab" className='font-custom text-lg md:text-2xl lg:text-3xl '>Vokab</Link>
            

          <SignIn setLoading={setLoading} className="mx-auto flex justify-center"/>
          
          </div>}

            </div>
        </div>
      
    </div>
  )
}

export default Navbar
