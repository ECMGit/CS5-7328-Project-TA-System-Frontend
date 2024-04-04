import React, { useState } from 'react';

export default function Footer() {
    return (
        <footer className="bg-white py-8">
            {/* <div className='w-5/6 bg-gray-200 h-1 mb-10 mx-auto rounded-full'/> */}
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
                            <li>Undergraduate Students</li>
                            <li>Graduate Students</li>
                            <li>Alumni</li>
                            <li>Faculty & Staff</li>
                            <li>Media</li>
                            <li>Parents</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">QUICK LINKS</h5>
                        <ul className="space-y-2">
                            <li>SMU Ignited: Boldly Shaping Tomorrow</li>
                            <li>Corporate and Foundation Relations</li>
                            <li>Diversity and Inclusion</li>
                            <li>COVID-19 Information (Mustang Strong)</li>
                            <li>Bush Center</li>
                            <li>SMU Store</li>
                            <li>Academic Calendar</li>
                            <li>Academic Ceremonies</li>
                            <li>Events Calendar</li>
                            <li>Employment</li>
                            <li>Giving to SMU</li>
                            <li>Virtual Tour</li>
                            <li>SMU Stories</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">GET IN TOUCH</h5>
                        <ul className="space-y-2">
                            <li>Contact Us</li>
                            <li>Maps Directions</li>
                            <li>Compliance</li>
                            <li>Legal Disclosures</li>
                            <li>Privacy Policy Statement</li>
                            <li>Report Sexual Harassment</li>
                            <li>Reporting a bias Incident</li>
                            <li>HEERF Reporting</li>
                            <li>Emergency Preparedness</li>
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
