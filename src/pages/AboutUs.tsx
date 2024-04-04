import React, { useContext } from 'react';
import Footer from '../components/Footer';
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
          <div className='max-w-4xl text-xl font-mediums pb-40'>
  <div className="flex flex-wrap flex-col">
  <div className="w-full rounded flex justify-center items-center flex-col space-y-2">
      <img
        src="https://www.smu.edu/-/media/Site/DevelopmentExternalAffairs/MarketingCommunications/digital-marketing/students-hanging-dallas-hall.jpg?h=1333&iar=0&w=2000&hash=EAA3D7A0E96DA001440160E0ECB8643D"
        alt="SMU Dallas Hall"
        className="max-w-xl"
      />
      <p className='italic text-gray-500'>SMU Dallas Hall</p>
    </div>
    <div className="w-full pt-5">
      <p>
        A nationally ranked private university located near the heart of Dallas, SMU is a distinguished center for global research and teaching.
      </p>
      <p>
        SMU’s more than 12,000 diverse, high-achieving students come from all 50 states and over 80 countries to take advantage of the University’s small classes, meaningful research opportunities, leadership development, community service, international study and innovative programs. Students gathered on the quad.
      </p>
      <p>
        SMU serves approximately 7,000 undergraduates and 5,000 graduate students through eight degree-granting schools: Dedman College of Humanities and Sciences, Cox School of Business, Lyle School of Engineering, Meadows School of the Arts, Simmons School of Education and Human Development, Dedman School of Law, Perkins School of Theology and Moody School of Graduate and Advanced Studies.
      </p>
      <p>
        SMU is data driven, and its powerful supercomputing ecosystem – paired with entrepreneurial drive – creates an unrivaled environment for the University to deliver research excellence.
      </p>
      <p>
        Now in its second century of achievement, SMU is recognized for the ways it supports students, faculty and alumni as they become ethical, enterprising leaders in their professions and communities. SMU’s relationship with Dallas – the dynamic center of one of the nation’s fastest-growing regions – offers unique learning, research, social and career opportunities that provide a launch pad for global impact.
      </p>
      <p>
        SMU is nonsectarian in its teaching and committed to academic freedom and open inquiry.
      </p>
    </div>
  </div>
</div>

          <div className="mx-auto grid max-w-3xl items-start gap-6 lg:max-w-5xl lg:grid-cols-2 lg:gap-12">
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
                <h3 className="text-xl font-semibold">Cassidy Williams</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Student Developer</p>
              </div>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cassidy is a passionate UI designer
              </p>
            </div>
          </div>
          <div className='container items-center justify-center flex pt-20 flex-col'>
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between w-full container"/>
            <a href='/home'>
            <button className='px-5 py-2 text-xl bg-black transition-all text-white hover:text-black hover:bg-white hover:border-black hover:border-2 rounded-md'>Home</button>
            </a>
          </div>
          <Footer/>
        </div>
    );
  }
  
  