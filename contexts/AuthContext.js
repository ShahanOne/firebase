/* This code is not being used anywhere */

// import React, { useContext, useState, useEffect, createContext } from 'react';
// import { auth } from '../config/firebase';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe; //cleanup
//   }, []);

//   const register = (email, password) => {
//     return auth.createUserWithEmailAndPassword(email, password);
//   };

//   const login = (email, password) => {
//     return auth.signInWithEmailAndPassword(email, password);
//   };

//   const logout = () => {
//     return auth.signOut();
//   };

//   const value = {
//     currentUser,
//     register,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
