const AudioPlayer = ({ audioRef, currentSong, isPlaying, setIsPlaying }) => {
  const playAudio = () => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error)
          setIsPlaying(false)
        })
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="text-center mb-10">
      <div className="mb-6">
        <button
          onClick={playAudio}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-2xl ${
            isPlaying 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
              : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
          }`}
        >
          {isPlaying ? (
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-white text-xl font-bold">🎵 What song is this? 🎵</p>
        <p className="text-white text-opacity-80">Listen carefully and choose your answer!</p>
      </div>
      
      <audio
        ref={audioRef}
        src={currentSong.url}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          console.error('Audio failed to load')
          setIsPlaying(false)
        }}
      />
    </div>
  )
}

export default AudioPlayer