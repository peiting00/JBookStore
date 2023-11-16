import React from 'react'
import {PiSpinner} from 'react-icons/pi';

const Spinner = () => {
  return (
    <PiSpinner className="animate-spin w-16 h-16 rounded-full absolute top-1/2 left-1/2" />
  )
}

export default Spinner