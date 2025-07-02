const AnswerOptions = ({ options, selectedAnswer, correctAnswer, showResult, onAnswerSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option, index) => {
        let buttonClass = 'w-full p-6 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-102 '
        
        if (showResult) {
          if (index === correctAnswer) {
            buttonClass += 'bg-gradient-to-r from-green-500 to-emerald-500 bg-opacity-30 border-green-400 text-white shadow-lg'
          } else if (index === selectedAnswer) {
            buttonClass += 'bg-gradient-to-r from-red-500 to-pink-500 bg-opacity-30 border-red-400 text-white shadow-lg'
          } else {
            buttonClass += 'bg-white bg-opacity-5 border-white border-opacity-20 text-white text-opacity-50'
          }
        } else {
          buttonClass += 'bg-white bg-opacity-10 border-white border-opacity-30 text-white hover:bg-opacity-20 hover:border-opacity-50 hover:shadow-lg'
        }
        
        return (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={showResult || selectedAnswer !== null}
            className={buttonClass}
          >
            <div className="flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4 text-white font-bold shadow-lg">
                {String.fromCharCode(65 + index)}
              </span>
              <div>
                <p className="font-bold text-lg">{option.name}</p>
                <p className="text-sm opacity-80">by {option.artist}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default AnswerOptions