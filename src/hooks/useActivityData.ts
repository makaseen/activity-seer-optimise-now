
import { useState, useEffect } from 'react';
import { ActivityEntry, DailySummary, CategoryData, mockActivities, mockDailySummary, mockCategoryData, mockTimelineData, mockRecommendations } from '@/lib/activityData';

export function useActivityData() {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [timelineData, setTimelineData] = useState<{time: string, value: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch this data from a local tracker
    // For now, simulate an API call with a timeout
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        setActivities(mockActivities);
        setDailySummary(mockDailySummary);
        setCategoryData(mockCategoryData);
        setRecommendations(mockRecommendations);
        setTimelineData(mockTimelineData);
        
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError('Failed to fetch activity data');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Helper function to format seconds to a readable time string
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return {
    activities,
    dailySummary,
    categoryData,
    recommendations,
    timelineData,
    isLoading,
    error,
    formatDuration
  };
}
