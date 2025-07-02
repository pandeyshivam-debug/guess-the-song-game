import { useState, useEffect } from 'react'
import { fetchSongs } from '../utils/musicApi'

const LoadingPage = ({ user, onSongsLoaded, onError }) => {
  const [loadingError, setLoadingError] = useState(null)
  const [loadingProgress, setLoadingProgress] = useState(10)
  const [currentSong, setCurrentSong] = useState('')

  useEffect(() => {
    loadSongs()
  }, [])

  const loadSongs = async () => {
    try {
      setLoadingError(null)
      setLoadingProgress(0)
      
      // Check if API key is configured
      if (!import.meta.env.VITE_RAPIDAPI_KEY || import.meta.env.VITE_RAPIDAPI_KEY === 'your_rapidapi_key_here') {
        throw new Error('Spotify API key not configured. Please add your RapidAPI key to the .env file.')
      }
      
      // Simulate progress updates
      // const progressInterval = setInterval(() => {
      //   setLoadingProgress(prev => {
      //     if (prev < 90) return prev + Math.random() * 10
      //     return prev
      //   })
      // }, 500)

      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if(prev < 95) {
            const increment = (100 - prev) * 0.05
            return Math.min(prev + increment, 95)
          }
          return prev
        })
      }, 300)

      const songs = [
        'Shape of You - Ed Sheeran',
        'Blinding Lights - The Weeknd', 
        'Levitating - Dua Lipa',
        'Bad Guy - Billie Eilish',
        'Stay - Justin Bieber'
      ]

      let songIndex = 0
      const songInterval = setInterval(() => {
        if (songIndex < songs.length) {
          setCurrentSong(songs[songIndex])
          songIndex++
        }
      }, 1000)
      
      const fetchedSongs = await fetchSongs()
      
      clearInterval(progressInterval)
      clearInterval(songInterval)
      setLoadingProgress(100)
      
      setTimeout(() => {
        onSongsLoaded(fetchedSongs)
      }, 500)
      
    } catch (error) {
      console.error('Error loading songs:', error)
      setLoadingError(error.message)
    }
  }

  if (loadingError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-500 bg-opacity-20 border border-red-400 rounded-xl p-8 mb-6 backdrop-blur-md">
            <div className="w-16 h-16 bg-red-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-red-400 text-xl font-bold mb-3">Failed to Load Songs</h3>
            <p className="text-red-300 text-sm mb-6">
              {loadingError}
            </p>
          </div>
          
          <div className="space-y-3">
            <button onClick={loadSongs} className="btn-primary w-full">
              <svg className="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Try Again
            </button>
            <button onClick={onError} className="btn-secondary w-full">
              <svg className="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Login
            </button>
          </div>
          
          <div className="mt-8 text-left bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-md">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Troubleshooting:
            </h4>
            <ul className="text-white text-opacity-80 text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Make sure your RapidAPI key is configured in .env
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Check your internet connection
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Verify your API subscription is active
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-slow"></div>
        
        {/* Floating Music Notes */}
        <div className="absolute top-20 left-1/4 text-white opacity-10 animate-float-1">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-2.634-2.174V9.321a.75.75 0 01.279-.584l6.891-5.677z" />
          </svg>
        </div>
        <div className="absolute top-32 right-1/3 text-white opacity-10 animate-float-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-2.634-2.174V9.321a.75.75 0 01.279-.584l6.891-5.677z" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-1/3 text-white opacity-10 animate-float-3">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-2.634-2.174V9.321a.75.75 0 01.279-.584l6.891-5.677z" />
          </svg>
        </div>
      </div>

      <div className="text-center relative z-10 max-w-md w-full">
        {/* Loading Card */}
        <div className="card p-8 mb-6">
          {/* Music Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.972 7.972 0 0017 12a7.972 7.972 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Welcome Message */}
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-white text-opacity-80 mb-6">
            We're preparing your musical journey...
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse"></div>
              </div>
            </div>
            <p className="text-white text-opacity-70 text-sm">
              {Math.round(loadingProgress)}% complete
            </p>
          </div>

          {/* Current Song Loading */}
          {currentSong && (
            <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400 mr-3"></div>
                <p className="text-white text-sm">
                  Loading: <span className="font-semibold">{currentSong}</span>
                </p>
              </div>
            </div>
          )}

          {/* Loading Steps */}
          <div className="text-left space-y-2">
            <div className="flex items-center text-sm text-white text-opacity-70">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              Connecting to Spotify API
            </div>
            <div className="flex items-center text-sm text-white text-opacity-70">
              <div className={`w-2 h-2 rounded-full mr-3 ${loadingProgress > 20 ? 'bg-green-400' : 'bg-white bg-opacity-30'}`}></div>
              Fetching popular songs
            </div>
            <div className="flex items-center text-sm text-white text-opacity-70">
              <div className={`w-2 h-2 rounded-full mr-3 ${loadingProgress > 60 ? 'bg-green-400' : 'bg-white bg-opacity-30'}`}></div>
              Downloading audio previews
            </div>
            <div className="flex items-center text-sm text-white text-opacity-70">
              <div className={`w-2 h-2 rounded-full mr-3 ${loadingProgress > 90 ? 'bg-green-400' : 'bg-white bg-opacity-30'}`}></div>
              Preparing quiz questions
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="card p-4">
          <p className="text-white text-opacity-80 text-sm">
            <span className="text-purple-300 font-semibold">💡 Did you know?</span><br />
            The average person can recognize a song within the first 2-3 seconds!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage