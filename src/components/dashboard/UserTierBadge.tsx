
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign, Award, Crown } from 'lucide-react';

export type UserTier = 'bronze' | 'silver' | 'gold';

interface UserTierBadgeProps {
  tier: UserTier;
}

const UserTierBadge: React.FC<UserTierBadgeProps> = ({ tier }) => {
  const tiers = {
    bronze: {
      icon: <CircleDollarSign className="h-4 w-4 mr-1" />,
      label: 'Bronze',
      className: 'bg-amber-700 hover:bg-amber-800'
    },
    silver: {
      icon: <Award className="h-4 w-4 mr-1" />,
      label: 'Silver',
      className: 'bg-gray-400 hover:bg-gray-500'
    },
    gold: {
      icon: <Crown className="h-4 w-4 mr-1" />,
      label: 'Gold',
      className: 'bg-gold-500 hover:bg-gold-600'
    }
  };

  const { icon, label, className } = tiers[tier];

  return (
    <Badge variant="outline" className={`flex items-center text-white ${className}`}>
      {icon}
      {label}
    </Badge>
  );
};

export default UserTierBadge;
