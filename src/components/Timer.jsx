const Timer = ({ timeLeft }) => {
  return (
    <div className="text-center mb-8">
      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full border-4 transition-all duration-300 ${
        timeLeft <= 10 
          ? 'border-red-400 text-red-400 animate-pulse' 
          : timeLeft <= 20 
            ? 'border-yellow-400 text-yellow-400' 
            : 'border-green-400 text-green-400'
      } mb-3`}>
        <span className="text-3xl font-bold">{timeLeft}</span>
      </div>
      <p className="text-white text-opacity-80">seconds remaining</p>
    </div>
  )
}

export default Timer