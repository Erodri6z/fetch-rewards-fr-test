
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Nav from './components/Nav/Nav'

function App() {
  return (
    <>
    <Nav />
    <Routes>
      <Route
      path="/"
      element={
        <Landing />
        }
      />
    </Routes>
    </>
  )
}

export default App
