// components/Watch.js
import React from 'react';

const Watch = () => {
  return (
    <div className='relative flex justify-center items-center h-64 w-64'>
      <div className='relative w-full h-full bg-transparent border-4 border-rawnumber2 rounded-full shadow-lg overflow-hidden'>
        {/* Watch Face with Rounded Background Image */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-full h-full bg-[url("/backgroundImage2.jpg")] bg-cover bg-center rounded-full' />
          
         
          
          {/* Second Hand */}
          <div className='absolute w-0.5 h-44 bg-red-700 rounded-full origin-center left-1/2 transform -translate-x-1/2 animate-second-hand' />
        </div>
        
        {/* Center Circle */}
        <div className='absolute inset-1/2 bg-transparent rounded-full w-4 h-4 transform -translate-x-1/2 -translate-y-1/2' />
      </div>
    </div>
  );
};

export default Watch;
