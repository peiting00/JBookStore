import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import { BackendEndpoint } from '../config';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BackendEndpoint}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='justify-center'>
        <h1 className='text-2xl font-primary text-center py-5 bg-sky-300'>Book Management System</h1>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl my-4 ml-4'>Books List</h1>
        <div className='flex justify-center items-center gap-x-4'>
          <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg focus:ring'
            onClick={() => setShowType('table')}
          >
            Table
          </button>
          <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg focus:ring'
            onClick={() => setShowType('card')}
          >
            Card
          </button>
      </div>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl mr-10' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;