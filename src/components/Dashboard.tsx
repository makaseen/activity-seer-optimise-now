import { useActivityData } from '@/hooks/useActivityData';
import { ActivityChart } from '@/components/ActivityChart';
import { CategoryBreakdown } from '@/components/CategoryBreakdown';
import { RecommendationPanel } from '@/components/RecommendationPanel';
import { ActivityTracker } from '@/components/ActivityTracker';
import { ActivityManager } from '@/components/ActivityManager';
import { LocalLLM } from '@/components/LocalLLM';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Clock, Laptop, Zap } from 'lucide-react';

export function Dashboard() {
  const { 
    activities, 
    dailySummary, 
    categoryData, 
    recommendations, 
    timelineData, 
    isLoading, 
    formatDuration 
  } = useActivityData();

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Activity Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Active Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <span className="animate-pulse-subtle text-muted-foreground">Loading...</span>
              ) : (
                dailySummary && formatDuration(dailySummary.totalTime)
              )}
            </div>
            <p className="text-xs text-muted-foreground">Today's computer usage</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Productive Time</CardTitle>
            <Zap className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <span className="animate-pulse-subtle text-muted-foreground">Loading...</span>
              ) : (
                dailySummary && formatDuration(dailySummary.productiveTime)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "" : dailySummary && `${Math.round((dailySummary.productiveTime / dailySummary.totalTime) * 100)}% of total time`}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Application</CardTitle>
            <Laptop className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <span className="animate-pulse-subtle text-muted-foreground">Loading...</span>
              ) : (
                dailySummary && dailySummary.topApplications[0].name
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "" : dailySummary && formatDuration(dailySummary.topApplications[0].time)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Distraction Time</CardTitle>
            <Brain className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <span className="animate-pulse-subtle text-muted-foreground">Loading...</span>
              ) : (
                dailySummary && formatDuration(dailySummary.distractingTime)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "" : dailySummary && `${Math.round((dailySummary.distractingTime / dailySummary.totalTime) * 100)}% of total time`}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <ActivityChart data={timelineData} isLoading={isLoading} />
        <CategoryBreakdown data={categoryData} isLoading={isLoading} formatDuration={formatDuration} />
      </div>
      
      {/* Activity and Recommendations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <ActivityTracker activities={activities} isLoading={isLoading} formatDuration={formatDuration} />
        <RecommendationPanel recommendations={recommendations} isLoading={isLoading} />
        <ActivityManager />
        <LocalLLM />
      </div>
    </div>
  );
}
