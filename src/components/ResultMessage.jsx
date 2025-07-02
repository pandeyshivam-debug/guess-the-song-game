const ResultMessage = ({ showResult, selectedAnswer, correctAnswer, correctOption }) => {
  if (!showResult) return null

  return (
    <div className="mt-8 text-center">
      {selectedAnswer === correctAnswer ? (
        <div className="bg-green-500 bg-opacity-20 border border-green-400 rounded-xl p-6">
          <div className="text-green-400">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-2xl font-bold mb-1">Correct!</p>
            <p className="text-lg">You know your music!</p>
          </div>
        </div>
      ) : selectedAnswer === null ? (
        <div className="bg-yellow-500 bg-opacity-20 border border-yellow-400 rounded-xl p-6">
          <div className="text-yellow-400">
            <div className="text-4xl mb-2">⏰</div>
            <p className="text-2xl font-bold mb-1">Time's up!</p>
            <p className="text-lg">The correct answer was <span className="font-bold">{correctOption.name}</span></p>
          </div>
        </div>
      ) : (
        <div className="bg-red-500 bg-opacity-20 border border-red-400 rounded-xl p-6">
          <div className="text-red-400">
            <div className="text-4xl mb-2">😔</div>
            <p className="text-2xl font-bold mb-1">Not quite!</p>
            <p className="text-lg">The correct answer was <span className="font-bold">{correctOption.name}</span></p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultMessage