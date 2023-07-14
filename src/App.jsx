import { useEffect, useState } from "react"
import getMeanings from "./Components/Meanings"
import Search from "./Components/Search"
import Navbar from "./Components/Navbar"
import RecentlyAdded from "./Components/RecentlyAdded"
import Words from "./Components/Words"
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

function App() {

  const [loading, setLoading] = useState(true);
  const [meanings,setMeanings] = useState([])
  const [searched,setSearched] =useState([])
  const [word,setWord] = useState('')
  const [recent,setRecent] = useState([])

  useEffect(()=>{
    getMeanings(word) 
   .then(data=>{
    setMeanings(data)
    
  
console.log(meanings)})
  },[word])

 
  return (

    <>
 <BrowserRouter >
    <Navbar  setLoading={setLoading}/>
    <Routes>
    <Route path="/" element={<Search word={word} setWord={setWord} meanings={meanings} recent={recent} setRecent={setRecent}/> 
}/>
<Route path="/" element={<RecentlyAdded recent={recent}/> }/>
    
<Route path="/words" element={<Words meanings={meanings} loading={loading} setLoading={setLoading} setMeanings={setMeanings} /> }/>
    </Routes>
 
 </BrowserRouter>
    </>

  )
}

export default App
