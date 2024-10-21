import React, { useState } from 'react';
import axios from 'axios';

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [salary, setSalary] = useState('');

    const handleRegister = async () => {
        try {
          const response = await axios.post('http://localhost:5005/api/register', {
            name:username,
            password,
            salary
          }
          );
          if(response.status===409){
            alert("User already found with this name, Please login")
          }
          if(response.status===200){
            alert("Registration completed succesfully, Please login")
          }
          
          setUsername('');
          setPassword('');
          setSalary('')
        } catch (error) {
          console.error('Error pushing data to the database:', error);     
      };
    }
    return (
        <form className="register-container">
            <div className="register-box">
                <h2 className="register-title">Register</h2>
                
                    <div className="input-group">
                        <label htmlFor="email">Username</label>
                        <input
                            type="text"
                            id="email"
                            data-testid="userInput"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="register-input"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            data-testid="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="register-input"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Salary</label>
                        <input
                            type="text"
                            id="confirmPassword"
                            data-testid="salaryInput"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="register-input"
                            required
                        />
                    </div>

                    <button type="submit" data-testid="submitButton" className="register-button" onClick={handleRegister}>
                        Register
                    </button>
                
            </div>
        </form>
    );
};

