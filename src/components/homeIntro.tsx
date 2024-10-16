import React, { useContext } from 'react'
import { dataContext } from '../context/GlobalContext';

export function HomeIntro(){
    const {username} = useContext(dataContext);
    return (
      <div className="image-container">
        <img
          src="assets/home.jpg" 
          alt="Sample"
          className="homeimage"
        />
        <div className="overlay-text"  data-testid="username" style={{fontSize:70}}>
            Welcome {username}
        </div>
      </div>
    )
  }
  
