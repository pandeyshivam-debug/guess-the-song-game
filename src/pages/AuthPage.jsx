import { useState } from 'react'

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!isLogin && !formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isLogin && formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // storing data locally (for now, TODO: use authentication later)
    const userData = {
      username: formData.username,
      email: formData.email || `${formData.username}@example.com`,
      loginTime: new Date().toISOString()
    }
    
    onLogin(userData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-slow"></div>
        
        {/* Floating Music Notes */}
        <div className="absolute top-20 left-1/4 text-white opacity-10 animate-float-1">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-2.634-2.174V9.321a.75.75 0 01.279-.584l6.891-5.677z" />
          </svg>
        </div>
        <div className="absolute top-32 right-1/3 text-white opacity-10 animate-float-2">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-2.634-2.174V9.321a.75.75 0 01.279-.584l6.891-5.677z" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-1/3 text-white opacity-10 animate-float-3">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-2.634-2.174V9.321a.75.75 0 01.279-.584l6.891-5.677z" />
          </svg>
        </div>
      </div>
      
      <div className="card p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.972 7.972 0 0017 12a7.972 7.972 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
            GUESS THE SONG
          </h1>
          <p className="text-white text-opacity-80 text-lg">Test your music knowledge!</p>
        </div>

        <div className="flex mb-8 bg-white bg-opacity-10 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-4 text-center font-semibold rounded-md transition-all duration-300 ${
              isLogin 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                : 'text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-4 text-center font-semibold rounded-md transition-all duration-300 ${
              !isLogin 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                : 'text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white text-opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="input-field pl-12"
              />
            </div>
            {errors.username && <p className="text-red-300 text-sm mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.username}
            </p>}
          </div>

          {!isLogin && (
            <div>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white text-opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field pl-12"
                />
              </div>
              {errors.email && <p className="text-red-300 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>}
            </div>
          )}

          <div>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white text-opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field pl-12"
              />
            </div>
            {errors.password && <p className="text-red-300 text-sm mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.password}
            </p>}
          </div>

          <button type="submit" className="w-full btn-primary text-lg py-4 shadow-2xl">
            <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {isLogin ? 'Start Playing' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white text-opacity-70">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-300 hover:text-purple-200 font-semibold underline transition-colors duration-300"
            >
              {isLogin ? 'Sign up here' : 'Login here'}
            </button>
          </p>
        </div>

        {/* Feature highlights */}
        <div className="mt-8 pt-6 border-t border-white border-opacity-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="text-white text-opacity-70">
              <div className="text-2xl mb-1">🎵</div>
              <p className="text-xs">5 Songs</p>
            </div>
            <div className="text-white text-opacity-70">
              <div className="text-2xl mb-1">⏱️</div>
              <p className="text-xs">15s Each</p>
            </div>
            <div className="text-white text-opacity-70">
              <div className="text-2xl mb-1">🏆</div>
              <p className="text-xs">Beat High Score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
