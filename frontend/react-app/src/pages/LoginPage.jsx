import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import './LoginPage.scss';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Where to redirect after login (default to /admin)
    const from = location.state?.from?.pathname || '/admin';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { password });
            if (res.data.auth) {
                localStorage.setItem('token', res.data.token);
                navigate(from, { replace: true });
            }
        } catch (err) {
            setError('Invalid Password');
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button type="submit">Unlock Dashboard</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
