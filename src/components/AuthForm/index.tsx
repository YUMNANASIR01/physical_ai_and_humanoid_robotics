// // src\components\AuthForm\index.tsx
// import React, { useState } from 'react';
// import styles from './styles.module.css';
// import { API_URL } from '../../config'; // Import API_URL

// export default function AuthForm({ isLogin }: { isLogin?: boolean }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [programmingExperience, setProgrammingExperience] = useState('');
//   const [roboticsExperience, setRoboticsExperience] = useState('');
//   const [programmingLanguages, setProgrammingLanguages] = useState<string[]>([]);
//   const [hardwareAccess, setHardwareAccess] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const programmingExperienceOptions = ['None', 'Beginner', 'Intermediate', 'Advanced'];
//   const roboticsExperienceOptions = ['None', 'Beginner', 'Intermediate', 'Advanced'];
//   const programmingLanguageOptions = ['Python', 'C++', 'JavaScript', 'Rust', 'Java'];
//   const hardwareAccessOptions = ['Jetson Nano', 'Raspberry Pi', 'Arduino', 'RealSense Camera', 'LIDAR'];

//   const handleLanguageChange = (language: string) => {
//     setProgrammingLanguages((prev) =>
//       prev.includes(language)
//         ? prev.filter((lang) => lang !== language)
//         : [...prev, language]
//     );
//   };

//   const handleHardwareChange = (hardware: string) => {
//     setHardwareAccess((prev) =>
//       prev.includes(hardware)
//         ? prev.filter((hw) => hw !== hardware)
//         : [...prev, hardware]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!isLogin && password !== confirmPassword) {
//       setError("Passwords don't match!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = {
//         name,
//         email,
//         password,
//         programmingExperience,
//         roboticsExperience,
//         programmingLanguages,
//         hardwareAccess,
//       };

//       const endpoint = isLogin ? '/login' : '/signup';
//       const response = await fetch(`${API_URL}${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || `HTTP error! status: ${response.status}`);
//       }

//       if (isLogin) {
//         alert(`Logged in with email: ${email}`);
//         // Here you would typically handle successful login, e.g., store token, redirect
//       } else {
//         alert(`Account created for ${email}!`);
//         // Here you would typically handle successful signup, e.g., redirect to login
//       }
//     } catch (err: any) {
//       console.error("API Call Error:", err);
//       setError(err.message || 'Network error. Please check your connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.signUpContainer}>
//       <div className={styles.signUpForm}>
//         <h2>{isLogin ? 'Log In' : 'Create an Account'}</h2>
//         <form onSubmit={handleSubmit}>
//           {error && <p className={styles.error}>{error}</p>}

//           {!isLogin && (
//             <div className={styles.inputGroup}>
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required={!isLogin}
//                 placeholder="Your Name"
//               />
//             </div>
//           )}

//           <div className={styles.inputGroup}>
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="name@example.com"
//             />
//             <small>We'll never share your email with anyone else.</small>
//           </div>

//           <div className={styles.inputGroup}>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength={6}
//               placeholder="6+ characters"
//             />
//             <small>Min 6 chars, uppercase & lowercase</small>
//           </div>

//           {!isLogin && (
//             <>
//               <div className={styles.inputGroup}>
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required={!isLogin}
//                   placeholder="Re-enter your password"
//                 />
//               </div>

//               <div className={styles.inputGroup}>
//                 <label htmlFor="programmingExperience">Programming Experience</label>
//                 <select
//                   id="programmingExperience"
//                   value={programmingExperience}
//                   onChange={(e) => setProgrammingExperience(e.target.value)}
//                   required={!isLogin}
//                 >
//                   <option value="">Select an option</option>
//                   {programmingExperienceOptions.map((option) => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className={styles.inputGroup}>
//                 <label htmlFor="roboticsExperience">Robotics Experience</label>
//                 <select
//                   id="roboticsExperience"
//                   value={roboticsExperience}
//                   onChange={(e) => setRoboticsExperience(e.target.value)}
//                   required={!isLogin}
//                 >
//                   <option value="">Select an option</option>
//                   {roboticsExperienceOptions.map((option) => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className={styles.inputGroup}>
//                 <label>Programming Languages</label>
//                 <div className={styles.checkboxGroup}>
//                   {programmingLanguageOptions.map((lang) => (
//                     <label key={lang} className={styles.checkboxLabel}>
//                       <input
//                         type="checkbox"
//                         value={lang}
//                         checked={programmingLanguages.includes(lang)}
//                         onChange={() => handleLanguageChange(lang)}
//                       />
//                       {lang}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className={styles.inputGroup}>
//                 <label>Hardware Access</label>
//                 <div className={styles.checkboxGroup}>
//                   {hardwareAccessOptions.map((hw) => (
//                     <label key={hw} className={styles.checkboxLabel}>
//                       <input
//                         type="checkbox"
//                         value={hw}
//                         checked={hardwareAccess.includes(hw)}
//                         onChange={() => handleHardwareChange(hw)}
//                       />
//                       {hw}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}

//           <button type="submit" className={styles.submitButton} disabled={loading}>
//             {loading ? 'Submitting...' : isLogin ? 'Log In' : 'Create Account'}
//           </button>
//         </form>
//         <div className={styles.loginLink}>
//           <p>
//             {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//             <a href={isLogin ? '/signup' : '/login'}>
//               {isLogin ? 'Create Account' : 'Log In'}
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

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

              <div className={styles.checkboxGroup}>
                {programmingLanguageOptions.map((lang) => (
                  <label key={lang}>
                    <input
                      type="checkbox"
                      checked={form.programmingLanguages.includes(lang)}
                      onChange={() => toggleArrayValue('programmingLanguages', lang)}
                    />
                    {lang}
                  </label>
                ))}
              </div>

              <div className={styles.checkboxGroup}>
                {hardwareAccessOptions.map((hw) => (
                  <label key={hw}>
                    <input
                      type="checkbox"
                      checked={form.hardwareAccess.includes(hw)}
                      onChange={() => toggleArrayValue('hardwareAccess', hw)}
                    />
                    {hw}
                  </label>
                ))}
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

