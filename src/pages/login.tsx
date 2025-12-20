// src\pages\login.tsx
import React from 'react';
import Layout from '@theme/Layout';
import AuthForm from '@site/src/components/AuthForm';
import '@site/src/components/AuthForm/styles.module.css';

export default function LoginPage() {
  return (
    <Layout title="Login" description="Login to your account">
      <div style={{ minHeight: '70vh', padding: '20px 0' }}>
        <AuthForm isLogin />
      </div>
    </Layout>
  );
}
