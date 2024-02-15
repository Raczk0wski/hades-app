import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useError from '../../Common/useError';
import './LogIn.css';

const LogIn = () => {
    const { error, showErrorModal, closeErrorModal } = useError();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const registrationRequest = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/registration', {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                showErrorModal(errorData.description);
            } else if (response.status(200)){
                setEmail('');
                setFirstName('');
                setLastName('');
                setPassword('');
            }
        } catch (error) {
            console.error('Request failed:', error);
            showErrorModal('Server error occurred.');
        }
    };

    const loginRequest = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                showErrorModal(errorData.description);
            } else {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                navigate('/home')
            }

            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Request failed:', error);
            showErrorModal('Server error occurred.');
        }
    };

    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="signup">
                <form>
                    <label htmlFor="chk" aria-hidden="false">Sign up</label>
                    <input
                        type="firstName"
                        id="firstName"
                        placeholder='First Name'
                        value={firstName}
                        onChange={(event) => handleInputChange(event, setFirstName)}
                        required
                    />
                    <input
                        type="lastName"
                        id="lastName"
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(event) => handleInputChange(event, setLastName)}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder='Email'
                        value={email}
                        onChange={(event) => handleInputChange(event, setEmail)}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder='Password'
                        value={password}
                        onChange={(event) => handleInputChange(event, setPassword)}
                        required
                    />
                    <button onClick={registrationRequest}>Sign up</button>
                </form>
            </div>

            <div className="login">
                <form>
                    <label htmlFor="chk" aria-hidden="true">Login</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Email'
                        value={email}
                        onChange={(event) => handleInputChange(event, setEmail)}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder='Password'
                        value={password}
                        onChange={(event) => handleInputChange(event, setPassword)}
                        required
                    />
                    <button onClick={loginRequest}>Login</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default LogIn;
