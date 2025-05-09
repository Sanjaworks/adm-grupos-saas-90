
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Users, MessageSquare, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertType = 'warning' | 'info' | 'error';

type AlertCardProps = {
  type: AlertType;
  title: string;
  message: string;
  time: string;
  group?: string;
};

export const AlertCard = ({ type, title, message, time, group }: AlertCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'info': return <Bell className="h-5 w-5 text-blue-500" />;
      default: return null;
    }
  };
  
  return (
    <Card className={cn(
      "glass-card hoverable cursor-pointer",
      type === 'warning' && "border-l-4 border-l-yellow-500",
      type === 'error' && "border-l-4 border-l-red-500",
      type === 'info' && "border-l-4 border-l-blue-500",
    )}>
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="mr-3 mt-0.5">{getIcon()}</div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-sm">{title}</h4>
              <span className="text-xs text-muted-foreground">{time}</span>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">{message}</p>
            
            {group && (
              <div className="flex items-center mt-2">
                <Users className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                <span className="text-xs text-muted-foreground">{group}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
