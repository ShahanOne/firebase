'use client';
import React, { useEffect, useState } from 'react';
import { db, auth, storage } from '@/config/firebase';
import { uploadBytes, ref } from 'firebase/storage';
import {
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import AddMovie from '@/components/AddMovie';

const Homepage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [newMovieName, setNewMovieName] = useState();
  const [updateField, setUpdateField] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  const [showUpload, setShowUpload] = useState(false);

  const moviesCollection = collection(db, 'movies');

  const getMovies = async () => {
    try {
      const data = await getDocs(moviesCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // adding a new field named 'id' in the object with value as doc.id
      }));
      setMoviesList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  const deleteMovie = async (id) => {
    try {
      const docToDelete = doc(db, 'movies', id); //db, collection, id
      await deleteDoc(docToDelete);
    } catch (err) {
      console.error(err);
    }
    getMovies();
  };

  const addMoviePoster = async (id) => {
    if (!uploadedFile) return;
    const filesFolderRef = ref(storage, `moviePosters/${uploadedFile?.name}`);

    try {
      await uploadBytes(filesFolderRef, uploadedFile); // kahan, kya
    } catch (err) {
      console.error(err);
    }
    getMovies();
  };

  const updateMovie = async (id) => {
    try {
      const docToUpdate = doc(db, 'movies', id); //db, collection, id
      await updateDoc(docToUpdate, { name: newMovieName });
    } catch (err) {
      console.error(err);
    }
    getMovies();
  };

  return (
    <div className="px-24 pt-36 pb-60 bg-gradient-to-r from-slate-300 to-orange-300">
      {' '}
      <button
        onClick={() => signOut(auth)}
        className="bg-pink-600 text-white rounded p-2 my-4"
      >
        Log Out
      </button>
      <div className="flex justify-between gap-8">
        {moviesList?.map((movie) => (
          <div
            className="bg-orange-200 p-4 w-40 relative rounded shadow-lg"
            key={movie.id}
          >
            {updateField ? (
              <>
                <input
                  onChange={(e) => setNewMovieName(e.target.value)}
                  value={newMovieName}
                  className="bg-slate-100 p-1 w-full outline-none rounded my-1"
                />
                <button
                  onClick={() => {
                    updateMovie(movie.id);
                    setUpdateField(false);
                  }}
                  className="bg-pink-600 text-sm text-white px-2 py-1 rounded-lg"
                >
                  Update
                </button>
              </>
            ) : (
              <p>{movie.name}</p>
            )}
            <p>{movie.releaseYear}</p>
            {movie.wonOscar ? (
              <p className="text-emerald-400">oscar</p>
            ) : (
              <p className="text-pink-700">no oscar</p>
            )}
            <button
              onClick={() => setUpdateField(true)}
              className="bg-yellow-600 text-sm text-white px-2 py-1 rounded-lg cursor-pointer"
            >
              update name
            </button>
            {showUpload && (
              <>
                <input
                  type="file"
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                />
                <button
                  onClick={() => addMoviePoster(movie.id)}
                  className="bg-emerald-500 text-sm text-white px-2 py-1 rounded-lg cursor-pointer"
                >
                  upload
                </button>
              </>
            )}

            <button
              onClick={() => setShowUpload((e) => !e)}
              className="bg-emerald-500 rounded-full px-2 text-white absolute -top-1 -left-2 cursor-pointer"
            >
              img
            </button>
            <button
              onClick={() => deleteMovie(movie.id)}
              className="bg-red-500 rounded-full px-2 text-white absolute -top-1 -right-2"
            >
              x
            </button>
          </div>
        ))}
      </div>
      <AddMovie
        collection={moviesCollection}
        refreshMovies={() => getMovies()}
      />
      <div>
        <p>Please Sign in to add movie</p>
        <a href="/login">
          <button className="bg-orange-600 text-white rounded p-2">
            Login
          </button>
        </a>
        <br />
        <br />
        <br />
        <a href="/register">
          <button className="bg-orange-600 text-white rounded p-2">
            Register
          </button>
        </a>
      </div>
    </div>
  );
};

export default Homepage;
