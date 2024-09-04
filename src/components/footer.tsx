'use client'
import React from 'react'

export default function FooterThree() {
  return (
    <section className="relative overflow-hidden bg-richblack py-12 mt-4">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-center">
          <div className="w-full sm:w-auto p-8">
            <ul className="-m-5 flex flex-wrap sm:flex-nowrap sm:flex-row items-center sm:items-start">
              <li className="p-5">
                <a
                  className="font-medium text-rawNumber hover:text-rawnumber2 focus:text-rawnumber2 sm:hover:text-rawnumber2"
                  href="timelineForm"
                >
                  Add Timeline
                </a>
              </li>
              <li className="p-5">
                <a
                  className="font-medium text-rawNumber hover:text-rawnumber2 focus:text-rawnumber2 sm:hover:text-rawnumber2"
                  href="eraExplorationForm"
                >
                  Add Era
                </a>
              </li>
              <li className="p-5">
                <a
                  className="font-medium text-rawNumber hover:text-rawnumber2 focus:text-rawnumber2 sm:hover:text-rawnumber2"
                  href="inventionForm"
                >
                  Add Inventions
                </a>
              </li>
              <li className="p-5">
                <a
                  className="font-medium text-rawNumber hover:text-rawnumber2 focus:text-rawnumber2 sm:hover:text-rawnumber2"
                  href="figureForm"
                >
                  Add Famous Figures
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
