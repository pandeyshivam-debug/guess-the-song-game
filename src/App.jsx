import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage'
import GamePage from './pages/GamePage'
import ResultsPage from './pages/ResultsPage'
import LoadingPage from './pages/LoadingPage'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('auth')
  const [user, setUser] = useState(null)
  const [gameScore, setGameScore] = useState(0)
  const [gameAnswers, setGameAnswers] = useState([])
  const [songs, setSongs] = useState([])
  const [songsLoaded, setSongsLoaded] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('guessTheSongUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setCurrentPage('loading')
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('guessTheSongUser', JSON.stringify(userData))
    setCurrentPage('loading')
  }

  const handleSongsLoaded = (loadedSongs) => {
    setSongs(loadedSongs)
    setSongsLoaded(true)
    setCurrentPage('game')
  }

  const handleLoadingError = () => {
    setCurrentPage('auth')
    setUser(null)
    localStorage.removeItem('guessTheSongUser')
  }

  const handleGameComplete = (score, answers) => {
    setGameScore(score)
    setGameAnswers(answers)
    setCurrentPage('results')
  }

  const handlePlayAgain = () => {
    setGameScore(0)
    setGameAnswers([])
    setCurrentPage('game')
  }

  const handleLogout = () => {
    setUser(null)
    setSongs([])
    setSongsLoaded(false)
    localStorage.removeItem('guessTheSongUser')
    setCurrentPage('auth')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {currentPage === 'auth' && (
        <AuthPage onLogin={handleLogin} />
      )}
      {currentPage === 'loading' && (
        <LoadingPage 
          user={user}
          onSongsLoaded={handleSongsLoaded}
          onError={handleLoadingError}
        />
      )}
      {currentPage === 'game' && (
        <GamePage 
          user={user} 
          songs={songs}
          onGameComplete={handleGameComplete}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'results' && (
        <ResultsPage 
          user={user}
          score={gameScore}
          answers={gameAnswers}
          onPlayAgain={handlePlayAgain}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App