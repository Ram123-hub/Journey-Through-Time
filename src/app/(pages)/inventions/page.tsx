'use client';

import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import axios from 'axios';
import Image from 'next/image';
import FooterThree from '@/components/footer';

interface Invention {
  _id: string;
  invention: string;
  inventor?: string;
  discoverer?: string;
  developers?: string;
  year: number | string;
  description: string;
  imageUrl: string;
}

const Inventions: React.FC = () => {
  const [inventions, setInventions] = useState<Invention[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchInventions = async () => {
      try {
        const response = await axios.get('/api/users/getInventions');
        const data = response.data;

        if (Array.isArray(data)) {
          setInventions(data);
        } else {
          console.error('Expected an array but got', data);
          setInventions([]);
        }
      } catch (error) {
        setError('Error fetching inventions data');
        console.error('Error fetching inventions data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventions();
  }, []);

  const cardsPerPage = 9;
  const totalPages = Math.ceil(inventions.length / cardsPerPage);
  const currentItems = inventions.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="bg-richblack max-w-[1600px] flex items-center justify-center min-h-screen mx-auto">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 pt-20 max-w-[1600px] mx-auto bg-richblack py-4">
      <h1 className="text-4xl font-bold text-center text-rawNumber hover:text-rawnumber2 mb-8 font-serif">
        {`Inventions`.split(' ').map((word, index) => (
          <span key={index} className="hover:animate-jump inline-block mr-1">
            {word}
          </span>
        ))}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((card) => (
          <div key={card._id} className="border border-rawnumber2 p-4 rounded-lg shadow-lg flex items-start py-2 px-2 card-container transform transition-transform duration-300 hover:scale-105">
            <div className="flex-grow space-y-4">
              <h1 className="text-xl font-bold text-rawNumber hover:text-seashell">{card.invention}</h1>
              <h3 className="text-rawnumber2 hover:text-seashell">
                {card.inventor && <div>Inventor: {card.inventor}</div>}
                {card.discoverer && <div>Discoverer: {card.discoverer}</div>}
                {card.developers && <div>Developers: {card.developers}</div>}
              </h3>
              <p className="text-lg text-rawnumber2 hover:text-seashell">Year: {card.year}</p>
              <p className="text-normal text-rawnumber2 hover:text-seashell">{card.description}</p>
            </div>
            <div className="w-32 h-32 rounded-full overflow-hidden ml-5">
              <Image src={card.imageUrl} alt={card.invention} width={80} height={80} className="object-cover" />
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {currentPage > 1 ? (
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="text-rawnumber2 hover:text-rawNumber"
                />
              ) : (
                <span className="px-3 py-2 text-rawnumber2">Previous</span>
              )}
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                  className={`${currentPage === index + 1 ? 'text-rawNumber' : 'text-bistre'} hover:text-rawNumber`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis className="text-rawnumber2" />
              </PaginationItem>
            )}
            <PaginationItem>
              {currentPage < totalPages ? (
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="text-rawnumber2 hover:text-rawNumber"
                />
              ) : (
                <span className="px-3 py-2 text-rawnumber2">Next</span>
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <FooterThree/>
    </div>
  );
};

export default Inventions;
