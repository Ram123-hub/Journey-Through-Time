// pages/index.tsx
'use client'
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const Home: React.FC = () => {
  const [place, setPlace] = useState(""); // State for place name

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const placeName = formData.get("place") as string; // Get place name from form

    setPlace(placeName); // Set place name
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-5">
      <Head>
        <title>Interactive Map</title>
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center py-14 bg-richblack max-w-[1400px]">
        <h1 className="text-4xl font-bold mb-8  text-rawNumber hover:text-rawnumber2">
        {`Welcome to the Map `.split(' ').map((word, index) => (
              <span key={index} className="hover:animate-jump inline-block mx-2">
                {word}
              </span>
            ))}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center mb-8">
          <input
            type="text"
            name="place"
            placeholder="Enter a place name"
            className="px-4 py-2 border-rawNumber bg-bistre text-seashell rounded mb-4 w-64 "
            required
          />
          <button
            type="submit"
            className="bg-bistre text-seashell px-6 py-2 rounded hover:bg-rawnumber2"
          >
            Show on Map
          </button>
        </form>

        <div className="w-full rounded-md shadow-inherit hover:drop-shadow-lg hover:focus:outline">
          <Map placeName={place} />
        </div>
      </main>
    </div>
  );
};

export default Home;
