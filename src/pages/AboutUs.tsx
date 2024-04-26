import React, { useContext } from 'react';
import Footer from '../components/Footer';
import useAutoLogout from '../components/AutoLogOut';

const { Modal, closeModal } = useAutoLogout();

export default function AboutUs() {
    return (
        <div className="px-4 md:px-6 w-full flex items-center justify-center flex-col pb-20">
          <div className="flex flex-col gap-4 min-h-[600px] justify-center space-y-4 text-center xl:gap-8 xl:space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Us</h1>
              <p className="max-w-[800px] text-gray-500 md:mx-auto md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We are a team of passionate individuals dedicated to creating tools that empower innovation. Our mission
                is to make the web more accessible, performant, and secure for all.
              </p>
            </div>
          </div>

          <div className="pt-10 mx-auto grid max-w-3xl items-start gap-6 lg:max-w-5xl lg:grid-cols-2 lg:gap-12">
            <div className="flex items-center gap-4">
              <img
                alt="Portrait of Sarah Dayan"
                className="rounded-full overflow-hidden ring-2 object-cover w-16 h-16"
                height="160"
                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
                style={{
                  aspectRatio: '160/160',
                  objectFit: 'cover',
                }}
                width="160"
              />
              <div className="space-y-1.5">
                <h3 className="text-xl font-semibold">Katherine Nguyen</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Student Developer</p>
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Katherine is an experienced leader with a passion for building application
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                alt="Portrait of Cassidy Williams"
                className="rounded-full overflow-hidden ring-2 object-cover w-16 h-16"
                height="160"
                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
                style={{
                  aspectRatio: '160/160',
                  objectFit: 'cover',
                }}
                width="160"
              />
              <div className="space-y-1.5">
                <h3 className="text-xl font-semibold">MingMing Li</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Student Developer</p>
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                MingMing is a passionate SW Engineer
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                alt="Portrait of Cassidy Williams"
                className="rounded-full overflow-hidden ring-2 object-cover w-16 h-16"
                height="160"
                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
                style={{
                  aspectRatio: '160/160',
                  objectFit: 'cover',
                }}
                width="160"
              />
              <div className="space-y-1.5">
                <h3 className="text-xl font-semibold">Matthew Swigart</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Student Developer</p>
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Matthew is a passionate UI designer
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                alt="Portrait of Cassidy Williams"
                className="rounded-full overflow-hidden ring-2 object-cover w-16 h-16"
                height="160"
                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
                style={{
                  aspectRatio: '160/160',
                  objectFit: 'cover',
                }}
                width="160"
              />
              <div className="space-y-1.5">
                <h3 className="text-xl font-semibold">Eric Vu</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Student Developer</p>
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Eric Vu is a student in SW and the advisor for this project
              </p>
            </div>
          </div>
          <div className='container items-center justify-center flex py-20 flex-col'>
            <a href='/home'>
            <button className='px-5 py-2 text-xl bg-black transition-all text-white hover:text-black hover:bg-white hover:border-black hover:border-2 rounded-md'>Home</button>
            </a>
          </div>
          <Footer/>
          {Modal}
        </div>
    );
  }
  
  