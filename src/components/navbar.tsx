'use client';

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = useCallback(
    (event: any) => {
      if (event.target.closest("#user-menu-button") === null) {
        setDropdownOpen(false);
      }
      if (event.target.closest("#navbar-user") === null && menuOpen) {
        setMenuOpen(false);
      }
    },
    [menuOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <nav className="fixed top-0 py-2 left-1 right-1 max-w-[1400px] mx-auto bg-richblack border-gray-200 dark:bg-gray-900 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-bold font-serif font-semibold whitespace-nowrap dark:text-white text-tan">
            <Image src='/logo1.png' alt="logo" width={250} height={250} />
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={dropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <Image
              className="w-8 h-8 rounded-full"
              src="/backgroundImage2.jpg"
              alt="User photo"
              width={32}
              height={32}
            />
          </button>
          <div
            className={`z-50 absolute right-0 mt-2 ${dropdownOpen ? "" : "hidden"
              } text-base list-none bg-richblack divide-y divide-rawnumber2 rounded-lg shadow`}
            id="user-dropdown"
            style={{ top: "100%", right: 0 }}
          >
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-rawnumber2 hover:text-seashell"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="block px-4 py-2 text-sm text-rawnumber2 hover:text-seashell"
                >
                  Signup
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="block px-4 py-2 text-sm text-rawnumber2 hover:text-seashell"
                >
                  Login
                </a>
              </li>
              <li className="ml-2 mt-1 mb-1">
                <Button
                  className="hover:bg-gray-400 items-center"
                  onClick={() => signOut({ callbackUrl: '/login', redirect: true })}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? "" : "hidden"
            } md:block`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border- border-rawnumber2 rounded-lg bg-richblack md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-richblack ">
            <li>
              <a
                href="/viewTimeline"
                className="block py-2 px-3 text-rawNumber hover:bg-tan  md:hover:text-tan rounded md:bg-transparent  md:p-0 md:dark:text-white md:text-rawNumber hover:text-black md:hover:bg-transparent"
                aria-current="page"
              >
                Timeline
              </a>
            </li>
            <li>
              <a
                href="/eraExploration"
                className="block py-2 px-3 text-rawNumber rounded hover:bg-tan md:hover:bg-transparent md:hover:text-tan md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-rawNumber"
              >
                Era Exploration
              </a>
            </li>
            <li>
              <a
                href="/inventions"
                className="block py-2 px-3 text-rawNumber rounded hover:bg-tan md:hover:bg-transparent md:hover:text-tan md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-rawNumber"
              >
                Inventions
              </a>
            </li>
            <li>
              <a
                href="/figures"
                className="block py-2 px-3 text-rawNumber rounded hover:bg-tan md:hover:bg-transparent md:hover:text-tan md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-rawNumber"
              >
                Famous Figures
              </a>
            </li>
            <li>
              <a
                href="/maps"
                className="block py-2 px-3 text-rawNumber rounded hover:bg-tan md:hover:bg-transparent md:hover:text-tan md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-rawNumber"
              >
                Maps
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
