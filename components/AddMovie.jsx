import React, { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { auth } from '@/config/firebase';

const AddMovie = ({ collection,refreshMovies }) => {
  const [movieTitle, setMovieTitle] = useState();
  const [movieReleaseYear, setMovieReleaseYear] = useState();
  const [isOscar, setOscar] = useState(false);

  const addMovie = async () => {
    try {
      await addDoc(collection, {
        name: movieTitle,
        releaseYear: movieReleaseYear,
        wonOscar: isOscar,
        userID: auth?.currentUser?.uid
      });
    } catch (err) {
      console.error(err);
    }
    refreshMovies()
  };
  return (
    <div>
      <label htmlFor="title">Movie Title</label>
      <input
        onChange={(e) => setMovieTitle(e.target.value)}
        value={movieTitle}
        className="bg-slate-100 p-2 w-full outline-none rounded my-1"
        id="title"
      />
      <label htmlFor="releaseYear">Release Year</label>
      <input
        onChange={(e) => setMovieReleaseYear(Number(e.target.value))}
        value={movieReleaseYear}
        type="number"
        className="bg-slate-100 p-2 w-full outline-none rounded my-1"
        id="releaseYear"
      />
      <input
        onChange={(e) => setOscar(e.target.checked)}
        checked={isOscar}
        type="checkbox"
        className="bg-slate-100 my-1"
        id="oscar"
      />{' '}
      <label htmlFor="oscar">Has won Oscar</label>
      <button
        onClick={() => addMovie()}
        className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-400 text-cyan-50 p-2 w-full my-2 rounded text-lg"
      >
        Add Movie
      </button>
    </div>
  );
};

export default AddMovie;
