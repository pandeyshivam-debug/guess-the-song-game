import { useState, useEffect, useRef } from 'react'
import Timer from '../components/Timer'
import AudioPlayer from '../components/AudioPlayer'
import AnswerOptions from '../components/AnswerOptions'
import ResultMessage from '../components/ResultMessage'
import GameHeader from '../components/GameHeader'
import ProgressBar from '../components/ProgressBar'

const GamePage = ({ user, songs, onGameComplete, onLogout }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(15)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (songs.length > 0) {
      startTimer()
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentQuestion, songs])

  const startTimer = () => {
    setTimeLeft(15)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleTimeUp = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    if (!showResult) {
      const newAnswer = {
        question: currentQuestion + 1,
        selectedAnswer: null,
        correctAnswer: songs[currentQuestion]?.correctAnswer, // from utils/musicApi.js (fetchSongs())
        isCorrect: false,
        song: songs[currentQuestion]
      }
      
      setAnswers(prev => [...prev, newAnswer])
      setShowResult(true)
      
      setTimeout(() => {
        nextQuestion()
      }, 2000)
    }
  }

  const handleAnswerSelect = (answerIndex) => {
    if (showResult || selectedAnswer !== null) return
    
    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === songs[currentQuestion].correctAnswer
    
    if (isCorrect) {
      setScore(score + 1)
    }
    
    const newAnswer = {
      question: currentQuestion + 1,
      selectedAnswer: answerIndex,
      correctAnswer: songs[currentQuestion].correctAnswer,
      isCorrect: isCorrect,
      song: songs[currentQuestion]
    }
    
    setAnswers(prev => [...prev, newAnswer])
    setShowResult(true)
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 >= 5) {
      onGameComplete(score + (selectedAnswer === songs[currentQuestion]?.correctAnswer ? 1 : 0), answers)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }

  if (!songs || songs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading game...</p>
        </div>
      </div>
    )
  }

  const currentSong = songs[currentQuestion]

  return (
    <div className="min-h-screen p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-white opacity-5 animate-float-1">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-2.634-2.174V9.321a.75.75 0 01.279-.584l6.891-5.677z" />
          </svg>
        </div>
        <div className="absolute top-32 right-20 text-white opacity-5 animate-float-2">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-2.634-2.174V9.321a.75.75 0 01.279-.584l6.891-5.677z" />
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/3 text-white opacity-5 animate-float-3">
          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-2.634-2.174V9.321a.75.75 0 01.279-.584l6.891-5.677z" />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <GameHeader 
          user={user}
          currentQuestion={currentQuestion}
          score={score}
          onLogout={onLogout}
        />

        <ProgressBar currentQuestion={currentQuestion} totalQuestions={5} />

        {/* Game Card */}
        <div className="card p-8 mb-6">
          <Timer timeLeft={timeLeft} />

          {/* Song Info */}
          {currentSong.image && (
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <img 
                  src={currentSong.image} 
                  alt="Album cover"
                  className="w-40 h-40 rounded-xl mx-auto shadow-2xl border-4 border-white border-opacity-20"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-50 to-transparent rounded-xl"></div>
              </div>
            </div>
          )}

          <AudioPlayer 
            audioRef={audioRef}
            currentSong={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />

          <AnswerOptions 
            options={currentSong.options}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentSong.correctAnswer}
            showResult={showResult}
            onAnswerSelect={handleAnswerSelect}
          />

          <ResultMessage 
            showResult={showResult}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentSong.correctAnswer}
            correctOption={currentSong.options[currentSong.correctAnswer]}
          />
        </div>
      </div>
    </div>
  )
}

export default GamePage