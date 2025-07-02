const GameHeader = ({ user, currentQuestion, score, onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="text-white">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Music Quiz Challenge
        </h1>
        <p className="text-white text-opacity-80 flex items-center mt-1">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Question {currentQuestion + 1} of 5 • {user.username}
        </p>
      </div>
      <div className="flex items-center space-x-6">
        <div className="text-white text-center">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center mb-1">
            <span className="text-2xl font-bold">{score}</span>
          </div>
          <p className="text-xs text-opacity-80">Score</p>
        </div>
        <button onClick={onLogout} className="btn-secondary text-sm px-4 py-2">
          <svg className="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default GameHeader