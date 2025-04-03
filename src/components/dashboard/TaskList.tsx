
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, BookOpen } from 'lucide-react';
import { UserTier } from './UserTierBadge';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tierRequired: UserTier;
}

interface TaskListProps {
  tasks: Task[];
  userTier: UserTier;
  onTaskComplete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, userTier, onTaskComplete }) => {
  // Determine which tasks the user can access based on their tier
  const getTierValue = (tier: UserTier): number => {
    const tiers = { bronze: 1, silver: 2, gold: 3 };
    return tiers[tier];
  };

  const canAccessTask = (taskTier: UserTier): boolean => {
    return getTierValue(userTier) >= getTierValue(taskTier);
  };

  const handleCompleteTask = (taskId: string) => {
    onTaskComplete(taskId);
    toast.success('Task marcat ca finalizat!');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => {
        const isAccessible = canAccessTask(task.tierRequired);
        
        return (
          <Card 
            key={task.id} 
            className={`bg-gray-800 border-gray-700 shadow-lg transition-all
              ${task.completed ? 'border-green-500/50' : isAccessible ? 'hover:border-gold-500' : 'opacity-75'}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-white">{task.title}</CardTitle>
                {!isAccessible && (
                  <div className="flex items-center bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded">
                    {task.tierRequired.charAt(0).toUpperCase() + task.tierRequired.slice(1)}+
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                {isAccessible ? task.description : 'Upgradeaza pentru a accesa acest task educațional.'}
              </CardDescription>
            </CardContent>
            <CardFooter>
              {isAccessible ? (
                <Button 
                  className={`w-full ${
                    task.completed 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gold-500 hover:bg-gold-600 text-black'
                  }`}
                  onClick={() => handleCompleteTask(task.id)}
                  disabled={task.completed}
                >
                  {task.completed ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Finalizat
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Marchează ca finalizat
                    </>
                  )}
                </Button>
              ) : (
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white" disabled>
                  Upgradeaza planul
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default TaskList;
