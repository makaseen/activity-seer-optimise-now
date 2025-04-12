
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
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!, 
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  );

  // Simulate local activity tracking
  useEffect(() => {
    const trackActivities = async () => {
      // In a real app, this would be replaced with actual system tracking
      const mockActivity: LocalActivity = {
        application: 'VS Code',
        title: 'Developing Activity Tracker',
        category: 'Programming',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour later
        duration: 3600,
        tags: ['development', 'tracking']
      };

      try {
        // Save activity to Supabase
        const { data, error } = await supabase
          .from('activities')
          .insert(mockActivity)
          .select();

        if (error) throw error;
        
        setActivities(prev => [...prev, mockActivity]);
      } catch (error) {
        console.error('Error tracking activity:', error);
      }
    };

    trackActivities();
  }, []);

  return { activities };
}
