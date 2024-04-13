import React, { useState } from 'react';

export default function Footer() {
    return (
        <footer className="bg-white pt-52 pb-8">
            <h3 className='text-xl text-center'>Have feedback? See <a href="/feedback" className="text-blue-500">
  Give Feedback
</a>
    </h3>

            <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between"/>
            {/* <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between"> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h5 className="text-lg font-semibold mb-4">ACADEMICS</h5>
                        <ul className="space-y-2">
                            <li>Cox School of Business</li>
                            <li>Dedman College of Humanities and Sciences</li>
                            <li>Dedman School of Law</li>
                            <li>Lyle School of Engineering</li>
                            <li>Meadows School of the Arts</li>
                            <li>Moody School of Graduate and Advanced Studies</li>
                            <li>Perkins School of Theology</li>
                            <li>Simmons School of Education & Human Development</li>
                            <li>SMU CAPE</li>
                            <li>SMU Libraries</li>
                            <li>SMU Guildhall</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">AUDIENCE LINKS</h5>
                        <ul className="space-y-2">
                            <li>Audience Link 1</li>
                            <li>Audience Link 2</li>
                            <li>Audience Link 3</li>
                            <li>Audience Link 4</li>
                            <li>Audience Link 5</li>
                            <li>Audience Link 6</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">QUICK LINKS</h5>
                        <ul className="space-y-2">
                        <li>Quick Link 1</li>
                            <li>Quick Link 2</li>
                            <li>Quick Link 3</li>
                            <li>Quick Link 4</li>
                            <li>Quick Link 5</li>
                            <li>Quick Link 6</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">GET IN TOUCH (Click to see)</h5>
                        <ul className="space-y-2">
                            <li><a href="/feedback" className="text-blue-500">
Feedback
</a></li>
                            <li><a href="/about-us" className="text-blue-500">
  About Us
</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex justify-center md:order-2">
                        <ArrowUpIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-sm text-gray-500">© SOUTHERN METHODIST UNIVERSITY</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function ArrowUpIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
        </svg>
    );
}
