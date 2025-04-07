
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobPosition {
  title: string;
  type: string;
  location: string;
  salary: string;
  description: string;
}

interface JobCardProps {
  job: JobPosition;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="bg-gray-900 border border-gray-800 hover:border-gold-500 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white text-xl">{job.title}</CardTitle>
        <CardDescription className="text-gray-400">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center text-gray-300">
              <Briefcase className="h-4 w-4 mr-1 text-gold-500" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="h-4 w-4 mr-1 text-gold-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Banknote className="h-4 w-4 mr-1 text-gold-500" />
              <span>{job.salary}</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">{job.description}</p>
        <a href="#apply">
          <Button 
            variant="outline" 
            className="w-full border-gold-500 text-white hover:bg-gold-500 hover:text-black"
          >
            Aplică acum
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default JobCard;
