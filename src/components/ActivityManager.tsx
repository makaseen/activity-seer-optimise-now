
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalTracking } from '@/hooks/useLocalTracking';
import { Cpu, PlayCircle, StopCircle } from 'lucide-react';

export function ActivityManager() {
  const { isTracking, startTracking, stopTracking } = useLocalTracking();

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
            onClick={stopTracking}
          >
            <StopCircle className="h-4 w-4" />
            Pause Tracking
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="w-full gap-2 text-green-600 border-green-200 hover:bg-green-50"
            onClick={startTracking}
          >
            <PlayCircle className="h-4 w-4" />
            Start Tracking
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
