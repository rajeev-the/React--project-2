import React from 'react'
import {BrowserRouter as  Router ,Routes , Route} from 'react-router-dom'
import  Header from './Components/Header'
import Home from './Components/Home'
import Coins from './Components/coins'
import CoinsDetails from './Components/CoinDetails'
import Exchanges from './Components/Exchanges'
const App = () => {
  return (
   <Router>

    <Header/>

    <Routes>

      <Route  path='/' element={<Home/>}/>
      <Route  path='/coinsdetails' element={<CoinsDetails/>}/>
      <Route  path='/exchanges' element={<Exchanges/>}/>
      <Route  path='/coins' element={<Coins/>}/>
    </Routes>
   </Router>
  )
}

export default App
