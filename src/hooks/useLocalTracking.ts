
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Define the structure of an activity entry
export interface LocalActivity {
  id?: string;
  application: string;
  title: string;
  category: string;
  startTime: string;
  endTime: string;
  duration: number;
  tags: string[];
}

export function useLocalTracking() {
  const [activities, setActivities] = useState<LocalActivity[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  
  // Initialize Supabase client with fallback to empty values when environment variables aren't set
  // This prevents the runtime error when Supabase URL is missing
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Function to fetch activities from Supabase
  const fetchActivities = async () => {
    try {
      // Skip Supabase call if we don't have proper credentials
      if (supabaseUrl === 'https://your-project.supabase.co') {
        console.log('Using mock data since Supabase credentials are not configured');
        return;
      }
      
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('startTime', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        setActivities(data as LocalActivity[]);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  // Function to add a new activity
  const addActivity = async (activity: LocalActivity) => {
    try {
      // Store locally when no Supabase connection
      if (supabaseUrl === 'https://your-project.supabase.co') {
        const mockActivity = {
          ...activity,
          id: Math.random().toString(36).substring(2, 9)
        };
        setActivities(prev => [mockActivity, ...prev]);
        return;
      }
      
      const { data, error } = await supabase
        .from('activities')
        .insert(activity)
        .select();
      
      if (error) throw error;
      
      if (data) {
        setActivities(prev => [data[0] as LocalActivity, ...prev]);
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      // Still add locally even if Supabase fails
      const mockActivity = {
        ...activity,
        id: Math.random().toString(36).substring(2, 9)
      };
      setActivities(prev => [mockActivity, ...prev]);
    }
  };

  // Function to start tracking (in a real app, this would hook into system APIs)
  const startTracking = () => {
    setIsTracking(true);
  };

  // Function to stop tracking
  const stopTracking = () => {
    setIsTracking(false);
  };

  // Simulate local activity tracking
  useEffect(() => {
    if (!isTracking) return;

    const trackInterval = setInterval(() => {
      // In a real app, this would be replaced with actual system tracking
      // For now, simulate with random activities
      const apps = ['VS Code', 'Chrome', 'Slack', 'Terminal', 'Spotify', 'Word', 'Excel'];
      const categories = ['Programming', 'Research', 'Communication', 'Entertainment'];
      const tags = ['development', 'meeting', 'research', 'learning', 'documentation', 'testing'];
      
      const randomApp = apps[Math.floor(Math.random() * apps.length)];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomDuration = Math.floor(Math.random() * 3600) + 300; // 5-65 minutes
      
      // Create 1-3 random tags
      const randomTags = [];
      const numTags = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numTags; i++) {
        const tag = tags[Math.floor(Math.random() * tags.length)];
        if (!randomTags.includes(tag)) {
          randomTags.push(tag);
        }
      }
      
      const now = new Date();
      const startTime = new Date(now.getTime() - (randomDuration * 1000));
      
      const mockActivity: LocalActivity = {
        application: randomApp,
        title: `Working on ${randomApp} project`,
        category: randomCategory,
        startTime: startTime.toISOString(),
        endTime: now.toISOString(),
        duration: randomDuration,
        tags: randomTags
      };
      
      addActivity(mockActivity);
    }, 30000); // Add a new activity every 30 seconds
    
    return () => clearInterval(trackInterval);
  }, [isTracking]);
  
  // Fetch initial activities on component mount
  useEffect(() => {
    fetchActivities();
    // Auto-start tracking for demo purposes
    startTracking();
  }, []);

  return { 
    activities,
    isTracking,
    startTracking,
    stopTracking,
    addActivity,
    fetchActivities
  };
}
