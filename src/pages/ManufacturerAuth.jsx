import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Mail, Lock, User, Building, FileText, Globe, Phone, CheckCircle,
} from 'lucide-react';
import Header from '../components/Header.jsx';
import './ManufacturerAuth.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManufacturerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [showEmailOtpField, setShowEmailOtpField] = useState(false);
  const [emailTimer, setEmailTimer] = useState(0);

  const [phone, setPhone] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showPhoneOtpField, setShowPhoneOtpField] = useState(false);
  const [phoneTimer, setPhoneTimer] = useState(0);

  const [gst, setGst] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');

  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePhone, setShakePhone] = useState(false);

  const emailOtpRef = useRef(null);
  const phoneOtpRef = useRef(null);

  const DUMMY_OTP = '123456';

  const sendDummyOtp = (type) => {
    toast.success(`${type} OTP sent (Use ${DUMMY_OTP})`);
    return Promise.resolve();
  };

  const verifyDummyOtp = (inputOtp) => inputOtp === DUMMY_OTP;

  const safeJson = async (res) => {
    const text = await res.text();
    console.log('🔍 Raw server response:', text);
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('❌ Invalid JSON from server. Raw response:', text);
      return { error: 'Invalid JSON from server', raw: text };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const res = await fetch('http://localhost:5000/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await safeJson(res);
        if (!res.ok) throw new Error(data.message || data.error || 'Login failed');

        localStorage.setItem('authToken', data.token);
        toast.success('Signed In!');
        navigate('/manufacturer/dashboard');
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      if (!emailVerified || !phoneVerified) {
        toast.error('Please verify OTPs for phone and email.');
        return;
      }

      if (gst.length !== 15) {
        toast.error('GST number must be exactly 15 characters.');
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: companyName,
            email,
            phone,
            password,
            gst,
            website,
          }),
        });

        const data = await safeJson(res);
        if (!res.ok) throw new Error(data.message || data.error || 'Signup failed');

        toast.success('Registered successfully!');
        navigate('/manufacturer/register', {
          state: { companyName, phone, website },
        });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEmailTimer((prev) => (prev > 0 ? prev - 1 : 0));
      setPhoneTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerShake = (ref, setShake) => {
    setShake(true);
    ref.current?.classList.add('shake');
    setTimeout(() => {
      ref.current?.classList.remove('shake');
      setShake(false);
    }, 500);
  };

  return (
    <div className="manufacturer-auth">
      <Header />
      <div className="auth-wrapper">
        <div className="auth-box">
          <div className="auth-header">
            <div className="icon-box"><Shield /></div>
            <h2>{isLogin ? 'Welcome Back' : 'Join TraceGreen'}</h2>
            <p>{isLogin ? 'Sign in to your manufacturer account' : 'Create your manufacturer account'}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-group">
                  <label><User className="inline-icon" /> Full Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label><Building className="inline-icon" /> Company Name</label>
                  <input
                    type="text"
                    placeholder="Your Company Ltd."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label><FileText className="inline-icon" /> GST Number</label>
                  <input
                    type="text"
                    placeholder="22AAAAA0000A1Z5"
                    value={gst}
                    onChange={(e) => setGst(e.target.value)}
                    required
                    maxLength={15}
                    className={gst.length > 0 && gst.length !== 15 ? 'error-border' : ''}
                  />
                </div>
                <div className="form-group">
                  <label><Globe className="inline-icon" /> Company Website (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label><Phone className="inline-icon" /> Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91XXXXXXXXXX"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => {
                      if (phone.length >= 10 && !phoneVerified) {
                        sendDummyOtp('Phone').then(() => {
                          setShowPhoneOtpField(true);
                          setPhoneTimer(30);
                        });
                      }
                    }}
                  />
                  {phoneVerified && <CheckCircle size={18} color="lime" />}
                </div>

                {showPhoneOtpField && !phoneVerified && (
                  <div className="form-group" ref={phoneOtpRef}>
                    <label>Phone OTP</label>
                    <input
                      type="text"
                      className={shakePhone ? 'shake' : ''}
                      placeholder="Enter OTP"
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                    />
                    <button
                      type="button"
                      disabled={phoneTimer > 0}
                      onClick={() => sendDummyOtp('Phone').then(() => setPhoneTimer(30))}
                    >
                      {phoneTimer > 0 ? `Resend OTP in ${phoneTimer}s` : 'Resend OTP'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (verifyDummyOtp(phoneOtp)) {
                          setPhoneVerified(true);
                          setShowPhoneOtpField(false);
                          toast.success('Phone Verified');
                        } else {
                          triggerShake(phoneOtpRef, setShakePhone);
                          toast.error('Incorrect Phone OTP');
                        }
                      }}
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </>
            )}

            <div className="form-group">
              <label><Mail className="inline-icon" /> Email Address</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  if (!isLogin && email.includes('@') && !emailVerified) {
                    sendDummyOtp('Email').then(() => {
                      setShowEmailOtpField(true);
                      setEmailTimer(30);
                    });
                  }
                }}
              />
              {emailVerified && <CheckCircle size={18} color="lime" />}
            </div>

            {!isLogin && showEmailOtpField && !emailVerified && (
              <div className="form-group" ref={emailOtpRef}>
                <label>Email OTP</label>
                <input
                  type="text"
                  className={shakeEmail ? 'shake' : ''}
                  placeholder="Enter OTP"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                />
                <button
                  type="button"
                  disabled={emailTimer > 0}
                  onClick={() => sendDummyOtp('Email').then(() => setEmailTimer(30))}
                >
                  {emailTimer > 0 ? `Resend OTP in ${emailTimer}s` : 'Resend OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (verifyDummyOtp(emailOtp)) {
                      setEmailVerified(true);
                      setShowEmailOtpField(false);
                      toast.success('Email Verified');
                    } else {
                      triggerShake(emailOtpRef, setShakeEmail);
                      toast.error('Incorrect Email OTP');
                    }
                  }}
                >
                  Verify OTP
                </button>
              </div>
            )}

            <div className="form-group">
              <label><Lock className="inline-icon" /> Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label><Lock className="inline-icon" /> Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={confirmPassword && password !== confirmPassword ? 'error-border' : ''}
                />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="toggle-auth">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ManufacturerAuth;
