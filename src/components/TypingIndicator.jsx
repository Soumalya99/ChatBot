import React from 'react'

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-2">
      <span className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></span>
    </div>
  )
}

export default TypingIndicator