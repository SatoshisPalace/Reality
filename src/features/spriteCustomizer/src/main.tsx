import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SpriteCustomizer from './SpriteCustomizer'
import PurchaseInfo from './PurchaseInfo'
import './index.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PurchaseInfo darkMode={darkMode} onThemeChange={setDarkMode} />} />
        <Route path="/customize" element={<SpriteCustomizer darkMode={darkMode} />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
