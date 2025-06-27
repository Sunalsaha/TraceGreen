// src/pages/ManufacturerAuth.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Mail,
  Lock,
  User,
  Building,
  FileText,
  Globe,
} from 'lucide-react';

// Then use <FileText /> instead of <Page />

import Header from '../components/Header.jsx';
import './ManufacturerAuth.scss';

const ManufacturerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();
  if (isLogin) {
    navigate('/manufacturer/dashboard');
  } else {
    navigate('/manufacturer/register');
  }
};


  return (
    <div className="manufacturer-auth">
      <Header />

      <div className="auth-wrapper">
        <div className="auth-box">
          <div className="auth-header">
            <div className="icon-box">
              <Shield />
            </div>
            <h2>{isLogin ? 'Welcome Back' : 'Join TraceGreen'}</h2>
            <p>
              {isLogin
                ? 'Sign in to your manufacturer account'
                : 'Create your manufacturer account'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-group">
                  <label>
                    <User className="inline-icon" /> Full Name
                  </label>
                  <input type="text" placeholder="John Doe" required />
                </div>

                <div className="form-group">
                  <label>
                    <Building className="inline-icon" /> Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Company Ltd."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FileText className="inline-icon" /> GST Number
                  </label>
                  <input
                    type="text"
                    placeholder="22AAAAA0000A1Z5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Globe className="inline-icon" /> Company Website (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>
                <Mail className="inline-icon" /> Email Address
              </label>
              <input type="email" placeholder="you@company.com" required />
            </div>

            <div className="form-group">
              <label>
                <Lock className="inline-icon" /> Password
              </label>
              <input type="password" placeholder="••••••••" required />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>
                  <Lock className="inline-icon" /> Confirm Password
                </label>
                <input type="password" placeholder="••••••••" required />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="toggle-auth">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerAuth;
