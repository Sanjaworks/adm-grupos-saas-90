
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  className?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
};

export const StatCard = ({
  title,
  value,
  icon,
  description,
  className,
  trend,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden glass-card hoverable", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-7 w-7 text-neon-green">{icon}</div>
      </CardHeader>
      
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        
        {(description || trend) && (
          <div className="flex items-center mt-2">
            {trend && (
              <span className={cn(
                "text-xs mr-2 inline-flex items-center",
                trend.positive ? "text-neon-green" : "text-red-500"
              )}>
                {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
            
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
