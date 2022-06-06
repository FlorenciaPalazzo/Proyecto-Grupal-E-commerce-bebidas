import React from 'react'
import { useEffect, useState } from 'react' 


const DarkMode = () => {
    const [theme, setTheme] = useState('light') 
    localStorage.setItem('theme', theme)

    const toggleTheme = () => { 
      if (theme === 'dark') { 
        setTheme ('light') 
      } else { 
        setTheme('dark') 
      } 
    } 
    
    useEffect(() => { 
      const localTheme = localStorage.getItem('theme') 
      if (localTheme) { 
        setTheme(localTheme) 
      } 
    }, []) 
  
  return (
    
      {theme},
      {toggleTheme}
    
  )
}
export default DarkMode;
