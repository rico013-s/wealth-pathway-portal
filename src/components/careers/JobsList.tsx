
import React from 'react';
import JobCard from './JobCard';

export interface JobPosition {
  title: string;
  type: string;
  location: string;
  salary: string;
  description: string;
}

interface JobsListProps {
  jobPositions: JobPosition[];
}

const JobsList = ({ jobPositions }: JobsListProps) => {
  return (
    <div className="mb-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Poziții Disponibile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobPositions.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
