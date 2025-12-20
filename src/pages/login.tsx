// src\pages\login.tsx
import React from 'react';
import Layout from '@theme/Layout';
import AuthForm from '@site/src/components/AuthForm';
import '@site/src/components/AuthForm/styles.module.css';

export default function LoginPage() {
  return (
    <Layout title="Login" description="Login to your account">
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '80vh',
        paddingTop: '4rem',
        paddingBottom: '2rem'
      }}>
        <AuthForm isLogin />
      </main>
    </Layout>
  );
}
