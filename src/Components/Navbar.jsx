import React from 'react'
import Logo from './Logo.png'
import {useAuthState} from 'react-firebase-hooks/auth'
import SignOut from './SignOut'
import SignIn from './SignIn'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import Words from './Words'

const Navbar = ({setLoading}) => {

  const [user] = useAuthState(auth)

  return (
    <div className='w-full p-2 '>
        <div className='max-w-[1080px] flex justify-between mx-auto items-center'>
            <Link to="/"><img src={Logo} alt="" className='w-48'/></Link>
        <div className=''>

        </div>
            <div className='flex items-center'>
            {user? 
            <div className='text-[#ffbe19] flex gap-12 font-semibold text-xl items-center'>
             <Link to='/words' > My Words</Link>
        <SignOut setLoading={setLoading}/>
        </div>
              :
              <div className='text-[#ffbe19] flex gap-12 font-semibold text-xl'>
          <SignIn setLoading={setLoading}/>
          </div>}

            </div>
        </div>
      
    </div>
  )
}

export default Navbar
