
import React, { useState } from 'react';
import styles from './styles.module.css';
import { API_URL } from '../../config'; // Import API_URL

export default function AuthForm({ isLogin }: { isLogin?: boolean }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [programmingExperience, setProgrammingExperience] = useState('');
  const [roboticsExperience, setRoboticsExperience] = useState('');
  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>([]);
  const [hardwareAccess, setHardwareAccess] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const programmingExperienceOptions = ['None', 'Beginner', 'Intermediate', 'Advanced'];
  const roboticsExperienceOptions = ['None', 'Beginner', 'Intermediate', 'Advanced'];
  const programmingLanguageOptions = ['Python', 'C++', 'JavaScript', 'Rust', 'Java'];
  const hardwareAccessOptions = ['Jetson Nano', 'Raspberry Pi', 'Arduino', 'RealSense Camera', 'LIDAR'];

  const handleLanguageChange = (language: string) => {
    setProgrammingLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  const handleHardwareChange = (hardware: string) => {
    setHardwareAccess((prev) =>
      prev.includes(hardware)
        ? prev.filter((hw) => hw !== hardware)
        : [...prev, hardware]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setLoading(true);

    try {
      const formData = {
        name,
        email,
        password,
        programmingExperience,
        roboticsExperience,
        programmingLanguages,
        hardwareAccess,
      };

      const endpoint = isLogin ? '/login' : '/signup';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (isLogin) {
        alert(`Logged in with email: ${email}`);
        // Here you would typically handle successful login, e.g., store token, redirect
      } else {
        alert(`Account created for ${email}!`);
        // Here you would typically handle successful signup, e.g., redirect to login
      }
    } catch (err: any) {
      console.error("API Call Error:", err);
      setError(err.message || 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpForm}>
        <h2>{isLogin ? 'Log In' : 'Create an Account'}</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}

          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                placeholder="Your Name"
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
            />
            <small>We'll never share your email with anyone else.</small>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="6+ characters"
            />
            <small>Min 6 chars, uppercase & lowercase</small>
          </div>

          {!isLogin && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isLogin}
                  placeholder="Re-enter your password"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="programmingExperience">Programming Experience</label>
                <select
                  id="programmingExperience"
                  value={programmingExperience}
                  onChange={(e) => setProgrammingExperience(e.target.value)}
                  required={!isLogin}
                >
                  <option value="">Select an option</option>
                  {programmingExperienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="roboticsExperience">Robotics Experience</label>
                <select
                  id="roboticsExperience"
                  value={roboticsExperience}
                  onChange={(e) => setRoboticsExperience(e.target.value)}
                  required={!isLogin}
                >
                  <option value="">Select an option</option>
                  {roboticsExperienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Programming Languages</label>
                <div className={styles.checkboxGroup}>
                  {programmingLanguageOptions.map((lang) => (
                    <label key={lang} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        value={lang}
                        checked={programmingLanguages.includes(lang)}
                        onChange={() => handleLanguageChange(lang)}
                      />
                      {lang}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Hardware Access</label>
                <div className={styles.checkboxGroup}>
                  {hardwareAccessOptions.map((hw) => (
                    <label key={hw} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        value={hw}
                        checked={hardwareAccess.includes(hw)}
                        onChange={() => handleHardwareChange(hw)}
                      />
                      {hw}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Submitting...' : isLogin ? 'Log In' : 'Create Account'}
          </button>
        </form>
        <div className={styles.loginLink}>
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <a href={isLogin ? '/signup' : '/login'}>
              {isLogin ? 'Create Account' : 'Log In'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

