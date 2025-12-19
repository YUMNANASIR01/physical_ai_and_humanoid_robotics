// src/pages/signup.tsx
import React from 'react';
import Layout from '@theme/Layout';
import SignUpForm from '@site/src/components/SignUpForm';

export default function SignUpPage() {
  return (
    <Layout title="Sign Up" description="Sign up for an account">
      <SignUpForm />
    </Layout>
  );
}
