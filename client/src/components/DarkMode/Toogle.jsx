import React from 'react'
import DarkMode from './DarkMode'

const Toogle = () => {
    const { theme, toggleTheme } = DarkMode()


    return (
      <div style={{backgroundColor: theme === 'dark' ? '#000' : '#fff'}}>
        
        <button type="button" onClick={toggleTheme}>
          Switch theme
        </button>
      </div>
    )
}
export default Toogle;