import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useError from '../../Common/Errors/useError';
import './LogIn.css';
import { registartionRequest , loginRequest} from '../../Common/Request/Auth';

const LogIn = () => {
    const { error, showErrorModal} = useError();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

    const fetchRegistration = async (event) => {
        event.preventDefault();
        const response = await registartionRequest(firstName, lastName, email, password)
        if (response === 200) {
            setEmail('');
            setFirstName('');
            setLastName('');
            setPassword('');
        }
    };

    const fetchLogin = async (event) => {
        event.preventDefault();

        const response = await loginRequest(email, password)
        if (!response.status===200) {
            const errorData = await response.json();
            showErrorModal(errorData.description);
        } else {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', data.user.id);
            setEmail('');
            setPassword('');
            navigate('/home')
        }
    }

    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="signup">
                {loading && <div>loading</div>}
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
                    <button onClick={fetchRegistration}>Sign up</button>
                </form>
            </div>

            <div className="login">
                {loading && <div>loading</div>}
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
                    <button onClick={fetchLogin}>Login</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default LogIn;
