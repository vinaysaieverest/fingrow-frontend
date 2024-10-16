import axios from 'axios';
import  { useContext, useState } from 'react';
import { dataContext } from '../context/GlobalContext';

export const LoginPage = () => {
    const {loginUsername, setLoginUsername} = useContext(dataContext);
    const [loginPassword, setLoginPassword] = useState('');
    const{isLogin,setIslogin,setUsername}= useContext(dataContext)

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:5005/api/login', {
            name:loginUsername,
            password:loginPassword,
          });
          if (response.status === 200) {
            console.log(response.status)
            setIslogin(true)
            console.log(isLogin)
        }
        if (response.status === 409) {
            alert("No user found, Please register")
            setLoginUsername('');
          setLoginPassword('');
        }
          console.log(response);
          setUsername(loginUsername)
          setLoginUsername('');
          setLoginPassword('');
        } catch (error) {
          console.error('Error pushing data to the database:', error);  
      };
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                
                    <div className="input-group">
                        <label htmlFor="email">Username</label>
                        <input
                            type="input"
                            id="email"
                            data-testid="userInput"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            className="login-input"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="login-input"
                            data-testid="passwordInput"
                            required
                        />
                    </div>
                    <button data-testid="loginButton" type="submit" className="login-button" onClick={handleLogin}>
                        Login
                    </button>
                
            </div>
        </div>
    );
};

