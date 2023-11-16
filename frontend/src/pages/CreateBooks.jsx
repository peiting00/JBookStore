import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { BackendEndpoint } from '../config';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post(`${BackendEndpoint}/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' , autoHideDuration: 2000});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <div className='grid grid-cols-8 mb-2'>
        <BackButton className='col-span-1' />
        <h1 className='font-primary col-span-7 text-xl my-4'>Create Book</h1>
      </div>


      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[500px] p-8 mx-auto'>
       
          <div className='my-4'>
            <label className='text-l mr-4 text-gray-500'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 px-4 py-2 w-full caret-sky-300'
            />
          </div>
          <div className='my-4'>
            <label className='text-l mr-4 text-gray-500'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 px-4 py-2 w-full caret-sky-300'
            />
          </div>
          <div className='my-4'>
            <label className='text-l mr-4 text-gray-500'>Publish Year</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border-2 px-4 py-2 w-full caret-sky-300'
            />
          </div>
          <button className='px-4 py-2 mt-4 bg-sky-300 rounded w-full hover:bg-sky-700 hover:text-white}' onClick={handleSaveBook}>
            Save
          </button>
      </div>
    </div>
  );
}

export default CreateBooks