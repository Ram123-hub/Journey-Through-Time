import React from 'react';
import Image from 'next/image';
import Watch from '@/components/Watch';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';


export default async function Home() {

 
  return (
    <div className='bg-hookersgreen min-h-screen flex flex-col items-center'>
      <div className='bg-richblack max-w-[1600px] w-full h-auto mt-16 py-8 px-4'>
        <h1 className='font-serif text-rawNumber text-4xl md:text-6xl  space-y-6 text-center pt-6 mt-8'>
          {
            `Journey Through Time`.split(' ').map((word, index) => (
              <span key={index} className="hover:animate-jump inline-block mr-1 pt-5">
                {word}
              </span>
            ))
          }
        </h1>
        <div className='flex justify-center py-7 card-container transform transition-transform duration-300 hover:scale-105 mt-8'>
          <Watch />
        </div>
        <div className='mx-auto mt-8 py-10'>
          <div className='flex flex-col md:flex-row justify-center md:justify-start items-center border-b-2 border-b-rawnumber2 p-6 mt-2'>
            <Image
              src='/vintage1.png'
              alt="vintage"
              width={350}
              height={250}
              className='rounded-lg shadow-md mb-4 md:mb-0 md:mr-6 card-container transform transition-transform duration-300 hover:scale-105'
            />
            <div className='text-base text-justify md:text-sm lg:text-base xl:text-lg mt-4 mb-4 md:mt-0 py-4 px-4 flex-1'>
              <div className='bg-richblack shadow-md border border-rawnumber2 rounded-lg p-6 w-full card-container transform transition-transform duration-300 hover:scale-105'>
                <p className='font-normal text-rawnumber2 text-wrap hover:text-seashell'>
                  {`📜⏳⚔️ Welcome, Time Traveler! Step aboard our digital time machine and embark on an epic voyage through the annals of history. 🌌 Explore pivotal moments, groundbreaking inventions, and legendary personalities that have shaped the world as we know it. 🏛️ With each click, journey to a new era and discover the history. Your adventure through time begins now! 🕰️🚀`.split(' ').map((word, index) => (
                    <span key={index} className="hover:animate-jump inline-block mr-1">
                      {word}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mt-8 mb-4'>
            <div className='bg-richblack shadow-md border border-rawnumber2 rounded-lg p-6 w-full max-w-lg card-container transform transition-transform duration-300 hover:scale-105 md:ml-2'>
              <p className='font-normal text-rawnumber2 text-wrap hover:text-seashell'>
                {`Welcome to the Historical Time Machine! Step into our virtual time traveler and embark on an epic journey through history. Click to explore ancient civilizations, groundbreaking inventions, and legendary figures. Discover the wonders of the Renaissance, the innovations of the Industrial Revolution, and key historical events. Your adventure through time starts now!`.split(' ').map((word, index) => (
                  <span key={index} className="hover:animate-jump inline-block mr-1">
                    {word}
                  </span>
                ))}
              </p>
            </div>
            <Image
              src='/vintage1.png'
              alt="vintage"
              width={350}
              height={250}
              className='rounded-lg shadow-md mb-4 md:mb-0 card-container transform transition-transform duration-300 hover:scale-105'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
