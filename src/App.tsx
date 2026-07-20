import Court from './components/Court'
import PlayersPanel from './components/PlayersPanel'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Volleyball Rotation Simulator</h1>
      <div className="main-layout">
        <PlayersPanel />
        <Court />
      </div>
    </div>
  )
}

export default App
