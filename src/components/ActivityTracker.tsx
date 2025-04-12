
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityEntry } from '@/lib/activityData';
import { Clock, Monitor, Tag } from 'lucide-react';

interface ActivityTrackerProps {
  activities: ActivityEntry[];
  isLoading?: boolean;
  formatDuration: (seconds: number) => string;
}

export function ActivityTracker({ activities, isLoading = false, formatDuration }: ActivityTrackerProps) {
  const recentActivities = activities.slice(0, 5);

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="min-h-[220px] flex items-center justify-center">
            <div className="animate-pulse-subtle text-muted-foreground">Loading recent activities...</div>
          </div>
        ) : (
          <div className="space-y-4 min-h-[220px]">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-muted animate-in">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Monitor className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.application}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatDuration(activity.duration)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground truncate max-w-[300px]">{activity.title}</p>
                  <div className="flex items-center gap-1 flex-wrap mt-1">
                    <span className="inline-flex items-center rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                      {activity.category}
                    </span>
                    {activity.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                        <Tag className="mr-1 h-2 w-2" />
                        {tag}
                      </span>
                    ))}
                    {activity.tags.length > 2 && (
                      <span className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                        +{activity.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
