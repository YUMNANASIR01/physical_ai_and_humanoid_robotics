import React, { useState } from 'react';
import styles from './styles.module.css';
import { useHistory } from '@docusaurus/router';
import { useAuth } from '../AuthContext'; // Import useAuth

interface AuthFormProps {
  isLogin?: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const history = useHistory();
  const auth = useAuth(); // Use the auth context

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    programmingExperience: '',
    roboticsExperience: '',
    programmingLanguages: [] as string[],
    hardwareAccess: [] as string[],
  });

  const [localError, setLocalError] = useState(''); // Use a local error state for form validation

  const programmingExperienceOptions = ['None', 'Beginner', 'Intermediate', 'Advanced'];
  const roboticsExperienceOptions = ['None', 'Beginner', 'Intermediate', 'Advanced'];
  const programmingLanguageOptions = ['Python', 'C++', 'JavaScript', 'Rust', 'Java'];
  const hardwareAccessOptions = ['Jetson Nano', 'Raspberry Pi', 'Arduino', 'RealSense Camera', 'LIDAR'];

  const toggleArrayValue = (key: 'programmingLanguages' | 'hardwareAccess', value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(''); // Clear local error

    if (!isLogin && form.password !== form.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      if (isLogin) {
        await auth.login(form.email, form.password);
      } else {
        await auth.signup(
          form.email,
          form.password,
          form.name,
          {
            programming_experience: form.programmingExperience,
            robotics_experience: form.roboticsExperience,
            preferred_languages: form.programmingLanguages,
            hardware_access: form.hardwareAccess,
          }
        );
      }
      history.push('/'); // Redirect on successful auth
    } catch (err: any) {
      setLocalError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h2>

        <form onSubmit={handleSubmit}>
          {(localError || auth.error) && <p className={styles.error}>{localError || auth.error}</p>}

          {!isLogin && (
            <input
              id="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            id="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

              <div className={styles.formRow}>
                <select id="programmingExperience" onChange={handleChange} required>
                  <option value="">Programming Experience</option>
                  {programmingExperienceOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>

                <select id="roboticsExperience" onChange={handleChange} required>
                  <option value="">Robotics Experience</option>
                  {roboticsExperienceOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>Programming Languages</label>
                <div className={styles.checkboxGroup}>
                  {programmingLanguageOptions.map((lang) => (
                    <label key={lang} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={form.programmingLanguages.includes(lang)}
                        onChange={() => toggleArrayValue('programmingLanguages', lang)}
                      />
                      <span className={styles.checkboxText}>{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>Hardware Access</label>
                <div className={styles.checkboxGroup}>
                  {hardwareAccessOptions.map((hw) => (
                    <label key={hw} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={form.hardwareAccess.includes(hw)}
                        onChange={() => toggleArrayValue('hardwareAccess', hw)}
                      />
                      <span className={styles.checkboxText}>{hw}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <button disabled={auth.isLoading}>
            {auth.isLoading ? 'Please wait…' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className={styles.switch}>
          {isLogin ? 'No account?' : 'Already registered?'}{' '}
          <a href={isLogin ? '/signup' : '/login'}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </a>
        </p>
      </div>
    </div>
  );
}


















