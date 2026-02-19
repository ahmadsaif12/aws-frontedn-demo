import { useState } from 'react'
import { ThemeProvider, BaseStyles } from '@primer/react' 
import Signup from './components/auth/Signup' 
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <div className="App">
          <Signup />
        </div>
      </BaseStyles>
    </ThemeProvider>
  )
}

export default App