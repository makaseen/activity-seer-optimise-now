
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalTracking } from '@/hooks/useLocalTracking';
import { Cpu, PlayCircle, StopCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

export function ActivityManager() {
  const { isTracking, startTracking, stopTracking } = useLocalTracking();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTracking = () => {
    setIsLoading(true);
    setTimeout(() => {
      startTracking();
      setIsLoading(false);
      toast({
        title: "Tracking Started",
        description: "ActivitySeer is now monitoring your computer activity.",
      });
    }, 500);
  };

  const handleStopTracking = () => {
    setIsLoading(true);
    setTimeout(() => {
      stopTracking();
      setIsLoading(false);
      toast({
        title: "Tracking Paused",
        description: "ActivitySeer has stopped monitoring your activity.",
      });
    }, 500);
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-primary" />
          Activity Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center gap-2 my-4">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
            isTracking ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {isTracking ? (
              <Cpu className="h-8 w-8 animate-pulse" />
            ) : (
              <Cpu className="h-8 w-8" />
            )}
          </div>
          <h3 className="font-medium mt-2">
            {isTracking ? "Currently Tracking" : "Tracking Paused"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isTracking 
              ? "ActivitySeer is monitoring your computer activity." 
              : "ActivitySeer is not currently monitoring your activity."}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        {isTracking ? (
          <Button 
            variant="outline" 
            className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleStopTracking}
            disabled={isLoading}
          >
            <StopCircle className="h-4 w-4" />
            {isLoading ? "Processing..." : "Pause Tracking"}
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="w-full gap-2 text-green-600 border-green-200 hover:bg-green-50"
            onClick={handleStartTracking}
            disabled={isLoading}
          >
            <PlayCircle className="h-4 w-4" />
            {isLoading ? "Processing..." : "Start Tracking"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
