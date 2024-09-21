'use client'

import FooterThree from '@/components/footer';
import Timeline from '@/components/TimelineCard';

export default function ViewTimeline() {
  
  return (
    <div className='bg-richblack max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-9'>
      <div className='mt-12'>
      <h1 className="text-5xl font-bold text-center mb-12 text-rawNumber hover:text-rawnumber2">
            {`Timeline `.split(' ').map((word, index) => (
              <span key={index} className="hover:animate-jump inline-block mx-2">
                {word}
              </span>
            ))}
          </h1>
        <div className='mt-3'>
          <Timeline />
          <FooterThree/>
        </div>
      </div>
    </div>
  );
};
