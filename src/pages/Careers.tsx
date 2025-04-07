
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CareersHeader from '@/components/careers/CareersHeader';
import JobsList from '@/components/careers/JobsList';
import ApplicationForm from '@/components/careers/ApplicationForm';
import { jobPositions } from '@/data/jobPositions';

const Careers = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <CareersHeader />
          <JobsList jobPositions={jobPositions} />
          <ApplicationForm />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
