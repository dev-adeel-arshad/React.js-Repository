import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const copyToClipBoard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    alert('✅ Password copied to clipboard!')
  }

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (characterAllowed) str += '!@#$%^&*()_+[]{}<>?/|~'

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white">
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-md text-center transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        <h1 className="text-3xl font-bold mb-6 text-white tracking-wide">
          🔐 Password Generator
        </h1>

        {/* Password Display + Copy */}
        <div className="flex mb-6">
          <input
            type="text"
            ref={passwordRef}
            value={password}
            readOnly
            className="flex-1 px-4 py-3 text-lg rounded-l-2xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={copyToClipBoard}
            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-r-2xl hover:from-blue-600 hover:to-indigo-700 transition-transform hover:scale-105"
          >
            Copy
          </button>
        </div>

        {/* Range Input */}
        <div className="flex flex-col gap-4 text-left">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-lg">Length</label>
            <span className="text-blue-400 font-bold text-xl">{length}</span>
          </div>
          <input
            type="range"
            min="6"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full accent-blue-500"
          />

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="font-medium">Include Numbers</label>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="w-5 h-5 accent-green-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Include Symbols</label>
            <input
              type="checkbox"
              checked={characterAllowed}
              onChange={() => setCharacterAllowed((prev) => !prev)}
              className="w-5 h-5 accent-pink-400"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={passwordGenerator}
          className="mt-8 w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300"
        >
          Generate Password
        </button>
      </div>

      <footer className="mt-6 text-sm text-gray-400">
        Made with ❤️ by <span className="font-semibold text-blue-400">React + Tailwind CSS</span>
      </footer>
    </div>
  )
}

export default App