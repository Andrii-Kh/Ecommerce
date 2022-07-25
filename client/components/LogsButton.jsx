import React from 'react'
import { Link } from 'react-router-dom'

const LogsButton = () => {
  return (
    <div>
      <Link to="/logs">
        <footer className="flex fixed bottom-0 bg-gray-200 w-full h-8 justify-center items-center font-semibold">
          Logs
        </footer>
      </Link>
    </div>
  )
}

export default LogsButton
