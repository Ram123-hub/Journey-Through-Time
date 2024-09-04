'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from 'axios';
import { Button } from './ui/button';

interface TimelineItemProps {
  _id:string;
  year: number; 
  title: string;
  description: string;
  image_url: string;
  link: string;
}

const Timeline: React.FC = ({
  searchParams,
}:{
  searchParams?:{
    query?:string;
    page?:string;
  };
}) => {
  const [items, setItems] = useState<TimelineItemProps[]>([]); 
  const itemsPerPage = 3;  // Number of items per page
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error ,setError] = useState<string | null>(null)
  const query = searchParams?.query || '';


  // Fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/users/getTimeline');
      const data = response.data;
      console.log(data.response)

      // Ensure the data is an array
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error('Expected an array but got:', data);
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching timeline data', error);
      setItems([]);
      setError(
        
        "An unexpected error occurred while submitting the form."
    );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
   
  const handleDelete =  async(id:string) =>{
    try {
      await axios.delete(`/api/users/deleteTimeline/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error: any) {
      console.error('Error deleting era', error);
    }
  }

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
  // Ensure items is an array before using array methods
  const totalPages = items ? Math.ceil(items.length / itemsPerPage) : 0;
  const currentItems = items ? items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) : [];

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {currentItems.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row items-start mb-8">
          <div className="md:w-1/4 text-center md:text-right md:pr-8">
            {item.year && <h3 className="text-lg font-semibold mb-2 text-rawnumber2 hover:text-seashell">{item.year}</h3>}
          </div>
          <div className="md:w-3/4 md:pl-8">
            <h4 className="text-xl font-bold mb-2 text-rawnumber2 hover:text-seashell">{item.title}</h4>
            <div className="w-72 h-48 relative overflow-hidden py-3 card-container transform transition-transform duration-300 hover:scale-105">
              <Image
                src={item.image_url}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg rounded-md"
              />
            </div>
            <p className='text-rawNumber hover:text-seashell py-2'>{item.description}</p>
            <Link href={item.link} className="text-seashell hover:text-rawNumber">Learn more</Link>
            <Button
                    onClick={() => handleDelete(item._id)}
                    className="mt-4 px-4 py-2 bg-rawNumber text-bistre rounded hover:bg-rawnumber2 ml-3"
                  >Delete timeline</Button>
          </div>
        </div>
      ))}

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
                className={`${
                  currentPage === index + 1 ? "text-rawNumber" : "text-bistre"
                } hover:text-rawNumber`}
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
  );
};

export default Timeline;
