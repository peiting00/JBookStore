import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiCalendar, BiBarcode } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    //blur-background
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose} >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-6 flex flex-col relative'>

        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <div className='flex justify-start items-center gap-x-2 pt-10'>
          <BiBarcode className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book._id}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiCalendar className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.publishYear}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.title}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.author}</h2>
        </div>
        <p className='mt-4'>Description:</p>
        <p className='my-2'>
          Book Description
        </p>
      </div>
    </div>
  );
};

export default BookModal;