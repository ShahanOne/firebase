'use client';
import React, { useRef, useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
import { auth, googleProvider } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(auth?.currentUser?.email);
  // console.log(auth?.currentUser?.photoURL);

  const router = useRouter();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/homepage');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <p className="text-xl">Register</p>
      <div className="flex justify-center">
        <div className="flex flex-col p-4 shadow-md rounded w-1/3 border border-solid border-emerald-500">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
          >
            {' '}
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-slate-100 p-2 w-full outline-none rounded my-1"
              id="username"
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="bg-slate-100 p-2 w-full outline-none rounded my-1"
              id="password"
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-400 text-cyan-50 p-2 w-full my-2 rounded text-lg"
            >
              Register
            </button>
          </form>
          <button
            onClick={() => signInWithPopup(auth, googleProvider)}
            className="bg-emerald-700 hover:bg-emerald-300 active:bg-green-400 text-cyan-50 p-2 my-1 rounded text-lg"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signOut(auth)}
            className="bg-orange-700 hover:bg-orange-600 active:bg-red-600 text-cyan-50 p-2 my-1 rounded text-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
