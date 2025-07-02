const ResultsPage = ({ user, score, answers, onPlayAgain, onLogout }) => {
  const percentage = (score / 5) * 100
  
  const getScoreMessage = () => {
    if (percentage >= 80) return "Outstanding! 🎵"
    if (percentage >= 60) return "Great job! 🎶"
    if (percentage >= 40) return "Not bad! 🎼"
    return "Keep practicing! 🎹"
  }

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-400"
    if (percentage >= 60) return "text-blue-400"
    if (percentage >= 40) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <h1 className="text-2xl font-bold">Game Complete!</h1>
            <p className="text-white text-opacity-80">Here are your results, {user.username}</p>
          </div>
          <button onClick={onLogout} className="btn-secondary text-sm">
            Logout
          </button>
        </div>

        {/* Score Card */}
        <div className="card p-8 mb-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
              <span className="text-3xl font-bold text-white">{score}</span>
            </div>
            <h2 className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
              {score} out of 5
            </h2>
            <p className="text-2xl text-white mb-4">{getScoreMessage()}</p>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-white text-opacity-80">{percentage.toFixed(0)}% correct</p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="card p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Question Breakdown</h3>
          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div key={index} className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-white font-semibold">
                        {answer.song.options[answer.song.correctAnswer].name}
                      </p>
                      <p className="text-white text-opacity-70 text-sm">
                        by {answer.song.options[answer.song.correctAnswer].artist}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {answer.isCorrect ? (
                      <div className="flex items-center text-green-400">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">Correct</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-400">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">
                          {answer.selectedAnswer === null ? 'Time Up' : 'Incorrect'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {!answer.isCorrect && answer.selectedAnswer !== null && (
                  <div className="ml-11 mt-2">
                    <p className="text-red-300 text-sm">
                      Your answer: {answer.song.options[answer.selectedAnswer].name}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onPlayAgain} className="btn-primary">
            Play Again
          </button>
          <button 
            onClick={() => {
              // Share functionality could be added here
              if (navigator.share) {
                navigator.share({
                  title: 'Guess the Song Game',
                  text: `I scored ${score}/5 (${percentage.toFixed(0)}%) in the Guess the Song game!`,
                  url: window.location.href
                })
              }
            }}
            className="btn-secondary"
          >
            Share Results
          </button>
        </div>

        {/* Fun Stats */}
        <div className="mt-8 text-center">
          <div className="card p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Fun Stats</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
              <div>
                <p className="text-2xl font-bold text-purple-400">{score}</p>
                <p className="text-sm text-opacity-80">Correct</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">{5 - score}</p>
                <p className="text-sm text-opacity-80">Missed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{percentage.toFixed(0)}%</p>
                <p className="text-sm text-opacity-80">Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">
                  {answers.filter(a => a.selectedAnswer === null).length}
                </p>
                <p className="text-sm text-opacity-80">Timeouts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage