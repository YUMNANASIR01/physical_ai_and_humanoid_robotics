// src/components/SignUpForm/index.tsx
import React, { useState } from 'react';
import styles from './styles.module.css';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert(`Signed up with email: ${email}`);
    // Here you would typically handle the signup logic,
    // e.g., by calling an API endpoint.
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpForm}>
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
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
              minLength={8}
              placeholder="8+ characters"
            />
            <small>Must be at least 8 characters long.</small>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Re-enter your password"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
        </form>
        <div className={styles.loginLink}>
          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
}
