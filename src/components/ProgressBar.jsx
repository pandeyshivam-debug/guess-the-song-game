const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-8 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 relative"
        style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse"></div>
      </div>
    </div>
  )
}

export default ProgressBar