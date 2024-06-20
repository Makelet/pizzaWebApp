import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorite from './pages/Favorite'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorite" element={<Favorite />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
