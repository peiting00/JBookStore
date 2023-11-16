import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { BackendEndpoint } from '../config';

const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect (() => {
    setLoading(true);
    axios
      .get(`${BackendEndpoint}/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  },[]);

  return (
    <div className='p-4'>
      <div className='grid grid-cols-8 mb-4'>
        <BackButton className='col-span-1' />
        <h1 className='font-primary col-span-7 text-xl my-4'>Book Details</h1>
      </div>
      { loading ? (
        <Spinner />
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[700px] p-8 mx-auto'>
            <div className='my-4'>
              <span className='text-; mr-4 text-gray-500'>ID</span>
              <span>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-l mr-4 text-gray-500'>Title </span>
              <span>{book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-l mr-4 text-gray-500'>Author</span>
              <span>{book.author}</span>
            </div>
            <div className='my-4'>
              <span className='text-l mr-4 text-gray-500'>Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
            <div className='my-4'>
              <span className='text-l mr-4 text-gray-500'>Create Time</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-l mr-4 text-gray-500'>Last Update Time</span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook;