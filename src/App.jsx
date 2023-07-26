import { useEffect, useState } from "react"
import getMeanings from "./Components/Meanings"
import Search from "./Components/Search"
import Navbar from "./Components/Navbar"
import Words from "./Components/Words"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [loading, setLoading] = useState(true);
  const [wordSearching,setWordSearching] = useState(false)
  const [meanings,setMeanings] = useState([])
  const [searched,setSearched] =useState([])
  const [word,setWord] = useState('')

  useEffect(()=>{
    setWordSearching(true)
    getMeanings(word)
    .then(data=>{
    setSearched(data)
    setWordSearching(false)
})
  },[word])


  return (

    <>
 <BrowserRouter >
    <Navbar  setLoading={setLoading} setMeanings={setMeanings}/>
    <Routes>
    <Route path="/vokab" element={<Search word={word} setWord={setWord} meanings={meanings} setLoading={setLoading} searched={searched} loading={loading} wordSearching={wordSearching}/> 
}/>
 
<Route path="/vokab/words" element={<Words meanings={meanings} loading={loading} setLoading={setLoading} setMeanings={setMeanings} setWord={setWord}/> }/>
    </Routes>
 
 </BrowserRouter>
    </>

  )
}

export default App
