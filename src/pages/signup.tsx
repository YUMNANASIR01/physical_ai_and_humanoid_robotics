
import React from 'react';
import Layout from '@theme/Layout';
import AuthForm from '@site/src/components/AuthForm';

export default function SignUpPage() {
  return (
    <Layout title="Sign Up" description="Sign up for an account">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <AuthForm />
      </div>
    </Layout>
  );
}

