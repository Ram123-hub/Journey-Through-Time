'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Slider from 'react-slick';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import FooterThree from '@/components/footer';

interface Era {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  link?: string;
}

export default function EraExploration() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [eras, setEras] = useState<Era[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEra = async () => {
    try {
      const { data } = await axios.get('/api/users/getEra');
      // Ensure eras are unique by filtering based on _id
      const uniqueEras = data.filter(
        (era: Era, index: number, self: Era[]) =>
          index === self.findIndex((e) => e._id === era._id)
      );
      setEras(uniqueEras);
    } catch (error) {
      setError('Error fetching era data');
      console.error('Error fetching era data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEra();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/users/deleteEra/${id}`);
      setEras(eras.filter((era) => era._id !== id));
    } catch (error: any) {
      console.error('Error deleting era', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-richblack max-w-[1400px] flex items-center justify-center min-h-screen mx-auto">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-richblack text-seashell min-h-screen py-10 max-w-[1400px] mx-auto">
      <Head>
        <title>Era Exploration</title>
        <meta name="description" content="Explore various historical eras in depth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-16 mb-9">
        <main className="px-8">
          <h1 className="text-5xl font-bold text-center mb-12 text-rawNumber hover:text-rawnumber2">
            {`Era Exploration`.split(' ').map((word, index) => (
              <span key={index} className="hover:animate-jump inline-block mx-2">
                {word}
              </span>
            ))}
          </h1>
          <Slider {...settings} className="relative">
            {eras.map((era) => (
              <div key={era._id} className="p-8 flex flex-col items-center">
                <Image
                  src={era.image_url}
                  alt={era.name}
                  width={400}   // Adjust width
                  height={600}  // Adjust height
                  className="object-contain rounded-lg shadow-2xl mb-6 mx-auto card-container transform transition-transform duration-300 hover:scale-105"
                />
                <div className="text-center">
                  <h2 className="text-3xl font-semibold mb-4 text-rawNumber hover:text-seashell">
                    {era.name}
                  </h2>
                  <p className="text-lg mb-4 text-rawNumber hover:text-seashell">
                    {era.description}
                  </p>
                  {era.link && (
                    <a
                      href={era.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rawnumber2 hover:text-seashell font-medium hover:underline"
                    >
                      Learn more
                    </a>
                  )}
                  <Button
                    onClick={() => handleDelete(era._id)}
                    className="mt-4 px-4 py-2 bg-rawNumber text-white rounded hover:bg-rawnumber2 ml-3"
                  >
                    Delete Era
                  </Button>
                </div>
              </div>
            ))}
          </Slider>
          <FooterThree />
        </main>
      </div>
    </div>
  );
}
