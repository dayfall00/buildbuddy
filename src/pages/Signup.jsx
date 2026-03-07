import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import './Auth.css';

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, loginWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
            navigate('/dashboard'); // Redirect to feed
        } catch (err) {
            setError('Failed to create an account: ' + err.message);
        }

        setLoading(false);
    }

    async function handleGoogleLogin() {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to sign up with Google: ' + err.message);
        }
        setLoading(false);
    }

    return (
        <div className="auth-page">
            <Navbar />
            <div className="auth-container container">
                <div className="auth-card sketch-card">
                    <h2 className="text-center mb-4 text-2xl">Create an Account</h2>
                    {error && <div className="auth-error sketch-card error-card">{error}</div>}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Display Name</label>
                            <input type="text" ref={nameRef} required className="sketch-input" />
                        </div>
                        <div className="form-group">
                            <label>Student Email</label>
                            <input type="email" ref={emailRef} required className="sketch-input" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" ref={passwordRef} required className="sketch-input" />
                        </div>
                        <div className="form-group">
                            <label>Password Confirmation</label>
                            <input type="password" ref={passwordConfirmRef} required className="sketch-input" />
                        </div>
                        <button disabled={loading} className="btn btn-primary w-100 mt-4" type="submit">
                            Sign Up Let's Go!
                        </button>
                    </form>

                    <div className="separator"><span>or</span></div>

                    <button disabled={loading} onClick={handleGoogleLogin} className="btn w-100 google-btn">
                        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                            </g>
                        </svg>
                        Continue with Google
                    </button>

                    <div className="auth-links text-center mt-3">
                        Already have an account? <Link to="/login" className="handwriting">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
