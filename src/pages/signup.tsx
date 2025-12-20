// src\pages\signup.tsx
import React from 'react';
import Layout from '@theme/Layout';
import AuthForm from '@site/src/components/AuthForm';
import '@site/src/components/AuthForm/styles.module.css';

export default function SignUpPage() {
  return (
    <Layout title="Sign Up" description="Sign up for an account">
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', /* Changed back to center for vertical alignment */
        minHeight: '80vh',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <AuthForm />
      </main>
    </Layout>
  );
}

