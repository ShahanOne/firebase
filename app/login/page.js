'use client';

import React, { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  // const { login } = useAuth();
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/homepage');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="p-16 ">
      <p className="text-xl">Login</p>
      <div className="flex  justify-center">
        <div className="flex flex-col p-4 shadow-md rounded w-1/3 border border-solid border-emerald-500">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-slate-100 p-2 outline-none rounded my-1"
              id="username"
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="bg-slate-100 p-2 outline-none rounded my-1"
              id="password"
            />
            <button
              type="submit"
              className="bg-indigo-500 active:bg-indigo-400 text-cyan-50 p-3 my-4 rounded text-lg"
            >
              Login
            </button>
          </form>{' '}
        </div>
      </div>
    </div>
  );
};

export default Login;
