import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from 'router'
import { Toaster } from 'react-hot-toast'
import {useLayoutEffect, useState} from 'react'

let mode = "light"

if (!localStorage.getItem("mode") && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  mode = "dark"
  localStorage.setItem("mode", "dark")
}

function App() {

  const [dark, setDark] = useState((localStorage.getItem("mode") || mode) === "dark")

  const handleDarkToggle = () => {
    
    setDark(localStorage.getItem("mode") === "dark")
  }

  useLayoutEffect(() => {
    window.addEventListener("storage", handleDarkToggle)

    return () => {
      window.removeEventListener("storage", handleDarkToggle)
    }
  })
  

  return (
    <div className={dark ? "dark" : "light"}>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </div>
  )
}

export default App
