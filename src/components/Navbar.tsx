
import { Button } from '@/components/ui/button';
import { Brain, BarChart, Settings, User } from 'lucide-react';

export function Navbar() {
  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">ActivitySeer</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <BarChart className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="ml-2">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
